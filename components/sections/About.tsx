import { MapPin } from 'lucide-react';
import { Section } from '@/components/Section';
import { about } from '@/lib/content';

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Someone who has sat in the CTO chair, not just advised it."
    >
      <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr]">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={about.photo}
            alt={about.name}
            width={640}
            height={640}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold">{about.name}</h3>
          <p className="mt-1 text-sm text-primary">{about.role}</p>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {about.location}
          </p>
        </div>
      </div>
    </Section>
  );
}
