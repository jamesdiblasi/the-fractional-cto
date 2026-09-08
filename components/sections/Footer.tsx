import { Logo } from '@/components/Logo';
import { footer } from '@/lib/content';

export function Footer({
  siteName,
  contactEmail,
  hrefPrefix = '',
}: {
  siteName: string;
  contactEmail: string;
  /**
   * Prepended to the in-page anchors. Empty on the home page, where they are
   * a smooth scroll; "/" anywhere else, where they have to load the home page
   * first.
   */
  hrefPrefix?: string;
}) {
  const year = new Date().getFullYear();
  const to = (hash: string) => `${hrefPrefix}${hash}`;
  return (
    <footer className="mt-8">
      <div className="edge-slash-top bg-muted pb-4 pt-16 sm:pt-20">
        <div className="container grid gap-10 py-14 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div className="max-w-sm">
            <Logo name={siteName} />
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {footer.blurb}
            </p>
          </div>
          <nav className="flex flex-col gap-2.5 text-[15px]" aria-label="Footer">
            <a href={to('#how-it-works')} className="hover:underline">How it works</a>
            <a href={to('#services')} className="hover:underline">Services</a>
            <a href={to('#pricing')} className="hover:underline">Pricing</a>
            <a href={to('#faq')} className="hover:underline">FAQ</a>
          </nav>
          <nav className="flex flex-col gap-2.5 text-[15px]" aria-label="Contact">
            <a href={`mailto:${contactEmail}`} className="hover:underline">
              {contactEmail}
            </a>
            <a href={to('#booking')} className="hover:underline">Book a call</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
          </nav>
        </div>
        <div className="container flex flex-col gap-2 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <span>
            &copy; {year} {siteName}. All rights reserved.
          </span>
          <span>{footer.location}</span>
        </div>
      </div>
    </footer>
  );
}
