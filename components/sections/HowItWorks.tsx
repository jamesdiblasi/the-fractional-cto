import { Section } from '@/components/Section';
import { PercentStep } from '@/components/Shapes';
import { howItWorks } from '@/lib/content';

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      tone="muted"
      title={howItWorks.title}
      intro={howItWorks.intro}
    >
      <ol className="grid gap-5 md:grid-cols-3">
        {howItWorks.steps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-2xl bg-muted p-8 sm:p-10"
          >
            <PercentStep n={i + 1} />
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
