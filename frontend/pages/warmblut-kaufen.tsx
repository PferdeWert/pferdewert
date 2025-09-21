import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { info } from '@/lib/log';

interface WarmblutZucht {
  name: string;
  ursprung: string;
  eigenschaften: string[];
  preisspanne: string;
  geeignetFuer: string;
  koerpergroesse: string;
  besonderheiten: string;
}

interface ZuechtungsZiel {
  kategorie: string;
  bezeichnung: string;
  anforderungen: string[];
  preisspanne: string;
  zielgruppe: string;
  ausbildungsstand: string;
}

interface BewertungskriteriumWarmblut {
  kategorie: string;
  gewichtung: number;
  beschreibung: string;
  bewertungsfaktoren: string[];
}

interface WarmblutBudget {
  bereich: string;
  preisspanne: string;
  beschreibung: string;
  empfohleneZuchten: string[];
}

const warmblutZuchten: WarmblutZucht[] = [
  {
    name: 'Hannoveraner',
    ursprung: 'Niedersachsen, Deutschland',
    eigenschaften: ['Vielseitigkeit', 'Leistungsbereitschaft', 'Gute Rittigkeit', 'Springvermögen'],
    preisspanne: '8.000 - 45.000€',
    geeignetFuer: 'Dressur, Springen, Vielseitigkeit',
    koerpergroesse: '158-175 cm',
    besonderheiten: 'Weltweite Anerkennung als Sportpferd'
  },
  {
    name: 'Oldenburger',
    ursprung: 'Oldenburg, Deutschland',
    eigenschaften: ['Eleganz', 'Bewegungsqualität', 'Springtechnik', 'Charakter'],
    preisspanne: '7.500 - 40.000€',
    geeignetFuer: 'Dressur, Springen, Fahren',
    koerpergroesse: '160-178 cm',
    besonderheiten: 'Besonders für Dressur und Fahrsport geeignet'
  },
  {
    name: 'Holsteiner',
    ursprung: 'Schleswig-Holstein, Deutschland',
    eigenschaften: ['Springveranlagung', 'Mut', 'Athletik', 'Robustheit'],
    preisspanne: '9.000 - 50.000€',
    geeignetFuer: 'Springen, Vielseitigkeit, Military',
    koerpergroesse: '162-175 cm',
    besonderheiten: 'Hervorragende Springpferde-Zucht'
  },
  {
    name: 'Trakehner',
    ursprung: 'Ostpreußen (heute Russland/Polen)',
    eigenschaften: ['Adel', 'Härte', 'Ausdauer', 'Vielseitigkeit'],
    preisspanne: '6.000 - 35.000€',
    geeignetFuer: 'Dressur, Springen, Vielseitigkeit',
    koerpergroesse: '160-170 cm',
    besonderheiten: 'Älteste deutsche Warmblutzucht'
  },
  {
    name: 'Württemberger',
    ursprung: 'Baden-Württemberg, Deutschland',
    eigenschaften: ['Kraft', 'Ausdauer', 'Gutmütigkeit', 'Vielseitigkeit'],
    preisspanne: '5.500 - 28.000€',
    geeignetFuer: 'Fahren, Freizeit, leichter Sport',
    koerpergroesse: '155-170 cm',
    besonderheiten: 'Traditionelle süddeutsche Zucht'
  }
];

