'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { LinkButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isExternal } from '@/lib/config';

const links = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav({
  siteName,
  bookingUrl,
  ctaLabel,
}: {
  siteName: string;
  bookingUrl: string;
  ctaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const external = isExternal(bookingUrl);
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
      <div className="container flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center" aria-label={siteName}>
          <Logo name={siteName} />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <LinkButton href={bookingUrl} size="sm" className="ml-2" {...linkProps}>
            {ctaLabel}
          </LinkButton>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          'border-b border-border bg-background md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-lg font-medium"
            >
              {l.label}
            </a>
          ))}
          <LinkButton
            href={bookingUrl}
            className="mt-2"
            onClick={() => setOpen(false)}
            {...linkProps}
          >
            {ctaLabel}
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
