import { cn } from '@/lib/utils';

/**
 * The shape vocabulary, all of it drawn from the logo's percent sign: the
 * slash that cuts tonal sections (.edge-slash in globals.css), the numbered
 * bowl on each how-it-works step, and the soft blue blob the hero photo used
 * to sit on. Everything here is decorative, so it is hidden from assistive
 * technology.
 */

/**
 * The soft blue blob from the hero, reused as a section marker. Absolutely
 * positioned, so the parent needs `relative` and usually `overflow-hidden`.
 */
export function GlowBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'hero-glow pointer-events-none absolute -z-10 rounded-full',
        className,
      )}
    />
  );
}

/**
 * A step number sitting in the upper bowl of a percent sign, the same mark the
 * logo is built from (slash plus two dots). The lower bowl and the slash are
 * drawn at logo proportions; the upper bowl is enlarged to hold the number.
 */
export function PercentStep({
  n,
  className,
}: {
  n: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      focusable="false"
      className={cn('h-14 w-14', className)}
    >
      <circle cx="20" cy="20" r="18" className="fill-secondary" />
      <path
        d="M14 58 L58 14"
        className="stroke-secondary"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="46" cy="46" r="9" className="fill-secondary" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white text-[21px] font-bold"
      >
        {n}
      </text>
    </svg>
  );
}
