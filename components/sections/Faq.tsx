import { Plus } from 'lucide-react';
import { Section } from '@/components/Section';
import { faqs } from '@/lib/content';

/** Native <details>, so it works without JavaScript and needs no client code. */
export function Faq() {
  return (
    <Section id="faq" title={faqs.title}>
      <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
        {faqs.items.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold sm:text-xl [&::-webkit-details-marker]:hidden">
              {f.q}
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-transform group-open:rotate-45">
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
