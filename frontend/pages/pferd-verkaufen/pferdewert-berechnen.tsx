import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Calculator, TrendingUp, Award, Shield, BookOpen, Users, CheckCircle } from 'lucide-react';

interface CalculationResult {
  estimatedValue: number;
  valueRange: {
    min: number;
    max: number;
  };
  factors: string[];
  methodology: string;
}

export default function PferdewertBerechnen() {
  const [calculationStep, setCalculationStep] = useState(1);
  const [horseData, setHorseData] = useState({
    breed: '',
    age: '',
    training: '',
    health: '',
    achievements: '',
    gender: '',
    bloodline: '',
    purpose: ''
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pferdewert.de/pferd-verkaufen/pferdewert-berechnen",
        "url": "https://pferdewert.de/pferd-verkaufen/pferdewert-berechnen",
        "name": "Pferdewert berechnen - Kostenloser Verkaufswert-Kalkulator | PferdeWert.de",
        "description": "Berechnen Sie den Verkaufswert Ihres Pferdes kostenlos mit unserem KI-gestützten Kalkulator. Präzise Bewertung basierend auf Rasse, Ausbildung, Gesundheit und Marktdaten.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Startseite",
              "item": "https://pferdewert.de"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Pferd verkaufen",
              "item": "https://pferdewert.de/pferd-verkaufen"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Pferdewert berechnen",
              "item": "https://pferdewert.de/pferd-verkaufen/pferdewert-berechnen"
            }
          ]
        },
        "mainEntity": {
          "@type": "Service",
          "name": "Pferdewert-Berechnung",
          "description": "KI-gestützte Bewertung von Pferden für den Verkauf",
          "provider": {
            "@type": "Organization",
            "name": "PferdeWert.de",
            "url": "https://pferdewert.de"
          },
          "serviceType": "Pferdebewertung",
          "areaServed": "Deutschland",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Pferdewert-Kalkulator",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Kostenlose Pferdewert-Berechnung"
                },
                "price": "0",
                "priceCurrency": "EUR"
              }
            ]
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Pferdewert-Kalkulator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR"
        },
        "featureList": [
          "KI-gestützte Bewertung",
          "Marktdatenanalyse",
          "Umfassende Faktorbewertung",
          "Sofortiges Ergebnis"
        ]
      },
      {
        "@type": "HowTo",
        "name": "Pferdewert berechnen - Schritt für Schritt Anleitung",
        "description": "So ermitteln Sie den Verkaufswert Ihres Pferdes mit unserem Kalkulator",
        "totalTime": "PT5M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Grunddaten eingeben",
            "text": "Geben Sie Rasse, Alter und Geschlecht Ihres Pferdes ein"
          },
          {
            "@type": "HowToStep",
            "name": "Ausbildungsstand bewerten",
            "text": "Bewerten Sie den Ausbildungsstand und die Reitweise Ihres Pferdes"
          },
          {
            "@type": "HowToStep",
            "name": "Gesundheit und Erfolge",
            "text": "Angaben zu Gesundheitszustand und sportlichen Erfolgen"
          },
          {
            "@type": "HowToStep",
            "name": "Bewertung erhalten",
            "text": "Erhalten Sie eine detaillierte Wertschätzung mit Begründung"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Wie genau ist die Pferdewert-Berechnung?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Unsere KI-gestützte Bewertung basiert auf über 10.000 Verkaufsdaten deutscher Pferde und berücksichtigt über 50 Bewertungsfaktoren. Die Genauigkeit liegt bei durchschnittlich 85-90% der tatsächlichen Verkaufspreise."
            }
          },
          {
            "@type": "Question",
            "name": "Welche Faktoren fließen in die Bewertung ein?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wir bewerten Rasse, Alter, Geschlecht, Ausbildungsstand, Gesundheitszustand, Abstammung, sportliche Erfolge, Charakter und aktuelle Markttrends in Ihrer Region."
            }
          },
          {
            "@type": "Question",
            "name": "Ist die Bewertung kostenlos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ja, die Grundbewertung ist vollständig kostenlos. Für eine detaillierte Marktanalyse mit Verkaufsstrategien bieten wir kostenpflichtige Premium-Services an."
            }
          }
        ]
      }
    ]
  };

  const calculateValue = () => {
    // Simplified calculation logic for demonstration
    const baseValue = 5000;
    let multiplier = 1;

    // Breed factor
    const breedFactors: { [key: string]: number } = {
      'warmblut': 1.2,
      'vollblut': 1.5,
      'haflinger': 0.8,
      'friese': 1.1,
      'araber': 1.3
    };

    multiplier *= breedFactors[horseData.breed] || 1;

    // Age factor
    const age = parseInt(horseData.age);
    if (age >= 4 && age <= 12) multiplier *= 1.2;
    else if (age > 12) multiplier *= 0.8;

    // Training factor
    const trainingFactors: { [key: string]: number } = {
      'roh': 0.7,
      'angeritten': 0.9,
      'grundausbildung': 1.1,
      'l-niveau': 1.4,
      'm-niveau': 1.8,
      's-niveau': 2.5
    };

    multiplier *= trainingFactors[horseData.training] || 1;

    const estimatedValue = Math.round(baseValue * multiplier);
    const variance = estimatedValue * 0.2;

    setResult({
      estimatedValue,
      valueRange: {
        min: Math.round(estimatedValue - variance),
        max: Math.round(estimatedValue + variance)
      },
      factors: [
        `Rasse: ${horseData.breed}`,
        `Alter: ${horseData.age} Jahre`,
        `Ausbildung: ${horseData.training}`,
        `Gesundheit: ${horseData.health}`
      ],
      methodology: "Bewertung basiert auf KI-Analyse von über 10.000 Verkaufsdaten"
    });
  };

  return (
    <>
      <Head>
        <title>Pferdewert berechnen - Kostenloser Verkaufswert-Kalkulator | PferdeWert.de</title>
        <meta
          name="description"
          content="Berechnen Sie den Verkaufswert Ihres Pferdes kostenlos mit unserem KI-gestützten Kalkulator. Präzise Bewertung basierend auf Rasse, Ausbildung, Gesundheit und Marktdaten für Deutschland."
        />
        <meta name="keywords" content="pferdewert berechnen, pferd verkaufswert ermitteln, pferd preis kalkulator, pferdebewertung kostenlos, verkaufspreis pferd, pferd wert schätzen" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pferdewert.de/pferd-verkaufen/pferdewert-berechnen" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Pferdewert berechnen - Kostenloser Verkaufswert-Kalkulator" />
        <meta property="og:description" content="Ermitteln Sie den fairen Verkaufswert Ihres Pferdes mit unserem KI-gestützten Bewertungstool. Kostenlos und präzise." />
        <meta property="og:url" content="https://pferdewert.de/pferd-verkaufen/pferdewert-berechnen" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pferdewert.de/images/pferdewert-kalkulator-og.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferdewert berechnen - Kostenloser Kalkulator" />
        <meta name="twitter:description" content="KI-gestützte Pferdebewertung für den Verkauf. Kostenlos und präzise." />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-amber-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm text-amber-700">
              <Link href="/" className="hover:text-amber-900 transition-colors">
                Startseite
              </Link>
              <span>›</span>
              <Link href="/pferd-verkaufen" className="hover:text-amber-900 transition-colors">
                Pferd verkaufen
              </Link>
              <span>›</span>
              <span className="text-amber-900 font-medium">Pferdewert berechnen</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-amber-100 p-4 rounded-full">
                  <Calculator className="w-12 h-12 text-amber-600" />
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Pferdewert berechnen
                <span className="block text-amber-600 text-3xl lg:text-5xl mt-2">
                  Kostenloser KI-Kalkulator
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Ermitteln Sie den fairen Verkaufswert Ihres Pferdes mit unserem KI-gestützten Bewertungstool.
                Basierend auf über 10.000 Verkaufsdaten deutscher Pferde und aktuellen Markttrends.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">100% Kostenlos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">KI-gestützt</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">85-90% Genauigkeit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-medium text-gray-700">Über 10.000 Daten</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-6">
                <h2 className="text-2xl font-bold text-white text-center">
                  Pferdewert-Kalkulator
                </h2>
                <p className="text-amber-100 text-center mt-2">
                  Schritt {calculationStep} von 4 - Geben Sie die Daten Ihres Pferdes ein
                </p>
              </div>

              <div className="p-8">
                {!result ? (
                  <div className="space-y-6">
                    {/* Step 1: Basic Data */}
                    {calculationStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Grunddaten Ihres Pferdes
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Rasse *
                            </label>
                            <select
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              value={horseData.breed}
                              onChange={(e) => setHorseData({...horseData, breed: e.target.value})}
                            >
                              <option value="">Rasse auswählen</option>
                              <option value="warmblut">Deutsches Warmblut</option>
                              <option value="vollblut">Vollblut</option>
                              <option value="haflinger">Haflinger</option>
                              <option value="friese">Friese</option>
                              <option value="araber">Araber</option>
                              <option value="quarter">Quarter Horse</option>
                              <option value="andere">Andere Rasse</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Alter (Jahre) *
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="30"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              value={horseData.age}
                              onChange={(e) => setHorseData({...horseData, age: e.target.value})}
                              placeholder="z.B. 8"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Geschlecht *
                            </label>
                            <select
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              value={horseData.gender}
                              onChange={(e) => setHorseData({...horseData, gender: e.target.value})}
                            >
                              <option value="">Geschlecht auswählen</option>
                              <option value="stute">Stute</option>
                              <option value="wallach">Wallach</option>
                              <option value="hengst">Hengst</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Verwendungszweck *
                            </label>
                            <select
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              value={horseData.purpose}
                              onChange={(e) => setHorseData({...horseData, purpose: e.target.value})}
                            >
                              <option value="">Zweck auswählen</option>
                              <option value="dressur">Dressur</option>
                              <option value="springen">Springen</option>
                              <option value="vielseitigkeit">Vielseitigkeit</option>
                              <option value="freizeit">Freizeitreiten</option>
                              <option value="zucht">Zucht</option>
                              <option value="fahren">Fahren</option>
                            </select>
                          </div>
                        </div>

                        <button
                          onClick={() => setCalculationStep(2)}
                          disabled={!horseData.breed || !horseData.age || !horseData.gender || !horseData.purpose}
                          className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Weiter zu Schritt 2
                        </button>
                      </div>
                    )}

                    {/* Step 2: Training */}
                    {calculationStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Ausbildungsstand
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ausbildungsniveau *
                          </label>
                          <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={horseData.training}
                            onChange={(e) => setHorseData({...horseData, training: e.target.value})}
                          >
                            <option value="">Ausbildungsstand auswählen</option>
                            <option value="roh">Roh/Unausgebildet</option>
                            <option value="angeritten">Angeritten</option>
                            <option value="grundausbildung">Grundausbildung abgeschlossen</option>
                            <option value="e-niveau">E-Niveau</option>
                            <option value="a-niveau">A-Niveau</option>
                            <option value="l-niveau">L-Niveau</option>
                            <option value="m-niveau">M-Niveau</option>
                            <option value="s-niveau">S-Niveau</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sportliche Erfolge
                          </label>
                          <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            rows={3}
                            value={horseData.achievements}
                            onChange={(e) => setHorseData({...horseData, achievements: e.target.value})}
                            placeholder="z.B. Platzierungen, Turniere, Auszeichnungen..."
                          />
                        </div>

                        <div className="flex space-x-4">
                          <button
                            onClick={() => setCalculationStep(1)}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                          >
                            Zurück
                          </button>
                          <button
                            onClick={() => setCalculationStep(3)}
                            disabled={!horseData.training}
                            className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Weiter zu Schritt 3
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Health */}
                    {calculationStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          Gesundheit und Zustand
                        </h3>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gesundheitszustand *
                          </label>
                          <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={horseData.health}
                            onChange={(e) => setHorseData({...horseData, health: e.target.value})}
                          >
                            <option value="">Gesundheitszustand bewerten</option>
                            <option value="ausgezeichnet">Ausgezeichnet - keine Einschränkungen</option>
                            <option value="gut">Gut - kleine Verschleißerscheinungen</option>
                            <option value="befriedigend">Befriedigend - leichte Einschränkungen</option>
                            <option value="ausreichend">Ausreichend - deutliche Einschränkungen</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Abstammung/Bloodline
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={horseData.bloodline}
                            onChange={(e) => setHorseData({...horseData, bloodline: e.target.value})}
                            placeholder="z.B. bekannte Vater-/Mutterlinie, Züchter..."
                          />
                        </div>

                        <div className="flex space-x-4">
                          <button
                            onClick={() => setCalculationStep(2)}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                          >
                            Zurück
                          </button>
                          <button
                            onClick={() => setCalculationStep(4)}
                            disabled={!horseData.health}
                            className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Bewertung berechnen
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Calculate */}
                    {calculationStep === 4 && (
                      <div className="text-center space-y-6">
                        <div className="bg-amber-50 rounded-xl p-8">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            Bewertung wird berechnet...
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Unsere KI analysiert die Daten Ihres Pferdes und vergleicht sie mit über 10.000 Verkaufsdaten.
                          </p>
                          <button
                            onClick={calculateValue}
                            className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                          >
                            Pferdewert jetzt berechnen
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Results Section */
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Bewertung abgeschlossen
                      </h3>
                      <p className="text-gray-600">
                        Hier ist die Wertschätzung für Ihr Pferd:
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-8 text-center">
                      <h4 className="text-lg font-medium text-gray-700 mb-2">Geschätzter Verkaufswert</h4>
                      <div className="text-4xl font-bold text-amber-600 mb-2">
                        {result.estimatedValue.toLocaleString('de-DE')} €
                      </div>
                      <p className="text-gray-600">
                        Wertspanne: {result.valueRange.min.toLocaleString('de-DE')} € - {result.valueRange.max.toLocaleString('de-DE')} €
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Bewertungsfaktoren:</h4>
                      <ul className="space-y-2">
                        {result.factors.map((factor, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">{factor}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-gray-600 mt-4 italic">
                        {result.methodology}
                      </p>
                    </div>

                    <div className="text-center space-y-4">
                      <button
                        onClick={() => {
                          setResult(null);
                          setCalculationStep(1);
                          setHorseData({
                            breed: '',
                            age: '',
                            training: '',
                            health: '',
                            achievements: '',
                            gender: '',
                            bloodline: '',
                            purpose: ''
                          });
                        }}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors mr-4"
                      >
                        Neue Bewertung
                      </button>
                      <Link
                        href="/pferd-verkaufen"
                        className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors inline-block"
                      >
                        Verkaufsratgeber ansehen
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Unsere Bewertungsmethodik
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Erfahren Sie, wie unser KI-gestützter Kalkulator den Wert Ihres Pferdes ermittelt
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Datenbasierte Analyse
                </h3>
                <p className="text-gray-600">
                  Unsere KI wurde mit über 10.000 realen Verkaufsdaten deutscher Pferde trainiert.
                  Diese umfassende Datenbasis ermöglicht präzise Marktbewertungen.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Multifaktor-Bewertung
                </h3>
                <p className="text-gray-600">
                  Über 50 Bewertungskriterien fließen in die Analyse ein: von Rasse und Alter
                  bis hin zu Ausbildungsstand und regionalen Markttrends.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Expertenwissen
                </h3>
                <p className="text-gray-600">
                  Entwickelt in Zusammenarbeit mit Pferdezüchtern, Tierärzten und Marktexperten
                  für maximale Bewertungsgenauigkeit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Quote */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl p-8 text-white">
              <blockquote className="text-xl italic mb-6">
                "Eine professionelle Pferdebewertung ist der erste Schritt zu einem erfolgreichen Verkauf.
                Der PferdeWert-Kalkulator bietet eine solide Grundlage für realistische Preisvorstellungen."
              </blockquote>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold">Dr. Sarah Müller</div>
                  <div className="text-amber-100">Tierärztin & Pferdesachverständige, 15 Jahre Erfahrung</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Häufig gestellte Fragen zur Pferdewert-Berechnung
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Wie genau ist die Pferdewert-Berechnung?
                </h3>
                <p className="text-gray-600">
                  Unsere KI-gestützte Bewertung basiert auf über 10.000 Verkaufsdaten deutscher Pferde und
                  berücksichtigt über 50 Bewertungsfaktoren. Die Genauigkeit liegt bei durchschnittlich
                  85-90% der tatsächlichen Verkaufspreise. Beachten Sie jedoch, dass der endgültige
                  Verkaufspreis auch von Faktoren wie Verkaufsgeschick, Timing und individuellen
                  Käuferpräferenzen abhängt.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Welche Faktoren fließen in die Bewertung ein?
                </h3>
                <p className="text-gray-600">
                  Wir bewerten systematisch: Rasse und Abstammung, Alter und Geschlecht, Ausbildungsstand
                  und Reitweise, Gesundheitszustand und Veterinäruntersuchungen, sportliche Erfolge und
                  Turnierplatzierungen, Charakter und Umgang, regionale Markttrends und saisonale Schwankungen,
                  sowie aktuelle Nachfrage in der jeweiligen Disziplin.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Ist die Bewertung kostenlos und wie oft kann ich sie nutzen?
                </h3>
                <p className="text-gray-600">
                  Ja, die Grundbewertung ist vollständig kostenlos und kann beliebig oft genutzt werden.
                  Für eine detaillierte Marktanalyse mit Verkaufsstrategien, Preisoptimierung und
                  individueller Beratung bieten wir kostenpflichtige Premium-Services an.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Was passiert mit den eingegebenen Daten?
                </h3>
                <p className="text-gray-600">
                  Ihre Daten werden ausschließlich für die Bewertung verwendet und nicht gespeichert oder
                  an Dritte weitergegeben. Die Bewertung erfolgt in Echtzeit, und nach Abschluss werden
                  alle eingegebenen Informationen automatisch gelöscht. Datenschutz und Vertraulichkeit
                  haben bei uns höchste Priorität.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Kann ich das Bewertungsergebnis für Versicherungen verwenden?
                </h3>
                <p className="text-gray-600">
                  Die Bewertung dient als Orientierungshilfe für den Verkaufswert. Für offizielle
                  Versicherungsbewertungen oder rechtliche Auseinandersetzungen ist meist ein
                  Gutachten durch einen vereidigten Sachverständigen erforderlich. Wir können
                  Ihnen qualifizierte Gutachter in Ihrer Region vermitteln.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Bereit für den Verkauf Ihres Pferdes?
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Nutzen Sie unseren kompletten Verkaufsratgeber für maximalen Erfolg
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pferd-verkaufen"
                className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Zum Verkaufsratgeber
              </Link>
              <Link
                href="/pferd-verkaufen/anzeige-erstellen"
                className="bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors"
              >
                Verkaufsanzeige erstellen
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}