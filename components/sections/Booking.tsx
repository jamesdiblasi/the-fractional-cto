'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { booking } from '@/lib/content';

/**
 * The booking panel: a month picker beside a list of times, on the dark
 * ground the checklist slab already uses.
 *
 * UI ONLY. Availability is a stand-in rule (weekdays from today onward) and
 * the times are a fixed list, so nothing here reflects a real calendar and
 * picking a slot does not book anything. Wiring it up means replacing
 * `isAvailable` and `SLOTS` with the scheduling provider's data, and giving
 * `onPick` something to do.
 */

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Business hours, on the half hour. Stand-in for real availability. */
const SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
];

type Clock = '12h' | '24h';

/** `today` is an ISO date (yyyy-mm-dd) from the server, so both renders agree. */
export function Booking({ today }: { today: string }) {
  const [y, m, d] = today.split('-').map(Number);
  const base = useMemo(() => new Date(y, m - 1, d), [y, m, d]);

  const [monthOffset, setMonthOffset] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [clock, setClock] = useState<Clock>('12h');

  const shown = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(
    shown.getFullYear(),
    shown.getMonth() + 1,
    0,
  ).getDate();
  const leading = shown.getDay();

  /** Stand-in rule: weekdays, from today onward. */
  function isAvailable(day: number) {
    const date = new Date(shown.getFullYear(), shown.getMonth(), day);
    const weekday = date.getDay();
    return weekday > 0 && weekday < 6 && date >= base;
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

  function goToMonth(next: number) {
    setMonthOffset(next);
    setPicked(null);
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
          <p className="mt-8 text-sm text-white/45">{booking.note}</p>
        </div>

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
                {label.slice(0, 3)}
              </div>
            ))}
            {Array.from({ length: leading }, (_, i) => (
              <div key={`lead-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
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
            })}
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

          <ul className="scroll-quiet mt-4 flex max-h-[336px] flex-col gap-2 overflow-y-auto pr-2">
            {SLOTS.map((slot) => (
              <li key={slot}>
                <button
                  type="button"
                  className="w-full rounded-full border border-white/15 py-3 text-sm font-semibold transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  {formatSlot(slot, clock)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
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

function formatSlot(slot: string, clock: Clock) {
  if (clock === '24h') return slot;
  const [h, min] = slot.split(':').map(Number);
  const suffix = h < 12 ? 'am' : 'pm';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(min).padStart(2, '0')} ${suffix}`;
}
