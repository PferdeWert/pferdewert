import Link from 'next/link'
import { ReactNode } from 'react'

interface CTAButtonProps {
  type: 'primary' | 'secondary' | 'expert'
  text: string
  href: string
  trackingEvent?: string
  icon?: ReactNode
  className?: string
}

const CTAButton: React.FC<CTAButtonProps> = ({
  type,
  text,
  href,
  trackingEvent,
  icon,
  className = ''
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'primary':
        return 'bg-brand-brown text-white hover:bg-brand-brownDark border-brand-brown hover:border-brand-brownDark'
      case 'secondary':
        return 'bg-white text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-white'
      case 'expert':
        return 'bg-brand-gold text-brand-default border-brand-gold hover:bg-brand-gold/90'
      default:
        return 'bg-brand-brown text-white hover:bg-brand-brownDark border-brand-brown hover:border-brand-brownDark'
    }
  }

  const handleClick = () => {
    if (trackingEvent && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', trackingEvent, {
        event_category: 'CTA',
        event_label: text,
        value: 1
      })
    }
  }

  const buttonContent = (
    <span className="flex items-center justify-center space-x-2">
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </span>
  )

  const baseStyles = `
    inline-flex items-center justify-center
    px-8 py-4
    border-2 rounded-lg
    font-sans font-bold text-lg
    tracking-wide
    transition-all duration-300 ease-in-out
    hover:shadow-lg hover:transform hover:scale-105
    focus:outline-none focus:ring-4 focus:ring-brand-gold/30
    ${getTypeStyles()}
    ${className}
  `

  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a
        href={href}
        className={baseStyles}
        onClick={handleClick}
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {buttonContent}
      </a>
    )
  }

  return (
    <Link href={href} className={baseStyles} onClick={handleClick}>
      {buttonContent}
    </Link>
  )
}

export default CTAButton