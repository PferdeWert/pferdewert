// frontend/components/Footer.tsx

import Link from "next/link";
import { useCountryConfig } from "@/hooks/useCountryConfig";

// Konstante außerhalb des Renders für bessere Performance
const currentYear = new Date().getFullYear();

export default function Footer() {
  const { getLocalizedPath } = useCountryConfig();
  return (
    <footer className="bg-[#FCFAF6] text-center text-sm text-[#5A4B3B] mt-12 py-6 border-t border-[#EAE4DC]">
      {/* Semantische Navigation mit ul/li Struktur */}
      <nav aria-label="Footer Navigation">
        <ul className="flex flex-wrap justify-center items-center gap-4 mb-2">
          <li>
            <Link href={getLocalizedPath("/pferde-preis-berechnen")} className="hover:underline">
              Pferd bewerten
            </Link>
          </li>
          <li>
            <Link href={getLocalizedPath("/beispiel-analyse")} className="hover:underline">
              Beispiel-Analyse
            </Link>
          </li>
          
          {/* Accessibility-konformes Details/Summary Dropdown */}
          <li>
            <details className="relative inline-block group">
              <summary className="hover:underline cursor-pointer list-none flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B4A2D]">
                Rechtliches
                <svg className="w-3 h-3 transition-transform group-open:rotate-180" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </summary>
              
              {/* Dropdown Menu - Edge-Case optimiert */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 max-w-xs sm:w-48 bg-[#FCFAF6] border border-[#EAE4DC] rounded-lg shadow-lg z-10">
                <ul className="py-2" role="menu">
                  <li role="none">
                    <Link
                      href={getLocalizedPath("/impressum")}
                      className="block px-4 py-2 text-sm text-[#5A4B3B] hover:underline"
                      role="menuitem"
                    >
                      Impressum
                    </Link>
                  </li>
                  <li role="none">
                    <Link
                      href={getLocalizedPath("/datenschutz")}
                      className="block px-4 py-2 text-sm text-[#5A4B3B] hover:underline"
                      role="menuitem"
                    >
                      Datenschutz
                    </Link>
                  </li>
                  <li role="none">
                    <Link
                      href={getLocalizedPath("/agb")}
                      className="block px-4 py-2 text-sm text-[#5A4B3B] hover:underline"
                      role="menuitem"
                    >
                      AGB
                    </Link>
                  </li>
                </ul>
                {/* Pfeil nach unten - angepasst für neue Positionierung */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#FCFAF6]" aria-hidden="true"></div>
              </div>
            </details>
          </li>
        </ul>
      </nav>
      
      {/* Copyright mit optimierter Jahresberechnung */}
      <p className="text-xs text-[#9C8E7F]">
        © {currentYear} PferdeWert – alle Rechte vorbehalten
      </p>
    </footer>
  );
}

/* 
TODO: SEO-Sitemap Update erforderlich
- /pferd-verkaufen zu sitemap.xml hinzufügen
- Build-Script prüfen für automatische URL-Erkennung
- Alle Footer-Links in Sitemap validieren
*/