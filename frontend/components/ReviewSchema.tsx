// components/ReviewSchema.tsx
import React, { useMemo } from 'react';

interface ReviewData {
  reviewBody: string;
  reviewRating: number;
  author: {
    name: string;
    type?: 'Person' | 'Organization';
  };
  datePublished: string;
  publisher?: {
    name: string;
    type?: 'Organization' | 'Person';
  };
}

interface AggregateRatingData {
  ratingValue: number;
  ratingCount: number;
  bestRating?: number;
  worstRating?: number;
}

interface ReviewSchemaProps {
  // Service/Business being reviewed
  itemReviewed: {
    name: string;
    type: 'Service' | 'Organization' | 'LocalBusiness' | 'Product';
    url?: string;
    description?: string;
    image?: string;
  };
  
  // Aggregate rating data
  aggregateRating?: AggregateRatingData;
  
  // Individual reviews (optional - can be empty array for preparation)
  reviews?: ReviewData[];
  
  // Additional organization data
  organization?: {
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[];
  };
}

export default function ReviewSchema({
  itemReviewed,
  aggregateRating,
  reviews = [],
  organization
}: ReviewSchemaProps): React.JSX.Element {

  // FAST REFRESH FIX: Memoize review schemas to prevent object recreation on every render
  // The .map() creates new objects causing Fast Refresh infinite loops
  const reviewSchemas = useMemo(() => reviews.map(review => ({
    '@type': 'Review',
    'reviewBody': review.reviewBody,
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': review.reviewRating,
      'bestRating': 5,
      'worstRating': 1
    },
    'author': {
      '@type': review.author.type || 'Person',
      'name': review.author.name
    },
    'datePublished': review.datePublished,
    'publisher': review.publisher ? {
      '@type': review.publisher.type || 'Organization',
      'name': review.publisher.name
    } : {
      '@type': 'Organization',
      'name': 'PferdeWert'
    }
  })), [reviews]);

  // FAST REFRESH FIX: Memoize main schema to prevent object recreation
  const mainSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': itemReviewed.type,
    'name': itemReviewed.name,
    'url': itemReviewed.url,
    'description': itemReviewed.description,
    'image': itemReviewed.image,
    ...(aggregateRating && {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': aggregateRating.ratingValue,
        'ratingCount': aggregateRating.ratingCount,
        'bestRating': aggregateRating.bestRating || 5,
        'worstRating': aggregateRating.worstRating || 1
      }
    }),
    ...(reviews.length > 0 && {
      'review': reviewSchemas
    }),
    ...(organization && {
      'provider': {
        '@type': 'Organization',
        'name': organization.name,
        'url': organization.url,
        'logo': organization.logo,
        'sameAs': organization.sameAs
      }
    })
  }), [itemReviewed, aggregateRating, reviews.length, reviewSchemas, organization]);

  // CRITICAL FIX: Removed useEffect to prevent Fast Refresh infinite loop
  // The aggregateRating object in dependencies was causing instability
  // Log once on module load instead of on every render
  // info('Review Schema generated:', { itemReviewed: itemReviewed.name });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mainSchema, null, 2)
        }}
      />

      {/* Individual review schemas for better SEO coverage */}
      {reviews.length > 0 && reviews.map((review, index) => (
        <script
          key={`review-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Review',
              'itemReviewed': {
                '@type': itemReviewed.type,
                'name': itemReviewed.name,
                'url': itemReviewed.url
              },
              'reviewRating': {
                '@type': 'Rating',
                'ratingValue': review.reviewRating,
                'bestRating': 5,
                'worstRating': 1
              },
              'author': {
                '@type': review.author.type || 'Person',
                'name': review.author.name
              },
              'reviewBody': review.reviewBody,
              'datePublished': review.datePublished,
              'publisher': {
                '@type': 'Organization',
                'name': 'PferdeWert'
              }
            }, null, 2)
          }}
        />
      ))}
    </>
  );
}

// Helper function to create review data from testimonials
export function createReviewFromTestimonial(testimonial: {
  name: string;
  quote: string;
  rating: number;
  verifiedDate: string;
}): ReviewData {
  return {
    reviewBody: testimonial.quote,
    reviewRating: testimonial.rating,
    author: {
      name: testimonial.name,
      type: 'Person'
    },
    datePublished: testimonial.verifiedDate,
    publisher: {
      name: 'PferdeWert',
      type: 'Organization'
    }
  };
}

// Helper function to calculate aggregate rating from reviews
export function calculateAggregateRating(reviews: ReviewData[]): AggregateRatingData | undefined {
  if (reviews.length === 0) return undefined;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.reviewRating, 0);
  const averageRating = totalRating / reviews.length;
  
  return {
    ratingValue: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
    ratingCount: reviews.length,
    bestRating: 5,
    worstRating: 1
  };
}