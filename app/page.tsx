import { getSiteConfig } from '@/lib/config';
import { faqs } from '@/lib/content';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/sections/Hero';
import { TechLogos } from '@/components/sections/TechLogos';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Benefits } from '@/components/sections/Benefits';
import { Services } from '@/components/sections/Services';
import { Pricing } from '@/components/sections/Pricing';
import { Founder } from '@/components/sections/Founder';
import { LeadMagnet } from '@/components/sections/LeadMagnet';
import { Faq } from '@/components/sections/Faq';
import { Booking } from '@/components/sections/Booking';
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
  // Resolved server-side so the booking calendar renders the same on both
  // sides of hydration, and lands on the right day for an Australian visitor.
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Melbourne',
  }).format(new Date());

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
        mainEntity: faqs.items.map((f) => ({
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
        ctaLabel="Book a call"
      />
      <main>
        <Hero bookingUrl={site.bookingUrl} />
        <TechLogos />
        <HowItWorks />
        <Benefits />
        <Services />
        <Pricing site={site} />
        <Founder />
        {site.leadMagnetEnabled && <LeadMagnet />}
        <Faq />
        <Booking
          today={today}
          contactEmail={site.contactEmail}
          enabled={site.bookingEnabled}
          turnstileSiteKey={site.turnstileSiteKey}
        />
        <Contact formEnabled={site.contactFormEnabled} />
      </main>
      <Footer siteName={site.siteName} contactEmail={site.contactEmail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
