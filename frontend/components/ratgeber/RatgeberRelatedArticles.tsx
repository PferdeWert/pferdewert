import Image from 'next/image'
import Link from 'next/link'

export interface RatgeberRelatedArticle {
  href: string
  image: string
  title: string
  badge: string
  readTime: string
  description: string
}

interface RatgeberRelatedArticlesProps {
  title: string
  description?: string
  articles: RatgeberRelatedArticle[]
}

const RatgeberRelatedArticles: React.FC<RatgeberRelatedArticlesProps> = ({
  title,
  description,
  articles
}) => {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-16 px-4 md:px-6 mt-16 scroll-mt-32 lg:scroll-mt-40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand mb-3 md:mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
          {articles.map(article => (
            <div
              key={article.href}
              className="group bg-white rounded-2xl md:rounded-3xl border border-[#e0c9aa] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft md:w-[320px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                />
              </div>
              <div className="p-4 md:p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3 text-xs font-medium text-brand/70">
                  <span className="px-2 md:px-3 py-1 bg-brand-light text-brand-brown rounded-full text-xs">
                    {article.badge}
                  </span>
                  <span className="text-xs">{article.readTime}</span>
                </div>

                <h3 className="text-lg md:text-xl font-serif font-semibold text-brand mb-3 group-hover:text-brand-brown transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 md:mb-6 text-pretty flex-1">
                  {article.description}
                </p>

                <Link href={article.href} className="w-full">
                  <button className="w-full min-h-[44px] h-10 px-3 rounded-lg border border-brand-brown text-brand-brown font-medium text-sm transition-colors group-hover:bg-brand-brown group-hover:text-white hover:bg-brand-brown hover:text-white touch-manipulation">
                    Artikel lesen
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RatgeberRelatedArticles
