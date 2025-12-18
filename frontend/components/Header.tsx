// frontend/components/HeaderUnified.tsx

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import LocalizedLink from "@/components/LocalizedLink"
import CountrySwitcher from "@/components/CountrySwitcher"
import { Menu, X, ChevronDown, BookOpen, Users, FileText, ShoppingBag, TrendingUp } from "lucide-react"
import { useRouter } from "next/router"
import Breadcrumbs from "./Breadcrumbs"
import { useCountryConfig } from "@/hooks/useCountryConfig"

// ============================================================================
// FAST REFRESH FIX: Define icons at module level to prevent recreation
// ============================================================================
const menuIcon = <Menu className="h-6 w-6" />
const closeIcon = <X className="h-6 w-6" />

// Navigation Category Icons
const ratgeberIcon = <BookOpen className="h-5 w-5" />
const akuIcon = <FileText className="h-4 w-4" />
const kaufenIcon = <ShoppingBag className="h-4 w-4" />
const verkaufenIcon = <TrendingUp className="h-4 w-4" />
const ueberUnsIcon = <Users className="h-5 w-5" />

// ============================================================================
// FAST REFRESH FIX: Define style objects at module level to prevent recreation
// ============================================================================
const mobileMenuStyle = {
  maxHeight: 'calc(100vh - 4rem)'
} as const

// ============================================================================
// STABLE NAVIGATION ITEMS - Outside component to prevent recreation
// ============================================================================

interface NavDropdownItem {
  label: string
  href: string
  description?: string
  icon?: React.ReactNode
}

interface NavItem {
  label: string
  href: string
  description?: string
  icon?: React.ReactNode
  dropdown?: NavDropdownItem[]
}

const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "Ratgeber",
    href: "/pferde-ratgeber",
    description: "Expertenwissen rund ums Pferd",
    icon: ratgeberIcon,
    dropdown: [
      {
        label: "AKU Pferd",
        href: "/pferde-ratgeber/aku-pferd",
        description: "Alles zur Ankaufsuntersuchung",
        icon: akuIcon
      },
      {
        label: "Pferd kaufen",
        href: "/pferd-kaufen",
        description: "Tipps für den Pferdekauf",
        icon: kaufenIcon
      },
      {
        label: "Pferd verkaufen",
        href: "/pferde-ratgeber/pferd-verkaufen",
        description: "Erfolgreich verkaufen",
        icon: verkaufenIcon
      },
    ]
  },
  {
    label: "Über uns",
    href: "/ueber-pferdewert",
    description: "Erfahre mehr über PferdeWert",
    icon: ueberUnsIcon,
  },
]

// AT/CH: Minimal navigation - only Über uns (local SEO magnet is in footer only)
const NAVIGATION_ITEMS_ATCH: NavItem[] = [
  {
    label: "Über uns",
    href: "/ueber-pferdewert",
    description: "Erfahre mehr über PferdeWert",
    icon: ueberUnsIcon,
  },
]

