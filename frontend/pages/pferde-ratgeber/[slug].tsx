/**
 * ISR-enabled ratgeber article page
 * Dynamically generates pages for articles received from Outrank webhook
 * Revalidates every 24 hours automatically
 */

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { error } from '@/lib/log';
import { connectToDatabase } from '@/lib/mongo/client';
import { getRatgeberRepository } from '@/lib/mongo/ratgeber-repository';
import { RatgeberArticle } from '@/types/ratgeber';
import Layout from '@/components/Layout';
import RelatedArticles from '@/components/ratgeber/RelatedArticles';
import { Clock, Calendar, Tag } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface RatgeberArticlePageProps {
  article: RatgeberArticle;
  relatedArticles: Array<Pick<RatgeberArticle, '_id' | 'outrank' | 'pferdewert' | 'seo'>>;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const ARTICLE_REVALIDATE_SECONDS = 86400; // 24 hours
const RELATED_ARTICLES_COUNT = 3;
const WORDS_PER_MINUTE = 200; // German text reading speed

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate reading time based on content length
 * Removes HTML tags and counts words
 * German reading speed: 200 words/minute
 */
function calculateReadingTime(html: string): number {
  // Remove HTML tags with regex
  const plainText = html.replace(/<[^>]*>/g, '');

  // Count words (split by whitespace and filter empty)
  const wordCount = plainText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Calculate reading time with minimum of 1 minute
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

// ============================================================================
// ISR: STATIC PATH GENERATION
// ============================================================================

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { db } = await connectToDatabase();
    const repository = getRatgeberRepository(db);

    // Get all published article slugs
    const slugs = await repository.getAllSlugs();

    const paths = slugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      // Enable ISR: generate pages on-demand for new articles
      fallback: 'blocking',
    };
  } catch (err) {
    error('Failed to generate static paths', { error: err });
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

// ============================================================================
// ISR: STATIC PROPS WITH REVALIDATION
// ============================================================================

export const getStaticProps: GetStaticProps<
  RatgeberArticlePageProps
> = async ({ params }) => {
  try {
    const slug = params?.slug as string;

    if (!slug) {
      return { notFound: true };
    }

    const { db } = await connectToDatabase();
    const repository = getRatgeberRepository(db);

    // Fetch article by slug
    const article = await repository.findBySlug(slug);

    if (!article) {
      return { notFound: true };
    }

    // Only show published articles
    if (article.publishing.status !== 'published') {
      return { notFound: true };
    }

    // Fetch related articles
    const relatedArticlesResponse = await repository.findRelated(
      article._id,
      RELATED_ARTICLES_COUNT
    );

    return {
      props: {
        article,
        relatedArticles: relatedArticlesResponse.articles,
      },
      // Revalidate every 24 hours
      revalidate: ARTICLE_REVALIDATE_SECONDS,
    };
  } catch (err) {
    error('Failed to fetch article', { slug: params?.slug, error: err });
    return { notFound: true };
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function RatgeberArticlePage({
  article,
  relatedArticles,
}: RatgeberArticlePageProps) {
  const displayTitle =
    article.pferdewert.edited_title || article.outrank.title;
  const displayContent =
    article.pferdewert.edited_content_html || article.outrank.content_html;
  const featuredImage =
    article.pferdewert.featured_image || article.outrank.image_url;
  const readingTime = calculateReadingTime(displayContent);

  return (
    <Layout>
      {/* SEO Meta Tags */}
      <Head>
        <title>{article.seo.meta_title}</title>
        <meta name="description" content={article.seo.meta_description} />
        <link rel="canonical" href={article.seo.canonical_url} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.seo.og_title} />
        <meta
          property="og:description"
          content={article.seo.og_description}
        />
        <meta property="og:image" content={article.seo.og_image} />
        <meta property="og:url" content={article.seo.canonical_url} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.seo.og_title} />
        <meta
          name="twitter:description"
          content={article.seo.og_description}
        />
        <meta name="twitter:image" content={article.seo.og_image} />

        {/* Additional SEO */}
        <meta
          name="keywords"
          content={article.taxonomy.target_keywords.join(', ')}
        />
        <meta
          property="article:published_time"
          content={
            article.publishing.published_at?.toISOString() ||
            article.outrank.created_at.toISOString()
          }
        />
        <meta
          property="article:modified_time"
          content={article.updated_at.toISOString()}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(article.seo.structured_data),
          }}
        />
      </Head>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Image */}
        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden relative w-full aspect-video">
            <Image
              src={featuredImage}
              alt={displayTitle}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 896px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {displayTitle}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time
                dateTime={
                  article.publishing.published_at?.toISOString() ||
                  article.outrank.created_at.toISOString()
                }
              >
                {new Date(
                  article.publishing.published_at ||
                    article.outrank.created_at
                ).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readingTime} Minuten Lesezeit</span>
            </div>
          </div>

          {/* Tags */}
          {article.outrank.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.outrank.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Custom Intro (if exists) */}
        {article.pferdewert.custom_intro && (
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: article.pferdewert.custom_intro,
              }}
            />
          </div>
        )}

        {/* Main Article Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />

        {/* Custom Outro with CTA (if exists) */}
        {article.pferdewert.custom_outro && (
          <div className="mb-12 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: article.pferdewert.custom_outro,
              }}
            />
          </div>
        )}

        {/* Conversion CTA */}
        <div className="my-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Was ist Ihr Pferd wert?
          </h2>
          <p className="text-xl mb-6 text-blue-50">
            Erhalten Sie eine professionelle KI-gestützte Bewertung in nur 2
            Minuten
          </p>
          <Link
            href="/pferde-preis-berechnen"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
          >
            Jetzt Pferd bewerten
          </Link>
        </div>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />
      </article>
    </Layout>
  );
}
