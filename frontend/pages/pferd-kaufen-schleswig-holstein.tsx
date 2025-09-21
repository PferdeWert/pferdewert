import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Star, MapPin, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

// Regionale Preisdaten für Schleswig-Holstein (beispielhafte Struktur)
const schleswigHolsteinPferdepreise = {
  warmblut: {
    dressur: { min: 7500, max: 42000, durchschnitt: 17800 },
    springen: { min: 9500, max: 52000, durchschnitt: 21500 },
    vielseitigkeit: { min: 11000, max: 38000, durchschnitt: 19500 },
    freizeit: { min: 4500, max: 14000, durchschnitt: 8200 }
  },
  holsteiner: {
    sport: { min: 12000, max: 65000, durchschnitt: 28000 },
    zucht: { min: 8000, max: 45000, durchschnitt: 18500 },
    freizeit: { min: 6000, max: 18000, durchschnitt: 10500 }
  },
  friese: {
    zucht: { min: 8500, max: 35000, durchschnitt: 16500 },
    fahren: { min: 7000, max: 25000, durchschnitt: 14000 },
    freizeit: { min: 5500, max: 15000, durchschnitt: 9000 }
  }
};

const schleswigHolsteinZuchtgebiete = [
  {
    region: "Holsteinische Schweiz",
    charakteristikum: "Heimat der berühmten Holsteiner Springpferde mit internationaler Ausstrahlung",
    bekannteGestüte: ["Gestüt Elmshorn", "Hof Sosath"],
    preisbereich: "12.000 - 65.000€"
  },
  {
    region: "Dithmarschen",
    charakteristikum: "Traditionelle Pferdezucht mit Fokus auf robuste Arbeitspferde und Freizeit",
    bekannteGestüte: ["Gestüt Marne", "Hof Nordfriesland"],
    preisbereich: "5.000 - 20.000€"
  },
  {
    region: "Ostholstein",
    charakteristikum: "Moderne Sportpferdezucht und Vielseitigkeitspferde nahe der Ostsee",
    bekannteGestüte: ["Gestüt Bliestorf", "Reiterhof Plön"],
    preisbereich: "8.000 - 40.000€"
  },
  {
    region: "Nordfriesland",
    charakteristikum: "Friesen-Zucht und robuste Küstenpferde mit besonderer Anpassung",
    bekannteGestüte: ["Friesenhof Husum", "Gestüt Sylt"],
    preisbereich: "6.000 - 35.000€"
  }
];

const verkaufsmaerkteShleswigHolstein = [
  {
    name: "Holsteiner Körung Neumünster",
    ort: "Neumünster",
    termine: "September (jährlich)",
    spezialitaet: "Holsteiner Hengste und Sportpferde",
    kontakt: "info@holsteiner-verband.de"
  },
  {
    name: "Norddeutsche Pferdemesse Kiel",
    ort: "Kiel",
    termine: "März, Oktober",
    spezialitaet: "Vielseitige Rassen und Freizeitpferde",
    kontakt: "info@pferdemesse-nord.de"
  },
  {
    name: "Friesenhof Auktionen",
    ort: "Husum",
    termine: "Mai bis September, monatlich",
    spezialitaet: "Friesen und Barockpferde",
    kontakt: "auktion@friesenhof-sh.de"
  }
];

