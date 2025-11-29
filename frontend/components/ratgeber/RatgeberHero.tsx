import { ReactNode, useEffect, memo } from 'react'
import { ChevronDown, Clock, Calendar } from 'lucide-react'
import { validateCtaProps } from '@/utils/dev-warnings'
import LocalizedLink from '@/components/LocalizedLink'

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

export interface RatgeberHeroAuthor {
  name: string
  href?: string
}

interface RatgeberHeroProps {
  badgeLabel?: string
  badgeIcon?: ReactNode
  title: string
  subtitle: string
  // New simplified props (preferred)
  readTime?: string // e.g., "16 Min."
  publishDate?: string // e.g., "November 2025"
  author?: RatgeberHeroAuthor
  // Legacy prop for backwards compatibility
  metaItems?: RatgeberHeroMetaItem[]
  primaryCta: RatgeberHeroPrimaryCta
  secondaryCta?: RatgeberHeroSecondaryCta
}

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const DEFAULT_SCROLL_ICON = <ChevronDown className="h-5 w-5" />
const CLOCK_ICON = <Clock className="h-4 w-4" />
const CALENDAR_ICON = <Calendar className="h-4 w-4" />

const RatgeberHero: React.FC<RatgeberHeroProps> = ({
  badgeLabel,
  badgeIcon,
  title,
  subtitle,
  readTime,
  publishDate,
  author,
  metaItems,
  primaryCta,
  secondaryCta
}) => {
  // Build meta items from new props, or use legacy metaItems
  const resolvedMetaItems: RatgeberHeroMetaItem[] = metaItems ?? [
    ...(readTime ? [{ icon: CLOCK_ICON, label: `${readTime} Lesezeit` }] : []),
    ...(publishDate ? [{ icon: CALENDAR_ICON, label: `Stand: ${publishDate}` }] : []),
    ...(author ? [{
      icon: null,
      label: author.href ? (
        <span>
          Von{' '}
          <LocalizedLink
            href={author.href}
            className="hover:text-brand-brown transition-colors underline underline-offset-2"
          >
            {author.name}
          </LocalizedLink>
        </span>
      ) : (
        <span>Von {author.name}</span>
      )
    }] : []),
  ]
  // DEV-ONLY: Validate props to catch Fast Refresh issues early
  // CRITICAL: Must use useEffect with empty dependency array to avoid infinite reload loops
  // Calling validation directly in component body causes console output on every render,
  // which triggers Fast Refresh cycles and infinite loops
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      validateCtaProps(primaryCta)
      validateCtaProps(secondaryCta)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

          {resolvedMetaItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 text-sm text-brand/70">
              {resolvedMetaItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <LocalizedLink
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-brown hover:bg-brand-brownDark text-white font-bold rounded-xl transition-all shadow-soft"
            >
              {primaryCta.label}
              {primaryCta.icon}
            </LocalizedLink>

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

// FAST REFRESH FIX: Memoize component with deep comparison for CTA objects
// This prevents re-renders when CTA objects are recreated with same values
export default memo(RatgeberHero, (prevProps, nextProps) => {
  // Compare primitive props
  if (
    prevProps.badgeLabel !== nextProps.badgeLabel ||
    prevProps.title !== nextProps.title ||
    prevProps.subtitle !== nextProps.subtitle
  ) {
    return false
  }

  // Deep compare primaryCta object
  if (
    prevProps.primaryCta.href !== nextProps.primaryCta.href ||
    prevProps.primaryCta.label !== nextProps.primaryCta.label
  ) {
    return false
  }

  // Deep compare secondaryCta object (handle undefined)
  if (prevProps.secondaryCta !== nextProps.secondaryCta) {
    if (!prevProps.secondaryCta || !nextProps.secondaryCta) {
      return false
    }
    if (prevProps.secondaryCta.label !== nextProps.secondaryCta.label) {
      return false
    }
  }

  // Props are equal
  return true
})
