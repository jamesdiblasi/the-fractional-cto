import * as React from 'react';
import type { Block } from '@/lib/articles/types';

/**
 * Renders an article body. Deliberately small: a handful of block types and
 * two inline markers, so article copy stays plain data and the site keeps no
 * markdown dependency.
 *
 * Type sizes match the landing page rather than a typical blog: the same
 * Figtree, the same tight display tracking on headings, the same muted body
 * colour.
 */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'h2':
            return (
              <h2
                key={i}
                className="display-sm pt-6 text-display-md font-bold text-foreground"
              >
                {block.text}
              </h2>
            );
          case 'h3':
            return (
              <h3
                key={i}
                className="pt-4 text-xl font-bold text-foreground sm:text-2xl"
              >
                {block.text}
              </h3>
            );
          case 'list':
            return (
              <ul key={i} className="ml-1 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case 'steps':
            return (
              <ol key={i} className="ml-1 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[13px] font-bold text-secondary-foreground"
                    >
                      {j + 1}
                    </span>
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case 'callout':
            return (
              <aside
                key={i}
                className="rounded-xl border border-border bg-muted p-6 sm:p-7"
              >
                <p className="text-base font-bold text-foreground">
                  {block.title}
                </p>
                <p className="mt-2 text-[17px] leading-relaxed">
                  {inline(block.text)}
                </p>
              </aside>
            );
          default:
            return <p key={i}>{inline(block.text)}</p>;
        }
      })}
    </div>
  );
}

/**
 * The inline subset: `**bold**` and `[label](/href)`. One pass, because a
 * split on either marker keeps the pieces in order.
 */
const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function inline(text: string): React.ReactNode {
  const out: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  INLINE.lastIndex = 0;
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      out.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {match[1]}
        </strong>,
      );
    } else {
      const href = match[3];
      const external = /^https?:\/\//i.test(href);
      out.push(
        <a
          key={match.index}
          href={href}
          className="font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {match[2]}
        </a>,
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.length === 1 ? out[0] : out;
}
