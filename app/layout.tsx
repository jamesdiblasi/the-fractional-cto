import type { Metadata } from 'next';
import './globals.css';
import { getSiteConfig } from '@/lib/config';
import { Analytics } from '@/components/Analytics';

export function generateMetadata(): Metadata {
  const site = getSiteConfig();
  const title = `${site.siteName} | Fractional CTO services, Australia`;
  const description = site.tagline;
  return {
    metadataBase: new URL(site.siteUrl),
    title: {
      default: title,
      template: `%s | ${site.siteName}`,
    },
    description,
    applicationName: site.siteName,
    keywords: [
      'fractional CTO',
      'part-time CTO',
      'technical due diligence',
      'startup CTO Australia',
      'technology strategy',
      'AI automation consultant',
    ],
    openGraph: {
      type: 'website',
      siteName: site.siteName,
      title,
      description,
      url: site.siteUrl,
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: '/' },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSiteConfig();
  return (
    <html lang="en-AU" className="dark">
      <body className="min-h-screen font-sans">
        {children}
        <Analytics
          gaMeasurementId={site.analytics.gaMeasurementId}
          plausibleDomain={site.analytics.plausibleDomain}
        />
      </body>
    </html>
  );
}
