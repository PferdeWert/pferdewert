import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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
  wasKostetPferdSections,
  rassenPreise,
  alterPreisTiles,
  unterhaltKostenTiles,
  regionalBayernRegions,
  wasKostetPferdFaqItems,
  wasKostetPferdRelatedArticles
} from '@/data/ratgeber/wasKostetPferd'
import scrollToSection from '@/utils/ratgeber/scrollToSection'
import { getRatgeberBySlug } from '@/lib/ratgeber-registry'

const WasKostetEinPferd: NextPage = () => {
  const getSectionNumber = (sectionId: string) => {
    const index = wasKostetPferdSections.findIndex(section => section.id === sectionId)
    return index === -1 ? undefined : index + 1
  }

  const numberedTitle = (sectionId: string, title: string) => {
    const number = getSectionNumber(sectionId)
    return number ? `${number}. ${title}` : title
  }

  const heroMetaItems = [
    {
      icon: <Clock className="h-4 w-4" />,
      label: '15 min Lesezeit'
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
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Was kostet ein Pferd? Der vollständige Preis-Guide 2025",
    "description": "Die Preise für Pferde in Deutschland: Anschaffungskosten, monatliche Unterhaltungskosten, regionale Unterschiede und professionelle Kaufberatung.",
    "image": "https://pferdewert.de/images/was-kostet-ein-pferd.webp",
    "author": {
      "@type": "Organization",
      "name": "PferdeWert.de"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PferdeWert.de",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pferdewert.de/images/logo.webp"
      }
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://pferdewert.de",
    "logo": "https://pferdewert.de/images/logo.webp",
    "description": "Deutschlands führende Plattform für KI-gestützte Pferdebewertung",
    "sameAs": [
      "https://www.facebook.com/pferdewert",
      "https://www.instagram.com/pferdewert"
    ]
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": wasKostetPferdFaqItems.map(faq => ({
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
        <title>Was kostet ein Pferd? Preise & Kosten-Guide 2025 | PferdeWert</title>
        <meta name="description" content="Was kostet ein Pferd in Deutschland? Kompletter Guide zu Anschaffungskosten (1.500€-50.000€), monatlichen Kosten (300€-800€) und regionalen Preisunterschieden." />
        <meta name="keywords" content="was kostet ein pferd, pferd kaufen kosten, pferd preis, warmblut kosten, pferd monatliche kosten, stallmiete, pferdehaltung kosten, bayern pferd preis, pferdekauf budget, anfängerpferd kosten" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Technical Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#5A4B3B" />
        <meta name="msapplication-TileColor" content="#5A4B3B" />

        {/* Canonical and hreflang */}
        <link rel="canonical" href="https://pferdewert.de/was-kostet-ein-pferd" />
        <link rel="alternate" hrefLang="de-DE" href="https://pferdewert.de/was-kostet-ein-pferd" />

        {/* Open Graph */}
        <meta property="og:title" content="Was kostet ein Pferd? Preise & Kosten-Guide 2025 | PferdeWert" />
        <meta property="og:description" content="Was kostet ein Pferd in Deutschland? Kompletter Guide zu Anschaffungskosten (1.500€-50.000€), monatlichen Kosten (300€-800€) und regionalen Preisunterschieden." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/was-kostet-ein-pferd" />
        <meta property="og:image" content="https://pferdewert.de/images/was-kostet-ein-pferd.webp" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Was kostet ein Pferd? Preise & Kosten-Guide 2025 | PferdeWert" />
        <meta name="twitter:description" content="Was kostet ein Pferd in Deutschland? Kompletter Guide zu Anschaffungskosten (1.500€-50.000€), monatlichen Kosten (300€-800€) und regionalen Preisunterschieden." />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Prefetch for Core Pages */}
        <link rel="prefetch" href="/pferde-preis-berechnen" />
        <link rel="prefetch" href="/pferde-ratgeber/pferd-kaufen" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
          title="Was kostet ein Pferd?"
          subtitle="Der vollständige Preis-Guide 2025: Von Anschaffungskosten bis monatlichem Unterhalt – alle Zahlen, regionale Unterschiede und professionelle Kaufberatung für Ihr Budget."
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
          src={getRatgeberBySlug('pferd-kaufen/was-kostet-ein-pferd')?.image || '/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/hero.webp'}
          alt="Was kostet ein Pferd – Professionelle Pferdebewertung und Kaufberatung"
          priority
        />

        <RatgeberTableOfContents sections={wasKostetPferdSections} onNavigate={handleTableOfContentsClick} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Article Content */}
          <article className="max-w-5xl mx-auto space-y-16">
            {/* Intro */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                Die Preise für Pferde in Deutschland variieren erheblich: Ein Pferd kostet ungefähr zwischen{' '}
                <strong>1.500€ und 50.000€</strong>, manchmal auch noch deutlich mehr – abhängig von Rasse, Alter, Ausbildungsstand und Turniererfolgen.
                Dazu kommen monatliche Unterhaltungskosten von durchschnittlich <strong>300€ bis 800€</strong>.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Die Entscheidung für ein eigenes Pferd ist nicht nur emotional, sondern auch finanziell bedeutsam. Ob Sie ein Freizeitpferd,
                Turnierpferd oder Ihr erstes Pferd kaufen möchten – dieser Artikel liefert Ihnen alle relevanten Preisinformationen,
                regionale Unterschiede und professionelle Kaufberatung für 2025.
              </p>
            </div>

            {/* Anschaffungskosten */}
            <div id="anschaffung" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('anschaffung', 'Anschaffungskosten: Was kostet der Pferdekauf?')}
              </h2>

              <ContentSection
                title="Preisspanne nach Pferderasse"
                icon="🐴"
                content={
                  <>
                    <p className="text-lg text-gray-700 mb-6">
                      Verschiedene Pferderassen haben unterschiedliche Preissegmente. Deutsche Warmblutrassen sind aufgrund ihrer
                      Zuchtqualität oft teurer als robuste Ponyrassen oder Freizeitpferde.
                    </p>
                    <div className="space-y-4">
                      {rassenPreise.map(rasse => (
                        <RatgeberHighlightBox
                          key={rasse.title}
                          title={rasse.title}
                          padding="p-5 md:p-6"
                        >
                          <p className="font-semibold text-brand-brown mb-2">{rasse.price}</p>
                          <p className="text-gray-700">{rasse.description}</p>
                        </RatgeberHighlightBox>
                      ))}
                    </div>
                    <p className="text-lg text-gray-700 mt-6">
                      <strong>Wichtig:</strong> Diese Preise gelten für gesunde Pferde mit korrektem Exterieur. Pferde mit Vorerkrankungen
                      oder Exterieur-Mängeln können deutlich günstiger sein, bringen aber höhere Folgekosten mit sich.
                    </p>
                  </>
                }
              />

              <ContentSection
                title="Preisspanne nach Alter"
                icon="📅"
                content={
                  <>
                    <p className="text-lg text-gray-700 mb-6">
                      Das Alter eines Pferdes beeinflusst den Preis erheblich:
                    </p>
                    <RatgeberInfoTiles headline="" tiles={alterPreisTiles} />
                    <p className="text-lg text-gray-700 mt-6">
                      <strong>Pro-Tipp:</strong> Für Anfänger sind ausgebildete Pferde zwischen 8-14 Jahren ideal – sie sind erfahren,
                      gelassen und verzeihen Reiterfehler. Jungpferde oder Fohlen sind nur für erfahrene Reiter geeignet.
                    </p>
                  </>
                }
              />

              <ContentSection
                title="Preisspanne nach Ausbildungsstand"
                icon="🎓"
                content={
                  <>
                    <p className="text-lg text-gray-700 mb-6">
                      Der Ausbildungsstand ist oft wichtiger als das Alter:
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li><strong>Ungeritten/Roher:</strong> 1.500€ - 6.000€ – keine Reitausbildung, nur für Profis</li>
                      <li><strong>Angeritten:</strong> 4.000€ - 10.000€ – Grundlagen unter dem Sattel</li>
                      <li><strong>Basisausbildung:</strong> 6.000€ - 15.000€ – A-Niveau in Dressur/Springen</li>
                      <li><strong>Fertig ausgebildet (L/M-Niveau):</strong> 12.000€ - 30.000€ – turnierfähig, solide Ausbildung</li>
                      <li><strong>Turnierpferd mit Erfolgen (S-Niveau):</strong> 25.000€ - 150.000€+ – Spitzenpferde mit Platzierungen</li>
                    </ul>
                    <p className="text-lg text-gray-700 mt-6">
                      <strong>Freizeitpferde ohne Turnierambitionen</strong> liegen meist zwischen 5.000€ und 15.000€, wenn sie
                      gut ausgebildet und gesundheitlich einwandfrei sind.
                    </p>
                  </>
                }
              />

              <RatgeberHighlightBox title="💡 Sie möchten ein Pferd kaufen und wissen, ob der Preis angemessen ist?" icon="">
                <p className="mb-4">
                  Mit unserer <strong>KI-gestützten Pferdebewertung</strong> erhalten Sie in nur 2 Minuten eine professionelle
                  Einschätzung des Marktwerts – basierend auf Rasse, Alter, Ausbildung und aktuellen Marktdaten. So vermeiden Sie
                  Überzahlung und kaufen zum fairen Preis.
                </p>
                <Link href="/pferde-preis-berechnen" className="inline-flex items-center gap-2 text-brand-brown font-semibold hover:text-brand-brownDark">
                  Jetzt Pferdewert berechnen <ArrowRight className="w-4 h-4" />
                </Link>
              </RatgeberHighlightBox>
            </div>

            {/* Unterhaltungskosten */}
            <div id="unterhalt" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('unterhalt', 'Unterhaltungskosten: Was kostet ein Pferd pro Monat?')}
              </h2>

              <p className="text-lg leading-relaxed text-gray-700">
                Die monatlichen Kosten für ein Pferd sind oft höher als der Kaufpreis über die Lebensdauer betrachtet.
                Ein Pferd lebt durchschnittlich 25-30 Jahre – über diese Zeit kommen erhebliche Summen zusammen.
              </p>

              <ContentSection
                title="Fixkosten pro Monat (unausweichlich)"
                icon="💶"
                content={
                  <>
                    <RatgeberInfoTiles headline="" tiles={unterhaltKostenTiles} />
                    <p className="text-lg text-gray-700 mt-6">
                      <strong>Durchschnittliche monatliche Fixkosten: 300€ - 800€</strong>
                    </p>
                    <p className="text-lg text-gray-700">
                      In Ballungsräumen wie München, Hamburg oder Frankfurt liegen die Kosten am oberen Ende, während ländliche
                      Regionen in Niedersachsen, Mecklenburg-Vorpommern oder Brandenburg günstiger sind.
                    </p>
                  </>
                }
              />

              <ContentSection
                title="Variable Kosten (unregelmäßig, aber einkalkulieren)"
                icon="📊"
                content={
                  <>
                    <ul className="space-y-3 text-gray-700">
                      <li><strong>Tierarzt (Behandlungen):</strong> 200€ - 2.000€/Jahr – Koliken, Verletzungen, Lahmheiten</li>
                      <li><strong>Sattel & Ausrüstung:</strong> 1.500€ - 5.000€ (Erstanschaffung) + 200€/Jahr Ersatz</li>
                      <li><strong>Reitunterricht/Beritt:</strong> 50€ - 150€/Stunde – wichtig für Ausbildung und Korrektur</li>
                      <li><strong>Transport:</strong> 50€ - 200€ pro Fahrt – Tierarztbesuche, Turniere, Umzüge</li>
                      <li><strong>OP-Versicherung:</strong> 30€ - 100€/Monat – deckt teure Operationen (z.B. Kolik-OP 5.000€+)</li>
                    </ul>
                    <p className="text-lg font-semibold text-brand-brown mt-6">
                      Realistisches Gesamtbudget pro Jahr: 5.000€ - 15.000€
                    </p>
                  </>
                }
              />

              <RatgeberHighlightBox title="Kostenbeispiel: Freizeitpferd in Vollpension (München, Bayern)" icon="🧮">
                <ul className="space-y-2 text-gray-700">
                  <li>• Stallmiete: 450€/Monat</li>
                  <li>• Hufschmied: 60€/Monat (alle 6 Wochen)</li>
                  <li>• Pferdehaftpflicht: 15€/Monat</li>
                  <li>• Tierarzt (Basis): 50€/Monat</li>
                  <li>• Reitunterricht: 100€/Monat (1x Einzelstunde)</li>
                </ul>
                <p className="font-semibold text-brand-brown mt-4">
                  Gesamt: ca. 675€/Monat = 8.100€/Jahr
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Ohne unvorhergesehene Tierarztkosten! Realistisch sollten Sie 700€ - 900€/Monat einplanen.
                </p>
              </RatgeberHighlightBox>
            </div>

            {/* Regionale Preisunterschiede */}
            <div id="regional" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('regional', 'Regionale Preisunterschiede in Deutschland')}
              </h2>

              <p className="text-lg leading-relaxed text-gray-700">
                Die Kosten für Pferdehaltung variieren in Deutschland erheblich – abhängig von Bundesland, Stadt vs. Land und lokaler Nachfrage.
              </p>

              <ContentSection
                title="Stallmiete: Deutschland-Vergleich"
                icon="🗺️"
                content={
                  <>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Bayern (München, Augsburg):</strong> 350€ - 600€/Monat</li>
                      <li><strong>Baden-Württemberg (Stuttgart):</strong> 320€ - 550€/Monat</li>
                      <li><strong>Nordrhein-Westfalen (Köln, Düsseldorf):</strong> 300€ - 500€/Monat</li>
                      <li><strong>Niedersachsen (Hannover):</strong> 250€ - 400€/Monat</li>
                      <li><strong>Schleswig-Holstein:</strong> 220€ - 380€/Monat</li>
                      <li><strong>Mecklenburg-Vorpommern:</strong> 180€ - 320€/Monat</li>
                    </ul>
                    <p className="text-lg text-gray-700 mt-6">
                      <strong>Faustregel:</strong> Je näher an Großstädten, desto teurer. Ländliche Regionen sind 30-40% günstiger.
                    </p>
                  </>
                }
              />

              <ContentSection
                title="Bayern im Fokus: Stadt-spezifische Preise"
                icon="📍"
                content={
                  <>
                    <p className="text-lg text-gray-700 mb-6">
                      Bayern ist Deutschlands traditionsreichste Pferdezucht-Region und hat entsprechend höhere, aber auch qualitativ hochwertige Angebote:
                    </p>
                    <RatgeberRegionGrid regions={regionalBayernRegions} />
                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold text-brand-brown text-xl">Warum sind Bayern-Preise höher?</h4>
                      <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                        <li><strong>Starke Zucht-Tradition:</strong> Bayern hat etablierte Warmblutzuchten mit hoher Nachfrage</li>
                        <li><strong>Höhere Kaufkraft:</strong> Besonders im Raum München</li>
                        <li><strong>Turnier-Infrastruktur:</strong> Viele Turnierställe mit Premium-Angeboten</li>
                        <li><strong>Grundstückspreise:</strong> Teurere Stallgrundstücke in Ballungsräumen</li>
                      </ol>
                      <p className="text-lg text-gray-700 mt-4">
                        <strong>Tipp für Budget-Käufer:</strong> Schauen Sie 50-100 km außerhalb von München – in Oberbayern oder
                        Niederbayern sinken die Preise deutlich, ohne an Qualität zu verlieren.
                      </p>
                    </div>
                  </>
                }
              />
            </div>

            {/* Was ist mein Pferd wert */}
            <div id="bewertung" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('bewertung', 'Was ist mein Pferd wert? Professionelle Bewertung nutzen')}
              </h2>

              <p className="text-lg leading-relaxed text-gray-700">
                Wenn Sie ein Pferd verkaufen oder kaufen möchten, ist die größte Unsicherheit: <strong>Ist der Preis fair?</strong>
                Viele Verkäufer überschätzen den Wert ihres Pferdes emotional, während Käufer Angst vor Überzahlung haben.
              </p>

              <ContentSection
                title="Faktoren, die den Pferdewert beeinflussen"
                icon="⚖️"
                content={
                  <>
                    <p className="text-lg text-gray-700 mb-4">
                      Eine professionelle Pferdebewertung berücksichtigt alle relevanten Faktoren:
                    </p>
                    <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                      <li><strong>Rasse und Abstammung:</strong> Zuchtlinien, Papiere, Elterntiere</li>
                      <li><strong>Alter:</strong> 5-10 Jahre = höchster Wert, davor und danach sinkt der Preis</li>
                      <li><strong>Ausbildungsstand:</strong> Reitbarkeit, Turniererfahrung, Spezialisierung</li>
                      <li><strong>Gesundheitszustand:</strong> Aktuelle AKU, Vorerkrankungen, Röntgenbilder</li>
                      <li><strong>Charakter & Rittigkeit:</strong> Umgänglichkeit, Nervenstärke, Anfänger-geeignet</li>
                      <li><strong>Turniererfolge:</strong> Platzierungen erhöhen den Wert erheblich</li>
                      <li><strong>Exterieur:</strong> Korrektheit, Gebäude, Bewegungsqualität</li>
                      <li><strong>Marktlage:</strong> Aktuelle Angebots- und Nachfragesituation</li>
                    </ol>
                  </>
                }
              />

              <RatgeberHighlightBox title="Warum eine KI-gestützte Bewertung nutzen?" icon="🤖">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">Für Käufer:</h4>
                    <p className="text-gray-700">
                      Vermeiden Sie Überzahlung. Viele Pferde werden 20-40% über Marktwert angeboten – unsere Bewertung zeigt
                      Ihnen den realistischen Preis und gibt Ihnen Verhandlungssicherheit.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-brown mb-2">Für Verkäufer:</h4>
                    <p className="text-gray-700">
                      Finden Sie den optimalen Verkaufspreis. Zu hoch angesetzte Preise führen zu monatelanger Verkaufsdauer,
                      zu niedrige Preise verschenken Geld. Unsere Analyse zeigt Ihnen den marktgerechten Preis für schnellen Verkauf.
                    </p>
                  </div>
                </div>
              </RatgeberHighlightBox>

              <RatgeberHighlightBox title="🚀 PferdeWert.de: Deutschlands erste KI-gestützte Pferdebewertung" icon="">
                <ul className="space-y-2 mb-4">
                  <li>✅ <strong>In 2 Minuten zum Ergebnis</strong> – Einfacher Online-Fragebogen</li>
                  <li>✅ <strong>Geld-zurück-Garantie</strong> – 100% zufrieden oder Geld zurück</li>
                  <li>✅ <strong>4,7/5 Sterne</strong> von über 1.000 zufriedenen Kunden</li>
                  <li>✅ <strong>Von Reitern entwickelt</strong> – Expertise aus 20+ Jahren Pferdesport</li>
                </ul>
                <div className="bg-white p-4 rounded-lg border border-[#e0c9aa] mb-4">
                  <h5 className="font-semibold text-brand-brown mb-2">So funktioniert&apos;s:</h5>
                  <ol className="space-y-1 text-sm text-gray-700 list-decimal list-inside">
                    <li>Fragebogen ausfüllen (Rasse, Alter, Ausbildung, Gesundheit, etc.)</li>
                    <li>KI analysiert Ihr Pferd + vergleicht mit 100.000+ Marktdaten</li>
                    <li>Erhalten Sie detaillierten Bewertungsbericht per E-Mail</li>
                  </ol>
                </div>
                <Link href="/pferde-preis-berechnen" className="inline-flex items-center gap-2 text-brand-brown font-semibold hover:text-brand-brownDark">
                  Jetzt Pferdewert berechnen <ArrowRight className="w-4 h-4" />
                </Link>
              </RatgeberHighlightBox>
            </div>

            {/* Pferdekauf-Checkliste */}
            <div id="kauftipps" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('kauftipps', 'Pferd kaufen: Checkliste & Tipps für Anfänger')}
              </h2>

              <p className="text-lg leading-relaxed text-gray-700">
                Der Pferdekauf ist eine emotionale und finanzielle Entscheidung. Diese Checkliste hilft Ihnen, teure Fehler zu vermeiden:
              </p>

              <ContentSection
                title="Vor dem Kauf klären"
                icon="✅"
                content={
                  <>
                    <ul className="space-y-3 text-gray-700">
                      <li>✅ <strong>Budget realistisch kalkulieren:</strong> Kaufpreis + 12 Monate Unterhalt (mind. 10.000€ Gesamtbudget)</li>
                      <li>✅ <strong>Reitkenntnisse ehrlich einschätzen:</strong> Anfänger brauchen erfahrene, gutmütige Pferde</li>
                      <li>✅ <strong>Stallplatz sichern:</strong> Vor dem Kauf Vollpension-Platz reservieren (Wartezeiten möglich)</li>
                      <li>✅ <strong>Zeitaufwand prüfen:</strong> Mind. 5-7 Stunden/Woche für Pflege, Reiten, Training</li>
                      <li>✅ <strong>Notfall-Reserve bilden:</strong> 2.000€ - 5.000€ für Tierarzt-Notfälle</li>
                    </ul>
                  </>
                }
              />

              <ContentSection
                title="Ankaufsuntersuchung (AKU) ist PFLICHT"
                icon="🩺"
                content={
                  <>
                    <p className="text-lg text-gray-700 mb-4">
                      <strong>Niemals ein Pferd ohne AKU kaufen!</strong> Eine Ankaufsuntersuchung kostet 200€ - 1.500€
                      (je nach Umfang) und deckt gesundheitliche Risiken auf:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li><strong>Kleine AKU (200€ - 400€):</strong> Klinische Untersuchung, Bewegungsanalyse – Minimum für Freizeitpferde</li>
                      <li><strong>Große AKU (800€ - 1.500€):</strong> Inkl. Röntgen (18 Aufnahmen), Blutuntersuchung – Pflicht für Turnierpferde</li>
                    </ul>
                    <p className="text-lg text-gray-700 mt-4">
                      Mehr Details finden Sie in unserem{' '}
                      <Link href="/pferde-ratgeber/aku-pferd" className="text-brand-brown font-semibold hover:text-brand-brownDark">
                        umfassenden AKU-Ratgeber
                      </Link>.
                    </p>
                  </>
                }
              />

              <RatgeberHighlightBox title="Kaufberatung: Was sollte ein Anfängerpferd kosten?" icon="💡">
                <p className="mb-4">Für Reitanfänger empfehlen wir:</p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Alter:</strong> 8-14 Jahre (erfahren, aber nicht zu alt)</li>
                  <li><strong>Charakter:</strong> Gutmütig, nervenstark, verzeiht Fehler</li>
                  <li><strong>Ausbildung:</strong> Mindestens A-Niveau, keine Probleme im Umgang</li>
                  <li><strong>Rasse:</strong> Robuste Rassen wie Haflinger, Islandpferd, Deutsches Reitpferd</li>
                  <li><strong>Preis:</strong> 5.000€ - 12.000€</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  <strong>Warnung:</strong> Pferde unter 3.000€ haben oft versteckte Probleme (Gesundheit, Verhalten, Ausbildungslücken).
                  Bei extrem günstigen Angeboten ist Vorsicht geboten.
                </p>
              </RatgeberHighlightBox>
            </div>
          </article>

          {/* FAQ Section */}
          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ
              faqs={wasKostetPferdFaqItems}
              sectionTitle="Häufig gestellte Fragen zu Pferdekosten"
            />
          </section>

          <RatgeberRelatedArticles
            title={numberedTitle('related', 'Weiterführende Artikel')}
            description="Vertiefen Sie Ihr Wissen über Pferdekauf, Bewertung und Haltung."
            articles={wasKostetPferdRelatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: getRatgeberBySlug('pferd-kaufen/was-kostet-ein-pferd')?.image || '/images/ratgeber/pferd-kaufen/was-kostet-ein-pferd/hero.webp',
              alt: 'Professionelle Pferdeberatung und Bewertung',
              width: 960,
              height: 640
            }}
            title="Professionelle Pferdebewertung"
            description="Nutzen Sie unsere KI-gestützte Analyse für eine objektive Einschätzung inklusive aktueller Marktdaten. In 2 Minuten zum fairen Preis."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert berechnen"
          />
        </div>
      </Layout>
    </>
  )
}

export default WasKostetEinPferd
