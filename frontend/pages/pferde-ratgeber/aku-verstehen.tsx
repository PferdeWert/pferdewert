import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const AKUVerstehen: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string>('grundlagen')
  const [estimatedCost, setEstimatedCost] = useState<number>(0)
  const [akuClass, setAkuClass] = useState<string>('')

  const faqItems: FAQItem[] = [
    {
      question: "Was kostet eine AKU beim Pferd?",
      answer: "Die Kosten für eine Ankaufsuntersuchung variieren je nach Umfang: AKU Klasse I (kleine AKU): 150-300€, AKU Klasse II (große AKU): 400-800€, AKU Klasse III-V: 800-2000€. Die Preise können regional unterschiedlich sein.",
      category: "kosten"
    },
    {
      question: "Wie lange dauert eine AKU?",
      answer: "Eine kleine AKU (Klasse I) dauert etwa 1-2 Stunden, eine große AKU (Klasse II) 2-4 Stunden. Bei umfangreicheren Untersuchungen (Klasse III-V) können mehrere Termine erforderlich sein.",
      category: "ablauf"
    },
    {
      question: "Welche AKU-Klasse ist die richtige?",
      answer: "AKU Klasse I für Freizeitpferde bis 5.000€, Klasse II für Sportpferde bis 25.000€, Klasse III-V für hochwertige Sport- und Zuchtpferde. Die Wahl hängt vom Kaufpreis und Verwendungszweck ab.",
      category: "klassen"
    },
    {
      question: "Was wird bei der AKU untersucht?",
      answer: "Klinische Untersuchung, Bewegungsanalyse, Flexionsproben, Röntgenaufnahmen (je nach Klasse), Ultraschall (bei höheren Klassen), Endoskopie der Atemwege (optional), Blutuntersuchung (optional).",
      category: "ablauf"
    },
    {
      question: "Kann der Verkäufer die AKU beeinflussen?",
      answer: "Der Verkäufer darf bei der AKU anwesend sein, aber nicht in die Untersuchung eingreifen. Medikamentengabe vor der AKU muss deklariert werden. Ein seriöser Tierarzt führt eine unabhängige Untersuchung durch.",
      category: "rechtliches"
    },
    {
      question: "Was bedeuten die AKU-Befunde?",
      answer: "AKU-Befunde werden in Klassen eingeteilt: Klasse I (klinisch ohne besonderen Befund), Klasse II (geringgradig), Klasse III (mittelgradig), Klasse IV (hochgradig), Klasse V (Änderungen mit schlechter Prognose).",
      category: "befunde"
    }
  ]

  const akuClasses = [
    {
      class: "I",
      title: "Kleine AKU",
      description: "Grunduntersuchung für Freizeitpferde",
      duration: "1-2 Stunden",
      cost: "150-300€",
      includes: ["Klinische Untersuchung", "Bewegungsanalyse", "Flexionsproben", "Basisröntgen (2-4 Aufnahmen)"],
      suitable: "Freizeitpferde bis 5.000€ Kaufpreis"
    },
    {
      class: "II",
      title: "Große AKU",
      description: "Erweiterte Untersuchung für Sportpferde",
      duration: "2-4 Stunden",
      cost: "400-800€",
      includes: ["Alle Punkte der Klasse I", "Erweiterte Röntgenaufnahmen (8-10 Aufnahmen)", "Belastungstest", "Herz-Kreislauf-Untersuchung"],
      suitable: "Sportpferde bis 25.000€ Kaufpreis"
    },
    {
      class: "III-V",
      title: "Spezialisierte AKU",
      description: "Umfassende Untersuchung für hochwertige Pferde",
      duration: "Mehrere Termine",
      cost: "800-2000€+",
      includes: ["Alle Punkte der Klasse II", "Ultraschall", "Endoskopie", "Spezialröntgen", "Laboruntersuchungen"],
      suitable: "Hochwertige Sport- und Zuchtpferde"
    }
  ]

  const calculateEstimatedCost = (selectedClass: string, horseValue: number): number => {
    const baseRates = {
      'I': { min: 150, max: 300 },
      'II': { min: 400, max: 800 },
      'III-V': { min: 800, max: 2000 }
    }

    if (!baseRates[selectedClass as keyof typeof baseRates]) return 0

    const rate = baseRates[selectedClass as keyof typeof baseRates]
    // Dynamische Anpassung basierend auf Pferdewert
    const factor = Math.min(1 + (horseValue / 50000), 2)
    return Math.round((rate.min + rate.max) / 2 * factor)
  }

  const jsonLdFAQ = {
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
  }

  const jsonLdGuide = {
    "@context": "https://schema.org",
    "@type": "Guide",
    "name": "AKU verstehen: Leitfaden zur Ankaufsuntersuchung beim Pferd",
    "description": "Umfassender Ratgeber zur Ankaufsuntersuchung (AKU) bei Pferden. Kosten, Ablauf, Klassen und Befunde verständlich erklärt.",
    "author": {
      "@type": "Organization",
      "name": "PferdeWert.de",
      "url": "https://pferdewert.de"
    },
    "datePublished": "2025-01-20",
    "dateModified": "2025-01-20"
  }

  const jsonLdBreadcrumb = {
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
        "name": "Pferde-Ratgeber",
        "item": "https://pferdewert.de/pferde-ratgeber"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AKU verstehen",
        "item": "https://pferdewert.de/pferde-ratgeber/aku-verstehen"
      }
    ]
  }

  return (
    <>
      <Head>
        <title>AKU Pferd verstehen: Ankaufsuntersuchung Kosten, Ablauf & Befunde 2025 | PferdeWert.de</title>
        <meta
          name="description"
          content="✓ AKU Pferd verstehen: Kosten (150-2000€), Ablauf, Klassen I-V und Befunde der Ankaufsuntersuchung. Expertenratgeber für Pferdekäufer 2025."
        />
        <meta name="keywords" content="AKU Pferd, Ankaufsuntersuchung Pferd, AKU Kosten, AKU Klassen, AKU Befunde, Tierarzt AKU, Pferdekauf AKU" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/aku-verstehen" />

        {/* Open Graph */}
        <meta property="og:title" content="AKU Pferd verstehen: Ankaufsuntersuchung Kosten & Ablauf 2025" />
        <meta property="og:description" content="Kompletter Ratgeber zur Ankaufsuntersuchung: Kosten, Klassen, Befunde und Ablauf verständlich erklärt." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/aku-verstehen" />
        <meta property="og:type" content="article" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGuide) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
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
            <span className="text-brand-brown font-medium">AKU verstehen</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-brown mb-6">
              AKU verstehen: Der komplette Ratgeber zur Ankaufsuntersuchung
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Die Ankaufsuntersuchung (AKU) ist entscheidend beim Pferdekauf. Erfahren Sie alles über
              <strong> Kosten, Ablauf, AKU-Klassen und Befunde</strong> – verständlich erklärt von Experten.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>🔍 Kosten: 150-2000€</span>
              <span>⏱️ Dauer: 1-4 Stunden</span>
              <span>📋 5 AKU-Klassen</span>
              <span>🎯 Für alle Pferdekäufer</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-12 border border-amber-100">
            <h2 className="text-xl font-bold text-brand-brown mb-4">Schnellnavigation</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'grundlagen', label: 'AKU Grundlagen', icon: '📚' },
                { id: 'kosten', label: 'Kosten & Preise', icon: '💰' },
                { id: 'ablauf', label: 'Ablauf & Dauer', icon: '⏱️' },
                { id: 'klassen', label: 'AKU-Klassen', icon: '📊' },
                { id: 'befunde', label: 'Befunde verstehen', icon: '🔍' },
                { id: 'rechner', label: 'Kostenrechner', icon: '🧮' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                    activeTab === tab.id
                      ? 'bg-brand-brown text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-brand-brown/10'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Grundlagen Section */}
              {activeTab === 'grundlagen' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">Was ist eine AKU beim Pferd?</h2>

                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Die <strong>Ankaufsuntersuchung (AKU)</strong> ist eine tierärztliche Untersuchung vor dem Pferdekauf.
                      Sie soll den Gesundheitszustand des Pferdes objektiv bewerten und potenzielle Risiken aufdecken.
                    </p>

                    <h3 className="text-2xl font-bold text-brand-brown mb-4">Warum ist eine AKU wichtig?</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-800 mb-3">✅ Vorteile der AKU</h4>
                        <ul className="space-y-2 text-green-700">
                          <li>• Objektive Gesundheitsbewertung</li>
                          <li>• Schutz vor bösen Überraschungen</li>
                          <li>• Verhandlungsgrundlage beim Preis</li>
                          <li>• Rechtliche Absicherung</li>
                          <li>• Versicherungsrelevante Dokumentation</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-800 mb-3">⚠️ Risiken ohne AKU</h4>
                        <ul className="space-y-2 text-red-700">
                          <li>• Versteckte Krankheiten/Verletzungen</li>
                          <li>• Hohe Folgekosten</li>
                          <li>• Rechtliche Unsicherheit</li>
                          <li>• Versicherungsprobleme</li>
                          <li>• Emotionaler und finanzieller Schaden</li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-brand-brown mb-4">Rechtliche Grundlagen</h3>
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                      <p className="text-blue-800">
                        <strong>Wichtiger Hinweis:</strong> Eine AKU ist rechtlich nicht verpflichtend, aber dringend empfohlen.
                        Ohne AKU trägt der Käufer das volle Risiko für alle Gesundheitsprobleme.
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Kosten Section */}
              {activeTab === 'kosten' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">AKU Kosten: Was kostet eine Ankaufsuntersuchung?</h2>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {akuClasses.map((akuClass) => (
                      <div key={akuClass.class} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-brand-brown mb-2">Klasse {akuClass.class}</div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{akuClass.title}</h3>
                          <div className="text-2xl font-bold text-green-600 mb-2">{akuClass.cost}</div>
                          <div className="text-sm text-gray-600">Dauer: {akuClass.duration}</div>
                        </div>

                        <p className="text-gray-700 mb-4">{akuClass.description}</p>

                        <div className="mb-4">
                          <h4 className="font-bold text-gray-800 mb-2">Umfang:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {akuClass.includes.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-amber-50 p-3 rounded border border-amber-200">
                          <strong className="text-amber-800 text-sm">Geeignet für:</strong>
                          <p className="text-amber-700 text-sm">{akuClass.suitable}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h3 className="font-bold text-yellow-800 mb-3">💡 Kostenfaktoren bei der AKU</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-yellow-700">
                      <div>
                        <h4 className="font-semibold mb-2">Preisbestimmende Faktoren:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Umfang der Untersuchung (Klasse)</li>
                          <li>• Anzahl Röntgenaufnahmen</li>
                          <li>• Zusatzuntersuchungen (Ultraschall, Endoskopie)</li>
                          <li>• Region und Tierarztpraxis</li>
                          <li>• Wochenende/Feiertage (+50-100%)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Zusatzkosten möglich:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Anfahrt Tierarzt: 50-150€</li>
                          <li>• Sedierung bei unruhigen Pferden: 50-100€</li>
                          <li>• Zweitbefundung: 200-500€</li>
                          <li>• Laboruntersuchungen: 100-300€</li>
                          <li>• Spezialisierte Aufnahmen: 100-500€</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Klassen Section */}
              {activeTab === 'klassen' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">AKU-Klassen: Welche AKU ist die richtige?</h2>

                  <div className="mb-8">
                    <p className="text-lg text-gray-700 mb-6">
                      Die AKU wird in verschiedene Klassen unterteilt, je nach Umfang der Untersuchung.
                      Die Wahl der richtigen Klasse hängt vom Kaufpreis und Verwendungszweck ab.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {akuClasses.map((akuClass, index) => (
                      <div key={akuClass.class} className="border-l-4 border-brand-brown pl-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-brand-brown mb-2">
                              AKU Klasse {akuClass.class}: {akuClass.title}
                            </h3>
                            <p className="text-gray-600 text-lg">{akuClass.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{akuClass.cost}</div>
                            <div className="text-sm text-gray-500">{akuClass.duration}</div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold text-gray-800 mb-3">Untersuchungsumfang:</h4>
                            <ul className="space-y-2">
                              {akuClass.includes.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 mb-3">Empfohlen für:</h4>
                            <div className="bg-amber-50 p-4 rounded border border-amber-200">
                              <p className="text-amber-800 font-medium">{akuClass.suitable}</p>
                            </div>
                          </div>
                        </div>

                        {index < akuClasses.length - 1 && <hr className="mt-8 border-gray-200" />}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="font-bold text-blue-800 mb-3">🎯 Entscheidungshilfe: Welche AKU-Klasse wählen?</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-blue-700">
                      <div>
                        <h4 className="font-semibold mb-2">Klasse I wenn:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Kaufpreis unter 5.000€</li>
                          <li>• Freizeitpferd</li>
                          <li>• Älteres Pferd (&gt;15 Jahre)</li>
                          <li>• Budget begrenzt</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Klasse II wenn:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Kaufpreis 5.000-25.000€</li>
                          <li>• Sportpferd</li>
                          <li>• Jüngeres Pferd (5-15 Jahre)</li>
                          <li>• Regelmäßiger Sport geplant</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Klasse III-V wenn:</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Kaufpreis über 25.000€</li>
                          <li>• Hochleistungssport</li>
                          <li>• Zuchtpferd</li>
                          <li>• Spezielle Anforderungen</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Kostenrechner Section */}
              {activeTab === 'rechner' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">AKU-Kostenrechner</h2>

                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
                    <h3 className="font-bold text-amber-800 mb-4">Berechnen Sie die voraussichtlichen AKU-Kosten</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-amber-800 font-medium mb-2">Geplanter Kaufpreis (€):</label>
                        <input
                          type="number"
                          placeholder="z.B. 15000"
                          className="w-full p-3 border border-amber-300 rounded-lg"
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 0
                            setEstimatedCost(calculateEstimatedCost(akuClass, value))
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-amber-800 font-medium mb-2">AKU-Klasse:</label>
                        <select
                          className="w-full p-3 border border-amber-300 rounded-lg"
                          value={akuClass}
                          onChange={(e) => {
                            setAkuClass(e.target.value)
                            // Recalculate if horse value is set
                            const horseValueInput = document.querySelector('input[type="number"]') as HTMLInputElement
                            if (horseValueInput?.value) {
                              setEstimatedCost(calculateEstimatedCost(e.target.value, parseInt(horseValueInput.value)))
                            }
                          }}
                        >
                          <option value="">Klasse wählen</option>
                          <option value="I">Klasse I - Kleine AKU</option>
                          <option value="II">Klasse II - Große AKU</option>
                          <option value="III-V">Klasse III-V - Spezialisiert</option>
                        </select>
                      </div>
                    </div>

                    {estimatedCost > 0 && (
                      <div className="mt-6 p-4 bg-white rounded border border-amber-300">
                        <h4 className="font-bold text-brand-brown mb-2">Geschätzte AKU-Kosten:</h4>
                        <div className="text-3xl font-bold text-green-600">{estimatedCost}€</div>
                        <p className="text-sm text-gray-600 mt-2">
                          *Richtwert basierend auf durchschnittlichen Marktpreisen. Tatsächliche Kosten können variieren.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-4">💡 Spartipps für die AKU</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Kosten sparen:</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Mehrere Angebote einholen</li>
                          <li>• Werktags statt Wochenende</li>
                          <li>• AKU beim Verkäufer vor Ort</li>
                          <li>• Gruppentermine bei mehreren Pferden</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Nicht sparen bei:</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Qualifikation des Tierarztes</li>
                          <li>• Umfang der Untersuchung</li>
                          <li>• Röntgenqualität</li>
                          <li>• Zweitmeinung bei Unsicherheit</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">📋 AKU Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kosten Klasse I:</span>
                    <span className="font-medium">150-300€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kosten Klasse II:</span>
                    <span className="font-medium">400-800€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dauer:</span>
                    <span className="font-medium">1-4 Stunden</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gültigkeit:</span>
                    <span className="font-medium">2-4 Wochen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Röntgenaufnahmen:</span>
                    <span className="font-medium">2-20+ Bilder</span>
                  </div>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-brand-brown/5 rounded-lg p-6 border border-brand-brown/20">
                <h3 className="font-bold text-brand-brown mb-3">🎯 Pferd bewerten lassen</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sie haben bereits eine AKU und möchten den fairen Marktwert Ihres Pferdes ermitteln?
                </p>
                <Link
                  href="/pferde-preis-berechnen"
                  className="block w-full bg-brand-brown hover:bg-brand-brownDark text-white text-center py-3 rounded-lg transition-colors font-medium"
                >
                  Jetzt Pferdewert berechnen
                </Link>
              </div>

              {/* Expert Tip */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-3">💡 Expertenrat</h3>
                <p className="text-sm text-green-700">
                  &ldquo;Eine AKU ist eine Investition in die Sicherheit. Die Kosten amortisieren sich schnell,
                  wenn dadurch teure Folgekosten vermieden werden.&rdquo;
                </p>
                <div className="mt-3 text-xs text-green-600">
                  - Dr. Veterinärwesen, Fachtierarzt für Pferde
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">📚 Verwandte Artikel</h3>
                <div className="space-y-3">
                  <Link
                    href="/pferde-ratgeber/pferdebewertung-grundlagen"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → Grundlagen der Pferdebewertung
                  </Link>
                  <Link
                    href="/pferde-ratgeber/aku-verstehen/aku-befunde-interpretieren"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → AKU Befunde interpretieren
                  </Link>
                  <Link
                    href="/pferde-ratgeber/markttrends"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → Aktuelle Markttrends
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-amber-100">
            <h2 className="text-3xl font-bold text-brand-brown mb-8">Häufig gestellte Fragen zur AKU</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {faqItems.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  <div className="mt-3">
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-brand-brown to-brand-brownDark text-white rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">
                Bereit für eine professionelle Pferdebewertung?
              </h2>
              <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                Nutzen Sie unsere KI-gestützte Bewertung für eine objektive Einschätzung.
                Berücksichtigt AKU-Befunde und aktuelle Marktdaten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link
                  href="/pferde-preis-berechnen"
                  className="bg-white text-brand-brown hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Pferdewert berechnen
                </Link>
                <Link
                  href="/pferd-verkaufen"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-brown px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Pferd verkaufen
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

export default AKUVerstehen
