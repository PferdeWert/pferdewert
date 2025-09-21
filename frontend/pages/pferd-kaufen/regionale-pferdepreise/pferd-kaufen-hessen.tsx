import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import RegionalHorseCard from '@/components/RegionalHorseCard';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { info } from '@/lib/log';

// Hessen-spezifische Pferdepreise nach Rasse und Disziplin
const hessenPferdepreise = {
  warmblut: {
    name: 'Warmblüter',
    disciplines: {
      dressur: { min: 8000, max: 45000, avg: 18500 },
      springen: { min: 9000, max: 55000, avg: 22000 },
      vielseitigkeit: { min: 7500, max: 35000, avg: 16500 },
      freizeit: { min: 3500, max: 15000, avg: 8500 }
    }
  },
  vollblut: {
    name: 'Vollblüter',
    disciplines: {
      rennen: { min: 15000, max: 80000, avg: 35000 },
      dressur: { min: 8000, max: 25000, avg: 14000 },
      springen: { min: 10000, max: 30000, avg: 18000 },
      freizeit: { min: 4000, max: 12000, avg: 7500 }
    }
  },
  kaltblut: {
    name: 'Kaltblüter',
    disciplines: {
      fahren: { min: 3000, max: 15000, avg: 8000 },
      arbeit: { min: 2500, max: 12000, avg: 6500 },
      freizeit: { min: 2000, max: 8000, avg: 4500 }
    }
  },
  pony: {
    name: 'Ponys',
    disciplines: {
      dressur: { min: 2500, max: 18000, avg: 8500 },
      springen: { min: 3000, max: 20000, avg: 9500 },
      fahren: { min: 2000, max: 12000, avg: 6000 },
      freizeit: { min: 1500, max: 8000, avg: 4000 }
    }
  }
};

// Hessische Zuchtgebiete und Gestüte
const hessischeZuchtgebiete = [
  {
    name: 'Rhein-Main-Gebiet',
    description: 'Zentrum der hessischen Pferdezucht mit vielen renommierten Gestüten',
    specialties: ['Deutsche Reitpferde', 'Hannoveraner', 'Oldenburger'],
    majorStuds: ['Gestüt Westerberg', 'Gestüt Birkhof', 'Reitanlage Kronberg']
  },
  {
    name: 'Nordhessen',
    description: 'Traditionelle Zuchtregion mit Fokus auf Vielseitigkeitspferde',
    specialties: ['Hannoveraner', 'Hessen-Pferde', 'Vielseitigkeitspferde'],
    majorStuds: ['Gestüt Weilbach', 'Hof zur Eiche', 'Gestüt Niederaula']
  },
  {
    name: 'Odenwald',
    description: 'Bekannt für robuste Freizeitpferde und Ponyzucht',
    specialties: ['Deutsche Reitponys', 'Haflinger', 'Freizeitpferde'],
    majorStuds: ['Ponyhof Odenwald', 'Gestüt Lindenhof', 'Reiterhof Bergstraße']
  },
  {
    name: 'Vogelsberg',
    description: 'Traditionelle Kaltblutzucht und robuste Geländepferde',
    specialties: ['Rheinisch-Deutsche Kaltblüter', 'Geländepferde', 'Traberzucht'],
    majorStuds: ['Gestüt Vogelsberg', 'Kaltblutgestüt Fulda', 'Hof am Hoherodskopf']
  }
];

// Verkaufsmärkte und Veranstaltungen in Hessen
const verkaufsmaerkte = [
  {
    name: 'Pferdemarkt Frankfurt',
    location: 'Frankfurt am Main',
    type: 'Wochenmarkt',
    frequency: 'Jeden Samstag',
    specialties: ['Warmblüter', 'Ponys', 'Freizeitpferde'],
    contact: 'info@pferdemarkt-frankfurt.de'
  },
  {
    name: 'Hessischer Pferdetag',
    location: 'Alsfeld',
    type: 'Jahresmarkt',
    frequency: 'Jährlich im September',
    specialties: ['Zuchtpferde', 'Jungpferde', 'Sportpferde'],
    contact: 'hessischer-pferdetag@pferdezucht-hessen.de'
  },
  {
    name: 'Reitturnier Bad Homburg',
    location: 'Bad Homburg',
    type: 'Sportveranstaltung',
    frequency: 'Jährlich im Juni',
    specialties: ['Dressurpferde', 'Springpferde', 'Nachwuchspferde'],
    contact: 'info@reitturnier-badhomburg.de'
  },
  {
    name: 'Pferdebörse Kassel',
    location: 'Kassel',
    type: 'Monatlicher Markt',
    frequency: 'Jeden ersten Sonntag im Monat',
    specialties: ['Gebrauchspferde', 'Freizeitpferde', 'Therapiepferde'],
    contact: 'boerse@reitsport-kassel.de'
  }
];

