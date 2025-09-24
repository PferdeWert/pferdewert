import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoBox from '../components/InfoBox'
import ContentSection from '../components/ContentSection'
import CTAButton from '../components/CTAButton'
import FAQ from '../components/FAQ'
import Link from 'next/link'
import { Clock, Calendar, Award, ArrowRight, ChevronDown } from 'lucide-react'
import { FAQItem } from '../types/faq.types'
import { useState } from 'react'

const AKUPferd: NextPage = () => {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = [
    { id: 'basics', title: 'AKU Grundlagen', icon: '📋' },
    { id: 'classes', title: 'AKU-Klassen', icon: '📊' },
    { id: 'costs', title: 'Kosten', icon: '💰' },
    { id: 'process', title: 'Ablauf & Dauer', icon: '⏱️' },
    { id: 'findings', title: 'Befunde verstehen', icon: '🔍' }
  ]

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
        <title>AKU Pferd: Die Ankaufsuntersuchung | PferdeWert Ratgeber</title>
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
        <meta property="og:title" content="AKU Pferd: Die Ankaufsuntersuchung | PferdeWert Ratgeber" />
        <meta property="og:description" content="AKU beim Pferdekauf: Was wird untersucht, Kosten und Bedeutung für den Pferdewert. Kompletter Guide zur Ankaufsuntersuchung." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/aku-pferd" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-pferd-ratgeber.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd: Die Ankaufsuntersuchung | PferdeWert Ratgeber" />
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

      <main className="min-h-screen bg-white">
        {/* Hero Section - Clean Text Only Design */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 text-sm text-gray-700 bg-[#f4f1ec] px-3 py-1 rounded-full">
                <Award className="h-4 w-4" />
                Pferde-Ratgeber
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 text-balance">
                AKU Pferd: Die Ankaufsuntersuchung
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-700 text-pretty max-w-3xl mx-auto leading-relaxed">
                Ihr kompletter Ratgeber: Alles über Kosten, Ablauf, AKU-Klassen und Befunde der
                Ankaufsuntersuchung beim Pferd verständlich erklärt.
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  12 min Lesezeit
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  24. September 2025
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Experten-Ratgeber
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="/pferde-preis-berechnen"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#92400e] hover:bg-[#78350f] text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  Pferdewert jetzt berechnen
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => document.getElementById('inhaltsverzeichnis')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#92400e] hover:bg-[#92400e] hover:text-white text-[#92400e] font-medium rounded-xl transition-all"
                >
                  Zum Inhalt
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Image
              src="/images/blossi-shooting.webp"
              alt="AKU Pferd: Ankaufsuntersuchung beim Pferd - Tierarzt untersucht Pferd"
              width={1200}
              height={600}
              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
        </section>

        {/* Table of Contents Navigation */}
        <section id="inhaltsverzeichnis" className="bg-white/95 border-b border-brand-gold/20 sticky top-0 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="py-4 md:py-6">
              <h2 className="font-heading text-lg md:text-xl font-bold text-brand-default mb-3 md:mb-4 text-center">
                📋 Inhaltsverzeichnis
              </h2>
              <div className="flex flex-wrap justify-center gap-1 md:gap-2 max-w-4xl mx-auto">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const element = document.getElementById(section.id)
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      setActiveSection(section.id)
                    }}
                    className={`px-3 py-2 md:px-4 md:py-3 rounded-lg transition-all duration-300 font-medium text-xs md:text-sm min-h-[44px] ${
                      activeSection === section.id
                        ? 'bg-brand-brown text-white shadow-lg transform scale-105'
                        : 'bg-white text-brand-default/80 hover:bg-brand-gold/10 hover:text-brand-brown border border-brand-light'
                    }`}
                  >
                    <span className="flex items-center space-x-1 md:space-x-2">
                      <span className="text-sm md:text-base">{section.icon}</span>
                      <span className="hidden sm:inline">{section.title}</span>
                      <span className="sm:hidden text-xs">{section.title.split(' ')[0]}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Full Width Main Content */}
          <div className="max-w-5xl mx-auto">
                {/* AKU Grundlagen */}
                {activeSection === 'basics' && (
                  <div id="basics" className="space-y-8">
                    <ContentSection
                      title="Was ist eine AKU beim Pferd?"
                      icon="📋"
                      content={
                        <>
                          <p className="text-lg mb-6">
                            Die <strong>Ankaufsuntersuchung (AKU)</strong> ist eine tierärztliche Untersuchung vor dem Pferdekauf.
                            Sie dient dazu, den Gesundheitszustand des Pferdes objektiv zu bewerten und potenzielle Risiken aufzudecken.
                          </p>

                          <InfoBox
                            type="cost"
                            title="AKU Quick Facts"
                            content={
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                <div className="text-center">
                                  <div className="font-medium text-brand-brown">Kosten Klasse I</div>
                                  <div className="text-2xl font-bold text-brand-default">150-300€</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-brand-brown">Kosten Klasse II</div>
                                  <div className="text-2xl font-bold text-brand-default">400-800€</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-brand-brown">Dauer</div>
                                  <div className="text-2xl font-bold text-brand-default">1-4 Std</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-brand-brown">Gültigkeit</div>
                                  <div className="text-2xl font-bold text-brand-default">2-4 Wochen</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-brand-brown">Röntgenbilder</div>
                                  <div className="text-2xl font-bold text-brand-default">2-20+</div>
                                </div>
                              </div>
                            }
                          />
                        </>
                      }
                    />

                    <ContentSection
                      title="Warum ist eine AKU wichtig?"
                      icon="⚖️"
                      content={
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <InfoBox
                            type="tip"
                            title="Vorteile der AKU"
                            content={
                              <ul className="space-y-2 text-sm md:text-base">
                                <li>• Objektive Gesundheitsbewertung</li>
                                <li>• Schutz vor bösen Überraschungen</li>
                                <li>• Verhandlungsgrundlage beim Preis</li>
                                <li>• Rechtliche Absicherung</li>
                                <li>• Versicherungsrelevante Dokumentation</li>
                              </ul>
                            }
                          />

                          <InfoBox
                            type="warning"
                            title="Risiken ohne AKU"
                            content={
                              <ul className="space-y-2 text-sm md:text-base">
                                <li>• Versteckte Krankheiten/Verletzungen</li>
                                <li>• Hohe Folgekosten</li>
                                <li>• Rechtliche Unsicherheit</li>
                                <li>• Versicherungsprobleme</li>
                                <li>• Emotionaler und finanzieller Schaden</li>
                              </ul>
                            }
                          />
                        </div>
                      }
                    />

                    <ContentSection
                      title="Was wird bei einer AKU untersucht?"
                      icon="🔍"
                      content={
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-brand-brown text-sm md:text-base">Klinische Untersuchung:</h4>
                            <ul className="space-y-2 text-sm md:text-base">
                              <li>• Allgemeinzustand</li>
                              <li>• Herz und Kreislauf</li>
                              <li>• Atmungsorgane</li>
                              <li>• Augen und Ohren</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-brand-brown text-sm md:text-base">Orthopädische Untersuchung:</h4>
                            <ul className="space-y-2 text-sm md:text-base">
                              <li>• Bewegungsanalyse</li>
                              <li>• Flexionsproben</li>
                              <li>• Röntgenaufnahmen</li>
                              <li>• Ultraschalluntersuchung</li>
                            </ul>
                          </div>
                        </div>
                      }
                    />
                  </div>
                )}

              {/* AKU-Klassen */}
              {activeSection === 'classes' && (
                <div className="space-y-8">
                  <ContentSection
                    title="AKU-Klassen: Welche AKU ist die richtige?"
                    icon="📊"
                    content={
                      <>
                        <p className="text-lg mb-8">
                          Die AKU wird in verschiedene Klassen unterteilt, je nach Umfang der Untersuchung.
                          Die Wahl der richtigen Klasse hängt vom Kaufpreis und Verwendungszweck ab.
                        </p>

                        <div className="space-y-6">
                          {akuClasses.map((akuClass) => (
                            <InfoBox
                              key={akuClass.class}
                              type="cost"
                              title={`AKU Klasse ${akuClass.class}: ${akuClass.title}`}
                              content={
                                <div className="space-y-4">
                                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                    <div>
                                      <p className="text-brand-default mb-2">{akuClass.suitable}</p>
                                    </div>
                                    <div className="text-right mt-2 md:mt-0">
                                      <div className="text-2xl font-bold text-brand-brown">{akuClass.cost}</div>
                                      <div className="text-sm text-brand-default/70">{akuClass.duration}</div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold text-brand-brown mb-3">Untersuchungsumfang:</h4>
                                    <div className="grid md:grid-cols-2 gap-2">
                                      {akuClass.includes.map((item, idx) => (
                                        <div key={idx} className="flex items-start">
                                          <span className="text-brand-green mr-2 mt-1">✓</span>
                                          <span className="text-brand-default">{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              }
                            />
                          ))}
                        </div>
                      </>
                    }
                  />

                  <ContentSection
                    title="Entscheidungshilfe: Welche AKU-Klasse wählen?"
                    icon="🎯"
                    content={
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <InfoBox
                          type="tip"
                          title="Klasse I wählen bei:"
                          content={
                            <ul className="space-y-1 text-sm md:text-base">
                              <li>• Kaufpreis unter 5.000€</li>
                              <li>• Freizeitpferd</li>
                              <li>• Älteres Pferd (&gt;15 Jahre)</li>
                              <li>• Begrenztem Budget</li>
                            </ul>
                          }
                        />
                        <InfoBox
                          type="expert"
                          title="Klasse II wählen bei:"
                          content={
                            <ul className="space-y-1 text-sm md:text-base">
                              <li>• Kaufpreis 5.000-25.000€</li>
                              <li>• Sportpferd</li>
                              <li>• Pferd 5-15 Jahre</li>
                              <li>• Regelmäßigem Sport</li>
                            </ul>
                          }
                        />
                        <InfoBox
                          type="warning"
                          title="Klasse III-V wählen bei:"
                          content={
                            <ul className="space-y-1 text-sm md:text-base">
                              <li>• Kaufpreis über 25.000€</li>
                              <li>• Hochleistungssport</li>
                              <li>• Zuchtpferd</li>
                              <li>• Speziellen Anforderungen</li>
                            </ul>
                          }
                        />
                      </div>
                    }
                  />
                </div>
              )}

              {/* Kosten */}
              {activeSection === 'costs' && (
                <div id="costs" className="space-y-8">
                  <ContentSection
                    title="AKU Kosten: Was kostet eine Ankaufsuntersuchung?"
                    icon="💰"
                    content={
                      <>
                        <p className="text-lg mb-8">
                          Die Kosten für eine Ankaufsuntersuchung variieren je nach AKU-Klasse und Umfang der Untersuchung.
                          Hier finden Sie eine detaillierte Übersicht aller anfallenden Kosten.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                          {akuClasses.map((akuClass) => (
                            <InfoBox
                              key={akuClass.class}
                              type="cost"
                              title={`AKU Klasse ${akuClass.class}: ${akuClass.title}`}
                              content={
                                <div className="text-center">
                                  <div className="text-2xl md:text-3xl font-bold text-brand-green mb-2">{akuClass.cost}</div>
                                  <div className="text-xs md:text-sm text-brand-default/70">Dauer: {akuClass.duration}</div>
                                </div>
                              }
                            />
                          ))}
                        </div>
                      </>
                    }
                  />

                  <ContentSection
                    title="Kostenfaktoren bei der AKU"
                    icon="📊"
                    content={
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <InfoBox
                          type="tip"
                          title="Preisbestimmende Faktoren"
                          content={
                            <ul className="space-y-2 text-brand-default text-sm md:text-base">
                              <li>• Umfang der Untersuchung (AKU-Klasse)</li>
                              <li>• Anzahl der Röntgenaufnahmen</li>
                              <li>• Zusatzuntersuchungen (Ultraschall, Endoskopie)</li>
                              <li>• Region und Tierarztpraxis</li>
                              <li>• Wochenende/Feiertage (+50-100%)</li>
                            </ul>
                          }
                        />
                        <InfoBox
                          type="warning"
                          title="Mögliche Zusatzkosten"
                          content={
                            <ul className="space-y-2 text-brand-default text-sm md:text-base">
                              <li>• Anfahrt Tierarzt: 50-150€</li>
                              <li>• Sedierung bei unruhigen Pferden: 50-100€</li>
                              <li>• Zweitbefundung: 200-500€</li>
                              <li>• Laboruntersuchungen: 100-300€</li>
                              <li>• Spezialisierte Aufnahmen: 100-500€</li>
                            </ul>
                          }
                        />
                      </div>
                    }
                  />

                  <ContentSection
                    id="tips"
                    title="Spartipps für die AKU"
                    icon="💡"
                    content={
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <InfoBox
                          type="tip"
                          title="Kosten sparen"
                          content={
                            <ul className="space-y-2 text-brand-default text-sm md:text-base">
                              <li>• Mehrere Angebote einholen</li>
                              <li>• Werktags statt am Wochenende</li>
                              <li>• AKU beim Verkäufer vor Ort</li>
                              <li>• Gruppentermine bei mehreren Pferden</li>
                            </ul>
                          }
                        />
                        <InfoBox
                          type="expert"
                          title="Nicht sparen bei"
                          content={
                            <ul className="space-y-2 text-brand-default text-sm md:text-base">
                              <li>• Qualifikation des Tierarztes</li>
                              <li>• Umfang der Untersuchung</li>
                              <li>• Röntgenqualität</li>
                              <li>• Zweitmeinung bei Unsicherheit</li>
                            </ul>
                          }
                        />
                      </div>
                    }
                  />
                </div>
              )}

              {/* Ablauf & Dauer */}
              {activeSection === 'process' && (
                <div id="process" className="space-y-8">
                  <ContentSection
                    title="Der AKU-Ablauf im Detail"
                    icon="⏱️"
                    content={
                      <>
                        <p className="text-lg mb-8">
                          Eine Ankaufsuntersuchung läuft in strukturierten Phasen ab. Hier erfahren Sie, was Sie erwartet
                          und wie Sie sich optimal vorbereiten können.
                        </p>

                        <InfoBox
                          type="tip"
                          title="Vorbereitung der AKU"
                          content={
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                              <div>
                                <h4 className="font-semibold text-brand-brown mb-3">Vor der Untersuchung:</h4>
                                <ul className="space-y-2 text-brand-default text-sm md:text-base">
                                  <li>• Tierarzt-Termin vereinbaren</li>
                                  <li>• AKU-Klasse festlegen</li>
                                  <li>• Gesundheitspass und Impfausweis bereithalten</li>
                                  <li>• Vorbesitzer über vergangene Krankheiten/Verletzungen informieren</li>
                                  <li>• Bei Bedarf: Sedierung organisieren</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-brand-brown mb-3">Was mitbringen:</h4>
                                <ul className="space-y-2 text-brand-default text-sm md:text-base">
                                  <li>• Führstrick und Halfter</li>
                                  <li>• Vorhandene Röntgenbilder</li>
                                  <li>• Medikamentenliste</li>
                                  <li>• Versicherungsunterlagen</li>
                                  <li>• Notizblock für Fragen</li>
                                </ul>
                              </div>
                            </div>
                          }
                        />
                      </>
                    }
                  />

                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-brand-brown">Schritt-für-Schritt Ablauf:</h3>

                    <div className="grid gap-4 md:gap-6">
                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-bold text-brand-default mb-2 text-sm md:text-base">Anamnese & Vorbesprechung (15-30 Min.)</h4>
                          <p className="text-brand-default/80 text-xs md:text-sm mb-2">
                            Der Tierarzt bespricht mit Ihnen die Krankengeschichte, bisherige Verletzungen und den beabsichtigten Verwendungszweck.
                          </p>
                          <ul className="text-xs md:text-sm text-brand-default/70 space-y-1">
                            <li>• Alter, Rasse, Abstammung des Pferdes</li>
                            <li>• Bisherige medizinische Behandlungen</li>
                            <li>• Sportliche Nutzung und Leistungsstand</li>
                            <li>• Bekannte Problembereiche</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-bold text-brand-default mb-2 text-sm md:text-base">Klinische Allgemeinuntersuchung (30-45 Min.)</h4>
                          <p className="text-brand-default/80 text-xs md:text-sm mb-2">
                            Gründliche Untersuchung aller Körpersysteme im Ruhezustand.
                          </p>
                          <ul className="text-xs md:text-sm text-brand-default/70 space-y-1">
                            <li>• Herz-Kreislauf-System (Abhören, Puls)</li>
                            <li>• Atemwege (Lunge, Nüstern)</li>
                            <li>• Augen (Sehvermögen, Reflexe)</li>
                            <li>• Ohren, Maul, Zähne</li>
                            <li>• Lymphknoten und Hautuntersuchung</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-bold text-brand-default mb-2 text-sm md:text-base">Bewegungsanalyse (20-30 Min.)</h4>
                          <p className="text-brand-default/80 text-xs md:text-sm mb-2">
                            Beurteilung des Gangbildes und der Bewegungsqualität in verschiedenen Gangarten.
                          </p>
                          <ul className="text-xs md:text-sm text-brand-default/70 space-y-1">
                            <li>• Schritt und Trab an der Hand</li>
                            <li>• Bewegung auf gerader Strecke</li>
                            <li>• Wendungen und Kreise</li>
                            <li>• Beurteilung von Takt und Gleichmäßigkeit</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-bold text-brand-default mb-2 text-sm md:text-base">Flexionsproben (15-20 Min.)</h4>
                          <p className="text-brand-default/80 text-xs md:text-sm mb-2">
                            Gezielte Belastungstests der Gelenke zur Aufdeckung von Lahmheiten.
                          </p>
                          <ul className="text-xs md:text-sm text-brand-default/70 space-y-1">
                            <li>• Beugeprobe der Vorderbeine</li>
                            <li>• Beugeprobe der Hinterbeine</li>
                            <li>• Spat-Test bei Bedarf</li>
                            <li>• Auswertung der Reaktionen</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                        <div>
                          <h4 className="font-bold text-brand-default mb-2 text-sm md:text-base">Röntgenuntersuchung (30-90 Min.)</h4>
                          <p className="text-brand-default/80 text-xs md:text-sm mb-2">
                            Bildgebende Diagnostik je nach gewählter AKU-Klasse.
                          </p>
                          <ul className="text-xs text-brand-default/70 space-y-1">
                            <li>• Klasse I: 2-4 Standardaufnahmen</li>
                            <li>• Klasse II: 8-10 erweiterte Aufnahmen</li>
                            <li>• Klasse III-V: Vollständiger Röntgen-TÜV</li>
                            <li>• Sofortige Auswertung vor Ort</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <div className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                        <div>
                          <h4 className="font-bold text-brand-default mb-2 text-sm md:text-base">Zusatzuntersuchungen (bei Bedarf)</h4>
                          <p className="text-brand-default/80 text-xs md:text-sm mb-2">
                            Je nach AKU-Klasse und Befunden weitere diagnostische Maßnahmen.
                          </p>
                          <ul className="text-xs md:text-sm text-brand-default/70 space-y-1">
                            <li>• Ultraschalluntersuchung (Sehnen, Bänder)</li>
                            <li>• Endoskopie der Atemwege</li>
                            <li>• Blutuntersuchung</li>
                            <li>• Spezielle Röntgenaufnahmen</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-brand-gold/10 rounded-lg border border-brand-gold">
                        <div className="bg-brand-gold text-brand-brown rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">7</div>
                        <div>
                          <h4 className="font-bold text-brand-default mb-2 text-sm md:text-base">Befundbesprechung & Protokoll (15-30 Min.)</h4>
                          <p className="text-brand-default/80 text-xs md:text-sm mb-2">
                            Ausführliche Erläuterung aller Befunde und Übergabe des schriftlichen Protokolls.
                          </p>
                          <ul className="text-xs md:text-sm text-brand-default/70 space-y-1">
                            <li>• Detaillierte Befunderklärung</li>
                            <li>• Kaufempfehlung ja/nein</li>
                            <li>• Prognose und Risikobewertung</li>
                            <li>• Schriftliches AKU-Protokoll</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 md:p-6 rounded-lg border border-brand-brown/20 shadow-sm mt-8">
                    <h3 className="font-bold text-brand-brown mb-4 text-base md:text-lg">⏰ Zeitaufwand nach AKU-Klasse</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="bg-white p-3 md:p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Klasse I (Kleine AKU)</h4>
                        <div className="text-xl md:text-2xl font-bold text-brand-brown mb-1">1-2 Stunden</div>
                        <div className="text-xs md:text-sm text-brand-default/70">Basis-Untersuchung mit wenigen Röntgenaufnahmen</div>
                      </div>
                      <div className="bg-white p-3 md:p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Klasse II (Große AKU)</h4>
                        <div className="text-xl md:text-2xl font-bold text-brand-brown mb-1">2-4 Stunden</div>
                        <div className="text-xs md:text-sm text-brand-default/70">Erweiterte Untersuchung mit mehr Röntgenbildern</div>
                      </div>
                      <div className="bg-white p-3 md:p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Klasse III-V</h4>
                        <div className="text-xl md:text-2xl font-bold text-brand-brown mb-1">4+ Stunden</div>
                        <div className="text-xs md:text-sm text-brand-default/70">Komplette Untersuchung, oft über mehrere Termine</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Befunde verstehen */}
              {activeSection === 'findings' && (
                <section id="findings" className="bg-white rounded-lg shadow-lg p-4 md:p-8 border border-brand-brown/20">
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-brown mb-4 md:mb-6">AKU Befunde verstehen: Was bedeuten die Ergebnisse?</h2>

                  <div className="bg-white p-4 md:p-6 rounded-lg border border-brand-brown/20 shadow-sm mb-6 md:mb-8">
                    <h3 className="font-bold text-brand-brown mb-4 text-base md:text-lg">📊 AKU-Bewertungssystem</h3>
                    <p className="text-brand-default/70 mb-4 text-sm md:text-base">
                      AKU-Befunde werden in der Regel in verschiedene Kategorien eingeteilt, die das Risiko für zukünftige Probleme bewerten.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <h4 className="font-semibold text-brand-brown mb-3 text-sm md:text-base">Befundkategorien:</h4>
                        <ul className="space-y-2 text-brand-default text-xs md:text-sm">
                          <li><strong>Kategorie I:</strong> Ohne besonderen Befund</li>
                          <li><strong>Kategorie II:</strong> Geringfügige Befunde</li>
                          <li><strong>Kategorie III:</strong> Mäßige Befunde mit Risiko</li>
                          <li><strong>Kategorie IV:</strong> Deutliche Befunde</li>
                          <li><strong>Kategorie V:</strong> Hochgradige Befunde</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-default mb-3 text-sm md:text-base">Risikobewertung:</h4>
                        <ul className="space-y-2 text-brand-default/80 text-xs md:text-sm">
                          <li><strong>Niedrig:</strong> Normale Abnutzung</li>
                          <li><strong>Gering:</strong> Überwachung empfohlen</li>
                          <li><strong>Mäßig:</strong> Regelmäßige Kontrollen nötig</li>
                          <li><strong>Hoch:</strong> Eingeschränkte Nutzung</li>
                          <li><strong>Sehr hoch:</strong> Kaufempfehlung negativ</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-brown">Häufige Befunde und ihre Bedeutung:</h3>

                    <div className="grid gap-4 md:gap-6">
                      <div className="p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <h4 className="font-bold text-brand-brown mb-3 flex items-center text-sm md:text-base">
                          <span className="mr-2">✅</span> Kategorie I: Ohne besonderen Befund
                        </h4>
                        <p className="text-brand-default/80 mb-3 text-sm md:text-base">
                          Das Pferd zeigt keine auffälligen Befunde und gilt als gesund für den geplanten Verwendungszweck.
                        </p>
                        <div className="text-xs md:text-sm text-brand-default/70">
                          <strong>Empfehlung:</strong> Kauf uneingeschränkt empfohlen. Normales Nutzungsrisiko.
                        </div>
                      </div>

                      <div className="p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <h4 className="font-bold text-brand-brown mb-3 flex items-center text-sm md:text-base">
                          <span className="mr-2">⚠️</span> Kategorie II: Geringfügige Befunde
                        </h4>
                        <p className="text-brand-default/80 mb-3 text-sm md:text-base">
                          Leichte Veränderungen, die bei älteren Pferden oder bei intensiver Nutzung normal sind.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                          <div>
                            <strong className="text-brand-brown">Beispiele:</strong>
                            <ul className="text-brand-default/80 mt-1 space-y-1">
                              <li>• Leichte Gelenkveränderungen</li>
                              <li>• Kleine Überbeine</li>
                              <li>• Geringfügige Zahnprobleme</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-brand-brown">Empfehlung:</strong>
                            <div className="text-brand-default/80 mt-1">
                              Kauf in der Regel empfohlen. Regelmäßige Kontrollen sinnvoll.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <h4 className="font-bold text-brand-brown mb-3 flex items-center text-sm md:text-base">
                          <span className="mr-2">🟡</span> Kategorie III: Mäßige Befunde
                        </h4>
                        <p className="text-brand-default/80 mb-3 text-sm md:text-base">
                          Veränderungen, die eine Einschränkung der Nutzung zur Folge haben könnten.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                          <div>
                            <strong className="text-brand-brown">Beispiele:</strong>
                            <ul className="text-brand-default/80 mt-1 space-y-1">
                              <li>• Mäßige Spat-Veränderungen</li>
                              <li>• Sehnenverdickungen</li>
                              <li>• Leichte Atemwegsauffälligkeiten</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-brand-brown">Empfehlung:</strong>
                            <div className="text-brand-default/80 mt-1">
                              Kauf nach Abwägung möglich. Verwendungszweck überdenken.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 md:p-6 bg-white rounded-lg border border-brand-brown/20 shadow-sm">
                        <h4 className="font-bold text-brand-brown mb-3 flex items-center text-sm md:text-base">
                          <span className="mr-2">🔴</span> Kategorie IV-V: Deutliche bis hochgradige Befunde
                        </h4>
                        <p className="text-brand-default/80 mb-3 text-xs md:text-sm">
                          Ausgeprägte Veränderungen, die eine erhebliche Einschränkung oder ein hohes Risiko darstellen.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                          <div>
                            <strong className="text-brand-brown">Beispiele:</strong>
                            <ul className="text-brand-default/80 mt-1 space-y-1">
                              <li>• Hochgradige Arthrosen</li>
                              <li>• Chronische Lahmheiten</li>
                              <li>• Schwere Atemwegserkrankungen</li>
                              <li>• Bedeutende Herzbefunde</li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-brand-brown">Empfehlung:</strong>
                            <div className="text-brand-default/80 mt-1">
                              Kauf meist nicht empfohlen. Nur bei speziellen Verwendungszwecken.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-brand-brown/20 shadow-sm mt-8">
                    <h3 className="font-bold text-brand-brown mb-4">🔍 Das AKU-Protokoll richtig lesen</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-brand-brown mb-3">Wichtige Protokoll-Teile:</h4>
                        <ul className="space-y-2 text-brand-default/70 text-sm">
                          <li>• <strong>Zusammenfassung:</strong> Gesamtbewertung des Tierarztes</li>
                          <li>• <strong>Einzelbefunde:</strong> Detaillierte Untersuchungsergebnisse</li>
                          <li>• <strong>Röntgenbewertung:</strong> Bildgebende Diagnostik</li>
                          <li>• <strong>Prognose:</strong> Einschätzung der weiteren Entwicklung</li>
                          <li>• <strong>Empfehlung:</strong> Kaufempfehlung ja/nein/bedingt</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-brown mb-3">Wichtige Fragen an den Tierarzt:</h4>
                        <ul className="space-y-2 text-brand-default/70 text-sm">
                          <li>• Wie entwickeln sich die gefundenen Veränderungen?</li>
                          <li>• Welche Nutzungseinschränkungen bestehen?</li>
                          <li>• Sind regelmäßige Behandlungen nötig?</li>
                          <li>• Wie hoch sind mögliche Folgekosten?</li>
                          <li>• Sollte eine Zweitmeinung eingeholt werden?</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-brand-brown/20 shadow-sm mt-8">
                    <h3 className="font-bold text-brand-brown mb-4">💡 Tipps für die Befundinterpretation</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2">Zweitmeinung</h4>
                        <p className="text-xs text-brand-default/80">
                          Bei unklaren oder schwerwiegenden Befunden sollten Sie eine zweite tierärztliche Meinung einholen.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2">Verwendungszweck</h4>
                        <p className="text-xs text-brand-default/80">
                          Bewerten Sie Befunde immer im Kontext des geplanten Verwendungszwecks des Pferdes.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2">Nachverhandlung</h4>
                        <p className="text-xs text-brand-default/80">
                          AKU-Befunde können als Grundlage für Preisverhandlungen genutzt werden.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Call-to-Action Section */}
                  <div className="bg-white rounded-lg p-8 border border-brand-brown/20 shadow-sm mt-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-brand-brown mb-4">🎯 Pferdewert nach AKU ermitteln</h3>
                      <p className="text-brand-default/80 mb-6 max-w-2xl mx-auto">
                        Sie haben bereits eine AKU durchführen lassen? Nutzen Sie unsere KI-gestützte Bewertung,
                        um den fairen Marktwert Ihres Pferdes basierend auf den AKU-Ergebnissen zu ermitteln.
                      </p>
                      <div className="flex justify-center">
                        <CTAButton
                          type="primary"
                          text="Jetzt Pferdewert berechnen"
                          href="/pferde-preis-berechnen"
                          trackingEvent="aku_pferd_cta_main_valuation"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen zur AKU beim Pferd"
            />
          </div>

          {/* Related Articles Section - V0 Grid Layout */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Sektion Header - Minimaler Text, klare Struktur */}
              <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-foreground mb-4">📚 Weiterführende Artikel</h2>
                <p className="text-lg text-brand-default max-w-2xl mx-auto">
                  Vertiefen Sie Ihr Wissen über Ankaufsuntersuchungen beim Pferd
                </p>
              </div>

              {/* Artikel Grid - Optimale Bild-Text-Verteilung */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group hover:shadow-lg transition-all duration-300 border border-border bg-card rounded-lg">
                  <div className="p-0">
                    {/* Bild Platzierung: Oben, 4:3 Format für Konsistenz */}
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src="/images/aku-kosten-calculator.jpg"
                        alt="AKU Pferd Kosten 2025"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Kategorie Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium bg-muted text-brand-default px-2 py-1 rounded">
                        Kosten & Preise
                      </span>
                      <span className="text-xs text-brand-default">8 Min.</span>
                    </div>

                    {/* Titel - Fokus auf Lesbarkeit */}
                    <h3 className="text-xl font-serif mb-3 text-balance group-hover:text-primary transition-colors">
                      AKU Pferd Kosten 2025
                    </h3>

                    {/* Beschreibung - Optimale Textlänge für Scanbarkeit */}
                    <p className="text-brand-default text-sm leading-relaxed mb-4 text-pretty">
                      Aktuelle Preise und detaillierte Kostenübersicht für alle AKU-Klassen beim Pferdekauf
                    </p>

                    {/* CTA Button */}
                    <Link href="/aku-pferd-kosten">
                      <button className="w-full group-hover:bg-[#92400e] group-hover:text-white transition-colors bg-transparent border border-[#92400e] hover:bg-[#92400e] hover:text-white text-[#92400e] h-9 px-3 rounded-md text-sm font-medium">
                        Artikel lesen
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="group hover:shadow-lg transition-all duration-300 border border-border bg-card rounded-lg">
                  <div className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src="/images/aku-ablauf-timeline.jpg"
                        alt="AKU Pferd Ablauf"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium bg-muted text-brand-default px-2 py-1 rounded">
                        Ablauf & Dauer
                      </span>
                      <span className="text-xs text-brand-default">12 Min.</span>
                    </div>
                    <h3 className="text-xl font-serif mb-3 text-balance group-hover:text-primary transition-colors">
                      AKU Pferd Ablauf
                    </h3>
                    <p className="text-brand-default text-sm leading-relaxed mb-4 text-pretty">
                      Schritt-für-Schritt Guide durch die gesamte Ankaufsuntersuchung vom Termin bis zum Protokoll
                    </p>
                    <Link href="/aku-pferd-ablauf">
                      <button className="w-full group-hover:bg-[#92400e] group-hover:text-white transition-colors bg-transparent border border-[#92400e] hover:bg-[#92400e] hover:text-white text-[#92400e] h-9 px-3 rounded-md text-sm font-medium">
                        Artikel lesen
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="group hover:shadow-lg transition-all duration-300 border border-border bg-card rounded-lg">
                  <div className="p-0">
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                      <img
                        src="/images/aku-klassen-comparison.jpg"
                        alt="AKU Pferd Klassen"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium bg-muted text-brand-default px-2 py-1 rounded">
                        Klassen & Umfang
                      </span>
                      <span className="text-xs text-brand-default">10 Min.</span>
                    </div>
                    <h3 className="text-xl font-serif mb-3 text-balance group-hover:text-primary transition-colors">
                      AKU Pferd Klassen
                    </h3>
                    <p className="text-brand-default text-sm leading-relaxed mb-4 text-pretty">
                      Detaillierte Unterschiede zwischen Klasse I und II Untersuchungen mit Entscheidungshilfe
                    </p>
                    <Link href="/aku-pferd-klassen">
                      <button className="w-full group-hover:bg-[#92400e] group-hover:text-white transition-colors bg-transparent border border-[#92400e] hover:bg-[#92400e] hover:text-white text-[#92400e] h-9 px-3 rounded-md text-sm font-medium">
                        Artikel lesen
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA - v0 Design Pattern */}
          <section className="py-20 bg-muted/30">
            <div className="max-w-4xl mx-auto px-6 text-center">
              {/* Feature-Bild für emotionale Verbindung */}
              <div className="mb-12">
                <img
                  src="/happy-horse-owner-with-horse--professional-consult.jpg"
                  alt="Professionelle Pferdeberatung mit AKU-Expertise"
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                />
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6 text-balance">
                Bereit für eine professionelle Pferdebewertung?
              </h2>

              <p className="text-lg text-brand-default mb-8 max-w-2xl mx-auto text-pretty">
                Nutzen Sie unsere KI-gestützte Bewertung für eine objektive Einschätzung.
                Berücksichtigt AKU-Befunde und aktuelle Marktdaten für präzise Ergebnisse.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pferde-preis-berechnen">
                  <button className="px-8 py-3 bg-[#92400e] hover:bg-[#78350f] text-white rounded-lg transition-colors font-medium text-lg">
                    Pferdewert berechnen
                  </button>
                </Link>
                <Link href="/was-ist-mein-pferd-wert">
                  <button className="px-8 py-3 border border-[#92400e] hover:bg-[#92400e] hover:text-white text-[#92400e] rounded-lg transition-colors font-medium text-lg">
                    Pferd bewerten lassen
                  </button>
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
