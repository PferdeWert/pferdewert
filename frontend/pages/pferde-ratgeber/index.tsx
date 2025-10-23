import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { error } from '@/lib/log'
import { connectToDatabase } from '@/lib/mongo/client'
import { getRatgeberRepository } from '@/lib/mongo/ratgeber-repository'
import { RatgeberArticle } from '@/types/ratgeber'

// ============================================================================
// TYPES
// ============================================================================

interface RatgeberIndexProps {
  articles: RatgeberArticle[]
}

interface RatgeberArtikelCard {
  id: number
  titel: string
  beschreibung: string
  kategorie: string
  lesezeit: string
  bild: string
  link: string
}

// ============================================================================
// ISR: STATIC PROPS WITH REVALIDATION
// ============================================================================

export const getStaticProps: GetStaticProps<RatgeberIndexProps> = async () => {
  try {
    const { db } = await connectToDatabase()
    const repository = getRatgeberRepository(db)

    // Fetch all published articles with high limit
    const response = await repository.findPublished(1, 100)

    return {
      props: {
        articles: response.articles,
      },
      // Revalidate every hour
      revalidate: 3600,
    }
  } catch (err) {
    error('Failed to fetch ratgeber articles:', err)
    // Return empty array with shorter revalidation on error
    return {
      props: {
        articles: [],
      },
      revalidate: 60,
    }
  }
}

// ============================================================================
// HELPER: TRANSFORM ARTICLE TO UI FORMAT
// ============================================================================

function transformArticleToCard(article: RatgeberArticle, index: number): RatgeberArtikelCard {
  // Use edited title if available, fallback to Outrank title
  const titel = article.pferdewert.edited_title || article.outrank.title

  // Use meta description for summary
  const beschreibung = article.seo.meta_description

  // Map category enum to display name
  const kategorieMappings: Record<string, string> = {
    pferdekauf: 'Kauf',
    pferdeverkauf: 'Verkauf',
    pferdehaltung: 'Haltung',
    pferdegesundheit: 'Gesundheit',
    pferdetraining: 'Training',
    pferdewissen: 'Wissen',
    marktanalyse: 'Markt',
  }
  const kategorie = kategorieMappings[article.taxonomy.primary_category] || 'Wissen'

  // Use featured image if available, fallback to Outrank image
  const bild = article.pferdewert.featured_image || article.outrank.image_url

  // Create article link using slug
  const link = `/pferde-ratgeber/${article.outrank.slug}`

  return {
    id: index + 1,
    titel,
    beschreibung,
    kategorie,
    lesezeit: '5 Minuten Lesezeit',
    bild,
    link,
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const PferdeRatgeber: NextPage<RatgeberIndexProps> = ({ articles }) => {
  const ratgeberArtikel: RatgeberArtikelCard[] = articles.map((article, index) =>
    transformArticleToCard(article, index)
  )

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
              {ratgeberArtikel.map((artikel) => (
                <Link
                  key={artikel.id}
                  href={artikel.link}
                  className="group bg-white rounded-xl shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                  aria-label={`${artikel.titel} lesen`}
                >
                  <article className="flex flex-col h-full">
                    {/* Image Container - Fixed aspect ratio */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={artikel.bild}
                        alt={artikel.titel}
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
                          artikel.kategorie === 'Gesundheit'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {artikel.kategorie}
                        </span>
                        <span className="text-xs text-gray-500">{artikel.lesezeit}</span>
                      </div>

                      {/* Title - Fixed height for alignment */}
                      <h3 className="text-xl font-serif font-bold mb-3 text-brand group-hover:text-brand-brown transition-colors line-clamp-2 min-h-[3.5rem]">
                        {artikel.titel}
                      </h3>

                      {/* Description - Flex grow to fill space */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                        {artikel.beschreibung}
                      </p>

                      {/* Visual Button Indicator - Always at bottom */}
                      <div className="mt-auto w-full border-2 border-brand-brown text-brand-brown group-hover:bg-brand-brown group-hover:text-white transition-colors py-2.5 px-4 rounded-lg text-sm font-medium text-center">
                        Artikel lesen
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
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
              Nutzen Sie unsere AI-gestützte Pferdebewertung für eine objektive Einschätzung des Marktwertes. Einfach, schnell und datenbasiert.
            </p>

            <Link href="/pferde-preis-berechnen">
              <button className="bg-brand-brown hover:bg-brand-brownDark text-white px-8 py-3 rounded-lg transition-colors font-medium text-base min-w-[200px]">
                Jetzt Pferdewert berechnen
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default PferdeRatgeber