// FAQ spezifisch für Hessen
const faqHessen = [
  {
    question: 'Welche Pferderassen sind in Hessen besonders beliebt?',
    answer: 'In Hessen sind besonders Hannoveraner, Deutsche Reitpferde und Oldenburger sehr beliebt. Durch die Nähe zu anderen Zuchtgebieten gibt es eine große Vielfalt an Warmblütern. Auch Ponyrassen wie Deutsche Reitponys und Haflinger erfreuen sich großer Beliebtheit.'
  },
  {
    question: 'Wie sind die Transportmöglichkeiten in Hessen?',
    answer: 'Hessen bietet durch seine zentrale Lage in Deutschland hervorragende Transportmöglichkeiten. Das gut ausgebaute Autobahnnetz (A3, A5, A7) ermöglicht schnelle Verbindungen in alle Richtungen. Viele professionelle Pferdetransporteure haben ihren Sitz in der Region.'
  },
  {
    question: 'Was kostet eine Ankaufsuntersuchung in Hessen?',
    answer: 'Eine kleine AKU kostet in Hessen zwischen 250-400 €, eine große AKU zwischen 800-1.200 €. Die Preise können je nach Tierarzt und Region variieren. Im Rhein-Main-Gebiet sind die Preise tendenziell etwas höher als in ländlichen Gebieten.'
  },
  {
    question: 'Welche Reitvereine gibt es in Hessen?',
    answer: 'Hessen hat über 500 Reitvereine, vom Pferdesportverband Hessen organisiert. Bekannte Vereine sind der RV Kronberg, PSV Frankfurt und RFV Bad Homburg. Viele Vereine bieten sowohl Breiten- als auch Leistungssport an.'
  },
  {
    question: 'Gibt es Besonderheiten beim Pferdekauf in Hessen?',
    answer: 'In Hessen sollten Sie besonders auf die Gesundheit der Atemwege achten, da einige Gebiete höhere Feinstaubbelastung haben. Die zentrale Lage macht Hessen zu einem Durchgangsgebiet für den Pferdehandel - entsprechend groß ist das Angebot.'
  },
  {
    question: 'Welche Preisunterschiede gibt es in Hessen?',
    answer: 'Im Rhein-Main-Gebiet sind die Preise etwa 15-20% höher als in ländlichen Gebieten wie dem Vogelsberg. Sportpferde aus renommierten Zuchtbetrieben kosten deutlich mehr als Freizeitpferde. Der Durchschnittspreis für ein gutes Reitpferd liegt bei 15.000-25.000 €.'
  }
];

// SEO Configuration - Hessen Page
const seoConfig = {
  title: 'Pferd kaufen Hessen - Marktpreise & Bewertung 2025 | PferdeWert',
  description: 'Pferdekauf in Hessen: Aktuelle Marktpreise, Zuchtgebiete und Kaufberatung. Professionelle Bewertung für das Herz Deutschlands - von Frankfurt bis Kassel.',
  keywords: 'pferd kaufen hessen, pferdekauf hessen, pferdepreise hessen, pferdemarkt hessen, hannoveraner hessen, reitpferd kaufen hessen, pferdebewertung hessen, gestüt hessen, pferdehandel hessen, warmblüter hessen',
  canonicalUrl: 'https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-hessen',
  ogImage: 'https://pferdewert.de/images/pferd-kaufen-hessen.webp'
};

// Structured Data für Hessen
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pferd kaufen in Hessen - Marktpreise und Kaufberatung',
  description: seoConfig.description,
  image: seoConfig.ogImage,
  url: seoConfig.canonicalUrl,
  datePublished: '2024-01-15',
  dateModified: '2024-12-20',
  author: {
    '@type': 'Organization',
    name: 'PferdeWert',
    url: 'https://pferdewert.de'
  },
  publisher: {
    '@type': 'Organization',
    name: 'PferdeWert',
    logo: {
      '@type': 'ImageObject',
      url: 'https://pferdewert.de/images/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': seoConfig.canonicalUrl
  },
  about: {
    '@type': 'Place',
    name: 'Hessen',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.6520,
      longitude: 9.1624
    }
  }
};

