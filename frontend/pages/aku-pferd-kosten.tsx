import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { info, error } from '@/lib/log'

interface CostCalculation {
  akuClass: string
  basePrice: number
  additionalCosts: number
  totalCost: number
  percentageOfValue: number
  horseValue: number
}

interface RegionalPricing {
  region: string
  classI: { min: number; max: number }
  classII: { min: number; max: number }
  classIII: { min: number; max: number }
  additionalCosts: string[]
  priceFactors: string[]
}

interface CostBreakdown {
  category: string
  description: string
  priceRange: string
  necessity: 'required' | 'optional' | 'situational'
}

const REGIONAL_PRICING: RegionalPricing[] = [
  {
    region: 'Deutschland (Durchschnitt)',
    classI: { min: 150, max: 300 },
    classII: { min: 400, max: 800 },
    classIII: { min: 800, max: 2000 },
    additionalCosts: ['Anfahrt: 50-150€', 'Sedierung: 50-100€', 'Wochenendzuschlag: +20%'],
    priceFactors: ['Praxisgröße', 'Standort', 'Spezialisierung', 'Equipment']
  },
  {
    region: 'Bayern (Süddeutschland)',
    classI: { min: 180, max: 350 },
    classII: { min: 450, max: 900 },
    classIII: { min: 900, max: 2200 },
    additionalCosts: ['Anfahrt: 60-180€', 'Sedierung: 60-120€', 'Wochenende: +25%', 'Feiertage: +30%'],
    priceFactors: ['Hohe Lebenshaltungskosten', 'Starke Pferdekultur', 'Premium-Ausstattung']
  },
  {
    region: 'Nordrhein-Westfalen',
    classI: { min: 160, max: 320 },
    classII: { min: 420, max: 820 },
    classIII: { min: 820, max: 2100 },
    additionalCosts: ['Anfahrt: 50-140€', 'Sedierung: 50-110€', 'Verkehrszuschlag: 20-40€'],
    priceFactors: ['Hohe Konkurrenzdichte', 'Industrielle Lage', 'Viele Reitvereine']
  },
  {
    region: 'Norddeutschland',
    classI: { min: 140, max: 280 },
    classII: { min: 380, max: 750 },
    classIII: { min: 750, max: 1900 },
    additionalCosts: ['Anfahrt: 40-120€', 'Sedierung: 45-95€', 'Inselzuschlag: +50€'],
    priceFactors: ['Ländliche Struktur', 'Traditionelle Pferdehaltung', 'Weniger Spezialkliniken']
  }
]

const COST_BREAKDOWN: CostBreakdown[] = [
  {
    category: 'Grunduntersuchung',
    description: 'Allgemeine Untersuchung, Herz-Kreislauf, Gliedmaßen',
    priceRange: '80-150€',
    necessity: 'required'
  },
  {
    category: 'Röntgenaufnahmen',
    description: 'Je nach AKU-Klasse 4-18 Aufnahmen',
    priceRange: '200-800€',
    necessity: 'required'
  },
  {
    category: 'Belastungstest',
    description: 'Longieren, Reiten unter Tierarztaufsicht',
    priceRange: '50-120€',
    necessity: 'required'
  },
  {
    category: 'Ultraschall',
    description: 'Sehnen, Bänder, innere Organe',
    priceRange: '80-200€',
    necessity: 'situational'
  },
  {
    category: 'Endoskopie',
    description: 'Atemwege, Kehlkopf (nur Klasse III+)',
    priceRange: '150-300€',
    necessity: 'situational'
  },
  {
    category: 'Laboruntersuchungen',
    description: 'Blutbild, Organwerte, Doping-Test',
    priceRange: '100-250€',
    necessity: 'optional'
  },
  {
    category: 'Anfahrtskosten',
    description: 'Tierarzt-Anfahrt zum Stall',
    priceRange: '40-180€',
    necessity: 'required'
  },
  {
    category: 'Sedierung',
    description: 'Beruhigung für Röntgen/Untersuchung',
    priceRange: '45-120€',
    necessity: 'situational'
  }
]

const AKUPferdKosten: NextPage = () => {
  const [horseValue, setHorseValue] = useState<number>(15000)
  const [selectedClass, setSelectedClass] = useState<string>('II')
  const [selectedRegion, setSelectedRegion] = useState<string>('deutschland')
  const [costCalculation, setCostCalculation] = useState<CostCalculation | null>(null)
  const [showDetailedBreakdown, setShowDetailedBreakdown] = useState<boolean>(false)

  const calculateCosts = useCallback((akuClass: string, horseVal: number, region: string): CostCalculation => {
    const regionData = REGIONAL_PRICING.find(r => r.region.toLowerCase().includes(region)) || REGIONAL_PRICING[0]

    let basePrice: number
    switch (akuClass) {
      case 'I':
        basePrice = (regionData.classI.min + regionData.classI.max) / 2
        break
      case 'II':
        basePrice = (regionData.classII.min + regionData.classII.max) / 2
        break
      case 'III-V':
        basePrice = (regionData.classIII.min + regionData.classIII.max) / 2
        break
      default:
        basePrice = 600
    }

    const additionalCosts = basePrice * 0.3 // Durchschnittlich 30% für Zusatzkosten
    const totalCost = basePrice + additionalCosts
    const percentageOfValue = (totalCost / horseVal) * 100

    return {
      akuClass,
      basePrice,
      additionalCosts,
      totalCost,
      percentageOfValue,
      horseValue: horseVal
    }
  }, [])

  useEffect(() => {
    setCostCalculation(calculateCosts(selectedClass, horseValue, selectedRegion))
  }, [calculateCosts, horseValue, selectedClass, selectedRegion])

  const trackCalculation = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'aku_cost_calculation', {
        horse_value: horseValue,
        aku_class: selectedClass,
        region: selectedRegion
      })
      info('GA4 Event: AKU cost calculation', { horseValue, selectedClass, selectedRegion })
    }
  }

  // Schema.org structured data
  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "AKU Pferd Kosten berechnen",
    "description": "Schritt-für-Schritt Anleitung zur Berechnung der Ankaufsuntersuchung Kosten für Pferde",
    "totalTime": "PT5M",
    "supply": [
      {"@type": "HowToSupply", "name": "Pferdewert"},
      {"@type": "HowToSupply", "name": "Gewünschte AKU-Klasse"},
      {"@type": "HowToSupply", "name": "Region/Standort"}
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Pferdewert bestimmen",
        "text": "Ermitteln Sie den geschätzten Marktwert des Pferdes",
        "url": "https://pferdewert.de/aku-pferd-kosten#step1"
      },
      {
        "@type": "HowToStep",
        "name": "AKU-Klasse wählen",
        "text": "Wählen Sie die passende AKU-Klasse basierend auf Pferdewert und Verwendungszweck",
        "url": "https://pferdewert.de/aku-pferd-kosten#step2"
      },
      {
        "@type": "HowToStep",
        "name": "Regionale Preise prüfen",
        "text": "Berücksichtigen Sie regionale Preisunterschiede in Deutschland",
        "url": "https://pferdewert.de/aku-pferd-kosten#step3"
      },
      {
        "@type": "HowToStep",
        "name": "Zusatzkosten kalkulieren",
        "text": "Addieren Sie Anfahrt, Sedierung und eventuelle Wochenendzuschläge",
        "url": "https://pferdewert.de/aku-pferd-kosten#step4"
      }
    ]
  }

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://pferdewert.de",
    "logo": "https://pferdewert.de/images/pferdewert-logo.png",
    "description": "Deutschlands führende Plattform für AI-gestützte Pferdebewertung und Marktanalysen",
    "areaServed": "DE",
    "knowsAbout": ["Pferdebewertung", "AKU Kosten", "Ankaufsuntersuchung", "Pferdemarkt Deutschland"],
    "expertise": "Pferdebewertung und Marktanalyse"
  }

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was kostet eine AKU beim Pferd 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine AKU kostet 2025 zwischen 150€ (Klasse I) und 2.000€ (Klasse V). Die häufigste AKU Klasse II kostet 400-800€ je nach Region und Tierarztpraxis."
        }
      },
      {
        "@type": "Question",
        "name": "Wer zahlt die AKU beim Pferdekauf?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Grundsätzlich zahlt der Käufer die AKU-Kosten. Bei Gewährleistungsansprüchen oder Vereinbarungen kann auch der Verkäufer die Kosten übernehmen."
        }
      },
      {
        "@type": "Question",
        "name": "Welche AKU-Klasse brauche ich für mein Pferd?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Klasse I (150-300€) für Freizeitpferde bis 5.000€, Klasse II (400-800€) für Sportpferde bis 25.000€, Klasse III+ (800-2.000€) für hochwertige Sport-/Zuchtpferde."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist im AKU-Preis enthalten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Im AKU-Preis enthalten: Grunduntersuchung, Röntgenaufnahmen, Belastungstest, Dokumentation. Zusätzlich: Anfahrt (40-180€), Sedierung (45-120€), ggf. Ultraschall/Endoskopie."
        }
      }
    ]
  }

  return (
    <>
      <Head>
        <title>AKU Pferd Kosten 2025 - Preise & was zahlen? | PferdeWert Ratgeber</title>
        <meta name="description" content="AKU Kosten beim Pferdekauf: Aktuelle Preise, Umfang der Untersuchung und wer zahlt. Alle Infos zu Ankaufsuntersuchung-Kosten." />
        <meta name="keywords" content="aku pferd kosten, ankaufsuntersuchung kosten, aku preise 2025, tierarzt kosten pferd, pferd kaufen aku kosten, aku was kostet, pferdekauf untersuchung kosten" />
        <link rel="canonical" href="https://pferdewert.de/aku-pferd-kosten" />

        {/* Additional Meta Tags */}
        <meta name="author" content="PferdeWert.de Expertenteam" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="AKU Pferd Kosten 2025 - Preise & was zahlen? | PferdeWert Ratgeber" />
        <meta property="og:description" content="AKU Kosten beim Pferdekauf: Aktuelle Preise, Umfang der Untersuchung und wer zahlt. Alle Infos zu Ankaufsuntersuchung-Kosten." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/aku-pferd-kosten" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-kosten-guide.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd Kosten 2025 - Preise & was zahlen?" />
        <meta name="twitter:description" content="AKU Kosten beim Pferdekauf: Aktuelle Preise, Umfang der Untersuchung und wer zahlt. Alle Infos zu Ankaufsuntersuchung-Kosten." />
        <meta name="twitter:image" content="https://pferdewert.de/images/aku-kosten-guide.jpg" />

        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="prefetch" href="/pferde-preis-berechnen" />

        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="de" href="https://pferdewert.de/aku-pferd-kosten" />
        <link rel="alternate" hrefLang="x-default" href="https://pferdewert.de/aku-pferd-kosten" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-4">
          <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-brown">Home</Link>
            <span className="mx-2" aria-hidden="true">›</span>
            <Link href="/aku-pferd" className="hover:text-brand-brown">AKU Pferd</Link>
            <span className="mx-2" aria-hidden="true">›</span>
            <span className="text-brand-brown font-medium">AKU Kosten</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-h1 font-bold text-brand-brown mb-6">
              AKU Pferd Kosten 2025: Preise, Umfang & wer zahlt?
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
              <strong>Kompletter Kostenüberblick zur Ankaufsuntersuchung</strong>: Aktuelle Preise aller AKU-Klassen,
              regionale Unterschiede und versteckte Zusatzkosten für Ihren Pferdekauf 2025.
            </p>
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800 font-semibold">
                💡 Schnell-Info: AKU Klasse II kostet 400-800€ - das sind nur 2-5% bei einem 15.000€ Pferd!
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-h2 font-bold text-blue-600 mb-2">400-800€</div>
              <div className="text-sm text-gray-600">Standard AKU (Klasse II)</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-h2 font-bold text-green-600 mb-2">2-5%</div>
              <div className="text-sm text-gray-600">Vom Pferdewert</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-h2 font-bold text-purple-600 mb-2">150-2000€</div>
              <div className="text-sm text-gray-600">Gesamtspanne aller Klassen</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-h2 font-bold text-orange-600 mb-2">Käufer</div>
              <div className="text-sm text-gray-600">Zahlt normalerweise</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Interactive Cost Calculator */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100" id="step1">
                <h2 className="text-h2 font-bold text-brand-brown mb-6">🧮 AKU Kostenrechner 2025</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="horse-value">
                      Pferdewert (€):
                    </label>
                    <input
                      id="horse-value"
                      type="number"
                      value={horseValue}
                      onChange={(e) => setHorseValue(parseInt(e.target.value) || 0)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                      placeholder="z.B. 15000"
                      aria-describedby="horse-value-help"
                    />
                    <div id="horse-value-help" className="text-xs text-gray-500 mt-1">
                      Geschätzter Marktwert des Pferdes
                    </div>
                  </div>
                  <div id="step2">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="aku-class">
                      AKU-Klasse:
                    </label>
                    <select
                      id="aku-class"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                    >
                      <option value="I">Klasse I (Basis)</option>
                      <option value="II">Klasse II (Standard)</option>
                      <option value="III-V">Klasse III-V (Umfassend)</option>
                    </select>
                  </div>
                  <div id="step3">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="region">
                      Region:
                    </label>
                    <select
                      id="region"
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                    >
                      <option value="deutschland">Deutschland (Ø)</option>
                      <option value="bayern">Bayern</option>
                      <option value="nordrhein">NRW</option>
                      <option value="norddeutschland">Norddeutschland</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={trackCalculation}
                  className="w-full md:w-auto bg-brand-brown hover:bg-brand-brownDark text-white px-6 py-3 rounded-lg transition-colors font-medium mb-6"
                >
                  Kosten berechnen
                </button>

                {costCalculation && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200" id="step4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Ihre AKU-Kostenberechnung:</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Basis AKU-Kosten:</span>
                          <span className="font-bold text-blue-600">{costCalculation.basePrice.toLocaleString()}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Zusatzkosten (Ø 30%):</span>
                          <span className="font-bold text-orange-600">{costCalculation.additionalCosts.toLocaleString()}€</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-600 font-medium">Gesamtkosten:</span>
                          <span className="font-bold text-green-600 text-lg">{costCalculation.totalCost.toLocaleString()}€</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Anteil am Pferdewert:</span>
                          <span className="font-bold text-purple-600">{costCalculation.percentageOfValue.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">AKU-Klasse:</span>
                          <span className="font-bold text-brand-brown">{costCalculation.akuClass}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bewertung:</span>
                          <span className={`font-bold ${
                            costCalculation.percentageOfValue <= 5 ? 'text-green-600' :
                            costCalculation.percentageOfValue <= 8 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {costCalculation.percentageOfValue <= 5 ? 'Optimal' :
                             costCalculation.percentageOfValue <= 8 ? 'Angemessen' : 'Kritisch'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded border border-blue-300">
                      <p className="text-sm text-gray-700">
                        <strong>Einschätzung:</strong> Bei {costCalculation.percentageOfValue.toFixed(1)}% des Pferdewerts liegen Sie
                        {costCalculation.percentageOfValue <= 5 ? ' im optimalen Bereich' :
                         costCalculation.percentageOfValue <= 8 ? ' im angemessenen Bereich' : ' über der empfohlenen Grenze von 8%'}.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                  className="mt-4 text-brand-brown hover:text-brand-brownDark font-medium"
                  aria-expanded={showDetailedBreakdown}
                  aria-controls="detailed-breakdown"
                >
                  {showDetailedBreakdown ? '▼' : '▶'} Detaillierte Kostenaufschlüsselung
                </button>

                {showDetailedBreakdown && (
                  <div id="detailed-breakdown" className="mt-4 bg-gray-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-800 mb-4">🔍 Detaillierte Kostenaufschlüsselung</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {COST_BREAKDOWN.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded p-4 bg-white">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-800">{item.category}</h5>
                            <span className={`text-xs px-2 py-1 rounded ${
                              item.necessity === 'required' ? 'bg-red-100 text-red-800' :
                              item.necessity === 'situational' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {item.necessity === 'required' ? 'Pflicht' :
                               item.necessity === 'situational' ? 'Situativ' : 'Optional'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <div className="font-bold text-brand-brown">{item.priceRange}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Regional Price Comparison */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-h2 font-bold text-brand-brown mb-6">🗺️ Regionale Preisunterschiede Deutschland</h2>

                <div className="space-y-6">
                  {REGIONAL_PRICING.map((region, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{region.region}</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">AKU-Preise nach Klassen:</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Klasse I (Basis):</span>
                              <span className="font-bold">{region.classI.min}-{region.classI.max}€</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Klasse II (Standard):</span>
                              <span className="font-bold">{region.classII.min}-{region.classII.max}€</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Klasse III-V (Premium):</span>
                              <span className="font-bold">{region.classIII.min}-{region.classIII.max}€</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-700 mb-3">Zusatzkosten:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {region.additionalCosts.map((cost, idx) => (
                              <li key={idx}>• {cost}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-800 mb-2">Preisfaktoren:</h4>
                        <div className="text-sm text-gray-600">
                          {region.priceFactors.join(' • ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3">💡 Spartipps für AKU-Kosten:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-yellow-700">
                    <div>
                      <h4 className="font-semibold mb-2">Preisvergleich lohnt sich:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Mindestens 3 Tierarztpraxen anfragen</li>
                        <li>• Pauschalpakete verhandeln</li>
                        <li>• Gruppenrabatte bei mehreren Pferden</li>
                        <li>• Werktags statt Wochenende terminieren</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Versteckte Kosten vermeiden:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Anfahrtskosten vorab klären</li>
                        <li>• Sedierungsnotwendigkeit besprechen</li>
                        <li>• Wochenend-/Feiertagszuschläge erfragen</li>
                        <li>• Nachuntersuchungskosten definieren</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Who Pays Section */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-h2 font-bold text-brand-brown mb-6">💸 Wer zahlt die AKU-Kosten?</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="border-l-4 border-green-500 pl-6">
                      <h3 className="text-xl font-bold text-green-800 mb-3">✅ Standard: Käufer zahlt</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Normalfall:</strong> Käufer trägt alle AKU-Kosten</li>
                        <li>• <strong>Eigeninteresse:</strong> Käufer will Gesundheitsstatus wissen</li>
                        <li>• <strong>Rechtslage:</strong> Kein Anspruch gegen Verkäufer</li>
                        <li>• <strong>Verhandlungsbasis:</strong> Bei hochwertigen Pferden möglich</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6">
                      <h3 className="text-xl font-bold text-blue-800 mb-3">🤝 Ausnahmen: Verkäufer beteiligt</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Verkaufsvereinbarung:</strong> Explizite Kostenteilung</li>
                        <li>• <strong>Gewährleistung:</strong> Bei versprochener Gesundheit</li>
                        <li>• <strong>Professionelle Händler:</strong> Oft als Service</li>
                        <li>• <strong>Auktionshäuser:</strong> Meist im Kaufpreis enthalten</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border-l-4 border-orange-500 pl-6">
                      <h3 className="text-xl font-bold text-orange-800 mb-3">⚖️ Kostenteilung verhandeln</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>50/50 Teilung:</strong> Bei beidseitigem Interesse</li>
                        <li>• <strong>Verkäufer zahlt Basis:</strong> Käufer Zusatzuntersuchungen</li>
                        <li>• <strong>Erfolgsabhängig:</strong> Käufer nur bei positivem Befund</li>
                        <li>• <strong>Im Kaufpreis:</strong> Verkäufer erhöht Preis entsprechend</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-red-500 pl-6">
                      <h3 className="text-xl font-bold text-red-800 mb-3">❌ Häufige Missverständnisse</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Versicherung zahlt nicht:</strong> AKU ist Käuferrisiko</li>
                        <li>• <strong>Finanzierung verlangt AKU:</strong> Käufer muss zahlen</li>
                        <li>• <strong>Züchter-Garantie:</strong> Ersetzt keine AKU</li>
                        <li>• <strong>Nachverhandlung schwierig:</strong> Vorab klären</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">📋 Checkliste Kostenvereinbarung:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                    <div>
                      <h4 className="font-semibold mb-2">Vorab schriftlich klären:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>☐ Wer zahlt Basis-AKU?</li>
                        <li>☐ Wer zahlt Zusatzuntersuchungen?</li>
                        <li>☐ Wer zahlt bei negativem Befund?</li>
                        <li>☐ Anfahrtskosten geregelt?</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Bei Kostenteilung beachten:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>☐ Schriftliche Vereinbarung</li>
                        <li>☐ Abrechnungsmodalitäten</li>
                        <li>☐ Tierarzt-Direktabrechnung</li>
                        <li>☐ Zahlungsfrist definiert</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* AKU Class Guide */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-h2 font-bold text-brand-brown mb-6">🎯 Welche AKU-Klasse für welchen Pferdewert?</h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 bg-green-50">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-green-600 mb-2">Klasse I</div>
                        <div className="text-sm text-gray-600">150-300€</div>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-3">Freizeitpferde</h4>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• Pferdewert: bis 5.000€</li>
                        <li>• Grunduntersuchung</li>
                        <li>• 4 Standard-Röntgenbilder</li>
                        <li>• Basis-Belastungstest</li>
                      </ul>
                      <div className="text-xs text-green-700 bg-green-100 p-2 rounded">
                        <strong>Empfehlung:</strong> Für Hobby-Reiter ausreichend
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-blue-600 mb-2">Klasse II</div>
                        <div className="text-sm text-gray-600">400-800€</div>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-3">Sportpferde</h4>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• Pferdewert: 5.000-25.000€</li>
                        <li>• Erweiterte Untersuchung</li>
                        <li>• 8-10 Röntgenbilder</li>
                        <li>• Intensiver Belastungstest</li>
                      </ul>
                      <div className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
                        <strong>Standard:</strong> Häufigste AKU-Klasse
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6 bg-purple-50">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-purple-600 mb-2">Klasse III-V</div>
                        <div className="text-sm text-gray-600">800-2000€</div>
                      </div>
                      <h4 className="font-bold text-gray-800 mb-3">Hochleistungssport</h4>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        <li>• Pferdewert: ab 25.000€</li>
                        <li>• Umfassende Diagnostik</li>
                        <li>• 18+ Röntgenbilder</li>
                        <li>• Endoskopie, Ultraschall</li>
                      </ul>
                      <div className="text-xs text-purple-700 bg-purple-100 p-2 rounded">
                        <strong>Premium:</strong> Für wertvollste Pferde
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                    <h3 className="font-bold text-amber-800 mb-3">📊 Entscheidungsmatrix:</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-amber-300">
                            <th className="text-left py-2">Pferdewert</th>
                            <th className="text-left py-2">Verwendung</th>
                            <th className="text-left py-2">AKU-Klasse</th>
                            <th className="text-left py-2">Kosten</th>
                            <th className="text-left py-2">% vom Wert</th>
                          </tr>
                        </thead>
                        <tbody className="text-amber-700">
                          <tr className="border-b border-amber-200">
                            <td className="py-2">bis 3.000€</td>
                            <td className="py-2">Hobby/Freizeit</td>
                            <td className="py-2">I (optional)</td>
                            <td className="py-2">150-300€</td>
                            <td className="py-2">5-10%</td>
                          </tr>
                          <tr className="border-b border-amber-200">
                            <td className="py-2">3.000-8.000€</td>
                            <td className="py-2">Freizeit/leichter Sport</td>
                            <td className="py-2">I-II</td>
                            <td className="py-2">200-500€</td>
                            <td className="py-2">3-8%</td>
                          </tr>
                          <tr className="border-b border-amber-200">
                            <td className="py-2">8.000-25.000€</td>
                            <td className="py-2">Sport/Turnier</td>
                            <td className="py-2">II</td>
                            <td className="py-2">400-800€</td>
                            <td className="py-2">2-5%</td>
                          </tr>
                          <tr>
                            <td className="py-2">ab 25.000€</td>
                            <td className="py-2">Leistungssport/Zucht</td>
                            <td className="py-2">III-V</td>
                            <td className="py-2">800-2000€</td>
                            <td className="py-2">2-4%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Cost Estimator */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">⚡ Schnell-Schätzer</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1" htmlFor="quick-horse-value">
                      Pferdewert (€):
                    </label>
                    <input
                      id="quick-horse-value"
                      type="number"
                      placeholder="z.B. 10000"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0
                        const akuClass = value > 25000 ? 'III-V' : value > 5000 ? 'II' : 'I'
                        const akuCost = value > 25000 ? '800-2000€' : value > 5000 ? '400-800€' : '150-300€'
                        const percentage = value > 25000 ? '2-4%' : value > 5000 ? '2-5%' : '3-10%'
                        const element = document.getElementById('quick-result-sidebar')
                        if (element) {
                          element.innerHTML = value > 0 ?
                            `<div class="text-center mt-3 p-3 bg-blue-50 rounded">
                              <div class="font-bold text-brand-brown mb-1">AKU Klasse ${akuClass}</div>
                              <div class="text-sm text-gray-600 mb-1">Kosten: ${akuCost}</div>
                              <div class="text-xs text-gray-500">${percentage} vom Pferdewert</div>
                            </div>` : ''
                        }
                      }}
                    />
                    <div id="quick-result-sidebar"></div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">💰 Kostenübersicht 2025</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-800">AKU Klasse I:</div>
                    <div className="text-gray-600">150-300€ (Freizeitpferde)</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">AKU Klasse II:</div>
                    <div className="text-gray-600">400-800€ (Sportpferde)</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">AKU Klasse III-V:</div>
                    <div className="text-gray-600">800-2000€ (Premium)</div>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div>
                    <div className="font-medium text-gray-800">Zusätzlich zu rechnen:</div>
                    <div className="text-gray-600">+ 20-40% für Anfahrt, Sedierung etc.</div>
                  </div>
                </div>
              </div>

              {/* Expert Tip */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-3">💡 Experten-Tipp</h3>
                <p className="text-sm text-green-700 mb-3">
                  "Planen Sie immer 30% Puffer für Zusatzkosten ein. Die AKU-Grundkosten sind nur der Startwert."
                </p>
                <div className="text-xs text-green-600">
                  - Erfahrener Pferdetierarzt
                </div>
              </div>

              {/* Cost Warning */}
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <h3 className="font-bold text-red-800 mb-3">⚠️ Kostenfalle vermeiden</h3>
                <p className="text-sm text-red-700 mb-3">
                  Über 10% des Pferdewerts für die AKU wird kritisch. Bei günstigen Pferden alternative AKU-Konzepte prüfen.
                </p>
              </div>

              {/* Related Links */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">🔗 Weitere AKU-Themen</h3>
                <div className="space-y-3">
                  <Link
                    href="/aku-pferd"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    ← AKU Grundlagen verstehen
                  </Link>
                  <Link
                    href="/aku-pferd-ablauf"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → AKU Ablauf Schritt für Schritt
                  </Link>
                  <Link
                    href="/aku-pferd-klassen"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → AKU Klassen erklärt
                  </Link>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-brand-brown/5 rounded-lg p-6 border border-brand-brown/20">
                <h3 className="font-bold text-brand-brown mb-3">🎯 Nach der AKU</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Kosten geklärt? Jetzt den fairen Marktwert Ihres Wunschpferdes ermitteln.
                </p>
                <Link
                  href="/pferde-preis-berechnen"
                  className="block w-full bg-brand-brown hover:bg-brand-brownDark text-white text-center py-3 rounded-lg transition-colors font-medium"
                >
                  Pferdewert berechnen lassen
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-amber-100">
            <h2 className="text-h2 font-bold text-brand-brown mb-8">❓ Häufige Fragen zu AKU-Kosten</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Was kostet eine AKU beim Pferd 2025?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    AKU-Kosten 2025: Klasse I 150-300€, Klasse II 400-800€, Klasse III-V 800-2000€.
                    Plus Zusatzkosten für Anfahrt (40-180€) und ggf. Sedierung (45-120€).
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Übernimmt die Pferdekrankenversicherung AKU-Kosten?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nein, normalerweise nicht. AKU gilt als Käuferrisiko vor Vertragsabschluss.
                    Nur wenige Premium-Versicherungen bieten AKU-Kostenübernahme als Zusatzleistung.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Lohnt sich eine AKU bei günstigen Pferden?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bei Pferden unter 3.000€ wird es grenzwertig, da AKU 10%+ kosten kann.
                    Alternative: Verkürzte AKU oder Gesundheitscheck durch eigenen Tierarzt.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Kann man AKU-Kosten steuerlich absetzen?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Nur bei gewerblicher Pferdehaltung als Betriebsausgabe. Private Halter können
                    AKU-Kosten nicht steuerlich geltend machen.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Warum sind AKU-Preise so unterschiedlich?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Preisunterschiede entstehen durch: Regionale Lebenshaltungskosten,
                    Praxisausstattung, Spezialisierung und Konkurrenzsituation vor Ort.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Gibt es Finanzierungsmöglichkeiten für AKU?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Manche Tierarztpraxen bieten Ratenzahlung. Bei teuren AKUs (Klasse V)
                    können Spezialfinanzierungen sinnvoll sein.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-brand-brown to-brand-brownDark text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">
                AKU-Kosten kalkuliert - Pferdewert ermitteln?
              </h2>
              <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                Sie wissen jetzt, was eine AKU kostet. Ermitteln Sie den fairen Marktwert
                für Ihre Kaufentscheidung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link
                  href="/pferde-preis-berechnen"
                  className="bg-white text-brand-brown hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Pferdewert berechnen
                </Link>
                <Link
                  href="/aku-pferd"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-brown px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Zurück zu AKU-Grundlagen
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default AKUPferdKosten