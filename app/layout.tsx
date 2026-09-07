import type { Metadata } from 'next';
import './globals.css';
import { getSiteConfig } from '@/lib/config';
import { Analytics } from '@/components/Analytics';

export function generateMetadata(): Metadata {
  const site = getSiteConfig();
  const title = `${site.siteName} | A CTO subscription for growing businesses`;
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
      'CTO subscription',
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
    <html lang="en-AU">
      <head>
        {/* Figtree, linked at runtime rather than bundled so builds never
            depend on reaching Google Fonts. The system stack covers the swap. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* The rule below is written for the Pages Router; in the App Router
            the root layout wraps every page, so the font loads everywhere. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
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
