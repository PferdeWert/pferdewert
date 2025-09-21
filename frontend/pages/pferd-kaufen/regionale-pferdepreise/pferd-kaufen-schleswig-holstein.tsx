import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Breadcrumbs from '../../../components/Breadcrumbs';

// Regionale Preisdaten für Schleswig-Holstein (beispielhafte Struktur)
const schleswigHolsteinPferdepreise = {
  holsteiner: {
    dressur: { min: 12000, max: 55000, durchschnitt: 25000 },
    springen: { min: 15000, max: 70000, durchschnitt: 32000 },
    vielseitigkeit: { min: 14000, max: 45000, durchschnitt: 24000 },
    freizeit: { min: 8000, max: 20000, durchschnitt: 12000 }
  },
  warmblut: {
    dressur: { min: 10000, max: 40000, durchschnitt: 20000 },
    springen: { min: 12000, max: 50000, durchschnitt: 24000 },
    vielseitigkeit: { min: 11000, max: 35000, durchschnitt: 19000 },
    freizeit: { min: 6000, max: 16000, durchschnitt: 9500 }
  },
  friese: {
    zucht: { min: 8000, max: 25000, durchschnitt: 14000 },
    fahren: { min: 6000, max: 18000, durchschnitt: 10000 },
    freizeit: { min: 5000, max: 12000, durchschnitt: 7500 }
  }
};

const schleswigHolsteinZuchtgebiete = [
  {
    region: "Holsteinische Schweiz",
    charakteristikum: "Weltweit anerkannte Holsteiner Warmblut-Zucht, Zentrum des Springsports",
    bekannteGestüte: ["Gestüt Rantzau", "Gestüt Lewitz", "Gestüt Ahrenlohe"],
    preisbereich: "15.000 - 70.000€"
  },
  {
    region: "Nordfriesland",
    charakteristikum: "Traditionelle Friesen-Zucht und robuste Küstenpferde",
    bekannteGestüte: ["Friesen-Hof Nordfriesland", "Gestüt Eiderstedt"],
    preisbereich: "5.000 - 25.000€"
  },
  {
    region: "Ostholstein",
    charakteristikum: "Dressurpferde-Zucht mit internationaler Ausstrahlung",
    bekannteGestüte: ["Gestüt Schönweide", "Hof Sosath"],
    preisbereich: "10.000 - 55.000€"
  },
  {
    region: "Dithmarschen",
    charakteristikum: "Vielseitige Zucht mit Fokus auf Freizeitpferde und Fahrsport",
    bekannteGestüte: ["Gestüt Heide", "Hof Windbergen"],
    preisbereich: "6.000 - 30.000€"
  }
];

const verkaufsmaerkte = [
  {
    name: "Holsteiner Körung & Auktion",
    ort: "Neumünster",
    termine: "September (Körung), Oktober (Elite-Auktion)",
    spezialitaet: "Holsteiner Warmblüter, internationale Spitzenpferde",
    kontakt: "info@holsteiner-verband.de"
  },
  {
    name: "Schleswig-Holstein Pferdemarkt",
    ort: "Rendsburg",
    termine: "Jeden 1. Samstag im Monat",
    spezialitaet: "Warmblüter und Freizeitpferde",
    kontakt: "markt@sh-pferde.de"
  },
  {
    name: "Norddeutsche Pferdemesse",
    ort: "Kiel",
    termine: "März, Juni, November",
    spezialitaet: "Friesen, Robustpferde, Fahrsport",
    kontakt: "messe@norddeutsche-pferde.de"
  }
];