const zuechtungsZiele: ZuechtungsZiel[] = [
  {
    kategorie: 'Sportpferd',
    bezeichnung: 'Hochleistungs-Sportpferd',
    anforderungen: ['Spitzenvererbung', 'Turniererfolge', 'Gesundheitszeugnis', 'Röntgen'],
    preisspanne: '25.000 - 80.000€',
    zielgruppe: 'Professionelle Reiter, Turniersport',
    ausbildungsstand: 'Klasse L/M oder höher'
  },
  {
    kategorie: 'Zuchtstute',
    bezeichnung: 'Zuchtstute mit Papieren',
    anforderungen: ['Zuchtbucheintragung', 'Körung', 'Abstammungsnachweis', 'Fruchtbarkeit'],
    preisspanne: '15.000 - 60.000€',
    zielgruppe: 'Züchter, Zuchtbetriebe',
    ausbildungsstand: 'Grundausbildung oder höher'
  },
  {
    kategorie: 'Deckhengst',
    bezeichnung: 'Gekörter Deckhengst',
    anforderungen: ['Körung bestanden', 'Leistungsprüfung', 'Gesundheit', 'Vererbung'],
    preisspanne: '35.000 - 150.000€',
    zielgruppe: 'Zuchtverbände, private Züchter',
    ausbildungsstand: 'Mindestens Klasse L'
  },
  {
    kategorie: 'Freizeitpferd',
    bezeichnung: 'Warmblut für Freizeit',
    anforderungen: ['Gesundheit', 'Charakter', 'Grundausbildung', 'Gelassenheit'],
    preisspanne: '4.000 - 18.000€',
    zielgruppe: 'Hobbyreiter, Freizeitreiter',
    ausbildungsstand: 'Angeritten bis Klasse A'
  },
  {
    kategorie: 'Nachwuchspferd',
    bezeichnung: 'Jungpferd 3-5 Jahre',
    anforderungen: ['Gute Abstammung', 'Entwicklungspotential', 'Gesundheit', 'Bewegungsqualität'],
    preisspanne: '6.000 - 25.000€',
    zielgruppe: 'Ausbilder, ambitionierte Amateure',
    ausbildungsstand: 'Ungeritten bis angeritten'
  }
];

const bewertungskriterien: BewertungskriteriumWarmblut[] = [
  {
    kategorie: 'Abstammung & Zucht',
    gewichtung: 35,
    beschreibung: 'Herkunft, Papiere und Zuchtbuchstatus',
    bewertungsfaktoren: ['Zuchtbucheintragung', 'Mutter-/Vaterlinie', 'Züchter-Reputation', 'Verwandtschaft zu Sportpferden']
  },
  {
    kategorie: 'Exterieur & Typ',
    gewichtung: 25,
    beschreibung: 'Körperbau, Rassemerkmal und äußere Erscheinung',
    bewertungsfaktoren: ['Rassemerkmal', 'Proportionen', 'Fundament', 'Geschlechtsausprägung']
  },
  {
    kategorie: 'Bewegungsqualität',
    gewichtung: 25,
    beschreibung: 'Gangarten, Elastizität und Bewegungsablauf',
    bewertungsfaktoren: ['Taktklarheit', 'Schwung', 'Raumgriff', 'Elastizität']
  },
  {
    kategorie: 'Charakter & Gesundheit',
    gewichtung: 15,
    beschreibung: 'Temperament, Umgänglichkeit und körperliche Verfassung',
    bewertungsfaktoren: ['Rittigkeit', 'Nervenstärke', 'Gesundheitszeugnis', 'Leistungsbereitschaft']
  }
];

const budgetBereiche: WarmblutBudget[] = [
  {
    bereich: 'Einsteiger',
    preisspanne: '4.000 - 12.000€',
    beschreibung: 'Ältere Warmblüter oder Freizeitpferde ohne Sport-Ambitionen',
    empfohleneZuchten: ['Württemberger', 'Regional-Warmblut']
  },
  {
    bereich: 'Mittelklasse',
    preisspanne: '12.000 - 25.000€',
    beschreibung: 'Gut ausgebildete Warmblüter mit Turnierpotential',
    empfohleneZuchten: ['Hannoveraner', 'Oldenburger', 'Trakehner']
  },
  {
    bereich: 'Gehobene Klasse',
    preisspanne: '25.000 - 50.000€',
    beschreibung: 'Turniererfahrene Warmblüter oder vielversprechende Nachwuchspferde',
    empfohleneZuchten: ['Hannoveraner', 'Holsteiner', 'Oldenburger']
  },
  {
    bereich: 'Premium',
    preisspanne: '50.000€+',
    beschreibung: 'Spitzensportpferde, gekörte Hengste oder Elite-Zuchtstuten',
    empfohleneZuchten: ['Alle Zuchtrichtungen möglich']
  }
];

