import * as React from 'react';

/**
 * Copy in lib/content.ts marks an accented phrase with asterisks:
 *
 *   headline: 'A CTO *subscription* for growing businesses.'
 *
 * This renders those phrases in the italic serif, the one place the site
 * leaves Figtree. Keep it to a word or two per headline; the contrast is the
 * point, and it stops working when everything is emphasised.
 *
 * Text with no asterisks passes straight through, so it is safe to wrap every
 * headline in this whether or not the copy uses the marker.
 */
export function emphasise(text: string): React.ReactNode {
  const parts = text.split(/\*([^*]+)\*/g);
  if (parts.length === 1) return text;

  // split() with one capture group alternates: plain, captured, plain, ...
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-accent font-normal tracking-[-0.005em]">
        {part}
      </em>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}
