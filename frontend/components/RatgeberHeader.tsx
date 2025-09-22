import Image from 'next/image'

interface RatgeberHeaderProps {
  title: string
  subtitle?: string
  category: string
  readTime: string
  publishDate: string
  heroImage: string
  expertBadge?: boolean
}

const RatgeberHeader: React.FC<RatgeberHeaderProps> = ({
  title,
  subtitle,
  category,
  readTime,
  publishDate,
  heroImage,
  expertBadge = false
}) => {
  return (
    <section className="relative bg-brand-light">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl">
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-brand-gold text-brand-default px-4 py-2 rounded-full text-sm font-medium">
                  {category}
                </span>
                {expertBadge && (
                  <span className="inline-block bg-brand-brown text-white px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Expertenrat
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-heading text-brand-light text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {title}
              </h1>

              {/* Subtitle */}
              {subtitle && (
                <p className="text-brand-light/90 text-lg md:text-xl mb-6 leading-relaxed max-w-3xl">
                  {subtitle}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-brand-light/80 text-sm">
                <div className="flex items-center space-x-2">
                  <span>📅</span>
                  <span>{publishDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>⏱️</span>
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RatgeberHeader