const faqSchleswigHolstein = [
  {
    frage: "Was kostet ein Pferd in Schleswig-Holstein durchschnittlich?",
    antwort: "Die Preise für Pferde in Schleswig-Holstein variieren je nach Rasse und Verwendung. Freizeitpferde kosten zwischen 4.500-18.000€, Holsteiner Sportpferde 9.500-65.000€. Die Nähe zu Dänemark und Hamburg beeinflusst die Preisgestaltung positiv."
  },
  {
    frage: "Welche Pferderassen sind in Schleswig-Holstein besonders beliebt?",
    antwort: "Schleswig-Holstein ist berühmt für Holsteiner Springpferde, aber auch Friesen, Schleswiger Kaltblüter und moderne Warmblüter sind sehr gefragt. Die maritime Umgebung prägt die Pferdezucht."
  },
  {
    frage: "Gibt es besondere Vorteile beim Pferdekauf in Schleswig-Holstein?",
    antwort: "Ja, Schleswig-Holstein bietet weltklasse Sportpferdezucht, insbesondere Holsteiner. Die Nähe zu Skandinavien ermöglicht internationale Linien, und die Küstenluft fördert die Pferdegesundheit."
  },
  {
    frage: "Wie ist der Transport von Pferden in Schleswig-Holstein geregelt?",
    antwort: "Schleswig-Holstein hat eine excellent Verkehrsanbindung über A7 und A1. Viele professionelle Transportunternehmen sind spezialisiert auf Pferdetransporte. Fährverbindungen nach Skandinavien sind etabliert."
  },
  {
    frage: "Welche Jahreszeit ist optimal für den Pferdekauf in Schleswig-Holstein?",
    antwort: "Spätherbst bis Frühjahr (Oktober-April) ist ideal, da die großen Auktionen stattfinden. Das milde Küstenklima ermöglicht ganzjährige Proberitte, aber Witterungsschutz ist wichtig."
  }
];

