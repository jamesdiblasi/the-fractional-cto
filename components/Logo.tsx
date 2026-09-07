import { cn } from '@/lib/utils';

/**
 * Wordmark: a small square mark beside the name. Pure text and SVG so it
 * renders identically in the nav, footer and Open Graph image.
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
      <span className="display-sm text-[17px] font-bold">{name}</span>
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M10 21.5 L22 10.5"
        className="stroke-white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="10.5" cy="11" r="2.6" className="fill-white" />
      <circle cx="21.5" cy="21" r="2.6" className="fill-white" />
    </svg>
  );
}
