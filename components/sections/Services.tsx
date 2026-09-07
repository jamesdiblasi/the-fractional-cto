import { Section } from '@/components/Section';
import { services } from '@/lib/content';

export function Services() {
  return (
    <Section id="services" title={services.title} intro={services.intro}>
      <ol className="mx-auto max-w-4xl divide-y divide-border border-y border-border">
        {services.items.map((s, i) => (
          <li
            key={s.title}
            className="grid gap-4 py-9 sm:grid-cols-[72px_1fr] sm:gap-8"
          >
            <span className="display text-3xl font-bold text-foreground/25 sm:text-4xl">
              0{i + 1}
            </span>
            <div>
              <h3 className="display-sm text-2xl font-bold sm:text-[28px]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
