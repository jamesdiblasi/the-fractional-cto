import * as React from 'react';
import { cn } from '@/lib/utils';
import { emphasise } from '@/components/Emphasis';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Centre the header, the way Designjoy sets most section titles. */
  centered?: boolean;
  /**
   * `muted` renders the section as a band cut on the logo's slash angle (see
   * .edge-slash in globals.css), which is what separates it from its
   * neighbours. The extra vertical padding makes room for the cut corners.
   * Keep muted sections apart; two in a row cannot both keep their edges.
   */
  tone?: 'default' | 'muted';
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  centered = true,
  tone = 'default',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 py-24 sm:py-32',
        tone === 'muted' && 'edge-slash bg-muted py-32 sm:py-40',
        className,
      )}
      {...rest}
    >
      <div className="container">
        {(eyebrow || title || intro) && (
          <header
            className={cn(
              'mb-14 max-w-3xl sm:mb-16',
              centered && 'mx-auto text-center',
            )}
          >
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="display text-balance text-display-lg font-bold">
                {emphasise(title)}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-sm font-semibold text-primary">{children}</p>
  );
}

export function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-sm font-medium',
        className,
      )}
    >
      {children}
    </span>
  );
}
