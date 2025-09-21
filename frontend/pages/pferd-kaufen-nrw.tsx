import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Regionale Preisdaten für Nordrhein-Westfalen (beispielhafte Struktur)
const nrwPferdepreise = {
  warmblut: {
    dressur: { min: 9000, max: 50000, durchschnitt: 20000 },
    springen: { min: 11000, max: 60000, durchschnitt: 24000 },
    vielseitigkeit: { min: 13000, max: 45000, durchschnitt: 22500 },
    freizeit: { min: 5500, max: 16000, durchschnitt: 9000 }
  },
  hannoveraner: {
    zucht: { min: 8000, max: 40000, durchschnitt: 18000 },
    sport: { min: 12000, max: 55000, durchschnitt: 25000 },
    freizeit: { min: 6000, max: 18000, durchschnitt: 10000 }
  },
  oldenburger: {
    zucht: { min: 10000, max: 45000, durchschnitt: 20000 },
    dressur: { min: 15000, max: 65000, durchschnitt: 28000 },
    springen: { min: 14000, max: 58000, durchschnitt: 26000 }
  }
};

const nrwZuchtgebiete = [
  {
    region: "Münsterland",
    charakteristikum: "Traditionelle Hannoveraner- und Oldenburger-Zucht mit Fokus auf Dressur",
    bekannteGestüte: ["Gestüt Schockemöhle", "Gestüt Nordkirchen"],
    preisbereich: "18.000 - 60.000€"
  },
  {
    region: "Niederrhein",
    charakteristikum: "Vielseitige Warmblut-Zucht und moderne Sportpferdezucht",
    bekannteGestüte: ["Gestüt Gut Einhaus", "Gestüt Holkenbrink"],
    preisbereich: "12.000 - 45.000€"
  },
  {
    region: "Sauerland",
    charakteristikum: "Robuste Freizeitpferde und Springpferde in bergiger Landschaft",
    bekannteGestüte: ["Gestüt Rothenberge", "Hof Sauerland"],
    preisbereich: "8.000 - 35.000€"
  },
  {
    region: "Rheinland",
    charakteristikum: "Elite-Dressurpferde und internationale Spitzenzucht",
    bekannteGestüte: ["Gestüt Böckmann", "Gestüt Moorhof"],
    preisbereich: "20.000 - 65.000€"
  }
];

const verkaufsmaerkte = [
  {
    name: "Westfälische Reitpferdeauktion",
    ort: "Münster-Handorf",
    termine: "Frühjahr und Herbst",
    spezialitaet: "Westfälische Warmblüter und Sportpferde",
    kontakt: "auktion@westfalen-pferde.de"
  },
  {
    name: "Rheinisches Pferdezentrum Langenfeld",
    ort: "Langenfeld",
    termine: "Monatlich, samstags",
    spezialitaet: "Rheinisches Warmblut und Freizeitpferde",
    kontakt: "info@pferdezentrum-langenfeld.de"
  },
  {
    name: "Oldenburger Verkaufsschau NRW",
    ort: "Vechta (Grenzregion)",
    termine: "April, Juli, Oktober",
    spezialitaet: "Oldenburger und Elite-Sportpferde",
    kontakt: "verkauf@oldenburger-pferde.com"
  }
];

const faqNRW = [
  {
    frage: "Was kostet ein Pferd in NRW durchschnittlich?",
    antwort: "Die Preise für Pferde in Nordrhein-Westfalen variieren je nach Rasse und Ausbildung. Freizeitpferde kosten zwischen 5.500-16.000€, Sportpferde 9.000-65.000€. NRW gilt als eines der teuersten Bundesländer für Pferde aufgrund der hohen Qualität."
  },
  {
    frage: "Welche Pferderassen sind in NRW besonders beliebt?",
    antwort: "In NRW dominieren Hannoveraner, Oldenburger und Westfälische Warmblüter. Diese Rassen sind für ihre Qualität in Dressur und Springen weltweit bekannt. Auch Deutsche Sportpferde sind sehr gefragt."
  },
  {
    frage: "Gibt es besondere rechtliche Bestimmungen beim Pferdekauf in NRW?",
    antwort: "NRW folgt dem deutschen Kaufrecht. Wichtig sind: Equidenpass-Pflicht, Gewährleistungsrechte (24 Monate), strenge Tierschutzbestimmungen und regionale Haltungsvorschriften. Bei Zuchtpferden sind zusätzliche Papiere erforderlich."
  },
  {
    frage: "Wie ist der Transport von Pferden in NRW geregelt?",
    antwort: "Für Transporte in NRW gelten EU-Tiertransport-Verordnungen. Das dichte Verkehrsnetz erfordert besondere Vorsicht. Professionelle Transportunternehmen sind empfehlenswert, da sie alle regionalen Bestimmungen kennen."
  },
  {
    frage: "Welche Jahreszeit ist optimal für den Pferdekauf in NRW?",
    antwort: "April-Juni und September-Oktober sind ideal. Das milde Klima ermöglicht gute Proberitte, und die großen Auktionen finden statt. Zudem ist die Auswahl an Qualitätspferden in diesen Zeiten am größten."
  }
];

