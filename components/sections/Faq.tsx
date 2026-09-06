import { ChevronDown } from 'lucide-react';
import { Section } from '@/components/Section';
import { faqs } from '@/lib/content';

/** Native <details> so it works with JavaScript disabled and needs no client code. */
export function Faq() {
  return (
    <Section
      id="faq"
      tone="card"
      eyebrow="FAQ"
      title="Questions founders usually ask first."
    >
      <div className="mx-auto max-w-3xl divide-y divide-border rounded-xl border border-border bg-background">
        {faqs.map((f) => (
          <details key={f.q} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
