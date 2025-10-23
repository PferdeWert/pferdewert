/**
 * Related Articles Component
 * Displays a grid of related ratgeber articles with hover effects and animations
 *
 * Features:
 * - Responsive grid (1 col mobile, 3 cols desktop)
 * - Image zoom on hover
 * - Max 2 tags per card
 * - "Weiterlesen" link with arrow animation
 */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RatgeberArticle } from '@/types/ratgeber';

interface RelatedArticlesProps {
  articles: Array<Pick<RatgeberArticle, '_id' | 'outrank' | 'pferdewert' | 'seo'>>;
}

interface RelatedArticleCardProps {
  article: Pick<RatgeberArticle, '_id' | 'outrank' | 'pferdewert' | 'seo'>;
  index: number;
}

function RelatedArticleCard({ article, index }: RelatedArticleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use pferdewert featured image if available, fallback to outrank image
  const imageUrl = article.pferdewert?.featured_image || article.outrank.image_url;

  // Use edited title if available, fallback to outrank title
  const title = article.pferdewert?.edited_title || article.outrank.title;

  // Get max 2 tags
  const displayTags = article.outrank.tags.slice(0, 2);

  return (
    <Link
      href={`/pferde-ratgeber/${article.outrank.slug}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <article className="h-full">
        {/* Image Container with Zoom Effect */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-110`}
            onLoadingComplete={() => setImageLoaded(true)}
            priority={index < 3}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Meta Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.outrank.meta_description}
          </p>

          {/* Read More Link with Arrow Animation */}
          <div className="flex items-center text-blue-600 font-semibold text-sm">
            <span>Weiterlesen</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section
      className="max-w-7xl mx-auto px-4 py-16 bg-gray-50"
      aria-labelledby="related-articles-heading"
    >
      <div className="text-center mb-12">
        <h2
          id="related-articles-heading"
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Weiterführende Artikel
        </h2>
        <p className="text-lg text-gray-600">
          Diese Artikel könnten dich ebenfalls interessieren
        </p>
      </div>

      {/* Grid: 1 column mobile, 3 columns desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <RelatedArticleCard
            key={article._id}
            article={article}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
