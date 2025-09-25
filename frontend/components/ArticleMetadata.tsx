import { Clock, Calendar, User } from 'lucide-react'

interface ArticleMetadataProps {
  author: string
  publishedDate: string
  readTime: string
  className?: string
}

const ArticleMetadata: React.FC<ArticleMetadataProps> = ({
  author,
  publishedDate,
  readTime,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-gray-600 font-sans mb-8 ${className}`}>
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span>{author}</span>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <time dateTime={publishedDate}>
          {new Date(publishedDate).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>{readTime}</span>
      </div>
    </div>
  )
}

export default ArticleMetadata