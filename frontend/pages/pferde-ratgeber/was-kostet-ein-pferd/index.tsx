import Head from 'next/head'
import Link from 'next/link'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import FAQ from '@/components/FAQ'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import {
  wasKostetPferdSections,
  rassenPreise,
  alterPreisTiles,
  unterhaltKostenTiles,
  regionalBayernRegions,
  wasKostetPferdFaqItems,
  wasKostetPferdRelatedArticles
} from '@/data/ratgeber/wasKostetPferd'
import { Calculator } from 'lucide-react'

export default function WasKostetEinPferd() {
  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Was kostet ein Pferd? Kosten 2025 im Überblick',
    description: 'Ein Pferd kostet 2.500-15.000€ Anschaffung + 400-800€/Monat. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten.',
    author: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      url: 'https://www.pferdewert.de'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pferdewert.de/logo.png'
      }
    },
    datePublished: '2025-01-10',
    dateModified: '2025-01-10',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd'
    }
  }

  // JSON-LD Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.pferdewert.de'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pferde-Ratgeber',
        item: 'https://www.pferdewert.de/pferde-ratgeber'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Was kostet ein Pferd?',
        item: 'https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd'
      }
    ]
  }

  // JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: wasKostetPferdFaqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Was kostet ein Pferd? Kosten 2025 im Überblick</title>
        <meta
          name="description"
          content="Ein Pferd kostet 2.500-15.000€ Anschaffung + 400-800€/Monat. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Was kostet ein Pferd? Alle Kosten 2025 im Überblick" />
        <meta
          property="og:description"
          content="Ein Pferd kostet 2.500-15.000€ Anschaffung + 400-800€ monatlich. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://www.pferdewert.de/pferde-ratgeber/was-kostet-ein-pferd"
        />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Was kostet ein Pferd? Alle Kosten 2025 im Überblick" />
        <meta
          name="twitter:description"
          content="Ein Pferd kostet 2.500-15.000€ Anschaffung + 400-800€ monatlich. Komplette Kostenübersicht inkl. Stallmiete, Futter, Tierarzt & versteckte Kosten."
        />
        <meta name="twitter:site" content="@PferdeWert" />
        <meta name="twitter:creator" content="@PferdeWert" />

        {/* JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <RatgeberHero
          title="Was kostet ein Pferd?"
          subtitle="Komplette Kostenübersicht 2025: Von der Anschaffung bis zum monatlichen Unterhalt"
          primaryCta={{
            href: '/bewertung',
            label: 'Jetzt Pferd bewerten',
            icon: <Calculator className="w-5 h-5" />
          }}
          secondaryCta={{
            onClick: () => {
              document.getElementById('anschaffung')?.scrollIntoView({ behavior: 'smooth' })
            },
            label: 'Mehr erfahren'
          }}
        />

        {/* Table of Contents */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <RatgeberTableOfContents sections={wasKostetPferdSections} />
          </div>
        </section>

        {/* Content Container */}
        <article className="container mx-auto px-4 max-w-4xl py-16">
          {/* Section 1: Anschaffungskosten */}
          <section id="anschaffung" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Anschaffungskosten: Was kostet ein Pferd beim Kauf?
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Die Anschaffungskosten für ein Pferd variieren stark je nach Rasse, Alter, Ausbildungsstand und
                Verwendungszweck. Ein Freizeitpferd ist deutlich günstiger als ein ausgebildetes Turnierpferd.
                Die folgenden Übersichten geben Ihnen eine realistische Einschätzung der Kaufpreise.
              </p>
            </div>

            {/* Rassen-Preise Highlight Boxes */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Preise nach Pferderassen</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {rassenPreise.map((rasse, index) => (
                <RatgeberHighlightBox key={index} title={rasse.title}>
                  <p className="text-xl font-bold text-brand-brown mb-2">{rasse.price}</p>
                  <p className="text-gray-700">{rasse.description}</p>
                </RatgeberHighlightBox>
              ))}
            </div>

            {/* Alter-Preis Tiles */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Preise nach Alter</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {alterPreisTiles.map((tile, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{tile.title}</h4>
                  <p className="text-2xl font-bold text-brand-brown mb-3">{tile.value}</p>
                  <p className="text-gray-600 text-sm">{tile.description}</p>
                </div>
              ))}
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                <strong>Wichtig:</strong> Der Kaufpreis ist nur der Anfang. Ein günstiges Pferd mit
                gesundheitlichen Problemen kann durch Tierarztkosten schnell teurer werden als ein
                gut ausgebildetes, gesundes Pferd. Investieren Sie in eine gründliche{' '}
                <Link href="/pferde-ratgeber/aku-pferd" className="text-primary-600 hover:text-primary-700">
                  Ankaufsuntersuchung (AKU)
                </Link>
                , um spätere Kosten zu vermeiden.
              </p>
            </div>
          </section>

          {/* Section 2: Monatliche Unterhaltungskosten */}
          <section id="unterhalt" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Monatliche Unterhaltungskosten
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Die laufenden Kosten für ein Pferd belaufen sich auf durchschnittlich <strong>400-800€ pro Monat</strong>.
                Diese Kosten entstehen unabhängig davon, ob Sie Ihr Pferd reiten oder nicht. Eine realistische
                Kalkulation ist entscheidend, bevor Sie sich für ein eigenes Pferd entscheiden.
              </p>
            </div>

            {/* Unterhalt Kosten Tiles */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {unterhaltKostenTiles.map((tile, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{tile.title}</h4>
                  <p className="text-2xl font-bold text-brand-brown mb-3">{tile.value}</p>
                  <p className="text-gray-600 text-sm">{tile.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-10">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Gesamtkalkulation pro Monat</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Basis-Vollpension:</strong> 200-600€</li>
                <li><strong>Hufschmied (anteilig):</strong> 40-100€</li>
                <li><strong>Tierarzt (Basis, anteilig):</strong> 30-80€</li>
                <li><strong>Versicherung:</strong> 10-30€</li>
                <li><strong>Ausrüstung/Zubehör:</strong> 30-100€</li>
                <li className="pt-2 border-t border-amber-200">
                  <strong>Summe:</strong> 310-910€/Monat (Durchschnitt: 500-700€)
                </li>
              </ul>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                <strong>Notfall-Budget:</strong> Zusätzlich sollten Sie ein Notfall-Budget von mindestens
                5.000€ einplanen. Koliken, Lahmheiten oder Verletzungen können schnell mehrere tausend Euro kosten.
                Eine OP-Versicherung (30-80€/Monat) kann hier sinnvoll sein.
              </p>
            </div>
          </section>

          {/* Section 3: Versteckte Kosten */}
          <section id="versteckte-kosten" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Versteckte Kosten, die oft vergessen werden
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                Neben den offensichtlichen Kosten gibt es zahlreiche Ausgaben, die Pferdebesitzer oft unterschätzen
                oder vergessen. Diese können die monatlichen Gesamtkosten erheblich in die Höhe treiben.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Oft vergessene Kostenpunkte:</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Zusätzliches Futter & Ergänzungen</h4>
                  <p className="text-gray-700 mb-1"><strong>50-150€/Monat</strong></p>
                  <p className="text-gray-600 text-sm">
                    Mineralfutter, Spezialfutter für ältere Pferde, Zusatzfutter bei hoher Belastung
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Ausrüstung & Verschleiß</h4>
                  <p className="text-gray-700 mb-1"><strong>50-200€/Monat (anteilig)</strong></p>
                  <p className="text-gray-600 text-sm">
                    Sattel (1.500-4.000€), Trense (200-800€), Decken (100-300€), Halfter, Putzzeug,
                    Ersatz bei Verschleiß
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Reitunterricht & Beritt</h4>
                  <p className="text-gray-700 mb-1"><strong>100-400€/Monat</strong></p>
                  <p className="text-gray-600 text-sm">
                    Regelmäßiger Unterricht (40-80€/Stunde), Beritt bei Problemen oder Urlaubsvertretung
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Turnier- & Freizeitkosten</h4>
                  <p className="text-gray-700 mb-1"><strong>50-300€/Monat</strong></p>
                  <p className="text-gray-600 text-sm">
                    Nenngelder (30-100€/Turnier), Transportkosten, Übernachtungen, Ausritte
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Physiotherapie & Osteopathie</h4>
                  <p className="text-gray-700 mb-1"><strong>40-120€/Monat (anteilig)</strong></p>
                  <p className="text-gray-600 text-sm">
                    Regelmäßige Checks 2-4x pro Jahr (80-150€/Behandlung) für Gesunderhaltung
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Fahrtkosten zum Stall</h4>
                  <p className="text-gray-700 mb-1"><strong>50-200€/Monat</strong></p>
                  <p className="text-gray-600 text-sm">
                    Sprit, Abnutzung, bei 20 km Entfernung und täglichem Besuch
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <p className="text-lg font-bold text-gray-900">
                  Realistische Gesamtkosten pro Monat: <span className="text-primary-600">600-1.200€</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  (Basiskosten 400-800€ + versteckte Kosten 200-400€)
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Regionale Preisunterschiede */}
          <section id="regional" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Regionale Preisunterschiede in Bayern
            </h2>

            <div className="prose prose-lg max-w-none mb-10">
              <p className="text-gray-700 leading-relaxed">
                Die Kosten für Pferdehaltung variieren stark je nach Region. In Ballungsräumen wie München
                sind sowohl Kaufpreise als auch Unterhaltskosten deutlich höher als im ländlichen Raum.
                Hier ein Überblick über Bayern:
              </p>
            </div>

            {/* Regional Bayern Cards */}
            <div className="space-y-6 mb-10">
              {regionalBayernRegions.map((region, index) => (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{region.title}</h4>
                  <p className="text-gray-700">{region.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Spar-Tipp</h4>
              <p className="text-gray-700">
                Suchen Sie Ställe 30-50 km außerhalb von Großstädten – Sie sparen bis zu 30% der Stallmiete
                ohne Qualitätsverlust. In ländlichen Regionen sind auch die Kaufpreise für Pferde oft günstiger.
              </p>
            </div>
          </section>

          {/* Section 5: Was ist mein Pferd wert? */}
          <section id="bewertung" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Was ist mein Pferd wert? Professionelle Bewertung nutzen
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                Ob Sie ein Pferd kaufen oder verkaufen möchten – eine realistische Werteinschätzung ist
                entscheidend. Der Wert eines Pferdes hängt von vielen Faktoren ab:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Alter:</strong> 5-10 Jahre sind meist am wertvollsten</li>
                <li><strong>Ausbildungsstand:</strong> Reitbarkeit, Dressur-/Springniveau, Turniererfahrung</li>
                <li><strong>Gesundheitszustand:</strong> Röntgenklasse, chronische Erkrankungen</li>
                <li><strong>Rasse & Abstammung:</strong> Zuchtlinie, Papiere, bekannte Vorfahren</li>
                <li><strong>Charakter:</strong> Nervenstärke, Umgänglichkeit, Anfängertauglichkeit</li>
                <li><strong>Turniererfolge:</strong> Platzierungen steigern den Wert erheblich</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8">
              <h3 className="text-2xl font-bold mb-4">
                AI-gestützte Pferdebewertung in 3 Minuten
              </h3>
              <p className="text-primary-50 mb-6 leading-relaxed">
                Nutzen Sie unsere AI-Technologie für eine professionelle Werteinschätzung Ihres Pferdes.
                Basierend auf aktuellen Marktdaten, Rasse, Alter, Ausbildung und Gesundheitszustand.
              </p>
              <a
                href="/bewertung"
                className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-lg
                         hover:bg-gray-100 transition-colors shadow-lg"
              >
                Jetzt Pferd bewerten
              </a>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                <strong>Für Verkäufer:</strong> Eine zu hohe Preisvorstellung führt zu monatelanger Verkaufsdauer
                und sinkender Attraktivität. Ein realistischer Preis verkauft sich schneller.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Für Käufer:</strong> Eine Bewertung schützt vor Überzahlung und hilft bei der
                Verhandlung. Vergleichen Sie den Kaufpreis immer mit ähnlichen Pferden am Markt.
              </p>
            </div>
          </section>

          {/* Section 6: Pferdekauf-Checkliste */}
          <section id="kauftipps" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pferdekauf-Checkliste: Darauf sollten Sie achten
            </h2>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">
                Ein Pferdekauf ist eine langfristige Investition – nicht nur finanziell, sondern auch emotional.
                Mit dieser Checkliste vermeiden Sie teure Fehler:
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Vor dem Kauf:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Budget realistisch kalkulieren</h4>
                    <p className="text-gray-600 text-sm">
                      Kaufpreis + 6 Monate Unterhaltskosten als Reserve (mind. 8.000-15.000€ gesamt)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Anforderungsprofil definieren</h4>
                    <p className="text-gray-600 text-sm">
                      Verwendungszweck, gewünschtes Alter, Rasse, Ausbildungsstand, Charakter
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Stallplatz sichern</h4>
                    <p className="text-gray-600 text-sm">
                      Stallplatz reservieren BEVOR Sie ein Pferd kaufen – Wartelisten können lang sein
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Versicherung abschließen</h4>
                    <p className="text-gray-600 text-sm">
                      Pferdehaftpflicht ist PFLICHT (ab 20€/Monat), OP-Versicherung empfohlen
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-6 mt-10">Beim Kauf:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Mehrere Probereiten vereinbaren</h4>
                    <p className="text-gray-600 text-sm">
                      Mind. 2-3 Probereiten zu verschiedenen Tageszeiten, idealerweise auch ausreiten
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">AKU durchführen lassen</h4>
                    <p className="text-gray-600 text-sm">
                      Kleine AKU (200-400€) für Freizeitpferde, große AKU (800-1.500€) bei höheren Kaufpreisen
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Kaufvertrag schriftlich abschließen</h4>
                    <p className="text-gray-600 text-sm">
                      Alle Absprachen schriftlich festhalten, inkl. Rückgaberecht bei schlechter AKU
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Erfahrene Person mitnehmen</h4>
                    <p className="text-gray-600 text-sm">
                      Reitlehrer, Trainer oder erfahrener Pferdebesitzer sollte beim Kauf dabei sein
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Mehr Details und eine komplette Checkliste finden Sie in unserem{' '}
                <Link href="/pferde-ratgeber/pferd-kaufen" className="text-primary-600 hover:text-primary-700">
                  Ratgeber: Pferd kaufen
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Section 7: FAQ */}
          <section id="faq" className="mb-20 scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Häufig gestellte Fragen
            </h2>
            <FAQ faqs={wasKostetPferdFaqItems} />
          </section>

          {/* Section 8: Related Articles */}
          <section id="related" className="mb-20 scroll-mt-24">
            <RatgeberRelatedArticles
              title="Weiterführende Artikel"
              articles={wasKostetPferdRelatedArticles}
            />
          </section>
        </article>

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'Professionelle Pferdebewertung'
          }}
          title="Wie viel ist Ihr Pferd wert?"
          description="Nutzen Sie unsere AI-gestützte Pferdebewertung für eine professionelle Werteinschätzung in nur 3 Minuten."
          ctaLabel="Jetzt Pferd bewerten"
          ctaHref="/bewertung"
        />
      </main>
    </>
  )
}
