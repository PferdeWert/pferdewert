import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { useState, useEffect, useCallback } from 'react';
import { info } from '@/lib/log';

// TypeScript Interfaces
interface SpringKlasse {
  hoehe: string;
  bezeichnung: string;
  anforderungen: string[];
  preisspanne: string;
  zielgruppe: string;
  hindernistypen: string[];
}

interface SpringpferdKriterium {
  kategorie: string;
  eigenschaften: string[];
  gewichtung: string;
  bewertungsaspekte: string[];
}

interface ZuchtrichtungSpringen {
  richtung: string;
  hauptmerkmale: string[];
  typischePreise: string;
  bekannteBlutlinien: string[];
}

const SpringpferdKaufen: NextPage = () => {
  // React State Management
  const [selectedKlasse, setSelectedKlasse] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [showAdvancedFilter, setShowAdvancedFilter] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Animation Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Data Structures
  const springKlassen: SpringKlasse[] = [
    {
      hoehe: 'Stilspringen E',
      bezeichnung: 'Einsteiger-Springen',
      anforderungen: ['Hindernisse bis 85cm', 'Grundsprünge', 'Einfache Parcours'],
      preisspanne: '2.500 - 8.000€',
      zielgruppe: 'Reitanfänger, Jungpferde',
      hindernistypen: ['Stangen', 'Kleine Oxer', 'Einfache Kombinationen']
    },
    {
      hoehe: 'Stilspringen A',
      bezeichnung: 'Basis-Springen',
      anforderungen: ['Hindernisse bis 95cm', 'Parcours-Routine', 'Präzision'],
      preisspanne: '5.000 - 15.000€',
      zielgruppe: 'Fortgeschrittene Anfänger',
      hindernistypen: ['Oxer', 'Steilsprünge', 'Doppelsprünge']
    },
    {
      hoehe: 'Springen L',
      bezeichnung: 'Leichtes Springen',
      anforderungen: ['Hindernisse bis 115cm', 'Stechen', 'Wendigkeit'],
      preisspanne: '12.000 - 30.000€',
      zielgruppe: 'Turniersport Einsteiger',
      hindernistypen: ['Breite Oxer', 'Mauer', 'Dreifachkombinationen']
    },
    {
      hoehe: 'Springen M',
      bezeichnung: 'Mittleres Springen',
      anforderungen: ['Hindernisse bis 135cm', 'Technik', 'Nervenstärke'],
      preisspanne: '20.000 - 60.000€',
      zielgruppe: 'Ambitionierte Springreiter',
      hindernistypen: ['Hohe Oxer', 'Wassergraben', 'Komplexe Distanzen']
    },
    {
      hoehe: 'Springen S',
      bezeichnung: 'Schweres Springen',
      anforderungen: ['Hindernisse bis 160cm+', 'Professionalität', 'Elite-Niveau'],
      preisspanne: '40.000 - 500.000€+',
      zielgruppe: 'Profisport & internationale Turniere',
      hindernistypen: ['Maximale Höhen', 'Planken', 'Grand Prix Parcours']
    }
  ];

  const bewertungskriterien: SpringpferdKriterium[] = [
    {
      kategorie: 'Springvermögen',
      eigenschaften: ['Absprungkraft', 'Bascule', 'Höhenvermögen', 'Weitenvermögen'],
      gewichtung: '40%',
      bewertungsaspekte: ['Technik über dem Hindernis', 'Kraftentwicklung', 'Sprungphase']
    },
    {
      kategorie: 'Rittigkeit',
      eigenschaften: ['Wendigkeit', 'Gehorsam', 'Rhythmus', 'Einstellbarkeit'],
      gewichtung: '25%',
      bewertungsaspekte: ['Parcours-Handling', 'Stechen-Qualitäten', 'Nervenstärke']
    },
    {
      kategorie: 'Exterieur',
      eigenschaften: ['Rahmen', 'Fundament', 'Typ', 'Bewegungsapparat'],
      gewichtung: '20%',
      bewertungsaspekte: ['Funktionalität', 'Belastbarkeit', 'Harmonie']
    },
    {
      kategorie: 'Charakter',
      eigenschaften: ['Mut', 'Vorsicht', 'Leistungsbereitschaft', 'Belastbarkeit'],
      gewichtung: '15%',
      bewertungsaspekte: ['Turniereignung', 'Trainierbarkeit', 'Stressresistenz']
    }
  ];

  const zuchtrichtungen: ZuchtrichtungSpringen[] = [
    {
      richtung: 'Holsteiner',
      hauptmerkmale: ['Große Sprungkraft', 'Wendigkeit', 'Turniertauglichkeit', 'Robustheit'],
      typischePreise: '15.000 - 80.000€',
      bekannteBlutlinien: ['Corrado I', 'Caletto I', 'Caretino', 'Capitol I']
    },
    {
      richtung: 'Hannoveraner',
      hauptmerkmale: ['Vielseitigkeit', 'Bewegungsqualität', 'Springveranlagung', 'Charakter'],
      typischePreise: '12.000 - 60.000€',
      bekannteBlutlinien: ['Argentinus', 'Adorable', 'Andiamo', 'Athletico']
    },
    {
      richtung: 'Oldenburger',
      hauptmerkmale: ['Moderne Springpferde', 'Gute Bewegung', 'Sprungkraft', 'Typ'],
      typischePreise: '18.000 - 100.000€',
      bekannteBlutlinien: ['Cornet Obolensky', 'Chacco-Blue', 'Clinton', 'Casall']
    },
    {
      richtung: 'Westfalen',
      hauptmerkmale: ['Kraftvolle Springer', 'Gute Rittigkeit', 'Leistungsbereitschaft'],
      typischePreise: '10.000 - 50.000€',
      bekannteBlutlinien: ['Carthago', 'Contender', 'Caretino', 'Corrado I']
    }
  ];

  // Event Handlers
  const handleKlasseSelect = useCallback((klasse: string) => {
    setSelectedKlasse(klasse);
    info('Spring klasse selected:', klasse);

    // GA4 Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'spring_klasse_select', {
        klasse_name: klasse,
        page_title: 'Springpferd kaufen'
      });
    }
  }, []);

  const handleBudgetSelect = useCallback((budget: string) => {
    setSelectedBudget(budget);
    info('Budget selected:', budget);

    // GA4 Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'budget_selection', {
        budget_range: budget,
        page_title: 'Springpferd kaufen'
      });
    }
  }, []);

  const toggleAdvancedFilter = useCallback(() => {
    setShowAdvancedFilter(prev => !prev);

    // GA4 Tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'advanced_filter_toggle', {
        filter_open: !showAdvancedFilter,
        page_title: 'Springpferd kaufen'
      });
    }
  }, [showAdvancedFilter]);

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Springpferd kaufen - Marktpreise & KI-Bewertung | PferdeWert</title>
        <meta name="description" content="Springpferd kaufen: Aktuelle Preise, Bewertungskriterien und Marktanalyse. KI-gestützte Preiseinschätzung für Springpferde aller Klassen." />
        <meta name="keywords" content="springpferd kaufen, springpferd preis, springpferde verkauf, springhorse, spring pferde kaufen, pferd springen, springpferd züchter" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://pferdewert.de/springpferd-kaufen" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:title" content="Springpferd kaufen - Marktpreise & KI-Bewertung | PferdeWert" />
        <meta property="og:description" content="Springpferd kaufen: Aktuelle Preise, Bewertungskriterien und Marktanalyse. KI-gestützte Preiseinschätzung für Springpferde aller Klassen." />
        <meta property="og:url" content="https://pferdewert.de/springpferd-kaufen" />
        <meta property="og:image" content="https://pferdewert.de/images/og-springpferd-kaufen.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Springpferd beim Parcours - Professionelle Bewertung" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PferdeWert" />
        <meta name="twitter:creator" content="@PferdeWert" />
        <meta name="twitter:title" content="Springpferd kaufen - Marktpreise & KI-Bewertung" />
        <meta name="twitter:description" content="Aktuelle Preise, Bewertungskriterien und Marktanalyse für Springpferde. KI-gestützte Preiseinschätzung aller Klassen." />
        <meta name="twitter:image" content="https://pferdewert.de/images/og-springpferd-kaufen.jpg" />
        <meta name="twitter:image:alt" content="Springpferd beim Parcours - Professionelle Bewertung" />

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
              "name": "Springpferd kaufen - Kompletter Leitfaden",
              "description": "Schritt-für-Schritt Anleitung zum Kauf eines Springpferdes mit Preisbewertung und Kriterien",
              "image": "https://pferdewert.de/images/springpferd-kaufen-guide.jpg",
              "totalTime": "PT3H",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "EUR",
                "value": "2500-500000"
              },
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Springklasse definieren",
                  "text": "Bestimmen Sie die gewünschte Springklasse von E-Springen bis S-Springen je nach Ihrem Können",
                  "image": "https://pferdewert.de/images/spring-klassen.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Budget festlegen",
                  "text": "Definieren Sie Ihr Budget basierend auf der Springklasse und gewünschten Qualität",
                  "image": "https://pferdewert.de/images/spring-budget.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Springvermögen testen",
                  "text": "Prüfen Sie Absprungkraft, Bascule, Wendigkeit und Rittigkeit des Springpferdes",
                  "image": "https://pferdewert.de/images/spring-test.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Gesundheitsprüfung",
                  "text": "Führen Sie eine umfassende Ankaufsuntersuchung durch, besonders wichtig bei Springpferden",
                  "image": "https://pferdewert.de/images/aku-spring.jpg"
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
              "knowsAbout": ["Pferdebewertung", "Springpferde", "Pferdepreise", "KI-Analyse", "Pferdehandel"]
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
                  "name": "Was kostet ein gutes Springpferd?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Springpferde kosten je nach Klasse: E-Springen 2.500-8.000€, A-Springen 5.000-15.000€, L-Springen 12.000-30.000€, M-Springen 20.000-60.000€, S-Springen 40.000-500.000€+. Ausbildungsstand, Turniererfolge und Abstammung beeinflussen den Preis stark."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Bewertungskriterien sind bei Springpferden wichtig?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wichtigste Kriterien: Springvermögen (40% Gewichtung), Rittigkeit (25%), Exterieur (20%) und Charakter (15%). Besonders entscheidend sind Absprungkraft, Bascule, Wendigkeit und Nervenstärke im Parcours."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Zuchtrichtungen eignen sich für Springpferde?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top-Zuchtrichtungen: Holsteiner (große Sprungkraft, 15.000-80.000€), Oldenburger (moderne Springer, 18.000-100.000€), Hannoveraner (vielseitig, 12.000-60.000€) und Westfalen (kraftvoll, 10.000-50.000€)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wie teste ich das Springvermögen eines Pferdes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Testen Sie Absprungkraft, Bascule (Wölbung über dem Hindernis), Wendigkeit und Einstellbarkeit. Wichtig sind auch Mut und Vorsicht im ausgewogenen Verhältnis. Eine Probereitsitzung mit verschiedenen Hindernishöhen ist empfehlenswert."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Ist eine AKU bei Springpferden besonders wichtig?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, da Springpferde extremen Belastungen ausgesetzt sind. Besonders wichtig: Röntgen der Gliedmaßen, Herz-Kreislauf-Check und Rückenuntersuchung. Bei wertvollen Springpferden ist eine große AKU (Klasse III-V) empfehlenswert."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <main className={`min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Springpferd kaufen
                <span className="block text-yellow-300 text-3xl md:text-4xl mt-2">
                  Marktpreise & KI-Bewertung
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 leading-relaxed">
                Aktuelle Preise, Bewertungskriterien und Marktanalyse.
                KI-gestützte Preiseinschätzung für Springpferde aller Klassen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={toggleAdvancedFilter}
                  className="bg-yellow-400 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
                >
                  Springpferd-Filter starten
                </button>
                <Link
                  href="/was-ist-mein-pferd-wert"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-800 transition-colors"
                >
                  Kostenlose Bewertung
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Spring-Klassen Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                Spring-Klassen & Preiskategorien
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Von E-Springen bis S-Springen - finden Sie das passende Springpferd für Ihr Level und Budget
              </p>

              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {springKlassen.map((klasse) => (
                  <div
                    key={klasse.hoehe}
                    className={`bg-gradient-to-br from-green-50 to-white p-6 rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                      selectedKlasse === klasse.hoehe
                        ? 'border-green-500 shadow-xl transform scale-105'
                        : 'border-gray-200 hover:border-green-300 hover:shadow-xl'
                    }`}
                    onClick={() => handleKlasseSelect(klasse.hoehe)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-green-800">{klasse.hoehe}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {klasse.preisspanne}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{klasse.bezeichnung}</h4>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Anforderungen:</p>
                      <ul className="space-y-1">
                        {klasse.anforderungen.map((anforderung, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                            {anforderung}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-600 mb-2">Hindernistypen:</p>
                      <div className="flex flex-wrap gap-1">
                        {klasse.hindernistypen.map((typ, idx) => (
                          <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                            {typ}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 font-medium">Zielgruppe:</p>
                      <p className="text-gray-700 text-sm">{klasse.zielgruppe}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Filter Section */}
        {showAdvancedFilter && (
          <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Springpferd-Filter
                </h2>

                <div className="bg-white rounded-xl shadow-lg p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-4">
                        Gewünschte Spring-Klasse:
                      </label>
                      <select
                        value={selectedKlasse}
                        onChange={(e) => handleKlasseSelect(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Klasse auswählen...</option>
                        {springKlassen.map(klasse => (
                          <option key={klasse.hoehe} value={klasse.hoehe}>
                            {klasse.hoehe} - {klasse.bezeichnung}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-4">
                        Budget-Range:
                      </label>
                      <select
                        value={selectedBudget}
                        onChange={(e) => handleBudgetSelect(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

                  {selectedKlasse && selectedBudget && (
                    <div className="mt-8 p-6 bg-green-50 rounded-lg">
                      <h3 className="text-xl font-bold text-green-800 mb-4">Empfehlung für Ihre Auswahl:</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Für {selectedKlasse} in Ihrer Budget-Range finden Sie passende Springpferde.
                        Nutzen Sie unsere KI-Bewertung für eine präzise Marktanalyse und faire Preiseinschätzung.
                      </p>
                      <Link
                        href="/was-ist-mein-pferd-wert"
                        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Springpferd bewerten lassen
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
                Bewertungskriterien für Springpferde
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Professionelle Kriterien für die objektive Bewertung von Springpferden
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {bewertungskriterien.map((kriterium) => (
                  <div key={kriterium.kategorie} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{kriterium.kategorie}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                        {kriterium.gewichtung}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Eigenschaften:</h4>
                      <ul className="space-y-1">
                        {kriterium.eigenschaften.map((eigenschaft, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0"></span>
                            {eigenschaft}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Bewertungsaspekte:</h4>
                      <ul className="space-y-1">
                        {kriterium.bewertungsaspekte.map((aspekt, idx) => (
                          <li key={idx} className="flex items-center text-gray-600 text-sm">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></span>
                            {aspekt}
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

        {/* Zuchtrichtungen */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                Top Zuchtrichtungen für Springpferde
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Die besten deutschen Zuchtrichtungen für Springpferde mit Preisübersicht
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                {zuchtrichtungen.map((zucht) => (
                  <div key={zucht.richtung} className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl shadow-lg border border-amber-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{zucht.richtung}</h3>
                      <span className="bg-amber-100 text-amber-800 px-3 py-2 rounded-lg text-sm font-bold">
                        {zucht.typischePreise}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Hauptmerkmale:</h4>
                      <ul className="space-y-1">
                        {zucht.hauptmerkmale.map((merkmal, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mr-3 flex-shrink-0"></span>
                            {merkmal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Bekannte Blutlinien:</h4>
                      <div className="flex flex-wrap gap-2">
                        {zucht.bekannteBlutlinien.map((linie, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {linie}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                Häufige Fragen zum Springpferdekauf
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12">
                Antworten auf die wichtigsten Fragen rund um den Kauf von Springpferden
              </p>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Was kostet ein gutes Springpferd?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Springpferde kosten je nach Klasse: E-Springen 2.500-8.000€, A-Springen 5.000-15.000€,
                    L-Springen 12.000-30.000€, M-Springen 20.000-60.000€, S-Springen 40.000-500.000€+.
                    Ausbildungsstand, Turniererfolge und Abstammung beeinflussen den Preis stark.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Welche Bewertungskriterien sind bei Springpferden wichtig?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Wichtigste Kriterien: Springvermögen (40% Gewichtung), Rittigkeit (25%), Exterieur (20%)
                    und Charakter (15%). Besonders entscheidend sind Absprungkraft, Bascule, Wendigkeit
                    und Nervenstärke im Parcours.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Welche Zuchtrichtungen eignen sich für Springpferde?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Top-Zuchtrichtungen: Holsteiner (große Sprungkraft, 15.000-80.000€), Oldenburger
                    (moderne Springer, 18.000-100.000€), Hannoveraner (vielseitig, 12.000-60.000€)
                    und Westfalen (kraftvoll, 10.000-50.000€).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Wie teste ich das Springvermögen eines Pferdes?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Testen Sie Absprungkraft, Bascule (Wölbung über dem Hindernis), Wendigkeit und Einstellbarkeit.
                    Wichtig sind auch Mut und Vorsicht im ausgewogenen Verhältnis. Eine Probereitsitzung
                    mit verschiedenen Hindernishöhen ist empfehlenswert.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Ist eine AKU bei Springpferden besonders wichtig?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ja, da Springpferde extremen Belastungen ausgesetzt sind. Besonders wichtig: Röntgen der Gliedmaßen,
                    Herz-Kreislauf-Check und Rückenuntersuchung. Bei wertvollen Springpferden ist eine große AKU
                    (Klasse III-V) empfehlenswert.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bereit für Ihre Springpferd-Bewertung?
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Nutzen Sie unsere KI-gestützte Analyse für eine präzise Marktbewertung Ihres Wunsch-Springpferdes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/was-ist-mein-pferd-wert"
                  className="bg-yellow-400 text-green-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
                >
                  Kostenlose Bewertung starten
                </Link>
                <Link
                  href="/beispiel-analyse"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-green-800 transition-colors"
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

export default SpringpferdKaufen;