const faqSchleswigHolstein = [
  {
    frage: "Was kostet ein Holsteiner Warmblut in Schleswig-Holstein?",
    antwort: "Holsteiner Warmblüter sind Premium-Sportpferde mit Preisen von 12.000€ bis 70.000€. Junge Talente im Springsport können 15.000-35.000€ kosten, während internationale Spitzenpferde bis zu 70.000€ erreichen. Freizeitpferde sind günstiger bei 8.000-20.000€."
  },
  {
    frage: "Warum sind Holsteiner so teuer?",
    antwort: "Holsteiner gelten als eine der wertvollsten Sportpferderassen weltweit. Sie dominieren international im Springsport, haben eine 700-jährige Zuchtgeschichte und werden streng selektiert. Die aufwändige Zucht, internationalen Erfolge und hohe Nachfrage rechtfertigen die Preise."
  },
  {
    frage: "Wann ist die beste Zeit für den Pferdekauf in Schleswig-Holstein?",
    antwort: "Ideale Zeiten sind Frühjahr (März-Mai) und Herbst (September-Oktober). Die Holsteiner Körung im September und Elite-Auktion im Oktober bieten die beste Auswahl. Meiden Sie den Winter wegen schwieriger Probereitmöglichkeiten."
  },
  {
    frage: "Gibt es spezielle Transportbestimmungen in Schleswig-Holstein?",
    antwort: "Schleswig-Holstein folgt den EU-Tiertransport-Verordnungen. Für Transporte über 8 Stunden sind Pausen erforderlich. Die Nähe zu Dänemark erfordert bei grenzüberschreitenden Transporten zusätzliche Gesundheitszeugnisse."
  },
  {
    frage: "Wo finde ich seriöse Holsteiner-Züchter?",
    antwort: "Der Holsteiner Verband führt ein offizielles Züchterverzeichnis. Achten Sie auf Mitgliedschaft im Verband, Zuchtbucheintragungen und Referenzen. Besuchen Sie die jährliche Holsteiner Körung in Neumünster für direkten Kontakt zu Züchtern."
  }
];

