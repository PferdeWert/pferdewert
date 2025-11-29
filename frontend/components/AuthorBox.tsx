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
            alt="Benjamin Reder - Gründer von PferdeWert.de"
            width={80}
            height={80}
            className="rounded-full ring-2 ring-amber-100 hover:ring-amber-200 transition-all"
          />
        </LocalizedLink>

        <div className="space-y-2">
          <div>
            <LocalizedLink
              href="/ueber-pferdewert"
              className="text-lg font-semibold text-gray-900 hover:text-brand-brown transition-colors"
            >
              Benjamin Reder
            </LocalizedLink>
            <p className="text-gray-600">Gründer von PferdeWert.de</p>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed italic">
            &bdquo;2017 haben wir unser erstes Pferd gekauft. Seitdem sind Pferde ein Teil unserer Familie.&ldquo;
          </p>

          <LocalizedLink
            href="/ueber-pferdewert"
            className="inline-flex items-center text-sm font-medium text-brand-brown hover:text-brand-brownDark transition-colors"
          >
            Mehr über uns
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </LocalizedLink>
        </div>
      </div>
    </div>
  )
}
