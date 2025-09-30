import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Link from 'next/link'
import { useState } from 'react'

interface ValueReductionResult {
  originalValue: number
  adjustedValue: number
  reduction: number
  reductionPercentage: number
  akuClass: string
  riskLevel: string
  recommendation: string
}

interface DecisionFactor {
  category: string
  weight: number
  score: number
  description: string
}

const PferdewertTrotzAku: NextPage = () => {
  const [calculatorTab, setCalculatorTab] = useState('value-reduction')
  const [selectedAkuClass, setSelectedAkuClass] = useState('1')
  const [pferdewert, setPferdewert] = useState(25000)
  const [nutzungsart, setNutzungsart] = useState('freizeit')
  const [alter, setAlter] = useState(8)
  const [befundanzahl, setBefundanzahl] = useState(1)

  // AKU-Klassen mit detaillierten Wertminderungen
  const akuKlassen = {
    '1': {
      name: 'Klasse I - Keine Befunde',
      wertminderung: 0,
      beschreibung: 'Keine röntgenologisch darstellbaren Veränderungen',
      empfehlung: 'Unbedenklicher Kauf zum Vollpreis',
      risiko: 'Sehr niedrig',
      farbe: 'text-green-600 bg-green-50 border-green-200'
    },
    '2': {
      name: 'Klasse II - Geringfügige Befunde',
      wertminderung: 5,
      beschreibung: 'Geringfügige Veränderungen ohne klinische Relevanz',
      empfehlung: 'Kauf möglich, minimale Wertanpassung',
      risiko: 'Niedrig',
      farbe: 'text-blue-600 bg-blue-50 border-blue-200'
    },
    '2-3': {
      name: 'Klasse II-III - Leichte Befunde',
      wertminderung: 15,
      beschreibung: 'Leichte Veränderungen, geringe klinische Bedeutung',
      empfehlung: 'Preisverhandlung empfohlen, regelmäßige Kontrollen',
      risiko: 'Mäßig',
      farbe: 'text-yellow-600 bg-yellow-50 border-yellow-200'
    },
    '3': {
      name: 'Klasse III - Mäßige Befunde',
      wertminderung: 25,
      beschreibung: 'Mäßige Veränderungen mit möglicher klinischer Relevanz',
      empfehlung: 'Deutliche Preisreduktion, Verwendungszweck überdenken',
      risiko: 'Mäßig bis hoch',
      farbe: 'text-orange-600 bg-orange-50 border-orange-200'
    },
    '3-4': {
      name: 'Klasse III-IV - Deutliche Befunde',
      wertminderung: 40,
      beschreibung: 'Deutliche Veränderungen mit wahrscheinlicher klinischer Relevanz',
      empfehlung: 'Erhebliche Preisreduktion, nur für eingeschränkte Nutzung',
      risiko: 'Hoch',
      farbe: 'text-red-600 bg-red-50 border-red-200'
    },
    '4': {
      name: 'Klasse IV - Hochgradige Befunde',
      wertminderung: 60,
      beschreibung: 'Hochgradige Veränderungen mit klinischer Relevanz',
      empfehlung: 'Kauf nur nach ausführlicher Risikoabwägung',
      risiko: 'Sehr hoch',
      farbe: 'text-red-800 bg-red-100 border-red-300'
    }
  }

  // Nutzungsart-spezifische Anpassungen
  const nutzungsartFaktoren = {
    'freizeit': { faktor: 0.8, beschreibung: 'Freizeitreiten - reduzierte Belastung' },
    'sport': { faktor: 1.2, beschreibung: 'Sporteinsatz - erhöhte Belastung' },
    'zucht': { faktor: 1.0, beschreibung: 'Zucht - mittlere Anforderungen' },
    'ausbildung': { faktor: 1.1, beschreibung: 'Ausbildung - variable Belastung' }
  }

  // Berechnung der Wertminderung
  const calculateValueReduction = (): ValueReductionResult => {
    const akuData = akuKlassen[selectedAkuClass as keyof typeof akuKlassen]
    const nutzungsFaktor = nutzungsartFaktoren[nutzungsart as keyof typeof nutzungsartFaktoren].faktor

    // Basis-Wertminderung
    let wertminderungProzent = akuData.wertminderung

    // Anpassung nach Nutzungsart
    wertminderungProzent = wertminderungProzent * nutzungsFaktor

    // Anpassung nach Alter (ältere Pferde: höhere Wertminderung)
    if (alter > 12) wertminderungProzent += 5
    if (alter > 15) wertminderungProzent += 5

    // Anpassung nach Anzahl der Befunde
    if (befundanzahl > 1) {
      wertminderungProzent += (befundanzahl - 1) * 3
    }

    // Maximum bei 70% Wertminderung
    wertminderungProzent = Math.min(wertminderungProzent, 70)

    const reduction = (pferdewert * wertminderungProzent) / 100
    const adjustedValue = pferdewert - reduction

    let recommendation = ''
    if (wertminderungProzent < 10) {
      recommendation = 'Kauf empfehlenswert mit minimaler Preisanpassung'
    } else if (wertminderungProzent < 25) {
      recommendation = 'Kauf möglich nach Preisverhandlung und Risikoabwägung'
    } else if (wertminderungProzent < 40) {
      recommendation = 'Kauf nur nach gründlicher Überlegung und deutlicher Preisreduktion'
    } else {
      recommendation = 'Kauf kritisch zu bewerten - hohe Folgekosten möglich'
    }

    return {
      originalValue: pferdewert,
      adjustedValue: Math.round(adjustedValue),
      reduction: Math.round(reduction),
      reductionPercentage: Math.round(wertminderungProzent),
      akuClass: akuData.name,
      riskLevel: akuData.risiko,
      recommendation
    }
  }

  const result = calculateValueReduction()

  // Kaufentscheidungs-Faktoren
  const entscheidungsfaktoren: DecisionFactor[] = [
    {
      category: 'Gesundheitsrisiko',
      weight: 30,
      score: selectedAkuClass === '1' ? 10 : selectedAkuClass === '2' ? 8 : selectedAkuClass === '2-3' ? 6 : selectedAkuClass === '3' ? 4 : selectedAkuClass === '3-4' ? 2 : 1,
      description: 'Wahrscheinlichkeit für künftige Lahmheiten'
    },
    {
      category: 'Verwendungszweck',
      weight: 25,
      score: nutzungsart === 'freizeit' ? 8 : nutzungsart === 'zucht' ? 7 : nutzungsart === 'ausbildung' ? 6 : 4,
      description: 'Eignung für geplante Nutzung'
    },
    {
      category: 'Preis-Leistung',
      weight: 20,
      score: result.reductionPercentage < 10 ? 9 : result.reductionPercentage < 25 ? 7 : result.reductionPercentage < 40 ? 5 : 3,
      description: 'Verhältnis von Kaufpreis zu erwarteter Leistung'
    },
    {
      category: 'Folgekosten',
      weight: 15,
      score: selectedAkuClass === '1' ? 9 : selectedAkuClass === '2' ? 8 : selectedAkuClass === '2-3' ? 6 : selectedAkuClass === '3' ? 4 : selectedAkuClass === '3-4' ? 2 : 1,
      description: 'Erwartete Tierarzt- und Behandlungskosten'
    },
    {
      category: 'Emotionale Bindung',
      weight: 10,
      score: 7, // Neutral, da subjektiv
      description: 'Persönliche Verbindung zum Pferd'
    }
  ]

  const gesamtbewertung = entscheidungsfaktoren.reduce((sum, faktor) =>
    sum + (faktor.score * faktor.weight / 100), 0
  )

  const akuKlassenVergleich = [
    {
      klasse: 'I',
      befunde: 'Keine',
      wertminderung: '0%',
      kaufempfehlung: 'Uneingeschränkt',
      risiko: 'Minimal',
      folgekosten: 'Standard'
    },
    {
      klasse: 'II',
      befunde: 'Geringfügig',
      wertminderung: '3-8%',
      kaufempfehlung: 'Empfehlenswert',
      risiko: 'Niedrig',
      folgekosten: 'Leicht erhöht'
    },
    {
      klasse: 'II-III',
      befunde: 'Leicht',
      wertminderung: '10-20%',
      kaufempfehlung: 'Mit Vorbehalt',
      risiko: 'Mäßig',
      folgekosten: 'Erhöht'
    },
    {
      klasse: 'III',
      befunde: 'Mäßig',
      wertminderung: '20-35%',
      kaufempfehlung: 'Kritisch prüfen',
      risiko: 'Hoch',
      folgekosten: 'Deutlich erhöht'
    },
    {
      klasse: 'III-IV',
      befunde: 'Deutlich',
      wertminderung: '35-50%',
      kaufempfehlung: 'Nicht empfohlen',
      risiko: 'Sehr hoch',
      folgekosten: 'Sehr hoch'
    },
    {
      klasse: 'IV',
      befunde: 'Hochgradig',
      wertminderung: '50-70%',
      kaufempfehlung: 'Abzuraten',
      risiko: 'Extrem hoch',
      folgekosten: 'Extrem hoch'
    }
  ]

  const faqItems = [
    {
      question: 'Wie stark beeinflusst eine AKU-Klasse III den Pferdewert?',
      answer: 'AKU-Klasse III kann den Pferdewert um 20-35% mindern. Die genaue Wertminderung hängt von der Art der Befunde, dem geplanten Verwendungszweck und dem Alter des Pferdes ab. Für Freizeitpferde ist die Wertminderung oft geringer als für Sportpferde.'
    },
    {
      question: 'Sollte ich ein Pferd mit AKU-Befunden kaufen?',
      answer: 'Das hängt von mehreren Faktoren ab: AKU-Klasse, Verwendungszweck, Preis und persönliche Risikobereitschaft. Pferde mit Klasse I-II Befunden sind meist unbedenklich. Bei Klasse III und höher sollten Sie eine deutliche Preisreduktion erwarten und das Risiko sorgfältig abwägen.'
    },
    {
      question: 'Wie berechne ich den fairen Preis bei AKU-Befunden?',
      answer: 'Nutzen Sie unseren Wertminderungs-Rechner oben. Berücksichtigen Sie: AKU-Klasse, Anzahl der Befunde, Alter des Pferdes, geplante Nutzung und potenzielle Folgekosten. Eine professionelle Bewertung kann zusätzliche Sicherheit geben.'
    },
    {
      question: 'Welche Folgekosten entstehen bei AKU-Befunden?',
      answer: 'Folgekosten können umfassen: regelmäßige tierärztliche Kontrollen (200-500€/Jahr), spezielle Beschläge (50-150€ mehr pro Beschlag), Physiotherapie (40-80€/Sitzung), eventuelle Behandlungen (500-3000€) und mögliche Nutzungseinschränkungen.'
    },
    {
      question: 'Kann sich eine AKU-Klasse verschlechtern?',
      answer: 'Ja, AKU-Befunde können sich verschlechtern, besonders bei starker Belastung oder fortschreitendem Alter. Regelmäßige Kontrollen und angepasste Haltung können das Risiko minimieren. Manche Befunde bleiben jedoch stabil oder verbessern sich sogar.'
    },
    {
      question: 'Ist eine Versicherung bei AKU-Befunden möglich?',
      answer: 'Viele Versicherer schließen vorbestehende Befunde aus oder erheben Aufschläge. Informieren Sie sich vor dem Kauf über Versicherungsmöglichkeiten. Manche Anbieter versichern auch Pferde mit geringfügigen Befunden.'
    }
  ]

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Pferde-Ratgeber', href: '/pferde-ratgeber' },
    { label: 'AKU verstehen', href: '/pferde-ratgeber/aku-verstehen' },
    { label: 'Pferdewert trotz AKU', href: '/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku' }
  ]

  return (
    <>
      <Head>
        <title>Pferdewert trotz AKU-Befunden berechnen | Wertminderung bei Röntgenbefunden | PferdeWert.de</title>
        <meta
          name="description"
          content="Berechnen Sie den fairen Pferdewert trotz AKU-Befunden. Interaktiver Rechner für Wertminderung nach AKU-Klassen, Kaufentscheidungshilfe und Risikobewertung für Pferdekäufer."
        />
        <meta name="keywords" content="pferdewert trotz aku, aku befunde pferdewert, wertminderung pferd aku, pferd kaufen trotz befunden, aku klassen bewertung, pferdebewertung gesundheitsmängel" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Pferdewert trotz AKU-Befunden berechnen | PferdeWert.de" />
        <meta property="og:description" content="Interaktiver Rechner für Pferdewert bei AKU-Befunden. Bewerten Sie Wertminderung, Risiken und treffen Sie informierte Kaufentscheidungen." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-pferdewert-berechnen.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pferdewert trotz AKU-Befunden berechnen" />
        <meta name="twitter:description" content="Bewerten Sie Pferdewert und Risiken bei AKU-Befunden mit unserem interaktiven Rechner." />

        {/* Structured Data - Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Pferdewert trotz AKU-Befunden berechnen - Wertminderung richtig einschätzen",
              "description": "Umfassender Leitfaden zur Bewertung von Pferden mit AKU-Befunden. Interaktive Rechner für Wertminderung und Kaufentscheidungshilfen.",
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
                  "url": "https://pferdewert.de/logo.png"
                }
              },
              "datePublished": "2025-01-20",
              "dateModified": "2025-01-20",
              "url": "https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku",
              "image": "https://pferdewert.de/images/aku-pferdewert-berechnen.jpg",
              "articleSection": "Pferdebewertung",
              "keywords": "pferdewert trotz aku, aku befunde pferdewert, wertminderung pferd aku, pferd kaufen trotz befunden",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku"
              }
            })
          }}
        />

        {/* Structured Data - HowTo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "Pferdewert bei AKU-Befunden berechnen",
              "description": "Schritt-für-Schritt Anleitung zur Berechnung des fairen Pferdewerts trotz AKU-Befunden",
              "image": "https://pferdewert.de/images/aku-berechnung-anleitung.jpg",
              "totalTime": "PT10M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "EUR",
                "value": "0"
              },
              "supply": [
                {
                  "@type": "HowToSupply",
                  "name": "AKU-Bericht mit Röntgenbefunden"
                },
                {
                  "@type": "HowToSupply",
                  "name": "Ursprünglicher Pferdewert"
                }
              ],
              "tool": [
                {
                  "@type": "HowToTool",
                  "name": "PferdeWert.de Wertminderungs-Rechner"
                }
              ],
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "AKU-Klasse bestimmen",
                  "text": "Ermitteln Sie die AKU-Klasse aus dem Röntgenbericht (I bis IV)",
                  "url": "https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku#aku-klassen"
                },
                {
                  "@type": "HowToStep",
                  "name": "Verwendungszweck festlegen",
                  "text": "Bestimmen Sie die geplante Nutzung: Freizeit, Sport, Zucht oder Ausbildung",
                  "url": "https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku#verwendungszweck"
                },
                {
                  "@type": "HowToStep",
                  "name": "Wertminderung berechnen",
                  "text": "Nutzen Sie unseren Rechner für die prozentuale Wertminderung basierend auf AKU-Klasse und Nutzung",
                  "url": "https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku#wertminderungs-rechner"
                },
                {
                  "@type": "HowToStep",
                  "name": "Kaufentscheidung treffen",
                  "text": "Bewerten Sie Risiken, Folgekosten und treffen Sie eine informierte Entscheidung",
                  "url": "https://pferdewert.de/pferde-ratgeber/aku-verstehen/pferdewert-trotz-aku#kaufentscheidung"
                }
              ]
            })
          }}
        />

        {/* Structured Data - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />

        {/* Structured Data - PriceSpecification */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Pferdewert-Berechnung bei AKU-Befunden",
              "description": "Kostenlose Berechnung der Wertminderung von Pferden mit AKU-Befunden",
              "provider": {
                "@type": "Organization",
                "name": "PferdeWert.de"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR",
                "availability": "https://schema.org/InStock",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "0",
                  "priceCurrency": "EUR",
                  "eligibleTransactionVolume": {
                    "@type": "PriceSpecification",
                    "minPrice": "5000",
                    "maxPrice": "100000",
                    "priceCurrency": "EUR"
                  }
                }
              }
            })
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": breadcrumbItems.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.label,
                "item": `https://pferdewert.de${item.href}`
              }))
            })
          }}
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-h1 font-bold text-brand-brown mb-6">
              Pferdewert trotz AKU-Befunden berechnen
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Bewerten Sie den fairen Pferdewert bei Röntgenbefunden. Unser interaktiver Rechner hilft Ihnen bei der
              Einschätzung von Wertminderungen und unterstützt Sie bei wichtigen Kaufentscheidungen.
            </p>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-md border border-amber-100">
                <div className="text-h2 mb-3">🧮</div>
                <h3 className="font-bold text-brand-brown mb-2">Präzise Berechnung</h3>
                <p className="text-gray-600 text-sm">Wertminderung nach AKU-Klassen und individuellen Faktoren</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-amber-100">
                <div className="text-h2 mb-3">⚖️</div>
                <h3 className="font-bold text-brand-brown mb-2">Risikobewertung</h3>
                <p className="text-gray-600 text-sm">Umfassende Einschätzung von Folgekosten und Gesundheitsrisiken</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md border border-amber-100">
                <div className="text-h2 mb-3">✅</div>
                <h3 className="font-bold text-brand-brown mb-2">Kaufentscheidung</h3>
                <p className="text-gray-600 text-sm">Datenbasierte Empfehlungen für informierte Entscheidungen</p>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-amber-100" id="wertminderungs-rechner">
            <h2 className="text-h2 font-bold text-brand-brown mb-6 text-center">
              Interaktiver Wertminderungs-Rechner
            </h2>

            {/* Calculator Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setCalculatorTab('value-reduction')}
                className={`px-6 py-3 font-medium ${calculatorTab === 'value-reduction'
                  ? 'border-b-2 border-brand-brown text-brand-brown'
                  : 'text-gray-500 hover:text-gray-700'}`}
              >
                Wertminderung berechnen
              </button>
              <button
                onClick={() => setCalculatorTab('decision-helper')}
                className={`px-6 py-3 font-medium ${calculatorTab === 'decision-helper'
                  ? 'border-b-2 border-brand-brown text-brand-brown'
                  : 'text-gray-500 hover:text-gray-700'}`}
              >
                Kaufentscheidungs-Hilfe
              </button>
            </div>

            {calculatorTab === 'value-reduction' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div>
                  <h3 className="text-xl font-bold text-brand-brown mb-4">Eingabedaten</h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ursprünglicher Pferdewert (€)
                      </label>
                      <input
                        type="number"
                        value={pferdewert}
                        onChange={(e) => setPferdewert(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        min="1000"
                        max="500000"
                        step="1000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AKU-Klasse
                      </label>
                      <select
                        value={selectedAkuClass}
                        onChange={(e) => setSelectedAkuClass(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                      >
                        {Object.entries(akuKlassen).map(([key, data]) => (
                          <option key={key} value={key}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Geplante Nutzung
                      </label>
                      <select
                        value={nutzungsart}
                        onChange={(e) => setNutzungsart(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                      >
                        <option value="freizeit">Freizeitreiten</option>
                        <option value="sport">Sporteinsatz</option>
                        <option value="zucht">Zucht</option>
                        <option value="ausbildung">Ausbildung</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alter des Pferdes (Jahre)
                      </label>
                      <input
                        type="number"
                        value={alter}
                        onChange={(e) => setAlter(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        min="3"
                        max="25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Anzahl der Befunde
                      </label>
                      <input
                        type="number"
                        value={befundanzahl}
                        onChange={(e) => setBefundanzahl(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div>
                  <h3 className="text-xl font-bold text-brand-brown mb-4">Berechnungsergebnisse</h3>

                  <div className={`p-6 rounded-lg border-2 ${akuKlassen[selectedAkuClass as keyof typeof akuKlassen].farbe} mb-6`}>
                    <h4 className="font-bold mb-2">{result.akuClass}</h4>
                    <p className="text-sm mb-4">{akuKlassen[selectedAkuClass as keyof typeof akuKlassen].beschreibung}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Ursprungswert:</span>
                        <div className="text-lg font-bold">{result.originalValue.toLocaleString('de-DE')} €</div>
                      </div>
                      <div>
                        <span className="font-medium">Angepasster Wert:</span>
                        <div className="text-lg font-bold text-green-600">{result.adjustedValue.toLocaleString('de-DE')} €</div>
                      </div>
                      <div>
                        <span className="font-medium">Wertminderung:</span>
                        <div className="text-lg font-bold text-red-600">{result.reduction.toLocaleString('de-DE')} € ({result.reductionPercentage}%)</div>
                      </div>
                      <div>
                        <span className="font-medium">Risiko-Level:</span>
                        <div className="text-lg font-bold">{result.riskLevel}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-bold text-gray-800 mb-2">Empfehlung:</h5>
                    <p className="text-gray-700 text-sm">{result.recommendation}</p>
                  </div>

                  <div className="mt-4 text-xs text-gray-500">
                    <p>* Diese Berechnung basiert auf statistischen Durchschnittswerten und ersetzt keine professionelle Bewertung.</p>
                  </div>
                </div>
              </div>
            )}

            {calculatorTab === 'decision-helper' && (
              <div>
                <h3 className="text-xl font-bold text-brand-brown mb-4">Kaufentscheidungs-Matrix</h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold mb-4">Bewertungsfaktoren</h4>
                    <div className="space-y-4">
                      {entscheidungsfaktoren.map((faktor, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{faktor.category}</span>
                            <span className="text-sm text-gray-500">Gewichtung: {faktor.weight}%</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-brand-brown h-2 rounded-full transition-all duration-300"
                                style={{ width: `${faktor.score * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{faktor.score}/10</span>
                          </div>
                          <p className="text-xs text-gray-600">{faktor.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">Gesamtbewertung</h4>
                    <div className="bg-white border-2 border-brand-brown rounded-lg p-6 text-center">
                      <div className="text-h2 font-bold text-brand-brown mb-2">
                        {gesamtbewertung.toFixed(1)}/10
                      </div>
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${gesamtbewertung * 10}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-sm">
                        {gesamtbewertung >= 8 ? (
                          <div className="text-green-600 font-medium">Kaufempfehlung: Ja</div>
                        ) : gesamtbewertung >= 6 ? (
                          <div className="text-yellow-600 font-medium">Kaufempfehlung: Mit Vorbehalt</div>
                        ) : gesamtbewertung >= 4 ? (
                          <div className="text-orange-600 font-medium">Kaufempfehlung: Kritisch prüfen</div>
                        ) : (
                          <div className="text-red-600 font-medium">Kaufempfehlung: Nicht empfohlen</div>
                        )}
                      </div>

                      <div className="mt-4 text-xs text-gray-500">
                        Basierend auf den eingegebenen Parametern und Standardgewichtungen
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AKU Classes Comparison Table */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-amber-100" id="aku-klassen">
            <h2 className="text-h2 font-bold text-brand-brown mb-6">
              AKU-Klassen im Vergleich
            </h2>

            <p className="text-gray-600 mb-6">
              Verstehen Sie die Bedeutung der verschiedenen AKU-Klassen und deren Auswirkungen auf Pferdewert und Kaufentscheidung.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-brand-brown text-white">
                    <th className="border border-gray-300 p-3 text-left">AKU-Klasse</th>
                    <th className="border border-gray-300 p-3 text-left">Befunde</th>
                    <th className="border border-gray-300 p-3 text-left">Wertminderung</th>
                    <th className="border border-gray-300 p-3 text-left">Kaufempfehlung</th>
                    <th className="border border-gray-300 p-3 text-left">Risiko</th>
                    <th className="border border-gray-300 p-3 text-left">Folgekosten</th>
                  </tr>
                </thead>
                <tbody>
                  {akuKlassenVergleich.map((klasse, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border border-gray-300 p-3 font-bold">{klasse.klasse}</td>
                      <td className="border border-gray-300 p-3">{klasse.befunde}</td>
                      <td className="border border-gray-300 p-3">{klasse.wertminderung}</td>
                      <td className="border border-gray-300 p-3">{klasse.kaufempfehlung}</td>
                      <td className="border border-gray-300 p-3">{klasse.risiko}</td>
                      <td className="border border-gray-300 p-3">{klasse.folgekosten}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-bold text-amber-800 mb-2">Wichtiger Hinweis:</h4>
              <p className="text-amber-700 text-sm">
                Die tatsächliche Wertminderung kann je nach spezifischen Befunden, Lokalisation und individuellen
                Umständen variieren. Diese Tabelle dient als Orientierungshilfe für eine erste Einschätzung.
              </p>
            </div>
          </div>

          {/* Usage-specific Guidance */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-amber-100" id="verwendungszweck">
            <h2 className="text-h2 font-bold text-brand-brown mb-6">
              Verwendungszweck-spezifische Bewertung
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-blue-800 mb-3">🏇 Freizeitreiten</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Geringere Belastung</li>
                  <li>• AKU-Klasse II-III oft akzeptabel</li>
                  <li>• Wertminderung: -20% vom Standard</li>
                  <li>• Fokus auf Rittigkeit</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-bold text-red-800 mb-3">🏆 Sporteinsatz</h3>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• Hohe Belastung</li>
                  <li>• Nur Klasse I-II empfohlen</li>
                  <li>• Wertminderung: +20% vom Standard</li>
                  <li>• Regelmäßige Kontrollen nötig</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-bold text-green-800 mb-3">🐎 Zucht</h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Moderate Belastung</li>
                  <li>• Genetische Aspekte beachten</li>
                  <li>• Wertminderung: Standard</li>
                  <li>• Abstammung wichtiger</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-bold text-purple-800 mb-3">📚 Ausbildung</h3>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Variable Belastung</li>
                  <li>• Klasse I-III möglich</li>
                  <li>• Wertminderung: +10% vom Standard</li>
                  <li>• Lernfähigkeit entscheidend</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Risk Assessment and Follow-up Costs */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-amber-100">
            <h2 className="text-h2 font-bold text-brand-brown mb-6">
              Risikobewertung und Folgekosten
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-brand-brown mb-4">💰 Finanzielle Risiken</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <h4 className="font-bold text-sm">Tierarztkosten</h4>
                    <p className="text-xs text-gray-600">200-2.000€/Jahr je nach Befunden</p>
                  </div>
                  <div className="border-l-4 border-orange-400 pl-4">
                    <h4 className="font-bold text-sm">Spezialbehandlungen</h4>
                    <p className="text-xs text-gray-600">500-5.000€ für operative Eingriffe</p>
                  </div>
                  <div className="border-l-4 border-red-400 pl-4">
                    <h4 className="font-bold text-sm">Wertverlust</h4>
                    <p className="text-xs text-gray-600">Weitere Abwertung bei Verschlechterung</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-brown mb-4">⏰ Zeitliche Risiken</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-bold text-sm">Ausfallzeiten</h4>
                    <p className="text-xs text-gray-600">Wochen bis Monate bei akuten Problemen</p>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4">
                    <h4 className="font-bold text-sm">Eingeschränkte Nutzung</h4>
                    <p className="text-xs text-gray-600">Dauerhafte Limitierungen möglich</p>
                  </div>
                  <div className="border-l-4 border-pink-400 pl-4">
                    <h4 className="font-bold text-sm">Karriereende</h4>
                    <p className="text-xs text-gray-600">Vorzeitige Pensionierung nötig</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-brown mb-4">🛡️ Risikominimierung</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-bold text-sm">Regelmäßige Kontrollen</h4>
                    <p className="text-xs text-gray-600">Frühzeitige Erkennung von Verschlechterungen</p>
                  </div>
                  <div className="border-l-4 border-teal-400 pl-4">
                    <h4 className="font-bold text-sm">Angepasste Haltung</h4>
                    <p className="text-xs text-gray-600">Optimierter Boden, Weidegang, Training</p>
                  </div>
                  <div className="border-l-4 border-indigo-400 pl-4">
                    <h4 className="font-bold text-sm">Versicherungsschutz</h4>
                    <p className="text-xs text-gray-600">Kranken- und OP-Versicherung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expert Tips */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-amber-100">
            <h2 className="text-h2 font-bold text-brand-brown mb-6">
              Expertenrat für den Pferdekauf mit AKU-Befunden
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4">✅ Do&rsquo;s - Das sollten Sie tun</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Zweitmeinung einholen:</span>
                      <p className="text-sm text-gray-600">Lassen Sie kritische Befunde von einem anderen Tierarzt bewerten</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Reitprobe vereinbaren:</span>
                      <p className="text-sm text-gray-600">Testen Sie das Pferd unter verschiedenen Belastungen</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Versicherung prüfen:</span>
                      <p className="text-sm text-gray-600">Klären Sie Versicherbarkeit und Ausschlüsse vor dem Kauf</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Dokumentation sammeln:</span>
                      <p className="text-sm text-gray-600">Fordern Sie alle Röntgenbilder und Vorberichte an</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-red-700 mb-4">❌ Don&rsquo;ts - Das sollten Sie vermeiden</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Befunde ignorieren:</span>
                      <p className="text-sm text-gray-600">Auch &quot;geringfügige&quot; Befunde können relevant werden</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Emotionale Entscheidungen:</span>
                      <p className="text-sm text-gray-600">Lassen Sie sich nicht von der Optik des Pferdes blenden</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Unvollständige AKU:</span>
                      <p className="text-sm text-gray-600">Sparen Sie nicht an wichtigen Röntgenaufnahmen</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-600 text-xl">•</span>
                    <div>
                      <span className="font-medium">Fehlende Absicherung:</span>
                      <p className="text-sm text-gray-600">Kaufen Sie nie ohne schriftliche Vereinbarungen</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12 border border-amber-100" id="faq">
            <h2 className="text-h2 font-bold text-brand-brown mb-6">
              Häufig gestellte Fragen (FAQ)
            </h2>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-brand-brown mb-3">
                    {item.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-brand-brown to-brand-brownDark rounded-lg p-8 text-white">
              <h2 className="text-h2 font-bold mb-4">
                Brauchen Sie eine professionelle Pferdebewertung?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Nutzen Sie unsere KI-gestützte Bewertung für eine objektive Einschätzung Ihres Pferdes
                - auch bei vorhandenen AKU-Befunden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pferde-preis-berechnen"
                  className="inline-block bg-white text-brand-brown px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Jetzt Pferd bewerten lassen
                </Link>
                <Link
                  href="/pferde-ratgeber/aku-verstehen"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-brand-brown transition-colors"
                >
                  Mehr über AKU erfahren
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default PferdewertTrotzAku
