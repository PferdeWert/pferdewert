import { NextPage } from 'next'
import Head from 'next/head'
import { Clock, Calendar, Award, ArrowRight, ChevronDown } from 'lucide-react'

import Layout from '@/components/Layout'
import ContentSection from '@/components/ContentSection'
import FAQ from '@/components/FAQ'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import RatgeberInfoTiles from '@/components/ratgeber/RatgeberInfoTiles'
import RatgeberRegionGrid from '@/components/ratgeber/RatgeberRegionGrid'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import {
  akuSections,
  akuClasses,
  akuTimeTiles,
  akuRegions,
  akuFaqItems,
  akuRelatedArticles
} from '@/data/ratgeber/akuPferd'
import scrollToSection from '@/utils/ratgeber/scrollToSection'

const AKUPferd: NextPage = () => {
  const getSectionNumber = (sectionId: string) => {
    const index = akuSections.findIndex(section => section.id === sectionId)
    return index === -1 ? undefined : index + 1
  }

  const numberedTitle = (sectionId: string, title: string) => {
    const number = getSectionNumber(sectionId)
    return number ? `${number}. ${title}` : title
  }

  const heroMetaItems = [
    {
      icon: <Clock className="h-4 w-4" />,
      label: '12 min Lesezeit'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: (
        <span suppressHydrationWarning>
          {new Date().toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </span>
      )
    },
    {
      icon: <Award className="h-4 w-4" />,
      label: 'Experten-Ratgeber'
    }
  ]

  const handleTableOfContentsClick = (sectionId: string) => {
    scrollToSection(sectionId)
  }

  const handleScrollToToc = () => {
    if (typeof window === 'undefined') return
    document.getElementById('inhaltsverzeichnis')?.scrollIntoView({ behavior: 'smooth' })
  }

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
    "mainEntity": akuFaqItems.map(faq => ({
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
        <RatgeberHero
          badgeLabel="Pferde-Ratgeber"
          badgeIcon={<Award className="h-4 w-4" />}
          title="AKU Pferd: Die Ankaufsuntersuchung"
          subtitle="Ihr kompletter Ratgeber: Alles über Kosten, Ablauf, AKU-Klassen und Befunde der Ankaufsuntersuchung beim Pferd verständlich erklärt."
          metaItems={heroMetaItems}
          primaryCta={{
            href: '/pferde-preis-berechnen',
            label: 'Pferdewert jetzt berechnen',
            icon: <ArrowRight className="w-5 h-5" />
          }}
          secondaryCta={{
            label: 'Zum Inhalt',
            icon: <ChevronDown className="w-5 h-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src="/images/blossi-shooting.webp"
          alt="AKU Pferd: Ankaufsuntersuchung beim Pferd - Tierarzt untersucht Pferd"
          priority
        />

        <RatgeberTableOfContents sections={akuSections} onNavigate={handleTableOfContentsClick} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Article Content */}
          <article className="max-w-5xl mx-auto space-y-16">
                {/* AKU Grundlagen */}
                <div id="basics" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
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
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                  {numberedTitle('classes', 'AKU-Klassen')}
                </h2>

                <div className="py-6 md:py-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-2xl text-brand-brown">📊</div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-brand">
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
                      {akuClasses.map(akuClass => (
                        <RatgeberHighlightBox
                          key={akuClass.class}
                          title={`AKU Klasse ${akuClass.class}: ${akuClass.title}`}
                          padding="p-5 md:p-6"
                        >
                          <p>
                            Geeignet für: {akuClass.suitable}. Zeitaufwand: {akuClass.duration}. Kostenrahmen: {akuClass.cost}.
                          </p>
                          <p>
                            Typischer Umfang: {akuClass.includes.join(', ')}.
                          </p>
                        </RatgeberHighlightBox>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-6 md:py-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-2xl text-brand-brown">🎯</div>
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-[2.125rem] font-bold text-brand">
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand">
                  {numberedTitle('costs', 'AKU Kosten')}
                </h2>

                <RatgeberHighlightBox title="Was kostet eine Ankaufsuntersuchung?" icon="💰">
                  <p>
                    Für eine kleine AKU sollten Sie rund <strong>150&nbsp;bis 300&nbsp;€</strong> einplanen. Die große AKU mit
                    Standardröntgen kostet im Durchschnitt <strong>400&nbsp;bis 800&nbsp;€</strong>. Umfangreiche Spezialpakete mit
                    zusätzlichen Aufnahmen, Ultraschall oder Laborwerten können <strong>800&nbsp;bis 1.500&nbsp;€</strong> erreichen.
                  </p>
                  <p>
                    Regionale Unterschiede, Anfahrtskosten und Wochenendzuschläge wirken sich zusätzlich auf den Endpreis aus.
                    Fragen Sie daher vorab nach einem transparenten Angebot und halten Sie fest, welche Leistungen enthalten sind.
                  </p>
                </RatgeberHighlightBox>

                <RatgeberHighlightBox title="Kostenfaktoren bei der AKU" icon="📊">
                  <p>
                    Der größte Kostenhebel ist der Untersuchungsumfang: Je mehr Aufnahmen, Ultraschalluntersuchungen oder Laborchecks
                    Sie beauftragen, desto höher der Preis. Auch die Erfahrung des Tierarztes und die technische Ausstattung schlagen sich
                    im Honorar nieder.
                  </p>
                  <p>
                    Zusatzkosten entstehen häufig durch längere Anfahrten, Sedierung bei unruhigen Pferden oder Zweitbefundungen.
                    Klären Sie solche Posten vorab und lassen Sie sich die einzelnen Positionen schriftlich bestätigen.
                  </p>
                </RatgeberHighlightBox>

                <RatgeberHighlightBox title="Spartipps für die AKU" icon="💡">
                  <p>
                    Holen Sie mehrere Angebote ein, legen Sie Termine auf Werktage und bündeln Sie gegebenenfalls mehrere AKUs an einem
                    Standort. So lassen sich Anfahrten und Wochenendzuschläge vermeiden.
                  </p>
                  <p>
                    Verzichten Sie jedoch nicht auf erfahrene Tierärzte, hochwertige Röntgenbilder oder notwendige Zusatztests. Eine
                    lückenhafte Untersuchung spart kurzfristig Geld, kann aber langfristig zu hohen Folgekosten führen.
                  </p>
                </RatgeberHighlightBox>
              </div>

              {/* Ablauf & Dauer */}
              <div id="process" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
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

                  <RatgeberInfoTiles headline="⏰ Zeitaufwand nach AKU-Klasse" tiles={akuTimeTiles} />
              </div>

              {/* Befunde verstehen */}
              <section
                id="findings"
                className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40"
              >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand">
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

                  <RatgeberHighlightBox title="Tipps für die Befundinterpretation" icon="💡" padding="p-5 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      <div className="bg-white p-4 md:p-5 rounded-lg border border-[#e0c9aa] shadow-sm min-h-[120px]">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Zweitmeinung</h4>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                          Bei unklaren oder schwerwiegenden Befunden sollten Sie eine zweite tierärztliche Meinung einholen.
                        </p>
                      </div>
                      <div className="bg-white p-4 md:p-5 rounded-lg border border-[#e0c9aa] shadow-sm min-h-[120px]">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Verwendungszweck</h4>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                          Bewerten Sie Befunde immer im Kontext des geplanten Verwendungszwecks des Pferdes.
                        </p>
                      </div>
                      <div className="bg-white p-4 md:p-5 rounded-lg border border-[#e0c9aa] shadow-sm min-h-[120px]">
                        <h4 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Nachverhandlung</h4>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                          AKU-Befunde können als Grundlage für Preisverhandlungen genutzt werden.
                        </p>
                      </div>
                    </div>
                  </RatgeberHighlightBox>

              </section>

              {/* AKU-Tierarzt finden */}
              <section
                id="tierarzt"
                className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand">
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
                      <RatgeberRegionGrid regions={akuRegions} />
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand">
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
                      <RatgeberHighlightBox title="Typische Preiswirkungen" icon="💶" padding="p-5 md:p-6">
                        <ul className="space-y-2 text-sm sm:text-base leading-relaxed">
                          <li><strong>Geringfügige Befunde:</strong> 3–8 % Preisabschlag, oft verhandelbar.</li>
                          <li><strong>Moderate Befunde:</strong> 8–18 % Wertminderung, Einsatzzweck kritisch prüfen.</li>
                          <li><strong>Deutliche Befunde:</strong> 18–35 % Abschlag, ggf. Kaufabbruch erwägen.</li>
                        </ul>
                      </RatgeberHighlightBox>
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
              faqs={akuFaqItems}
              sectionTitle="Häufig gestellte Fragen zur AKU beim Pferd"
            />
          </section>

          <RatgeberRelatedArticles
            title={numberedTitle('related', 'Weiterführende Artikel')}
            description="Vertiefen Sie Ihr Wissen über Ankaufsuntersuchungen beim Pferd."
            articles={akuRelatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: '/happy-horse-owner-with-horse--professional-consult.jpg',
              alt: 'Professionelle Pferdeberatung mit AKU-Expertise'
            }}
            title={numberedTitle('cta', 'Professionelle Pferdebewertung')}
            description="Nutzen Sie unsere KI-gestützte Analyse für eine objektive Einschätzung inklusive AKU-Befunden und aktueller Marktdaten."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert berechnen"
          />
        </div>
      </Layout>
    </>
  )
}

export default AKUPferd
