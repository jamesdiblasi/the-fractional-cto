import { getSiteConfig, isExternal } from '@/lib/config';
import { Logo } from '@/components/Logo';
import { LinkButton } from '@/components/ui/button';
import { Footer } from '@/components/sections/Footer';

export const dynamic = 'force-dynamic';

/**
 * Articles sit outside the landing page and outside its navigation, so they
 * get a slimmer header: the logo home, and the one call to action. The
 * footer is the site footer with its in-page links rewritten to point back at
 * the home page.
 */
export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSiteConfig();
  const external = isExternal(site.bookingUrl);
  // The default booking link is the "#booking" anchor on the home page, which
  // means nothing from here.
  const bookingHref = external
    ? site.bookingUrl
    : `/${site.bookingUrl.replace(/^\/+/, '')}`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md">
        <div className="container flex h-[72px] items-center justify-between">
          <a href="/" className="flex items-center" aria-label={site.siteName}>
            <Logo name={site.siteName} />
          </a>
          <LinkButton
            href={bookingHref}
            size="sm"
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            Book a call
          </LinkButton>
        </div>
      </header>
      <main>{children}</main>
      <Footer
        siteName={site.siteName}
        contactEmail={site.contactEmail}
        hrefPrefix="/"
      />
    </>
  );
}