const WarmblutKaufen: NextPage = () => {
  const [selectedZucht, setSelectedZucht] = useState<string>('');
  const [selectedZiel, setSelectedZiel] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
      info('GA4 Event:', eventName, parameters);
    }
  }, []);

  useEffect(() => {
    trackEvent('page_view_warmblut_kaufen', {
      page_title: 'Warmblut Pferd kaufen',
      page_location: window.location.href
    });
  }, [trackEvent]);

  const handleZuchtSelection = (zuchtName: string) => {
    setSelectedZucht(zuchtName);
    trackEvent('warmblut_zucht_selected', {
      zucht: zuchtName,
      category: 'breed_selection'
    });
  };

  const handleZielSelection = (ziel: string) => {
    setSelectedZiel(ziel);
    trackEvent('warmblut_ziel_selected', {
      ziel: ziel,
      category: 'purpose_selection'
    });
  };

  const handleBudgetSelection = (budget: string) => {
    setSelectedBudget(budget);
    setShowResults(true);
    trackEvent('warmblut_budget_selected', {
      budget: budget,
      category: 'budget_selection'
    });
  };

  const calculateEstimatedPrice = () => {
    const selectedZuchtData = warmblutZuchten.find(z => z.name === selectedZucht);
    const selectedZielData = zuechtungsZiele.find(z => z.kategorie === selectedZiel);

    if (!selectedZuchtData || !selectedZielData) return 'Nicht verfügbar';

    // Extract price ranges and calculate average
    const zuchtPrice = selectedZuchtData.preisspanne.match(/(\d+\.?\d*)/g);
    const zielPrice = selectedZielData.preisspanne.match(/(\d+\.?\d*)/g);

    if (zuchtPrice && zielPrice) {
      const zuchtAvg = (parseInt(zuchtPrice[0]) + parseInt(zuchtPrice[1])) / 2;
      const zielAvg = (parseInt(zielPrice[0]) + parseInt(zielPrice[1])) / 2;
      const estimate = Math.round((zuchtAvg + zielAvg) / 2);
      return `${estimate.toLocaleString()}€`;
    }

    return 'Bitte wählen Sie Zucht und Ziel aus';
  };

  return (
    <>
      <Head>
        <title>Warmblut Pferd kaufen - Preise & Züchter | PferdeWert.de</title>
        <meta name="description" content="Warmblut Pferd kaufen: Marktpreise, renommierte Züchter und Bewertungskriterien. KI-Analyse hilft bei der Preisfindung für Warmblüter." />
        <meta name="keywords" content="warmblut pferd kaufen, warmblut preise, warmblut züchter, hannoveraner kaufen, oldenburger kaufen, holsteiner kaufen, trakehner kaufen" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="German" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <link rel="canonical" href="https://pferdewert.de/warmblut-kaufen" />
        <meta property="og:title" content="Warmblut Pferd kaufen - Preise & Züchter | PferdeWert.de" />
        <meta property="og:description" content="Warmblut Pferd kaufen: Marktpreise, renommierte Züchter und Bewertungskriterien. KI-Analyse hilft bei der Preisfindung für Warmblüter." />
        <meta property="og:url" content="https://pferdewert.de/warmblut-kaufen" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pferdewert.de/images/warmblut-kaufen-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Warmblut Pferd kaufen - Preise & Züchter | PferdeWert.de" />
        <meta name="twitter:description" content="Warmblut Pferd kaufen: Marktpreise, renommierte Züchter und Bewertungskriterien. KI-Analyse hilft bei der Preisfindung für Warmblüter." />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="prefetch" href="/pferdebewertung" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "Warmblut Pferd kaufen - Kompletter Leitfaden",
              "description": "Schritt-für-Schritt Anleitung zum Kauf eines Warmblut Pferdes mit Preisanalyse und Züchter-Bewertung",
              "image": "https://pferdewert.de/images/warmblut-kaufen-guide.jpg",
              "totalTime": "PT30M",
              "supply": [
                {
                  "@type": "HowToSupply",
                  "name": "Budget festlegen"
                },
                {
                  "@type": "HowToSupply",
                  "name": "Zuchtrichtung wählen"
                },
                {
                  "@type": "HowToSupply",
                  "name": "AKU vereinbaren"
                }
              ],
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Zuchtrichtung bestimmen",
                  "text": "Wählen Sie zwischen Hannoveraner, Oldenburger, Holsteiner, Trakehner oder Württemberger je nach Verwendungszweck",
                  "image": "https://pferdewert.de/images/warmblut-zuchten.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Budget definieren",
                  "text": "Definieren Sie Ihr Budget: Einsteiger (4.000-12.000€), Mittelklasse (12.000-25.000€), Gehobene Klasse (25.000-50.000€) oder Premium (50.000€+)",
                  "image": "https://pferdewert.de/images/warmblut-budget.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Verwendungszweck festlegen",
                  "text": "Bestimmen Sie den Zweck: Sportpferd, Zuchtstute, Deckhengst, Freizeitpferd oder Nachwuchspferd",
                  "image": "https://pferdewert.de/images/warmblut-verwendung.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Abstammung prüfen",
                  "text": "Überprüfen Sie Zuchtbucheintragung, Mutter-/Vaterlinie und Verwandtschaft zu erfolgreichen Sportpferden",
                  "image": "https://pferdewert.de/images/warmblut-abstammung.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Ankaufsuntersuchung",
                  "text": "Lassen Sie eine professionelle AKU durchführen und prüfen Sie Gesundheitszeugnis sowie Röntgenbilder",
                  "image": "https://pferdewert.de/images/warmblut-aku.jpg"
                }
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PferdeWert.de",
              "url": "https://pferdewert.de",
              "logo": "https://pferdewert.de/logo.png",
              "description": "Deutschlands führende Plattform für KI-gestützte Pferdebewertung und Marktpreisanalyse",
              "sameAs": [
                "https://www.facebook.com/pferdewert",
                "https://www.instagram.com/pferdewert.de"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+49-XXX-XXXXXXX",
                "contactType": "customer service",
                "availableLanguage": "German"
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Was kostet ein Warmblut Pferd?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die Preise für Warmblut Pferde variieren stark je nach Zucht, Ausbildungsstand und Verwendungszweck. Freizeitpferde kosten 4.000-18.000€, Sportpferde 25.000-80.000€ und Zuchtstuten 15.000-60.000€."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Warmblut-Zucht ist die beste?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die beste Zucht hängt vom Verwendungszweck ab: Hannoveraner für Vielseitigkeit, Holsteiner für Springen, Oldenburger für Dressur, Trakehner für Vielseitigkeit und Württemberger für Fahren und Freizeit."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Worauf sollte ich beim Warmblut-Kauf achten?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Achten Sie auf Abstammung (35%), Exterieur & Typ (25%), Bewegungsqualität (25%) und Charakter & Gesundheit (15%). Eine professionelle AKU ist bei höheren Preisklassen unerlässlich."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Ist eine AKU beim Warmblut-Kauf notwendig?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bei Warmblütern ab 15.000€ ist eine AKU dringend empfohlen. Sie deckt gesundheitliche Probleme auf und kann den Kaufpreis beeinflussen. Kosten: 300-800€ je nach Umfang."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Wie erkenne ich ein gutes Warmblut?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ein gutes Warmblut zeigt klare Rassemerkmal, korrekte Proportionen, gute Bewegungsqualität, einen ausgeglichenen Charakter und stammt idealerweise aus erfolgreichen Sport- oder Zuchtlinien."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Warmblut Pferd kaufen
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Marktpreise, renommierte Züchter und KI-gestützte Bewertung für den perfekten Warmblut-Kauf
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => trackEvent('hero_cta_bewertung', { source: 'warmblut_kaufen' })}
                  className="bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
                >
                  Warmblut bewerten lassen
                </button>
                <button
                  onClick={() => trackEvent('hero_cta_preisrechner', { source: 'warmblut_kaufen' })}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  Preisrechner starten
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Warmblut Selector */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Finden Sie Ihr ideales Warmblut
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nutzen Sie unseren interaktiven Ratgeber zur Auswahl der passenden Zucht und Preisklasse
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Zucht Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Zuchtrichtung wählen</h3>
                <div className="space-y-3">
                  {warmblutZuchten.map((zucht) => (
                    <button
                      key={zucht.name}
                      onClick={() => handleZuchtSelection(zucht.name)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedZucht === zucht.name
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-semibold">{zucht.name}</div>
                      <div className="text-sm text-gray-600">{zucht.ursprung}</div>
                      <div className="text-sm font-medium text-blue-600">{zucht.preisspanne}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verwendungszweck Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">2. Verwendungszweck</h3>
                <div className="space-y-3">
                  {zuechtungsZiele.map((ziel) => (
                    <button
                      key={ziel.kategorie}
                      onClick={() => handleZielSelection(ziel.kategorie)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedZiel === ziel.kategorie
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-semibold">{ziel.bezeichnung}</div>
                      <div className="text-sm text-gray-600">{ziel.zielgruppe}</div>
                      <div className="text-sm font-medium text-green-600">{ziel.preisspanne}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">3. Budget festlegen</h3>
                <div className="space-y-3">
                  {budgetBereiche.map((budget) => (
                    <button
                      key={budget.bereich}
                      onClick={() => handleBudgetSelection(budget.bereich)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedBudget === budget.bereich
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="font-semibold">{budget.bereich}</div>
                      <div className="text-sm text-gray-600">{budget.beschreibung}</div>
                      <div className="text-sm font-medium text-orange-600">{budget.preisspanne}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            {showResults && selectedZucht && selectedZiel && (
              <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Ihre Warmblut-Empfehlung
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Gewählte Kombination:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Zucht:</strong> {selectedZucht}</li>
                      <li><strong>Verwendung:</strong> {selectedZiel}</li>
                      <li><strong>Budget:</strong> {selectedBudget}</li>
                      <li><strong>Geschätzter Preis:</strong> {calculateEstimatedPrice()}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Nächste Schritte:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>✓ Züchter in Ihrer Region kontaktieren</li>
                      <li>✓ Abstammungspapiere prüfen</li>
                      <li>✓ Probereiten vereinbaren</li>
                      <li>✓ AKU durch Tierarzt durchführen lassen</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Bewertungskriterien */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bewertungskriterien für Warmblüter
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Unsere KI-Analyse bewertet Warmblüter nach wissenschaftlichen Kriterien
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bewertungskriterien.map((kriterium, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{kriterium.kategorie}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {kriterium.gewichtung}%
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{kriterium.beschreibung}</p>
                  <ul className="space-y-1">
                    {kriterium.bewertungsfaktoren.map((faktor, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {faktor}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zuchtrichtungen Detail */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Deutsche Warmblut-Zuchten im Überblick
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Jede Zuchtrichtung hat ihre besonderen Stärken und Eigenschaften
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {warmblutZuchten.map((zucht, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{zucht.name}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {zucht.preisspanne}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Ursprung:</h4>
                        <p className="text-gray-700">{zucht.ursprung}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Körpergröße:</h4>
                        <p className="text-gray-700">{zucht.koerpergroesse}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Eigenschaften:</h4>
                        <div className="flex flex-wrap gap-2">
                          {zucht.eigenschaften.map((eigenschaft, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {eigenschaft}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Geeignet für:</h4>
                        <p className="text-gray-700">{zucht.geeignetFuer}</p>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Besonderheit:</h4>
                        <p className="text-yellow-700">{zucht.besonderheiten}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Häufige Fragen zum Warmblut-Kauf
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Was kostet ein Warmblut Pferd?</h3>
                <p className="text-gray-700">
                  Die Preise für Warmblut Pferde variieren stark je nach Zucht, Ausbildungsstand und Verwendungszweck.
                  Freizeitpferde kosten 4.000-18.000€, Sportpferde 25.000-80.000€ und Zuchtstuten 15.000-60.000€.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Welche Warmblut-Zucht ist die beste?</h3>
                <p className="text-gray-700">
                  Die beste Zucht hängt vom Verwendungszweck ab: Hannoveraner für Vielseitigkeit, Holsteiner für Springen,
                  Oldenburger für Dressur, Trakehner für Vielseitigkeit und Württemberger für Fahren und Freizeit.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Worauf sollte ich beim Warmblut-Kauf achten?</h3>
                <p className="text-gray-700">
                  Achten Sie auf Abstammung (35%), Exterieur & Typ (25%), Bewegungsqualität (25%) und Charakter & Gesundheit (15%).
                  Eine professionelle AKU ist bei höheren Preisklassen unerlässlich.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ist eine AKU beim Warmblut-Kauf notwendig?</h3>
                <p className="text-gray-700">
                  Bei Warmblütern ab 15.000€ ist eine AKU dringend empfohlen. Sie deckt gesundheitliche Probleme auf und kann
                  den Kaufpreis beeinflussen. Kosten: 300-800€ je nach Umfang.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Wie erkenne ich ein gutes Warmblut?</h3>
                <p className="text-gray-700">
                  Ein gutes Warmblut zeigt klare Rassemerkmal, korrekte Proportionen, gute Bewegungsqualität, einen ausgeglichenen
                  Charakter und stammt idealerweise aus erfolgreichen Sport- oder Zuchtlinien.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Lassen Sie Ihr Warmblut professionell bewerten
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Unsere KI-gestützte Analyse hilft Ihnen bei der Preisfindung für Ihren Warmblut-Kauf oder -Verkauf
            </p>
            <button
              onClick={() => trackEvent('cta_final_bewertung', { source: 'warmblut_kaufen_bottom' })}
              className="bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors"
            >
              Jetzt Warmblut bewerten lassen
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default WarmblutKaufen;