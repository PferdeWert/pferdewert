import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

interface RatgeberFinalCTAProps {
  image: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  title: string
  description: string
  ctaHref: string
  ctaLabel: string
}

const RatgeberFinalCTA: React.FC<RatgeberFinalCTAProps> = ({ image, title, description, ctaHref, ctaLabel }) => {
  return (
    <section id="cta" className="py-12 md:py-20 mt-16 scroll-mt-32 lg:scroll-mt-40">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="bg-[#fdf7f1] border border-[#e0c9aa] rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-14 shadow-sm text-center">
          <div className="mb-6 md:mb-10">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 960}
              height={image.height ?? 640}
              className="w-full max-w-2xl mx-auto rounded-xl md:rounded-2xl shadow-lg object-cover"
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 90vw"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand mb-4 md:mb-5 text-balance">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-gray-700 mb-8 md:mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            {description}
          </p>

          <Link href={ctaHref}>
            <button className="min-h-[44px] px-8 md:px-10 py-3 md:py-4 bg-brand-brown hover:bg-brand-brownDark text-white rounded-xl transition-colors font-semibold text-base md:text-lg shadow-soft touch-manipulation">
              {ctaLabel}
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// FAST REFRESH FIX: Memoize component with deep comparison for image object
// This prevents re-renders when image object is recreated with same values
export default memo(RatgeberFinalCTA, (prevProps, nextProps) => {
  // Compare primitive props
  if (
    prevProps.title !== nextProps.title ||
    prevProps.description !== nextProps.description ||
    prevProps.ctaHref !== nextProps.ctaHref ||
    prevProps.ctaLabel !== nextProps.ctaLabel
  ) {
    return false
  }

  // Deep compare image object
  if (
    prevProps.image.src !== nextProps.image.src ||
    prevProps.image.alt !== nextProps.image.alt ||
    prevProps.image.width !== nextProps.image.width ||
    prevProps.image.height !== nextProps.image.height
  ) {
    return false
  }

  // Props are equal
  return true
})
