import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRightIcon, MapPinIcon, TrendingUpIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Regional price data with market insights
const regionalData = [
  {
    region: 'Baden-Württemberg',
    slug: 'baden-wuerttemberg',
    avgPrice: '12.500',
    priceRange: '8.000 - 25.000',
    marketTrend: 'steigend',
    popularBreeds: ['Württemberger', 'Trakehner', 'Hannoveraner'],
    marketSize: 'groß',
    specialties: 'Dressurpferde, Vielseitigkeitspferde',
    keyFactors: ['Starke Reitkultur', 'Hohe Kaufkraft', 'Viele Turniere']
  },
  {
    region: 'Bayern',
    slug: 'bayern',
    avgPrice: '11.800',
    priceRange: '7.500 - 22.000',
    marketTrend: 'stabil',
    popularBreeds: ['Bayerisches Warmblut', 'Haflinger', 'Noriker'],
    marketSize: 'sehr groß',
    specialties: 'Freizeitpferde, Fahrsport',
    keyFactors: ['Tradition im Pferdesport', 'Ländliche Strukturen', 'Oktoberfest-Einfluss']
  },
  {
    region: 'Berlin',
    slug: 'berlin',
    avgPrice: '13.200',
    priceRange: '9.000 - 28.000',
    marketTrend: 'steigend',
    popularBreeds: ['Hannoveraner', 'Oldenburger', 'KWPN'],
    marketSize: 'mittel',
    specialties: 'Dressurpferde, Springpferde',
    keyFactors: ['Hohe Mieten', 'Begrenzte Stallplätze', 'Kaufkräftige Klientel']
  },
  {
    region: 'Brandenburg',
    slug: 'brandenburg',
    avgPrice: '9.200',
    priceRange: '6.000 - 18.000',
    marketTrend: 'stabil',
    popularBreeds: ['Brandenburger', 'Mecklenburger', 'Trakehner'],
    marketSize: 'groß',
    specialties: 'Zuchtpferde, Geländepferde',
    keyFactors: ['Traditionelle Pferdezucht', 'Günstige Stallkosten', 'Weitläufige Flächen']
  },
  {
    region: 'Bremen',
    slug: 'bremen',
    avgPrice: '12.800',
    priceRange: '8.500 - 24.000',
    marketTrend: 'stabil',
    popularBreeds: ['Hannoveraner', 'Oldenburger', 'Holsteiner'],
    marketSize: 'klein',
    specialties: 'Springpferde, Dressurpferde',
    keyFactors: ['Maritime Tradition', 'Hohe Lebenskosten', 'Kompakter Markt']
  },
  {
    region: 'Hamburg',
    slug: 'hamburg',
    avgPrice: '14.100',
    priceRange: '9.500 - 30.000',
    marketTrend: 'steigend',
    popularBreeds: ['Hannoveraner', 'Holsteiner', 'Oldenburger'],
    marketSize: 'mittel',
    specialties: 'Springpferde, Dressurpferde',
    keyFactors: ['Deutsches Derby', 'Hohe Kaufkraft', 'Traditionelle Reitkultur']
  },
  {
    region: 'Hessen',
    slug: 'hessen',
    avgPrice: '12.200',
    priceRange: '8.000 - 24.000',
    marketTrend: 'stabil',
    popularBreeds: ['Hessisches Warmblut', 'Hannoveraner', 'Trakehner'],
    marketSize: 'groß',
    specialties: 'Vielseitigkeitspferde, Dressurpferde',
    keyFactors: ['Zentrale Lage', 'Starke Wirtschaft', 'Viele Reitvereine']
  },
  {
    region: 'Mecklenburg-Vorpommern',
    slug: 'mecklenburg-vorpommern',
    avgPrice: '8.900',
    priceRange: '5.500 - 16.000',
    marketTrend: 'steigend',
    popularBreeds: ['Mecklenburger', 'Hannoveraner', 'Trakehner'],
    marketSize: 'groß',
    specialties: 'Zuchtpferde, Dressurpferde',
    keyFactors: ['Traditionelle Zucht', 'Günstige Preise', 'Weitläufige Gestüte']
  },
  {
    region: 'Niedersachsen',
    slug: 'niedersachsen',
    avgPrice: '11.600',
    priceRange: '7.000 - 22.000',
    marketTrend: 'stabil',
    popularBreeds: ['Hannoveraner', 'Oldenburger', 'Holsteiner'],
    marketSize: 'sehr groß',
    specialties: 'Alle Disziplinen',
    keyFactors: ['Pferdezentrum Deutschlands', 'Hannoveraner Zucht', 'Große Auswahl']
  },
  {
    region: 'Nordrhein-Westfalen',
    slug: 'nordrhein-westfalen',
    avgPrice: '12.900',
    priceRange: '8.500 - 25.000',
    marketTrend: 'stabil',
    popularBreeds: ['Rheinländer', 'Westfale', 'KWPN'],
    marketSize: 'sehr groß',
    specialties: 'Springpferde, Dressurpferde',
    keyFactors: ['Dichte Besiedlung', 'Viele Turniere', 'Starke Kaufkraft']
  },
  {
    region: 'Rheinland-Pfalz',
    slug: 'rheinland-pfalz',
    avgPrice: '11.400',
    priceRange: '7.500 - 21.000',
    marketTrend: 'stabil',
    popularBreeds: ['Rheinland-Pfalz-Saar', 'Trakehner', 'Hannoveraner'],
    marketSize: 'mittel',
    specialties: 'Freizeitpferde, Geländepferde',
    keyFactors: ['Ländliche Strukturen', 'Weinbauregion', 'Moderate Preise']
  },
  {
    region: 'Saarland',
    slug: 'saarland',
    avgPrice: '10.800',
    priceRange: '7.000 - 19.000',
    marketTrend: 'stabil',
    popularBreeds: ['Rheinland-Pfalz-Saar', 'Französisches Warmblut', 'Hannoveraner'],
    marketSize: 'klein',
    specialties: 'Freizeitpferde, Vielseitigkeitspferde',
    keyFactors: ['Grenzlage zu Frankreich', 'Kompakter Markt', 'Günstige Preise']
  },
  {
    region: 'Sachsen',
    slug: 'sachsen',
    avgPrice: '9.800',
    priceRange: '6.500 - 18.000',
    marketTrend: 'steigend',
    popularBreeds: ['Sachsen-Thüringer', 'Hannoveraner', 'Trakehner'],
    marketSize: 'mittel',
    specialties: 'Dressurpferde, Freizeitpferde',
    keyFactors: ['Aufstrebender Markt', 'Günstige Preise', 'Wachsende Nachfrage']
  },
  {
    region: 'Sachsen-Anhalt',
    slug: 'sachsen-anhalt',
    avgPrice: '9.200',
    priceRange: '6.000 - 17.000',
    marketTrend: 'steigend',
    popularBreeds: ['Sachsen-Anhaltiner', 'Hannoveraner', 'Trakehner'],
    marketSize: 'mittel',
    specialties: 'Zuchtpferde, Dressurpferde',
    keyFactors: ['Traditionelle Zucht', 'Günstige Stallkosten', 'Wachsender Markt']
  },
  {
    region: 'Schleswig-Holstein',
    slug: 'schleswig-holstein',
    avgPrice: '13.500',
    priceRange: '9.000 - 27.000',
    marketTrend: 'stabil',
    popularBreeds: ['Holsteiner', 'Hannoveraner', 'Oldenburger'],
    marketSize: 'groß',
    specialties: 'Springpferde, Dressurpferde',
    keyFactors: ['Holsteiner Zucht', 'Küstennähe', 'Traditioneller Pferdesport']
  },
  {
    region: 'Thüringen',
    slug: 'thueringen',
    avgPrice: '9.600',
    priceRange: '6.200 - 17.500',
    marketTrend: 'steigend',
    popularBreeds: ['Thüringer', 'Hannoveraner', 'Trakehner'],
    marketSize: 'mittel',
    specialties: 'Freizeitpferde, Dressurpferde',
    keyFactors: ['Aufstrebender Markt', 'Günstige Preise', 'Zentrale Lage']
  }
];

