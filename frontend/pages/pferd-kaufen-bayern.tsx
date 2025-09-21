import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Star, MapPin, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

// Regionale Preisdaten für Bayern (beispielhafte Struktur)
const bayernPferdepreise = {
  warmblut: {
    dressur: { min: 8000, max: 45000, durchschnitt: 18500 },
    springen: { min: 10000, max: 55000, durchschnitt: 22000 },
    vielseitigkeit: { min: 12000, max: 40000, durchschnitt: 20500 },
    freizeit: { min: 5000, max: 15000, durchschnitt: 8500 }
  },
  haflinger: {
    zucht: { min: 3500, max: 12000, durchschnitt: 6500 },
    fahren: { min: 4000, max: 10000, durchschnitt: 6000 },
    freizeit: { min: 3000, max: 8000, durchschnitt: 5000 }
  },
  araber: {
    zucht: { min: 8000, max: 35000, durchschnitt: 15000 },
    distanz: { min: 6000, max: 25000, durchschnitt: 12000 },
    show: { min: 10000, max: 50000, durchschnitt: 22000 }
  }
};

const bayerischeZuchtgebiete = [
  {
    region: "Alpenvorland",
    charakteristikum: "Hochwertige Warmblut-Zucht mit Fokus auf Dressur und Springen",
    bekannteGestüte: ["Gestüt Schafhof", "Gestüt Birkhof"],
    preisbereich: "15.000 - 45.000€"
  },
  {
    region: "Oberbayern",
    charakteristikum: "Traditionelle Haflinger-Zucht und Alpine Pferderassen",
    bekannteGestüte: ["Haupt- und Landgestüt Schwaiganger"],
    preisbereich: "5.000 - 25.000€"
  },
  {
    region: "Niederbayern",
    charakteristikum: "Vielseitige Zucht mit Fokus auf Freizeitpferde",
    bekannteGestüte: ["Gestüt Donaueschingen", "Hof Mühlbach"],
    preisbereich: "6.000 - 20.000€"
  },
  {
    region: "Mittelfranken",
    charakteristikum: "Moderne Sportpferdezucht und Araber-Zucht",
    bekannteGestüte: ["Gestüt Erlenhof", "Araberzucht Franken"],
    preisbereich: "8.000 - 35.000€"
  }
];

const verkaufsmaerkte = [
  {
    name: "Münchener Pferdemarkt",
    ort: "München",
    termine: "Jeden 2. Samstag im Monat",
    spezialitaet: "Warmblüter und Sportpferde",
    kontakt: "info@muenchener-pferdemarkt.de"
  },
  {
    name: "Bayerische Pferdezuchtverband Verkaufsschau",
    ort: "Landsberied",
    termine: "März, Juni, September",
    spezialitaet: "Bayerische Warmblüter",
    kontakt: "verkauf@bayerisches-warmblut.de"
  },
  {
    name: "Haflinger Zentrum Bayern",
    ort: "Rosenheim",
    termine: "April bis Oktober, monatlich",
    spezialitaet: "Haflinger und Robustpferde",
    kontakt: "zentrum@haflinger-bayern.de"
  }
];

