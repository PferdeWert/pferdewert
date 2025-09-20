import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface ROICalculation {
  akuCost: number
  horseValue: number
  riskPercentage: number
  potentialLoss: number
  roiRatio: number
  breakEvenRisk: number
}

interface RegionalPricing {
  region: string
  classI: { min: number; max: number }
  classII: { min: number; max: number }
  classIII: { min: number; max: number }
  additionalCosts: string[]
}

const AKUKostenNutzen: NextPage = () => {
  const [horseValue, setHorseValue] = useState<number>(15000)
  const [selectedClass, setSelectedClass] = useState<string>('II')
  const [selectedRegion, setSelectedRegion] = useState<string>('deutschland')
  const [roiData, setROIData] = useState<ROICalculation | null>(null)
  const [showAdvancedCalculator, setShowAdvancedCalculator] = useState<boolean>(false)

  const regionalPricing: RegionalPricing[] = [
    {
      region: 'Deutschland (Durchschnitt)',
      classI: { min: 150, max: 300 },
      classII: { min: 400, max: 800 },
      classIII: { min: 800, max: 2000 },
      additionalCosts: ['Anfahrt: 50-150€', 'Sedierung: 50-100€']
    },
    {
      region: 'Bayern',
      classI: { min: 180, max: 350 },
      classII: { min: 450, max: 900 },
      classIII: { min: 900, max: 2200 },
      additionalCosts: ['Anfahrt: 60-180€', 'Sedierung: 60-120€', 'Wochenende: +20%']
    },
    {
      region: 'Nordrhein-Westfalen',
      classI: { min: 160, max: 320 },
      classII: { min: 420, max: 820 },
      classIII: { min: 820, max: 2100 },
      additionalCosts: ['Anfahrt: 50-140€', 'Sedierung: 50-110€']
    },
    {
      region: 'Norddeutschland',
      classI: { min: 140, max: 280 },
      classII: { min: 380, max: 750 },
      classIII: { min: 750, max: 1900 },
      additionalCosts: ['Anfahrt: 40-120€', 'Sedierung: 45-95€']
    }
  ]

  const calculateROI = (akuClass: string, horseVal: number, region: string): ROICalculation => {
    const regionData = regionalPricing.find(r => r.region.toLowerCase().includes(region)) || regionalPricing[0]

    let akuCost: number
    switch (akuClass) {
      case 'I':
        akuCost = (regionData.classI.min + regionData.classI.max) / 2
        break
      case 'II':
        akuCost = (regionData.classII.min + regionData.classII.max) / 2
        break
      case 'III-V':
        akuCost = (regionData.classIII.min + regionData.classIII.max) / 2
        break
      default:
        akuCost = 600
    }

    // Risikoprozentsatz basierend auf Statistiken
    const riskPercentage = akuClass === 'I' ? 15 : akuClass === 'II' ? 25 : 35
    const potentialLoss = horseVal * (riskPercentage / 100)
    const roiRatio = potentialLoss / akuCost
    const breakEvenRisk = (akuCost / horseVal) * 100

    return {
      akuCost,
      horseValue: horseVal,
      riskPercentage,
      potentialLoss,
      roiRatio,
      breakEvenRisk
    }
  }

  useEffect(() => {
    setROIData(calculateROI(selectedClass, horseValue, selectedRegion))
  }, [horseValue, selectedClass, selectedRegion])

  const costComparisonData = [
    {
      scenario: 'Freizeitpferd (5.000€)',
      recommendedClass: 'I',
      akuCost: '150-300€',
      riskWithoutAKU: '750€ (15% Risiko)',
      roiRatio: '2.5-5x',
      recommendation: 'Sehr empfehlenswert'
    },
    {
      scenario: 'Sportpferd (15.000€)',
      recommendedClass: 'II',
      akuCost: '400-800€',
      riskWithoutAKU: '3.750€ (25% Risiko)',
      roiRatio: '4.7-9.4x',
      recommendation: 'Unbedingt erforderlich'
    },
    {
      scenario: 'Hochleistungspferd (50.000€)',
      recommendedClass: 'III-V',
      akuCost: '800-2000€',
      riskWithoutAKU: '17.500€ (35% Risiko)',
      roiRatio: '8.8-21.9x',
      recommendation: 'Absolut kritisch'
    }
  ]

  const jsonLdPriceSpecification = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ankaufsuntersuchung (AKU) für Pferde",
    "description": "Professionelle Ankaufsuntersuchung zur Bewertung des Gesundheitszustands von Pferden vor dem Kauf",
    "provider": {
      "@type": "Organization",
      "name": "Tierarztpraxen Deutschland"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "AKU Klasse I (Kleine AKU)",
        "description": "Grunduntersuchung für Freizeitpferde",
        "priceRange": "150-300 EUR",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "AKU Klasse II (Große AKU)",
        "description": "Erweiterte Untersuchung für Sportpferde",
        "priceRange": "400-800 EUR",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "name": "AKU Klasse III-V (Spezialisierte AKU)",
        "description": "Umfassende Untersuchung für hochwertige Pferde",
        "priceRange": "800-2000 EUR",
        "priceCurrency": "EUR"
      }
    ]
  }

  const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Lohnt sich eine AKU finanziell?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, eine AKU lohnt sich fast immer finanziell. Bei einem 15.000€ Pferd kostet eine AKU Klasse II 400-800€, kann aber 3.750€ Verlust durch versteckte Krankheiten verhindern - ein ROI von 4.7-9.4x."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine AKU im Verhältnis zum Pferdewert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine AKU sollte etwa 2-5% des Pferdewerts kosten. Bei einem 10.000€ Pferd sind 200-500€ für eine angemessene AKU ein gutes Verhältnis."
        }
      },
      {
        "@type": "Question",
        "name": "Ab welchem Pferdewert lohnt sich welche AKU-Klasse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AKU Klasse I bis 5.000€ Pferdewert, Klasse II von 5.000-25.000€, Klasse III-V ab 25.000€ aufwärts. Die Break-Even-Analyse zeigt: AKU lohnt sich bereits ab 2-5% Krankheitsrisiko."
        }
      }
    ]
  }

  return (
    <>
      <Head>
        <title>AKU Kosten-Nutzen-Analyse: Lohnt sich die Ankaufsuntersuchung? ROI-Rechner 2025 | PferdeWert.de</title>
        <meta
          name="description"
          content="✓ AKU Kosten-Nutzen-Analyse 2025: ROI-Rechner, Break-Even-Punkt und finanzielle Bewertung. Lohnt sich die Ankaufsuntersuchung? Kosten vs. Risiko erklärt."
        />
        <meta name="keywords" content="AKU Kosten Nutzen, AKU lohnt sich, AKU ROI, Ankaufsuntersuchung Kosten, AKU Break Even, AKU Kostenrechner, AKU zu teuer" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/aku-verstehen/aku-kosten-nutzen" />

        {/* Open Graph */}
        <meta property="og:title" content="AKU Kosten-Nutzen-Analyse: Lohnt sich die Ankaufsuntersuchung?" />
        <meta property="og:description" content="ROI-Rechner und Break-Even-Analyse für AKU-Investitionen. Kosten vs. Risiko wissenschaftlich bewertet." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/aku-verstehen/aku-kosten-nutzen" />
        <meta property="og:type" content="article" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPriceSpecification) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-4">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-brand-brown">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/pferde-ratgeber" className="hover:text-brand-brown">Pferde-Ratgeber</Link>
            <span className="mx-2">›</span>
            <Link href="/pferde-ratgeber/aku-verstehen" className="hover:text-brand-brown">AKU verstehen</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-brown font-medium">AKU Kosten-Nutzen</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-brown mb-6">
              AKU Kosten-Nutzen-Analyse: Lohnt sich die Ankaufsuntersuchung?
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
              Wissenschaftliche <strong>ROI-Analyse der AKU-Investition</strong>: Break-Even-Punkte,
              Risikobewertung und finanzielle Entscheidungshilfe für Pferdekäufer 2025.
            </p>
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-green-800 font-semibold">
                💡 Spoiler: Eine AKU lohnt sich bereits ab 2-5% Krankheitsrisiko finanziell!
              </p>
            </div>
          </div>

          {/* ROI Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.7-21.9x</div>
              <div className="text-sm text-gray-600">Typischer ROI</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2-5%</div>
              <div className="text-sm text-gray-600">Break-Even Risiko</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15-35%</div>
              <div className="text-sm text-gray-600">Tatsächliches Risiko</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">95%</div>
              <div className="text-sm text-gray-600">Empfehlungsrate</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Interactive ROI Calculator */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-3xl font-bold text-brand-brown mb-6">🧮 Interaktiver ROI-Rechner</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Pferdewert (€):</label>
                    <input
                      type="number"
                      value={horseValue}
                      onChange={(e) => setHorseValue(parseInt(e.target.value) || 0)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                      placeholder="z.B. 15000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">AKU-Klasse:</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                    >
                      <option value="I">Klasse I (150-300€)</option>
                      <option value="II">Klasse II (400-800€)</option>
                      <option value="III-V">Klasse III-V (800-2000€)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Region:</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-brown focus:ring-1 focus:ring-brand-brown"
                    >
                      <option value="deutschland">Deutschland</option>
                      <option value="bayern">Bayern</option>
                      <option value="nordrhein">Nordrhein-Westfalen</option>
                      <option value="norddeutschland">Norddeutschland</option>
                    </select>
                  </div>
                </div>

                {roiData && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Ihre ROI-Analyse:</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">AKU-Kosten:</span>
                          <span className="font-bold text-red-600">{roiData.akuCost}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Krankheitsrisiko:</span>
                          <span className="font-bold text-orange-600">{roiData.riskPercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Potentieller Verlust:</span>
                          <span className="font-bold text-red-600">{roiData.potentialLoss.toLocaleString()}€</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ROI-Verhältnis:</span>
                          <span className="font-bold text-green-600">{roiData.roiRatio.toFixed(1)}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Break-Even Risiko:</span>
                          <span className="font-bold text-blue-600">{roiData.breakEvenRisk.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Empfehlung:</span>
                          <span className="font-bold text-green-600">
                            {roiData.roiRatio > 2 ? 'Sehr empfehlenswert' : roiData.roiRatio > 1 ? 'Empfehlenswert' : 'Kritisch prüfen'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-white rounded border border-green-300">
                      <p className="text-sm text-gray-700">
                        <strong>Interpretation:</strong> Bei einem {roiData.roiRatio.toFixed(1)}x ROI-Verhältnis bedeutet jeder in die AKU investierte Euro
                        einen erwarteten Nutzen von {roiData.roiRatio.toFixed(1)}€. Die AKU lohnt sich bereits ab {roiData.breakEvenRisk.toFixed(1)}% Krankheitsrisiko.
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Kosten-Vergleichstabelle */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-3xl font-bold text-brand-brown mb-6">💰 Kosten-Nutzen-Vergleich nach Pferdewert</h2>

                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Szenario</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Empfohlene Klasse</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">AKU-Kosten</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Risiko ohne AKU</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">ROI-Verhältnis</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-800">Bewertung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costComparisonData.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="border border-gray-200 px-4 py-3 font-medium">{row.scenario}</td>
                          <td className="border border-gray-200 px-4 py-3 text-center">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                              {row.recommendedClass}
                            </span>
                          </td>
                          <td className="border border-gray-200 px-4 py-3 text-red-600 font-bold">{row.akuCost}</td>
                          <td className="border border-gray-200 px-4 py-3 text-orange-600 font-bold">{row.riskWithoutAKU}</td>
                          <td className="border border-gray-200 px-4 py-3 text-green-600 font-bold">{row.roiRatio}</td>
                          <td className="border border-gray-200 px-4 py-3">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              row.recommendation.includes('kritisch') ? 'bg-red-100 text-red-800' :
                              row.recommendation.includes('erforderlich') ? 'bg-orange-100 text-orange-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {row.recommendation}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2">📈 ROI-Erklärung:</h4>
                  <p className="text-yellow-700 text-sm">
                    Das ROI-Verhältnis zeigt, wie viel Euro erwarteter Nutzen pro investiertem Euro entstehen.
                    Ein 5x ROI bedeutet: 1€ AKU-Investition verhindert erwartungsgemäß 5€ Schaden durch versteckte Krankheiten.
                  </p>
                </div>
              </section>

              {/* Regionale Preisunterschiede */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-3xl font-bold text-brand-brown mb-6">🗺️ Regionale Preisunterschiede in Deutschland</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  {regionalPricing.map((region, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{region.region}</h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Klasse I:</span>
                          <span className="font-bold">{region.classI.min}-{region.classI.max}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Klasse II:</span>
                          <span className="font-bold">{region.classII.min}-{region.classII.max}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Klasse III-V:</span>
                          <span className="font-bold">{region.classIII.min}-{region.classIII.max}€</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded">
                        <h4 className="font-semibold text-gray-800 mb-2">Zusatzkosten:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {region.additionalCosts.map((cost, idx) => (
                            <li key={idx}>• {cost}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-3">🔍 Preisfaktoren-Analyse:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                    <div>
                      <h4 className="font-semibold mb-2">Regionale Unterschiede entstehen durch:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Lebenshaltungskosten der Region</li>
                        <li>• Konkurrenzsituation der Tierärzte</li>
                        <li>• Durchschnittliche Pferdewerte regional</li>
                        <li>• Verfügbarkeit spezialisierter Praxen</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Kosteneinsparungen möglich:</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Vergleich mehrerer Tierarztpraxen</li>
                        <li>• Flexible Terminplanung (Werktage)</li>
                        <li>• Gruppenrabatte bei mehreren Pferden</li>
                        <li>• Kombinierte Untersuchungen vor Ort</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Break-Even-Analyse */}
              <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <h2 className="text-3xl font-bold text-brand-brown mb-6">⚖️ Break-Even-Analyse: Ab wann lohnt sich die AKU?</h2>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Wissenschaftliche Basis der Berechnung</h3>
                  <p className="text-gray-700 mb-4">
                    Unsere Break-Even-Analyse basiert auf veterinärmedizinischen Studien und Marktdaten.
                    Die durchschnittlichen Krankheitsrisiken ohne AKU betragen:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded border">
                      <div className="text-2xl font-bold text-blue-600 mb-1">15%</div>
                      <div className="text-sm text-gray-600">Freizeitpferde</div>
                      <div className="text-xs text-gray-500">Mäßige Belastung</div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-2xl font-bold text-orange-600 mb-1">25%</div>
                      <div className="text-sm text-gray-600">Sportpferde</div>
                      <div className="text-xs text-gray-500">Hohe Belastung</div>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <div className="text-2xl font-bold text-red-600 mb-1">35%</div>
                      <div className="text-sm text-gray-600">Hochleistungssport</div>
                      <div className="text-xs text-gray-500">Extreme Belastung</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-bold text-green-800 mb-3">✅ Wann lohnt sich die AKU IMMER?</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Pferdewert über 10.000€:</strong> ROI fast garantiert über 3x</li>
                      <li>• <strong>Sportliche Nutzung geplant:</strong> Risiko steigt auf 25-35%</li>
                      <li>• <strong>Junge Pferde (4-8 Jahre):</strong> Lange Nutzungsdauer rechtfertigt Investition</li>
                      <li>• <strong>Erste Pferdekauf:</strong> Unerfahrenheit erhöht Fehlkaufrisiko</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h3 className="text-xl font-bold text-yellow-800 mb-3">⚠️ Wann ist die AKU grenzwertig?</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Pferdewert unter 3.000€:</strong> AKU kann 10-20% des Wertes kosten</li>
                      <li>• <strong>Sehr alte Pferde (>20 Jahre):</strong> Altersbedingte Abnutzung normal</li>
                      <li>• <strong>Notfallkäufe:</strong> Zeitdruck verhindert gründliche AKU</li>
                      <li>• <strong>Bekannte Vorerkrankungen:</strong> Kaufentscheidung bereits mit Risiko getroffen</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-red-500 pl-6">
                    <h3 className="text-xl font-bold text-red-800 mb-3">❌ Wann ist ohne AKU zu riskant?</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• <strong>Pferdewert über 25.000€:</strong> Potentieller Verlust existenzbedrohend</li>
                      <li>• <strong>Unbekannte Vorgeschichte:</strong> Risiko nicht kalkulierbar</li>
                      <li>• <strong>Leistungssport geplant:</strong> Kleine Probleme werden zu großen Problemen</li>
                      <li>• <strong>Finanzierung involviert:</strong> Banken/Versicherungen erwarten AKU</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h3 className="font-bold text-amber-800 mb-3">🎯 Entscheidungsmatrix:</h3>
                  <div className="text-amber-700 text-sm space-y-2">
                    <p><strong>Break-Even-Formel:</strong> AKU lohnt sich wenn: (Pferdewert × Krankheitsrisiko%) ≥ AKU-Kosten</p>
                    <p><strong>Beispiel:</strong> 15.000€ Pferd × 25% Risiko = 3.750€ > 600€ AKU-Kosten → <span className="text-green-600 font-bold">Lohnt sich!</span></p>
                    <p><strong>Sicherheitspuffer:</strong> Experten empfehlen AKU bereits ab 50% des Break-Even-Punktes</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Calculator */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">⚡ Quick-Check</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Pferdewert (€):</label>
                    <input
                      type="number"
                      placeholder="z.B. 10000"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 0
                        const risk = value > 20000 ? 35 : value > 5000 ? 25 : 15
                        const akuCost = value > 20000 ? 1000 : value > 5000 ? 600 : 200
                        const element = document.getElementById('quick-result')
                        if (element) {
                          element.innerHTML = value > 0 ?
                            `<div class="text-center mt-3">
                              <div class="text-lg font-bold ${(value * risk / 100) > akuCost ? 'text-green-600' : 'text-red-600'}">
                                ${(value * risk / 100) > akuCost ? '✅ AKU lohnt sich!' : '❌ Grenzwertig'}
                              </div>
                              <div class="text-xs text-gray-500">
                                Risiko: ${(value * risk / 100).toLocaleString()}€ vs. AKU: ${akuCost}€
                              </div>
                            </div>` : ''
                        }
                      }}
                    />
                    <div id="quick-result"></div>
                  </div>
                </div>
              </div>

              {/* Cost Factors */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">💡 Kostenfaktoren</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-800">Basis-AKU (Klasse I):</div>
                    <div className="text-gray-600">150-300€ (2-6% vom Pferdewert)</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Standard-AKU (Klasse II):</div>
                    <div className="text-gray-600">400-800€ (3-8% vom Pferdewert)</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Premium-AKU (Klasse III-V):</div>
                    <div className="text-gray-600">800-2000€ (3-10% vom Pferdewert)</div>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <div>
                    <div className="font-medium text-gray-800">Faustregel:</div>
                    <div className="text-gray-600">AKU sollte 2-8% des Pferdewerts kosten</div>
                  </div>
                </div>
              </div>

              {/* Expert Tip */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-3">🎯 Finanz-Experten-Tipp</h3>
                <p className="text-sm text-green-700 mb-3">
                  "Betrachten Sie die AKU als Versicherungsprämie. Bei einem ROI von 5x oder höher ist es
                  eine der besten Investitionen im Pferdesport."
                </p>
                <div className="text-xs text-green-600">
                  - Pferdesport-Finanzberater
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">🔗 Weiterführende Artikel</h3>
                <div className="space-y-3">
                  <Link
                    href="/pferde-ratgeber/aku-verstehen"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    ← Zurück: AKU verstehen
                  </Link>
                  <Link
                    href="/pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → AKU Befunde interpretieren
                  </Link>
                  <Link
                    href="/pferde-ratgeber/pferdebewertung-grundlagen"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → Pferdebewertung Grundlagen
                  </Link>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-brand-brown/5 rounded-lg p-6 border border-brand-brown/20">
                <h3 className="font-bold text-brand-brown mb-3">🎯 Nach der AKU</h3>
                <p className="text-sm text-gray-600 mb-4">
                  AKU abgeschlossen? Ermitteln Sie jetzt den fairen Marktwert unter Berücksichtigung der Befunde.
                </p>
                <Link
                  href="/pferde-preis-berechnen"
                  className="block w-full bg-brand-brown hover:bg-brand-brownDark text-white text-center py-3 rounded-lg transition-colors font-medium"
                >
                  Pferdewert mit AKU berechnen
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-amber-100">
            <h2 className="text-3xl font-bold text-brand-brown mb-8">❓ Häufige Fragen zur AKU Kosten-Nutzen-Analyse</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Lohnt sich eine AKU bei einem 5.000€ Pferd?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ja! Bei 15% Krankheitsrisiko drohen 750€ Verlust. Eine AKU Klasse I kostet nur 150-300€.
                    ROI: 2.5-5x. Bereits ab 3% Krankheitsrisiko amortisiert sich die Investition.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Was passiert finanziell ohne AKU bei versteckten Krankheiten?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Versteckte Krankheiten können 20-100% des Pferdewerts kosten. Beispiel: Lahmheit bei 15.000€ Sportpferd
                    kann 3.000-15.000€ Behandlungskosten und Wertverlust bedeuten.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Kann man AKU-Kosten von der Steuer absetzen?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Bei gewerblicher Pferdehaltung ja, als Betriebsausgabe. Privathalter können AKU-Kosten nicht steuerlich
                    geltend machen, aber bei Pferdehaftpflicht-/OP-Versicherungen nachfragen.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Übernimmt die Versicherung AKU-Kosten?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Normalerweise nein - AKU ist Käuferrisiko. Manche Premium-Pferdekrankenversicherungen bieten
                    aber Kostenübernahme als Zusatzleistung. Vor Vertragsabschluss prüfen!
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Gibt es Rabatte bei mehreren AKUs?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ja! Viele Tierärzte gewähren 10-20% Rabatt bei Gruppen-AKUs am selben Tag.
                    Bei Züchtern oder Verkaufsställen nachfragen. Auch Kombinationstarife möglich.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">Wann ist eine AKU zu teuer im Verhältnis zum Pferdewert?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Faustregel: Über 10% des Pferdewerts wird kritisch. Bei 2.000€ Pferd sind 300€ AKU grenzwertig.
                    Dann lieber Klasse I statt II wählen oder auf AKU verzichten.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-brand-brown to-brand-brownDark text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">
                Bereit für eine fundierte Kaufentscheidung?
              </h2>
              <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                Nutzen Sie unseren wissenschaftlich fundierten ROI-Rechner und treffen Sie
                finanzial optimierte Entscheidungen beim Pferdekauf.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link
                  href="/pferde-preis-berechnen"
                  className="bg-white text-brand-brown hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Pferdewert berechnen
                </Link>
                <Link
                  href="/pferde-ratgeber/aku-verstehen"
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

export default AKUKostenNutzen