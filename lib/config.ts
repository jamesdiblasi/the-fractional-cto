/**
 * Site configuration, read from the environment at request time.
 *
 * Everything an owner might want to flip without a redeploy lives here:
 * the plan price, which add-ons show and what they cost, the booking link,
 * and the analytics IDs. app/page.tsx is
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

/**
 * One plan. The subscription is sold on throughput, not time: unlimited
 * requests handled one at a time. Anything priced by hours or days would
 * contradict that, so no tier carries a commitment in days.
 */
export interface Plan {
  name: string;
  enabled: boolean;
  showPrice: boolean;
  /** Monthly price in whole dollars. */
  price: number;
  /** Optional struck-through price shown beside the real one. 0 = none. */
  comparePrice: number;
  tagline: string;
  bestFor: string;
  includes: string[];
}

export type AddOnKey = 'parallel' | 'audit' | 'mvp';

export interface AddOn {
  key: AddOnKey;
  name: string;
  enabled: boolean;
  showPrice: boolean;
  /** Monthly for a recurring add-on, a "from" price otherwise. */
  price: number;
  /** True rides on the subscription each month; false is fixed-scope work. */
  recurring: boolean;
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
  plan: Plan;
  addOns: AddOn[];
  leadMagnetEnabled: boolean;
  contactFormEnabled: boolean;
  analytics: {
    gaMeasurementId: string | null;
    plausibleDomain: string | null;
  };
}

const PLAN_DEFAULTS: Omit<
  Plan,
  'enabled' | 'showPrice' | 'price' | 'comparePrice'
> = {
  name: 'Fractional CTO',
  tagline: 'Unlimited requests, handled one at a time.',
  bestFor:
    'Growing businesses that need someone owning the technology, without a full-time hire.',
  includes: [
    'Unlimited requests, handled one at a time',
    'Most requests back within days',
    'Technical roadmap and delivery ownership',
    'Architecture and vendor reviews',
    'Hiring and contractor vetting',
    'Security, cost and reliability oversight',
    'Board and investor technical updates',
    'Async access on Slack or Teams',
  ],
};

function readPlan(): Plan {
  const env = process.env;
  return {
    ...PLAN_DEFAULTS,
    name: str(env.PLAN_NAME, PLAN_DEFAULTS.name),
    enabled: bool(env.PLAN_ENABLED, true),
    showPrice: bool(env.PLAN_SHOW_PRICE, true),
    price: num(env.PLAN_PRICE, 6000),
    comparePrice: num(env.PLAN_COMPARE_PRICE, 0),
  };
}

function readAddOns(): AddOn[] {
  const env = process.env;
  return [
    {
      key: 'parallel',
      name: 'A second request in parallel',
      enabled: bool(env.ADDON_PARALLEL_ENABLED, true),
      showPrice: bool(env.ADDON_PARALLEL_SHOW_PRICE, true),
      price: num(env.ADDON_PARALLEL_PRICE, 3000),
      recurring: true,
      summary:
        'Two requests moving at once instead of one, for the months when more than one thing needs to happen at the same time.',
      includes: [
        'Two active requests instead of one',
        'Same turnaround on both',
        'Add it or drop it month to month',
      ],
    },
    {
      key: 'audit',
      name: 'Technical audit',
      enabled: bool(env.ADDON_AUDIT_ENABLED, true),
      showPrice: bool(env.ADDON_AUDIT_SHOW_PRICE, true),
      price: num(env.ADDON_AUDIT_PRICE, 4500),
      recurring: false,
      summary:
        'A fixed-scope review of your code, architecture, security and team. Written for founders and investors, not just engineers.',
      includes: [
        'Plain-English report with a prioritised fix list',
        'Read-out call with your leadership team',
        'Built for due diligence before a raise or sale',
      ],
    },
    {
      key: 'mvp',
      name: 'MVP and product build',
      enabled: bool(env.ADDON_MVP_ENABLED, true),
      showPrice: bool(env.ADDON_MVP_SHOW_PRICE, true),
      price: num(env.ADDON_MVP_PRICE, 25000),
      recurring: false,
      summary:
        'Your first product or internal tool, built by a small senior team I lead. Scoped so you know what you get before we start.',
      includes: [
        'Discovery and scoping workshop',
        'Fixed milestones, a working demo every fortnight',
        'Production-ready, documented, handed over',
      ],
    },
  ];
}

export function getSiteConfig(): SiteConfig {
  const env = process.env;
  const siteUrl = str(env.SITE_URL, 'https://thefractionalcto.au').replace(
    /\/$/,
    '',
  );
  return {
    siteName: str(env.SITE_NAME, 'The Fractional CTO'),
    siteUrl,
    tagline: str(
      env.SITE_TAGLINE,
      'A CTO for growing businesses, without hiring one. Unlimited requests, one flat monthly fee.',
    ),
    bookingUrl: str(env.BOOKING_URL, '#booking'),
    contactEmail: str(env.CONTACT_EMAIL, 'hello@thefractionalcto.au'),
    currency: str(env.CURRENCY, 'AUD'),
    plan: readPlan(),
    addOns: readAddOns(),
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
