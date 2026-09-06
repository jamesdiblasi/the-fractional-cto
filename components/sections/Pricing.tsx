import { Check, ArrowRight } from 'lucide-react';
import { Section } from '@/components/Section';
import { LinkButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatPrice, type SiteConfig } from '@/lib/config';

/**
 * Every tier and one-off has two switches from the environment: whether it
 * appears at all, and whether its price is printed. See lib/config.ts.
 */
export function Pricing({ site }: { site: SiteConfig }) {
  const tiers = site.tiers.filter((t) => t.enabled);
  const oneOffs = site.oneOffs.filter((o) => o.enabled);
  if (tiers.length === 0 && oneOffs.length === 0) return null;

  const external = site.bookingUrl.startsWith('http');
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Section
      id="pricing"
      tone="card"
      eyebrow="Pricing"
      title="Clear pricing. No surprises on the invoice."
      intro="Retainers are monthly and can be paused with a month's notice. One-off work is scoped and quoted before anything starts. All prices in Australian dollars."
    >
      {tiers.length > 0 && (
        <div
          className={cn(
            'grid gap-4',
            tiers.length === 1 && 'max-w-md',
            tiers.length === 2 && 'md:grid-cols-2',
            tiers.length >= 3 && 'md:grid-cols-3',
          )}
        >
          {tiers.map((t) => (
            <article
              key={t.key}
              className={cn(
                'relative flex flex-col rounded-xl border bg-background p-7',
                t.highlighted
                  ? 'border-primary shadow-[0_0_0_1px_hsl(var(--primary))] md:-my-3 md:py-10'
                  : 'border-border',
              )}
            >
              {t.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most common
                </span>
              )}
              <h3 className="text-xl font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.tagline}</p>

              <div className="mt-6">
                {t.showPrice ? (
                  <>
                    <p className="font-mono text-4xl font-semibold tracking-tight">
                      {formatPrice(t.price, site.currency)}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      per month, {t.commitment.toLowerCase()}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-semibold tracking-tight">
                      {t.commitment}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Priced on the discovery call
                    </p>
                  </>
                )}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Best for: </span>
                {t.bestFor}
              </p>

              <ul className="mt-6 space-y-2.5 text-sm">
                {t.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <LinkButton
                href={site.bookingUrl}
                variant={t.highlighted ? 'default' : 'outline'}
                className="mt-8"
                {...linkProps}
              >
                Talk about {t.name}
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
            </article>
          ))}
        </div>
      )}

      {oneOffs.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Fixed-scope work
          </h3>
          <div
            className={cn(
              'grid gap-4',
              oneOffs.length >= 2 && 'md:grid-cols-2',
            )}
          >
            {oneOffs.map((o) => (
              <article
                key={o.key}
                className="flex flex-col rounded-xl border border-border bg-background p-7 sm:flex-row sm:gap-8"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{o.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {o.summary}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {o.includes.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 shrink-0 sm:mt-0 sm:w-40 sm:text-right">
                  {o.showPrice ? (
                    <>
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="font-mono text-2xl font-semibold">
                        {formatPrice(o.price, site.currency)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-medium">Scoped and quoted</p>
                  )}
                  <LinkButton
                    href={site.bookingUrl}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    {...linkProps}
                  >
                    Enquire
                  </LinkButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
