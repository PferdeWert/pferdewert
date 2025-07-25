// frontend/components/Header.tsx

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: "#bewertung", label: "Bewertung" },
    { href: "#vorteile", label: "Vorteile" },
    { href: "#preise", label: "Preise" },
  ]

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Hauptnavigation">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-gray-700 hover:text-brand-brown font-medium transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/beispiel-analyse"
            className="border border-brand-brown text-brand-brown px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors font-medium"
          >
            Beispiel ansehen
          </Link>
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
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block text-gray-700 hover:text-brand-brown font-medium py-3 px-2 transition-colors border-b border-gray-100 last:border-b-0"
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}

          {/* Mobile Buttons */}
          <div className="pt-4 space-y-3 border-t border-gray-200">
            <Link
              href="/pferde-preis-berechnen"
              className="block w-full text-center bg-brand-brown hover:bg-brand-brownDark text-white px-4 py-3 rounded-lg transition-colors font-medium"
              onClick={closeMenu}
            >
              Jetzt bewerten
            </Link>
            <Link
              href="/beispiel-analyse"
              className="block w-full text-center border border-brand-brown text-brand-brown px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors font-medium"
              onClick={closeMenu}
            >
              Beispiel ansehen
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}