const faqBayern = [
  {
    frage: "Was kostet ein Pferd in Bayern durchschnittlich?",
    antwort: "Die Preise für Pferde in Bayern variieren stark je nach Rasse, Ausbildung und Verwendungszweck. Freizeitpferde kosten zwischen 3.000-15.000€, Sportpferde 8.000-55.000€. Hochwertige Zuchtpferde können deutlich teurer sein."
  },
  {
    frage: "Welche Pferderassen sind in Bayern besonders beliebt?",
    antwort: "In Bayern sind besonders Bayerische Warmblüter, Haflinger, Deutsche Sportpferde und Araber beliebt. Die Alpenregion eignet sich hervorragend für robuste Rassen wie Haflinger."
  },
  {
    frage: "Gibt es besondere rechtliche Bestimmungen beim Pferdekauf in Bayern?",
    antwort: "Bayern folgt dem deutschen Kaufrecht. Wichtig sind: Equidenpass-Kontrolle, Gewährleistungsrechte (24 Monate), Tierseuchenschutz-Bestimmungen und eventuell kommunale Haltungsvorschriften."
  },
  {
    frage: "Wie ist der Transport von Pferden innerhalb Bayerns geregelt?",
    antwort: "Für Transporte innerhalb Bayerns gelten die EU-Tiertransport-Verordnungen. Bei Fahrten über 8 Stunden sind Pausen erforderlich. Professionelle Transportunternehmen kennen alle Bestimmungen."
  },
  {
    frage: "Welche Jahreszeit ist optimal für den Pferdekauf in Bayern?",
    antwort: "Frühjahr (März-Mai) und Herbst (September-Oktober) sind ideal. Das Wetter ist mild für Proberitte, und viele Verkaufsveranstaltungen finden statt. Zudem ist die Auswahl größer."
  }
];

