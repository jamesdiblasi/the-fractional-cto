import {
  Receipt,
  PauseCircle,
  MessageSquareText,
  BadgeCheck,
  Scale,
  UserPlus,
} from 'lucide-react';
import { Section } from '@/components/Section';
import { benefits } from '@/lib/content';

const icons = [Receipt, PauseCircle, MessageSquareText, BadgeCheck, Scale, UserPlus];

export function Benefits() {
  return (
    <Section
      id="benefits"
      tone="muted"
      title={benefits.title}
      intro={benefits.intro}
    >
      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.items.map((b, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={b.title}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <h3 className="display-sm mt-5 text-2xl font-bold">{b.title}</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
