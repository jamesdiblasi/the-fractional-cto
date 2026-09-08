import { Check, ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';
import { GlowBlob } from '@/components/Shapes';
import { LinkButton } from '@/components/ui/button';
import {
  formatPrice,
  isExternal,
  type SiteConfig,
  type AddOn,
} from '@/lib/config';
import { pricing } from '@/lib/content';

/**
 * One plan, then the optional extras.
 *
 * The subscription is sold on throughput, not time, so nothing here quotes
 * hours or days: the hero promises unlimited requests for a flat fee, and a
 * price per day would contradict it. Extra capacity is an add-on that buys a
 * second request in parallel rather than a bigger slice of the week.
 *
 * The plan and every add-on keep their environment switches (see
 * lib/config.ts): show at all, show the price, and the price itself.
 */
export function Pricing({ site }: { site: SiteConfig }) {
  const { plan } = site;
  const addOns = site.addOns.filter((a) => a.enabled);
  if (!plan.enabled && addOns.length === 0) return null;

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

      {plan.enabled && (
        <article className="mx-auto flex max-w-3xl flex-col rounded-2xl border border-border/60 bg-muted p-8 sm:p-10">
          <h3 className="display-sm text-3xl font-bold">{plan.name}</h3>
          <p className="mt-1 text-[17px] text-muted-foreground">
            {plan.tagline}
          </p>

          <div className="mt-8">
            {plan.showPrice ? (
              <>
                {plan.comparePrice > plan.price && (
                  <p className="text-lg font-semibold text-muted-foreground line-through decoration-2">
                    {formatPrice(plan.comparePrice, site.currency)}
                  </p>
                )}
                <p className="flex items-baseline gap-2">
                  <span className="display text-display-lg font-bold">
                    {formatPrice(plan.price, site.currency)}
                  </span>
                  <span className="text-base font-medium text-muted-foreground">
                    {pricing.recurringSuffix}
                  </span>
                </p>
              </>
            ) : (
              <p className="display text-display-md font-bold">
                {pricing.priceHidden}
              </p>
            )}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Best for: </span>
            {plan.bestFor}
          </p>

          <ul className="mt-7 grid gap-2.5 text-[15px] sm:grid-cols-2">
            {plan.includes.map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-primary"
                  strokeWidth={2.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <LinkButton
            href={site.bookingUrl}
            size="lg"
            className="mt-9 w-full sm:w-auto"
            {...linkProps}
          >
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
      )}

      {addOns.length > 0 && (
        <div className="mt-20">
          <h3 className="display-sm text-center text-display-md font-bold">
            {pricing.addOnTitle}
          </h3>
          <p className="mb-8 mt-3 text-center text-muted-foreground">
            {pricing.addOnIntro}
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {addOns.map((addOn) => (
              <AddOnCard
                key={addOn.key}
                addOn={addOn}
                currency={site.currency}
                bookingUrl={site.bookingUrl}
                linkProps={linkProps}
              />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

function AddOnCard({
  addOn,
  currency,
  bookingUrl,
  linkProps,
}: {
  addOn: AddOn;
  currency: string;
  bookingUrl: string;
  linkProps: { target?: string; rel?: string };
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-border p-8">
      <h4 className="display-sm text-2xl font-bold">{addOn.name}</h4>

      <div className="mt-4">
        {addOn.showPrice ? (
          <p className="flex items-baseline gap-1.5">
            {!addOn.recurring && (
              <span className="text-xs font-semibold text-muted-foreground">
                {pricing.fromLabel}
              </span>
            )}
            <span className="display-sm text-3xl font-bold">
              {formatPrice(addOn.price, currency)}
            </span>
            {addOn.recurring && (
              <span className="text-sm font-medium text-muted-foreground">
                {pricing.recurringSuffix}
              </span>
            )}
          </p>
        ) : (
          <p className="text-sm font-semibold">Scoped and quoted</p>
        )}
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        {addOn.summary}
      </p>

      <ul className="mt-5 space-y-2 text-[15px]">
        {addOn.includes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check
              className="mt-1 h-4 w-4 shrink-0 text-primary"
              strokeWidth={2.5}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <LinkButton
        href={bookingUrl}
        variant="outline"
        className="mt-7 w-full"
        {...linkProps}
      >
        {pricing.addOnCtaLabel}
        <ArrowRight className="h-4 w-4" />
      </LinkButton>
    </article>
  );
}