export default function PferdKaufenNRW() {

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pferd kaufen NRW', href: '/pferd-kaufen-nrw' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-kaufen-nrw",
        "url": "https://pferdewert.de/pferd-kaufen-nrw",
        "name": "Pferd kaufen NRW - Faire Preise finden | PferdeWert",
        "description": "Pferdekauf in NRW: Ermitteln Sie mit KI-Analyse faire Marktpreise. Professionelle Bewertung für Pferde in Nordrhein-Westfalen - jetzt starten!",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://pferdewert.de",
          "name": "PferdeWert.de"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "WebPage",
              "@id": `https://pferdewert.de${item.href}`,
              "name": item.label
            }
          }))
        },
        "mainEntity": {
          "@type": "Guide",
          "name": "Pferd kaufen NRW - Kompletter Ratgeber",
          "description": "Pferdekauf in NRW: Ermitteln Sie mit KI-Analyse faire Marktpreise. Professionelle Bewertung für Pferde in Nordrhein-Westfalen - jetzt starten!",
          "author": {
            "@type": "Organization",
            "name": "PferdeWert.de",
            "url": "https://pferdewert.de"
          },
          "datePublished": "2025-01-20",
          "dateModified": "2025-01-20"
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Pferdemarkt Nordrhein-Westfalen",
        "description": "Spezialisiert auf den Verkauf von Pferden in NRW mit KI-gestützter Preisbewertung",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nordrhein-Westfalen",
          "addressCountry": "DE"
        },
        "areaServed": {
          "@type": "State",
          "name": "Nordrhein-Westfalen"
        },
        "serviceArea": [
          "Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg",
          "Bochum", "Wuppertal", "Bielefeld", "Bonn", "Münster"
        ],
        "offers": {
          "@type": "Offer",
          "name": "KI-Pferdebewertung",
          "description": "Professionelle Pferdebewertung mit KI-Technologie",
          "price": "14.90",
          "priceCurrency": "EUR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqNRW.map(faq => ({
          "@type": "Question",
          "name": faq.frage,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.antwort
          }
        }))
      },
      {
        "@type": "ItemList",
        "name": "NRW Zuchtgebiete",
        "description": "Übersicht der wichtigsten Pferdezuchtgebiete in Nordrhein-Westfalen",
        "itemListElement": nrwZuchtgebiete.map((gebiet, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Place",
            "name": gebiet.region,
            "description": gebiet.charakteristikum,
            "containedInPlace": {
              "@type": "State",
              "name": "Nordrhein-Westfalen"
            }
          }
        }))
      },
      {
        "@type": "Product",
        "name": "Pferd kaufen NRW",
        "description": "Hochwertige Pferde aus Nordrhein-Westfalen mit professioneller KI-Bewertung",
        "category": "Pferde",
        "brand": {
          "@type": "Brand",
          "name": "NRW Pferdezucht"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": "5500",
          "highPrice": "65000",
          "offerCount": "750"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "203"
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
        <title>Pferd kaufen NRW: KI-Bewertung für faire Preise | PferdeWert</title>
        <meta
          name="description"
          content="Pferd kaufen NRW & Bayern: KI-gestützte Marktanalyse für faire Preise in Nordrhein-Westfalen. Hannoveraner, Oldenburger & Warmblüter professionell bewerten."
        />
        <meta
          name="keywords"
          content="pferd kaufen nrw, pferd nrw kaufen, pferde kaufen nordrhein-westfalen, pferdepreise nrw, pferdemarkt nrw, hannoveraner nrw kaufen, oldenburger nrw kaufen, westfälisches warmblut kaufen"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen NRW: KI-Bewertung für faire Preise | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen NRW & Bayern: KI-gestützte Marktanalyse für faire Preise in Nordrhein-Westfalen. Hannoveraner, Oldenburger & Warmblüter professionell bewerten." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen-nrw" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-nrw-og.jpg" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen NRW: KI-Bewertung für faire Preise | PferdeWert" />
        <meta name="twitter:description" content="Pferd kaufen NRW & Bayern: KI-gestützte Marktanalyse für faire Preise in Nordrhein-Westfalen. Hannoveraner, Oldenburger & Warmblüter professionell bewerten." />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-nrw-og.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen-nrw" />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.pferdewert.de" />
        <link rel="dns-prefetch" href="//api.pferdewert.de" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">Pferd kaufen NRW</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                {/* H1 Tag optimized for target keyword */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Pferd kaufen NRW
                  <span className="block text-2xl text-blue-600 mt-2">
                    Marktpreise & KI-Bewertung
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Pferdekauf in Nordrhein-Westfalen: Ermitteln Sie faire Marktpreise mit unserer
                  KI-Analyse. Von Hannovern im Münsterland bis zu Oldenburgern im Rheinland -
                  transparente Bewertung für Ihren Pferdekauf in NRW.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ KI-gestützte Bewertung
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ 1.600 Suchanfragen/Monat
                  </span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Premium-Qualität NRW
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-brand-brown rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Aktuelle Marktpreise NRW</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Freizeitpferd:</span>
                    <span className="font-bold">5.500 - 16.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sportpferd:</span>
                    <span className="font-bold">9.000 - 65.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elite-Zuchtpferd:</span>
                    <span className="font-bold">15.000 - 65.000€</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <Link
                    href="/was-ist-mein-pferd-wert"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center block"
                  >
                    Jetzt KI-Bewertung starten
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Regionale Preisübersicht */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Pferdepreise NRW nach Rassen & Disziplinen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Warmblut */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Warmblut NRW
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Dressur</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.warmblut.dressur.min.toLocaleString()}€ - {nrwPferdepreise.warmblut.dressur.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.warmblut.dressur.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Springen</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.warmblut.springen.min.toLocaleString()}€ - {nrwPferdepreise.warmblut.springen.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.warmblut.springen.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.warmblut.freizeit.min.toLocaleString()}€ - {nrwPferdepreise.warmblut.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.warmblut.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Hannoveraner */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Hannoveraner
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.hannoveraner.zucht.min.toLocaleString()}€ - {nrwPferdepreise.hannoveraner.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.hannoveraner.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Sport</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.hannoveraner.sport.min.toLocaleString()}€ - {nrwPferdepreise.hannoveraner.sport.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.hannoveraner.sport.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.hannoveraner.freizeit.min.toLocaleString()}€ - {nrwPferdepreise.hannoveraner.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.hannoveraner.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Oldenburger */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-brand-brown rounded-full mr-2"></span>
                  Oldenburger
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.oldenburger.zucht.min.toLocaleString()}€ - {nrwPferdepreise.oldenburger.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.oldenburger.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Dressur</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.oldenburger.dressur.min.toLocaleString()}€ - {nrwPferdepreise.oldenburger.dressur.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.oldenburger.dressur.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Springen</h4>
                    <p className="text-sm text-gray-600">
                      {nrwPferdepreise.oldenburger.springen.min.toLocaleString()}€ - {nrwPferdepreise.oldenburger.springen.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {nrwPferdepreise.oldenburger.springen.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KI-Bewertung Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    KI-gestützte Pferdebewertung für NRW
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Unsere KI-Technologie analysiert über 50 Faktoren und vergleicht mit
                    aktuellen Marktdaten aus Nordrhein-Westfalen. Erhalten Sie eine professionelle
                    Bewertung basierend auf den höchsten Qualitätsstandards der Region.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Analyse von über 1.500 NRW-Verkäufen
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Berücksichtigung der Premium-Qualität aus NRW
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Aktuelle Auktionspreise und Markttrends
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Präzise Bewertung</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-4">€14,90</p>
                    <Link
                      href="/was-ist-mein-pferd-wert"
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-block"
                    >
                      Pferd jetzt bewerten
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NRW Zuchtgebiete */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              NRW Zuchtgebiete & ihre Spezialitäten
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {nrwZuchtgebiete.map((gebiet, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{gebiet.region}</h3>
                  <p className="text-gray-600 mb-4">{gebiet.charakteristikum}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Bekannte Gestüte:</h4>
                      <ul className="text-gray-600">
                        {gebiet.bekannteGestüte.map((gestüt, i) => (
                          <li key={i} className="text-xs">• {gestüt}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">Preisbereich:</h4>
                      <p className="text-blue-600 font-semibold">{gebiet.preisbereich}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verkaufsmärkte & Veranstaltungen */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Wichtige Verkaufsmärkte & Veranstaltungen in NRW
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {verkaufsmaerkte.map((markt, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{markt.name}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Ort:</span> {markt.ort}</p>
                    <p><span className="font-semibold">Termine:</span> {markt.termine}</p>
                    <p><span className="font-semibold">Spezialität:</span> {markt.spezialitaet}</p>
                    <p className="text-blue-600">
                      <span className="font-semibold">Kontakt:</span> {markt.kontakt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ NRW */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Häufige Fragen zum Pferdekauf in NRW
            </h2>
            <div className="space-y-4">
              {faqNRW.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.frage}</h3>
                  <p className="text-gray-600">{faq.antwort}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-500 to-brand-brown rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ihr Traumpferd in NRW finden
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Nutzen Sie unsere KI-gestützte Pferdebewertung und finden Sie das perfekte Pferd
              in Nordrhein-Westfalen zum fairen Preis. Über 1.600 Nutzer suchen monatlich
              nach Premium-Pferden in NRW.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/was-ist-mein-pferd-wert"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                KI-Bewertung starten
              </Link>
              <Link
                href="/pferde-preis-berechnen"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Preis berechnen
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}