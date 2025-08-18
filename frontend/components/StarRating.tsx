// components/StarRating.tsx
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
  showCount?: boolean;
  reviewCount?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  showValue = false,
  showCount = false,
  reviewCount,
  size = 'medium',
  className = ''
}: StarRatingProps): React.JSX.Element {
  
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const starSize = sizeClasses[size];
  const textSize = textSizeClasses[size];

  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Star icons */}
      <div className="flex items-center">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <Star
            key={`full-${index}`}
            className={`${starSize} text-yellow-400 fill-yellow-400`}
            aria-hidden="true"
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star
              className={`${starSize} text-gray-300 fill-gray-300`}
              aria-hidden="true"
            />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={`${starSize} text-yellow-400 fill-yellow-400`}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <Star
            key={`empty-${index}`}
            className={`${starSize} text-gray-300 fill-gray-300`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Rating value and count */}
      <div className={`flex items-center gap-1 ${textSize} text-gray-700`}>
        {showValue && (
          <span className="font-medium">
            {rating.toFixed(1)}
          </span>
        )}
        
        {showCount && reviewCount !== undefined && (
          <span className="text-gray-500">
            ({reviewCount} {reviewCount === 1 ? 'Bewertung' : 'Bewertungen'})
          </span>
        )}
      </div>

      {/* Screen reader text */}
      <span className="sr-only">
        {rating} von {maxRating} Sternen
        {showCount && reviewCount !== undefined && ` basierend auf ${reviewCount} Bewertungen`}
      </span>
    </div>
  );
}

// Preset components for common use cases
export function PferdeWertRating(): React.JSX.Element {
  return (
    <StarRating
      rating={5.0}
      showValue={true}
      showCount={true}
      reviewCount={3}
      size="medium"
      className="justify-center sm:justify-start"
    />
  );
}

export function CompactRating(): React.JSX.Element {
  return (
    <StarRating
      rating={5.0}
      showValue={true}
      size="small"
    />
  );
}

export function HeroRating(): React.JSX.Element {
  return (
    <StarRating
      rating={5.0}
      showValue={true}
      size="medium"
      className="text-brand-brown"
    />
  );
}