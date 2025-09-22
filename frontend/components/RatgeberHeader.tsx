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
    <section className="bg-brand-light py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="max-w-2xl mx-auto md:max-w-none md:mx-0 bg-white/95 border border-brand-brown/10 rounded-2xl md:rounded-3xl shadow-lg px-5 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-5 flex-wrap">
                <span className="inline-block bg-brand-gold text-brand-default px-3.5 py-1.5 rounded-full text-sm font-medium">
                  {category}
                </span>
                {expertBadge && (
                  <span className="inline-block bg-brand-brown text-white px-3.5 py-1.5 rounded-full text-sm font-medium">
                    ✓ Expertenrat
                  </span>
                )}
              </div>

              <h1 className="font-heading text-brand-brown text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-tight">
                {title}
              </h1>

              {subtitle && (
                <p className="text-brand-default/90 text-sm sm:text-base md:text-lg leading-relaxed mb-7 sm:mb-8 max-w-3xl">
                  {subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-brand-default/70 text-sm md:text-base">
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

          <div className="order-1 md:order-2">
            <div className="relative h-56 sm:h-72 md:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-brand-brown/10">
              <Image
                src={heroImage}
                alt={title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RatgeberHeader
