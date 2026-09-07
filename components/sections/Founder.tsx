import { MapPin } from 'lucide-react';
import { Section, Eyebrow } from '@/components/Section';
import { founder } from '@/lib/content';

export function Founder() {
  return (
    <Section id="about" tone="muted">
      <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-2xl bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={founder.photo}
              alt={founder.name}
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
        <div>
          <Eyebrow>{founder.eyebrow}</Eyebrow>
          <h2 className="display text-balance text-display-lg font-bold">
            {founder.headline}
          </h2>
          <div className="mt-7 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {founder.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-7 text-[15px] font-semibold">
            {founder.name}
            <span className="font-normal text-muted-foreground">, {founder.title}</span>
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {founder.location}
          </p>
        </div>
      </div>
    </Section>
  );
}