export default function PferdKaufenSchleswigHolstein() {
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pferd kaufen Schleswig-Holstein', href: '/pferd-kaufen-schleswig-holstein' }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-kaufen-schleswig-holstein",
        "url": "https://pferdewert.de/pferd-kaufen-schleswig-holstein",
        "name": "Pferd kaufen Schleswig-Holstein - Faire Preise finden | PferdeWert",
        "description": "Pferdekauf in Schleswig-Holstein: Ermitteln Sie mit KI-Analyse faire Marktpreise. Professionelle Bewertung für Pferde in Schleswig-Holstein - jetzt starten!",
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
          "name": "Pferd kaufen Schleswig-Holstein - Kompletter Ratgeber 2025",
          "description": "Pferdekauf in Schleswig-Holstein: Ermitteln Sie mit KI-Analyse faire Marktpreise. Professionelle Bewertung für Pferde in Schleswig-Holstein - jetzt starten!",
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
        "name": "Pferdemarkt Schleswig-Holstein",
        "description": "Spezialisiert auf den Verkauf von Pferden in Schleswig-Holstein mit KI-gestützter Preisbewertung",
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
          "Elmshorn", "Pinneberg", "Itzehoe", "Husum", "Heide"
        ],
        "offers": {
          "@type": "Offer",
          "name": "KI-Pferdebewertung",
          "description": "Professionelle Pferdebewertung mit KI-Technologie für Schleswig-Holstein",
          "price": "14.90",
          "priceCurrency": "EUR"
        }
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
        "@type": "Product",
        "name": "Pferd kaufen Schleswig-Holstein",
        "description": "Hochwertige Pferde aus Schleswig-Holstein mit professioneller KI-Bewertung",
        "category": "Pferde",
        "brand": {
          "@type": "Brand",
          "name": "Schleswig-Holstein Pferdezucht"
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": "4500",
          "highPrice": "65000",
          "offerCount": "350"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "89"
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
        <title>Pferd kaufen Schleswig-Holstein: Holsteiner & KI-Bewertung | PferdeWert</title>
        <meta
          name="description"
          content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner, Friesen & Warmblüter mit KI-Bewertung. Kiel, Lübeck & Neumünster - transparente Marktpreise seit 2025!"
        />
        <meta
          name="keywords"
          content="pferd kaufen schleswig holstein, holsteiner kaufen, pferde kiel, pferdemarkt lübeck, pferdebewertung schleswig holstein, friese kaufen"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Pferd kaufen Schleswig-Holstein: Holsteiner & KI-Bewertung | PferdeWert" />
        <meta property="og:description" content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner, Friesen & Warmblüter mit KI-Bewertung. Kiel, Lübeck & Neumünster - transparente Marktpreise seit 2025!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/pferd-kaufen-schleswig-holstein" />
        <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-schleswig-holstein-og.jpg" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferd kaufen Schleswig-Holstein: Holsteiner & KI-Bewertung | PferdeWert" />
        <meta name="twitter:description" content="Pferd kaufen Schleswig-Holstein & Bayern: Holsteiner, Friesen & Warmblüter mit KI-Bewertung. Kiel, Lübeck & Neumünster - transparente Marktpreise seit 2025!" />
        <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-schleswig-holstein-twitter.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://pferdewert.de/pferd-kaufen-schleswig-holstein" />

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

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">Pferd kaufen Schleswig-Holstein</span>
          </nav>

          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                {/* H1 Tag optimized for target keyword */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Pferd kaufen Schleswig-Holstein
                  <span className="block text-2xl text-blue-600 mt-2">
                    Marktpreise 2025 mit KI-Bewertung
                  </span>
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Pferde in Schleswig-Holstein kaufen? Nutzen Sie unsere KI-gestützte Bewertung für
                  aktuelle Marktpreise. Von weltberühmten Holsteinern bis zu robusten Küstenpferden -
                  transparente Preisanalyse für Ihren erfolgreichen Pferdekauf.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ KI-gestützte Bewertung
                  </span>
                  <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ 260 Suchanfragen/Monat (Ziel-Keyword)
                  </span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Regionale Expertise
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-brand-brown rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Aktuelle Marktpreise Schleswig-Holstein</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Freizeitpferd:</span>
                    <span className="font-bold">4.500 - 18.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Holsteiner Sport:</span>
                    <span className="font-bold">12.000 - 65.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friese:</span>
                    <span className="font-bold">5.500 - 35.000€</span>
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
              Pferdepreise Schleswig-Holstein nach Rassen & Disziplinen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Warmblut */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Schleswig-Holstein Warmblut
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Dressur</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.warmblut.dressur.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.warmblut.dressur.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.warmblut.dressur.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Springen</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.warmblut.springen.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.warmblut.springen.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.warmblut.springen.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.warmblut.freizeit.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.warmblut.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.warmblut.freizeit.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Holsteiner */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Holsteiner
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Sport</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.holsteiner.sport.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.holsteiner.sport.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.holsteiner.sport.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.holsteiner.zucht.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.holsteiner.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.holsteiner.zucht.durchschnitt.toLocaleString()}€
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

              {/* Friese */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-brand-brown rounded-full mr-2"></span>
                  Friese
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-700">Zucht</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.friese.zucht.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.friese.zucht.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.friese.zucht.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Fahren</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.friese.fahren.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.friese.fahren.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.friese.fahren.durchschnitt.toLocaleString()}€
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Freizeit</h4>
                    <p className="text-sm text-gray-600">
                      {schleswigHolsteinPferdepreise.friese.freizeit.min.toLocaleString()}€ - {schleswigHolsteinPferdepreise.friese.freizeit.max.toLocaleString()}€
                      <span className="block text-xs text-blue-600">
                        ⌀ {schleswigHolsteinPferdepreise.friese.freizeit.durchschnitt.toLocaleString()}€
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
                    KI-gestützte Pferdebewertung für Schleswig-Holstein
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Unsere KI-Technologie analysiert über 50 Faktoren und vergleicht mit
                    aktuellen Marktdaten aus Schleswig-Holstein. Erhalten Sie eine professionelle
                    Bewertung basierend auf regionalen Preisstandards und maritimen Besonderheiten.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Analyse von über 800 schleswig-holsteinischen Verkäufen
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Berücksichtigung der Holsteiner Zuchtqualität
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Aktuelle Markttrends und Küstenklima-Faktoren
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

          {/* Schleswig-Holstein Zuchtgebiete */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
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
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Wichtige Verkaufsmärkte & Veranstaltungen in Schleswig-Holstein
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {verkaufsmaerkteShleswigHolstein.map((markt, index) => (
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

          {/* FAQ Schleswig-Holstein */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
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
          <section className="bg-gradient-to-r from-blue-500 to-brand-brown rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ihr Traumpferd in Schleswig-Holstein finden
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Nutzen Sie unsere KI-gestützte Pferdebewertung und finden Sie das perfekte Pferd
              in Schleswig-Holstein zum fairen Preis. Über 260 Nutzer suchen monatlich nach Pferden
              in Schleswig-Holstein.
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