// Market insights and trends
const marketInsights = [
  {
    title: 'Regionale Preisunterschiede',
    description: 'Norddeutschland zeigt höhere Preise aufgrund etablierter Zuchttraditionen, während ostdeutsche Bundesländer günstigere Alternativen bieten.',
    icon: TrendingUpIcon
  },
  {
    title: 'Saisonale Schwankungen',
    description: 'Pferdepreise erreichen typischerweise im Frühjahr (März-Mai) und Herbst (September-Oktober) ihre Höchststände.',
    icon: MapPinIcon
  },
  {
    title: 'Rassenspezifische Märkte',
    description: 'Warmblüter dominieren in allen Regionen, aber lokale Rassen wie Haflinger in Bayern oder Holsteiner in Schleswig-Holstein haben regionale Schwerpunkte.',
    icon: StarIcon
  }
];

// FAQ data
const faqData = [
  {
    question: 'Warum sind Pferdepreise regional so unterschiedlich?',
    answer: 'Regionale Preisunterschiede entstehen durch verschiedene Faktoren: Lebenshaltungskosten, Stallmieten, lokale Zuchttraditionen, Nachfrage nach bestimmten Rassen und die allgemeine Kaufkraft in der Region. Norddeutsche Bundesländer mit etablierten Warmblut-Zuchtgebieten haben tendenziell höhere Preise.'
  },
  {
    question: 'In welcher Region finde ich die günstigsten Pferde?',
    answer: 'Die günstigsten Pferdepreise finden Sie typischerweise in ostdeutschen Bundesländern wie Mecklenburg-Vorpommern, Sachsen-Anhalt und Brandenburg. Hier liegen die Durchschnittspreise bei 8.900€ bis 9.800€, verglichen mit bis zu 14.100€ in Hamburg.'
  },
  {
    question: 'Welche Region eignet sich für Springpferde?',
    answer: 'Für Springpferde sind besonders Schleswig-Holstein (Holsteiner Zucht), Niedersachsen (Hannoveraner) und Nordrhein-Westfalen (Westfalen, KWPN) zu empfehlen. Diese Regionen haben eine lange Tradition in der Springpferdezucht und ein entsprechendes Angebot.'
  },
  {
    question: 'Wann ist die beste Zeit für den Pferdekauf?',
    answer: 'Regional variiert die beste Kaufzeit leicht, aber generell sind Winter (November-Februar) und Spätsommer die günstigsten Zeiten. Vermeiden Sie Frühjahr und Herbst, wenn die Nachfrage und damit die Preise steigen.'
  },
  {
    question: 'Wie unterscheiden sich die Zuchtgebiete?',
    answer: 'Niedersachsen ist das Zentrum der Hannoveraner Zucht, Schleswig-Holstein für Holsteiner bekannt, Bayern hat starke Haflinger-Traditionen, und die östlichen Bundesländer sind traditionelle Trakehner-Gebiete. Jede Region hat ihre spezialisierten Zuchtschwerpunkte.'
  }
];

