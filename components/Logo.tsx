import { cn } from '@/lib/utils';

/**
 * Wordmark: a small bracketed fraction glyph beside the name. Pure text and
 * SVG so it renders identically in the nav, footer and Open Graph image.
 */
export function Logo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-7 w-7" />
      <span className="text-base font-semibold tracking-tight">{name}</span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="7"
        className="stroke-primary"
        strokeWidth="2"
      />
      <path
        d="M11 22 L21 10"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="11" r="2.4" className="fill-foreground" />
      <circle cx="21.5" cy="21" r="2.4" className="fill-foreground" />
    </svg>
  );
}
