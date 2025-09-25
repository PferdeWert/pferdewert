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
    ? 'bg-[#fcf8f1] border border-[#eadfcd] rounded-3xl px-6 md:px-10 py-10 shadow-sm'
    : 'py-10'

  return (
    <section id={id} className={`relative ${sectionClasses}`}>
      <div className="w-full">
        <div className="flex items-center gap-3 mb-6">
          {icon && <div className="text-2xl text-[#8c5a1f]">{icon}</div>}
          <h2 className="font-serif text-3xl md:text-[2.125rem] font-bold text-gray-900">
            {title}
          </h2>
        </div>
        <div className="space-y-5 text-lg leading-relaxed text-gray-700">
          {content}
        </div>
      </div>
    </section>
  )
}

export default ContentSection
