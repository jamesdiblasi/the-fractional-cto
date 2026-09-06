import { ArrowRight, Check } from 'lucide-react';
import { LinkButton } from '@/components/ui/button';
import { Eyebrow } from '@/components/Section';
import { hero } from '@/lib/content';

export function Hero({ bookingUrl }: { bookingUrl: string }) {
  const external = bookingUrl.startsWith('http');
  const proofPoints = [
    'No long lock-in',
    'Plain-English reporting',
    'Remote, Australia-based',
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid mask-fade-b absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div className="container grid items-center gap-16 py-24 sm:py-32 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-up">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton
              href={bookingUrl}
              size="lg"
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="#how-it-works" size="lg" variant="outline">
              {hero.secondaryCta}
            </LinkButton>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {proofPoints.map((p) => (
              <li key={p} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <HeroPanel />
      </div>
    </section>
  );
}

/**
 * A decorative "engagement summary" card. Reads as a snapshot of a real
 * engagement and gives the hero some visual weight without a stock photo.
 */
function HeroPanel() {
  const rows = [
    { label: 'Engagement', value: 'Fractional, 2 days / week' },
    { label: 'First 90 days', value: 'Roadmap, hiring plan, cost review' },
    { label: 'Reporting', value: 'Monthly board note, plain English' },
    { label: 'Team', value: '4 engineers, 1 contractor' },
  ];
  return (
    <div className="relative hidden lg:block" aria-hidden>
      <div className="rounded-xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Engagement snapshot
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-xs text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            On track
          </span>
        </div>
        <dl className="divide-y divide-border">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-6 py-3">
              <dt className="text-sm text-muted-foreground">{r.label}</dt>
              <dd className="text-right text-sm font-medium">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-lg border border-border bg-background/60 p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            This month
          </p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-primary" />
              Cloud bill down 31% after right-sizing
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-primary" />
              Senior engineer hired, starts in 3 weeks
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-primary" />
              Release cadence moved to fortnightly
            </li>
          </ul>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-xl border border-border/60" />
    </div>
  );
}
