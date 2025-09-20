import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

const PferdeRatgeber: NextPage = () => {
  const ratgeberKategorien = [
    {
      title: "AKU verstehen",
      description: "Alles was Sie über die Ankaufsuntersuchung wissen müssen",
      href: "/pferde-ratgeber/aku-verstehen",
      icon: "🔍"
    },
    {
      title: "Pferdebewertung Grundlagen",
      description: "Grundlagen der professionellen Pferdebewertung",
      href: "/pferde-ratgeber/pferdebewertung-grundlagen",
      icon: "📊"
    },
    {
      title: "Markttrends",
      description: "Aktuelle Entwicklungen im Pferdemarkt",
      href: "/pferde-ratgeber/markttrends",
      icon: "📈"
    },
    {
      title: "Krisensituationen",
      description: "Hilfe bei schwierigen Entscheidungen",
      href: "/pferde-ratgeber/krisensituationen",
      icon: "🆘"
    }
  ]

  return (
    <>
      <Head>
        <title>Pferde-Ratgeber | Expertenwissen für Pferdebesitzer | PferdeWert.de</title>
        <meta
          name="description"
          content="Umfassender Pferde-Ratgeber mit Expertenwissen zu AKU, Pferdebewertung, Markttrends und mehr. Professionelle Beratung für Pferdebesitzer."
        />
        <meta name="keywords" content="Pferde Ratgeber, AKU, Pferdebewertung, Markttrends, Pferdeberatung" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-brown mb-6">
              Pferde-Ratgeber
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expertenwissen für Pferdebesitzer, Käufer und Verkäufer.
              Von der Ankaufsuntersuchung bis zur professionellen Bewertung.
            </p>
          </div>

          {/* Ratgeber Kategorien */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {ratgeberKategorien.map((kategorie) => (
              <Link
                key={kategorie.href}
                href={kategorie.href}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-amber-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{kategorie.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-brown mb-2">
                      {kategorie.title}
                    </h3>
                    <p className="text-gray-600">
                      {kategorie.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
            <h2 className="text-2xl font-bold text-brand-brown mb-6">
              Beliebte Ratgeber-Artikel
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren"
                className="text-brand-brown hover:text-brand-brownDark transition-colors"
              >
                → AKU Befunde richtig interpretieren
              </Link>
              <Link
                href="/pferde-ratgeber/pferdebewertung-grundlagen"
                className="text-brand-brown hover:text-brand-brownDark transition-colors"
              >
                → Grundlagen der Pferdebewertung
              </Link>
              <Link
                href="/pferde-ratgeber/markttrends"
                className="text-brand-brown hover:text-brand-brownDark transition-colors"
              >
                → Aktuelle Marktentwicklungen
              </Link>
              <Link
                href="/pferde-ratgeber/krisensituationen"
                className="text-brand-brown hover:text-brand-brownDark transition-colors"
              >
                → Hilfe in schwierigen Situationen
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-brand-brown/5 rounded-lg p-8 border border-brand-brown/20">
              <h2 className="text-2xl font-bold text-brand-brown mb-4">
                Brauchen Sie eine professionelle Pferdebewertung?
              </h2>
              <p className="text-gray-600 mb-6">
                Nutzen Sie unsere KI-gestützte Bewertung für eine objektive Einschätzung Ihres Pferdes.
              </p>
              <Link
                href="/pferde-preis-berechnen"
                className="inline-block bg-brand-brown hover:bg-brand-brownDark text-white px-8 py-3 rounded-lg transition-colors font-medium"
              >
                Jetzt Pferd bewerten lassen
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default PferdeRatgeber