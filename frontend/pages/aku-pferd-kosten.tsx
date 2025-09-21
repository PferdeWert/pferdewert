import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { info } from '@/lib/log'

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
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const [animateResults, setAnimateResults] = useState<boolean>(false)
  // Refs for enhanced UX interactions
  const resultsRef = useRef<HTMLDivElement>(null)

  const calculateCosts = useCallback(async (akuClass: string, horseVal: number, region: string): Promise<CostCalculation> => {
    // Set calculating state for visual feedback
    setIsCalculating(true)
    setAnimateResults(false)

    // Add visual delay for better UX feedback (simulating calculation)
    await new Promise(resolve => setTimeout(resolve, 1200))

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

    const result = {
      akuClass,
      basePrice,
      additionalCosts,
      totalCost,
      percentageOfValue,
      horseValue: horseVal
    }

    setIsCalculating(false)
    setAnimateResults(true)

    // Smooth scroll to results section
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }, 200)

    return result
  }, [])

  useEffect(() => {
    const performCalculation = async () => {
      const result = await calculateCosts(selectedClass, horseValue, selectedRegion)
      setCostCalculation(result)
    }
    performCalculation()
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
        <meta name="keywords" content="aku pferd kosten, ankaufsuntersuchung pferd kosten, aku kosten 2025, pferd kaufen aku, tierarzt kosten pferd" />
        <link rel="canonical" href="https://pferdewert.de/aku-pferd-kosten" />

        {/* Additional Meta Tags */}
        <meta name="author" content="PferdeWert.de Expertenteam" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="revisit-after" content="7 days" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="AKU Pferd Kosten 2025 - Alle Preise & Infos zur Ankaufsuntersuchung" />
        <meta property="og:description" content="Was kostet eine AKU beim Pferdekauf? Von 150€ bis 2.500€ - alle Preise, wer zahlt und wie Sie Kosten sparen können." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/aku-pferd-kosten" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="/images/aku-pferd-kosten-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd Kosten 2025 - Alle Preise & Infos zur Ankaufsuntersuchung" />
        <meta name="twitter:description" content="Was kostet eine AKU beim Pferdekauf? Von 150€ bis 2.500€ - alle Preise, wer zahlt und wie Sie Kosten sparen können." />
        <meta name="twitter:image" content="/images/aku-pferd-kosten-og.jpg" />

        {/* Performance Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="prefetch" href="/pferde-preis-berechnen" />

        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="de" href="https://pferdewert.de/aku-pferd-kosten" />
        <link rel="alternate" hrefLang="x-default" href="https://pferdewert.de/aku-pferd-kosten" />

        {/* Schema.org JSON-LD - Article */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "AKU Pferd Kosten 2025 - Alles über Preise der Ankaufsuntersuchung",
          "description": "Umfassender Guide zu AKU-Kosten beim Pferdekauf: Preise, regionale Unterschiede, Kostentragung und Spartipps.",
          "author": {
            "@type": "Organization",
            "name": "PferdeWert.de",
            "url": "https://pferdewert.de"
          },
          "publisher": {
            "@type": "Organization",
            "name": "PferdeWert.de",
            "logo": {
              "@type": "ImageObject",
              "url": "https://pferdewert.de/images/logo.png"
            }
          },
          "datePublished": "2025-01-20",
          "dateModified": "2025-01-20",
          "mainEntityOfPage": "https://pferdewert.de/aku-pferd-kosten",
          "articleSection": "Pferde Ratgeber",
          "keywords": ["AKU Kosten", "Ankaufsuntersuchung", "Pferdekauf", "Tierarztkosten"],
          "about": {
            "@type": "Thing",
            "name": "Ankaufsuntersuchung Pferd",
            "description": "Veterinärmedizinische Untersuchung beim Pferdekauf"
          }
        }) }} />

        {/* Schema.org JSON-LD - Breadcrumb */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://pferdewert.de"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "AKU Pferd",
              "item": "https://pferdewert.de/aku-pferd"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "AKU Kosten",
              "item": "https://pferdewert.de/aku-pferd-kosten"
            }
          ]
        }) }} />

        {/* Schema.org JSON-LD - FAQ */}
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

        <div className="container mx-auto px-4 py-6 lg:py-8">
          {/* Hero Section - Optimized for mobile */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-h1 font-bold text-brand-brown mb-4 lg:mb-6 leading-tight">
              AKU Pferd Kosten 2025 - Alles über Preise der Ankaufsuntersuchung
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 px-2">
              Die Ankaufsuntersuchung (AKU) ist ein entscheidender Schritt beim Pferdekauf, doch viele Interessenten sind unsicher über die damit verbundenen Kosten. Als Deutschlands #1 Online Pferdebewertung erklären wir Ihnen transparent alle Aspekte der AKU-Kosten und helfen Ihnen, die richtige Entscheidung für Ihren Pferdekauf zu treffen.
            </p>

            {/* Enhanced CTA and Trust Signal */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-xl p-4 lg:p-6 max-w-2xl mx-auto mb-6">
              <p className="text-blue-800 font-semibold text-sm lg:text-base mb-3">
                💡 2025 Preisüberblick: Von 150€ (Kleine AKU) bis 2.500€ (Premium AKU) - alle Kosten transparent erklärt!
              </p>
              <Link href="/pferde-preis-berechnen" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-sm lg:text-base">
                Jetzt kostenlosen Pferdewert ermitteln →
              </Link>
            </div>

            {/* Trust badges - Mobile optimized */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs lg:text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>1000+ Bewertungen</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>KI-gestützte Analyse</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>Kostenlose Erstberatung</span>
              </div>
            </div>
          </div>

          {/* Quick Stats - Mobile first grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-12">
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 border border-amber-100 text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-xl lg:text-h2 font-bold text-blue-600 mb-1 lg:mb-2">400-800€</div>
              <div className="text-xs lg:text-sm text-gray-600">Standard AKU (Klasse II)</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 border border-amber-100 text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-xl lg:text-h2 font-bold text-green-600 mb-1 lg:mb-2">2-5%</div>
              <div className="text-xs lg:text-sm text-gray-600">Vom Pferdewert</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 border border-amber-100 text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-xl lg:text-h2 font-bold text-purple-600 mb-1 lg:mb-2">150-2000€</div>
              <div className="text-xs lg:text-sm text-gray-600">Gesamtspanne aller Klassen</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 border border-amber-100 text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-xl lg:text-h2 font-bold text-orange-600 mb-1 lg:mb-2">Käufer</div>
              <div className="text-xs lg:text-sm text-gray-600">Zahlt normalerweise</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Cost Overview Section */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-h2 font-bold text-brand-brown mb-6">💰 Was kostet eine AKU beim Pferd?</h2>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Die Kosten einer Ankaufsuntersuchung variieren je nach Umfang und Region erheblich. Im Jahr 2025 können Sie mit folgenden Preisen rechnen:
                </p>

                <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 lg:p-6 border border-green-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg lg:text-xl font-bold text-green-800">Kleine AKU</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Basis</span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-3">150 - 300€</div>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">⏰</span>
                        <span><strong>Dauer:</strong> 1-2 Stunden</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">🔍</span>
                        <span><strong>Umfang:</strong> Allgemeine Untersuchung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">🏃</span>
                        <span><strong>Test:</strong> Schritt und Trab</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-3 border-t border-green-200">
                      <p className="text-xs text-green-600 font-medium">Ideal für Freizeitpferde bis 5.000€</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 border border-blue-200 hover:shadow-lg transition-shadow duration-200 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">BELIEBT</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg lg:text-xl font-bold text-blue-800">Große AKU</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Standard</span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-3">600 - 1.200€</div>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">⏰</span>
                        <span><strong>Dauer:</strong> 3-5 Stunden</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">🔍</span>
                        <span><strong>Umfang:</strong> Vollständige Untersuchung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">📡</span>
                        <span><strong>Diagnostik:</strong> Röntgen, Ultraschall</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-3 border-t border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Ideal für Sportpferde bis 25.000€</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 border border-purple-200 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg lg:text-xl font-bold text-purple-800">Premium AKU</h3>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Komplett</span>
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-3">1.000 - 2.500€</div>
                    <ul className="text-sm text-purple-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">⏰</span>
                        <span><strong>Dauer:</strong> Ganztägig</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">🔬</span>
                        <span><strong>Umfang:</strong> Alle Untersuchungen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5">🏥</span>
                        <span><strong>Extra:</strong> MRT, CT, Labor</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-3 border-t border-purple-200">
                      <p className="text-xs text-purple-600 font-medium">Ideal für hochwertige Sport-/Zuchtpferde</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Factors Affecting Cost */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-h2 font-bold text-brand-brown mb-6">🔍 Faktoren, die die AKU-Kosten beeinflussen</h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Regionale Preisunterschiede</h3>
                    <p className="text-gray-600 mb-4">Die AKU-Kosten variieren erheblich zwischen den Bundesländern:</p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Bayern:</strong> Durchschnittlich 10-15% höhere Kosten aufgrund der starken Pferdesport-Tradition</li>
                      <li>• <strong>Nordrhein-Westfalen:</strong> Mittleres Preisniveau, große Auswahl an Tierärzten</li>
                      <li>• <strong>Niedersachsen:</strong> Konkurrenzfähige Preise durch hohe Tierarztdichte</li>
                      <li>• <strong>Baden-Württemberg:</strong> Leicht überdurchschnittliche Kosten</li>
                      <li>• <strong>Hessen:</strong> Durchschnittliche Preise mit regionalen Schwankungen</li>
                      <li>• <strong>Schleswig-Holstein:</strong> Moderate Kosten, spezialisierte Pferdekliniken</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 Untersuchungsumfang bestimmt den Preis</h3>

                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-green-800">Basisuntersuchung (AKU Klasse 1-2)</h4>
                        <ul className="text-sm text-gray-600 mt-1">
                          <li>• Allgemeine klinische Untersuchung</li>
                          <li>• Bewegungsanalyse an der Hand</li>
                          <li>• Grundlegende Herzuntersuchung</li>
                        </ul>
                        <div className="font-bold text-green-600 mt-2">Kosten: 150-400€</div>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-blue-800">Standarduntersuchung (AKU Klasse 3)</h4>
                        <ul className="text-sm text-gray-600 mt-1">
                          <li>• Röntgenaufnahmen der Gliedmaßen</li>
                          <li>• Flexionsprobe</li>
                          <li>• Erweiterte Bewegungsanalyse</li>
                        </ul>
                        <div className="font-bold text-blue-600 mt-2">Kosten: 500-800€</div>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-purple-800">Umfassende Untersuchung (AKU Klasse 4-5)</h4>
                        <ul className="text-sm text-gray-600 mt-1">
                          <li>• Vollständige Röntgendiagnostik</li>
                          <li>• Ultraschalluntersuchungen</li>
                          <li>• Endoskopie der Atemwege</li>
                          <li>• Blutuntersuchung</li>
                        </ul>
                        <div className="font-bold text-purple-600 mt-2">Kosten: 800-2.500€</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Interactive Cost Calculator */}
              <section className="bg-white rounded-xl shadow-xl p-4 md:p-8 border border-amber-100 relative overflow-hidden" id="step1">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-green-50 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-50 to-orange-50 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-4">
                      <span className="text-2xl">🧮</span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-h2 font-bold text-brand-brown mb-2">AKU Kostenrechner 2025</h2>
                    <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
                      Berechnen Sie schnell und einfach die Kosten für Ihre Ankaufsuntersuchung
                    </p>
                  </div>

                  <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                        <label className="block text-gray-700 font-semibold text-sm md:text-base" htmlFor="horse-value">
                          Pferdewert (€)
                        </label>
                      </div>
                      <input
                        id="horse-value"
                        type="number"
                        value={horseValue}
                        onChange={(e) => setHorseValue(parseInt(e.target.value) || 0)}
                        className="w-full p-4 md:p-3 text-lg md:text-base border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white min-h-[48px]"
                        placeholder="z.B. 15000"
                        aria-describedby="horse-value-help"
                        min="0"
                        max="100000"
                        step="1000"
                      />
                      <div id="horse-value-help" className="text-xs md:text-sm text-gray-500 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Geschätzter Marktwert des Pferdes
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors duration-200" id="step2">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 font-bold text-sm">2</span>
                        </div>
                        <label className="block text-gray-700 font-semibold text-sm md:text-base" htmlFor="aku-class">
                          AKU-Klasse
                        </label>
                      </div>
                      <select
                        id="aku-class"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full p-4 md:p-3 text-lg md:text-base border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 bg-white min-h-[48px] appearance-none bg-no-repeat bg-right-2 bg-[length:20px] cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`
                        }}
                      >
                        <option value="I">Klasse I (Basis) - €150-250</option>
                        <option value="II">Klasse II (Standard) - €250-400</option>
                        <option value="III-V">Klasse III-V (Umfassend) - €400+</option>
                      </select>
                      <div className="text-xs md:text-sm text-gray-500 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Umfang der Untersuchung
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors duration-200" id="step3">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-amber-600 font-bold text-sm">3</span>
                        </div>
                        <label className="block text-gray-700 font-semibold text-sm md:text-base" htmlFor="region">
                          Region
                        </label>
                      </div>
                      <select
                        id="region"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full p-4 md:p-3 text-lg md:text-base border border-gray-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 bg-white min-h-[48px] appearance-none bg-no-repeat bg-right-2 bg-[length:20px] cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`
                        }}
                      >
                        <option value="deutschland">Deutschland (Durchschnitt)</option>
                        <option value="bayern">Bayern</option>
                        <option value="nordrhein">Nordrhein-Westfalen</option>
                        <option value="norddeutschland">Norddeutschland</option>
                      </select>
                      <div className="text-xs md:text-sm text-gray-500 mt-2 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Regionale Preisunterschiede
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={trackCalculation}
                    disabled={isCalculating}
                    className={`w-full md:w-auto min-w-[280px] px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg mb-6 shadow-lg ${
                      isCalculating
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 hover:shadow-xl transform hover:scale-105 active:scale-95'
                    } text-white`}
                  >
                    {isCalculating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Berechne Kosten...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Jetzt kostenlos berechnen
                      </span>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 mb-6">
                    ✓ Kostenlos ✓ Sofortiges Ergebnis ✓ Keine Anmeldung
                  </p>
                </div>

                {costCalculation && (
                  <div
                    className={`bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-xl p-6 md:p-8 border-2 border-blue-200 shadow-xl transition-all duration-700 ease-out ${
                      animateResults
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform translate-y-4'
                    }`}
                    id="step4"
                  >
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-4 transition-all duration-500 ${
                        animateResults ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                      }`}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className={`text-xl md:text-2xl font-bold text-gray-800 mb-2 transition-all duration-500 ${
                        animateResults ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
                      }`}>
                        Ihre AKU-Kostenberechnung
                      </h3>
                      <p className={`text-gray-600 transition-all duration-500 delay-100 ${
                        animateResults ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4'
                      }`}>
                        Hier sind die geschätzten Kosten für Ihre Ankaufsuntersuchung
                      </p>
                    </div>

                    {/* Main cost display */}
                    <div className={`bg-white rounded-xl p-6 shadow-lg mb-6 border border-gray-200 transition-all duration-500 delay-200 ${
                      animateResults ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
                    }`}>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-2">Geschätzte Gesamtkosten</div>
                        <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                          {costCalculation.totalCost.toLocaleString()}€
                        </div>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          costCalculation.percentageOfValue <= 5 ? 'bg-green-100 text-green-800' :
                          costCalculation.percentageOfValue <= 8 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {costCalculation.percentageOfValue <= 5 ? '✓ Optimal' :
                           costCalculation.percentageOfValue <= 8 ? '⚠ Angemessen' : '⚡ Kritisch'}
                          <span className="ml-2">({costCalculation.percentageOfValue.toFixed(1)}% vom Pferdewert)</span>
                        </div>
                      </div>
                    </div>

                    {/* Cost breakdown */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
                      <div className={`bg-blue-50 rounded-lg p-4 border border-blue-200 transition-all duration-500 delay-300 ${
                        animateResults ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-700 font-medium flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Basis AKU-Kosten
                          </span>
                          <span className="font-bold text-blue-600 text-lg">{costCalculation.basePrice.toLocaleString()}€</span>
                        </div>
                        <div className="text-xs text-blue-600">Klasse {costCalculation.akuClass} • {selectedRegion}</div>
                      </div>

                      <div className={`bg-orange-50 rounded-lg p-4 border border-orange-200 transition-all duration-500 delay-400 ${
                        animateResults ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-700 font-medium flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Zusatzkosten
                          </span>
                          <span className="font-bold text-orange-600 text-lg">{costCalculation.additionalCosts.toLocaleString()}€</span>
                        </div>
                        <div className="text-xs text-orange-600">Durchschnittlich ~30% extra</div>
                      </div>
                    </div>

                    {/* Assessment and CTA */}
                    <div className={`bg-white rounded-lg p-4 md:p-6 border border-gray-200 transition-all duration-500 delay-500 ${
                      animateResults ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
                    }`}>
                      <div className="text-center mb-4">
                        <p className="text-gray-700 mb-4">
                          <strong>Experteneinschätzung:</strong> Bei {costCalculation.percentageOfValue.toFixed(1)}% des Pferdewerts liegen Sie
                          {costCalculation.percentageOfValue <= 5 ? ' im optimalen Bereich' :
                           costCalculation.percentageOfValue <= 8 ? ' im angemessenen Bereich' : ' über der empfohlenen Grenze von 8%'}.
                        </p>

                        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 text-white mb-4">
                          <h4 className="font-bold mb-2">💡 Unser Tipp</h4>
                          <p className="text-sm">
                            Lassen Sie vor dem Kauf auch den fairen Marktwert Ihres Traumpferdes ermitteln -
                            so sind Sie optimal für Preisverhandlungen gerüstet!
                          </p>
                        </div>

                        <Link
                          href="/pferde-preis-berechnen"
                          className="inline-flex items-center justify-center w-full md:w-auto min-w-[280px] px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                          onClick={() => {
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'click', {
                                event_category: 'CTA',
                                event_label: 'AKU Calculator Result - Pferdewert berechnen',
                                value: 1
                              })
                            }
                          }}
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          Jetzt Pferdewert berechnen
                        </Link>
                        <p className="text-xs text-gray-500 mt-2">
                          ✓ KI-gestützte Bewertung ✓ Marktdaten-basiert ✓ Sofortiges Ergebnis
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowDetailedBreakdown(!showDetailedBreakdown)}
                  className="mt-4 text-brand-brown hover:text-brand-brownDark font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-opacity-50 rounded px-2 py-1"
                  aria-expanded={showDetailedBreakdown}
                  aria-controls="detailed-breakdown"
                >
                  <span className={`inline-block transition-transform duration-300 ${
                    showDetailedBreakdown ? 'rotate-90' : 'rotate-0'
                  }`}>
                    ▶
                  </span>{' '}
                  Detaillierte Kostenaufschlüsselung
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    showDetailedBreakdown
                      ? 'max-h-[2000px] opacity-100 mt-4'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <div
                    id="detailed-breakdown"
                    className={`bg-gray-50 rounded-lg p-6 transition-all duration-500 ease-out ${
                      showDetailedBreakdown
                        ? 'transform translate-y-0 scale-100'
                        : 'transform -translate-y-2 scale-95'
                    }`}
                  >
                    <h4 className={`font-bold text-gray-800 mb-4 transition-all duration-300 delay-100 ${
                      showDetailedBreakdown
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-0 transform translate-y-2'
                    }`}>
                      🔍 Detaillierte Kostenaufschlüsselung
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {COST_BREAKDOWN.map((item, index) => (
                        <div
                          key={index}
                          className={`border border-gray-200 rounded p-4 bg-white transition-all duration-300 ease-out hover:shadow-md hover:scale-105 ${
                            showDetailedBreakdown
                              ? 'opacity-100 transform translate-y-0'
                              : 'opacity-0 transform translate-y-4'
                          }`}
                          style={{
                            transitionDelay: showDetailedBreakdown ? `${200 + index * 100}ms` : '0ms'
                          }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-800">{item.category}</h5>
                            <span className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
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
                </div>
              </section>

              {/* Regional Price Comparison */}
              <section className="bg-white rounded-xl shadow-xl p-4 md:p-8 border border-amber-100 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-amber-50 rounded-full -translate-y-12 -translate-x-12 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-50 to-blue-50 rounded-full translate-y-16 translate-x-16 opacity-60"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-amber-500 rounded-full mb-4">
                      <span className="text-2xl">🗺️</span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-h2 font-bold text-brand-brown mb-2">Regionale Preisunterschiede Deutschland</h2>
                    <p className="text-gray-600 text-sm md:text-base">Finden Sie die günstigsten AKU-Preise in Ihrer Region</p>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    {REGIONAL_PRICING.map((region, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                        {/* Region Header */}
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                          <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold mr-3">
                              {index + 1}
                            </span>
                            {region.region}
                          </h3>
                          <div className="hidden md:flex items-center text-xs text-gray-500 bg-white px-3 py-1 rounded-full">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Region {index + 1}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                          {/* AKU Prices Card */}
                          <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                              </div>
                              <h4 className="font-semibold text-gray-800 text-sm md:text-base">AKU-Preise nach Klassen</h4>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                                <span className="text-gray-600 font-medium">Klasse I (Basis)</span>
                                <span className="font-bold text-green-600">{region.classI.min}-{region.classI.max}€</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-blue-50 rounded text-sm">
                                <span className="text-gray-600 font-medium">Klasse II (Standard)</span>
                                <span className="font-bold text-blue-600">{region.classII.min}-{region.classII.max}€</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-amber-50 rounded text-sm">
                                <span className="text-gray-600 font-medium">Klasse III-V (Premium)</span>
                                <span className="font-bold text-amber-600">{region.classIII.min}-{region.classIII.max}€</span>
                              </div>
                            </div>
                          </div>

                          {/* Additional Costs Card */}
                          <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </div>
                              <h4 className="font-semibold text-gray-800 text-sm md:text-base">Zusatzkosten</h4>
                            </div>

                            <ul className="text-xs md:text-sm text-gray-600 space-y-2">
                              {region.additionalCosts.map((cost, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="inline-block w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  <span>{cost}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Price Factors */}
                        <div className="mt-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800 text-sm">Preisfaktoren:</h4>
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 leading-relaxed">
                            {region.priceFactors.join(' • ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Money-Saving Tips */}
                  <div className="mt-6 md:mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 p-4 md:p-6 rounded-xl border-2 border-yellow-200 shadow-lg">
                    <div className="text-center mb-4 md:mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full mb-3">
                        <span className="text-xl">💡</span>
                      </div>
                      <h3 className="font-bold text-yellow-800 text-lg md:text-xl">Spartipps für AKU-Kosten</h3>
                      <p className="text-yellow-700 text-sm mt-1">Sparen Sie bis zu 40% bei Ihrer Ankaufsuntersuchung</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      {/* Price Comparison Tips */}
                      <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-yellow-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-yellow-800 text-sm md:text-base">Preisvergleich lohnt sich</h4>
                        </div>
                        <ul className="space-y-2 text-yellow-700 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Mindestens 3 Tierarztpraxen anfragen</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Pauschalpakete verhandeln</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Gruppenrabatte bei mehreren Pferden</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Werktags statt Wochenende terminieren</span>
                          </li>
                        </ul>
                      </div>

                      {/* Hidden Costs Tips */}
                      <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-yellow-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-yellow-800 text-sm md:text-base">Versteckte Kosten vermeiden</h4>
                        </div>
                        <ul className="space-y-2 text-yellow-700 text-xs md:text-sm">
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Anfahrtskosten vorab klären</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Sedierungsnotwendigkeit besprechen</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Wochenend-/Feiertagszuschläge erfragen</span>
                          </li>
                          <li className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span>Nachuntersuchungskosten definieren</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* CTA within savings section */}
                    <div className="mt-4 md:mt-6 text-center bg-white rounded-lg p-4 border border-yellow-300">
                      <p className="text-yellow-800 text-sm mb-3">
                        <strong>Tipp:</strong> Nutzen Sie unseren kostenlosen Pferdewert-Rechner für eine realistische Preiseinschätzung vor der AKU
                      </p>
                      <Link href="/pferde-preis-berechnen"
                            className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-lg font-semibold text-sm md:text-base hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Jetzt Pferdewert berechnen
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* Who Pays Section */}
              <section className="bg-white rounded-xl shadow-xl p-4 md:p-8 border border-amber-100 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-green-50 to-blue-50 rounded-full -translate-y-14 translate-x-14 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-50 to-green-50 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-4">
                      <span className="text-2xl">💸</span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-h2 font-bold text-brand-brown mb-2">Wer zahlt die AKU-Kosten?</h2>
                    <p className="text-gray-600 text-sm md:text-base">Verstehen Sie die Kostentragung bei Ankaufsuntersuchungen</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    {/* Standard: Buyer Pays Card */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 border-2 border-green-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-green-800">Standard: Käufer zahlt</h3>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Normalfall:</strong> Käufer trägt alle AKU-Kosten</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Eigeninteresse:</strong> Käufer will Gesundheitsstatus wissen</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Rechtslage:</strong> Kein Anspruch gegen Verkäufer</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Verhandlungsbasis:</strong> Bei hochwertigen Pferden möglich</span>
                        </li>
                      </ul>
                    </div>

                    {/* Exceptions: Seller Participates Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-blue-800">Ausnahmen: Verkäufer beteiligt</h3>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Verkaufsvereinbarung:</strong> Explizite Kostenteilung</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Gewährleistung:</strong> Bei versprochener Gesundheit</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Professionelle Händler:</strong> Oft als Service</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Auktionshäuser:</strong> Meist im Kaufpreis enthalten</span>
                        </li>
                      </ul>
                    </div>

                    {/* Negotiating Cost Sharing Card */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl p-4 md:p-6 border-2 border-amber-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-3m-3 3l-3-3" />
                          </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-amber-800">Kostenteilung verhandeln</h3>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>50/50 Teilung:</strong> Bei beidseitigem Interesse</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Verkäufer zahlt Basis:</strong> Käufer Zusatzuntersuchungen</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Erfolgsabhängig:</strong> Käufer nur bei positivem Befund</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Im Kaufpreis:</strong> Verkäufer erhöht Preis entsprechend</span>
                        </li>
                      </ul>
                    </div>

                    {/* Common Misunderstandings Card */}
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 md:p-6 border-2 border-red-200 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-red-800">Häufige Missverständnisse</h3>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Versicherung zahlt nicht:</strong> AKU ist Käuferrisiko</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Finanzierung verlangt AKU:</strong> Käufer muss zahlen</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Züchter-Garantie:</strong> Ersetzt keine AKU</span>
                        </li>
                        <li className="flex items-start text-sm md:text-base">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>Nachverhandlung schwierig:</strong> Vorab klären</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Checklist Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                    <div className="text-center mb-4 md:mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mb-3">
                        <span className="text-xl">📋</span>
                      </div>
                      <h3 className="font-bold text-blue-800 text-lg md:text-xl">Checkliste Kostenvereinbarung</h3>
                      <p className="text-blue-700 text-sm mt-1">Wichtige Punkte für klare Absprachen</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      {/* Pre-clarification Card */}
                      <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-blue-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-blue-800 text-sm md:text-base">Vorab schriftlich klären</h4>
                        </div>
                        <ul className="space-y-2 text-blue-700 text-xs md:text-sm">
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Wer zahlt Basis-AKU?</span>
                          </li>
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Wer zahlt Zusatzuntersuchungen?</span>
                          </li>
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Wer zahlt bei negativem Befund?</span>
                          </li>
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Anfahrtskosten geregelt?</span>
                          </li>
                        </ul>
                      </div>

                      {/* Cost Sharing Notes Card */}
                      <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-blue-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-blue-800 text-sm md:text-base">Bei Kostenteilung beachten</h4>
                        </div>
                        <ul className="space-y-2 text-blue-700 text-xs md:text-sm">
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Schriftliche Vereinbarung</span>
                          </li>
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Abrechnungsmodalitäten</span>
                          </li>
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Tierarzt-Direktabrechnung</span>
                          </li>
                          <li className="flex items-center">
                            <input type="checkbox" className="mr-2 rounded" />
                            <span>Zahlungsfrist definiert</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* CTA within checklist section */}
                    <div className="mt-4 md:mt-6 text-center bg-white rounded-lg p-4 border border-blue-300">
                      <p className="text-blue-800 text-sm mb-3">
                        <strong>Empfehlung:</strong> Vor der AKU sollten Sie den Pferdewert realistisch einschätzen können
                      </p>
                      <Link href="/pferde-preis-berechnen"
                            className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold text-sm md:text-base hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Pferdewert kostenlos berechnen
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cost Saving Tips Section */}
              <section className="bg-white rounded-xl shadow-xl p-4 md:p-8 border border-amber-100 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full -translate-y-16 -translate-x-16 opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-green-50 to-blue-50 rounded-full translate-y-12 translate-x-12 opacity-60"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full mb-4">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-h2 font-bold text-brand-brown mb-2">Kostensparen bei der Ankaufsuntersuchung</h2>
                    <p className="text-gray-600 text-sm md:text-base">Sparen Sie bis zu 40% bei der AKU - ohne Kompromisse bei der Qualität</p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Veterinarian Selection Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-blue-800">Tierarzt-Auswahl strategisch planen</h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { icon: "💡", title: "Lokale Tierärzte", desc: "Oft 20-30% günstiger als spezialisierte Pferdekliniken", saving: "20-30%" },
                          { icon: "👥", title: "Gruppentermine", desc: "Mehrere Untersuchungen am selben Tag", saving: "10-15%" },
                          { icon: "📋", title: "Vergleichsangebote", desc: "Kostenvoranschläge von 3-4 verschiedenen Praxen", saving: "15-25%" },
                          { icon: "📍", title: "Standortwahl", desc: "Tierärzte in ländlichen Gebieten oft preiswerter", saving: "10-20%" }
                        ].map((tip, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start flex-1">
                                <span className="text-xl mr-3 mt-0.5">{tip.icon}</span>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-blue-800 text-sm md:text-base">{tip.title}</h4>
                                  <p className="text-gray-600 text-xs md:text-sm mt-1">{tip.desc}</p>
                                </div>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                                -{tip.saving}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Examination Scope Card */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 border-2 border-green-200 hover:shadow-lg transition-all duration-300 hover:border-green-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-green-800">Untersuchungsumfang anpassen</h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { icon: "🎯", title: "Risikobasiert", desc: "Umfang je nach Kaufpreis und Verwendungszweck wählen", saving: "25-40%" },
                          { icon: "📈", title: "Stufenweise Untersuchung", desc: "Bei niedrigem Kaufpreis mit Basisuntersuchung beginnen", saving: "30-50%" },
                          { icon: "🔬", title: "Fokussierte Diagnostik", desc: "Nur relevante Bereiche für geplanten Einsatz untersuchen", saving: "20-35%" },
                          { icon: "🏥", title: "Klinik vs. Hoftermin", desc: "Hofbesuche vermeiden Transportkosten", saving: "50-150€" }
                        ].map((tip, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start flex-1">
                                <span className="text-xl mr-3 mt-0.5">{tip.icon}</span>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-green-800 text-sm md:text-base">{tip.title}</h4>
                                  <p className="text-gray-600 text-xs md:text-sm mt-1">{tip.desc}</p>
                                </div>
                              </div>
                              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                                -{tip.saving}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hidden Costs Warning */}
                  <div className="mt-6 md:mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 md:p-6 border-2 border-yellow-200 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-yellow-800">Versteckte Kosten vermeiden</h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-yellow-100">
                        <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                          <span className="text-lg mr-2">⚠️</span>
                          Zusatzkosten bedenken:
                        </h4>
                        <div className="space-y-2">
                          {[
                            { cost: "Anfahrtskosten", range: "50-150€", desc: "Bei Hofuntersuchungen" },
                            { cost: "Notfallzuschläge", range: "+20-50%", desc: "Wochenend-/Feiertagsuntersuchungen" },
                            { cost: "Nachuntersuchungen", range: "€€€", desc: "Bei unklaren Befunden weitere Kosten" },
                            { cost: "Sedierung", range: "30-80€", desc: "Nicht immer im Grundpreis enthalten" }
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-yellow-50 rounded text-sm">
                              <div>
                                <span className="font-medium text-yellow-800">{item.cost}:</span>
                                <span className="text-yellow-700 ml-1 text-xs">{item.desc}</span>
                              </div>
                              <span className="font-bold text-red-600">{item.range}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-yellow-100">
                        <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                          <span className="text-lg mr-2">📋</span>
                          Transparente Kostenaufstellung fordern:
                        </h4>
                        <div className="space-y-2">
                          {[
                            "Detaillierte Kostenvoranschläge einholen",
                            "Feste Preise für Untersuchungspakete vereinbaren",
                            "Zusatzleistungen klar definieren lassen",
                            "Zahlungsmodalitäten vorab klären"
                          ].map((item, index) => (
                            <label key={index} className="flex items-center cursor-pointer">
                              <input type="checkbox" className="mr-2 rounded text-yellow-600 focus:ring-yellow-500" />
                              <span className="text-yellow-700 text-xs md:text-sm">{item}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Smart Tip with CTA */}
                  <div className="mt-6 md:mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 md:p-6 border-2 border-blue-200 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100 to-green-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-lg">🎯</span>
                          </div>
                          <h4 className="text-lg md:text-xl font-bold text-gray-800">KI-Bewertung als Spartipp</h4>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          Nur 14,90€
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                        Nutzen Sie unsere <strong className="text-blue-700">KI-gestützte Pferdebewertung</strong> für nur 14,90€, um bereits vor der AKU
                        eine präzise Einschätzung des Pferdewertes zu erhalten. So können Sie die angemessene Investition
                        in die Ankaufsuntersuchung fundiert planen und <strong className="text-green-700">bis zu 500€ sparen</strong>.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href="/was-ist-mein-pferd-wert"
                          className="inline-flex items-center justify-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base min-h-[48px]"
                          onClick={() => {
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'cost_saving_tip_click', {
                                event_category: 'engagement',
                                event_label: 'aku_cost_saving_to_bewertung'
                              })
                            }
                          }}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          Jetzt Risiko vorab einschätzen
                        </Link>

                        <div className="flex items-center text-xs md:text-sm text-gray-500">
                          <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Sofortige Bewertung • Geld-zurück-Garantie
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tax Aspects Section */}
              <section className="bg-white rounded-xl shadow-xl p-4 md:p-8 border border-purple-100 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-50 to-indigo-50 rounded-full -translate-y-16 translate-x-16 opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-h2 font-bold text-brand-brown mb-2">Steuerliche Aspekte der AKU-Kosten</h2>
                    <p className="text-gray-600 text-sm md:text-base">So nutzen Sie AKU-Kosten optimal für Ihre Steuererklärung</p>
                  </div>

                  {/* Main comparison cards */}
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    {/* Commercial horse keeping card */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 md:p-6 border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-xl">✅</span>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-green-800">Gewerbliche Pferdehaltung</h3>
                          <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full mt-1 inline-block">
                            Voll absetzbar
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {[
                          { icon: "💼", title: "Betriebsausgaben", desc: "AKU-Kosten voll absetzbar" },
                          { icon: "📅", title: "Verkauf binnen Jahresfrist", desc: "Vollständig abziehbar" },
                          { icon: "📋", title: "Dokumentation erforderlich", desc: "Belege für Steuererklärung" },
                          { icon: "💰", title: "Umsatzsteuer beachten", desc: "Je nach Tierarzt-Status" }
                        ].map((item, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start">
                              <span className="text-lg mr-3 flex-shrink-0">{item.icon}</span>
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-green-800 text-sm md:text-base">{item.title}</div>
                                <div className="text-green-700 text-xs md:text-sm leading-relaxed">{item.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border border-green-200">
                        <div className="flex items-start">
                          <span className="text-lg mr-2 flex-shrink-0">💡</span>
                          <div>
                            <p className="text-sm text-green-800 font-semibold mb-1">Steuer-Tipp</p>
                            <p className="text-xs md:text-sm text-green-700 leading-relaxed">
                              Bei gewerblicher Zucht oder Handel können AKU-Kosten die Steuerlast erheblich reduzieren.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Private horse keeping card */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 md:p-6 border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-xl">❌</span>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-red-800">Private Pferdehaltung</h3>
                          <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full mt-1 inline-block">
                            Nicht absetzbar
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {[
                          { icon: "🚫", title: "Nicht absetzbar", desc: "Grundsätzlich private Ausgaben" },
                          { icon: "⚖️", title: "Ausnahme", desc: "Nachweis einer Einkunftserzielungsabsicht" },
                          { icon: "👨‍💼", title: "Professionelle Beratung", desc: "Bei Grenzfällen empfohlen" },
                          { icon: "💸", title: "Keine Vorsteuer", desc: "Bruttokosten relevant" }
                        ].map((item, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start">
                              <span className="text-lg mr-3 flex-shrink-0">{item.icon}</span>
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-red-800 text-sm md:text-base">{item.title}</div>
                                <div className="text-red-700 text-xs md:text-sm leading-relaxed">{item.desc}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-lg border border-red-200">
                        <div className="flex items-start">
                          <span className="text-lg mr-2 flex-shrink-0">⚠️</span>
                          <div>
                            <p className="text-sm text-red-800 font-semibold mb-1">Wichtiger Hinweis</p>
                            <p className="text-xs md:text-sm text-red-700 leading-relaxed">
                              Hobbyreiter können AKU-Kosten normalerweise nicht von der Steuer absetzen.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commercial classification guide */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 md:p-6 border border-amber-200 shadow-lg">
                    <div className="flex items-center mb-4 md:mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl">📋</span>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-amber-800">Steuerliche Abgrenzung</h3>
                        <p className="text-amber-700 text-xs md:text-sm">Wann ist es gewerblich?</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      {/* Commercial indicators */}
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
                        <h4 className="font-bold text-amber-800 mb-3 flex items-center">
                          <span className="text-lg mr-2">🏢</span>
                          Indizien für Gewerblichkeit
                        </h4>
                        <div className="space-y-2">
                          {[
                            "Regelmäßiger An- und Verkauf von Pferden",
                            "Zucht mit Verkaufsabsicht",
                            "Pensionsstall-Betrieb",
                            "Reitunterricht gegen Entgelt",
                            "Turniereinsatz mit Preisgeld"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-amber-700 text-xs md:text-sm leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tax optimization tips */}
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-100">
                        <h4 className="font-bold text-amber-800 mb-3 flex items-center">
                          <span className="text-lg mr-2">🎯</span>
                          Steueroptimierung bei Gewerbebetrieb
                        </h4>
                        <div className="space-y-2">
                          {[
                            "AKU-Kosten zeitnah geltend machen",
                            "Alle Belege sammeln und archivieren",
                            "Fahrtkosten zur AKU dokumentieren",
                            "Bei Investitionsabzugsbeträgen berücksichtigen"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-amber-700 text-xs md:text-sm leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA section for tax-conscious users */}
                    <div className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg p-4 text-white">
                      <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                          <h4 className="font-bold text-lg mb-1">Kosten sparen vor der AKU</h4>
                          <p className="text-purple-100 text-sm">Mit unserer KI-Bewertung Risiken vorab erkennen</p>
                        </div>
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'click', {
                                event_category: 'CTA',
                                event_label: 'Tax Section - Start Valuation',
                                value: 1
                              });
                            }
                            // Scroll to calculator
                            document.getElementById('kostenrechner')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors shadow-lg flex items-center min-h-[48px] min-w-[48px] text-sm md:text-base whitespace-nowrap"
                        >
                          Jetzt bewerten für 14,90€
                          <span className="ml-2">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Modern Alternatives Section */}
              <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-xl p-4 md:p-8 border border-blue-200 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-20 -translate-x-20 opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-100 to-blue-100 rounded-full translate-y-16 translate-x-16 opacity-40"></div>

                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4 shadow-lg">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-h2 font-bold text-brand-brown mb-3">Moderne Alternativen zur klassischen AKU</h2>
                    <p className="text-gray-600 text-sm md:text-base max-w-3xl mx-auto">
                      Sparen Sie bis zu 98% der AKU-Kosten mit intelligenter KI-Voruntersuchung
                    </p>
                  </div>

                  {/* Digital Pre-Examination Highlight */}
                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 border border-blue-300 mb-6 md:mb-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mb-4">
                        <span className="text-2xl">💻</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2">Digitale Voruntersuchung</h3>
                      <p className="text-blue-600 text-sm md:text-base">KI-gestützte Risikoeinschätzung in wenigen Minuten</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      {/* Left column - features */}
                      <div className="space-y-4">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          Mit fortschrittlicher KI-Technologie können heute bereits
                          <strong className="text-blue-800"> präzise Pferdebewertungen</strong> online durchgeführt werden.
                          Unsere KI-Analyse berücksichtigt über 50 Bewertungskriterien und
                          kann Ihnen helfen, das Risiko vor einer kostspieligen AKU einzuschätzen.
                        </p>

                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { icon: "⚡", title: "Sofortige Risikoeinschätzung", desc: "Ergebnis in unter 5 Minuten" },
                            { icon: "🎯", title: "Über 50 Bewertungskriterien", desc: "Umfassende Analyse" },
                            { icon: "🛡️", title: "30 Tage Geld-zurück-Garantie", desc: "Risikofrei testen" },
                            { icon: "💎", title: "Wissenschaftlich fundiert", desc: "Veterinärmedizinisch validiert" }
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center bg-blue-50 rounded-lg p-3 border border-blue-100">
                              <span className="text-lg mr-3 flex-shrink-0">{feature.icon}</span>
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-blue-800 text-sm md:text-base">{feature.title}</div>
                                <div className="text-blue-600 text-xs md:text-sm">{feature.desc}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right column - cost comparison highlight */}
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 md:p-6 border border-green-200 shadow-inner">
                        <h4 className="font-bold text-green-800 mb-4 text-center flex items-center justify-center">
                          <span className="text-lg mr-2">💰</span>
                          Kosten-Nutzen-Vergleich
                        </h4>

                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-sm md:text-base">Online-Bewertung:</span>
                              <div className="text-right">
                                <span className="font-bold text-blue-600 text-lg md:text-xl">14,90€</span>
                                <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full mt-1">
                                  Sofort verfügbar
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-100">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 text-sm md:text-base">Klassische AKU:</span>
                              <div className="text-right">
                                <span className="font-bold text-red-600 text-lg md:text-xl">400-2000€</span>
                                <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full mt-1">
                                  + Terminwartzeit
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-4 text-white shadow-lg">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-green-100">Ihre Ersparnis:</span>
                              <div className="text-right">
                                <span className="font-bold text-2xl">bis 98%</span>
                                <div className="text-green-100 text-xs">
                                  = bis zu 1.985€ gespart
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Primary CTA */}
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'click', {
                                event_category: 'CTA',
                                event_label: 'Modern Alternatives - Primary CTA',
                                value: 1
                              });
                            }
                            // Scroll to calculator
                            document.getElementById('kostenrechner')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg mt-4 flex items-center justify-center min-h-[48px] text-sm md:text-base"
                        >
                          <span className="mr-2">🚀</span>
                          Jetzt KI-Bewertung starten
                          <span className="ml-2">→</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Staged Examination Concept */}
                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-green-200">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4">
                        <span className="text-2xl">📋</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2">Gestufte Untersuchungskonzepte</h3>
                      <p className="text-green-600 text-sm md:text-base">Smart investieren - von digital zu physisch</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {/* Stage 1 - Online */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-300 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">1</span>
                          </div>
                          <div className="text-lg font-bold text-green-600">Online-Bewertung</div>
                          <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full mt-1 inline-block">
                            Empfohlen
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          {[
                            "KI-gestützte Risikoeinschätzung",
                            "Marktwert-Analyse",
                            "Kaufempfehlung",
                            "Sofortige Verfügbarkeit"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start text-xs md:text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">14,90€</div>
                          <div className="text-xs text-green-700">Einmalig</div>
                        </div>
                      </div>

                      {/* Stage 2 - Basic examination */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-300 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">2</span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">Basisuntersuchung</div>
                          <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full mt-1 inline-block">
                            Bei positivem Befund
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          {[
                            "Fokussierte Tierarzt-Untersuchung",
                            "Gezielter Untersuchungsumfang",
                            "Kostenoptimiert",
                            "Terminabhängig"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start text-xs md:text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">200-400€</div>
                          <div className="text-xs text-blue-700">Je nach Umfang</div>
                        </div>
                      </div>

                      {/* Stage 3 - Full AKU */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-300 shadow-md hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-lg">3</span>
                          </div>
                          <div className="text-lg font-bold text-purple-600">Vollständige AKU</div>
                          <div className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded-full mt-1 inline-block">
                            Bei Kaufentscheidung
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          {[
                            "Umfassende Diagnostik",
                            "Alle gewünschten Untersuchungen",
                            "Rechtssicherheit",
                            "Höchste Kosten"
                          ].map((item, index) => (
                            <div key={index} className="flex items-start text-xs md:text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {item}
                            </div>
                          ))}
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">400-2000€</div>
                          <div className="text-xs text-purple-700">Komplett</div>
                        </div>
                      </div>
                    </div>

                    {/* Benefits explanation */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 md:p-6 border border-green-200">
                      <h4 className="font-bold text-green-800 mb-4 text-center flex items-center justify-center">
                        <span className="text-lg mr-2">💡</span>
                        Warum das gestufte Konzept funktioniert
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { icon: "💰", title: "Kosteneffizienz", desc: "Sie investieren nur bei realistischen Kaufchancen" },
                          { icon: "🛡️", title: "Risikominimierung", desc: "Frühe Warnsignale werden bereits online erkannt" },
                          { icon: "⏰", title: "Zeitersparnis", desc: "Ungeeignete Pferde werden vorab aussortiert" },
                          { icon: "💪", title: "Verhandlungsstärke", desc: "Mit Fachwissen in die AKU gehen" }
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-start bg-white rounded-lg p-3 shadow-sm border border-green-100">
                            <span className="text-lg mr-3 flex-shrink-0">{benefit.icon}</span>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-green-800 text-sm md:text-base">{benefit.title}</div>
                              <div className="text-green-700 text-xs md:text-sm leading-relaxed">{benefit.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Secondary CTA */}
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => {
                            if (typeof window !== 'undefined' && window.gtag) {
                              window.gtag('event', 'click', {
                                event_category: 'CTA',
                                event_label: 'Modern Alternatives - Secondary CTA',
                                value: 1
                              });
                            }
                            // Scroll to calculator
                            document.getElementById('kostenrechner')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg flex items-center justify-center mx-auto min-h-[48px] text-sm md:text-base"
                        >
                          <span className="mr-2">🎯</span>
                          Stufe 1 jetzt starten
                          <span className="ml-2">→</span>
                        </button>
                        <p className="text-xs text-gray-600 mt-2">30 Tage Geld-zurück-Garantie</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AKU Class Guide */}
              <section className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-xl p-4 md:p-8 border border-gray-200 relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 -mr-16 -mt-16"></div>

                <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-6 relative z-10">🎯 Welche AKU-Klasse für welchen Pferdewert?</h2>

                <div className="space-y-6 md:space-y-8">
                  {/* AKU Class Cards */}
                  <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                    {[
                      {
                        class: "I",
                        title: "Freizeitpferde",
                        cost: "150-300€",
                        color: "green",
                        icon: "🌟",
                        badge: "Empfohlen",
                        badgeStyle: "bg-green-500 text-white",
                        features: [
                          { icon: "💰", text: "Pferdewert: bis 5.000€", highlight: false },
                          { icon: "🔍", text: "Grunduntersuchung", highlight: false },
                          { icon: "📷", text: "4 Standard-Röntgenbilder", highlight: false },
                          { icon: "🏃", text: "Basis-Belastungstest", highlight: false }
                        ],
                        recommendation: "Für Hobby-Reiter ausreichend",
                        percentage: "5-10% vom Pferdewert"
                      },
                      {
                        class: "II",
                        title: "Sportpferde",
                        cost: "400-800€",
                        color: "blue",
                        icon: "🏆",
                        badge: "Standard",
                        badgeStyle: "bg-blue-500 text-white",
                        features: [
                          { icon: "💰", text: "Pferdewert: 5.000-25.000€", highlight: true },
                          { icon: "🔍", text: "Erweiterte Untersuchung", highlight: false },
                          { icon: "📷", text: "8-10 Röntgenbilder", highlight: false },
                          { icon: "🏃", text: "Intensiver Belastungstest", highlight: false }
                        ],
                        recommendation: "Häufigste AKU-Klasse",
                        percentage: "2-5% vom Pferdewert"
                      },
                      {
                        class: "III-V",
                        title: "Hochleistungssport",
                        cost: "800-2000€",
                        color: "purple",
                        icon: "👑",
                        badge: "Premium",
                        badgeStyle: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                        features: [
                          { icon: "💰", text: "Pferdewert: ab 25.000€", highlight: true },
                          { icon: "🔍", text: "Umfassende Diagnostik", highlight: false },
                          { icon: "📷", text: "18+ Röntgenbilder", highlight: false },
                          { icon: "🔬", text: "Endoskopie, Ultraschall", highlight: false }
                        ],
                        recommendation: "Für wertvollste Pferde",
                        percentage: "2-4% vom Pferdewert"
                      }
                    ].map((akuClass, index) => (
                      <div key={index} className={`bg-gradient-to-br from-${akuClass.color}-50 to-white rounded-xl p-4 md:p-6 border border-${akuClass.color}-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                        {/* Header */}
                        <div className="text-center mb-4 md:mb-6">
                          <div className="flex justify-center items-center mb-3">
                            <div className={`w-16 h-16 bg-gradient-to-br from-${akuClass.color}-500 to-${akuClass.color}-600 rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg`}>
                              {akuClass.icon}
                            </div>
                            <div>
                              <div className={`text-2xl md:text-3xl font-bold text-${akuClass.color}-600 mb-1`}>Klasse {akuClass.class}</div>
                              <div className={`${akuClass.badgeStyle} text-xs font-bold px-3 py-1 rounded-full shadow`}>
                                {akuClass.badge}
                              </div>
                            </div>
                          </div>
                          <div className={`text-lg md:text-xl font-bold text-${akuClass.color}-700 mb-1`}>{akuClass.cost}</div>
                          <div className="text-sm text-gray-600">{akuClass.percentage}</div>
                        </div>

                        {/* Title */}
                        <h4 className={`font-bold text-${akuClass.color}-800 mb-4 text-center text-lg md:text-xl`}>{akuClass.title}</h4>

                        {/* Features */}
                        <div className="space-y-3 mb-6">
                          {akuClass.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className={`flex items-center p-3 rounded-lg ${feature.highlight ? `bg-${akuClass.color}-100 border border-${akuClass.color}-200` : 'bg-white border border-gray-100'} shadow-sm hover:shadow-md transition-shadow`}>
                              <span className="text-lg mr-3 flex-shrink-0">{feature.icon}</span>
                              <span className={`text-sm ${feature.highlight ? `text-${akuClass.color}-800 font-semibold` : 'text-gray-700'}`}>
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Recommendation */}
                        <div className={`text-xs text-${akuClass.color}-700 bg-${akuClass.color}-100 p-3 rounded-lg border border-${akuClass.color}-200 text-center`}>
                          <strong>💡 {akuClass.recommendation}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Decision Matrix */}
                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 md:p-6 rounded-xl border border-amber-200 shadow-lg">
                    <div className="flex items-center mb-4 md:mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl">📊</span>
                      </div>
                      <h3 className="font-bold text-amber-800 text-lg md:text-xl">Entscheidungsmatrix: Optimale AKU-Klasse finden</h3>
                    </div>

                    {/* Mobile-friendly table */}
                    <div className="overflow-x-auto">
                      <div className="hidden md:block">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100">
                              <th className="text-left py-3 px-2 font-bold text-amber-800">Pferdewert</th>
                              <th className="text-left py-3 px-2 font-bold text-amber-800">Verwendung</th>
                              <th className="text-left py-3 px-2 font-bold text-amber-800">AKU-Klasse</th>
                              <th className="text-left py-3 px-2 font-bold text-amber-800">Kosten</th>
                              <th className="text-left py-3 px-2 font-bold text-amber-800">% vom Wert</th>
                            </tr>
                          </thead>
                          <tbody className="text-amber-700">
                            {[
                              { value: "bis 3.000€", usage: "Hobby/Freizeit", class: "I (optional)", cost: "150-300€", percent: "5-10%", color: "green" },
                              { value: "3.000-8.000€", usage: "Freizeit/leichter Sport", class: "I-II", cost: "200-500€", percent: "3-8%", color: "blue" },
                              { value: "8.000-25.000€", usage: "Sport/Turnier", class: "II", cost: "400-800€", percent: "2-5%", color: "blue" },
                              { value: "ab 25.000€", usage: "Leistungssport/Zucht", class: "III-V", cost: "800-2000€", percent: "2-4%", color: "purple" }
                            ].map((row, index) => (
                              <tr key={index} className={`border-b border-amber-200 hover:bg-gradient-to-r hover:from-${row.color}-50 hover:to-amber-50 transition-colors`}>
                                <td className="py-3 px-2 font-semibold">{row.value}</td>
                                <td className="py-3 px-2">{row.usage}</td>
                                <td className="py-3 px-2">
                                  <span className={`bg-${row.color}-100 text-${row.color}-800 px-2 py-1 rounded-full text-xs font-bold`}>
                                    {row.class}
                                  </span>
                                </td>
                                <td className="py-3 px-2 font-semibold">{row.cost}</td>
                                <td className="py-3 px-2">
                                  <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-bold">
                                    {row.percent}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile-friendly cards */}
                      <div className="md:hidden space-y-4">
                        {[
                          { value: "bis 3.000€", usage: "Hobby/Freizeit", class: "I (optional)", cost: "150-300€", percent: "5-10%", color: "green", icon: "🌟" },
                          { value: "3.000-8.000€", usage: "Freizeit/leichter Sport", class: "I-II", cost: "200-500€", percent: "3-8%", color: "blue", icon: "🏃" },
                          { value: "8.000-25.000€", usage: "Sport/Turnier", class: "II", cost: "400-800€", percent: "2-5%", color: "blue", icon: "🏆" },
                          { value: "ab 25.000€", usage: "Leistungssport/Zucht", class: "III-V", cost: "800-2000€", percent: "2-4%", color: "purple", icon: "👑" }
                        ].map((item, index) => (
                          <div key={index} className={`bg-gradient-to-r from-${item.color}-50 to-white p-4 rounded-lg border border-${item.color}-200 shadow-md`}>
                            <div className="flex items-center mb-3">
                              <span className="text-2xl mr-3">{item.icon}</span>
                              <div>
                                <div className="font-bold text-gray-800">{item.value}</div>
                                <div className="text-sm text-gray-600">{item.usage}</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div>
                                <div className="text-xs text-gray-500">AKU-Klasse</div>
                                <div className={`bg-${item.color}-100 text-${item.color}-800 px-2 py-1 rounded text-xs font-bold`}>
                                  {item.class}
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Kosten</div>
                                <div className="font-semibold text-sm">{item.cost}</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">% vom Wert</div>
                                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">
                                  {item.percent}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA within decision matrix */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <p className="text-sm text-gray-700 mb-3">
                          <strong>💡 Smarter Ansatz:</strong> Nutzen Sie unsere KI-Bewertung für nur <span className="text-blue-600 font-bold">14,90€</span> und sparen Sie bis zu <span className="text-green-600 font-bold">98%</span> der AKU-Kosten!
                        </p>
                        <button
                          onClick={() => {
                            window.gtag?.('event', 'click', {
                              event_category: 'CTA',
                              event_label: 'AKU Class Guide - Decision Matrix CTA',
                              value: 1
                            });
                            document.getElementById('kostenrechner')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          🚀 KI-Bewertung jetzt starten
                        </button>
                      </div>
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
                  &ldquo;Planen Sie immer 30% Puffer für Zusatzkosten ein. Die AKU-Grundkosten sind nur der Startwert.&rdquo;
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

          {/* Who Pays for AKU Section - Enhanced UX */}
          <section className="mt-12 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl p-6 md:p-8 border border-amber-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
                <span className="text-2xl text-white">💳</span>
              </div>
              <h2 className="text-h2 font-bold text-brand-brown mb-4">Wer zahlt die AKU beim Pferdekauf?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Eine der häufigsten Fragen beim Pferdekauf betrifft die Kostentragung der Ankaufsuntersuchung.
                <br />
                <strong>Hier die wichtigsten Regelungen im Überblick:</strong>
              </p>
            </div>

            {/* Payment Responsibility Cards */}
            <div className="grid gap-6 md:gap-8">
              {[
                {
                  type: "standard",
                  icon: "👤",
                  title: "Standardfall: Käufer trägt die Kosten",
                  subtitle: "95% aller Fälle in Deutschland",
                  description: "In der Regel übernimmt der Käufer die Kosten der AKU, da er das Interesse an der Untersuchung hat und von den Ergebnissen profitiert.",
                  color: "blue",
                  reasons: [
                    { icon: "💰", text: "Käufer profitiert von den Untersuchungsergebnissen" },
                    { icon: "🛡️", text: "Die AKU dient seinem Risikoschutz" },
                    { icon: "🤝", text: "Bei positivem Befund erhält er Verhandlungsmacht" },
                    { icon: "📊", text: "Übliche Marktpraxis in Deutschland" }
                  ],
                  highlight: true
                }
              ].map((paymentCase, index) => (
                <div key={index} className={`bg-gradient-to-br from-${paymentCase.color}-50 to-white rounded-xl p-6 md:p-8 border border-${paymentCase.color}-200 shadow-lg ${paymentCase.highlight ? 'ring-2 ring-blue-300 ring-opacity-50' : ''}`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-${paymentCase.color}-500 to-${paymentCase.color}-600 rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-lg md:text-xl text-white">{paymentCase.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg md:text-xl font-bold text-${paymentCase.color}-800 mb-2`}>{paymentCase.title}</h3>
                      <div className={`inline-block bg-${paymentCase.color}-100 text-${paymentCase.color}-700 text-xs font-medium px-3 py-1 rounded-full mb-3`}>
                        {paymentCase.subtitle}
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-6">{paymentCase.description}</p>
                    </div>
                  </div>

                  <div className={`bg-${paymentCase.color}-100/50 rounded-lg p-4 md:p-6 border border-${paymentCase.color}-200`}>
                    <h4 className={`font-bold text-${paymentCase.color}-800 mb-4 flex items-center gap-2`}>
                      <span className="text-lg">💡</span>
                      Warum zahlt normalerweise der Käufer?
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {paymentCase.reasons.map((reason, reasonIndex) => (
                        <div key={reasonIndex} className="flex items-start gap-3 group">
                          <div className={`flex-shrink-0 w-8 h-8 bg-${paymentCase.color}-200 rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform duration-200`}>
                            {reason.icon}
                          </div>
                          <span className={`text-sm text-${paymentCase.color}-700 leading-relaxed`}>{reason.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Exception Cases */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 md:p-8 border border-amber-200 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg md:text-xl text-white">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-amber-800 mb-1">Ausnahmen und Sondervereinbarungen</h3>
                    <p className="text-amber-700 text-sm">Etwa 5% aller Fälle - individuelle Vereinbarungen möglich</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    {
                      icon: "🏆",
                      title: "Verkäufer-Finanzierung",
                      description: "Bei sehr wertvollen Pferden (>50.000€) übernimmt manchmal der Verkäufer die Kosten als Vertrauensbeweis.",
                      color: "amber",
                      badge: "Premium-Segment"
                    },
                    {
                      icon: "🤝",
                      title: "Geteilte Kosten",
                      description: "Bei Verhandlungen kann eine 50/50-Regelung vereinbart werden, besonders bei mittleren Preislagen.",
                      color: "amber",
                      badge: "Kompromiss-Lösung"
                    },
                    {
                      icon: "📈",
                      title: "Kaufpreis-Integration",
                      description: "Die AKU-Kosten werden in den Verkaufspreis eingerechnet und indirekt vom Käufer getragen.",
                      color: "amber",
                      badge: "Versteckte Kosten"
                    }
                  ].map((exception, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 md:p-6 border border-amber-300 shadow-md hover:shadow-lg transition-all duration-300 group">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                          <span className="text-lg">{exception.icon}</span>
                        </div>
                        <div className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
                          {exception.badge}
                        </div>
                        <h4 className="font-bold text-amber-700 mb-3">{exception.title}</h4>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{exception.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Aspects - Enhanced */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 md:p-8 border border-red-200 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg md:text-xl text-white">⚖️</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-red-800 mb-1">Rechtliche Aspekte</h3>
                    <p className="text-red-700 text-sm">Wichtige Punkte zur Kostentragung und Haftung</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    {
                      icon: "📋",
                      title: "Schriftliche Vereinbarung",
                      description: "Die Kostentragung sollte vor der Untersuchung schriftlich vereinbart werden",
                      color: "red",
                      priority: "Hoch"
                    },
                    {
                      icon: "❌",
                      title: "Negativer Befund",
                      description: "Bei negativem AKU-Ergebnis entstehen trotzdem Kosten für den Auftraggeber",
                      color: "red",
                      priority: "Beachten"
                    },
                    {
                      icon: "🧾",
                      title: "Rechnungsstellung",
                      description: "Der Tierarzt kann seine Rechnung an den Auftraggeber stellen",
                      color: "red",
                      priority: "Standard"
                    }
                  ].map((legal, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 md:p-6 border border-red-300 shadow-md hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <span className="text-base">{legal.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
                            {legal.priority}
                          </div>
                          <h4 className="font-bold text-red-800 mb-2">{legal.title}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{legal.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Clarity CTA */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 md:p-8 text-white text-center shadow-lg">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl md:text-2xl font-bold mb-3">💡 Kosten im Voraus kalkulieren?</h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Bevor Sie sich für eine teure AKU entscheiden, ermitteln Sie den realistischen Marktwert Ihres Wunschpferdes.
                  <strong> Unsere KI-Bewertung kostet nur 14,90€</strong> und hilft bei der Entscheidung.
                </p>
                <button
                  onClick={() => {
                    window.gtag?.('event', 'click', {
                      event_category: 'CTA',
                      event_label: 'Who Pays AKU Section - Cost Clarity CTA',
                      value: 1
                    });
                    window.location.href = '/pferde-preis-berechnen';
                  }}
                  className="w-full md:w-auto bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center gap-2"
                >
                  <span className="text-lg">🚀</span>
                  KI-Bewertung für 14,90€ starten
                </button>
              </div>
            </div>
          </section>

          {/* Cost by Horse Types Section - Enhanced UX */}
          <section className="mt-12 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl p-6 md:p-8 border border-blue-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl text-white">🐎</span>
              </div>
              <h2 className="text-h2 font-bold text-brand-brown mb-4">AKU-Kosten nach Pferdetypen</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Die Kosten für eine Ankaufsuntersuchung variieren je nach Pferdetyp und Verwendungszweck.
                Hier finden Sie eine detaillierte Übersicht der empfohlenen Untersuchungsumfänge.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
              {[
                {
                  type: "leisure",
                  icon: "🌿",
                  title: "Reitpferde & Freizeitpferde",
                  subtitle: "Basis-Untersuchung für den Freizeitsport",
                  color: "green",
                  akuClass: "Standarduntersuchung (Klasse 3)",
                  priceRange: "400-700 Euro",
                  focus: "Grundlegende Gesundheit und Rittigkeit",
                  details: [
                    { icon: "🔍", text: "Klinische Allgemeinuntersuchung" },
                    { icon: "🦴", text: "Lahmheitsuntersuchung" },
                    { icon: "❤️", text: "Herz-Kreislauf-Check" },
                    { icon: "👁️", text: "Augenuntersuchung" }
                  ],
                  popularity: "78% aller Pferdekäufe"
                },
                {
                  type: "sport",
                  icon: "🏆",
                  title: "Sportpferde (Dressur, Springen)",
                  subtitle: "Erweiterte Diagnostik für Leistungssport",
                  color: "blue",
                  akuClass: "Umfassende Untersuchung (Klasse 4-5)",
                  priceRange: "800-1.500 Euro",
                  focus: "Leistungsfähigkeit und Belastbarkeit",
                  details: [
                    { icon: "📸", text: "Röntgenuntersuchung" },
                    { icon: "🩺", text: "Erweiterte Lahmheitsdiagnostik" },
                    { icon: "💪", text: "Belastungstest" },
                    { icon: "🧬", text: "Laboruntersuchungen" }
                  ],
                  popularity: "15% aller Pferdekäufe",
                  highlight: true
                },
                {
                  type: "breeding",
                  icon: "👑",
                  title: "Zuchtpferde",
                  subtitle: "Premium-Diagnostik inkl. Zuchtfähigkeit",
                  color: "purple",
                  akuClass: "Premium-Untersuchung mit Zuchtfähigkeitsprüfung",
                  priceRange: "1.200-2.500 Euro",
                  focus: "Reproduktionsfähigkeit und genetische Gesundheit",
                  details: [
                    { icon: "🧬", text: "Genetische Untersuchungen" },
                    { icon: "🔬", text: "Reproduktionsmedizin" },
                    { icon: "📊", text: "Vollständige Röntgendiagnostik" },
                    { icon: "💉", text: "Umfassende Blutanalyse" }
                  ],
                  popularity: "7% aller Pferdekäufe"
                }
              ].map((horseType, index) => (
                <div
                  key={index}
                  className={`group bg-gradient-to-br from-${horseType.color}-50 to-white rounded-xl p-6 md:p-8 border border-${horseType.color}-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${horseType.highlight ? 'ring-2 ring-blue-400 ring-opacity-50 scale-105' : ''}`}
                >
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${horseType.color}-400 to-${horseType.color}-600 rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl text-white">{horseType.icon}</span>
                    </div>
                    <h3 className={`text-xl font-bold text-${horseType.color}-800 mb-2`}>{horseType.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{horseType.subtitle}</p>
                    <div className={`inline-block bg-${horseType.color}-100 text-${horseType.color}-700 text-xs font-medium px-3 py-1 rounded-full`}>
                      {horseType.popularity}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Empfohlene AKU:</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Standard</span>
                      </div>
                      <div className={`font-bold text-${horseType.color}-700 text-sm`}>{horseType.akuClass}</div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Durchschnittskosten:</span>
                        <span className="text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded">Preisspanne</span>
                      </div>
                      <div className={`font-bold text-${horseType.color}-700 text-lg`}>{horseType.priceRange}</div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="text-sm font-medium text-gray-600 mb-2">Untersuchungsfokus:</div>
                      <div className={`font-bold text-${horseType.color}-700 text-sm`}>{horseType.focus}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-3">Typische Untersuchungen:</h4>
                    {horseType.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                        <span className="text-base">{detail.icon}</span>
                        <span>{detail.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        window.gtag?.('event', 'click', {
                          event_category: 'CTA',
                          event_label: `Horse Type Section - ${horseType.title} CTA`,
                          value: 1
                        });
                        window.location.href = '/pferde-preis-berechnen';
                      }}
                      className={`w-full bg-gradient-to-r from-${horseType.color}-500 to-${horseType.color}-600 text-white font-bold py-3 px-4 rounded-lg hover:from-${horseType.color}-600 hover:to-${horseType.color}-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center gap-2 text-sm`}
                    >
                      <span className="text-base">{horseType.icon}</span>
                      Bewertung für nur 14,90€
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Value-Cost Ratio - Enhanced */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 md:p-8 border border-amber-200 shadow-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
                  <span className="text-xl text-white">📊</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-3">AKU-Kosten und Pferdewert-Verhältnis</h3>
                <p className="text-gray-700 max-w-3xl mx-auto">
                  Mit unserer <strong className="text-amber-700">KI-gestützten Pferdebewertung</strong> können Sie bereits vor der AKU den realistischen
                  Marktwert ermitteln und so die angemessene Investition in die Ankaufsuntersuchung planen.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
                {[
                  {
                    priceRange: "unter 5.000€",
                    akuCost: "bis 400€",
                    percentage: "8% des Kaufpreises",
                    icon: "🌱",
                    description: "Einsteigerbereich"
                  },
                  {
                    priceRange: "5.000-15.000€",
                    akuCost: "bis 800€",
                    percentage: "5% des Kaufpreises",
                    icon: "🎯",
                    description: "Mittelklasse",
                    highlight: true
                  },
                  {
                    priceRange: "über 15.000€",
                    akuCost: "bis 1.500€",
                    percentage: "3-5% des Kaufpreises",
                    icon: "💎",
                    description: "Premium-Segment"
                  }
                ].map((range, index) => (
                  <div
                    key={index}
                    className={`bg-white p-4 md:p-6 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${range.highlight ? 'border-amber-300 ring-2 ring-amber-200' : 'border-amber-200'}`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{range.icon}</div>
                      <div className="font-bold text-amber-700 text-lg mb-1">Kaufpreis {range.priceRange}</div>
                      <div className="text-sm text-gray-600 mb-1">AKU-Kosten {range.akuCost}</div>
                      <div className="text-xs text-amber-600 font-medium bg-amber-100 px-2 py-1 rounded-full inline-block mb-2">
                        {range.percentage}
                      </div>
                      <div className="text-xs text-gray-500">{range.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    window.gtag?.('event', 'click', {
                      event_category: 'CTA',
                      event_label: 'Cost Ratio Section - Smart Alternative CTA',
                      value: 1
                    });
                    window.location.href = '/pferde-preis-berechnen';
                  }}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center gap-3 mx-auto text-lg"
                >
                  <span className="text-xl">🚀</span>
                  Jetzt smarte Alternative für 14,90€ nutzen
                  <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded">statt bis zu 2.500€</span>
                </button>
              </div>
            </div>
          </section>

          {/* Cost Saving Tips Section - Enhanced UX */}
          <section className="mt-12 bg-gradient-to-br from-white to-green-50 rounded-xl shadow-xl p-6 md:p-8 border border-green-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl text-white">💰</span>
              </div>
              <h2 className="text-h2 font-bold text-brand-brown mb-4">Kostensparen bei der Ankaufsuntersuchung</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Clevere Strategien um AKU-Kosten zu reduzieren, ohne die Qualität der Untersuchung zu beeinträchtigen.
                <strong className="text-green-600"> Oder nutzen Sie unsere moderne KI-Alternative für nur 14,90€.</strong>
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
              {[
                {
                  category: "vet-selection",
                  icon: "🎯",
                  title: "Tierarzt-Auswahl strategisch planen",
                  subtitle: "Bis zu 40% Ersparnis möglich",
                  color: "green",
                  tips: [
                    {
                      icon: "🏥",
                      title: "Lokale Tierärzte",
                      description: "Oft günstiger als spezialisierte Pferdekliniken",
                      savings: "20-40% günstiger"
                    },
                    {
                      icon: "👥",
                      title: "Gruppentermine",
                      description: "Mehrere Untersuchungen am selben Tag können Rabatte bringen",
                      savings: "10-20% Rabatt"
                    },
                    {
                      icon: "📊",
                      title: "Vergleichsangebote",
                      description: "Kostenvoranschläge von verschiedenen Praxen einholen",
                      savings: "bis 30% sparen"
                    }
                  ]
                },
                {
                  category: "scope-optimization",
                  icon: "📋",
                  title: "Untersuchungsumfang anpassen",
                  subtitle: "Bedarfsgerechte Diagnostik",
                  color: "blue",
                  tips: [
                    {
                      icon: "⚖️",
                      title: "Risikobasiert",
                      description: "Umfang je nach Kaufpreis und Verwendungszweck wählen",
                      savings: "200-800€ möglich"
                    },
                    {
                      icon: "📈",
                      title: "Stufenweise Untersuchung",
                      description: "Bei niedrigem Kaufpreis mit Basisuntersuchung beginnen",
                      savings: "300-600€ sparen"
                    },
                    {
                      icon: "🎯",
                      title: "Fokussierte Diagnostik",
                      description: "Nur relevante Bereiche untersuchen lassen",
                      savings: "150-400€ weniger"
                    }
                  ]
                }
              ].map((tipCategory, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-${tipCategory.color}-50 to-white rounded-xl p-6 md:p-8 border border-${tipCategory.color}-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-${tipCategory.color}-400 to-${tipCategory.color}-600 rounded-full mb-4 shadow-lg`}>
                      <span className="text-xl text-white">{tipCategory.icon}</span>
                    </div>
                    <h3 className={`text-xl font-bold text-${tipCategory.color}-800 mb-2`}>{tipCategory.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{tipCategory.subtitle}</p>
                  </div>

                  <div className="space-y-4">
                    {tipCategory.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="text-lg">{tip.icon}</div>
                          </div>
                          <div className="flex-grow">
                            <div className="font-bold text-gray-800 text-sm mb-1">{tip.title}</div>
                            <div className="text-gray-600 text-sm mb-2">{tip.description}</div>
                            <div className={`inline-block bg-${tipCategory.color}-100 text-${tipCategory.color}-700 text-xs font-medium px-2 py-1 rounded-full`}>
                              💰 {tip.savings}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden Costs Warning & Transparency */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 shadow-lg">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-3 shadow-lg">
                    <span className="text-lg text-white">🚨</span>
                  </div>
                  <h3 className="text-lg font-bold text-amber-800 mb-2">Versteckte Kosten vermeiden</h3>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-800 text-sm mb-3">Zusatzkosten die oft überraschen:</h4>
                  {[
                    { cost: "Anfahrtskosten", amount: "50-150€", detail: "Bei Hofuntersuchungen" },
                    { cost: "Notfallzuschläge", amount: "+20-50%", detail: "Wochenend-/Feiertagsuntersuchungen" },
                    { cost: "Nachuntersuchungen", amount: "200-500€", detail: "Bei unklaren Befunden" },
                    { cost: "Befundübermittlung", amount: "meist 0€", detail: "Digital oder postalisch" }
                  ].map((hiddenCost, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-200 text-sm">
                      <div>
                        <div className="font-medium text-gray-800">{hiddenCost.cost}</div>
                        <div className="text-xs text-gray-600">{hiddenCost.detail}</div>
                      </div>
                      <div className="font-bold text-amber-700">{hiddenCost.amount}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200 shadow-lg">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full mb-3 shadow-lg">
                    <span className="text-lg text-white">📝</span>
                  </div>
                  <h3 className="text-lg font-bold text-purple-800 mb-2">Transparente Kostenaufstellung</h3>
                </div>

                <div className="space-y-3">
                  {[
                    "Detaillierte Kostenvoranschläge einholen",
                    "Feste Preise für Untersuchungspakete vereinbaren",
                    "Zusatzleistungen klar definieren lassen",
                    "Schriftliche Kostenbestätigung verlangen"
                  ].map((transparency, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-purple-200 text-sm">
                      <span className="text-purple-600 mt-0.5">✓</span>
                      <span className="text-gray-700">{transparency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best Alternative Highlight */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Die beste Kostenspar-Alternative</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Statt komplizierte Kosteneinsparungen bei der AKU zu planen - nutzen Sie direkt unsere
                  <strong className="text-white"> KI-gestützte Pferdebewertung für nur 14,90€.</strong>
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: "⚡", title: "Sofortige Bewertung", desc: "In wenigen Minuten" },
                    { icon: "💰", title: "Transparenter Preis", desc: "Einmalig 14,90€" },
                    { icon: "🎯", title: "Präzise KI-Analyse", desc: "50+ Bewertungskriterien" }
                  ].map((benefit, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">{benefit.icon}</div>
                      <div className="font-bold text-sm mb-1">{benefit.title}</div>
                      <div className="text-xs text-blue-200">{benefit.desc}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    window.gtag?.('event', 'click', {
                      event_category: 'CTA',
                      event_label: 'Cost Saving Section - Best Alternative CTA',
                      value: 1
                    });
                    window.location.href = '/pferde-preis-berechnen';
                  }}
                  className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[48px] flex items-center justify-center gap-3 mx-auto text-lg"
                >
                  <span className="text-xl">💡</span>
                  Jetzt KI-Bewertung für 14,90€ starten
                  <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded ml-2">statt bis zu 2.500€</span>
                </button>
              </div>
            </div>
          </section>

          {/* Modern Alternatives Section - Enhanced UX */}
          <section className="mt-12 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl p-6 md:p-8 border border-blue-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl text-white">🚀</span>
              </div>
              <h2 className="text-h2 font-bold text-brand-brown mb-4">Moderne Alternativen zur klassischen AKU</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Nutzen Sie modernste Technologie für smarte, kosteneffiziente Pferdebewertungen
              </p>
            </div>

            {/* Primary KI Alternative Highlight */}
            <div className="mb-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">KI-Powered Digitale Pferdebewertung</h3>
                    <div className="flex items-center mt-1">
                      <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold mr-2">
                        99% günstiger
                      </span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        Über 50 Bewertungskriterien
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: "⚡", title: "2 Minuten", desc: "Sofortiges Ergebnis" },
                    { icon: "🎯", title: "95% Genauigkeit", desc: "KI-Algorithmus" },
                    { icon: "💰", title: "14,90€", desc: "statt bis 2.500€" }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <div className="font-bold text-sm">{feature.title}</div>
                      <div className="text-xs text-blue-100">{feature.desc}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'engagement',
                        event_label: 'moderne_alternative_ki_bewertung'
                      })
                    }
                    window.location.href = '/pferde-preis-berechnen'
                  }}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[48px] w-full md:w-auto"
                >
                  Jetzt KI-Bewertung für 14,90€ starten
                  <span className="block text-sm font-normal mt-1 opacity-90">30 Tage Geld-zurück-Garantie</span>
                </button>
              </div>
            </div>

            {/* Stepped Approach Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 md:p-8 border border-green-100 shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-xl text-white">📊</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-green-800">Gestufte Untersuchungskonzepte</h3>
                  <p className="text-green-600 text-sm">Smart sparen mit dem 3-Stufen-Modell</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    stage: "Stufe 1",
                    icon: "🔍",
                    title: "Online KI-Bewertung",
                    price: "14,90€",
                    savings: "99% Ersparnis",
                    description: "Risikoeinschätzung und Marktpreis-Analyse",
                    color: "green",
                    popular: true
                  },
                  {
                    stage: "Stufe 2",
                    icon: "🩺",
                    title: "Basisuntersuchung",
                    price: "300-500€",
                    savings: "50% günstiger",
                    description: "Nur bei positivem Online-Befund",
                    color: "blue"
                  },
                  {
                    stage: "Stufe 3",
                    icon: "🏥",
                    title: "Erweiterte AKU",
                    price: "800-2.500€",
                    savings: "Nur wenn nötig",
                    description: "Bei ernsthaftem Kaufinteresse",
                    color: "purple"
                  }
                ].map((step, index) => (
                  <div key={index} className={`relative group bg-white rounded-xl p-4 md:p-6 border-2 border-${step.color}-200 hover:border-${step.color}-300 transition-all duration-300 hover:shadow-lg ${step.popular ? 'ring-2 ring-green-400 ring-opacity-50' : ''}`}>
                    {step.popular && (
                      <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Beliebteste Option
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-lg flex items-center justify-center mr-4 text-white`}>
                          {step.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className={`font-bold text-${step.color}-600 mr-3 text-lg`}>{step.stage}:</span>
                            <span className="font-bold text-gray-800">{step.title}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-800">{step.price}</div>
                        <div className={`text-xs bg-${step.color}-100 text-${step.color}-600 px-2 py-1 rounded-full`}>
                          {step.savings}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Buyer Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 md:p-8 border border-amber-100 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-xl text-white">💡</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-amber-800">Profi-Tipps für kostenbewusste Pferdekäufer</h3>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: "🎯",
                    title: "Smarte Vorbereitung",
                    color: "blue",
                    tips: [
                      { icon: "🤖", text: "2-Minuten KI-Bewertung als erste Orientierung", highlight: true },
                      { icon: "✅", text: "Seriöse Verkäufer unterstützen transparente Bewertungen" },
                      { icon: "🔄", text: "Mehrere Pferde parallel bewerten" }
                    ]
                  },
                  {
                    icon: "💬",
                    title: "Verhandlungs-Power",
                    color: "green",
                    tips: [
                      { icon: "💰", text: "AKU-Kosten als Preisverhandlung einsetzen" },
                      { icon: "👥", text: "Kostenteilung bei mehreren Interessenten" },
                      { icon: "📈", text: "Positive Bewertung als Preisargument nutzen" }
                    ]
                  },
                  {
                    icon: "🛡️",
                    title: "Risiko minimieren",
                    color: "purple",
                    tips: [
                      { icon: "👨‍⚕️", text: "Spezialisierten Tierarzt für Disziplin wählen" },
                      { icon: "🔄", text: "Zweitmeinung bei kritischen Befunden" },
                      { icon: "📝", text: "Kaufvertrag an positive Untersuchung knüpfen" }
                    ]
                  }
                ].map((category, index) => (
                  <div key={index} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 rounded-lg flex items-center justify-center mr-3 text-white`}>
                        {category.icon}
                      </div>
                      <h4 className="font-bold text-gray-800 text-lg">{category.title}</h4>
                    </div>
                    <div className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className={`flex items-start p-3 rounded-lg transition-colors ${tip.highlight ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}>
                          <span className="text-lg mr-3 flex-shrink-0">{tip.icon}</span>
                          <span className={`text-sm ${tip.highlight ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>
                            {tip.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 text-center">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-6 text-white shadow-xl">
                  <h4 className="text-lg font-bold mb-2">Starten Sie smart mit unserer KI-Bewertung</h4>
                  <p className="text-amber-100 text-sm mb-4">Risiko minimieren, Kosten sparen, bessere Entscheidungen treffen</p>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'cta_click', {
                          event_category: 'engagement',
                          event_label: 'smart_tips_ki_bewertung'
                        })
                      }
                      window.location.href = '/pferde-preis-berechnen'
                    }}
                    className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 min-h-[48px]"
                  >
                    Jetzt für 14,90€ starten
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section - Enhanced UX */}
          <section className="mt-12 bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-xl p-6 md:p-8 border border-purple-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                <span className="text-2xl text-white">❓</span>
              </div>
              <h2 className="text-h2 font-bold text-brand-brown mb-4">Häufige Fragen zu AKU-Kosten</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Alle wichtigen Antworten rund um Kosten, Ablauf und Alternativen zur Ankaufsuntersuchung
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
              {[
                {
                  icon: "💰",
                  question: "Wie viel kostet eine AKU beim Pferdekauf?",
                  answer: "Die Kosten variieren zwischen 150 Euro (Basisuntersuchung) und 2.500 Euro (Komplettuntersuchung). Der Durchschnitt liegt bei 600-800 Euro für eine Standarduntersuchung mit Röntgenbildern.",
                  color: "blue",
                  highlight: false
                },
                {
                  icon: "🤝",
                  question: "Wer bezahlt die Ankaufsuntersuchung - Käufer oder Verkäufer?",
                  answer: "Üblicherweise trägt der Käufer die AKU-Kosten, da er das Interesse an der Untersuchung hat. Sondervereinbarungen sind jedoch möglich und sollten vorab schriftlich vereinbart werden.",
                  color: "green",
                  highlight: false
                },
                {
                  icon: "📊",
                  question: "Kann ich AKU-Kosten von der Steuer absetzen?",
                  answer: "Bei gewerblicher Pferdehaltung sind AKU-Kosten als Betriebsausgaben absetzbar. Private Pferdebesitzer können die Kosten normalerweise nicht steuerlich geltend machen.",
                  color: "amber",
                  highlight: false
                },
                {
                  icon: "⚠️",
                  question: "Was passiert, wenn die AKU negativ ausfällt?",
                  answer: "Die Untersuchungskosten entstehen trotzdem und müssen bezahlt werden. Daher sollte vorher vereinbart werden, was bei negativem Befund geschieht - oft wird der Kaufvertrag dann hinfällig.",
                  color: "red",
                  highlight: false
                },
                {
                  icon: "🗺️",
                  question: "Sind AKU-Kosten in verschiedenen Regionen unterschiedlich?",
                  answer: "Ja, es gibt deutliche regionale Preisunterschiede. Bayern und Baden-Württemberg haben tendenziell höhere Kosten, während Niedersachsen durch die hohe Tierarztdichte konkurrenzfähige Preise bietet.",
                  color: "purple",
                  highlight: false
                },
                {
                  icon: "💡",
                  question: "Welche Untersuchung ist für mein Budget angemessen?",
                  answer: "Als Faustregel gelten 3-8% des Kaufpreises als angemessene AKU-Investition. Bei einem 10.000-Euro-Pferd sind also 500-800 Euro für eine Standarduntersuchung gerechtfertigt.",
                  color: "indigo",
                  highlight: false
                },
                {
                  icon: "🚀",
                  question: "Kann ich AKU-Kosten sparen, ohne Risiken einzugehen?",
                  answer: "Ja, durch strategische Tierarzt-Auswahl, angepassten Untersuchungsumfang und moderne Online-Voruntersuchungen. Unsere KI-Bewertung hilft dabei, das Risiko vorab einzuschätzen.",
                  color: "blue",
                  highlight: true,
                  cta: "KI-Bewertung jetzt testen"
                },
                {
                  icon: "📅",
                  question: "Was kostet eine AKU am Wochenende oder Feiertag?",
                  answer: "Notfall- und Wochenendzuschläge betragen meist 20-50% der normalen Kosten. Planen Sie AKU-Termine daher bevorzugt unter der Woche.",
                  color: "orange",
                  highlight: false
                }
              ].map((faq, index) => (
                <div key={index} className={`group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 ${faq.highlight ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}>
                  <div className="flex items-start mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br from-${faq.color}-500 to-${faq.color}-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 shadow-lg`}>
                      <span className="text-white text-lg">{faq.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{faq.question}</h3>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {faq.answer}
                  </p>

                  {faq.highlight && faq.cta && (
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && window.gtag) {
                          window.gtag('event', 'cta_click', {
                            event_category: 'engagement',
                            event_label: 'faq_ki_bewertung'
                          })
                        }
                        window.location.href = '/pferde-preis-berechnen'
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 min-h-[48px] w-full"
                    >
                      {faq.cta} - nur 14,90€
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* FAQ Highlight CTA */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white shadow-xl text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Haben Sie noch Fragen?</h3>
                <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                  Unsere KI-Bewertung beantwortet viele Fragen automatisch und gibt Ihnen sofortigen Einblick in den Wert Ihres Wunschpferdes
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'engagement',
                        event_label: 'faq_bottom_ki_bewertung'
                      })
                    }
                    window.location.href = '/pferde-preis-berechnen'
                  }}
                  className="bg-white text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 min-h-[48px] flex-1"
                >
                  KI-Bewertung starten
                </button>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'cta_click', {
                        event_category: 'engagement',
                        event_label: 'faq_contact'
                      })
                    }
                    // Scroll to contact or open contact modal
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 min-h-[48px] flex-1"
                >
                  Kontakt aufnehmen
                </button>
              </div>
            </div>
          </section>

          {/* Conclusion Section - Enhanced UX */}
          <section className="mt-12 bg-gradient-to-br from-white to-amber-50 rounded-xl shadow-xl p-6 md:p-8 border border-amber-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-200/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-300/10 rounded-full"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4 shadow-lg">
                  <span className="text-2xl text-white">✅</span>
                </div>
                <h2 className="text-h2 font-bold text-brand-brown mb-4">Fazit: Investition in Sicherheit beim Pferdekauf</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
              </div>

              {/* Key Benefits Grid */}
              <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                {[
                  {
                    icon: "🛡️",
                    title: "Schutz vor Risiken",
                    description: "3-8% des Kaufpreises schützen vor kostspieligen Überraschungen",
                    color: "blue",
                    highlight: "Unverzichtbare Investition"
                  },
                  {
                    icon: "💰",
                    title: "Kostenersparnis",
                    description: "Verhindert teure Folgekosten durch versteckte Gesundheitsprobleme",
                    color: "green",
                    highlight: "Bis zu 90% günstiger als Reparaturkosten"
                  },
                  {
                    icon: "🎯",
                    title: "Fundierte Entscheidung",
                    description: "Gewissheit über Gesundheit und Eignung für geplanten Einsatz",
                    color: "purple",
                    highlight: "100% Transparenz"
                  }
                ].map((benefit, index) => (
                  <div key={index} className={`group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-${benefit.color}-100 hover:border-${benefit.color}-300`}>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-600 rounded-full mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl text-white">{benefit.icon}</span>
                      </div>
                      <h3 className="font-bold text-brand-brown mb-2">{benefit.title}</h3>
                      <p className="text-gray-700 text-sm mb-3 leading-relaxed">{benefit.description}</p>
                      <div className={`inline-block bg-${benefit.color}-100 text-${benefit.color}-800 px-3 py-1 rounded-full text-xs font-medium`}>
                        {benefit.highlight}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Smart Strategy Tip */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-white/20 rounded-full p-3">
                      <span className="text-2xl">💡</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-3">Smart Strategy: KI-Bewertung vor AKU</h3>
                      <p className="text-blue-100 mb-4 leading-relaxed">
                        Nutzen Sie moderne Technologie zu Ihrem Vorteil. Mit unserer <strong className="text-white">KI-gestützten Pferdebewertung</strong> erhalten
                        Sie bereits vor der AKU eine präzise Einschätzung des Pferdewertes und können so fundierte
                        Entscheidungen über den Untersuchungsumfang treffen.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                          99% günstiger als AKU
                        </span>
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                          2-Minuten-Bewertung
                        </span>
                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Sofortige Ergebnisse
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Statement */}
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg border-2 border-brand-brown/20">
                <div className="text-center">
                  <div className="flex justify-center items-center space-x-2 mb-4">
                    <span className="text-2xl">🏆</span>
                    <h3 className="font-bold text-brand-brown text-xl">Deutschlands #1 KI-Pferdebewertung</h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
                    Als führende Plattform für <strong className="text-brand-brown">AI-basierte Pferdebewertung</strong> unterstützen
                    wir Sie dabei, den fairen Marktpreis zu ermitteln und kostspielige Fehlentscheidungen zu vermeiden.
                    Unsere <strong>2-Minuten-Bewertung</strong> ist der perfekte erste Schritt vor jeder Ankaufsuntersuchung.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                      <span className="text-green-600">✓</span>
                      <span className="text-green-800 font-medium">Transparent & schnell</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                      <span className="text-green-600">✓</span>
                      <span className="text-green-800 font-medium">30 Tage Geld-zurück-Garantie</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                      <span className="text-green-600">✓</span>
                      <span className="text-green-800 font-medium">Über 10.000 zufriedene Kunden</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA - Enhanced UX */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-brand-brown via-brand-brownDark to-brand-brown text-white rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/5 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-300/20 rounded-full"></div>
              <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full"></div>

              <div className="relative z-10">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-xl">
                    <span className="text-3xl text-white">🚀</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Starten Sie jetzt Ihre kostenlose Pferdebewertung
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full mb-6"></div>
                  <p className="text-amber-100 text-lg leading-relaxed max-w-3xl mx-auto">
                    Gehen Sie mit maximaler Sicherheit in Ihren nächsten Pferdekauf! Ermitteln Sie den fairen
                    Marktwert vor der kostspieligen AKU-Investition.
                  </p>
                </div>

                {/* Value Props */}
                <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                  {[
                    { icon: "⚡", text: "2-Minuten Bewertung", color: "yellow" },
                    { icon: "💰", text: "99% günstiger als AKU", color: "green" },
                    { icon: "🔒", text: "30 Tage Garantie", color: "blue" }
                  ].map((prop, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-xl">{prop.icon}</span>
                        <span className="font-medium text-white">{prop.text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <Link
                    href="/pferde-preis-berechnen"
                    className="bg-white text-brand-brown hover:bg-gray-100 hover:scale-105 px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-xl min-h-[48px] flex items-center justify-center"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'cta_click', {
                          event_category: 'engagement',
                          event_label: 'aku_kosten_conclusion_to_bewertung',
                          event_value: 1
                        })
                      }
                    }}
                  >
                    <span className="mr-2">🎯</span>
                    Jetzt Pferdewert berechnen
                  </Link>
                  <Link
                    href="/was-ist-mein-pferd-wert"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-brown hover:scale-105 px-8 py-4 rounded-xl transition-all duration-300 font-bold text-lg min-h-[48px] flex items-center justify-center"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'cta_click', {
                          event_category: 'engagement',
                          event_label: 'aku_kosten_conclusion_to_schnellbewertung',
                          event_value: 1
                        })
                      }
                    }}
                  >
                    <span className="mr-2">⚡</span>
                    Kostenlose Schnellbewertung
                  </Link>
                </div>

                {/* Trust indicator */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-amber-200 text-sm">
                    <span className="inline-flex items-center space-x-1">
                      <span>🔒</span>
                      <span>SSL-verschlüsselt</span>
                    </span>
                    <span className="mx-3">•</span>
                    <span className="inline-flex items-center space-x-1">
                      <span>⭐</span>
                      <span>4.9/5 Kundenbewertung</span>
                    </span>
                    <span className="mx-3">•</span>
                    <span className="inline-flex items-center space-x-1">
                      <span>🚀</span>
                      <span>Über 10.000 Bewertungen</span>
                    </span>
                  </p>
                </div>
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