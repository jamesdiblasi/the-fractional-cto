import { NextResponse } from 'next/server';
import { availableSlots, getBookingConfig } from '@/lib/booking';
import { rateLimited, clientKey } from '@/lib/validate';
import { addDays, daysBetween, parseYmd, ymdIn } from '@/lib/tz';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Widest window one request may ask for. A month plus a day each side. */
const MAX_DAYS = 33;

/**
 * Open slots between two calendar days, `?from=yyyy-mm-dd&to=yyyy-mm-dd`,
 * as ISO instants. The panel asks for the month it is showing plus a day on
 * either side, because a slot on the 1st in Melbourne can be the 31st for a
 * visitor further west.
 *
 * Nothing about the calendar leaks except which times are open, which is
 * the same thing a Bookings or Calendly page shows.
 */
export async function GET(req: Request) {
  const cfg = getBookingConfig();
  if (!cfg) {
    return NextResponse.json({ error: 'Booking is not set up.' }, { status: 404 });
  }
  if (rateLimited(`availability:${clientKey(req)}`, 120)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const url = new URL(req.url);
  const from = url.searchParams.get('from') ?? '';
  const to = url.searchParams.get('to') ?? '';
  if (!parseYmd(from) || !parseYmd(to)) {
    return NextResponse.json({ error: 'Bad date range.' }, { status: 400 });
  }
  const span = daysBetween(from, to);
  if (span < 0 || span >= MAX_DAYS) {
    return NextResponse.json({ error: 'Bad date range.' }, { status: 400 });
  }

  // Clamp to the bookable window so a request for next year is cheap.
  const today = ymdIn(new Date(), cfg.timeZone);
  const first = from < today ? today : from;
  const last = addDays(today, cfg.horizonDays + 1);
  const end = to > last ? last : to;

  try {
    const slots = first > end ? [] : await availableSlots(cfg, first, end);
    return NextResponse.json(
      {
        slots,
        durationMinutes: cfg.durationMinutes,
        timeZone: cfg.timeZone,
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err) {
    console.error('[availability] Graph call failed', err);
    return NextResponse.json(
      { error: 'Could not load times right now.' },
      { status: 502 },
    );
  }
}
