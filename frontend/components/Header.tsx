// frontend/components/Header.tsx

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { TIER_PRICES, formatPrice } from "@/lib/pricing"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExamplesDropdownOpen, setIsExamplesDropdownOpen] = useState(false)

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

    // Cleanup beim Component unmount
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  // ESC-Taste zum Schließen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  // Click outside to close examples dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExamplesDropdownOpen && !(event.target as Element).closest('.examples-dropdown')) {
        setIsExamplesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExamplesDropdownOpen])

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100">
      <div className="w-full px-4 lg:px-6 h-16 flex items-center justify-between">
        
        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center space-x-3" onClick={closeMenu}>
          <Image 
            src="/favicon.svg" 
            alt="PferdeWert" 
            width={40} 
            height={40} 
            className="rounded-full" 
          />
          <span className="text-xl font-bold text-brand-brown">
            PferdeWert
          </span>
        </Link>

        {/* Desktop Navigation - Neue Struktur */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/ueber-pferdewert"
            className="text-gray-700 hover:text-brand-brown font-medium transition-colors"
          >
            Über PferdeWert
          </Link>
          
          <Link
            href="/preise"
            className="text-gray-700 hover:text-brand-brown font-medium transition-colors"
          >
            Preise
          </Link>
          
          {/* Examples Dropdown */}
          <div className="relative examples-dropdown">
            <button
              onClick={() => setIsExamplesDropdownOpen(!isExamplesDropdownOpen)}
              className="text-gray-700 hover:text-brand-brown font-medium transition-colors flex items-center space-x-1"
            >
              <span>Beispiel-Analysen</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isExamplesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isExamplesDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <Link
                    href="/beispiel-basic"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                    onClick={() => setIsExamplesDropdownOpen(false)}
                  >
                    <div className="font-medium">PferdeWert Basic</div>
                    <div className="text-xs text-gray-500">{`Schnelle Preisspanne - ${formatPrice(TIER_PRICES.basic)}`}</div>
                  </Link>
                  <Link
                    href="/beispiel-pro"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                    onClick={() => setIsExamplesDropdownOpen(false)}
                  >
                    <div className="font-medium">PferdeWert Pro</div>
                    <div className="text-xs text-gray-500">{`Detaillierte KI-Analyse - ${formatPrice(TIER_PRICES.pro)}`}</div>
                  </Link>
                  <Link
                    href="/beispiel-premium"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                    onClick={() => setIsExamplesDropdownOpen(false)}
                  >
                    <div className="font-medium">PferdeWert Premium</div>
                    <div className="text-xs text-gray-500">{`KI-Foto-Analyse Exterieur - ${formatPrice(TIER_PRICES.premium)}`}</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link
            href="/pferde-preis-berechnen"
            className="bg-brand-brown hover:bg-brand-brownDark text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Jetzt bewerten
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-brand-brown transition-colors"
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
        className={`md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ 
          visibility: isMenuOpen ? 'visible' : 'hidden',
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        <nav className="px-4 py-6 space-y-4" aria-label="Mobile Navigation">
          {/* Mobile Navigation Links */}
          <Link
            href="/ueber-pferdewert"
            className="block text-gray-700 hover:text-brand-brown font-medium py-3 px-2 transition-colors border-b border-gray-100"
            onClick={closeMenu}
          >
            Über PferdeWert
          </Link>
          
          <Link
            href="/preise"
            className="block text-gray-700 hover:text-brand-brown font-medium py-3 px-2 transition-colors border-b border-gray-100"
            onClick={closeMenu}
          >
            Preise
          </Link>

          {/* Mobile Examples */}
          <div className="pt-4 border-t border-gray-200">
            <div className="mb-3">
              <div className="px-4 py-2 text-sm font-medium text-gray-500">Beispiel-Analysen</div>
              <Link
                href="/beispiel-basic"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                onClick={closeMenu}
              >
                {`PferdeWert Basic - ${formatPrice(TIER_PRICES.basic)}`}
              </Link>
              <Link
                href="/beispiel-pro"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                onClick={closeMenu}
              >
                {`PferdeWert Pro - ${formatPrice(TIER_PRICES.pro)}`}
              </Link>
              <Link
                href="/beispiel-premium"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-brand-brown transition-colors"
                onClick={closeMenu}
              >
                {`PferdeWert Premium - ${formatPrice(TIER_PRICES.premium)}`}
              </Link>
            </div>
          </div>
          
          {/* Mobile CTA Button */}
          <div className="pt-4 space-y-3 border-t border-gray-200">
            <Link
              href="/pferde-preis-berechnen"
              className="block w-full text-center bg-brand-brown hover:bg-brand-brownDark text-white px-4 py-3 rounded-lg transition-colors font-medium"
              onClick={closeMenu}
            >
              Jetzt bewerten
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}