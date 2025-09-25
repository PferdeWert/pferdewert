import { ReactNode } from 'react'

interface InfoBoxProps {
  type: 'tip' | 'warning' | 'expert' | 'cost'
  title: string
  content: string | ReactNode
  icon?: ReactNode
}

const InfoBox: React.FC<InfoBoxProps> = ({ type, title, content, icon }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'tip':
        return {
          container: 'bg-[#f3f8f3] border-[#c6dec6] text-[#29543a]',
          title: 'text-[#29543a]',
          icon: icon || '💡'
        }
      case 'warning':
        return {
          container: 'bg-[#fff4e6] border-[#f3c27b] text-[#8b4a0e]',
          title: 'text-[#8b4a0e]',
          icon: icon || '⚠️'
        }
      case 'expert':
        return {
          container: 'bg-[#f4f1ff] border-[#d6ccff] text-[#473a8f]',
          title: 'text-[#473a8f]',
          icon: icon || '🔬'
        }
      case 'cost':
        return {
          container: 'bg-[#fdf7f1] border-[#e0c9aa] text-[#7c4a12]',
          title: 'text-[#7c4a12]',
          icon: icon || '💰'
        }
      default:
        return {
          container: 'bg-gray-50 border-gray-300 text-gray-700',
          title: 'text-gray-700',
          icon: icon || 'ℹ️'
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className={`rounded-2xl border px-6 py-6 shadow-sm ${styles.container} my-6`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-2xl">
          {styles.icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-serif text-xl font-semibold mb-2 ${styles.title}`}>
            {title}
          </h3>
          <div className="leading-relaxed text-gray-700">
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              content
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoBox
