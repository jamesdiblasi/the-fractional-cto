import { Check, ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';
import { GlowBlob } from '@/components/Shapes';
import { LinkButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  formatPrice,
  isExternal,
  type SiteConfig,
  type Tier,
} from '@/lib/config';
import { pricing } from '@/lib/content';

/**
 * One plan gets the big card; the others sit beside it as quieter options.
 * Every tier and one-off keeps its environment switches (see lib/config.ts):
 * show at all, show the price, the price itself, and an optional struck
 * compare price.
 */
export function Pricing({ site }: { site: SiteConfig }) {
  const tiers = site.tiers.filter((t) => t.enabled);
  const oneOffs = site.oneOffs.filter((o) => o.enabled);
  if (tiers.length === 0 && oneOffs.length === 0) return null;

  // The featured tier is Fractional when present; otherwise the first enabled.
  const featured = tiers.find((t) => t.featured) ?? tiers[0];
  const quiet = tiers.filter((t) => t !== featured);

  const linkProps = isExternal(site.bookingUrl)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Section
      id="pricing"
      title={pricing.title}
      intro={pricing.intro}
      className="relative isolate overflow-hidden"
    >
      <GlowBlob className="left-1/2 top-0 h-[320px] w-[740px] -translate-x-1/2 opacity-60" />
      {featured && (
        <div
          className={cn(
            'grid gap-5',
            quiet.length > 0 && 'lg:grid-cols-[1.25fr_1fr]',
          )}
        >
          <FeaturedCard
            tier={featured}
            currency={site.currency}
            bookingUrl={site.bookingUrl}
            linkProps={linkProps}
          />

          {quiet.length > 0 && (
            <div className="grid gap-5">
              {quiet.map((t) => (
                <QuietCard
                  key={t.key}
                  tier={t}
                  currency={site.currency}
                  bookingUrl={site.bookingUrl}
                  linkProps={linkProps}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {oneOffs.length > 0 && (
        <div className="mt-20">
          <h3 className="display-sm mb-6 text-center text-display-md font-bold">
            {pricing.oneOffTitle}
          </h3>
          <div className="grid gap-5 md:grid-cols-2">
            {oneOffs.map((o) => (
              <article
                key={o.key}
                className="rounded-2xl border border-border p-8 sm:p-9"
              >
                <div className="flex items-start justify-between gap-6">
                  <h4 className="display-sm text-2xl font-bold">{o.name}</h4>
                  <div className="shrink-0 text-right">
                    {o.showPrice ? (
                      <>
                        <p className="text-xs font-semibold text-muted-foreground">
                          From
                        </p>
                        <p className="display-sm text-2xl font-bold">
                          {formatPrice(o.price, site.currency)}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold">Scoped and quoted</p>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
                  {o.summary}
                </p>
                <ul className="mt-5 space-y-2 text-[15px]">
                  {o.includes.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <LinkButton
                  href={site.bookingUrl}
                  variant="outline"
                  className="mt-7"
                  {...linkProps}
                >
                  Enquire
                  <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </article>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

type CardProps = {
  tier: Tier;
  currency: string;
  bookingUrl: string;
  linkProps: { target?: string; rel?: string };
};

function Price({ tier, currency, large }: { tier: Tier; currency: string; large?: boolean }) {
  if (!tier.showPrice) {
    return (
      <div>
        <p className={cn('display font-bold', large ? 'text-display-md' : 'text-2xl')}>
          {tier.commitment}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{pricing.priceHidden}</p>
      </div>
    );
  }
  return (
    <div>
      {tier.comparePrice > tier.price && (
        <p className="text-lg font-semibold text-muted-foreground line-through decoration-2">
          {formatPrice(tier.comparePrice, currency)}
        </p>
      )}
      <p className="flex items-baseline gap-2">
        <span className={cn('display font-bold', large ? 'text-display-lg' : 'text-4xl')}>
          {formatPrice(tier.price, currency)}
        </span>
        <span className="text-base font-medium text-muted-foreground">/month</span>
      </p>
    </div>
  );
}

function FeaturedCard({ tier, currency, bookingUrl, linkProps }: CardProps) {
  return (
    <article className="relative flex flex-col rounded-2xl bg-muted p-8 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <h3 className="display-sm text-3xl font-bold">{tier.name}</h3>
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          {pricing.featuredLabel}
        </span>
      </div>
      <p className="mt-1 text-[17px] text-muted-foreground">{tier.tagline}</p>

      <div className="mt-8">
        <Price tier={tier} currency={currency} large />
        {tier.showPrice && (
          <p className="mt-2 text-sm text-muted-foreground">{tier.commitment}</p>
        )}
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Best for: </span>
        {tier.bestFor}
      </p>

      <ul className="mt-7 grid gap-2.5 text-[15px] sm:grid-cols-2">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <LinkButton href={bookingUrl} size="lg" className="mt-9 w-full sm:w-auto" {...linkProps}>
        {pricing.ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </LinkButton>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {pricing.callouts.map((c) => (
          <div key={c.title} className="rounded-xl bg-background p-5">
            <p className="font-bold">{c.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function QuietCard({ tier, currency, bookingUrl, linkProps }: CardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-border p-8">
      <h3 className="display-sm text-2xl font-bold">{tier.name}</h3>
      <p className="mt-1 text-muted-foreground">{tier.tagline}</p>
      <div className="mt-6">
        <Price tier={tier} currency={currency} />
        {tier.showPrice && (
          <p className="mt-1 text-sm text-muted-foreground">{tier.commitment}</p>
        )}
      </div>
      <ul className="mt-5 space-y-2 text-[15px]">
        {tier.includes.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <LinkButton
        href={bookingUrl}
        variant="outline"
        className="mt-7 w-full sm:w-auto"
        {...linkProps}
      >
        {pricing.quietCtaLabel}
      </LinkButton>
    </article>
  );
}
