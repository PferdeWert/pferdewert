// frontend/components/HeaderUnified.tsx

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import LocalizedLink from "@/components/LocalizedLink"
import CountrySwitcher from "@/components/CountrySwitcher"
import { Menu, X, ChevronDown } from "lucide-react"
import { useRouter } from "next/router"
import Breadcrumbs from "./Breadcrumbs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// ============================================================================
// FAST REFRESH FIX: Define icons at module level to prevent recreation
// ============================================================================
const menuIcon = <Menu className="h-6 w-6" />
const closeIcon = <X className="h-6 w-6" />
const chevronDownIcon = <ChevronDown className="w-4 h-4" />
const chevronDownIconMobile = <ChevronDown className="w-4 h-4 text-gray-500" />

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
              {NAVIGATION_ITEMS.map((item) => (
                item.dropdown ? (
                  <DropdownMenu key={item.href}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-gray-700 hover:text-brand-brown font-medium transition-colors py-2 px-0 h-auto"
                      >
                        <span>{item.label}</span>
                        {chevronDownIcon}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.href} asChild>
                          <LocalizedLink
                            href={subItem.href}
                            className="cursor-pointer"
                          >
                            {subItem.label}
                          </LocalizedLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <LocalizedLink
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-brand-brown font-medium transition-colors py-2"
                  >
                    {item.label}
                  </LocalizedLink>
                )
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
            {/* Navigation Links mit Progressive Disclosure */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              {NAVIGATION_ITEMS.map((item, index) => (
                <div key={item.href} className={index > 0 ? 'border-t border-gray-100 pt-2' : ''}>
                  {item.dropdown ? (
                    // Kategorie mit Dropdown - Radix UI
                    <div className="mb-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-gray-900 font-semibold text-base py-3.5 px-3 h-auto hover:bg-gray-50"
                          >
                            <span>{item.label}</span>
                            {chevronDownIconMobile}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-72">
                          {item.dropdown.map((subItem) => (
                            <DropdownMenuItem key={subItem.href} asChild>
                              <LocalizedLink
                                href={subItem.href}
                                className="cursor-pointer"
                                onClick={closeMenu}
                              >
                                {subItem.label}
                              </LocalizedLink>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    // Direkter Link (Über uns)
                    <LocalizedLink
                      href={item.href}
                      className="block text-gray-900 font-semibold py-3.5 px-3 text-base hover:bg-gray-50 rounded-lg transition-colors duration-150 mb-2"
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
      )}
    </>
  )
}