export default function PferdKaufenBayern() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pferd kaufen Bayern', href: '/pferd-kaufen-bayern' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-kaufen-bayern",
        "url": "https://pferdewert.de/pferd-kaufen-bayern",
        "name": "Pferd kaufen Bayern - Faire Preise finden | PferdeWert",
        "description": "Pferdekauf in Bayern: Ermitteln Sie mit KI-Analyse faire Marktpreise. Professionelle Bewertung für Pferde in Bayern - jetzt starten!",
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
          "name": "Pferd kaufen Bayern - Kompletter Ratgeber",
          "description": "Umfassender Guide zum Pferdekauf in Bayern mit aktuellen Preisen, KI-Bewertung und Marktanalyse",
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
        "name": "Pferdemarkt Bayern",
        "description": "Spezialisiert auf den Verkauf von Pferden in Bayern mit KI-gestützter Preisbewertung",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bayern",
          "addressCountry": "DE"
        },
        "areaServed": {
          "@type": "State",
          "name": "Bayern"
        },
        "serviceArea": [
          "München", "Nürnberg", "Augsburg", "Regensburg", "Ingolstadt",
          "Würzburg", "Fürth", "Erlangen", "Bayreuth", "Bamberg"
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
        "mainEntity": faqBayern.map(faq => ({
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
        "name": "Bayerische Zuchtgebiete",
        "description": "Übersicht der wichtigsten Pferdezuchtgebiete in Bayern",
        "itemListElement": bayerischeZuchtgebiete.map((gebiet, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Place",
            "name": gebiet.region,
            "description": gebiet.charakteristikum,
            "containedInPlace": {
              "@type": "State",
              "name": "Bayern"
            }
          }
        }))
      },
      {
        "@type": "Product",
        "name": "Pferd kaufen Bayern",
        "description": "Hochwertige Pferde aus Bayern mit professioneller KI-Bewertung",
        "category": "Pferde",
        "brand": {
          "@type": "Brand",
          "name": "Bayerische Pferdezucht"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": "3000",
          "highPrice": "55000",
          "offerCount": "500"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "147"
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
        <title>Pferd kaufen Bayern: Faire Preise durch KI-Bewertung | PferdeWert</title>
        <meta
          name="description"
          content="Pferd kaufen Bayern & NRW: KI-gestützte Marktanalyse für faire Preise. Haflinger, Warmblüter & Sportpferde mit professioneller Bewertung. Jetzt starten!"
        />
        <meta
          name="keywords"
          content="pferd kaufen bayern, pferd bayern kaufen, pferde kaufen bayern, pferdepreise bayern, pferdemarkt bayern, warmblut bayern kaufen, haflinger bayern kaufen, sportpferd bayern"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen Bayern: Faire Preise durch KI-Bewertung | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen Bayern & NRW: KI-gestützte Marktanalyse für faire Preise. Haflinger, Warmblüter & Sportpferde mit professioneller Bewertung. Jetzt starten!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen-bayern" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-bayern-og.jpg" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Bayern: Faire Preise durch KI-Bewertung | PferdeWert" />
        <meta name="twitter:description" content="Pferd kaufen Bayern & NRW: KI-gestützte Marktanalyse für faire Preise. Haflinger, Warmblüter & Sportpferde mit professioneller Bewertung. Jetzt starten!" />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-bayern-og.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen-bayern" />

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
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                  <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Pferd kaufen Bayern</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                {/* H1 Tag optimized for target keyword */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Pferd kaufen Bayern
                  <span className="block text-2xl text-blue-600 mt-2">
                    Faire Preise mit KI-Bewertung finden
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Pferd in Bayern kaufen? Nutzen Sie unsere KI-gestützte Marktanalyse für faire Preise.
                  Von Haflingern aus dem Alpenvorland bis zu modernen Sportpferden - finden Sie
                  Qualität zum richtigen Preis mit professioneller Bewertung.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ KI-gestützte Bewertung
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ 1.600 Suchanfragen/Monat
                  </span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Regionale Expertise
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-brand-brown rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Aktuelle Marktpreise Bayern</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Freizeitpferd:</span>
                    <span className="font-bold">3.000 - 15.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sportpferd:</span>
                    <span className="font-bold">8.000 - 55.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zuchtpferd:</span>
                    <span className="font-bold">5.000 - 50.000€</span>
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
              Pferdepreise Bayern nach Rassen & Disziplinen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Warmblut */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Bayerisches Warmblut
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Dressur</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.warmblut.dressur.min.toLocaleString()}€ - {bayernPferdepreise.warmblut.dressur.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.warmblut.dressur.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Springen</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.warmblut.springen.min.toLocaleString()}€ - {bayernPferdepreise.warmblut.springen.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.warmblut.springen.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.warmblut.freizeit.min.toLocaleString()}€ - {bayernPferdepreise.warmblut.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.warmblut.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Haflinger */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Haflinger
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.haflinger.zucht.min.toLocaleString()}€ - {bayernPferdepreise.haflinger.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.haflinger.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Fahren</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.haflinger.fahren.min.toLocaleString()}€ - {bayernPferdepreise.haflinger.fahren.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.haflinger.fahren.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.haflinger.freizeit.min.toLocaleString()}€ - {bayernPferdepreise.haflinger.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.haflinger.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Araber */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-brand-brown rounded-full mr-2"></span>
                  Araber
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.araber.zucht.min.toLocaleString()}€ - {bayernPferdepreise.araber.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.araber.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Distanz</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.araber.distanz.min.toLocaleString()}€ - {bayernPferdepreise.araber.distanz.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.araber.distanz.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Show</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.araber.show.min.toLocaleString()}€ - {bayernPferdepreise.araber.show.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {bayernPferdepreise.araber.show.durchschnitt.toLocaleString()}€
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
                    KI-gestützte Pferdebewertung für Bayern
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Unsere KI-Technologie analysiert über 50 Faktoren und vergleicht mit
                    aktuellen Marktdaten aus Bayern. Erhalten Sie eine professionelle
                    Bewertung basierend auf regionalen Preisstandards.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Analyse von über 1.000 bayerischen Verkäufen
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Berücksichtigung regionaler Preisunterschiede
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Aktuelle Markttrends und Saisonalität
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

          {/* Bayerische Zuchtgebiete */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Bayerische Zuchtgebiete & ihre Spezialitäten
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {bayerischeZuchtgebiete.map((gebiet, index) => (
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
              Wichtige Verkaufsmärkte & Veranstaltungen in Bayern
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

          {/* FAQ Bayern */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Häufige Fragen zum Pferdekauf in Bayern
            </h2>
            <div className="space-y-4">
              {faqBayern.map((faq, index) => (
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
              Ihr Traumpferd in Bayern finden
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Nutzen Sie unsere KI-gestützte Pferdebewertung und finden Sie das perfekte Pferd
              in Bayern zum fairen Preis. Über 1.600 Nutzer suchen monatlich nach Pferden in Bayern.
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