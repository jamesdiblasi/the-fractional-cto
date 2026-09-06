import { Check } from 'lucide-react';
import { Section } from '@/components/Section';
import { services } from '@/lib/content';

export function Services() {
  return (
    <Section
      id="services"
      tone="card"
      eyebrow="Services"
      title="Four ways to work together."
      intro="Most clients start with one and move between them as the business changes. None of them come with a long lock-in."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s, i) => (
          <article
            key={s.title}
            className="group relative flex flex-col rounded-xl border border-border bg-background p-7"
          >
            <span className="mb-4 font-mono text-xs text-muted-foreground">
              0{i + 1}
            </span>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.bullets.map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90"
                >
                  <Check className="h-3 w-3 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
