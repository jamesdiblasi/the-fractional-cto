import { Section } from '@/components/Section';
import { process } from '@/lib/content';

export function Process() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From first call to a team that knows where it is going."
      intro="No surprises. You will know what happens next at every step, and what it costs."
    >
      <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          className="absolute left-0 right-0 top-5 hidden h-px bg-border lg:block"
          aria-hidden
        />
        {process.map((p) => (
          <li key={p.step} className="relative">
            <div className="mb-5 inline-flex h-10 items-center rounded-full border border-primary/40 bg-background px-3 font-mono text-sm text-primary">
              {p.step}
            </div>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
