import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { useState, useEffect, useCallback } from 'react';
import { info } from '@/lib/log';

// TypeScript Interfaces
interface DressurLevel {
  level: string;
  bezeichnung: string;
  anforderungen: string[];
  preisspanne: string;
  zielgruppe: string;
}

interface DressurPferdKriterium {
  kategorie: string;
  kriterien: string[];
  gewichtung: string;
  bewertung: string;
}

interface RegionalMarkt {
  bundesland: string;
  durchschnittspreis: string;
  besonderheiten: string[];
  topZuechter: string[];
}

const DressurpferdKaufen: NextPage = () => {
  // React State Management
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<string>('');
  const [showPriceCalculator, setShowPriceCalculator] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Animation Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Data Structures
  const dressurLevels: DressurLevel[] = [
    {
      level: 'E-Dressur',
      bezeichnung: 'Einsteiger & Jungpferde',
      anforderungen: ['Grundgangarten', 'Einfache Hufschlagfiguren', 'Losgelassenheit'],
      preisspanne: '3.000 - 12.000€',
      zielgruppe: 'Reitanfänger, Jungpferde-Ausbildung'
    },
    {
      level: 'A-Dressur',
      bezeichnung: 'Basis-Dressur',
      anforderungen: ['Tempo-Übergänge', 'Mittelschritt', 'Zirkel und Wendungen'],
      preisspanne: '8.000 - 20.000€',
      zielgruppe: 'Fortgeschrittene Anfänger'
    },
    {
      level: 'L-Dressur',
      bezeichnung: 'Leichte Dressur',
      anforderungen: ['Schenkelweichen', 'Versammelter Trab', 'Außengalopp'],
      preisspanne: '15.000 - 35.000€',
      zielgruppe: 'Turniersport Einsteiger'
    },
    {
      level: 'M-Dressur',
      bezeichnung: 'Mittlere Dressur',
      anforderungen: ['Traversalen', 'Starker Trab/Galopp', 'Rückwärtsrichten'],
      preisspanne: '25.000 - 60.000€',
      zielgruppe: 'Ambitionierte Turnierreit'
    },
    {
      level: 'S-Dressur',
      bezeichnung: 'Schwere Dressur',
      anforderungen: ['Piaffe', 'Passage', 'Wechsel-Sprünge'],
      preisspanne: '50.000 - 200.000€+',
      zielgruppe: 'Profisport & Elite'
    }
  ];

  const bewertungskriterien: DressurPferdKriterium[] = [
    {
      kategorie: 'Exterieur',
      kriterien: ['Typ und Rahmen', 'Gangarten-Veranlagung', 'Korrektheit der Gliedmaßen'],
      gewichtung: '25%',
      bewertung: 'Note 1-10'
    },
    {
      kategorie: 'Bewegung',
      kriterien: ['Takt und Rhythmus', 'Losgelassenheit', 'Schwung und Elastizität'],
      gewichtung: '35%',
      bewertung: 'Gangarten-Noten'
    },
    {
      kategorie: 'Rittigkeit',
      kriterien: ['Durchlässigkeit', 'Gehorsam', 'Arbeitsbereitschaft'],
      gewichtung: '25%',
      bewertung: 'Praxistest'
    },
    {
      kategorie: 'Potenzial',
      kriterien: ['Ausbildungsstand', 'Lernfähigkeit', 'Belastbarkeit'],
      gewichtung: '15%',
      bewertung: 'Einschätzung'
    }
  ];

  const regionaleMaerkte: RegionalMarkt[] = [
    {
      bundesland: 'Niedersachsen',
      durchschnittspreis: '18.000 - 45.000€',
      besonderheiten: ['Oldenburger Zentrum', 'Hannoveraner Zucht', 'Viele Ausbildungsbetriebe'],
      topZuechter: ['Gestüt Sprehe', 'Hof Sosath', 'Gestüt Lewitz']
    },
    {
      bundesland: 'Nordrhein-Westfalen',
      durchschnittspreis: '15.000 - 40.000€',
      besonderheiten: ['Großes Angebot', 'Westfalen-Zucht', 'Internationale Händler'],
      topZuechter: ['Gestüt Bonhomme', 'Hof Schulze-Niehues', 'Dressurstall Kempkes']
    },
    {
      bundesland: 'Bayern',
      durchschnittspreis: '20.000 - 50.000€',
      besonderheiten: ['Premium-Segment', 'Internationale Käufer', 'Hochpreisige Blutlinien'],
      topZuechter: ['Gestüt Schafhof', 'Reitanlage Gut Ising', 'Dressurtrainer Rath']
    }
  ];

  // Event Handlers
  const handleLevelSelect = useCallback((level: string) => {
    setSelectedLevel(level);
    info('Dressur level selected:', level);

    // GA4 Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'dressur_level_select', {
        level_name: level,
        page_title: 'Dressurpferd kaufen'
      });
    }
  }, []);

  const handleBudgetChange = useCallback((budget: string) => {
    setBudgetRange(budget);
    info('Budget range selected:', budget);

    // GA4 Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'budget_selection', {
        budget_range: budget,
        page_title: 'Dressurpferd kaufen'
      });
    }
  }, []);

  const togglePriceCalculator = useCallback(() => {
    setShowPriceCalculator(prev => !prev);

    // GA4 Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'price_calculator_toggle', {
        calculator_open: !showPriceCalculator,
        page_title: 'Dressurpferd kaufen'
      });
    }
  }, [showPriceCalculator]);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Dressurpferd kaufen - Preise & Bewertung 2025 | PferdeWert.de</title>
        <meta name="description" content="Dressurpferd kaufen: Marktpreise, Bewertungskriterien und KI-Analyse für faire Preise. Finden Sie das perfekte Dressurpferd zum richtigen Preis." />
        <meta name="keywords" content="dressurpferd kaufen, dressurpferd preis, dressurpferde verkauf, dressurhorse, dressur pferde kaufen, pferd dressur, dressurpferd züchter" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://pferdewert.de/dressurpferd-kaufen" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:title" content="Dressurpferd kaufen - Preise & Bewertung 2025 | PferdeWert.de" />
        <meta property="og:description" content="Dressurpferd kaufen: Marktpreise, Bewertungskriterien und KI-Analyse für faire Preise. Finden Sie das perfekte Dressurpferd zum richtigen Preis." />
        <meta property="og:url" content="https://pferdewert.de/dressurpferd-kaufen" />
        <meta property="og:image" content="https://pferdewert.de/images/og-dressurpferd-kaufen.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dressurpferd beim Training - Professionelle Bewertung" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PferdeWert" />
        <meta name="twitter:creator" content="@PferdeWert" />
        <meta name="twitter:title" content="Dressurpferd kaufen - Preise & Bewertung 2025" />
        <meta name="twitter:description" content="Marktpreise, Bewertungskriterien und KI-Analyse für Dressurpferde. Finden Sie das perfekte Dressurpferd zum richtigen Preis." />
        <meta name="twitter:image" content="https://pferdewert.de/images/og-dressurpferd-kaufen.jpg" />
        <meta name="twitter:image:alt" content="Dressurpferd beim Training - Professionelle Bewertung" />

        {/* Performance & Prefetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="prefetch" href="/was-ist-mein-pferd-wert" />

        {/* JSON-LD Schema - HowTo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "Dressurpferd kaufen - Kompletter Leitfaden",
              "description": "Schritt-für-Schritt Anleitung zum Kauf eines Dressurpferdes mit Preisbewertung und Kriterien",
              "image": "https://pferdewert.de/images/dressurpferd-kaufen-guide.jpg",
              "totalTime": "PT2H",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "EUR",
                "value": "3000-200000"
              },
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Budget festlegen",
                  "text": "Bestimmen Sie Ihr Budget basierend auf dem gewünschten Dressur-Level (E bis S)",
                  "image": "https://pferdewert.de/images/budget-planung.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Level bestimmen",
                  "text": "Wählen Sie das passende Dressur-Level basierend auf Ihren Fähigkeiten und Zielen",
                  "image": "https://pferdewert.de/images/dressur-levels.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Bewertungskriterien prüfen",
                  "text": "Bewerten Sie Exterieur, Bewegung, Rittigkeit und Potenzial des Pferdes",
                  "image": "https://pferdewert.de/images/bewertung-kriterien.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Ankaufsuntersuchung",
                  "text": "Lassen Sie eine professionelle AKU durchführen vor dem Kauf",
                  "image": "https://pferdewert.de/images/aku-untersuchung.jpg"
                }
              ]
            })
          }}
        />

        {/* JSON-LD Schema - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PferdeWert.de",
              "url": "https://pferdewert.de",
              "logo": "https://pferdewert.de/images/logo.png",
              "description": "Deutschlands führende Plattform für KI-gestützte Pferdebewertung und Marktpreisanalyse",
              "foundingDate": "2024",
              "founders": [
                {
                  "@type": "Person",
                  "name": "PferdeWert Team"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "DE",
                "addressLocality": "Deutschland"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@pferdewert.de",
                "availableLanguage": ["German"]
              },
              "sameAs": [
                "https://www.facebook.com/pferdewert",
                "https://www.instagram.com/pferdewert"
              ],
              "serviceArea": {
                "@type": "Country",
                "name": "Deutschland"
              },
              "knowsAbout": ["Pferdebewertung", "Dressurpferde", "Pferdepreise", "KI-Analyse", "Pferdehandel"]
            })
          }}
        />

        {/* JSON-LD Schema - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Was kostet ein gutes Dressurpferd?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die Preise für Dressurpferde variieren stark je nach Level: E-Dressur 3.000-12.000€, A-Dressur 8.000-20.000€, L-Dressur 15.000-35.000€, M-Dressur 25.000-60.000€, S-Dressur 50.000-200.000€+. Faktoren wie Ausbildungsstand, Abstammung und Turniererfolge beeinflussen den Preis erheblich."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Kriterien sind beim Dressurpferdekauf wichtig?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wichtige Bewertungskriterien sind: Exterieur (25% Gewichtung), Bewegung (35%), Rittigkeit (25%) und Potenzial (15%). Besonders entscheidend sind Takt, Losgelassenheit, Schwung und die Durchlässigkeit in der Ausbildung."
                  }
                },
                {
                  "@type": "Question",
                  "name": "In welchen Bundesländern findet man die besten Dressurpferde?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Niedersachsen (Oldenburger/Hannoveraner Zucht), Nordrhein-Westfalen (Westfalen-Zucht) und Bayern bieten die größte Auswahl. Niedersachsen ist das Zentrum der deutschen Dressurpferdezucht mit vielen renommierten Gestüten und Ausbildungsbetrieben."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Sollte ich eine Ankaufsuntersuchung machen lassen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, eine AKU ist bei Dressurpferden besonders wichtig, da sie hohen Belastungen ausgesetzt sind. Empfohlen wird mindestens eine AKU Klasse II, bei wertvollen Pferden eine große AKU. Die Kosten von 300-1.500€ sind gut investiert bei Kaufpreisen ab 10.000€."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wie erkenne ich das Potenzial eines jungen Dressurpferdes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Achten Sie auf natürliche Veranlagung der Gangarten, besonders Takt und Schwung. Der Charakter sollte lernwillig und gelassen sein. Wichtig sind auch korrekte Gliedmaßen und ein harmonisches Exterieur. Eine professionelle Bewertung durch einen Dressurexperten ist empfehlenswert."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <main className={`min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Dressurpferd kaufen
                <span className="block text-yellow-300 text-3xl md:text-4xl mt-2">
                  Preise & KI-Bewertung 2025
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Marktpreise, Bewertungskriterien und KI-Analyse für faire Preise.
                Finden Sie das perfekte Dressurpferd zum richtigen Preis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={togglePriceCalculator}
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
                >
                  Preis-Rechner starten
                </button>
                <Link
                  href="/was-ist-mein-pferd-wert"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors"
                >
                  Kostenlose Bewertung
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dressur Level Guide */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                Dressur-Level & Preisklassen
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Von E-Dressur bis S-Dressur - finden Sie das passende Level für Ihre Ziele und Ihr Budget
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dressurLevels.map((level) => (
                  <div
                    key={level.level}
                    className={`bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                      selectedLevel === level.level
                        ? 'border-blue-500 shadow-xl transform scale-105'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
                    }`}
                    onClick={() => handleLevelSelect(level.level)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-blue-800">{level.level}</h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {level.preisspanne}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{level.bezeichnung}</h4>
                    <ul className="space-y-2 mb-4">
                      {level.anforderungen.map((anforderung, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                          {anforderung}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 font-medium">Zielgruppe:</p>
                      <p className="text-gray-700">{level.zielgruppe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Price Calculator Section */}
        {showPriceCalculator && (
          <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Dressurpferd Preis-Rechner
                </h2>

                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-4">
                        Gewünschtes Dressur-Level:
                      </label>
                      <select
                        value={selectedLevel}
                        onChange={(e) => handleLevelSelect(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Level auswählen...</option>
                        {dressurLevels.map(level => (
                          <option key={level.level} value={level.level}>
                            {level.level} - {level.bezeichnung}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-4">
                        Budget-Range:
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => handleBudgetChange(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Budget auswählen...</option>
                        <option value="unter-10k">Unter 10.000€</option>
                        <option value="10k-25k">10.000 - 25.000€</option>
                        <option value="25k-50k">25.000 - 50.000€</option>
                        <option value="50k-100k">50.000 - 100.000€</option>
                        <option value="ueber-100k">Über 100.000€</option>
                      </select>
                    </div>
                  </div>

                  {selectedLevel && budgetRange && (
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">Empfehlung für Ihre Auswahl:</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Für {selectedLevel} in Ihrer Budget-Range finden Sie passende Pferde.
                        Nutzen Sie unsere KI-Bewertung für eine präzise Marktanalyse und faire Preiseinschätzung.
                      </p>
                      <Link
                        href="/was-ist-mein-pferd-wert"
                        className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Jetzt Pferd bewerten lassen
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bewertungskriterien */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                Bewertungskriterien für Dressurpferde
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Professionelle Kriterien für die objektive Bewertung von Dressurpferden
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {bewertungskriterien.map((kriterium) => (
                  <div key={kriterium.kategorie} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{kriterium.kategorie}</h3>
                      <div className="text-right">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                          {kriterium.gewichtung}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{kriterium.bewertung}</div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {kriterium.kriterien.map((punkt, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0"></span>
                          {punkt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Regionale Märkte */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                Regionale Dressurpferd-Märkte
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Marktübersicht der wichtigsten Dressurpferd-Regionen in Deutschland
              </p>

              <div className="grid lg:grid-cols-3 gap-8">
                {regionaleMaerkte.map((markt) => (
                  <div key={markt.bundesland} className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-lg border border-amber-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{markt.bundesland}</h3>
                    <div className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg text-center font-bold mb-4">
                      {markt.durchschnittspreis}
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Besonderheiten:</h4>
                      <ul className="space-y-1">
                        {markt.besonderheiten.map((besonderheit, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2 flex-shrink-0"></span>
                            {besonderheit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Top Züchter/Händler:</h4>
                      <ul className="space-y-1">
                        {markt.topZuechter.map((zuechter, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                            {zuechter}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                Häufige Fragen zum Dressurpferdekauf
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Antworten auf die wichtigsten Fragen rund um den Kauf von Dressurpferden
              </p>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Was kostet ein gutes Dressurpferd?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Die Preise variieren stark je nach Level: E-Dressur 3.000-12.000€, A-Dressur 8.000-20.000€,
                    L-Dressur 15.000-35.000€, M-Dressur 25.000-60.000€, S-Dressur 50.000-200.000€+.
                    Faktoren wie Ausbildungsstand, Abstammung und Turniererfolge beeinflussen den Preis erheblich.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Welche Kriterien sind beim Dressurpferdekauf wichtig?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Wichtige Bewertungskriterien sind: Exterieur (25% Gewichtung), Bewegung (35%), Rittigkeit (25%)
                    und Potenzial (15%). Besonders entscheidend sind Takt, Losgelassenheit, Schwung und die
                    Durchlässigkeit in der Ausbildung.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    In welchen Bundesländern findet man die besten Dressurpferde?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Niedersachsen (Oldenburger/Hannoveraner Zucht), Nordrhein-Westfalen (Westfalen-Zucht) und Bayern
                    bieten die größte Auswahl. Niedersachsen ist das Zentrum der deutschen Dressurpferdezucht mit
                    vielen renommierten Gestüten und Ausbildungsbetrieben.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Sollte ich eine Ankaufsuntersuchung machen lassen?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ja, eine AKU ist bei Dressurpferden besonders wichtig, da sie hohen Belastungen ausgesetzt sind.
                    Empfohlen wird mindestens eine AKU Klasse II, bei wertvollen Pferden eine große AKU.
                    Die Kosten von 300-1.500€ sind gut investiert bei Kaufpreisen ab 10.000€.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Wie erkenne ich das Potenzial eines jungen Dressurpferdes?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Achten Sie auf natürliche Veranlagung der Gangarten, besonders Takt und Schwung.
                    Der Charakter sollte lernwillig und gelassen sein. Wichtig sind auch korrekte Gliedmaßen
                    und ein harmonisches Exterieur. Eine professionelle Bewertung durch einen Dressurexperten ist empfehlenswert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bereit für Ihre Dressurpferd-Bewertung?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Nutzen Sie unsere KI-gestützte Analyse für eine präzise Marktbewertung Ihres Wunsch-Dressurpferdes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/was-ist-mein-pferd-wert"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
                >
                  Kostenlose Bewertung starten
                </Link>
                <Link
                  href="/beispiel-analyse"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-800 transition-colors"
                >
                  Beispiel-Analyse ansehen
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DressurpferdKaufen;