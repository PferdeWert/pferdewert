/**
 * ArticleSchema Component
 * Renders JSON-LD structured data for Schema.org Article type
 * Used for SEO rich snippets in Google search results
 */

import { ArticleStructuredData } from '@/types/ratgeber';
import { warn } from '@/lib/log';

interface ArticleSchemaProps {
  data: ArticleStructuredData;
}

/**
 * Renders JSON-LD script tag with Article schema markup
 *
 * @param data - Complete Article structured data conforming to Schema.org spec
 * @returns Script tag with properly formatted JSON-LD
 *
 * @example
 * ```tsx
 * <ArticleSchema
 *   data={{
 *     '@context': 'https://schema.org',
 *     '@type': 'Article',
 *     headline: 'Pferd kaufen - Der ultimative Ratgeber',
 *     description: 'Alles was Sie über den Pferdekauf wissen müssen',
 *     image: 'https://pferdewert.de/images/pferdekauf.jpg',
 *     datePublished: '2025-01-15T10:00:00+01:00',
 *     dateModified: '2025-01-15T10:00:00+01:00',
 *     author: {
 *       '@type': 'Organization',
 *       name: 'PferdeWert.de',
 *       url: 'https://pferdewert.de'
 *     },
 *     publisher: {
 *       '@type': 'Organization',
 *       name: 'PferdeWert.de',
 *       logo: {
 *         '@type': 'ImageObject',
 *         url: 'https://pferdewert.de/logo.png'
 *       }
 *     },
 *     mainEntityOfPage: {
 *       '@type': 'WebPage',
 *       '@id': 'https://pferdewert.de/pferde-ratgeber/pferd-kaufen'
 *     }
 *   }}
 * />
 * ```
 */
export default function ArticleSchema({ data }: ArticleSchemaProps) {
  // Validate required fields to prevent invalid JSON-LD
  if (!data.headline || !data.image || !data.datePublished || !data.author || !data.publisher) {
    warn('ArticleSchema: Missing required fields for valid Schema.org markup');
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
}
