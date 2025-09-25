import { Quote } from 'lucide-react'
import { ReactNode } from 'react'

interface BlockquoteProps {
  children: ReactNode
  author?: string
  className?: string
}

const Blockquote: React.FC<BlockquoteProps> = ({
  children,
  author,
  className = ''
}) => {
  return (
    <blockquote className={`relative bg-white border-l-4 border-[#406243] px-6 py-6 my-8 rounded-r-2xl shadow-sm ${className}`}>
      <Quote className="absolute top-4 left-4 w-6 h-6 text-[#406243] opacity-60" />

      <div className="pl-6">
        <div className="font-serif text-lg md:text-xl text-[#4e463b] italic leading-relaxed">
          {children}
        </div>

        {author && (
          <footer className="mt-4 text-sm font-sans text-gray-600">
            — {author}
          </footer>
        )}
      </div>
    </blockquote>
  )
}

export default Blockquote