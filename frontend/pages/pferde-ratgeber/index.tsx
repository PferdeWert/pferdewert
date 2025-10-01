import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

const PferdeRatgeber: NextPage = () => {
  const ratgeberArtikel = [
    {
      id: 1,
      titel: "AKU Pferd - Ankaufsuntersuchung erklärt",
      beschreibung: "Der umfassende Leitfaden zur Ankaufsuntersuchung beim Pferdekauf. Kosten, Ablauf, Bewertung und wie AKU-Befunde den Pferdewert beeinflussen.",
      kategorie: "Kauf & Verkauf",
      lesezeit: "15 Min.",
      bild: "/veterinarian-examining-horse-health-check.webp",
      link: "/pferde-ratgeber/aku-pferd",
    },
    {
      id: 2,
      titel: "Pferd kaufen - Der komplette Ratgeber",
      beschreibung: "Der ultimative Ratgeber für den Pferdekauf. Checklisten, rechtliche Aspekte, Bewertungskriterien und Tipps für die richtige Entscheidung.",
      kategorie: "Kauf & Verkauf",
      lesezeit: "18 Min.",
      bild: "/person-evaluating-horse-for-purchase.webp",
      link: "/pferde-ratgeber/pferd-kaufen",
    },
    {
      id: 3,
      titel: "Pferd verkaufen - Erfolgreich & Optimal",
      beschreibung: "Professionelle Tipps für den erfolgreichen Pferdeverkauf. Von der optimalen Bewertung bis zur rechtssicheren Abwicklung.",
      kategorie: "Kauf & Verkauf",
      lesezeit: "16 Min.",
      bild: "/happy-horse-owner-with-horse--professional-consult.webp",
      link: "/pferde-ratgeber/pferd-verkaufen",
    },
  ]

  return (
    <>
      <Head>
        <title>Pferde-Ratgeber | Expertenwissen für Pferdebesitzer | PferdeWert.de</title>
        <meta
          name="description"
          content="Die wichtigsten Pferde-Ratgeber: AKU Pferd, Pferd kaufen und Pferd verkaufen. Expertentipps für erfolgreichen Pferdekauf und -verkauf."
        />
        <meta name="keywords" content="Pferde Ratgeber, AKU Pferd, Pferd kaufen, Pferd verkaufen, Pferdekauf Ratgeber, Ankaufsuntersuchung" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber" />
      </Head>

      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-brand-light/50 to-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/beautiful-horse-in-golden-sunset-light--profession.webp"
              alt="Pferd im goldenen Licht"
              fill
              sizes="100vw"
              className="object-cover opacity-20"
              priority
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-h1 font-serif font-bold text-brand mb-6">Pferde-Ratgeber</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              Ihr Expertenleitfaden für Pferdekauf und Pferdeverkauf – mit professioneller AKU-Beratung und Bewertungstipps.
            </p>
          </div>
        </section>

        {/* Artikel Grid */}
        <section id="artikel-grid" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-serif font-bold text-brand mb-4">Unsere Hauptratgeber</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Die drei wichtigsten Ratgeber für Pferdekauf und -verkauf – kompakt und praxisnah erklärt
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ratgeberArtikel.map((artikel) => (
                <div key={artikel.id} className="group bg-white rounded-xl shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <Image
                      src={artikel.bild}
                      alt={artikel.titel}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium bg-brand-light text-brand px-2 py-1 rounded">
                        {artikel.kategorie}
                      </span>
                      <span className="text-xs text-gray-500">{artikel.lesezeit}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-3 text-brand group-hover:text-brand-brown transition-colors">
                      {artikel.titel}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{artikel.beschreibung}</p>

                    <Link href={artikel.link}>
                      <button className="w-full border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white transition-colors py-2 px-4 rounded-lg text-sm font-medium">
                        Artikel lesen
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-light/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-12 relative w-full max-w-2xl mx-auto aspect-[3/2]">
              <Image
                src="/happy-horse-owner-with-horse--professional-consult.webp"
                alt="Professionelle Pferdeberatung"
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="rounded-xl shadow-soft object-cover"
              />
            </div>

            <h2 className="text-h2 font-serif font-bold text-brand mb-6">
              Ihr Pferd bewerten lassen?
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Nutzen Sie unsere AI-gestützte Pferdebewertung für eine objektive Einschätzung des Marktwertes. Einfach, schnell und datenbasiert.
            </p>

            <div className="flex justify-center">
              <Link href="/pferde-preis-berechnen">
                <button className="bg-brand-brown hover:bg-brand-brownDark text-white px-8 py-3 rounded-lg transition-colors font-medium text-button">
                  Bewertung starten
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default PferdeRatgeber