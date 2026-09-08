import type { MetadataRoute } from 'next';
import { getSiteConfig } from '@/lib/config';
import { articles, lastModified } from '@/lib/articles';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getSiteConfig();
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    // Nothing in the navigation links to the articles, so the sitemap is how
    // they are found.
    {
      url: `${siteUrl}/articles`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...articles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: lastModified(article),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
