// frontend/components/HeaderUnified.tsx

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import LocalizedLink from "@/components/LocalizedLink"
import CountrySwitcher from "@/components/CountrySwitcher"
import { Menu, X, ChevronDown } from "lucide-react"
import { useRouter } from "next/router"
import Breadcrumbs from "./Breadcrumbs"

// ============================================================================
// FAST REFRESH FIX: Define icons at module level to prevent recreation
// ============================================================================
const menuIcon = <Menu className="h-6 w-6" />
const closeIcon = <X className="h-6 w-6" />
const chevronDownIcon = <ChevronDown className="w-4 h-4" />

// ============================================================================
// STABLE NAVIGATION ITEMS - Outside component to prevent recreation
// ============================================================================

interface NavDropdownItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  dropdown?: NavDropdownItem[]
}

const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "Ratgeber",
    href: "/pferde-ratgeber",
    dropdown: [
      { label: "AKU Pferd", href: "/pferde-ratgeber/aku-pferd" },
      { label: "Pferd kaufen", href: "/pferde-ratgeber/pferd-kaufen" },
      { label: "Pferd verkaufen", href: "/pferde-ratgeber/pferd-verkaufen" },
    ]
  },
  {
    label: "Über uns",
    href: "/ueber-pferdewert",
  },
]

export default function HeaderUnified() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const router = useRouter()

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
        setActiveDropdown(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // FAST REFRESH FIX: Memoize breadcrumb items to prevent recreation on every render
  // Without useMemo, getBreadcrumbItems() returns a new array reference on every render,
  // triggering Fast Refresh to detect changes even when the content is identical
  const breadcrumbItems = useMemo(() => {
    const path = router.pathname
    const items = []

    // Finde aktuelle Navigation
    for (const navItem of NAVIGATION_ITEMS) {
      if (path.startsWith(navItem.href)) {
        items.push({ label: navItem.label, href: navItem.href })

        // Finde Sub-Item
        if (navItem.dropdown) {
          const subItem = navItem.dropdown.find(item => path === item.href)
          if (subItem) {
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
              {NAVIGATION_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <LocalizedLink
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-brand-brown font-medium transition-colors py-2"
                  >
                    <span>{item.label}</span>
                    {item.dropdown && chevronDownIcon}
                  </LocalizedLink>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 border border-gray-200">
                      {item.dropdown.map((subItem) => (
                        <LocalizedLink
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                        >
                          {subItem.label}
                        </LocalizedLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Desktop: Country Switcher + CTA */}
              <CountrySwitcher variant="desktop" />
              <LocalizedLink
                href="/pferde-preis-berechnen"
                className="bg-brand-brown hover:bg-brand-brownDark text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Jetzt bewerten
              </LocalizedLink>
            </nav>
          </div>
        </div>

        {/* Mobile Header - Neue Struktur */}
        <div className="md:hidden">
          <div className="w-full px-4 h-16 flex items-center justify-between">
            {/* Logo ohne Text */}
            <LocalizedLink href="/" className="flex items-center">
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
              className="bg-brand-brown hover:bg-brand-brownDark text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              Pferd bewerten
            </LocalizedLink>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-gray-700 hover:text-brand-brown transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? closeIcon : menuIcon}
            </button>
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

      {/* Mobile Menu - Kompakte Variante */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-16 right-0 w-80 max-w-[85vw] bg-white z-50 shadow-xl rounded-bl-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          visibility: isMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMenuOpen ? 'auto' : 'none',
          maxHeight: 'calc(100vh - 4rem)'
        }}
      >
        <nav className="h-full flex flex-col">
          {/* Country Switcher - Prominent at top */}
          <CountrySwitcher variant="mobile" onCountryChange={closeMenu} />

          {/* Navigation Links mit Progressive Disclosure */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {NAVIGATION_ITEMS.map((item) => (
              <div key={item.href} className="mb-3">
                {item.dropdown ? (
                  // Kategorie mit Dropdown - aufklappbar
                  <div>
                    <div className="w-full flex items-center justify-between py-3">
                      <LocalizedLink
                        href={item.href}
                        className="flex-1 text-gray-900 font-medium text-base"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </LocalizedLink>
                      <button
                        className="p-1 text-gray-700 hover:text-brand-brown"
                        onClick={() => toggleMobileSection(item.label)}
                        aria-expanded={mobileExpandedSection === item.label}
                        aria-label={`${item.label} Untermenü ${mobileExpandedSection === item.label ? 'schließen' : 'öffnen'}`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileExpandedSection === item.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Aufklappbarer Bereich */}
                    {mobileExpandedSection === item.label && (
                      <div className="ml-4 space-y-1 mt-2 pb-2">
                        {item.dropdown.map((subItem) => (
                          <LocalizedLink
                            key={subItem.href}
                            href={subItem.href}
                            className="block text-gray-600 hover:text-brand-brown py-1 text-sm"
                            onClick={closeMenu}
                          >
                            {subItem.label}
                          </LocalizedLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Direkter Link (Über uns)
                  <LocalizedLink
                    href={item.href}
                    className="block text-gray-900 font-medium py-3 text-base"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </LocalizedLink>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}