export default function HeaderUnified() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const router = useRouter()
  const { country } = useCountryConfig()

  // AT/CH: Use simplified navigation without Ratgeber dropdown
  const navigationItems = country === 'DE' ? NAVIGATION_ITEMS : NAVIGATION_ITEMS_ATCH

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setMobileExpandedSection(null)
  }

  const toggleMobileSection = (sectionLabel: string) => {
    setMobileExpandedSection(
      mobileExpandedSection === sectionLabel ? null : sectionLabel
    )
  }

  // Body scroll lock für Mobile-Menü
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  // ESC-Taste zum Schließen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // FAST REFRESH FIX: Memoize breadcrumb items to prevent recreation on every render
  // CRITICAL: Must also memoize the objects inside the array, not just the array itself
  // Without deep memoization, new object references trigger Fast Refresh loops
  const breadcrumbItems = useMemo(() => {
    const path = router.pathname
    const items: Array<{ label: string; href?: string; current?: boolean }> = []

    // Finde aktuelle Navigation
    for (const navItem of NAVIGATION_ITEMS) {
      if (path.startsWith(navItem.href)) {
        // FAST REFRESH FIX: Create object once per path change, not on every render
        items.push({ label: navItem.label, href: navItem.href })

        // Finde Sub-Item
        if (navItem.dropdown) {
          const subItem = navItem.dropdown.find(item => path === item.href)
          if (subItem) {
            // FAST REFRESH FIX: Create object once per path change
            items.push({ label: subItem.label, current: true })
          }
        }
        break
      }
    }

    return items
  }, [router.pathname]) // Only recompute when pathname changes

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between">
            {/* Logo + Brand Name */}
            <LocalizedLink href="/" className="flex items-center space-x-3">
              <Image
                src="/favicon.svg"
                alt="PferdeWert"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-lg font-bold text-brand-brown">
                PferdeWert
              </span>
            </LocalizedLink>

            {/* Desktop Navigation mit Dropdowns */}
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                item.dropdown ? (
                  <div key={item.href} className="relative group">
                    <div className="flex items-center">
                      <LocalizedLink
                        href={item.href}
                        className="text-[15px] text-gray-700 group-hover:text-brand-brown font-medium transition-colors py-2"
                      >
                        {item.label}
                      </LocalizedLink>
                      <ChevronDown className="w-4 h-4 ml-1 text-gray-500 group-hover:text-brand-brown transition-colors" />
                    </div>
                    {/* Hover Dropdown */}
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-56">
                        {item.dropdown.map((subItem) => (
                          <LocalizedLink
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-brown transition-colors"
                          >
                            {subItem.label}
                          </LocalizedLink>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <LocalizedLink
                    key={item.href}
                    href={item.href}
                    className="text-[15px] text-gray-700 hover:text-brand-brown font-medium transition-colors py-2"
                  >
                    {item.label}
                  </LocalizedLink>
                )
              ))}

              {/* Desktop: Country Switcher + CTA */}
              <CountrySwitcher variant="desktop" />
              <LocalizedLink
                href="/pferde-preis-berechnen"
                className="bg-brand-brown hover:bg-brand-brownDark text-white px-4 py-2 rounded-lg transition-colors text-[15px] font-medium"
              >
                Jetzt bewerten
              </LocalizedLink>
            </nav>
          </div>
        </div>

        {/* Mobile Header - Best Practice Layout */}
        <div className="md:hidden">
          <div className="w-full px-4 h-16 flex items-center justify-between gap-2">
            {/* Mobile Menu Button - Links (Standard) */}
            <button
              className="p-2 text-gray-700 hover:text-brand-brown transition-colors -ml-2"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? closeIcon : menuIcon}
            </button>

            {/* Logo ohne Text */}
            <LocalizedLink href="/" className="flex items-center -ml-2">
              <Image
                src="/favicon.svg"
                alt="PferdeWert"
                width={36}
                height={36}
                className="rounded-full"
              />
            </LocalizedLink>

            {/* Zentraler Main CTA */}
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="bg-brand-brown hover:bg-brand-brownDark text-white px-5 py-2 rounded-lg transition-colors font-medium text-sm flex-shrink-0"
            >
              Pferd bewerten
            </LocalizedLink>

            {/* Country Switcher - Rechts (Standard Position) */}
            <CountrySwitcher variant="mobile" />
          </div>

          {/* Mobile Breadcrumb Navigation */}
          {!isMenuOpen && breadcrumbItems.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
              <Breadcrumbs items={breadcrumbItems} />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black bg-opacity-30 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu - Von links aufgehend */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed top-16 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-xl rounded-br-lg transform transition-transform duration-300 ease-in-out translate-x-0"
          style={mobileMenuStyle}
        >
          <nav className="h-full flex flex-col">
            {/* Navigation Links - 2025 Best Practice: Card-based Accordion */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.href}>
                  {item.dropdown ? (
                    // Accordion Section with inline expansion
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleMobileSection(item.label)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors duration-150"
                        aria-expanded={mobileExpandedSection === item.label}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          {/* Icon */}
                          <div className="mt-0.5 text-brand-brown flex-shrink-0">
                            {item.icon}
                          </div>
                          {/* Text Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 text-base">
                              {item.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        {/* Chevron */}
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                            mobileExpandedSection === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Accordion Content - Inline Expansion */}
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          mobileExpandedSection === item.label
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <div className="space-y-1">
                            {item.dropdown.map((subItem) => (
                              <LocalizedLink
                                key={subItem.href}
                                href={subItem.href}
                                onClick={closeMenu}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-150 group"
                              >
                                {/* Sub-item Icon */}
                                <div className="mt-0.5 text-gray-400 group-hover:text-brand-brown transition-colors flex-shrink-0">
                                  {subItem.icon}
                                </div>
                                {/* Sub-item Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 text-sm group-hover:text-brand-brown transition-colors">
                                    {subItem.label}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {subItem.description}
                                  </div>
                                </div>
                              </LocalizedLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Direct Link Card (e.g., Über uns)
                    <LocalizedLink
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 group"
                    >
                      {/* Icon */}
                      <div className="text-brand-brown flex-shrink-0">
                        {item.icon}
                      </div>
                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-base group-hover:text-brand-brown transition-colors">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </LocalizedLink>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}