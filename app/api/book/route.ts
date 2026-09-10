import { NextResponse } from 'next/server';
import { book, getBookingConfig, isCandidate } from '@/lib/booking';
import { cleanText, isEmail, rateLimited, clientKey } from '@/lib/validate';
import { verifyTurnstile } from '@/lib/turnstile';
import { getSiteConfig } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Books a slot. The only thing the caller chooses is which of the offered
 * start times, and who they are. The subject, length, calendar, attendee
 * list and meeting link are all decided here, and the time is checked
 * against the rules and then against the live calendar before anything is
 * written.
 */
export async function POST(req: Request) {
  const cfg = getBookingConfig();
  if (!cfg) {
    return NextResponse.json({ error: 'Booking is not set up.' }, { status: 404 });
  }
  const ip = clientKey(req);
  if (rateLimited(`book:${ip}`, 3)) {
    return NextResponse.json(
      { error: 'Too many bookings from this address. Please try again later.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real people never see this field.
  if (cleanText(body.website, 10)) {
    return NextResponse.json({ ok: true });
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254);
  const company = cleanText(body.company, 120);
  const note =
    typeof body.note === 'string' ? body.note.trim().slice(0, 2000) : '';
  const start =
    typeof body.start === 'string' ? new Date(body.start) : new Date(NaN);

  if (!name || !isEmail(email)) {
    return NextResponse.json(
      { error: 'Please add your name and a valid email.' },
      { status: 400 },
    );
  }
  if (Number.isNaN(start.getTime()) || !isCandidate(cfg, start)) {
    return NextResponse.json(
      { error: 'That time is not available. Please pick another.' },
      { status: 400 },
    );
  }

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json(
      { error: 'Could not confirm you are human. Please try again.' },
      { status: 400 },
    );
  }

  try {
    const result = await book(cfg, { name, email, company, note, start });
    if (!result.ok) {
      return NextResponse.json(
        { error: 'That time was just taken. Please pick another.' },
        { status: 409 },
      );
    }
    return NextResponse.json({
      ok: true,
      start: result.start.toISOString(),
      end: result.end.toISOString(),
    });
  } catch (err) {
    console.error('[book] failed', { name, email, start: start.toISOString() }, err);
    return NextResponse.json(
      {
        error: `Could not book right now. Please email ${getSiteConfig().contactEmail} directly.`,
      },
      { status: 502 },
    );
  }
}
