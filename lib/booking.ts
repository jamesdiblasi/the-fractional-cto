/**
 * The booking rules, and the two things the API routes do with them: list
 * the open slots in a window, and book one.
 *
 * Every rule is applied here on the server. The browser is handed a list of
 * instants and hands one back; it never gets to say what a valid slot is.
 * Free/busy on the mailbox is the source of truth for "open", so anything
 * on the calendar closes a slot with no second calendar to keep in sync.
 */

import { createHash } from 'node:crypto';
import { createEvent, getBusy } from '@/lib/graph';
import { addDays, fromWallClock, parseYmd, ymdIn, wallClock } from '@/lib/tz';

export interface BookingConfig {
  mailbox: string;
  timeZone: string;
  /** Days of the week bookings are offered, 0 = Sunday. */
  days: number[];
  /** Minutes after midnight, in `timeZone`. */
  openMinutes: number;
  closeMinutes: number;
  /** Gap between offered start times. */
  slotMinutes: number;
  /** Length of the call. */
  durationMinutes: number;
  /** Nothing inside this many hours from now. */
  leadHours: number;
  /** Nothing beyond this many days from today. */
  horizonDays: number;
  subject: string;
  category: string;
  teamsMeeting: boolean;
}

function num(value: string | undefined, fallback: number): number {
  const n = Number(value?.trim());
  return value && Number.isFinite(n) ? n : fallback;
}

function bool(value: string | undefined, fallback: boolean): boolean {
  if (!value?.trim()) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

/** "09:00" -> 540 */
function minutes(value: string | undefined, fallback: number): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value?.trim() ?? '');
  if (!m) return fallback;
  return Number(m[1]) * 60 + Number(m[2]);
}

/** "1-5" or "1,2,3,4,5" -> [1,2,3,4,5] */
function weekdays(value: string | undefined, fallback: number[]): number[] {
  const v = value?.trim();
  if (!v) return fallback;
  const range = /^(\d)-(\d)$/.exec(v);
  const list = range
    ? Array.from(
        { length: Number(range[2]) - Number(range[1]) + 1 },
        (_, i) => Number(range[1]) + i,
      )
    : v.split(',').map((s) => Number(s.trim()));
  const clean = list.filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
  return clean.length ? clean : fallback;
}

/** Null until BOOKING_MAILBOX is set; the panel falls back to email. */
export function getBookingConfig(): BookingConfig | null {
  const env = process.env;
  const mailbox = env.BOOKING_MAILBOX?.trim();
  if (!mailbox) return null;
  const timeZone = env.BOOKING_TIMEZONE?.trim() || 'Australia/Melbourne';
  try {
    Intl.DateTimeFormat(undefined, { timeZone });
  } catch {
    throw new Error(`BOOKING_TIMEZONE "${timeZone}" is not a valid IANA zone`);
  }
  return {
    mailbox,
    timeZone,
    days: weekdays(env.BOOKING_DAYS, [1, 2, 3, 4, 5]),
    openMinutes: minutes(env.BOOKING_OPEN, 9 * 60),
    closeMinutes: minutes(env.BOOKING_CLOSE, 17 * 60),
    slotMinutes: num(env.BOOKING_SLOT_MINUTES, 30),
    durationMinutes: num(env.BOOKING_DURATION_MINUTES, 15),
    leadHours: num(env.BOOKING_LEAD_HOURS, 24),
    horizonDays: num(env.BOOKING_HORIZON_DAYS, 60),
    subject: env.BOOKING_SUBJECT?.trim() || 'Discovery call',
    category: env.BOOKING_CATEGORY?.trim() || 'Site booking',
    teamsMeeting: bool(env.BOOKING_TEAMS, true),
  };
}

/**
 * Every start time the rules allow between two calendar days (inclusive,
 * in the booking timezone), before the calendar is consulted.
 */
export function candidateSlots(
  cfg: BookingConfig,
  from: string,
  to: string,
  now = new Date(),
): Date[] {
  const earliest = now.getTime() + cfg.leadHours * 3_600_000;
  const horizonDay = parseYmd(
    addDays(ymdIn(now, cfg.timeZone), cfg.horizonDays + 1),
  )!;
  const latest = fromWallClock(cfg.timeZone, ...horizonDay).getTime();

  const out: Date[] = [];
  for (let day = from; day <= to; day = addDays(day, 1)) {
    const p = parseYmd(day);
    if (!p) break;
    const [y, m, d] = p;
    if (!cfg.days.includes(new Date(Date.UTC(y, m - 1, d)).getUTCDay())) {
      continue;
    }
    for (
      let t = cfg.openMinutes;
      t + cfg.durationMinutes <= cfg.closeMinutes;
      t += cfg.slotMinutes
    ) {
      const start = fromWallClock(
        cfg.timeZone,
        y,
        m,
        d,
        Math.floor(t / 60),
        t % 60,
      );
      // A clock change can fold a wall time onto another day; skip those.
      if (wallClock(start, cfg.timeZone).day !== d) continue;
      const ms = start.getTime();
      if (ms < earliest || ms >= latest) continue;
      out.push(start);
    }
  }
  return out;
}

