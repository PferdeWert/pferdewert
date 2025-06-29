// frontend/components/Header.tsx

import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
            href="/beispiel"
            className="border border-[#6B4A2D] text-[#6B4A2D] px-4 py-2 rounded-lg hover:bg-[#F2EDE8] transition"
          >
            Beispiel ansehen
          </Link>
          <Link
            href="/bewerten"
            className="bg-[#6B4A2D] text-white px-4 py-2 rounded-lg hover:bg-[#5A3F28] transition"
          >
            Jetzt bewerten
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-2xl text-[#6B4A2D]">
          &#9776;
        </button>
      </div>
    </header>
  );
}
