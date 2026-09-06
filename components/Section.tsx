import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: 'default' | 'card';
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = 'default',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 py-20 sm:py-24',
        tone === 'card' && 'border-y border-border bg-card/40',
        className,
      )}
      {...rest}
    >
      <div className="container">
        {(eyebrow || title || intro) && (
          <header className="mb-12 max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
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
    <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
      {children}
    </p>
  );
}
