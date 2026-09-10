'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { booking } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input, Label, Textarea } from '@/components/ui/input';
import { Turnstile } from '@/components/Turnstile';

/**
 * The booking panel: a month picker beside a list of times, on the dark
 * ground the checklist slab already uses.
 *
 * Times come from /api/availability, which reads free/busy on the booking
 * mailbox, and a pick goes to /api/book, which writes the event and sends
 * the invite. The API deals in ISO instants; everything here is shown in
 * the visitor's own timezone, so a 9am Melbourne slot reads as the evening
 * before in London and lands on the right day of the grid.
 *
 * Until BOOKING_MAILBOX is set (`enabled` false) the card offers email
 * instead of a calendar.
 */

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type Clock = '12h' | '24h';

type Submit =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'done'; start: Date }
  | { status: 'error'; message: string };

/** `today` is an ISO date (yyyy-mm-dd) from the server, so both renders agree. */
export function Booking({
  today,
  contactEmail,
  enabled,
  turnstileSiteKey,
}: {
  today: string;
  contactEmail: string;
  enabled: boolean;
  turnstileSiteKey: string | null;
}) {
  const [y, m, d] = today.split('-').map(Number);
  const base = useMemo(() => new Date(y, m - 1, d), [y, m, d]);

  const [monthOffset, setMonthOffset] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [clock, setClock] = useState<Clock>('12h');
  const [slot, setSlot] = useState<string | null>(null);
  /** Why the visitor is back on the calendar, when they did not choose to be. */
  const [notice, setNotice] = useState<string | null>(null);

  // Slots by window, keyed "from|to". A window is the shown month plus a
  // day either side, in the visitor's calendar, so the API's Melbourne
  // days cover every local day on the grid.
  const [windows, setWindows] = useState<Record<string, string[]>>({});
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'error'>(
    'idle',
  );
  // Bumped by "Try again" so a failed window, which is never stored, is
  // fetched afresh.
  const [attempt, setAttempt] = useState(0);

  const shown = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(
    shown.getFullYear(),
    shown.getMonth() + 1,
    0,
  ).getDate();
  const leading = shown.getDay();

  const from = localYmd(new Date(shown.getFullYear(), shown.getMonth(), 0));
  const to = localYmd(new Date(shown.getFullYear(), shown.getMonth() + 1, 1));
  const windowKey = `${from}|${to}`;
  const slots = windows[windowKey];

  useEffect(() => {
    if (!enabled || slots) return;
    let cancelled = false;
    setLoadState('loading');
    fetch(`/api/availability?from=${from}&to=${to}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as { slots: string[] };
      })
      .then((json) => {
        if (cancelled) return;
        setWindows((w) => ({ ...w, [windowKey]: json.slots }));
        setLoadState('idle');
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });
    return () => {
      cancelled = true;
    };
  }, [enabled, slots, from, to, windowKey, attempt]);

  /** Open slots grouped by the visitor's local day. */
  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const iso of slots ?? []) {
      const key = localYmd(new Date(iso));
      map.set(key, [...(map.get(key) ?? []), iso]);
    }
    return map;
  }, [slots]);

  function dayKey(day: number) {
    return localYmd(new Date(shown.getFullYear(), shown.getMonth(), day));
  }

  function isAvailable(day: number) {
    return byDay.has(dayKey(day));
  }

  const firstAvailable = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1,
  ).find(isAvailable);
  const active = picked ?? firstAvailable ?? null;
  const activeDate =
    active === null
      ? null
      : new Date(shown.getFullYear(), shown.getMonth(), active);
  const daySlots = active === null ? [] : (byDay.get(dayKey(active)) ?? []);

  function goToMonth(next: number) {
    setMonthOffset(next);
    setPicked(null);
  }

  /** Forget the shown window so it is fetched again. */
  function refresh() {
    setWindows((w) => {
      const { [windowKey]: _dropped, ...rest } = w;
      return rest;
    });
    setAttempt((n) => n + 1);
  }

  return (
    <section
      id="booking"
      className="edge-slash scroll-mt-24 bg-secondary py-32 text-secondary-foreground sm:py-40"
    >
      <div className="container grid gap-14 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-20">
        <div className="lg:pt-4">
          <h2 className="display text-balance text-display-lg font-bold">
            {booking.title}
            <span className="mt-1 block font-accent font-normal tracking-[-0.01em] text-white/85">
              {booking.titleAccent}
            </span>
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-white/65">
            {booking.body}
          </p>
          <p className="mt-8 text-[15px] text-white/60">
            Prefer email?{' '}
            <a
              href={`mailto:${contactEmail}`}
              className="font-semibold text-white underline underline-offset-4"
            >
              {contactEmail}
            </a>
          </p>
          {enabled && (
            <p className="mt-4 text-sm text-white/45">{booking.note}</p>
          )}
        </div>

        {!enabled ? (
          <EmailInstead contactEmail={contactEmail} />
        ) : slot ? (
          <BookingForm
            start={new Date(slot)}
            clock={clock}
            turnstileSiteKey={turnstileSiteKey}
            onBack={() => setSlot(null)}
            onTaken={() => {
              setSlot(null);
              setNotice('That time was just taken. Please pick another.');
              refresh();
            }}
          />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-lg font-bold">
                {shown.toLocaleString('en-AU', { month: 'long' })}{' '}
                <span className="font-normal text-white/50">
                  {shown.getFullYear()}
                </span>
              </p>
              <div className="flex items-center gap-1">
                <MonthButton
                  label="Previous month"
                  disabled={monthOffset === 0}
                  onClick={() => goToMonth(monthOffset - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </MonthButton>
                <MonthButton
                  label="Next month"
                  disabled={monthOffset >= 3}
                  onClick={() => goToMonth(monthOffset + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </MonthButton>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center">
              {WEEKDAY_LABELS.map((label) => (
                <div
                  key={label}
                  className="pb-2 text-xs font-semibold uppercase tracking-wide text-white/40"
                >
                  {label}
                </div>
              ))}
              {Array.from({ length: leading }, (_, i) => (
                <div key={`lead-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const available = isAvailable(day);
                  const isActive = day === active;
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={!available}
                      onClick={() => setPicked(day)}
                      aria-pressed={isActive}
                      className={cn(
                        'aspect-square rounded-lg text-sm font-semibold transition-colors',
                        !available && 'cursor-default text-white/25',
                        available && !isActive && 'bg-white/10 hover:bg-white/20',
                        isActive && 'bg-white text-secondary',
                      )}
                    >
                      {day}
                    </button>
                  );
                },
              )}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <p className="font-bold">
                {activeDate
                  ? WEEKDAY_LABELS[activeDate.getDay()]
                  : booking.noDayLabel}{' '}
                {active !== null && (
                  <span className="text-sm font-normal text-white/50">
                    {active}
                    {ordinal(active)}
                  </span>
                )}
              </p>
              <div
                className="flex rounded-full bg-white/10 p-0.5 text-xs font-semibold"
                role="group"
                aria-label={booking.clockLabel}
              >
                {(['12h', '24h'] as Clock[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setClock(option)}
                    aria-pressed={clock === option}
                    className={cn(
                      'rounded-full px-3 py-1.5 transition-colors',
                      clock === option
                        ? 'bg-white text-secondary'
                        : 'text-white/60 hover:text-white',
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {notice && (
              <p className="mt-6 text-sm text-white/70" role="alert">
                {notice}
              </p>
            )}

            {loadState === 'loading' && !slots ? (
              <p
                className="mt-6 flex items-center gap-2 text-sm text-white/50"
                aria-live="polite"
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking the calendar
              </p>
            ) : loadState === 'error' ? (
              <p className="mt-6 text-sm text-white/60" role="alert">
                Could not load times right now.{' '}
                <button
                  type="button"
                  onClick={refresh}
                  className="font-semibold text-white underline underline-offset-4"
                >
                  Try again
                </button>{' '}
                or email{' '}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-semibold text-white underline underline-offset-4"
                >
                  {contactEmail}
                </a>
                .
              </p>
            ) : daySlots.length === 0 ? (
              <p className="mt-6 text-sm text-white/50">
                {slots && slots.length === 0
                  ? 'Nothing open this month. Try the next one.'
                  : 'No times left on this day.'}
              </p>
            ) : (
              <ul className="scroll-quiet mt-4 flex max-h-[336px] flex-col gap-2 overflow-y-auto pr-2">
                {daySlots.map((iso) => (
                  <li key={iso}>
                    <button
                      type="button"
                      onClick={() => {
                        setNotice(null);
                        setSlot(iso);
                      }}
                      className="w-full rounded-full border border-white/15 py-3 text-sm font-semibold transition-colors hover:border-white/40 hover:bg-white/10"
                    >
                      {formatTime(new Date(iso), clock)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/** The card when there is no calendar to offer yet. */
function EmailInstead({ contactEmail }: { contactEmail: string }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <p className="text-lg font-bold">Email a couple of times that suit.</p>
      <p className="mt-3 text-[15px] leading-relaxed text-white/60">
        Online booking is on its way. Until then, send two or three times
        that work for you and I will confirm one within a business day.
      </p>
      <a
        href={`mailto:${contactEmail}?subject=${encodeURIComponent('Discovery call')}`}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-[15px] font-semibold text-secondary transition-colors hover:bg-white/90"
      >
        Email {contactEmail}
      </a>
    </div>
  );
}

const field =
  'border-white/15 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-white/60 focus-visible:ring-offset-secondary';

/** Name and email for the chosen slot, then the confirmation. */
function BookingForm({
  start,
  clock,
  turnstileSiteKey,
  onBack,
  onTaken,
}: {
  start: Date;
  clock: Clock;
  turnstileSiteKey: string | null;
  onBack: () => void;
  /** The slot went while the form was open; go back and reload. */
  onTaken: () => void;
}) {
  const [state, setState] = useState<Submit>({ status: 'idle' });
  const [token, setToken] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState({ status: 'sending' });
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          start: start.toISOString(),
          turnstileToken: token,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 409) {
        onTaken();
        return;
      }
      if (!res.ok) {
        throw new Error(json.error ?? 'Something went wrong. Please try again.');
      }
      setState({ status: 'done', start });
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong.',
      });
    }
  }

  const when = formatWhen(start, clock);

  if (state.status === 'done') {
    return (
      <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-8">
        <CheckCircle2 className="mx-auto h-10 w-10 text-white" />
        <p className="mt-4 text-xl font-bold">Booked.</p>
        <p className="mt-2 text-white/70">{when}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/50">
          A calendar invite with the meeting link is on its way to your
          inbox. If it does not turn up in a few minutes, check spam.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Pick a different time
      </button>
      <p className="mt-5 text-lg font-bold">{when}</p>
      <p className="mt-1 text-sm text-white/50">
        Just your name and email to confirm. The invite carries the meeting
        link.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <Label htmlFor="b-name" className="text-white/80">
            Name
          </Label>
          <Input
            id="b-name"
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            className={field}
          />
        </div>
        <div>
          <Label htmlFor="b-email" className="text-white/80">
            Email
          </Label>
          <Input
            id="b-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
        <div>
          <Label htmlFor="b-company" className="text-white/80">
            Company <span className="font-normal text-white/40">(optional)</span>
          </Label>
          <Input
            id="b-company"
            name="company"
            autoComplete="organization"
            maxLength={120}
            className={field}
          />
        </div>
        <div>
          <Label htmlFor="b-note" className="text-white/80">
            What is stuck?{' '}
            <span className="font-normal text-white/40">(optional)</span>
          </Label>
          <Textarea
            id="b-note"
            name="note"
            maxLength={2000}
            className={cn(field, 'min-h-[90px]')}
            placeholder="A line or two so I can come prepared."
          />
        </div>
        <div className="hidden" aria-hidden>
          <label htmlFor="b-website">Website</label>
          <input id="b-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        {turnstileSiteKey && (
          <Turnstile siteKey={turnstileSiteKey} onToken={setToken} />
        )}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-white text-secondary hover:bg-white/90"
          disabled={
            state.status === 'sending' || (Boolean(turnstileSiteKey) && !token)
          }
        >
          {state.status === 'sending' && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          Confirm booking
        </Button>
        {state.status === 'error' && (
          <p className="text-sm text-red-300" role="alert">
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}

function MonthButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:text-white/20"
    >
      {children}
    </button>
  );
}

function ordinal(n: number) {
  if (n % 100 >= 11 && n % 100 <= 13) return 'th';
  return ['th', 'st', 'nd', 'rd'][n % 10] ?? 'th';
}

/** yyyy-mm-dd in the browser's timezone. */
function localYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatTime(date: Date, clock: Clock): string {
  return date.toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: clock === '12h',
  });
}

/** "Tuesday 15 September, 10:00 am AEST" */
function formatWhen(date: Date, clock: Clock): string {
  return date.toLocaleString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
    hour12: clock === '12h',
    timeZoneName: 'short',
  });
}
