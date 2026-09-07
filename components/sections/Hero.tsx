import { ArrowRight } from 'lucide-react';
import { LinkButton } from '@/components/ui/button';
import { Pill } from '@/components/Section';
import { hero, founder } from '@/lib/content';
import { isExternal } from '@/lib/config';

export function Hero({ bookingUrl }: { bookingUrl: string }) {
  const linkProps = isExternal(bookingUrl)
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container grid items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="animate-fade-up">
          <Pill className="mb-7">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {hero.pill}
          </Pill>
          <h1 className="display text-balance text-display-xl font-bold">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-[21px]">
            {hero.subheadline}
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <LinkButton href={bookingUrl} size="xl" {...linkProps}>
              {hero.primaryCta}
            </LinkButton>
            <LinkButton href="#pricing" variant="link" size="xl" className="px-2">
              {hero.secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>
        </div>

        <FounderCutout />
      </div>
    </section>
  );
}

/**
 * The founder photo, cut out on a blue glow. The image is expected to be a
 * transparent cutout (PNG or WebP) so the glow reads as behind the person.
 * Until a real photo lands, public/founder-placeholder.svg stands in.
 */
function FounderCutout() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        className="hero-glow absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden
      />
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={founder.photo}
          alt={`${founder.firstName}, ${founder.title}`}
          width={880}
          height={880}
          className="relative z-10 mx-auto w-full max-w-[520px]"
        />
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-background/90 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur">
          {hero.photoCaption}: {founder.firstName}
        </div>
      </div>
    </div>
  );
}
