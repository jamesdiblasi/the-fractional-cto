import { Section } from '@/components/Section';
import { howItWorks } from '@/lib/content';

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      title={howItWorks.title}
      intro={howItWorks.intro}
    >
      <ol className="grid gap-5 md:grid-cols-3">
        {howItWorks.steps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-2xl bg-muted p-8 sm:p-10"
          >
            <span className="display inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
              {i + 1}
            </span>
            <h3 className="display-sm mt-8 text-display-md font-bold">
              {s.title}
            </h3>
            <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
