import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'

interface RelatedArticle {
  href: string
  image: string
  title: string
  badge: string
  readTime: string
  description: string
}

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  sectionTitle?: string
  className?: string
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articles,
  sectionTitle = "Weitere hilfreiche Ratgeber",
  className = ""
}) => {
  return (
    <section className={`py-10 ${className}`}>
      <h2 className="font-serif text-3xl md:text-[2.25rem] text-gray-900 font-semibold mb-8">
        {sectionTitle}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Link
            key={index}
            href={article.href}
            className="group bg-white rounded-3xl shadow-sm border border-[#e7e0d4] hover:border-[#d6cab7] hover:shadow-md transition-all duration-300"
          >
            <div className="p-1">
              <div className="relative h-48 mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block bg-[#406243] text-white text-xs font-medium px-3 py-1 rounded-full">
                    {article.badge}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-5 pb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>

              <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#406243] transition-colors duration-300">
                {article.title}
              </h3>

              <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                {article.description}
              </p>

              <div className="flex items-center text-[#406243] font-medium group-hover:gap-3 transition-all duration-300">
                <span>Jetzt lesen</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedArticles