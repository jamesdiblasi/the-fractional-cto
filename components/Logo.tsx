import { cn } from '@/lib/utils';

/**
 * The logo lockup: the percent mark and the wordmark together, as supplied.
 * public/logo.webp is public/logo.png trimmed of its transparent margin and
 * resized to 128px tall, which is 4x the height it renders at.
 *
 * The artwork is navy and blue, so it needs a light ground. Anywhere dark
 * would want a reversed file rather than this one.
 */
export function Logo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.webp"
      alt={name}
      width={885}
      height={128}
      className={cn('h-8 w-auto', className)}
    />
  );
}
