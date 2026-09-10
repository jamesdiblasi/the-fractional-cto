/**
 * Just enough timezone arithmetic to turn "9:00 on the 14th in Melbourne"
 * into an instant, without pulling in a date library. Built on Intl, which
 * ships the IANA zone data with Node.
 */

export interface WallClock {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  second: number;
  /** 0 = Sunday, as Date.getDay() */
  weekday: number;
}

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatter(timeZone: string) {
  let fmt = formatters.get(timeZone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    formatters.set(timeZone, fmt);
  }
  return fmt;
}

/** The wall clock reading in `timeZone` at the given instant. */
export function wallClock(date: Date, timeZone: string): WallClock {
  const p: Record<string, number> = {};
  for (const part of formatter(timeZone).formatToParts(date)) {
    if (part.type !== 'literal') p[part.type] = Number(part.value);
  }
  return {
    year: p.year,
    month: p.month,
    day: p.day,
    hour: p.hour,
    minute: p.minute,
    second: p.second,
    weekday: new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay(),
  };
}

/**
 * The instant at which `timeZone` reads the given wall clock. Two passes
 * are enough to land on the right side of a daylight-saving change.
 */
export function fromWallClock(
  timeZone: string,
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
): Date {
  const wanted = Date.UTC(year, month - 1, day, hour, minute);
  let guess = wanted;
  for (let i = 0; i < 2; i++) {
    const w = wallClock(new Date(guess), timeZone);
    const seen = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute, w.second);
    guess += wanted - seen;
  }
  return new Date(guess);
}

/** yyyy-mm-dd in `timeZone` for the instant. */
export function ymdIn(date: Date, timeZone: string): string {
  const w = wallClock(date, timeZone);
  return ymd(w.year, w.month, w.day);
}

export function ymd(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const YMD_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseYmd(value: string): [number, number, number] | null {
  const m = YMD_RE.exec(value);
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  // Reject the 31st of a 30-day month and the like.
  const probe = new Date(Date.UTC(y, mo - 1, d));
  if (probe.getUTCMonth() !== mo - 1) return null;
  return [y, mo, d];
}

/** Calendar days between two yyyy-mm-dd values, `to - from`. */
export function daysBetween(from: string, to: string): number {
  const a = parseYmd(from);
  const b = parseYmd(to);
  if (!a || !b) return NaN;
  return Math.round(
    (Date.UTC(b[0], b[1] - 1, b[2]) - Date.UTC(a[0], a[1] - 1, a[2])) /
      86_400_000,
  );
}

export function addDays(date: string, n: number): string {
  const p = parseYmd(date);
  if (!p) return date;
  const d = new Date(Date.UTC(p[0], p[1] - 1, p[2] + n));
  return ymd(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}
