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
          container: 'bg-brand-green/10 border-brand-green',
          title: 'text-brand-green',
          icon: icon || '💡'
        }
      case 'warning':
        return {
          container: 'bg-brand-gold/10 border-brand-gold',
          title: 'text-brand-gold',
          icon: icon || '⚠️'
        }
      case 'expert':
        return {
          container: 'bg-brand-gold/20 border-brand-gold',
          title: 'text-brand-brown',
          icon: icon || '🔬'
        }
      case 'cost':
        return {
          container: 'bg-brand-light border-brand-brown',
          title: 'text-brand-brown',
          icon: icon || '💰'
        }
      default:
        return {
          container: 'bg-gray-50 border-gray-300',
          title: 'text-gray-700',
          icon: icon || 'ℹ️'
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className={`border-l-4 p-6 rounded-r-lg ${styles.container} my-6`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 text-xl">
          {styles.icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-bold text-lg mb-2 ${styles.title} font-heading`}>
            {title}
          </h3>
          <div className="text-brand-default leading-relaxed">
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