function overlapsBusy(
  start: Date,
  end: Date,
  busy: { start: Date; end: Date; status: string }[],
): boolean {
  return busy.some(
    (b) =>
      // Working elsewhere and free are not blockers; everything else is,
      // including tentative and unknown, so a doubt closes the slot.
      b.status !== 'free' &&
      b.status !== 'workingElsewhere' &&
      b.start < end &&
      b.end > start,
  );
}

/** Bounds of a day range as instants: midnight at the start, midnight after the end. */
function rangeBounds(
  cfg: BookingConfig,
  from: string,
  to: string,
): [Date, Date] {
  const a = parseYmd(from)!;
  const b = parseYmd(addDays(to, 1))!;
  return [fromWallClock(cfg.timeZone, ...a), fromWallClock(cfg.timeZone, ...b)];
}

/**
 * A short cache on availability. Visitors paging through months should
 * not each cost a Graph call, and a minute of staleness is corrected by the
 * re-check at booking time.
 */
const cache = new Map<string, { at: number; slots: string[] }>();
const CACHE_MS = 60_000;

/** Open slot start times, as ISO instants, for a day range in the booking zone. */
export async function availableSlots(
  cfg: BookingConfig,
  from: string,
  to: string,
): Promise<string[]> {
  const key = `${cfg.mailbox}|${from}|${to}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.slots;

  const candidates = candidateSlots(cfg, from, to);
  let slots: string[] = [];
  if (candidates.length) {
    const [start, end] = rangeBounds(cfg, from, to);
    const busy = await getBusy(cfg.mailbox, start, end);
    slots = candidates
      .filter(
        (s) =>
          !overlapsBusy(
            s,
            new Date(s.getTime() + cfg.durationMinutes * 60_000),
            busy,
          ),
      )
      .map((s) => s.toISOString());
  }
  cache.set(key, { at: Date.now(), slots });
  // Keep the map from growing without bound across a long-lived process.
  if (cache.size > 200) {
    cache.forEach((v, k) => {
      if (Date.now() - v.at > CACHE_MS) cache.delete(k);
    });
  }
  return slots;
}

/**
 * True when the instant is one the rules would offer right now. Checked
 * before booking so a client cannot post a time of its own invention.
 */
export function isCandidate(cfg: BookingConfig, start: Date): boolean {
  const day = ymdIn(start, cfg.timeZone);
  return candidateSlots(cfg, day, day).some(
    (s) => s.getTime() === start.getTime(),
  );
}

export interface BookingRequest {
  name: string;
  email: string;
  company: string;
  note: string;
  start: Date;
}

export type BookingResult =
  | { ok: true; start: Date; end: Date }
  | { ok: false; reason: 'taken' };

/**
 * Books the slot. Re-reads free/busy for exactly this window, uncached,
 * immediately before writing, which closes the gap between two visitors
 * picking the same time to the few hundred milliseconds of the Graph call.
 */
export async function book(
  cfg: BookingConfig,
  req: BookingRequest,
): Promise<BookingResult> {
  const end = new Date(req.start.getTime() + cfg.durationMinutes * 60_000);
  const busy = await getBusy(cfg.mailbox, req.start, end);
  if (overlapsBusy(req.start, end, busy)) return { ok: false, reason: 'taken' };

  const body = [
    `Booked through the website by ${req.name} <${req.email}>.`,
    req.company ? `Company: ${req.company}` : null,
    req.note ? `\nWhat they want to talk about:\n${req.note}` : null,
  ]
    .filter((l): l is string => l !== null)
    .join('\n');

  await createEvent(cfg.mailbox, {
    subject: `${cfg.subject}: ${req.name}${req.company ? ` (${req.company})` : ''}`,
    body,
    start: req.start,
    end,
    attendee: { name: req.name, email: req.email },
    categories: [cfg.category],
    teamsMeeting: cfg.teamsMeeting,
    // Same person, same slot, same id: a double submit cannot double book.
    transactionId: createHash('sha256')
      .update(`${req.email.toLowerCase()}|${req.start.toISOString()}`)
      .digest('hex'),
  });

  // The slot is gone; drop every cached window that might have offered it.
  cache.clear();
  return { ok: true, start: req.start, end };
}
