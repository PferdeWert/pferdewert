// frontend/components/HeaderUnified.tsx

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { useRouter } from "next/router"
import Breadcrumbs from "./Breadcrumbs"

export default function HeaderUnified() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
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

  // Navigation Struktur
  const navigationItems = [
    {
      label: "Pferd kaufen",
      href: "/pferd-kaufen",
      dropdown: [
        { label: "Pferdewert ermitteln", href: "/pferd-kaufen/pferdewert-ermitteln" },
        { label: "Kaufberatung", href: "/pferd-kaufen/kaufberatung" },
        { label: "Regionale Preise", href: "/pferd-kaufen/regionale-pferdepreise" },
        { label: "Pferde in Bayern", href: "/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern" },
        { label: "Pferde in NRW", href: "/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-nrw" },
      ]
    },
    {
      label: "Pferd verkaufen",
      href: "/pferd-verkaufen",
      dropdown: [
        { label: "Pferdewert berechnen", href: "/pferd-verkaufen/pferdewert-berechnen" },
        { label: "Verkaufstipps", href: "/pferd-verkaufen/verkaufstipps" },
        { label: "Verkaufspreis optimieren", href: "/pferd-verkaufen/verkaufspreis-optimieren" },
        { label: "Verkaufsberatung", href: "/pferd-verkaufen/verkaufsberatung" },
      ]
    },
    {
      label: "Ratgeber",
      href: "/pferde-ratgeber",
      dropdown: [
        { label: "AKU verstehen", href: "/pferde-ratgeber/aku-verstehen" },
        { label: "AKU Befunde interpretieren", href: "/pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren" },
        { label: "Pferdebewertung Grundlagen", href: "/pferde-ratgeber/pferdebewertung-grundlagen" },
        { label: "Markttrends", href: "/pferde-ratgeber/markttrends" },
        { label: "Krisensituationen", href: "/pferde-ratgeber/krisensituationen" },
      ]
    },
  ]

  // Breadcrumb Items generieren
  const getBreadcrumbItems = () => {
    const path = router.pathname
    const items = []

    // Finde aktuelle Navigation
    for (const navItem of navigationItems) {
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
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between">
            {/* Logo + Brand Name */}
            <Link href="/" className="flex items-center space-x-3">
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
            </Link>

            {/* Desktop Navigation mit Dropdowns */}
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-brand-brown font-medium transition-colors py-2"
                  >
                    <span>{item.label}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1 border border-gray-200">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Desktop CTAs */}
              <Link
                href="/beispiel-analyse"
                className="border border-brand-brown text-brand-brown px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors font-medium"
              >
                Beispiel-Analyse
              </Link>
              <Link
                href="/pferde-preis-berechnen"
                className="bg-brand-brown hover:bg-brand-brownDark text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Jetzt bewerten
              </Link>
            </nav>
          </div>
        </div>

        {/* Mobile Header - Neue Struktur */}
        <div className="md:hidden">
          <div className="w-full px-4 h-16 flex items-center justify-between">
            {/* Logo ohne Text */}
            <Link href="/" className="flex items-center">
              <Image
                src="/favicon.svg"
                alt="PferdeWert"
                width={36}
                height={36}
                className="rounded-full"
              />
            </Link>

            {/* Zentraler Main CTA */}
            <Link
              href="/pferde-preis-berechnen"
              className="bg-brand-brown hover:bg-brand-brownDark text-white px-6 py-2 rounded-lg transition-colors font-medium text-sm"
            >
              Pferd bewerten
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-gray-700 hover:text-brand-brown transition-colors"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Breadcrumb Navigation */}
          {!isMenuOpen && getBreadcrumbItems().length > 0 && (
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
              <Breadcrumbs items={getBreadcrumbItems()} />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          visibility: isMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        <nav className="h-full flex flex-col">
          {/* Navigation Links mit Accordion */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {navigationItems.map((item) => (
              <div key={item.href} className="mb-4">
                <Link
                  href={item.href}
                  className="block text-gray-900 font-medium py-2 text-base"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 space-y-1 mt-2">
                    {item.dropdown.slice(0, 3).map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block text-gray-600 hover:text-brand-brown py-1 text-sm"
                        onClick={closeMenu}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/ueber-pferdewert"
              className="block text-gray-700 font-medium py-2 text-base border-t border-gray-200 mt-4 pt-4"
              onClick={closeMenu}
            >
              Über PferdeWert
            </Link>
          </div>

          {/* Secondary CTA am unteren Rand */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <Link
              href="/beispiel-analyse"
              className="block w-full text-center border-2 border-brand-brown text-brand-brown px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors font-medium"
              onClick={closeMenu}
            >
              Beispiel-Analyse ansehen
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}