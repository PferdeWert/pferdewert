// frontend/components/Header.tsx

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#FCFAF6] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between h-16">
        {/* Logo + Text */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-white.svg"
            alt="PferdeWert Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span className="text-xl font-serif text-[#4B3F30] tracking-tight">
            PferdeWert
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-3 items-center" aria-label="Hauptnavigation">
          <Link
            href="/beispiel-analyse"
            className="border border-brand-brown text-brand-brown px-4 py-2 rounded-lg hover:bg-[#F2EDE8] transition"
          >
            Beispiel ansehen
          </Link>
          <Link
            href="/pferde-preis-berechnen"
            className="bg-brand-brown text-white px-4 py-2 rounded-lg hover:bg-brand-brownDark transition"
          >
            Jetzt bewerten
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-brand-brown"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu mit sanfter Animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"
        } bg-[#FCFAF6] px-4 space-y-2 border-t border-[#EAE4DC]`}
        role="menu"
      >
        <Link
          href="/beispiel-analyse"
          onClick={() => setMenuOpen(false)}
          className="block border border-brand-brown text-brand-brown px-4 py-2 rounded-lg hover:bg-[#F2EDE8] transition"
        >
          Beispiel ansehen
        </Link>
        <Link
          href="/pferde-preis-berechnen"
          onClick={() => setMenuOpen(false)}
          className="block bg-brand-brown text-white px-4 py-2 rounded-lg hover:bg-brand-brownDark transition"
        >
          Jetzt bewerten
        </Link>
      </div>
    </header>
  );
}
