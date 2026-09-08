/**
 * The shape of a keyword article.
 *
 * Articles are plain data, the same way the landing page copy is: no MDX, no
 * CMS, no new dependency. Each one exports an `Article` and lib/articles
 * collects them.
 *
 * Voice matches lib/content.ts: bold, short, plain. No emoji, no contractions.
 * Write for a founder who is not technical and is in a hurry.
 */

/**
 * A paragraph, or the text inside a list item, may carry two markers:
 *
 *   **bold**              emphasis inside running text
 *   [label](/somewhere)   a link, internal or external
 *
 * Nothing else is parsed. See components/Prose.tsx.
 */
export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  /** Bulleted. Each item may lead with `**A label.** the rest`. */
  | { kind: 'list'; items: string[] }
  /** Numbered, for anything that happens in an order. */
  | { kind: 'steps'; items: string[] }
  /** A tinted box. One per article at most, or it stops standing out. */
  | { kind: 'callout'; title: string; text: string };

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  /** URL segment. Lowercase, hyphenated, never changed once published. */
  slug: string;
  /** The <title> and the card headline. Keep under about 60 characters. */
  title: string;
  /**
   * The on-page h1. May differ from `title` and may mark one phrase with
   * *asterisks* for the italic serif, as headlines do elsewhere.
   */
  headline: string;
  /** Meta description. One or two sentences, under about 155 characters. */
  description: string;
  /** The phrase this page is meant to win. One per article. */
  primaryKeyword: string;
  /** Secondary phrases, used in the metadata keywords list. */
  keywords: string[];
  /** ISO date. Also used as the last-modified date in the sitemap. */
  published: string;
  /** Optional ISO date, shown and published when the piece is revised. */
  updated?: string;
  /** The standfirst under the headline. Two sentences at most. */
  standfirst: string;
  body: Block[];
  /** Rendered on the page and published as FAQPage structured data. */
  faqs?: ArticleFaq[];
  /** Slugs of two or three other articles. Cross-linking is the point. */
  related: string[];
}
