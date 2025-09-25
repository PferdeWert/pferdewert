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
  const sectionClasses = highlight
    ? 'bg-[#f5f5f3] border border-[#e8e8e4] rounded-3xl px-4 md:px-10 py-6 md:py-10 shadow-sm'
    : 'py-6 md:py-10'

  return (
    <section id={id} className={`relative ${sectionClasses}`}>
      <div className="w-full">
        <div className="flex items-center gap-3 mb-6">
          {icon && <div className="text-2xl text-[#8c5a1f]">{icon}</div>}
          <h2 className="font-serif text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-gray-900">
            {title}
          </h2>
        </div>
        <div className="space-y-4 md:space-y-5 text-base md:text-lg leading-7 md:leading-relaxed text-gray-700">
          {content}
        </div>
      </div>
    </section>
  )
}

export default ContentSection
