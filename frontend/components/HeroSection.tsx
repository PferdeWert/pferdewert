import { ReactNode } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  /** Badge text shown above headline (e.g., "🏆 #1 Online Pferdebewertung") */
  badge: string;
  /** Main headline text */
  headline: string;
  /** Word in headline to highlight with brand-brown color */
  highlightedWord: string;
  /** Image source path */
  image: string;
  /** Alt text for image (SEO important) */
  imageAlt: string;
  /** Image width in pixels */
  imageWidth?: number;
  /** Image height in pixels */
  imageHeight?: number;
  /** Content below headline (description, pricing, features, CTAs, etc.) */
  children: ReactNode;
  /** Optional section ID for anchor links */
  sectionId?: string;
  /** Use container with max-width (true) or full-width padding (false) */
  useContainer?: boolean;
  /** Show decorative gradient background behind image */
  showImageGradient?: boolean;
  /** Custom image className for additional styling */
  imageClassName?: string;
  /** Blur data URL for image placeholder */
  blurDataURL?: string;
}

export default function HeroSection({
  badge,
  headline,
  highlightedWord,
  image,
  imageAlt,
  imageWidth = 600,
  imageHeight = 400,
  children,
  sectionId,
  useContainer = true,
  showImageGradient = false,
  imageClassName = '',
  blurDataURL,
}: HeroSectionProps) {
  // Split headline and wrap highlighted word
  const renderHeadline = () => {
    const parts = headline.split(highlightedWord);
    if (parts.length === 1) {
      // highlightedWord not found, return as is
      return headline;
    }

    return (
      <>
        {parts[0]}
        <span className="text-brand-brown">{highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  const containerClass = useContainer
    ? 'container mx-auto px-4'
    : 'px-4 lg:px-8 xl:px-12';

  return (
    <section
      id={sectionId}
      className="relative overflow-hidden"
    >
      <div className={`${containerClass} py-12 lg:py-20`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 hero-fade-in-left">
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-brand-brown/10 text-brand-brown rounded-full text-sm font-semibold">
                {badge}
              </div>

              {/* Headline */}
              <h1 className="text-h1 font-bold text-gray-900">
                {renderHeadline()}
              </h1>

              {/* Children Content (description, pricing, features, CTAs) */}
              {children}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hero-fade-in-right">
            {showImageGradient && (
              <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/20 to-brand-gold/20 rounded-3xl blur-3xl"></div>
            )}
            <div className={`relative ${showImageGradient ? '' : 'rounded-2xl overflow-hidden shadow-2xl'}`}>
              <Image
                src={image}
                width={imageWidth}
                height={imageHeight}
                alt={imageAlt}
                className={imageClassName || `w-full h-auto ${showImageGradient ? 'rounded-3xl shadow-2xl object-cover' : ''}`}
                priority
                sizes="(max-width: 480px) 400px, (max-width: 768px) 500px, (max-width: 1200px) 600px, 600px"
                quality={60}
                placeholder={blurDataURL ? 'blur' : 'empty'}
                {...(blurDataURL && { blurDataURL })}
              />
              {!showImageGradient && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}