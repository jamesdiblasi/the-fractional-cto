import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/config';
import { Logo } from '@/components/Logo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Privacy',
  robots: { index: false },
};

export default function PrivacyPage() {
  const site = getSiteConfig();
  return (
    <main className="container max-w-3xl py-16">
      <a href="/" className="inline-flex">
        <Logo name={site.siteName} />
      </a>
      <h1 className="mt-10 text-3xl font-semibold tracking-tight">Privacy</h1>
      <div className="prose-invert mt-6 space-y-4 leading-relaxed text-muted-foreground">
        <p>
          {site.siteName} collects only what you give it. If you fill in the
          contact form or request the checklist, your name, email address and
          message are emailed to me and used to reply to you. They are not sold,
          shared or added to a marketing list.
        </p>
        <p>
          The site may use privacy-respecting analytics to count visits. No
          advertising cookies are set.
        </p>
        <p>
          To have anything you have sent deleted, email{' '}
          <a href={`mailto:${site.contactEmail}`} className="text-foreground">
            {site.contactEmail}
          </a>
          .
        </p>
      </div>
      <p className="mt-10">
        <a href="/" className="text-sm text-primary underline-offset-4 hover:underline">
          Back to the site
        </a>
      </p>
    </main>
  );
}
