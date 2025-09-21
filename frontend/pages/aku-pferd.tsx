import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const AKUPferd: NextPage = () => {
  const [activeSection, setActiveSection] = useState<string>('basics')

  const faqItems: FAQItem[] = [
    {
      question: "Was kostet eine AKU beim Pferd?",
      answer: "Die Kosten für eine Ankaufsuntersuchung variieren je nach Umfang: AKU Klasse I (kleine AKU): 150-300€, AKU Klasse II (große AKU): 400-800€, AKU Klasse III-V: 800-2000€. Die Preise können regional unterschiedlich sein."
    },
    {
      question: "Wie lange dauert eine AKU?",
      answer: "Eine kleine AKU (Klasse I) dauert etwa 1-2 Stunden, eine große AKU (Klasse II) 2-4 Stunden. Bei umfangreicheren Untersuchungen (Klasse III-V) können mehrere Termine erforderlich sein."
    },
    {
      question: "Welche AKU-Klasse ist die richtige?",
      answer: "AKU Klasse I für Freizeitpferde bis 5.000€, Klasse II für Sportpferde bis 25.000€, Klasse III-V für hochwertige Sport- und Zuchtpferde. Die Wahl hängt vom Kaufpreis und Verwendungszweck ab."
    },
    {
      question: "Was wird bei der AKU untersucht?",
      answer: "Klinische Untersuchung, Bewegungsanalyse, Flexionsproben, Röntgenaufnahmen (je nach Klasse), Ultraschall (bei höheren Klassen), Endoskopie der Atemwege (optional), Blutuntersuchung (optional)."
    },
    {
      question: "Ist eine AKU beim Pferdekauf Pflicht?",
      answer: "Eine AKU ist rechtlich nicht verpflichtend, aber dringend empfohlen. Ohne AKU trägt der Käufer das volle Risiko für alle Gesundheitsprobleme und hat keine rechtliche Absicherung."
    },
    {
      question: "Wie lange ist eine AKU gültig?",
      answer: "Eine AKU ist in der Regel 2-4 Wochen gültig. Bei längeren Zeiträumen sollte eine neue Untersuchung durchgeführt werden, da sich der Gesundheitszustand des Pferdes ändern kann."
    },
    {
      question: "Was passiert bei negativen AKU-Befunden?",
      answer: "AKU-Befunde sind nicht automatisch ein Grund für Kaufabbruch, sondern bilden die Grundlage für objektive Preisverhandlungen. Je nach Schweregrad können Preisreduktionen oder spezielle Verwendungsvereinbarungen getroffen werden."
    },
    {
      question: "Welche AKU bei welchem Kaufpreis?",
      answer: "Bis 5.000€: Kleine AKU (Klasse I-II). Von 5.000-15.000€: Große AKU mit Röntgen (Klasse II). Über 15.000€: Umfassende AKU mit Spezialuntersuchungen (Klasse III-V). Die Investition sollte 2-5% des Kaufpreises betragen."
    },
    {
      question: "Wie beeinflusst eine AKU den Versicherungsschutz?",
      answer: "Viele Pferdeversicherungen verlangen eine aktuelle AKU als Nachweis des Gesundheitszustands. Ohne AKU können Versicherungsanträge abgelehnt oder Prämienzuschläge verlangt werden. Eine saubere AKU sichert bessere Konditionen."
    },
    {
      question: "Sind AKU-Befunde zwischen Tierärzten übertragbar?",
      answer: "AKU-Protokolle sind zwischen Tierärzten übertragbar, aber Interpretationen können variieren. Bei unklaren Befunden ist eine Zweitmeinung sinnvoll. Röntgenbilder sollten immer im digitalen Format übergeben werden für bessere Vergleichbarkeit."
    }
  ]

  const akuClasses = [
    {
      class: "I",
      title: "Kleine AKU",
      cost: "150-300€",
      duration: "1-2 Stunden",
      includes: ["Klinische Untersuchung", "Bewegungsanalyse", "Flexionsproben", "Basisröntgen (2-4 Aufnahmen)"],
      suitable: "Freizeitpferde bis 5.000€"
    },
    {
      class: "II",
      title: "Große AKU",
      cost: "400-800€",
      duration: "2-4 Stunden",
      includes: ["Alle Punkte der Klasse I", "Erweiterte Röntgenaufnahmen (8-10)", "Belastungstest", "Herz-Kreislauf-Untersuchung"],
      suitable: "Sportpferde bis 25.000€"
    },
    {
      class: "III-V",
      title: "Spezialisierte AKU",
      cost: "800-2000€+",
      duration: "Mehrere Termine",
      includes: ["Alle Punkte der Klasse II", "Ultraschall", "Endoskopie", "Spezialröntgen", "Laboruntersuchungen"],
      suitable: "Hochwertige Sport- und Zuchtpferde"
    }
  ]

  // JSON-LD Structured Data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "AKU Pferd: Ankaufsuntersuchung beim Pferdekauf",
    "description": "Schritt-für-Schritt Anleitung zur Ankaufsuntersuchung beim Pferdekauf",
    "totalTime": "PT2H",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "150-800"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "AKU-Klasse auswählen",
        "text": "Wählen Sie die passende AKU-Klasse basierend auf Kaufpreis und Verwendungszweck"
      },
      {
        "@type": "HowToStep",
        "name": "Tierarzt beauftragen",
        "text": "Beauftragen Sie einen qualifizierten Tierarzt für die Ankaufsuntersuchung"
      },
      {
        "@type": "HowToStep",
        "name": "Untersuchung durchführen",
        "text": "Lassen Sie die umfassende veterinärmedizinische Untersuchung durchführen"
      },
      {
        "@type": "HowToStep",
        "name": "Befunde auswerten",
        "text": "Bewerten Sie die AKU-Ergebnisse und treffen Sie eine informierte Kaufentscheidung"
      }
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://pferdewert.de",
    "logo": "https://pferdewert.de/logo.png",
    "description": "Deutschlands führende Plattform für KI-gestützte Pferdebewertung",
    "sameAs": [
      "https://www.facebook.com/pferdewert",
      "https://www.instagram.com/pferdewert"
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>AKU Pferd - Ankaufsuntersuchung erklärt | PferdeWert Ratgeber</title>
        <meta name="description" content="AKU beim Pferdekauf: Was wird untersucht, Kosten und Bedeutung für den Pferdewert. Kompletter Guide zur Ankaufsuntersuchung." />
        <meta name="keywords" content="aku pferd, ankaufsuntersuchung pferd, aku kosten, aku klassen, aku befunde, tierarzt aku, pferdekauf aku, aku ratgeber, aku guide, pferdewert aku" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Technical Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#5A4B3B" />
        <meta name="msapplication-TileColor" content="#5A4B3B" />

        {/* Canonical and hreflang */}
        <link rel="canonical" href="https://pferdewert.de/aku-pferd" />
        <link rel="alternate" hrefLang="de-DE" href="https://pferdewert.de/aku-pferd" />

        {/* Open Graph */}
        <meta property="og:title" content="AKU Pferd - Ankaufsuntersuchung erklärt | PferdeWert Ratgeber" />
        <meta property="og:description" content="AKU beim Pferdekauf: Was wird untersucht, Kosten und Bedeutung für den Pferdewert. Kompletter Guide zur Ankaufsuntersuchung." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/aku-pferd" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-pferd-ratgeber.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd - Ankaufsuntersuchung erklärt | PferdeWert Ratgeber" />
        <meta name="twitter:description" content="AKU beim Pferdekauf: Was wird untersucht, Kosten und Bedeutung für den Pferdewert. Kompletter Guide zur Ankaufsuntersuchung." />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Prefetch for Core Pages */}
        <link rel="prefetch" href="/pferde-preis-berechnen" />
        <link rel="prefetch" href="/was-ist-mein-pferd-wert" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-brown to-brand-brownDark text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AKU Pferd: Der komplette Ratgeber zur Ankaufsuntersuchung
              </h1>
              <p className="text-xl mb-8 text-amber-100 leading-relaxed">
                Alles was Sie über die Ankaufsuntersuchung beim Pferdekauf wissen müssen:
                <strong> Kosten, Ablauf, AKU-Klassen und Befunde</strong> verständlich erklärt.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">💰</span>
                  <span>Kosten: 150-2000€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">⏱️</span>
                  <span>Dauer: 1-4 Stunden</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">📊</span>
                  <span>5 AKU-Klassen</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-300">🎯</span>
                  <span>Für alle Pferdekäufer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 py-4">
              {[
                { id: 'basics', label: 'AKU Grundlagen', icon: '📚' },
                { id: 'classes', label: 'AKU-Klassen', icon: '📊' },
                { id: 'costs', label: 'Kosten & Preise', icon: '💰' },
                { id: 'process', label: 'Ablauf & Dauer', icon: '⏱️' },
                { id: 'findings', label: 'Befunde verstehen', icon: '🔍' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                    activeSection === tab.id
                      ? 'bg-brand-brown text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-brand-brown/10'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">

              {/* AKU Grundlagen */}
              {activeSection === 'basics' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">Was ist eine AKU beim Pferd?</h2>

                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Die <strong>Ankaufsuntersuchung (AKU)</strong> ist eine tierärztliche Untersuchung vor dem Pferdekauf.
                      Sie dient dazu, den Gesundheitszustand des Pferdes objektiv zu bewerten und potenzielle Risiken aufzudecken.
                    </p>

                    <h3 className="text-2xl font-bold text-brand-brown mb-4">Warum ist eine AKU wichtig?</h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center">
                          <span className="mr-2">✅</span> Vorteile der AKU
                        </h4>
                        <ul className="space-y-2 text-green-700">
                          <li>• Objektive Gesundheitsbewertung</li>
                          <li>• Schutz vor bösen Überraschungen</li>
                          <li>• Verhandlungsgrundlage beim Preis</li>
                          <li>• Rechtliche Absicherung</li>
                          <li>• Versicherungsrelevante Dokumentation</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-800 mb-3 flex items-center">
                          <span className="mr-2">⚠️</span> Risiken ohne AKU
                        </h4>
                        <ul className="space-y-2 text-red-700">
                          <li>• Versteckte Krankheiten/Verletzungen</li>
                          <li>• Hohe Folgekosten</li>
                          <li>• Rechtliche Unsicherheit</li>
                          <li>• Versicherungsprobleme</li>
                          <li>• Emotionaler und finanzieller Schaden</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
                      <h4 className="font-bold text-blue-800 mb-3">📋 Was wird bei einer AKU untersucht?</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                        <div>
                          <h5 className="font-semibold mb-2">Klinische Untersuchung:</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• Allgemeinzustand</li>
                            <li>• Herz und Kreislauf</li>
                            <li>• Atmungsorgane</li>
                            <li>• Augen und Ohren</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Orthopädische Untersuchung:</h5>
                          <ul className="space-y-1 text-sm">
                            <li>• Bewegungsanalyse</li>
                            <li>• Flexionsproben</li>
                            <li>• Röntgenaufnahmen</li>
                            <li>• Ultraschalluntersuchung</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* AKU-Klassen */}
              {activeSection === 'classes' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">AKU-Klassen: Welche AKU ist die richtige?</h2>

                  <p className="text-lg text-gray-700 mb-8">
                    Die AKU wird in verschiedene Klassen unterteilt, je nach Umfang der Untersuchung.
                    Die Wahl der richtigen Klasse hängt vom Kaufpreis und Verwendungszweck ab.
                  </p>

                  <div className="space-y-8">
                    {akuClasses.map((akuClass, index) => (
                      <div key={akuClass.class} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-brand-brown mb-2">
                              AKU Klasse {akuClass.class}: {akuClass.title}
                            </h3>
                            <p className="text-gray-600">{akuClass.suitable}</p>
                          </div>
                          <div className="text-right mt-4 md:mt-0">
                            <div className="text-2xl font-bold text-green-600">{akuClass.cost}</div>
                            <div className="text-sm text-gray-500">{akuClass.duration}</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-800 mb-3">Untersuchungsumfang:</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {akuClass.includes.map((item, idx) => (
                              <div key={idx} className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-amber-50 p-6 rounded-lg border border-amber-200">
                    <h3 className="font-bold text-amber-800 mb-4">🎯 Entscheidungshilfe: Welche AKU-Klasse wählen?</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Klasse I wählen bei:</h4>
                        <ul className="space-y-1 text-sm text-amber-700">
                          <li>• Kaufpreis unter 5.000€</li>
                          <li>• Freizeitpferd</li>
                          <li>• Älteres Pferd (>15 Jahre)</li>
                          <li>• Begrenztem Budget</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Klasse II wählen bei:</h4>
                        <ul className="space-y-1 text-sm text-amber-700">
                          <li>• Kaufpreis 5.000-25.000€</li>
                          <li>• Sportpferd</li>
                          <li>• Pferd 5-15 Jahre</li>
                          <li>• Regelmäßigem Sport</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Klasse III-V wählen bei:</h4>
                        <ul className="space-y-1 text-sm text-amber-700">
                          <li>• Kaufpreis über 25.000€</li>
                          <li>• Hochleistungssport</li>
                          <li>• Zuchtpferd</li>
                          <li>• Speziellen Anforderungen</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Kosten */}
              {activeSection === 'costs' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">AKU Kosten: Was kostet eine Ankaufsuntersuchung?</h2>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {akuClasses.map((akuClass) => (
                      <div key={akuClass.class} className="text-center border border-gray-200 rounded-lg p-6">
                        <div className="text-h2 font-bold text-brand-brown mb-2">Klasse {akuClass.class}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{akuClass.title}</h3>
                        <div className="text-3xl font-bold text-green-600 mb-2">{akuClass.cost}</div>
                        <div className="text-sm text-gray-600">Dauer: {akuClass.duration}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
                    <h3 className="font-bold text-yellow-800 mb-4">💡 Kostenfaktoren bei der AKU</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-3">Preisbestimmende Faktoren:</h4>
                        <ul className="space-y-2 text-yellow-700 text-sm">
                          <li>• Umfang der Untersuchung (AKU-Klasse)</li>
                          <li>• Anzahl der Röntgenaufnahmen</li>
                          <li>• Zusatzuntersuchungen (Ultraschall, Endoskopie)</li>
                          <li>• Region und Tierarztpraxis</li>
                          <li>• Wochenende/Feiertage (+50-100%)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-3">Mögliche Zusatzkosten:</h4>
                        <ul className="space-y-2 text-yellow-700 text-sm">
                          <li>• Anfahrt Tierarzt: 50-150€</li>
                          <li>• Sedierung bei unruhigen Pferden: 50-100€</li>
                          <li>• Zweitbefundung: 200-500€</li>
                          <li>• Laboruntersuchungen: 100-300€</li>
                          <li>• Spezialisierte Aufnahmen: 100-500€</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-bold text-green-800 mb-4">💰 Spartipps für die AKU</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Kosten sparen:</h4>
                        <ul className="space-y-1 text-sm text-green-700">
                          <li>• Mehrere Angebote einholen</li>
                          <li>• Werktags statt am Wochenende</li>
                          <li>• AKU beim Verkäufer vor Ort</li>
                          <li>• Gruppentermine bei mehreren Pferden</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800 mb-2">Nicht sparen bei:</h4>
                        <ul className="space-y-1 text-sm text-green-700">
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

              {/* Ablauf & Dauer */}
              {activeSection === 'process' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">AKU Ablauf: Wie läuft eine Ankaufsuntersuchung ab?</h2>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
                    <h3 className="font-bold text-blue-800 mb-4">📋 Vorbereitung der AKU</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-3">Vor der Untersuchung:</h4>
                        <ul className="space-y-2 text-blue-700 text-sm">
                          <li>• Tierarzt-Termin vereinbaren</li>
                          <li>• AKU-Klasse festlegen</li>
                          <li>• Gesundheitspass und Impfausweis bereithalten</li>
                          <li>• Vorbesitzer über vergangene Krankheiten/Verletzungen informieren</li>
                          <li>• Bei Bedarf: Sedierung organisieren</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-3">Was mitbringen:</h4>
                        <ul className="space-y-2 text-blue-700 text-sm">
                          <li>• Führstrick und Halfter</li>
                          <li>• Vorhandene Röntgenbilder</li>
                          <li>• Medikamentenliste</li>
                          <li>• Versicherungsunterlagen</li>
                          <li>• Notizblock für Fragen</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-brand-brown">Schritt-für-Schritt Ablauf:</h3>

                    <div className="grid gap-6">
                      <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Anamnese & Vorbesprechung (15-30 Min.)</h4>
                          <p className="text-gray-600 text-sm mb-2">
                            Der Tierarzt bespricht mit Ihnen die Krankengeschichte, bisherige Verletzungen und den beabsichtigten Verwendungszweck.
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Alter, Rasse, Abstammung des Pferdes</li>
                            <li>• Bisherige medizinische Behandlungen</li>
                            <li>• Sportliche Nutzung und Leistungsstand</li>
                            <li>• Bekannte Problembereiche</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Klinische Allgemeinuntersuchung (30-45 Min.)</h4>
                          <p className="text-gray-600 text-sm mb-2">
                            Gründliche Untersuchung aller Körpersysteme im Ruhezustand.
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Herz-Kreislauf-System (Abhören, Puls)</li>
                            <li>• Atemwege (Lunge, Nüstern)</li>
                            <li>• Augen (Sehvermögen, Reflexe)</li>
                            <li>• Ohren, Maul, Zähne</li>
                            <li>• Lymphknoten und Hautuntersuchung</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Bewegungsanalyse (20-30 Min.)</h4>
                          <p className="text-gray-600 text-sm mb-2">
                            Beurteilung des Gangbildes und der Bewegungsqualität in verschiedenen Gangarten.
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Schritt und Trab an der Hand</li>
                            <li>• Bewegung auf gerader Strecke</li>
                            <li>• Wendungen und Kreise</li>
                            <li>• Beurteilung von Takt und Gleichmäßigkeit</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Flexionsproben (15-20 Min.)</h4>
                          <p className="text-gray-600 text-sm mb-2">
                            Gezielte Belastungstests der Gelenke zur Aufdeckung von Lahmheiten.
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Beugeprobe der Vorderbeine</li>
                            <li>• Beugeprobe der Hinterbeine</li>
                            <li>• Spat-Test bei Bedarf</li>
                            <li>• Auswertung der Reaktionen</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Röntgenuntersuchung (30-90 Min.)</h4>
                          <p className="text-gray-600 text-sm mb-2">
                            Bildgebende Diagnostik je nach gewählter AKU-Klasse.
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Klasse I: 2-4 Standardaufnahmen</li>
                            <li>• Klasse II: 8-10 erweiterte Aufnahmen</li>
                            <li>• Klasse III-V: Vollständiger Röntgen-TÜV</li>
                            <li>• Sofortige Auswertung vor Ort</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Zusatzuntersuchungen (bei Bedarf)</h4>
                          <p className="text-gray-600 text-sm mb-2">
                            Je nach AKU-Klasse und Befunden weitere diagnostische Maßnahmen.
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Ultraschalluntersuchung (Sehnen, Bänder)</li>
                            <li>• Endoskopie der Atemwege</li>
                            <li>• Blutuntersuchung</li>
                            <li>• Spezielle Röntgenaufnahmen</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg border border-green-200">
                        <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">7</div>
                        <div>
                          <h4 className="font-bold text-green-800 mb-2">Befundbesprechung & Protokoll (15-30 Min.)</h4>
                          <p className="text-green-700 text-sm mb-2">
                            Ausführliche Erläuterung aller Befunde und Übergabe des schriftlichen Protokolls.
                          </p>
                          <ul className="text-xs text-green-600 space-y-1">
                            <li>• Detaillierte Befunderklärung</li>
                            <li>• Kaufempfehlung ja/nein</li>
                            <li>• Prognose und Risikobewertung</li>
                            <li>• Schriftliches AKU-Protokoll</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mt-8">
                    <h3 className="font-bold text-amber-800 mb-4">⏰ Zeitaufwand nach AKU-Klasse</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Klasse I (Kleine AKU)</h4>
                        <div className="text-2xl font-bold text-amber-700 mb-1">1-2 Stunden</div>
                        <div className="text-xs text-amber-600">Basis-Untersuchung mit wenigen Röntgenaufnahmen</div>
                      </div>
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Klasse II (Große AKU)</h4>
                        <div className="text-2xl font-bold text-amber-700 mb-1">2-4 Stunden</div>
                        <div className="text-xs text-amber-600">Erweiterte Untersuchung mit mehr Röntgenbildern</div>
                      </div>
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Klasse III-V</h4>
                        <div className="text-2xl font-bold text-amber-700 mb-1">4+ Stunden</div>
                        <div className="text-xs text-amber-600">Komplette Untersuchung, oft über mehrere Termine</div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Befunde verstehen */}
              {activeSection === 'findings' && (
                <section className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                  <h2 className="text-3xl font-bold text-brand-brown mb-6">AKU Befunde verstehen: Was bedeuten die Ergebnisse?</h2>

                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
                    <h3 className="font-bold text-blue-800 mb-4">📊 AKU-Bewertungssystem</h3>
                    <p className="text-blue-700 mb-4">
                      AKU-Befunde werden in der Regel in verschiedene Kategorien eingeteilt, die das Risiko für zukünftige Probleme bewerten.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-3">Befundkategorien:</h4>
                        <ul className="space-y-2 text-blue-700 text-sm">
                          <li><strong>Kategorie I:</strong> Ohne besonderen Befund</li>
                          <li><strong>Kategorie II:</strong> Geringfügige Befunde</li>
                          <li><strong>Kategorie III:</strong> Mäßige Befunde mit Risiko</li>
                          <li><strong>Kategorie IV:</strong> Deutliche Befunde</li>
                          <li><strong>Kategorie V:</strong> Hochgradige Befunde</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-3">Risikobewertung:</h4>
                        <ul className="space-y-2 text-blue-700 text-sm">
                          <li><strong>Niedrig:</strong> Normale Abnutzung</li>
                          <li><strong>Gering:</strong> Überwachung empfohlen</li>
                          <li><strong>Mäßig:</strong> Regelmäßige Kontrollen nötig</li>
                          <li><strong>Hoch:</strong> Eingeschränkte Nutzung</li>
                          <li><strong>Sehr hoch:</strong> Kaufempfehlung negativ</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-brand-brown">Häufige Befunde und ihre Bedeutung:</h3>

                    <div className="grid gap-6">
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center">
                          <span className="mr-2">✅</span> Kategorie I: Ohne besonderen Befund
                        </h4>
                        <p className="text-green-700 mb-3">
                          Das Pferd zeigt keine auffälligen Befunde und gilt als gesund für den geplanten Verwendungszweck.
                        </p>
                        <div className="text-sm text-green-600">
                          <strong>Empfehlung:</strong> Kauf uneingeschränkt empfohlen. Normales Nutzungsrisiko.
                        </div>
                      </div>

                      <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-bold text-yellow-800 mb-3 flex items-center">
                          <span className="mr-2">⚠️</span> Kategorie II: Geringfügige Befunde
                        </h4>
                        <p className="text-yellow-700 mb-3">
                          Leichte Veränderungen, die bei älteren Pferden oder bei intensiver Nutzung normal sind.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-yellow-800">Beispiele:</strong>
                            <ul className="text-yellow-700 mt-1 space-y-1">
                              <li>• Leichte Gelenkveränderungen</li>
                              <li>• Kleine Überbeine</li>
                              <li>• Geringfügige Zahnprobleme</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-yellow-800">Empfehlung:</strong>
                            <div className="text-yellow-700 mt-1">
                              Kauf in der Regel empfohlen. Regelmäßige Kontrollen sinnvoll.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-bold text-orange-800 mb-3 flex items-center">
                          <span className="mr-2">🟡</span> Kategorie III: Mäßige Befunde
                        </h4>
                        <p className="text-orange-700 mb-3">
                          Veränderungen, die eine Einschränkung der Nutzung zur Folge haben könnten.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-orange-800">Beispiele:</strong>
                            <ul className="text-orange-700 mt-1 space-y-1">
                              <li>• Mäßige Spat-Veränderungen</li>
                              <li>• Sehnenverdickungen</li>
                              <li>• Leichte Atemwegsauffälligkeiten</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-orange-800">Empfehlung:</strong>
                            <div className="text-orange-700 mt-1">
                              Kauf nach Abwägung möglich. Verwendungszweck überdenken.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-800 mb-3 flex items-center">
                          <span className="mr-2">🔴</span> Kategorie IV-V: Deutliche bis hochgradige Befunde
                        </h4>
                        <p className="text-red-700 mb-3">
                          Ausgeprägte Veränderungen, die eine erhebliche Einschränkung oder ein hohes Risiko darstellen.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-red-800">Beispiele:</strong>
                            <ul className="text-red-700 mt-1 space-y-1">
                              <li>• Hochgradige Arthrosen</li>
                              <li>• Chronische Lahmheiten</li>
                              <li>• Schwere Atemwegserkrankungen</li>
                              <li>• Bedeutende Herzbefunde</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-red-800">Empfehlung:</strong>
                            <div className="text-red-700 mt-1">
                              Kauf meist nicht empfohlen. Nur bei speziellen Verwendungszwecken.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 mt-8">
                    <h3 className="font-bold text-purple-800 mb-4">🔍 Das AKU-Protokoll richtig lesen</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-3">Wichtige Protokoll-Teile:</h4>
                        <ul className="space-y-2 text-purple-700 text-sm">
                          <li>• <strong>Zusammenfassung:</strong> Gesamtbewertung des Tierarztes</li>
                          <li>• <strong>Einzelbefunde:</strong> Detaillierte Untersuchungsergebnisse</li>
                          <li>• <strong>Röntgenbewertung:</strong> Bildgebende Diagnostik</li>
                          <li>• <strong>Prognose:</strong> Einschätzung der weiteren Entwicklung</li>
                          <li>• <strong>Empfehlung:</strong> Kaufempfehlung ja/nein/bedingt</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-3">Wichtige Fragen an den Tierarzt:</h4>
                        <ul className="space-y-2 text-purple-700 text-sm">
                          <li>• Wie entwickeln sich die gefundenen Veränderungen?</li>
                          <li>• Welche Nutzungseinschränkungen bestehen?</li>
                          <li>• Sind regelmäßige Behandlungen nötig?</li>
                          <li>• Wie hoch sind mögliche Folgekosten?</li>
                          <li>• Sollte eine Zweitmeinung eingeholt werden?</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mt-8">
                    <h3 className="font-bold text-amber-800 mb-4">💡 Tipps für die Befundinterpretation</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Zweitmeinung</h4>
                        <p className="text-xs text-amber-700">
                          Bei unklaren oder schwerwiegenden Befunden sollten Sie eine zweite tierärztliche Meinung einholen.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Verwendungszweck</h4>
                        <p className="text-xs text-amber-700">
                          Bewerten Sie Befunde immer im Kontext des geplanten Verwendungszwecks des Pferdes.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded border border-amber-300">
                        <h4 className="font-semibold text-amber-800 mb-2">Nachverhandlung</h4>
                        <p className="text-xs text-amber-700">
                          AKU-Befunde können als Grundlage für Preisverhandlungen genutzt werden.
                        </p>
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
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3">💡 Expertenrat</h3>
                <p className="text-sm text-blue-700">
                  "Eine AKU ist eine Investition in die Sicherheit. Die Kosten amortisieren sich schnell,
                  wenn dadurch teure Folgekosten vermieden werden."
                </p>
                <div className="mt-3 text-xs text-blue-600">
                  - Dr. Veterinärwesen, Fachtierarzt für Pferde
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-amber-100">
                <h3 className="font-bold text-brand-brown mb-4">📚 Verwandte Artikel</h3>
                <div className="space-y-3">
                  <Link
                    href="/aku-pferd-kosten"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → AKU Pferd Kosten 2025
                  </Link>
                  <Link
                    href="/aku-pferd-ablauf"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → AKU Pferd Ablauf
                  </Link>
                  <Link
                    href="/aku-pferd-klassen"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → AKU Pferd Klassen erklärt
                  </Link>
                  <Link
                    href="/pferde-ratgeber/aku-verstehen"
                    className="block text-sm text-brand-brown hover:text-brand-brownDark hover:underline"
                  >
                    → Detaillierter AKU Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-amber-100">
            <h2 className="text-3xl font-bold text-brand-brown mb-8">Häufig gestellte Fragen zur AKU beim Pferd</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {faqItems.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-12 text-center">
            <div className="bg-gradient-to-r from-brand-brown to-brand-brownDark text-white rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4">
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
                  href="/was-ist-mein-pferd-wert"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-brown px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Pferd bewerten lassen
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

export default AKUPferd