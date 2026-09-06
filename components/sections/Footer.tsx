import { Logo } from '@/components/Logo';
import { footer } from '@/lib/content';

export function Footer({
  siteName,
  contactEmail,
}: {
  siteName: string;
  contactEmail: string;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="container grid gap-8 py-12 md:grid-cols-[1fr_auto]">
        <div className="max-w-md">
          <Logo name={siteName} />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {footer.blurb}
          </p>
        </div>
        <nav
          className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end"
          aria-label="Footer"
        >
          <a href="#services" className="hover:text-foreground">
            Services
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
          <a href="/privacy" className="hover:text-foreground">
            Privacy
          </a>
          <a href={`mailto:${contactEmail}`} className="hover:text-foreground">
            {contactEmail}
          </a>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>
            &copy; {year} {siteName}. All rights reserved.
          </span>
          <span>Australia-based. Working remotely with clients everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
