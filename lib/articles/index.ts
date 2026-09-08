/**
 * Keyword articles.
 *
 * These pages exist to be found in search, not to be browsed. Nothing in the
 * site navigation links to them by design; discovery is the sitemap, the
 * /articles index, and the cross-links between the articles themselves.
 *
 * Adding one: write lib/articles/<slug>.ts exporting `article`, then import
 * it below. Everything else (routes, metadata, structured data, sitemap
 * entries, related links) follows from the registry.
 *
 * Note on numbers: the dollar figures in these articles are indicative market
 * ranges for Australia in 2026, written to be defensible rather than precise.
 * Review them before launch and again yearly, since a stale price is the
 * fastest way to lose a reader's trust.
 */

import type { Article } from './types';
import { article as whatDoesAFractionalCtoDo } from './what-does-a-fractional-cto-do';
import { article as fractionalCtoVsFullTimeCto } from './fractional-cto-vs-full-time-cto';
import { article as fractionalCtoCostAustralia } from './fractional-cto-cost-australia';
import { article as whenToHireACto } from './when-to-hire-a-cto';
import { article as technicalDueDiligenceChecklist } from './technical-due-diligence-checklist';
import { article as howToChooseASoftwareDevelopmentAgency } from './how-to-choose-a-software-development-agency';
import { article as howMuchDoesAnMvpCost } from './how-much-does-an-mvp-cost';
import { article as reduceCloudCosts } from './reduce-cloud-costs';
import { article as aiAutomationForSmallBusiness } from './ai-automation-for-small-business';

export type { Article, ArticleFaq, Block } from './types';

/** Registry order is the order of the index page. Most useful first. */
export const articles: Article[] = [
  whatDoesAFractionalCtoDo,
  fractionalCtoVsFullTimeCto,
  fractionalCtoCostAustralia,
  whenToHireACto,
  technicalDueDiligenceChecklist,
  howToChooseASoftwareDevelopmentAgency,
  howMuchDoesAnMvpCost,
  reduceCloudCosts,
  aiAutomationForSmallBusiness,
];

export const articleIndex = {
  title: 'Notes on running technology *without a CTO*.',
  description:
    'Plain-English answers to the questions founders ask before they hire technical leadership: what things cost, when to hire, and how not to get burned.',
  eyebrow: 'Articles',
};

const bySlug = new Map(articles.map((a) => [a.slug, a]));

export function getArticle(slug: string): Article | undefined {
  return bySlug.get(slug);
}

/**
 * The related articles for a piece, in the order it lists them, skipping any
 * slug that no longer resolves so a deleted article cannot break a page.
 */
export function relatedArticles(article: Article): Article[] {
  return article.related
    .map((slug) => bySlug.get(slug))
    .filter((a): a is Article => a !== undefined && a.slug !== article.slug);
}

/** The date a page was last meaningfully changed. */
export function lastModified(article: Article): Date {
  return new Date(article.updated ?? article.published);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Australia/Melbourne',
  }).format(new Date(iso));
}

/**
 * Rough reading time. Counts the words in the standfirst, body and FAQs at
 * 220 words a minute, which is about right for prose of this weight.
 */
export function readingMinutes(article: Article): number {
  let words = article.standfirst.split(/\s+/).length;
  for (const block of article.body) {
    if ('text' in block) words += block.text.split(/\s+/).length;
    if ('title' in block) words += block.title.split(/\s+/).length;
    if ('items' in block) {
      for (const item of block.items) words += item.split(/\s+/).length;
    }
  }
  for (const faq of article.faqs ?? []) {
    words += faq.q.split(/\s+/).length + faq.a.split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 220));
}
