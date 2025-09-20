import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Breadcrumbs from '../../../components/Breadcrumbs';

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
    { label: 'Pferd kaufen', href: '/pferd-kaufen' },
    { label: 'Regionale Pferdepreise', href: '/pferd-kaufen/regionale-pferdepreise' },
    { label: 'Pferd kaufen Bayern', href: '/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern",
        "url": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern",
        "name": "Pferd kaufen Bayern - Preise, Züchter & Märkte 2024",
        "description": "✓ Aktuelle Pferdepreise in Bayern ✓ Seriöse Züchter & Verkaufsmärkte ✓ Regionale Expertise ✓ Von 3.000€ bis 55.000€ - Jetzt informieren!",
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
        }
      },
      {
        "@type": "LocalBusiness",
        "name": "Pferdemarkt Bayern",
        "description": "Spezialisiert auf den Verkauf von Pferden in Bayern",
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
        ]
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
        "@type": "Guide",
        "name": "Pferd kaufen in Bayern - Kompletter Ratgeber",
        "description": "Umfassender Guide zum Pferdekauf in Bayern mit aktuellen Preisen, seriösen Händlern und rechtlichen Hinweisen",
        "author": {
          "@type": "Organization",
          "name": "PferdeWert.de",
          "url": "https://pferdewert.de"
        },
        "datePublished": "2024-09-20",
        "dateModified": "2024-09-20"
      }
    ]
  };

  return (
    <Layout>
      <Head>
        <title>Pferd kaufen Bayern - Aktuelle Preise & seriöse Züchter 2024 | PferdeWert.de</title>
        <meta
          name="description"
          content="✓ Pferd kaufen Bayern: Aktuelle Pferdepreise von 3.000€-55.000€ ✓ Seriöse Züchter & Verkaufsmärkte ✓ Regionale Expertise ✓ Rechtliche Tipps ✓ Jetzt informieren!"
        />
        <meta name="keywords" content="pferd kaufen bayern, pferdepreise bayern, pferde bayern kaufen, pferdemarkt bayern, warmblut bayern, haflinger bayern kaufen, pferdehändler bayern, reitpferd bayern" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Pferd kaufen Bayern - Aktuelle Preise & seriöse Züchter 2024" />
        <meta property="og:description" content="Pferd kaufen in Bayern: Aktuelle Preise von 3.000€-55.000€, seriöse Züchter & Verkaufsmärkte. Regionale Expertise für Ihren Pferdekauf." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-bayern-og.jpg" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Bayern - Aktuelle Preise & seriöse Züchter 2024" />
        <meta name="twitter:description" content="Pferd kaufen in Bayern: Aktuelle Preise, seriöse Züchter & Verkaufsmärkte. Regional spezialisierte Beratung." />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-bayern-twitter.jpg" />

        {/* Geo Tags für lokale SEO */}
        <meta name="geo.region" content="DE-BY" />
        <meta name="geo.placename" content="Bayern" />
        <meta name="geo.position" content="48.7904;11.4979" />
        <meta name="ICBM" content="48.7904, 11.4979" />

        {/* Hreflang für regionale Varianten */}
        <link rel="alternate" hrefLang="de-DE" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-bayern" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-h1 font-bold text-gray-800 mb-4">
                  Pferd kaufen Bayern
                  <span className="block text-2xl text-green-600 mt-2">
                    Ihr Guide für den bayerischen Pferdemarkt
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Bayern ist Deutschlands größter und vielfältigster Pferdemarkt. Von traditionellen Haflingern
                  aus dem Alpenvorland bis zu modernen Sportpferden - hier finden Sie alles für den erfolgreichen
                  Pferdekauf mit aktuellen Preisen von 3.000€ bis 55.000€.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ 15+ Jahre Markterfahrung
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ 200+ Züchter-Kontakte
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Regionale Expertise
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg p-6 text-white">
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
              </div>
            </div>
          </div>

          {/* Regionale Preisübersicht */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Pferdepreise Bayern nach Rassen & Disziplinen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Warmblut */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Bayerisches Warmblut
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Dressur</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.warmblut.dressur.min.toLocaleString()}€ - {bayernPferdepreise.warmblut.dressur.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.warmblut.dressur.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Springen</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.warmblut.springen.min.toLocaleString()}€ - {bayernPferdepreise.warmblut.springen.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.warmblut.springen.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.warmblut.freizeit.min.toLocaleString()}€ - {bayernPferdepreise.warmblut.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
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
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.haflinger.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Fahren</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.haflinger.fahren.min.toLocaleString()}€ - {bayernPferdepreise.haflinger.fahren.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.haflinger.fahren.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.haflinger.freizeit.min.toLocaleString()}€ - {bayernPferdepreise.haflinger.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.haflinger.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Araber */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Araber
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.araber.zucht.min.toLocaleString()}€ - {bayernPferdepreise.araber.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.araber.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Distanz</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.araber.distanz.min.toLocaleString()}€ - {bayernPferdepreise.araber.distanz.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.araber.distanz.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Show</h4>
                    <p className="text-sm text-gray-600">
                      {bayernPferdepreise.araber.show.min.toLocaleString()}€ - {bayernPferdepreise.araber.show.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {bayernPferdepreise.araber.show.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bayerische Zuchtgebiete */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
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
                      <p className="text-green-600 font-semibold">{gebiet.preisbereich}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verkaufsmärkte & Veranstaltungen */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
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
                    <p className="text-green-600">
                      <span className="font-semibold">Kontakt:</span> {markt.kontakt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Regionale Besonderheiten */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Besonderheiten des bayerischen Pferdemarkts
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Geografische Vorteile</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Alpenvorland:</strong> Ideal für robuste Rassen und Bergpferde</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Flachland:</strong> Perfekt für Sportpferde-Zucht und Training</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Moderate Preise:</strong> Günstiger als NRW, höhere Qualität als Ostdeutschland</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Zentrale Lage:</strong> Gute Erreichbarkeit aus ganz Deutschland</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Zucht-Tradition</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Haupt- und Landgestüt Schwaiganger:</strong> Über 500 Jahre Tradition</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Haflinger-Zucht:</strong> Europaweit anerkannte Qualität</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Moderne Sportpferde:</strong> Erfolgreiche internationale Linien</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Vielseitigkeit:</strong> Von Freizeit bis Olympiasport</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Transport & Logistik */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Transport & Logistik in Bayern
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Autobahn-Anbindung</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• A8 München - Stuttgart</li>
                    <li>• A9 München - Berlin</li>
                    <li>• A3 Würzburg - Passau</li>
                    <li>• A6 Nürnberg - Heilbronn</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Transportkosten</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Innerhalb Bayern: 1-3€/km</li>
                    <li>• Nach NRW: 800-1.200€</li>
                    <li>• Nach Norddeutschland: 900-1.400€</li>
                    <li>• Österreich: 400-800€</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Empfohlene Transportunternehmen</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bayern Pferdetransport</li>
                    <li>• Alpenland Transport</li>
                    <li>• Süddeutsche Tierlogistik</li>
                    <li>• Munich Horse Transport</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Rechtliche Aspekte */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Rechtliche Aspekte beim Pferdekauf in Bayern
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Kaufvertrag & Gewährleistung</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ 24 Monate Gewährleistung bei Privatverkauf</li>
                    <li>✓ Ankaufsuntersuchung (AKU) empfohlen</li>
                    <li>✓ Schriftlicher Kaufvertrag obligatorisch</li>
                    <li>✓ Rücktrittsrecht bei Mängeln</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Dokumente & Papiere</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ Equidenpass (EU-weit gültig)</li>
                    <li>✓ Abstammungsnachweis/Zuchtpapiere</li>
                    <li>✓ Impfnachweis (Influenza, Tetanus)</li>
                    <li>✓ Gesundheitszeugnis bei Transport</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2">Wichtiger Hinweis:</h4>
                <p className="text-yellow-700 text-sm">
                  In Bayern gelten zusätzlich kommunale Haltungsvorschriften. Informieren Sie sich vor dem Kauf
                  über die Bestimmungen Ihrer Gemeinde bezüglich Pferdehaltung, Mindestgrößen für Weiden und
                  Genehmigungen für Stallbauten.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Bayern */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
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
          <section className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ihr Traumpferd in Bayern finden
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Nutzen Sie unseren kostenlosen Service zur Pferdebewertung und finden Sie das perfekte Pferd
              in Bayern zum fairen Preis. Über 15 Jahre Erfahrung im bayerischen Pferdemarkt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pferd-verkaufen" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Pferd bewerten lassen
              </Link>
              <Link href="/pferd-kaufen" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Alle Regionen entdecken
              </Link>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}