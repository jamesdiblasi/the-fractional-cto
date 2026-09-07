/**
 * Site configuration, read from the environment at request time.
 *
 * Everything an owner might want to flip without a redeploy lives here:
 * which pricing tiers show, whether each shows its price, the one-off
 * "from" prices, the booking link, and the analytics IDs. app/page.tsx is
 * rendered dynamically so a change to an App Service setting takes effect on
 * the next request rather than the next build.
 *
 * Copy that is not a switch (headlines, benefits, FAQ, the founder bio)
 * lives in lib/content.ts.
 */

function bool(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase());
}

function num(value: string | undefined, fallback: number): number {
  if (value === undefined || value === '') return fallback;
  const n = Number(value.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : fallback;
}

function str(value: string | undefined, fallback: string): string {
  return value && value.trim() !== '' ? value.trim() : fallback;
}

export type TierKey = 'advisor' | 'fractional' | 'embedded';

export interface Tier {
  key: TierKey;
  name: string;
  enabled: boolean;
  showPrice: boolean;
  /** Monthly price in whole dollars. */
  price: number;
  /** Optional struck-through price shown beside the real one. 0 = none. */
  comparePrice: number;
  tagline: string;
  commitment: string;
  bestFor: string;
  includes: string[];
  /** The one plan that gets the big card. */
  featured: boolean;
}

export interface OneOff {
  key: 'audit' | 'mvp';
  name: string;
  enabled: boolean;
  showPrice: boolean;
  /** "From" price in whole dollars. */
  price: number;
  summary: string;
  includes: string[];
}

export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  tagline: string;
  bookingUrl: string;
  contactEmail: string;
  currency: string;
  tiers: Tier[];
  oneOffs: OneOff[];
  leadMagnetEnabled: boolean;
  contactFormEnabled: boolean;
  analytics: {
    gaMeasurementId: string | null;
    plausibleDomain: string | null;
  };
}

const TIER_DEFAULTS: Record<
  TierKey,
  Omit<Tier, 'key' | 'enabled' | 'showPrice' | 'price' | 'comparePrice'>
> = {
  advisor: {
    name: 'Advisor',
    tagline: 'A senior technical voice in your corner.',
    commitment: 'A few hours a week',
    bestFor: 'Founders who want a sounding board before the big technical calls.',
    includes: [
      'Weekly strategy call',
      'Architecture and vendor reviews',
      'Hiring and contractor vetting',
      'Async access on Slack or Teams',
    ],
    featured: false,
  },
  fractional: {
    name: 'Fractional',
    tagline: 'Your CTO, one to two days a week.',
    commitment: 'One to two days a week',
    bestFor: 'Growing businesses that need someone owning the roadmap.',
    includes: [
      'Everything in Advisor',
      'Technical roadmap and delivery ownership',
      'Team leadership and one-on-ones',
      'Board and investor technical updates',
      'Security, cost and reliability oversight',
      'Unlimited requests, handled one at a time',
    ],
    featured: true,
  },
  embedded: {
    name: 'Embedded',
    tagline: 'Hands-on leadership, most of the week.',
    commitment: 'Three days a week',
    bestFor: 'Teams mid-build or mid-turnaround that need someone in the room.',
    includes: [
      'Everything in Fractional',
      'Day-to-day engineering management',
      'Hands-on architecture and code review',
      'Process, tooling and DevOps setup',
      'Recruit and onboard your permanent CTO',
    ],
    featured: false,
  },
};

const TIER_PRICE_DEFAULTS: Record<TierKey, number> = {
  advisor: 2500,
  fractional: 6000,
  embedded: 12000,
};

function readTier(key: TierKey): Tier {
  const prefix = `TIER_${key.toUpperCase()}`;
  const env = process.env;
  return {
    key,
    ...TIER_DEFAULTS[key],
    name: str(env[`${prefix}_NAME`], TIER_DEFAULTS[key].name),
    enabled: bool(env[`${prefix}_ENABLED`], true),
    showPrice: bool(env[`${prefix}_SHOW_PRICE`], true),
    price: num(env[`${prefix}_PRICE`], TIER_PRICE_DEFAULTS[key]),
    comparePrice: num(env[`${prefix}_COMPARE_PRICE`], 0),
  };
}

function readOneOffs(): OneOff[] {
  const env = process.env;
  return [
    {
      key: 'audit',
      name: 'Technical audit',
      enabled: bool(env.ONEOFF_AUDIT_ENABLED, true),
      showPrice: bool(env.ONEOFF_AUDIT_SHOW_PRICE, true),
      price: num(env.ONEOFF_AUDIT_PRICE, 4500),
      summary:
        'A fixed-scope review of your code, architecture, security and team. Written for founders and investors, not just engineers.',
      includes: [
        'Two-week review',
        'Plain-English report with a prioritised fix list',
        'Read-out call with your leadership team',
        'Built for due diligence before a raise or sale',
      ],
    },
    {
      key: 'mvp',
      name: 'MVP and product build',
      enabled: bool(env.ONEOFF_MVP_ENABLED, true),
      showPrice: bool(env.ONEOFF_MVP_SHOW_PRICE, true),
      price: num(env.ONEOFF_MVP_PRICE, 25000),
      summary:
        'Your first product or internal tool, built by a small senior team I lead. Scoped so you know what you get before we start.',
      includes: [
        'Discovery and scoping workshop',
        'Fixed milestones, a working demo every fortnight',
        'Production-ready, documented, handed over',
        'AI and automation where it earns its keep',
      ],
    },
  ];
}

export function getSiteConfig(): SiteConfig {
  const env = process.env;
  const siteUrl = str(env.SITE_URL, 'https://thefractionalcto.com.au').replace(
    /\/$/,
    '',
  );
  return {
    siteName: str(env.SITE_NAME, 'The Fractional CTO'),
    siteUrl,
    tagline: str(
      env.SITE_TAGLINE,
      'Senior technical leadership for growing businesses, one flat monthly fee. Pause or cancel anytime.',
    ),
    bookingUrl: str(env.BOOKING_URL, '#booking'),
    contactEmail: str(env.CONTACT_EMAIL, 'hello@thefractionalcto.com.au'),
    currency: str(env.CURRENCY, 'AUD'),
    tiers: (['advisor', 'fractional', 'embedded'] as TierKey[]).map(readTier),
    oneOffs: readOneOffs(),
    leadMagnetEnabled: bool(env.LEAD_MAGNET_ENABLED, true),
    contactFormEnabled: bool(env.CONTACT_FORM_ENABLED, true),
    analytics: {
      gaMeasurementId: env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null,
      plausibleDomain: env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() || null,
    },
  };
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