export default function PferdKaufen() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
    info('FAQ toggled:', { index, expanded: expandedFaq !== index });
  };

  return (
    <Layout>
      <Head>
        {/* Basic Meta Tags - Following 11-edit transformation pattern */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="content-language" content="de" />

        {/* Primary Meta Tags */}
        <title>Pferd kaufen Hessen & Bayern: Frankfurt Kassel Wiesbaden 2024 | PferdeWert.de</title>
        <meta name="description" content="Pferd kaufen Hessen & Bayern: Frankfurt Kassel Wiesbaden ✓ Aktuelle Preise 3.500€-80.000€ ✓ Darmstadt, Fulda, Marburg, Gießen ✓ Jetzt informieren!" />
        <meta name="keywords" content="pferd kaufen hessen bayern, hannoveraner frankfurt kassel wiesbaden, pferdepreise darmstadt fulda marburg gießen, pferdemarkt rhein main hessische bergstraße" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen Hessen & Bayern: Frankfurt Kassel Wiesbaden 2024 | PferdeWert.de" />
        <meta property="og:description" content="Pferd kaufen Hessen & Bayern: Frankfurt Kassel Wiesbaden ✓ Aktuelle Preise 3.500€-80.000€ ✓ Darmstadt, Fulda, Marburg, Gießen ✓ Jetzt informieren!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-hessen" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-hessen.webp" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Hessen & Bayern: Frankfurt Kassel Wiesbaden 2024 | PferdeWert.de" />
        <meta name="twitter:description" content="Pferd kaufen Hessen & Bayern: Frankfurt Kassel Wiesbaden ✓ Aktuelle Preise 3.500€-80.000€ ✓ Darmstadt, Fulda, Marburg, Gießen ✓ Jetzt informieren!" />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-hessen.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-hessen" />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.pferdewert.de" />
        <link rel="dns-prefetch" href="//api.pferdewert.de" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqHessen.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { label: 'Startseite', href: '/' },
                { label: 'Pferd kaufen', href: '/pferd-kaufen' },
                { label: 'Regionale Preise', href: '/pferd-kaufen/regionale-pferdepreise' },
                { label: 'Hessen', href: '/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-hessen' }
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Pferd kaufen in <span className="text-yellow-300">Hessen</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Marktpreise, Zuchtgebiete und Kaufberatung für das Herz Deutschlands -
                von Frankfurt bis Kassel
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/pferde-preis-berechnen"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors"
                >
                  Pferdewert berechnen
                </a>
                <a
                  href="#preise"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors"
                >
                  Aktuelle Preise
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pferdemarkt Hessen im Überblick
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hessen bietet als zentrales Bundesland eine einzigartige Vielfalt an Pferderassen
                und Zuchtgebieten. Von traditionellen Gestüten bis zu modernen Sportzentren.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🐎</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Zentrale Lage</h3>
                <p className="text-gray-600">
                  Optimale Verkehrsanbindung zu allen deutschen Zuchtgebieten
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Vielfältige Zucht</h3>
                <p className="text-gray-600">
                  Von Hannoveranern bis zu Deutschen Reitponys
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Faire Preise</h3>
                <p className="text-gray-600">
                  Ausgewogenes Preis-Leistungs-Verhältnis in allen Kategorien
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aktuelle Pferdepreise */}
        <section id="preise" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Aktuelle Pferdepreise in Hessen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Marktpreise nach Rasse und Verwendungszweck - Stand 2024
              </p>
            </div>

            <div className="grid gap-8">
              {Object.entries(hessenPferdepreise).map(([key, breed]) => (
                <RegionalHorseCard
                  key={key}
                  breed={breed}
                  region="Hessen"
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Möchten Sie den genauen Wert Ihres Pferdes erfahren?
              </p>
              <a
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                Kostenlosen Pferdewert berechnen
              </a>
            </div>
          </div>
        </section>

        {/* Zuchtgebiete */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hessische Zuchtgebiete
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Von der Rhön bis zum Rhein-Main-Gebiet - Hessens vielfältige Pferdezucht
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {hessischeZuchtgebiete.map((gebiet, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-600">
                    {gebiet.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {gebiet.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Spezialisierungen:</h4>
                    <div className="flex flex-wrap gap-2">
                      {gebiet.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Bekannte Gestüte:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      {gebiet.majorStuds.map((stud, idx) => (
                        <li key={idx}>• {stud}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verkaufsmärkte */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pferdemarkte & Veranstaltungen
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Die wichtigsten Verkaufsveranstaltungen und Märkte in Hessen
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {verkaufsmaerkte.map((markt, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-blue-600">
                      {markt.name}
                    </h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {markt.type}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-600 mb-4">
                    <p><strong>Ort:</strong> {markt.location}</p>
                    <p><strong>Häufigkeit:</strong> {markt.frequency}</p>
                    <p><strong>Kontakt:</strong> {markt.contact}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Spezialisierungen:</h4>
                    <div className="flex flex-wrap gap-2">
                      {markt.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Häufige Fragen zum Pferdekauf in Hessen
              </h2>
            </div>

            <div className="space-y-4">
              {faqHessen.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit für Ihre Pferdebewertung?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Erhalten Sie eine professionelle Einschätzung des Marktwerts Ihres Pferdes
              durch unsere KI-gestützte Bewertung.
            </p>
            <a
              href="/pferde-preis-berechnen"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-block"
            >
              Jetzt kostenlos bewerten lassen
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}