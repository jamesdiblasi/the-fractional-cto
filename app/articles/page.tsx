import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/config';
import { articleIndex, articles, formatDate, readingMinutes } from '@/lib/articles';
import { emphasise } from '@/components/Emphasis';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  const site = getSiteConfig();
  return {
    title: 'Articles',
    description: articleIndex.description,
    alternates: { canonical: '/articles' },
    openGraph: {
      type: 'website',
      title: `Articles | ${site.siteName}`,
      description: articleIndex.description,
      url: `${site.siteUrl}/articles`,
      siteName: site.siteName,
      locale: 'en_AU',
    },
    robots: { index: true, follow: true },
  };
}

/**
 * The index exists so the articles are not orphans: it gives crawlers one
 * page that links to all of them, and gives a reader who lands on one a way
 * to find the rest. It is still not linked from the site navigation.
 */
export default function ArticlesPage() {
  const site = getSiteConfig();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Articles | ${site.siteName}`,
    description: articleIndex.description,
    url: `${site.siteUrl}/articles`,
    publisher: { '@id': `${site.siteUrl}/#organization` },
    hasPart: articles.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      description: a.description,
      datePublished: a.published,
      url: `${site.siteUrl}/articles/${a.slug}`,
    })),
  };

  return (
    <>
      <div className="container max-w-3xl pb-8 pt-14 sm:pt-20">
        <p className="mb-4 text-sm font-semibold text-primary">
          {articleIndex.eyebrow}
        </p>
        <h1 className="display text-balance text-display-lg font-bold">
          {emphasise(articleIndex.title)}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
          {articleIndex.description}
        </p>
      </div>

      <div className="container max-w-3xl pb-24">
        <ul className="divide-y divide-border border-t border-border">
          {articles.map((a) => (
            <li key={a.slug}>
              <a
                href={`/articles/${a.slug}`}
                className="group grid gap-2 py-8 sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div>
                  <h2 className="display-sm text-2xl font-bold group-hover:underline">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm text-muted-foreground sm:pt-2 sm:text-right">
                  <time dateTime={a.updated ?? a.published}>
                    {formatDate(a.updated ?? a.published)}
                  </time>
                  <span className="block">{readingMinutes(a)} min read</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
