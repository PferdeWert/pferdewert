import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import InfoBox from '../components/InfoBox'
import ContentSection from '../components/ContentSection'
import CTAButton from '../components/CTAButton'
import FAQ from '../components/FAQ'
import Link from 'next/link'
import { Clock, Calendar, Award, ArrowRight, ChevronDown } from 'lucide-react'
import { FAQItem } from '../types/faq.types'

const AKUPferd: NextPage = () => {
  const sections = [
    { id: 'basics', title: 'AKU Grundlagen' },
    { id: 'classes', title: 'AKU-Klassen' },
    { id: 'costs', title: 'AKU Kosten' },
    { id: 'process', title: 'Ablauf & Dauer' },
    { id: 'findings', title: 'Befunde verstehen' },
    { id: 'tierarzt', title: 'AKU-Tierarzt finden' },
    { id: 'valuation', title: 'Marktwert & Daten' }
  ]

  const getSectionNumber = (sectionId: string) => {
    const index = sections.findIndex(section => section.id === sectionId)
    return index === -1 ? undefined : index + 1
  }

  const numberedTitle = (sectionId: string, title: string) => {
    const number = getSectionNumber(sectionId)
    return number ? `${number}. ${title}` : title
  }

  const relatedArticles = [
    {
      href: '/aku-pferd-kosten',
      image: '/images/aku-kosten-calculator.jpg',
      title: 'AKU Pferd Kosten 2025',
      badge: 'Kosten & Preise',
      readTime: '8 Min.',
      description: 'Aktuelle Preise und detaillierte Kostenübersicht für alle AKU-Klassen beim Pferdekauf.'
    },
    {
      href: '/aku-pferd-ablauf',
      image: '/images/aku-ablauf-timeline.jpg',
      title: 'AKU Pferd Ablauf',
      badge: 'Ablauf & Dauer',
      readTime: '12 Min.',
      description: 'Schritt-für-Schritt durch die gesamte Ankaufsuntersuchung vom Termin bis zum Protokoll.'
    },
    {
      href: '/aku-pferd-klassen',
      image: '/images/aku-klassen-comparison.jpg',
      title: 'AKU Pferd Klassen',
      badge: 'Klassen & Umfang',
      readTime: '10 Min.',
      description: 'Entscheidungshilfe zu Umfang und Nutzen der AKU-Klassen I bis V.'
    }
  ]

  const scrollToSection = (sectionId: string) => {
    requestAnimationFrame(() => {
      if (typeof window === 'undefined') return
      const target = document.getElementById(sectionId)
      if (!target) return

      const header = document.querySelector('header')
      const toc = document.getElementById('inhaltsverzeichnis')
      const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0
      const tocHeight = toc instanceof HTMLElement ? toc.offsetHeight : 0
      const offset = headerHeight + tocHeight + 24

      const targetPosition = target.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: targetPosition - offset, behavior: 'smooth' })
    })
  }

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

      <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section - Clean Text Only Design */}
        <section className="py-12 md:py-16">
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
                  <span suppressHydrationWarning>
                    {new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
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
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8B4513] hover:bg-[#6B3410] text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  Pferdewert jetzt berechnen
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => document.getElementById('inhaltsverzeichnis')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#8B4513] hover:bg-[#8B4513] hover:text-white text-[#8B4513] font-medium rounded-xl transition-all"
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

        {/* Table of Contents - static text block */}
        <nav id="inhaltsverzeichnis" aria-label="Inhaltsverzeichnis" className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-xl md:text-2xl font-semibold text-gray-900 mb-4">Inhaltsverzeichnis</h2>
              <ol className="space-y-2 text-gray-700 text-base md:text-lg list-none pl-0">
                {sections.map((section, index) => (
                  <li key={section.id} className="leading-relaxed">
                    <a
                      href={`#${section.id}`}
                      onClick={event => {
                        event.preventDefault()
                        scrollToSection(section.id)
                      }}
                      className="flex items-center gap-3 hover:text-[#8B4513] transition-colors"
                    >
                      <span className="font-semibold">{index + 1}.</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Article Content */}
          <article className="max-w-5xl mx-auto space-y-16">
                {/* AKU Grundlagen */}
                <div id="basics" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                    {numberedTitle('basics', 'AKU Grundlagen')}
                  </h2>

                  <ContentSection
                    title="Was ist eine AKU beim Pferd?"
                    icon="📋"
                    content={
                      <>
                        <p className="text-lg mb-6">
                          Die <strong>Ankaufsuntersuchung (AKU)</strong> ist eine tierärztliche Untersuchung vor dem Pferdekauf.
                          Sie dient dazu, den Gesundheitszustand des Pferdes objektiv zu bewerten und potenzielle Risiken aufzudecken.
                        </p>
                        <p className="text-lg text-gray-700">
                          Im Standardumfang bewertet die AKU Herz, Lunge, Bewegungsapparat und Sinnesorgane. Je nach Klasse werden
                          zusätzliche Röntgenaufnahmen, Blutbilder oder Ultraschalluntersuchungen ergänzt. Die Untersuchung dauert
                          im Schnitt zwei bis vier Stunden und ist in der Regel zwei bis vier Wochen aussagekräftig.
                        </p>
                        <p className="text-lg text-gray-700">
                          Die Kosten starten bei etwa <strong>150&nbsp;€</strong> für die kleine AKU und reichen bei erweiterten Diagnostikpaketen
                          bis in den vierstelligen Bereich. Für eine realistische Budgetplanung sollten Sie zwei bis fünf Prozent des
                          geplanten Kaufpreises einrechnen.
                        </p>
                      </>
                    }
                  />

                  <ContentSection
                    title="Warum ist eine AKU wichtig?"
                    icon="⚖️"
                    content={
                      <>
                        <p className="text-lg text-gray-700">
                          Eine dokumentierte AKU schafft Transparenz. Sie kennen den Gesundheitsstatus zum Kaufzeitpunkt, erhalten
                          eine fundierte Grundlage für Preisgespräche und minimieren spätere Streitigkeiten. Versicherer fordern bei
                          vielen Policen sogar eine aktuelle Untersuchung, bevor sie das Pferd aufnehmen.
                        </p>
                        <p className="text-lg text-gray-700">
                          Ohne AKU bleiben gesundheitliche Risiken beim Käufer. Unerkannte Lahmheiten, Zahn- oder Atemprobleme
                          führen schnell zu hohen Folgekosten. Auch rechtlich sind Sie schlechter abgesichert, da sich schwer
                          nachweisen lässt, ob ein Mangel bereits vor dem Kauf bestand.
                        </p>
                      </>
                    }
                  />

                  <ContentSection
                    title="Was wird bei einer AKU untersucht?"
                    icon="🔍"
                    content={
                      <>
                        <p className="text-lg text-gray-700">
                          Der Tierarzt prüft das Pferd zunächst im Stand: Herz und Lunge, Schleimhäute, Lymphknoten, Augen und Zähne.
                          Anschließend folgt die orthopädische Untersuchung mit Bewegungsanalyse auf hartem und weichem Boden sowie
                          Flexionsproben. Je nach Umfang schließen sich bildgebende Verfahren wie Röntgen oder Ultraschall und bei
                          Bedarf Laboruntersuchungen an.
                        </p>
                        <p className="text-lg text-gray-700">
                          Wichtig ist eine gute Vorbereitung: saubere, trockene Hufe, ein geeigneter Platz zum Vorführen und alle
                          Unterlagen zu bisherigen Erkrankungen. Je vollständiger die Informationen, desto verlässlicher fällt das
                          Gutachten aus.
                        </p>
                      </>
                    }
                  />
                </div>

              {/* AKU-Klassen */}
              <div id="classes" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  {numberedTitle('classes', 'AKU-Klassen')}
                </h2>

                <div className="py-6 md:py-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-2xl text-[#8c5a1f]">📊</div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-gray-900">
                      Welche AKU ist die richtige?
                    </h3>
                  </div>
                  <div className="space-y-4 md:space-y-5 text-base md:text-lg leading-7 md:leading-relaxed text-gray-700">
                    <p className="text-lg mb-6 text-gray-700">
                      Der Umfang der Ankaufsuntersuchung richtet sich nach Kaufpreis und Einsatzgebiet. Für Freizeitpferde reicht
                      meist die klinische Basisuntersuchung, während Sport- und Zuchtpferde zusätzliche Röntgen- und Spezialaufnahmen
                      benötigen.
                    </p>
                    <div className="space-y-6">
                      {akuClasses.map((akuClass) => (
                        <div key={akuClass.class} className="border border-[#eadfcd] rounded-2xl p-5 md:p-6 space-y-2">
                          <h4 className="font-serif text-2xl text-gray-900">
                            AKU Klasse {akuClass.class}: {akuClass.title}
                          </h4>
                          <p className="text-gray-700 text-base md:text-lg">
                            Geeignet für: {akuClass.suitable}. Zeitaufwand: {akuClass.duration}. Kostenrahmen: {akuClass.cost}.
                          </p>
                          <p className="text-gray-700 text-base">
                            Typischer Umfang: {akuClass.includes.join(', ')}.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-6 md:py-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-2xl text-[#8c5a1f]">🎯</div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-gray-900">
                      Entscheidungshilfe: Welche AKU-Klasse wählen?
                    </h3>
                  </div>
                  <div className="space-y-4 md:space-y-5 text-base md:text-lg leading-7 md:leading-relaxed text-gray-700">
                    <div className="space-y-4 text-gray-700 text-base md:text-lg">
                      <p>
                        <strong>Klasse I</strong> (kleine AKU) eignet sich für Freizeitpferde bis etwa 5.000&nbsp;€. Sie liefert eine solide
                        Basisbewertung und ist ideal, wenn Erfahrung und Budget begrenzt sind.
                      </p>
                      <p>
                        <strong>Klasse II</strong> (große AKU) empfiehlt sich für Sport- und Ausbildungspferde zwischen 5.000 und 25.000&nbsp;€.
                        Erweiterte Röntgenbilder und Bewegungsanalysen zeigen, ob das Pferd den geplanten Einsatz langfristig erfüllen kann.
                      </p>
                      <p>
                        <strong>Klasse III-V</strong> mit Spezialuntersuchungen ist bei hochpreisigen Pferden, Zuchttieren oder ambitionierten
                        Turnierzielen sinnvoll. Je genauer das Profil, desto geringer das Risiko späterer Leistungseinbußen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kosten */}
              <div id="costs" className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  {numberedTitle('costs', 'AKU Kosten')}
                </h2>

                <div className="bg-[#f5f5f3] border border-[#e8e8e4] rounded-lg p-5 md:p-6 space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">💰</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Was kostet eine Ankaufsuntersuchung?
                      </h3>
                      <div className="space-y-4">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          Für eine kleine AKU sollten Sie rund <strong>150&nbsp;bis 300&nbsp;€</strong> einplanen. Die große AKU mit
                          Standardröntgen kostet im Durchschnitt <strong>400&nbsp;bis 800&nbsp;€</strong>. Umfangreiche Spezialpakete mit
                          zusätzlichen Aufnahmen, Ultraschall oder Laborwerten können <strong>800&nbsp;bis 1.500&nbsp;€</strong> erreichen.
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          Regionale Unterschiede, Anfahrtskosten und Wochenendzuschläge wirken sich zusätzlich auf den Endpreis aus.
                          Fragen Sie daher vorab nach einem transparenten Angebot und halten Sie fest, welche Leistungen enthalten sind.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f5f5f3] border border-[#e8e8e4] rounded-lg p-5 md:p-6 space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">📊</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Kostenfaktoren bei der AKU
                      </h3>
                      <div className="space-y-4">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          Der größte Kostenhebel ist der Untersuchungsumfang: Je mehr Aufnahmen, Ultraschalluntersuchungen oder
                          Laborchecks Sie beauftragen, desto höher der Preis. Auch die Erfahrung des Tierarztes und die technische
                          Ausstattung schlagen sich im Honorar nieder.
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          Zusatzkosten entstehen häufig durch längere Anfahrten, Sedierung bei unruhigen Pferden oder Zweitbefundungen.
                          Klären Sie solche Posten vorab und lassen Sie sich die einzelnen Positionen schriftlich bestätigen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f5f5f3] border border-[#e8e8e4] rounded-lg p-5 md:p-6 space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">💡</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Spartipps für die AKU
                      </h3>
                      <div className="space-y-4 text-gray-700">
                        <p className="text-base sm:text-lg leading-relaxed">
                          Holen Sie mehrere Angebote ein, legen Sie Termine auf Werktage und bündeln Sie gegebenenfalls mehrere AKUs an
                          einem Standort. So lassen sich Anfahrten und Wochenendzuschläge vermeiden.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed">
                          Verzichten Sie jedoch nicht auf erfahrene Tierärzte, hochwertige Röntgenbilder oder notwendige Zusatztests.
                          Eine lückenhafte Untersuchung spart kurzfristig Geld, kann aber langfristig zu hohen Folgekosten führen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ablauf & Dauer */}
              <div id="process" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  {numberedTitle('process', 'Ablauf & Dauer')}
                </h2>

                  <ContentSection
                    title="Der AKU-Ablauf im Detail"
                    icon="⏱️"
                    content={
                      <>
                        <p className="text-lg text-gray-700 mb-6">
                          Eine AKU verläuft in mehreren Etappen – Vorbereitung, klinische Prüfung, Bewegungsanalyse und optional
                          bildgebende Diagnostik. Wer den Ablauf kennt, kann den Termin effizient gestalten.
                        </p>
                        <p className="text-lg text-gray-700">
                          Legen Sie Impfpass, Vorbefunde und vorhandene Röntgenbilder bereit, informieren Sie den Tierarzt über
                          Einsatzzweck und Trainingsstand und sorgen Sie für einen ruhigen Vorführplatz. So sind alle wichtigen Fakten
                          zur Hand und der Tierarzt kann Verdachtsmomente gezielt prüfen.
                        </p>
                      </>
                    }
                  />

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-brown">Schritt-für-Schritt Ablauf</h3>
                    <ol className="space-y-4 text-gray-700 text-base md:text-lg list-decimal list-inside">
                      <li><strong>Anamnese &amp; Vorbesprechung:</strong> Besprechung von Historie, Trainingsstand und Einsatzzweck.</li>
                      <li><strong>Klinische Untersuchung:</strong> Check von Herz, Lunge, Augen, Maul und Haut im Stand.</li>
                      <li><strong>Bewegungsanalyse:</strong> Vorführen auf hartem und weichem Boden, Beurteilung von Takt und Losgelassenheit.</li>
                      <li><strong>Flexionsproben:</strong> Kurzzeitige Belastung einzelner Gelenke zur Lahmheitsdiagnostik.</li>
                      <li><strong>Bildgebung &amp; Labor:</strong> Röntgen, Ultraschall oder Blutuntersuchungen je nach AKU-Klasse.</li>
                      <li><strong>Befundbesprechung:</strong> Zusammenfassung, Kaufempfehlung und Übergabe des Protokolls.</li>
                    </ol>
                  </div>

                  <div className="bg-white p-4 md:p-6 rounded-lg border border-brand-brown/20 shadow-sm mt-8">
                    <h3 className="font-bold text-brand-brown mb-4 text-base md:text-lg">⏰ Zeitaufwand nach AKU-Klasse</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="bg-white p-3 md:p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Klasse I (Kleine AKU)</h4>
                        <div className="text-xl md:text-2xl font-bold text-brand-brown mb-1">1-2 Stunden</div>
                        <div className="text-xs md:text-sm text-gray-500">Basis-Untersuchung mit wenigen Röntgenaufnahmen</div>
                      </div>
                      <div className="bg-white p-3 md:p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Klasse II (Große AKU)</h4>
                        <div className="text-xl md:text-2xl font-bold text-brand-brown mb-1">2-4 Stunden</div>
                        <div className="text-xs md:text-sm text-gray-500">Erweiterte Untersuchung mit mehr Röntgenbildern</div>
                      </div>
                      <div className="bg-white p-3 md:p-4 rounded border border-brand-brown/20 shadow-sm">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Klasse III-V</h4>
                        <div className="text-xl md:text-2xl font-bold text-brand-brown mb-1">4+ Stunden</div>
                        <div className="text-xs md:text-sm text-gray-500">Komplette Untersuchung, oft über mehrere Termine</div>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Befunde verstehen */}
              <section
                id="findings"
                className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40"
              >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
                    {numberedTitle('findings', 'AKU-Befunde verstehen')}
                  </h2>

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-start space-x-3">
                      <span className="text-xl md:text-2xl flex-shrink-0 mt-1">📊</span>
                      <div>
                        <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">AKU-Bewertungssystem</h3>
                        <p className="text-gray-700 mb-4 text-base sm:text-lg leading-relaxed">
                          AKU-Befunde werden nach dem aktuellen Standard in zwei Hauptkategorien eingeteilt:
                          MB (Mit Befund/Mängelbefund) und OB (Ohne Befund). Diese vereinfachte Klassifizierung
                          bietet eine klare Bewertungsgrundlage für die Kaufentscheidung.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div>
                            <h4 className="font-semibold text-brand-brown mb-3 text-base md:text-lg">Befundkategorien:</h4>
                            <ul className="space-y-3 text-gray-700 text-sm md:text-base">
                              <li><strong>OB (Ohne Befund):</strong> Keine relevanten Befunde festgestellt</li>
                              <li><strong>MB (Mit Befund):</strong> Medizinische Befunde vorhanden - Details werden spezifiziert</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-brown mb-3 text-base md:text-lg">Bewertung:</h4>
                            <ul className="space-y-3 text-gray-700 text-sm md:text-base">
                              <li><strong>OB:</strong> Keine Preisauswirkung - Kaufempfehlung positiv</li>
                              <li><strong>MB:</strong> Preisauswirkung abhängig von Art und Schwere der Befunde</li>
                              <li><strong>Detailbeschreibung:</strong> Entscheidend für Werteinschätzung</li>
                              <li><strong>Verwendungszweck:</strong> Relevanz der Befunde bewerten</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-brown">Häufige Befunde und ihre Bedeutung:</h3>

                    <div className="grid gap-4 md:gap-6">
                      <div className="p-4 md:p-6 bg-white rounded-lg border border-green-200 shadow-sm">
                        <h4 className="font-bold text-green-700 mb-3 flex items-center text-sm md:text-base">
                          <span className="mr-2">✅</span> OB (Ohne Befund)
                        </h4>
                        <p className="text-gray-600 mb-3 text-sm md:text-base">
                          Das Pferd zeigt keine veterinärmedizinischen Auffälligkeiten und gilt als gesund für den geplanten Verwendungszweck.
                          Der AKU-Befund stellt keine Einschränkungen oder Risiken fest.
                        </p>
                        <div className="text-xs md:text-sm text-gray-500">
                          <strong>Empfehlung:</strong> Kauf uneingeschränkt empfohlen. Normales Nutzungsrisiko für die geplante Verwendung.
                        </div>
                      </div>

                      <div className="p-4 md:p-6 bg-white rounded-lg border border-orange-200 shadow-sm">
                        <h4 className="font-bold text-orange-700 mb-3 flex items-center text-sm md:text-base">
                          <span className="mr-2">⚠️</span> MB (Mit Befund / Mängelbefund)
                        </h4>
                        <p className="text-gray-600 mb-3 text-sm md:text-base">
                          Es wurden veterinärmedizinische Auffälligkeiten oder Veränderungen festgestellt, die das Nutzungsrisiko
                          beeinflussen können. Die Schwere und Bedeutung der Befunde wird im Protokoll detailliert beschrieben.
                        </p>

                        <div className="mt-4 space-y-4">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <h5 className="font-semibold text-orange-700 mb-2 text-xs md:text-sm">Häufige MB-Befunde:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                              <div>
                                <strong className="text-gray-700">Bewegungsapparat:</strong>
                                <ul className="text-gray-600 mt-1 space-y-1">
                                  <li>• Gelenkveränderungen (Spat, Arthrose)</li>
                                  <li>• Sehnenschäden oder -verdickungen</li>
                                  <li>• Überbeine</li>
                                  <li>• Stellungsanomalien</li>
                                </ul>
                              </div>
                              <div>
                                <strong className="text-gray-700">Weitere Bereiche:</strong>
                                <ul className="text-gray-600 mt-1 space-y-1">
                                  <li>• Atemwegsauffälligkeiten</li>
                                  <li>• Herzgeräusche</li>
                                  <li>• Augenveränderungen</li>
                                  <li>• Zahnprobleme</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 p-3 rounded-md">
                            <strong className="text-orange-700 text-xs md:text-sm">Empfehlung:</strong>
                            <div className="text-gray-600 mt-1 text-xs md:text-sm">
                              Die Kaufentscheidung sollte individuell unter Berücksichtigung der spezifischen Befunde,
                              des geplanten Verwendungszwecks und nach Rücksprache mit dem untersuchenden Tierarzt getroffen werden.
                              Eine Zweitmeinung kann bei unklaren Befunden sinnvoll sein.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-start space-x-3">
                      <span className="text-xl md:text-2xl flex-shrink-0 mt-1">🔍</span>
                      <div>
                        <h3 className="font-bold text-brand-brown mb-4 text-lg md:text-xl">Das AKU-Protokoll richtig lesen</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-brand-brown mb-3 text-base md:text-lg">Wichtige Protokoll-Teile:</h4>
                            <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                              <li>• <strong>Zusammenfassung:</strong> Gesamtbewertung des Tierarztes</li>
                              <li>• <strong>Einzelbefunde:</strong> Detaillierte Untersuchungsergebnisse</li>
                              <li>• <strong>Röntgenbewertung:</strong> Bildgebende Diagnostik</li>
                              <li>• <strong>Prognose:</strong> Einschätzung der weiteren Entwicklung</li>
                              <li>• <strong>Empfehlung:</strong> Kaufempfehlung ja/nein/bedingt</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-brown mb-3 text-base md:text-lg">Wichtige Fragen an den Tierarzt:</h4>
                            <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                              <li>• Wie entwickeln sich die gefundenen Veränderungen?</li>
                              <li>• Welche Nutzungseinschränkungen bestehen?</li>
                              <li>• Sind regelmäßige Behandlungen nötig?</li>
                              <li>• Wie hoch sind mögliche Folgekosten?</li>
                              <li>• Sollte eine Zweitmeinung eingeholt werden?</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f5f5f3] border border-[#e8e8e4] rounded-lg p-5 md:p-6 space-y-4 md:space-y-6">
                    <div className="flex items-start space-x-3">
                      <span className="text-xl md:text-2xl flex-shrink-0 mt-1">💡</span>
                      <div>
                        <h3 className="font-bold text-brand-brown mb-4 text-lg md:text-xl">Tipps für die Befundinterpretation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                          <div className="bg-white p-4 md:p-5 rounded-lg border border-[#e8e8e4] shadow-sm min-h-[120px]">
                            <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Zweitmeinung</h4>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                              Bei unklaren oder schwerwiegenden Befunden sollten Sie eine zweite tierärztliche Meinung einholen.
                            </p>
                          </div>
                          <div className="bg-white p-4 md:p-5 rounded-lg border border-[#e8e8e4] shadow-sm min-h-[120px]">
                            <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Verwendungszweck</h4>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                              Bewerten Sie Befunde immer im Kontext des geplanten Verwendungszwecks des Pferdes.
                            </p>
                          </div>
                          <div className="bg-white p-4 md:p-5 rounded-lg border border-[#e8e8e4] shadow-sm min-h-[120px]">
                            <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Nachverhandlung</h4>
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                              AKU-Befunde können als Grundlage für Preisverhandlungen genutzt werden.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call-to-Action Section */}
                  <div className="bg-[#f5f5f3] border border-[#e8e8e4] rounded-lg p-6 md:p-8 space-y-4 md:space-y-6">
                    <div className="text-center">
                      <div className="flex justify-center items-center space-x-2 mb-4">
                        <span className="text-2xl md:text-3xl">🎯</span>
                        <h3 className="text-xl md:text-2xl font-bold text-brand-brown">Pferdewert nach AKU ermitteln</h3>
                      </div>
                      <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Sie haben bereits eine AKU durchführen lassen? Nutzen Sie unsere KI-gestützte Bewertung,
                        um den fairen Marktwert Ihres Pferdes basierend auf den AKU-Ergebnissen zu ermitteln.
                      </p>
                      <div className="flex justify-center">
                        <CTAButton
                          text="Jetzt Pferdewert berechnen"
                          href="/pferde-preis-berechnen"
                          trackingEvent="aku_pferd_cta_main_valuation"
                          type="primary"
                        />
                      </div>
                    </div>
                  </div>
              </section>

              {/* AKU-Tierarzt finden */}
              <section
                id="tierarzt"
                className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  {numberedTitle('tierarzt', 'AKU-Tierarzt finden')}
                </h2>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">👨‍⚕️</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Qualitätskriterien für AKU-Spezialisten
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                        Die Aussagekraft einer Ankaufsuntersuchung steht und fällt mit dem untersuchenden Tierarzt. Suchen Sie
                        gezielt nach Spezialisten, die regelmäßig AKUs durchführen und über moderne Diagnostik verfügen.
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                        <li><strong>Spezialisierung:</strong> Zusatzqualifikation in Kaufuntersuchungen und mindestens 100 AKUs pro Jahr.</li>
                        <li><strong>Technik:</strong> Digitale Röntgen- und Ultraschallgeräte für hochauflösende Befunde.</li>
                        <li><strong>Dokumentation:</strong> Standardisierte Protokolle mit klaren Befundbeschreibungen und Prognosen.</li>
                        <li><strong>Reputation:</strong> Empfehlungen von Reitvereinen, Zuchtverbänden und Pferdekäufern vor Ort.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">🗺️</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-brown mb-4 text-lg md:text-xl">
                        Regionale Schwerpunkte in Deutschland
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <InfoBox
                          type="expert"
                          title="Bayern"
                          content={
                            <p className="text-sm md:text-base leading-relaxed">
                              Warmblut-Zentren mit hochspezialisierten Praxen und besonders detaillierten Gutachten – ideal für
                              Sport- und Zuchtpferde.
                            </p>
                          }
                        />
                        <InfoBox
                          type="tip"
                          title="Niedersachsen"
                          content={
                            <p className="text-sm md:text-base leading-relaxed">
                              Größte Dichte an AKU-Tierärzten. Generationenlange Erfahrung mit unterschiedlichen Warmblutlinien
                              und deren typischen Befundmustern.
                            </p>
                          }
                        />
                        <InfoBox
                          type="warning"
                          title="Nordrhein-Westfalen"
                          content={
                            <p className="text-sm md:text-base leading-relaxed">
                              Fokus auf Freizeit- und Schulpferde. Angebote sind oftmals flexibel und auf städtische Pferdehalter
                              zugeschnitten.
                            </p>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">🔍</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Zweitmeinung & Qualitätssicherung
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                        Bei widersprüchlichen Befunden oder hochpreisigen Pferden lohnt sich eine unabhängige Zweitmeinung. So
                        stellen Sie sicher, dass keine relevanten Risiken übersehen werden.
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                        <li>• Zweitmeinung anfordern, wenn Befunde zu einem Kaufabbruch führen würden.</li>
                        <li>• Digitale Röntgenbilder erleichtern die externe Bewertung.</li>
                        <li>• PferdeWert.de bietet eine neutrale Befundanalyse als zusätzliche Entscheidungshilfe.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Marktwert & Daten */}
              <section
                id="valuation"
                className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  {numberedTitle('valuation', 'AKU-Ergebnisse in der Pferdebewertung')}
                </h2>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">📈</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Wie Befunde den Marktwert beeinflussen
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                        Unsere Auswertung von über 1.000 Verkäufen zeigt, wie stark AKU-Ergebnisse die Preisfindung prägen.
                        Befunde werden je nach Schweregrad und Verwendungszweck sehr unterschiedlich bewertet.
                      </p>
                      <InfoBox
                        type="cost"
                        title="Typische Preiswirkungen"
                        content={
                          <ul className="space-y-2 text-sm sm:text-base leading-relaxed">
                            <li><strong>Geringfügige Befunde:</strong> 3–8 % Preisabschlag, oft verhandelbar.</li>
                            <li><strong>Moderate Befunde:</strong> 8–18 % Wertminderung, Einsatzgebiet kritisch prüfen.</li>
                            <li><strong>Deutliche Befunde:</strong> 18–35 % Abschlag, ggf. Kaufabbruch empfehlen.</li>
                          </ul>
                        }
                      />
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                        Warmblüter reagieren sensibler auf Befunde als Robustrassen, regionale Märkte unterscheiden sich ebenfalls
                        um bis zu zehn Prozentpunkten in der Akzeptanz.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">🤖</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Integration in die Wertermittlung von PferdeWert.de
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                        Als einzige Plattform in Deutschland verknüpfen wir AKU-Gutachten direkt mit unserer KI-gestützten
                        Marktwertermittlung. So erhalten Sie eine transparente, datenbasierte Einschätzung.
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                        <li>• <strong>KI-Analyse:</strong> Automatische Verarbeitung kompletter Gutachten in Echtzeit.</li>
                        <li>• <strong>Vor/Nach-Vergleich:</strong> Sehen Sie sofort, wie sich der Wert nach der AKU verändert.</li>
                        <li>• <strong>Nachvollziehbarkeit:</strong> Jede Preisänderung wird mit den relevanten Befunden begründet.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">🎯</span>
                    <div>
                      <h3 className="font-bold text-brand-brown mb-3 text-lg md:text-xl">
                        Datenbasierte Kaufberatung
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                        Machine-Learning-Modelle erkennen Muster, Kombinationen und Folgekosten, die in herkömmlichen Gutachten
                        oft verborgen bleiben. So treffen Sie Kaufentscheidungen auf Basis belastbarer Prognosen.
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm sm:text-base leading-relaxed">
                        <li>• Predictive Analytics zu Folgekosten einzelner Befunde.</li>
                        <li>• Risikoanalyse für kritische Befundkombinationen.</li>
                        <li>• Ableitung von Therapie- und Versicherungsstrategien aus Marktdaten.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl md:text-2xl flex-shrink-0 mt-1">✅</span>
                    <div>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        <strong>Fazit:</strong> Die AKU ist weit mehr als eine Formalität – sie ermöglicht eine fundierte, datenbasierte
                        Kaufentscheidung. Kombiniert mit den Marktwert-Analysen von PferdeWert.de gewinnen Sie Sicherheit bei Preis,
                        Risiko und zukünftiger Nutzung.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
          </article>

          {/* FAQ Section */}
          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen zur AKU beim Pferd"
            />
          </section>

          {/* Related Articles Section */}
          <section id="related" className="py-8 md:py-16 px-4 md:px-6 mt-16 scroll-mt-32 lg:scroll-mt-40">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 md:mb-14">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 md:mb-4">
                  {numberedTitle('related', 'Weiterführende Artikel')}
                </h2>
                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Vertiefen Sie Ihr Wissen über Ankaufsuntersuchungen beim Pferd.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {relatedArticles.map(article => (
                  <div
                    key={article.href}
                    className="group bg-white rounded-2xl md:rounded-3xl border border-[#e7e0d4] overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 md:p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-600">
                        <span className="px-2 md:px-3 py-1 bg-[#f2e6d8] text-[#8c5a1f] rounded-full text-xs">{article.badge}</span>
                        <span className="text-xs">{article.readTime}</span>
                      </div>

                      <h3 className="text-lg md:text-xl font-serif font-semibold text-gray-900 mb-3 group-hover:text-[#8B4513] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 md:mb-6 text-pretty flex-1">
                        {article.description}
                      </p>

                      <Link href={article.href} className="w-full">
                        <button className="w-full min-h-[44px] h-10 md:h-10 px-3 rounded-lg border border-[#8B4513] text-[#8B4513] font-medium text-sm transition-colors group-hover:bg-[#8B4513] group-hover:text-white hover:bg-[#8B4513] hover:text-white touch-manipulation">
                          Artikel lesen
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA - warm neutral block */}
          <section id="cta" className="py-12 md:py-20 mt-16 scroll-mt-32 lg:scroll-mt-40">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              <div className="bg-[#fdf7f1] border border-[#eadfcd] rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-14 shadow-sm text-center">
                <div className="mb-6 md:mb-10">
                  <img
                    src="/happy-horse-owner-with-horse--professional-consult.jpg"
                    alt="Professionelle Pferdeberatung mit AKU-Expertise"
                    className="w-full max-w-2xl mx-auto rounded-xl md:rounded-2xl shadow-lg"
                  />
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 md:mb-5 text-balance">
                  {numberedTitle('cta', 'Professionelle Pferdebewertung')}
                </h2>

                <p className="text-base sm:text-lg text-gray-700 mb-8 md:mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
                  Nutzen Sie unsere KI-gestützte Analyse für eine objektive Einschätzung inklusive AKU-Befunden und aktueller Marktdaten.
                </p>

                <Link href="/pferde-preis-berechnen">
                  <button className="min-h-[44px] px-8 md:px-10 py-3 md:py-4 bg-[#8B4513] hover:bg-[#6B3410] text-white rounded-xl transition-colors font-semibold text-base md:text-lg shadow-md touch-manipulation">
                    Jetzt Pferdewert berechnen
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export default AKUPferd
