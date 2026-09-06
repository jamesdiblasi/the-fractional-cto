import { Rocket, Building2, Users, Handshake } from 'lucide-react';
import { Section } from '@/components/Section';
import { audiences } from '@/lib/content';

const icons = [Rocket, Building2, Users, Handshake];

export function Audiences() {
  return (
    <Section
      id="who"
      eyebrow="Who this is for"
      title="Built for the stage you are actually at."
      intro="Different businesses need different amounts of a CTO. The job is the same, the dose changes."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a, i) => {
          const Icon = icons[i % icons.length];
          return (
            <article
              key={a.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.body}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
