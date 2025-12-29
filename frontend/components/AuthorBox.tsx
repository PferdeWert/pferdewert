import Image from "next/image"
import LocalizedLink from "@/components/LocalizedLink"

export default function AuthorBox() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
        Über den Autor
      </p>

      <div className="flex items-start gap-5">
        <LocalizedLink href="/ueber-pferdewert" className="flex-shrink-0">
          <Image
            src="/images/shared/benjamin-reder.webp"
            alt="Benjamin Reder mit Stute Blossi - Gründer von PferdeWert.de"
            width={100}
            height={100}
            className="rounded-full ring-2 ring-amber-100 hover:ring-amber-200 transition-all"
          />
        </LocalizedLink>

        <div className="space-y-3">
          <div>
            <LocalizedLink
              href="/ueber-pferdewert"
              className="text-lg font-semibold text-gray-900 hover:text-brand-brown transition-colors"
            >
              Benjamin Reder
            </LocalizedLink>
            <p className="text-gray-600">Gründer von PferdeWert.de | Pferdebesitzer seit 2017</p>
          </div>

          <div className="text-sm text-gray-700 leading-relaxed space-y-2">
            <p>
              <strong>8 Jahre praktische Pferdehaltungserfahrung</strong> – zusammen mit meiner Frau halte ich seit 2017
              eigene Pferde. Unsere Stute <strong>Blossi</strong> (6 Jahre, Deutsches Sportpferd) ist bereits
              unser zweites Pferd und begleitet uns täglich.
            </p>
            <p>
              Als <strong>KI-Experte mit über 10 Jahren Digitalerfahrung</strong> verbinde ich technisches Know-how
              mit der Realität der Pferdehaltung – ich kenne den Alltag zwischen Stallkosten, Tierarztrechnungen
              und Futterplanung aus erster Hand.
            </p>
            <p className="text-gray-600 italic pt-1">
              👨‍👩‍👧‍👦 Familie mit zwei Kindern – Pferdemenschen mit ganzem Herzen
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2 flex-wrap">
            <LocalizedLink
              href="/ueber-pferdewert"
              className="inline-flex items-center text-sm font-medium text-brand-brown hover:text-brand-brownDark transition-colors"
            >
              Mehr über uns
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </LocalizedLink>

            <a
              href="https://www.instagram.com/pferdewert.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-pink-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @pferdewert.de
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
