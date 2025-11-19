import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { RATGEBER_ENTRIES, getRatgeberPath, type RatgeberEntry } from '@/lib/ratgeber-registry'
import LocalizedLink from '@/components/LocalizedLink'

// ============================================================================
// TYPES
// ============================================================================

interface RatgeberArtikelCard {
  id: number
  titel: string
  beschreibung: string
  kategorie: string
  lesezeit: string
  bild: string
  link: string
}

interface PageProps {
  artikel: RatgeberArtikelCard[]
}

// ============================================================================
// ISR: STATIC PROPS WITH REVALIDATION
// ============================================================================

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  // Transform registry entries into article cards at build time
  const artikel: RatgeberArtikelCard[] = RATGEBER_ENTRIES.map((entry: RatgeberEntry, index: number) => ({
    id: index + 1,
    titel: entry.title,
    beschreibung: entry.description,
    kategorie: entry.category,
    lesezeit: entry.readTime,
    bild: entry.image,
    link: getRatgeberPath(entry.slug),
  }))

  return {
    props: {
      artikel,
    },
    // Revalidate every day (registry is static)
    revalidate: 86400,
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PferdeRatgeber: NextPage<PageProps> = ({ artikel }) => {
  return (
    <>
      <Head>
        <title>Pferde-Ratgeber | Expertenwissen für Pferdebesitzer | PferdeWert.de</title>
        <meta
          name="description"
          content="Alle Pferde-Ratgeber auf einen Blick: AKU Pferd, Kosten, Klassen, Ablauf, Pferd kaufen & verkaufen. Expertentipps für erfolgreichen Pferdekauf und -verkauf."
        />
        <meta name="keywords" content="Pferde Ratgeber, AKU Pferd, Pferd kaufen, Pferd verkaufen, Pferdekauf Ratgeber, Ankaufsuntersuchung, Pferdegesundheit" />
        <link rel="canonical" href="https://www.pferdewert.de/pferde-ratgeber" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/overviews/pferde-ratgeber-hero.webp"
              alt="Pferd im goldenen Licht"
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              priority
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand mb-6">
              Pferde-Ratgeber
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Ihr Expertenleitfaden für Pferdekauf, Pferdeverkauf und Ankaufsuntersuchung – fundiertes Wissen für informierte Entscheidungen
            </p>
          </div>
        </section>

        {/* Artikel Grid */}
        <section id="artikel-grid" className="py-16 md:py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand mb-4">
                Alle Ratgeber im Überblick
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Von der Ankaufsuntersuchung bis zum erfolgreichen Verkauf – fundierte Informationen für jeden Schritt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {artikel && artikel.length > 0 ? (
                artikel.map((art) => (
                  <LocalizedLink
                    key={art.id}
                    href={art.link}
                    className="group bg-white rounded-xl shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                    aria-label={`${art.titel} lesen`}
                  >
                    <article className="flex flex-col h-full">
                      {/* Image Container - Fixed aspect ratio */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={art.bild}
                          alt={art.titel}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content Container - Flex grow to push button to bottom */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Meta Information */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded ${
                            art.kategorie === 'Gesundheit'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {art.kategorie}
                          </span>
                          <span className="text-xs text-gray-500">{art.lesezeit}</span>
                        </div>

                        {/* Title - Fixed height for alignment */}
                        <h3 className="text-xl font-serif font-bold mb-3 text-brand group-hover:text-brand-brown transition-colors line-clamp-2 min-h-[3.5rem]">
                          {art.titel}
                        </h3>

                        {/* Description - Flex grow to fill space */}
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                          {art.beschreibung}
                        </p>

                        {/* Visual Button Indicator - Always at bottom */}
                        <div className="mt-auto w-full border-2 border-brand-brown text-brand-brown group-hover:bg-brand-brown group-hover:text-white transition-colors py-2.5 px-4 rounded-lg text-sm font-medium text-center">
                          Artikel lesen
                        </div>
                      </div>
                    </article>
                  </LocalizedLink>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">Keine Ratgeber-Artikel verfügbar.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <div className="mb-8 md:mb-12 relative w-full max-w-2xl mx-auto aspect-[3/2]">
              <Image
                src="/images/shared/blossi-shooting.webp"
                alt="Professionelle Pferdebewertung mit PferdeWert"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="rounded-xl shadow-soft object-cover"
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand mb-6">
              Ihr Pferd bewerten lassen?
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Nutzen Sie unsere KI-gestützte Pferdebewertung für eine objektive Einschätzung des Marktwertes. Erfahren Sie mehr über die{' '}
              <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand font-semibold hover:text-brand-brown transition-colors underline">
                Kosten eines Pferdes
              </LocalizedLink>
              {' '}und treffen Sie fundierte Entscheidungen. Einfach, schnell und datenbasiert.
            </p>

            <LocalizedLink href="/pferde-preis-berechnen">
              <button className="bg-brand-brown hover:bg-brand-brownDark text-white px-8 py-3 rounded-lg transition-colors font-medium text-base min-w-[200px]">
                Jetzt Pferdewert berechnen
              </button>
            </LocalizedLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default PferdeRatgeber
