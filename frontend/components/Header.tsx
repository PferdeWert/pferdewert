// frontend/components/Header.tsx

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 bg-[#FCFAF6] shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-white.svg"
            alt="PferdeWert Logo"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-3" aria-label="Hauptnavigation">
          <Link
            href="/beispiel"
            className="border border-[#6B4A2D] text-[#6B4A2D] px-4 py-2 rounded-lg hover:bg-[#F4F0EB] transition"
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