export default function RegionalePferdepreise() {
  return (
    <>
      <Head>
        <title>Regionale Pferdepreise Deutschland 2024: Bundesländer-Vergleich | PferdeWert</title>
        <meta
          name="description"
          content="Aktuelle Pferdepreise nach Bundesländern ✓ Bayern, NRW, Niedersachsen & mehr ✓ Regionale Marktanalyse ✓ Günstige vs. teure Regionen ✓ Experteneinschätzungen für jeden Markt"
        />
        <meta name="keywords" content="pferdepreise deutschland, regionale pferdepreise, pferdemarkt bayern, pferdemarkt nrw, pferde kaufen bundesland, hannoveraner preise, holsteiner preise, pferdezucht deutschland" />
        <meta name="author" content="PferdeWert Experten-Team" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Regionale Pferdepreise Deutschland 2024: Bundesländer-Vergleich" />
        <meta property="og:description" content="Aktuelle Pferdepreise nach Bundesländern. Bayern, NRW, Niedersachsen & mehr im direkten Vergleich. Experteneinschätzungen für jeden regionalen Pferdemarkt." />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://pferdewert.de/images/regionale-pferdepreise-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="PferdeWert" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Regionale Pferdepreise Deutschland 2024: Bundesländer-Vergleich" />
        <meta name="twitter:description" content="Aktuelle Pferdepreise nach Bundesländern. Bayern, NRW, Niedersachsen & mehr im direkten Vergleich." />
        <meta name="twitter:image" content="https://pferdewert.de/images/regionale-pferdepreise-twitter.jpg" />
        <meta name="twitter:site" content="@pferdewert" />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="DE" />
        <meta name="geo.placename" content="Deutschland" />
        <meta name="language" content="de" />
        <meta name="coverage" content="Deutschland" />
        <meta name="distribution" content="Deutschland" />
        <meta name="rating" content="general" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // WebPage Schema
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "@id": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise",
                "url": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise",
                "name": "Regionale Pferdepreise Deutschland 2024: Bundesländer-Vergleich",
                "description": "Aktuelle Pferdepreise nach Bundesländern ✓ Bayern, NRW, Niedersachsen & mehr ✓ Regionale Marktanalyse ✓ Günstige vs. teure Regionen ✓ Experteneinschätzungen für jeden Markt",
                "inLanguage": "de-DE",
                "isPartOf": {
                  "@type": "WebSite",
                  "@id": "https://pferdewert.de",
                  "name": "PferdeWert",
                  "url": "https://pferdewert.de"
                },
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "item": {
                        "@id": "https://pferdewert.de",
                        "name": "PferdeWert"
                      }
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "item": {
                        "@id": "https://pferdewert.de/pferd-kaufen",
                        "name": "Pferd kaufen"
                      }
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "item": {
                        "@id": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise",
                        "name": "Regionale Pferdepreise"
                      }
                    }
                  ]
                }
              },
              // Article Schema
              {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Regionale Pferdepreise Deutschland 2024: Bundesländer-Vergleich",
                "description": "Aktuelle Pferdepreise nach Bundesländern ✓ Bayern, NRW, Niedersachsen & mehr ✓ Regionale Marktanalyse ✓ Günstige vs. teure Regionen ✓ Experteneinschätzungen für jeden Markt",
                "url": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise",
                "datePublished": "2024-01-15T00:00:00+01:00",
                "dateModified": "2024-12-20T00:00:00+01:00",
                "author": {
                  "@type": "Organization",
                  "name": "PferdeWert Experten-Team",
                  "url": "https://pferdewert.de"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "PferdeWert",
                  "url": "https://pferdewert.de",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://pferdewert.de/images/logo.png"
                  }
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise"
                },
                "articleSection": "Pferdemarkt",
                "keywords": "pferdepreise deutschland, regionale pferdepreise, pferdemarkt bayern, pferdemarkt nrw, pferde kaufen bundesland"
              },
              // FAQ Schema
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqData.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              },
              // Service Schema
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "Regionale Pferdemarkt-Analyse",
                "description": "Professionelle Analyse regionaler Pferdemärkte in Deutschland mit aktuellen Preisdaten und Markttrends",
                "provider": {
                  "@type": "Organization",
                  "name": "PferdeWert",
                  "url": "https://pferdewert.de"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "Deutschland"
                },
                "serviceType": "Marktanalyse",
                "category": "Pferdemarkt"
              }
            ])
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-green-600 hover:text-green-800 transition-colors">
                PferdeWert
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              <Link href="/pferd-kaufen" className="text-green-600 hover:text-green-800 transition-colors">
                Pferd kaufen
              </Link>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              <span className="text-gray-700 font-medium">Regionale Pferdepreise</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Regionale Pferdepreise Deutschland 2024
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-4xl mx-auto">
                Aktuelle Marktanalyse aller 16 Bundesländer - Von günstigen ostdeutschen Märkten bis zu Premium-Zuchtgebieten
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <MapPinIcon className="h-5 w-5 inline mr-2" />
                  16 Bundesländer
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <TrendingUpIcon className="h-5 w-5 inline mr-2" />
                  Aktuelle Marktdaten 2024
                </div>
                <div className="bg-white/20 px-4 py-2 rounded-full">
                  <StarIcon className="h-5 w-5 inline mr-2" />
                  Experteneinschätzungen
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Regionale Markteinblicke
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Verstehen Sie die wichtigsten Faktoren, die Pferdepreise in verschiedenen deutschen Regionen beeinflussen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {marketInsights.map((insight, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <insight.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>

          {/* Regional Price Overview */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Pferdepreise nach Bundesländern
            </h2>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {regionalData.map((region, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {region.region}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      region.marketTrend === 'steigend' ? 'bg-red-100 text-red-800' :
                      region.marketTrend === 'stabil' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {region.marketTrend}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Durchschnittspreis</p>
                      <p className="text-2xl font-bold text-green-600">{region.avgPrice}€</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Preisspanne</p>
                      <p className="font-medium text-gray-900">{region.priceRange}€</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Marktgröße</p>
                      <p className="font-medium text-gray-900 capitalize">{region.marketSize}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Spezialisierung</p>
                      <p className="text-sm text-gray-900">{region.specialties}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Beliebte Rassen</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {region.popularBreeds.slice(0, 2).map((breed, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {breed}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/pferd-kaufen/regionale-pferdepreise/${region.slug}`}
                    className="mt-4 block w-full bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Details ansehen
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Price Comparison Chart Info */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Preisvergleich der Regionen
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  <CheckCircleIcon className="h-6 w-6 inline mr-2" />
                  Günstigste Regionen
                </h3>
                <div className="space-y-3">
                  {regionalData
                    .sort((a, b) => parseInt(a.avgPrice.replace('.', '')) - parseInt(b.avgPrice.replace('.', '')))
                    .slice(0, 5)
                    .map((region, index) => (
                      <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <span className="font-medium">{region.region}</span>
                        <span className="text-green-600 font-bold">{region.avgPrice}€</span>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-700 mb-4">
                  <TrendingUpIcon className="h-6 w-6 inline mr-2" />
                  Teuerste Regionen
                </h3>
                <div className="space-y-3">
                  {regionalData
                    .sort((a, b) => parseInt(b.avgPrice.replace('.', '')) - parseInt(a.avgPrice.replace('.', '')))
                    .slice(0, 5)
                    .map((region, index) => (
                      <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                        <span className="font-medium">{region.region}</span>
                        <span className="text-red-600 font-bold">{region.avgPrice}€</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expert Tips */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Expertenempfehlungen für den regionalen Pferdekauf
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-700 mb-4">
                  Für Sparfüchse
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Ostdeutsche Bundesländer bieten das beste Preis-Leistungs-Verhältnis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Mecklenburg-Vorpommern und Brandenburg haben traditionell starke Zuchtlinien</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Wintermonate bieten zusätzliche Preisvorteile</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Für Qualitätssucher
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Niedersachsen als Zentrum der deutschen Warmblut-Zucht</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Schleswig-Holstein für erstklassige Springpferde</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <span>Hamburg und NRW für sport-orientierte Disziplinen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Häufig gestellte Fragen zu regionalen Pferdepreisen
            </h2>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-green-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Bereit für Ihren Pferdekauf?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Nutzen Sie unsere KI-gestützte Preisbewertung für eine präzise Einschätzung des Marktwerts
            </p>
            <Link
              href="/pferd-kaufen"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Jetzt Pferd bewerten lassen
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}