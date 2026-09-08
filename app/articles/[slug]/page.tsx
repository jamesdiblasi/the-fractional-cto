import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSiteConfig, isExternal } from '@/lib/config';
import {
  formatDate,
  getArticle,
  readingMinutes,
  relatedArticles,
} from '@/lib/articles';
import { founder } from '@/lib/content';
import { Prose } from '@/components/Prose';
import { emphasise } from '@/components/Emphasis';
import { LinkButton } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

interface Params {
  params: { slug: string };
}

// No generateStaticParams: the pages read the site config (the booking link,
// the site URL) at request time, the same as every other page here, so an
// App Service setting can change without a rebuild.

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticle(params.slug);
  if (!article) return { title: 'Not found', robots: { index: false } };
  const site = getSiteConfig();
  const url = `${site.siteUrl}/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: [article.primaryKeyword, ...article.keywords],
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url,
      siteName: site.siteName,
      locale: 'en_AU',
      publishedTime: article.published,
      modifiedTime: article.updated ?? article.published,
      authors: [founder.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function ArticlePage({ params }: Params) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const site = getSiteConfig();
  const url = `${site.siteUrl}/articles/${article.slug}`;
  const related = relatedArticles(article);
  const external = isExternal(site.bookingUrl);
  const bookingHref = external
    ? site.bookingUrl
    : `/${site.bookingUrl.replace(/^\/+/, '')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.published,
        dateModified: article.updated ?? article.published,
        inLanguage: 'en-AU',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: {
          '@type': 'Person',
          name: founder.name,
          jobTitle: founder.title,
        },
        publisher: { '@id': `${site.siteUrl}/#organization` },
        about: [article.primaryKeyword, ...article.keywords],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: site.siteName,
            item: `${site.siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Articles',
            item: `${site.siteUrl}/articles`,
          },
          { '@type': 'ListItem', position: 3, name: article.title, item: url },
        ],
      },
      ...(article.faqs?.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#faq`,
              mainEntity: article.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article>
      <div className="container max-w-2xl pb-16 pt-14 sm:pt-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            Home
          </a>
          <span aria-hidden className="px-2">
            /
          </span>
          <a href="/articles" className="hover:text-foreground">
            Articles
          </a>
        </nav>

        <h1 className="display mt-6 text-balance text-display-lg font-bold">
          {emphasise(article.headline)}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          {article.standfirst}
        </p>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{founder.name}</span>
          <span aria-hidden>&middot;</span>
          <time dateTime={article.updated ?? article.published}>
            {formatDate(article.updated ?? article.published)}
          </time>
          <span aria-hidden>&middot;</span>
          <span>{readingMinutes(article)} min read</span>
        </p>

        <hr className="mt-10 border-border" />

        <div className="mt-10">
          <Prose blocks={article.body} />
        </div>

        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="display-sm text-display-md font-bold">
              Common questions
            </h2>
            <dl className="mt-8 space-y-7">
              {article.faqs.map((faq) => (
                <div key={faq.q}>
                  <dt className="text-lg font-bold">{faq.q}</dt>
                  <dd className="mt-2 text-lg leading-relaxed text-muted-foreground">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>

      <section className="edge-slash bg-muted py-24 sm:py-28">
        <div className="container max-w-2xl">
          <h2 className="display text-balance text-display-md font-bold">
            {emphasise('Bring me the decision that is *currently stuck*.')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Fifteen minutes on a call, no slides and no pitch. Or read how the
            subscription works: unlimited requests, one flat monthly fee, pause
            or cancel anytime.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton
              href={bookingHref}
              size="lg"
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              Book a 15-min intro call
            </LinkButton>
            <LinkButton href="/#pricing" size="lg" variant="outline">
              See pricing
            </LinkButton>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container max-w-2xl py-20">
          <h2 className="display-sm text-2xl font-bold">Keep reading</h2>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {related.map((r) => (
              <li key={r.slug}>
                <a
                  href={`/articles/${r.slug}`}
                  className="group flex flex-col gap-1 py-5"
                >
                  <span className="text-lg font-bold group-hover:underline">
                    {r.title}
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted-foreground">
                    {r.description}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px]">
            <a href="/articles" className="font-semibold underline underline-offset-4">
              All articles
            </a>
          </p>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
