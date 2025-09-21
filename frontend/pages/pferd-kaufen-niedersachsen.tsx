import { useState } from 'react';
import Head from 'next/head';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { info } from '@/lib/log';

interface RegionalPriceData {
  breed: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  description: string;
}

interface BreedingRegion {
  name: string;
  characteristics: string[];
  specialties: string;
}

interface SalesMarket {
  name: string;
  location: string;
  type: string;
  frequency: string;
  specialties: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

const niedersachsenPriceData: RegionalPriceData[] = [
  {
    breed: "Hannoveraner",
    category: "Dressur (L-Niveau)",
    minPrice: 15000,
    maxPrice: 35000,
    avgPrice: 25000,
    description: "Hannoveraner Dressurpferde mit solider L-Ausbildung"
  },
  {
    breed: "Hannoveraner",
    category: "Springen (L-Niveau)",
    minPrice: 18000,
    maxPrice: 40000,
    avgPrice: 28000,
    description: "Sprungbetonte Hannoveraner mit Turniererfahrung"
  },
  {
    breed: "Oldenburger",
    category: "Dressur (A-L)",
    minPrice: 12000,
    maxPrice: 28000,
    avgPrice: 20000,
    description: "Oldenburger mit Dressurveranlagung"
  },
  {
    breed: "Trakehner",
    category: "Vielseitigkeit",
    minPrice: 10000,
    maxPrice: 25000,
    avgPrice: 17500,
    description: "Vielseitige Trakehner für Sport und Freizeit"
  },
  {
    breed: "Deutsches Reitpferd",
    category: "Freizeitpferd",
    minPrice: 3000,
    maxPrice: 12000,
    avgPrice: 7500,
    description: "Zuverlässige Freizeitpferde verschiedener Rassen"
  },
  {
    breed: "Warmblut Mix",
    category: "Jungpferd (3-5 Jahre)",
    minPrice: 5000,
    maxPrice: 18000,
    avgPrice: 11500,
    description: "Junge Warmblüter mit Entwicklungspotential"
  }
];

const breedingRegions: BreedingRegion[] = [
  {
    name: "Hannover",
    characteristics: ["Edles Exterieur", "Gute Grundgangarten", "Sportliche Veranlagung"],
    specialties: "Weltbekannte Hannoveraner Zucht mit Fokus auf Dressur und Springen"
  },
  {
    name: "Oldenburg",
    characteristics: ["Großrahmig", "Bewegungsstark", "Leistungsbereit"],
    specialties: "Moderne Sportpferdezucht mit internationaler Anerkennung"
  },
  {
    name: "Osnabrück-Emsland",
    characteristics: ["Vielseitig", "Charakterstark", "Robuste Konstitution"],
    specialties: "Traditionelle Pferdezucht mit Fokus auf Vielseitigkeit"
  },
  {
    name: "Lüneburg",
    characteristics: ["Elegant", "Gangstark", "Nervenstark"],
    specialties: "Heide-Region bekannt für charakterstarke Warmblüter"
  }
];

const salesMarkets: SalesMarket[] = [
  {
    name: "Verdener Auktion",
    location: "Verden (Aller)",
    type: "Auktionshaus",
    frequency: "Monatlich",
    specialties: ["Hannoveraner", "Dressurpferde", "Springpferde", "Fohlen"]
  },
  {
    name: "Oldenburger Pferdemarkt",
    location: "Oldenburg",
    type: "Zuchtverband",
    frequency: "Mehrmals jährlich",
    specialties: ["Oldenburger", "Sportpferde", "Zuchtpferde"]
  },
  {
    name: "Reitanlage Eschede",
    location: "Eschede",
    type: "Privatverkauf",
    frequency: "Kontinuierlich",
    specialties: ["Freizeitpferde", "Schulpferde", "Therapiepferde"]
  },
  {
    name: "Gestüt Celle",
    location: "Celle",
    type: "Staatliches Gestüt",
    frequency: "Jährliche Auktion",
    specialties: ["Hannoveraner Hengste", "Zuchtmaterial", "Landgestüt-Qualität"]
  }
];

const faqData: FAQItem[] = [
  {
    question: "Was kostet ein Pferd in Niedersachsen durchschnittlich?",
    answer: "Die Preise variieren stark je nach Rasse, Ausbildung und Verwendungszweck. Freizeitpferde kosten zwischen 3.000-12.000€, während gut ausgebildete Sportpferde 15.000-40.000€ kosten können. Hannoveraner und Oldenburger liegen preislich meist höher."
  },
  {
    question: "Welche Pferderassen sind in Niedersachsen besonders beliebt?",
    answer: "Niedersachsen ist die Heimat der Hannoveraner und Oldenburger Zucht. Diese Warmblut-Rassen dominieren den Markt, gefolgt von Trakehner und anderen deutschen Warmblut-Linien. Für den Freizeitbereich sind auch robuste Mischungen sehr gefragt."
  },
  {
    question: "Wo kann ich in Niedersachsen Pferde kaufen?",
    answer: "Die bekanntesten Verkaufsstellen sind die Verdener Auktion für Hannoveraner, der Oldenburger Pferdemarkt, sowie zahlreiche private Züchter und Reitanlagen. Das Gestüt Celle bietet jährlich hochwertige Zuchthengste an."
  },
  {
    question: "Wie erkenne ich ein faires Preis-Leistungs-Verhältnis?",
    answer: "Lassen Sie das Pferd professionell bewerten und vergleichen Sie Preise ähnlicher Pferde in der Region. Berücksichtigen Sie Ausbildungsstand, Turniererfolge, Abstammung und Gesundheitszustand. Eine AKU ist bei höherpreisigen Pferden empfehlenswert."
  },
  {
    question: "Welche Besonderheiten hat der Pferdemarkt in Niedersachsen?",
    answer: "Niedersachsen gilt als Zentrum der deutschen Warmblut-Zucht. Die Region bietet höchste Qualitätsstandards, etablierte Zuchtverbände und eine große Auswahl. Preise können aufgrund der Qualität über dem Bundesdurchschnitt liegen."
  },
  {
    question: "Wann ist die beste Zeit für den Pferdekauf in Niedersachsen?",
    answer: "Für Auktionen sind Frühjahr und Herbst optimal. Privatkäufe sind ganzjährig möglich, wobei im Winter oft bessere Verhandlungsmöglichkeiten bestehen. Jungpferde werden traditionell im Frühjahr nach der Aufzucht angeboten."
  }
];

export default function PferdKaufenNiedersachsen() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
    info('FAQ toggled:', index);
  };

  const handlePriceCheck = () => {
    info('Price check button clicked - Niedersachsen page');
    // Analytics tracking would go here
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-kaufen-niedersachsen",
        "url": "https://pferdewert.de/pferd-kaufen-niedersachsen",
        "name": "Pferd kaufen Niedersachsen - Preisanalyse & Beratung | PferdeWert",
        "description": "Pferdekauf in Niedersachsen: Professionelle Preiseinschätzung und Marktanalyse. Finden Sie das richtige Pferd zum fairen Preis.",
        "inLanguage": "de-DE",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://pferdewert.de",
          "name": "PferdeWert.de",
          "description": "Deutschlands führende Plattform für KI-gestützte Pferdebewertung",
          "url": "https://pferdewert.de"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://pferdewert.de"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Pferd kaufen Niedersachsen",
              "item": "https://pferdewert.de/pferd-kaufen-niedersachsen"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqData.map((faq, index) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "LocalBusiness",
        "name": "PferdeWert.de - Pferdebewertung Niedersachsen",
        "description": "Professionelle Pferdebewertung und Marktanalyse für Niedersachsen",
        "url": "https://pferdewert.de/pferd-kaufen-niedersachsen",
        "areaServed": {
          "@type": "State",
          "name": "Niedersachsen"
        },
        "serviceType": "Pferdebewertung und Marktanalyse",
        "priceRange": "€14.90"
      },
      {
        "@type": "Product",
        "name": "KI-Pferdebewertung Niedersachsen",
        "description": "Professionelle Bewertung von Pferden in Niedersachsen mit KI-Unterstützung",
        "brand": {
          "@type": "Brand",
          "name": "PferdeWert.de"
        },
        "offers": {
          "@type": "Offer",
          "price": "14.90",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "validFrom": "2025-01-01"
        }
      }
    ]
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags - Following 11-edit transformation pattern */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="content-language" content="de" />

        {/* Primary Meta Tags */}
        <title>Pferd kaufen Niedersachsen: KI-Bewertung & Preisanalyse | PferdeWert</title>
        <meta
          name="description"
          content="Pferd kaufen Niedersachsen & Bayern: KI-gestützte Preisanalyse für Hannoveraner, Oldenburger & Warmblüter. Gestüt Celle & Verdener Auktion. Jetzt starten!"
        />
        <meta
          name="keywords"
          content="pferd kaufen niedersachsen, hannoveraner kaufen, oldenburger pferd, pferdekauf niedersachsen, pferde preise niedersachsen, gestüt celle, verdener auktion"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen Niedersachsen: KI-Bewertung & Preisanalyse | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen Niedersachsen & Bayern: KI-gestützte Preisanalyse für Hannoveraner, Oldenburger & Warmblüter. Gestüt Celle & Verdener Auktion. Jetzt starten!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen-niedersachsen" />
        <meta property="og:image" content="https://pferdewert.de/images/og-pferd-kaufen-niedersachsen.jpg" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Niedersachsen: KI-Bewertung & Preisanalyse | PferdeWert" />
        <meta name="twitter:description" content="Pferd kaufen Niedersachsen & Bayern: KI-gestützte Preisanalyse für Hannoveraner, Oldenburger & Warmblüter. Gestüt Celle & Verdener Auktion. Jetzt starten!" />
        <meta name="twitter:image" content="https://pferdewert.de/images/og-pferd-kaufen-niedersachsen.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen-niedersachsen" />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.pferdewert.de" />
        <link rel="dns-prefetch" href="//api.pferdewert.de" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white shadow-sm border-b" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-3 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Pferd kaufen Niedersachsen</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pferd kaufen in Niedersachsen
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Professionelle Preisanalyse und Marktberatung für Ihren Pferdekauf in Niedersachsen
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/was-ist-mein-pferd-wert"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                  onClick={handlePriceCheck}
                >
                  Jetzt Pferd bewerten lassen
                </Link>
                <Link
                  href="/beispiel-analyse"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  Beispiel-Bewertung ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Pricing Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Aktuelle Pferde-Preise in Niedersachsen
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Marktpreise basierend auf aktuellen Verkaufsdaten aus Niedersachsen.
                Hannoveraner und Oldenburger dominieren den regionalen Markt.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Rasse</th>
                    <th className="px-6 py-4 text-left font-semibold">Kategorie</th>
                    <th className="px-6 py-4 text-right font-semibold">Min. Preis</th>
                    <th className="px-6 py-4 text-right font-semibold">Max. Preis</th>
                    <th className="px-6 py-4 text-right font-semibold">Ø Preis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {niedersachsenPriceData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.breed}</td>
                      <td className="px-6 py-4 text-gray-700">{item.category}</td>
                      <td className="px-6 py-4 text-right text-gray-900">{item.minPrice.toLocaleString()}€</td>
                      <td className="px-6 py-4 text-right text-gray-900">{item.maxPrice.toLocaleString()}€</td>
                      <td className="px-6 py-4 text-right font-semibold text-blue-600">{item.avgPrice.toLocaleString()}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-4">
                * Preise sind Richtwerte basierend auf Marktdaten aus 2024/2025
              </p>
              <Link
                href="/was-ist-mein-pferd-wert"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                onClick={handlePriceCheck}
              >
                Kostenlosen Preis-Check starten
              </Link>
            </div>
          </div>
        </section>

        {/* Breeding Regions */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Niedersächsische Zuchtregionen
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Niedersachsen ist das Herz der deutschen Warmblut-Zucht mit weltbekannten Zuchtverbänden
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {breedingRegions.map((region, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{region.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{region.specialties}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">Charakteristika:</h4>
                    <ul className="space-y-1">
                      {region.characteristics.map((char, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sales Markets */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Verkaufsmärkte in Niedersachsen
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Die wichtigsten Handelsplätze für Pferde in Niedersachsen
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {salesMarkets.map((market, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{market.name}</h3>
                      <p className="text-gray-600">{market.location}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {market.type}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{market.frequency}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Spezialitäten:</h4>
                    <div className="flex flex-wrap gap-2">
                      {market.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
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

        {/* FAQ Section */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Häufige Fragen zum Pferdekauf in Niedersachsen
              </h2>
              <p className="text-lg text-gray-600">
                Antworten auf die wichtigsten Fragen rund um den Pferdekauf in Niedersachsen
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openFAQ === index}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
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
            <h2 className="text-3xl font-bold mb-4">
              Professionelle Pferdebewertung für Niedersachsen
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Nutzen Sie unsere KI-gestützte Bewertung für eine faire Preiseinschätzung
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/was-ist-mein-pferd-wert"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                onClick={handlePriceCheck}
              >
                Pferd jetzt bewerten - nur 14,90€
              </Link>
              <Link
                href="/pferde-preis-berechnen"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-700 transition-colors inline-flex items-center justify-center"
              >
                Kostenloser Preis-Rechner
              </Link>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              ✓ Binnen 24h ✓ Detaillierter Bericht ✓ Marktvergleich inklusive
            </p>
          </div>
        </section>
      </div>
    </>
  );
}