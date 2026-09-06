import { getSiteConfig } from '@/lib/config';
import { hero, faqs } from '@/lib/content';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { Audiences } from '@/components/sections/Audiences';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Stats } from '@/components/sections/Stats';
import { Pricing } from '@/components/sections/Pricing';
import { LeadMagnet } from '@/components/sections/LeadMagnet';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

/**
 * Rendered per request so the pricing switches and booking link in the
 * environment take effect without a rebuild. The page is small and has no
 * data fetching, so this costs almost nothing.
 */
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const site = getSiteConfig();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${site.siteUrl}/#organization`,
        name: site.siteName,
        url: site.siteUrl,
        description: site.tagline,
        email: site.contactEmail,
        areaServed: ['AU', 'NZ', 'Worldwide'],
        priceRange: '$$$',
        serviceType: [
          'Fractional CTO',
          'Technical due diligence',
          'MVP development',
          'AI and automation consulting',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.siteUrl}/#website`,
        url: site.siteUrl,
        name: site.siteName,
        publisher: { '@id': `${site.siteUrl}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Nav
        siteName={site.siteName}
        bookingUrl={site.bookingUrl}
        ctaLabel={hero.primaryCta}
      />
      <main>
        <Hero bookingUrl={site.bookingUrl} />
        <Stats />
        <Audiences />
        <Services />
        <Process />
        <Pricing site={site} />
        {site.leadMagnetEnabled && <LeadMagnet />}
        <About />
        <Faq />
        <Contact
          bookingUrl={site.bookingUrl}
          contactEmail={site.contactEmail}
          formEnabled={site.contactFormEnabled}
        />
      </main>
      <Footer siteName={site.siteName} contactEmail={site.contactEmail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