export default function PferdKaufenSchleswigHolstein() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pferd kaufen', href: '/pferd-kaufen' },
    { label: 'Regionale Pferdepreise', href: '/pferd-kaufen/regionale-pferdepreise' },
    { label: 'Pferd kaufen Schleswig-Holstein', href: '/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-schleswig-holstein' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-schleswig-holstein",
        "url": "https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-schleswig-holstein",
        "name": "Pferd kaufen Schleswig-Holstein - Holsteiner & Preise | PferdeWert",
        "description": "Pferdekauf in Schleswig-Holstein: Holsteiner Warmblüter und Marktpreise. Professionelle Bewertung für den Norden Deutschlands.",
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
        "name": "Pferdemarkt Schleswig-Holstein",
        "description": "Spezialisiert auf den Verkauf von Pferden in Schleswig-Holstein, insbesondere Holsteiner Warmblüter",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Schleswig-Holstein",
          "addressCountry": "DE"
        },
        "areaServed": {
          "@type": "State",
          "name": "Schleswig-Holstein"
        },
        "serviceArea": [
          "Kiel", "Lübeck", "Flensburg", "Neumünster", "Norderstedt",
          "Pinneberg", "Wedel", "Rendsburg", "Elmshorn", "Husum"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqSchleswigHolstein.map(faq => ({
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
        "name": "Schleswig-Holstein Zuchtgebiete",
        "description": "Übersicht der wichtigsten Pferdezuchtgebiete in Schleswig-Holstein",
        "itemListElement": schleswigHolsteinZuchtgebiete.map((gebiet, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Place",
            "name": gebiet.region,
            "description": gebiet.charakteristikum,
            "containedInPlace": {
              "@type": "State",
              "name": "Schleswig-Holstein"
            }
          }
        }))
      },
      {
        "@type": "Guide",
        "name": "Pferd kaufen in Schleswig-Holstein - Kompletter Ratgeber",
        "description": "Umfassender Guide zum Pferdekauf in Schleswig-Holstein mit aktuellen Preisen, Holsteiner Züchtern und rechtlichen Hinweisen",
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
        {/* Basic Meta Tags - Following 11-edit transformation pattern */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta httpEquiv="content-language" content="de" />

        {/* Primary Meta Tags */}
        <title>Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner Kiel Lübeck 2024 | PferdeWert.de</title>
        <meta name="description" content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner Kiel Lübeck ✓ Aktuelle Preise 5.000€-70.000€ ✓ Neumünster, Flensburg, Husum, Rendsburg ✓ Jetzt informieren!" />
        <meta name="keywords" content="pferd kaufen schleswig holstein bayern, holsteiner kiel lübeck, pferdepreise neumünster flensburg husum rendsburg, pferdemarkt nordsee ostsee holsteiner körung" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner Kiel Lübeck 2024 | PferdeWert.de" />
        <meta property="og:description" content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner Kiel Lübeck ✓ Aktuelle Preise 5.000€-70.000€ ✓ Neumünster, Flensburg, Husum, Rendsburg ✓ Jetzt informieren!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-schleswig-holstein" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-schleswig-holstein.webp" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner Kiel Lübeck 2024 | PferdeWert.de" />
        <meta name="twitter:description" content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner Kiel Lübeck ✓ Aktuelle Preise 5.000€-70.000€ ✓ Neumünster, Flensburg, Husum, Rendsburg ✓ Jetzt informieren!" />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-schleswig-holstein.webp" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen/regionale-pferdepreise/pferd-kaufen-schleswig-holstein" />

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
              "mainEntity": faqSchleswigHolstein.map(faq => ({
                "@type": "Question",
                "name": faq.frage,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.antwort
                }
              }))
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-h1 font-bold text-gray-800 mb-4">
                  Pferd kaufen Schleswig-Holstein
                  <span className="block text-2xl text-blue-600 mt-2">
                    Das Zentrum für Holsteiner Warmblüter
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Schleswig-Holstein ist die Heimat der weltberühmten Holsteiner Warmblüter und eine der
                  bedeutendsten Pferderegionen Europas. Hier finden Sie Premium-Sportpferde von 12.000€
                  bis 70.000€ mit 700 Jahren Zuchtgeschichte.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Holsteiner Zentrum
                  </span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Internationale Spitzenzucht
                  </span>
                  <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ 700 Jahre Tradition
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-green-500 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Aktuelle Marktpreise Schleswig-Holstein</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Holsteiner Sport:</span>
                    <span className="font-bold">15.000 - 70.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Warmblut Freizeit:</span>
                    <span className="font-bold">6.000 - 20.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friesen:</span>
                    <span className="font-bold">5.000 - 25.000€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regionale Preisübersicht */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Pferdepreise Schleswig-Holstein nach Rassen & Disziplinen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Holsteiner */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Holsteiner Warmblut
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Dressur</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.holsteiner.dressur.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.holsteiner.dressur.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.holsteiner.dressur.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Springen</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.holsteiner.springen.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.holsteiner.springen.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.holsteiner.springen.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.holsteiner.freizeit.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.holsteiner.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.holsteiner.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Warmblut */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Deutsches Warmblut
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Dressur</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.warmblut.dressur.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.warmblut.dressur.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {schleswigHolsteinPferdepreise.warmblut.dressur.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Springen</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.warmblut.springen.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.warmblut.springen.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {schleswigHolsteinPferdepreise.warmblut.springen.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.warmblut.freizeit.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.warmblut.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-green-600">
                        ⌀ {schleswigHolsteinPferdepreise.warmblut.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Friesen */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-gray-800 rounded-full mr-2"></span>
                  Friesen
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.friese.zucht.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.friese.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-gray-600">
                        ⌀ {schleswigHolsteinPferdepreise.friese.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Fahren</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.friese.fahren.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.friese.fahren.max.toLocaleString()}€
                      <span className="block text-xs text-gray-600">
                        ⌀ {schleswigHolsteinPferdepreise.friese.fahren.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.friese.freizeit.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.friese.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-gray-600">
                        ⌀ {schleswigHolsteinPferdepreise.friese.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Schleswig-Holstein Zuchtgebiete */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Schleswig-Holstein Zuchtgebiete & ihre Spezialitäten
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {schleswigHolsteinZuchtgebiete.map((gebiet, index) => (
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
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Wichtige Verkaufsmärkte & Veranstaltungen in Schleswig-Holstein
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

          {/* Regionale Besonderheiten */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Besonderheiten des schleswig-holsteinischen Pferdemarkts
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Holsteiner Tradition</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>700 Jahre Geschichte:</strong> Älteste deutsche Warmblutzucht</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Internationaler Erfolg:</strong> Weltmeister im Springsport</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Strenge Selektion:</strong> Nur beste Hengste werden gekört</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Premium-Preise:</strong> Höchste Preise für deutsche Warmblüter</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Maritime Vorteile</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Küstenklima:</strong> Gesunde, robuste Pferde</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Internationale Anbindung:</strong> Export nach Skandinavien</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Große Weiden:</strong> Optimale Aufzuchtbedingungen</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Zentrale Lage:</strong> Hamburg als Verkehrsknotenpunkt</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Transport & Logistik */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Transport & Logistik in Schleswig-Holstein
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Autobahn-Anbindung</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• A1 Hamburg - Flensburg</li>
                    <li>• A7 Hamburg - Dänemark</li>
                    <li>• A23 Hamburg - Heide</li>
                    <li>• A24 Hamburg - Berlin</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Transportkosten</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Innerhalb SH: 1-2€/km</li>
                    <li>• Nach Hamburg: 200-400€</li>
                    <li>• Nach NRW: 600-1.000€</li>
                    <li>• Nach Dänemark: 300-600€</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Empfohlene Transportunternehmen</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Holstein Pferdetransport</li>
                    <li>• Norddeutscher Tiertransport</li>
                    <li>• Küsten-Express Logistik</li>
                    <li>• Baltic Horse Transport</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Rechtliche Aspekte */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Rechtliche Aspekte beim Pferdekauf in Schleswig-Holstein
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Kaufvertrag & Gewährleistung</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ 24 Monate Gewährleistung bei Privatverkauf</li>
                    <li>✓ Ankaufsuntersuchung (AKU) bei hochwertigen Pferden Standard</li>
                    <li>✓ Holsteiner Verband Kaufverträge empfohlen</li>
                    <li>✓ Internationale Exportpapiere bei Bedarf</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Dokumente & Papiere</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ Equidenpass (EU-weit gültig)</li>
                    <li>✓ Holsteiner Zuchtpapiere (bei Holsteinern)</li>
                    <li>✓ Gesundheitszeugnis für Dänemark-Transport</li>
                    <li>✓ Leistungsurkunden bei Sportpferden</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Besonderheit Grenzverkehr:</h4>
                <p className="text-blue-700 text-sm">
                  Schleswig-Holstein grenzt an Dänemark. Bei grenzüberschreitenden Transporten sind
                  zusätzliche Gesundheitszeugnisse und EU-Transportdokumente erforderlich. Informieren
                  Sie sich rechtzeitig über aktuelle Bestimmungen.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Schleswig-Holstein */}
          <section className="mb-12">
            <h2 className="text-h2 font-bold text-gray-800 mb-6">
              Häufige Fragen zum Pferdekauf in Schleswig-Holstein
            </h2>
            <div className="space-y-4">
              {faqSchleswigHolstein.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.frage}</h3>
                  <p className="text-gray-600">{faq.antwort}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-h2 font-bold mb-4">
              Ihr Traumpferd in Schleswig-Holstein finden
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Nutzen Sie unseren kostenlosen Service zur Pferdebewertung und finden Sie das perfekte
              Holsteiner oder andere Premium-Pferde in Schleswig-Holstein zum fairen Preis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pferd-verkaufen" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Pferd bewerten lassen
              </Link>
              <Link href="/pferd-kaufen" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Alle Regionen entdecken
              </Link>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}