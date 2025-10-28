import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { validateCtaProps } from '@/utils/dev-warnings'

export interface RatgeberHeroMetaItem {
  icon: ReactNode
  label: ReactNode
}

export interface RatgeberHeroPrimaryCta {
  href: string
  label: string
  icon?: ReactNode
}

export interface RatgeberHeroSecondaryCta {
  label: string
  icon?: ReactNode
  onClick?: () => void
}

interface RatgeberHeroProps {
  badgeLabel?: string
  badgeIcon?: ReactNode
  title: string
  subtitle: string
  metaItems?: RatgeberHeroMetaItem[]
  primaryCta: RatgeberHeroPrimaryCta
  secondaryCta?: RatgeberHeroSecondaryCta
}

// FAST REFRESH FIX: Define default scroll icon at module level to prevent recreation
const DEFAULT_SCROLL_ICON = <ChevronDown className="h-5 w-5" />

const RatgeberHero: React.FC<RatgeberHeroProps> = ({
  badgeLabel,
  badgeIcon,
  title,
  subtitle,
  metaItems = [],
  primaryCta,
  secondaryCta
}) => {
  // DEV-ONLY: Validate props to catch Fast Refresh issues early
  // CRITICAL: Must use useEffect with empty dependency array to avoid infinite reload loops
  // Calling validation directly in component body causes console output on every render,
  // which triggers Fast Refresh cycles and infinite loops
   
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      validateCtaProps(primaryCta, 'primaryCta', 'RatgeberHero')
      validateCtaProps(secondaryCta, 'secondaryCta', 'RatgeberHero')
    }
  }, []) // Empty dependency array: run validation only once on mount

  const normalizedSecondaryLabel = secondaryCta?.label
    ? secondaryCta.label.trim().toLowerCase()
    : undefined
  const isScrollToContentCta = normalizedSecondaryLabel === 'zum inhalt'
  const resolvedSecondaryIcon = isScrollToContentCta ? DEFAULT_SCROLL_ICON : secondaryCta?.icon

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-6">
          {badgeLabel && (
            <div className="inline-flex items-center gap-2 text-sm text-brand/80 bg-brand-light px-3 py-1 rounded-full">
              {badgeIcon}
              {badgeLabel}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand text-balance">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-brand/80 text-pretty max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {metaItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 text-sm text-brand/70">
              {metaItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-brown hover:bg-brand-brownDark text-white font-bold rounded-xl transition-all shadow-soft"
            >
              {primaryCta.label}
              {primaryCta.icon}
            </Link>

            {secondaryCta && (
              <button
                type="button"
                onClick={secondaryCta.onClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white font-medium rounded-xl transition-all"
              >
                {secondaryCta.label}
                {resolvedSecondaryIcon}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RatgeberHero
