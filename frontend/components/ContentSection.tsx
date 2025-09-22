import { ReactNode } from 'react'

interface ContentSectionProps {
  title: string
  content: ReactNode
  icon?: ReactNode
  highlight?: boolean
  id?: string
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  content,
  icon,
  highlight = false,
  id
}) => {
  return (
    <section
      id={id}
      className={`py-8 ${highlight ? 'bg-brand-light border-l-4 border-brand-gold px-6 rounded-r-lg' : ''}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          {icon && (
            <div className="text-2xl">
              {icon}
            </div>
          )}
          <h2 className="font-heading text-2xl font-bold text-brand-default">
            {title}
          </h2>
        </div>
        <div className="prose prose-lg max-w-none text-brand-default leading-relaxed">
          {content}
        </div>
      </div>
    </section>
  )
}

export default ContentSection