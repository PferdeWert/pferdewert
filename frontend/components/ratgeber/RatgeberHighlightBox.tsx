import { ReactNode } from 'react'

interface RatgeberHighlightBoxProps {
  title?: string
  icon?: ReactNode
  children: ReactNode
  padding?: string
}

const RatgeberHighlightBox: React.FC<RatgeberHighlightBoxProps> = ({
  title,
  icon,
  children,
  padding = 'p-5 md:p-6'
}) => {
  return (
    <div className={`bg-[#fdf7f1] border border-[#e0c9aa] rounded-lg ${padding} space-y-4 md:space-y-6`}>
      <div className="flex items-start space-x-3">
        {icon && <span className="text-xl md:text-2xl flex-shrink-0 mt-1">{icon}</span>}
        <div>
          {title && (
            <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">{title}</h3>
          )}
          <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default RatgeberHighlightBox
