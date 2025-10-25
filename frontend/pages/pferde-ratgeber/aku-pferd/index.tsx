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
  akuSections,
  akuTimeTiles,
  akuRegions,
  akuFaqItems,
  akuRelatedArticles
} from '@/data/ratgeber/akuPferd'
import scrollToSection from '@/utils/ratgeber/scrollToSection'
import { getRatgeberBySlug } from '@/lib/ratgeber-registry'

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
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "AKU Pferd: Ankaufsuntersuchung beim Pferdekauf durchführen",
    "description": "Vollständige Anleitung zur Ankaufsuntersuchung beim Pferdekauf - von der Vorbereitung bis zum fertigen Protokoll mit Kosten, Ablauf und Befundung",
    "totalTime": "PT72H",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "150",
      "maxValue": "1500"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Phase 1: Vorbereitung und Terminvereinbarung",
        "text": "1-2 Wochen vor dem AKU-Termin: Unabhängigen Tierarzt auswählen (nicht den Stallveterinär des Verkäufers), AKU-Klasse festlegen (kleine vs. große AKU), Röntgenumfang definieren, Kosten transparent klären und AKU-Vorbehalt im Kaufvertrag vereinbaren",
        "itemListElement": [
          {
            "@type": "HowToDirection",
            "text": "Wählen Sie einen unabhängigen Tierarzt, der nicht mit dem Verkäufer verbunden ist"
          },
          {
            "@type": "HowToDirection",
            "text": "Entscheiden Sie zwischen kleiner AKU (150-300€) für Freizeitpferde oder großer AKU (800-1.500€) für Sportpferde"
          },
          {
            "@type": "HowToDirection",
            "text": "Klären Sie den Röntgenumfang (Standard: 10-18 Aufnahmen) und alle Kosten schriftlich"
          },
          {
            "@type": "HowToDirection",
            "text": "Vereinbaren Sie einen AKU-Vorbehalt im Kaufvertrag für kostenloses Rücktrittsrecht"
          }
        ]
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Phase 2: Klinische Untersuchung vor Ort",
        "text": "1-2 Stunden am Untersuchungstag: Allgemeinzustand prüfen, Gangbildanalyse auf verschiedenen Böden, Flexionsproben an allen Gelenken, Herz-Kreislauf-Untersuchung, Lungencheck, Augenuntersuchung und Zahnkontrolle durchführen",
        "itemListElement": [
          {
            "@type": "HowToDirection",
            "text": "Allgemeinzustand: Körperkondition (Body Condition Score 4-6), Temperatur (37,5-38,2°C), Verhalten"
          },
          {
            "@type": "HowToDirection",
            "text": "Gangbildanalyse: Schritt und Trab auf hartem und weichem Boden, Longieren in beide Richtungen"
          },
          {
            "@type": "HowToDirection",
            "text": "Flexionsproben: Vorder- und Hintergliedmaßen einzeln testen, auf Lahmheitsreaktionen achten"
          },
          {
            "@type": "HowToDirection",
            "text": "Innere Organe: Herzfrequenz (28-40 Schläge/Min.), Atemfrequenz (8-16 Züge/Min.), Abhören von Herz und Lunge"
          }
        ]
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Phase 3: Röntgenuntersuchung (nur große AKU)",
        "text": "1-1,5 Stunden zusätzlich: Standard-Röntgenbilder erstellen (Vorderfußwurzelgelenk, Fesselgelenk vorne/hinten, Hufgelenk, Sprunggelenk), Aufnahmen entwickeln und erste Sichtung, bei Auffälligkeiten erweiterte Aufnahmen anfertigen",
        "itemListElement": [
          {
            "@type": "HowToDirection",
            "text": "Standard-Aufnahmen: 10-18 Röntgenbilder der wichtigsten Gelenke (je 50-80€ pro Aufnahme)"
          },
          {
            "@type": "HowToDirection",
            "text": "Wichtigste Positionen: Vorderfußwurzelgelenk lateral/dorsopalmar, Fesselgelenk vorne/hinten, Hufgelenk, Sprunggelenk"
          },
          {
            "@type": "HowToDirection",
            "text": "Bei Auffälligkeiten: Zusätzliche Spezialaufnahmen oder Schrägaufnahmen nach Absprache"
          }
        ]
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Phase 4: Befundung und Protokoll-Erstellung",
        "text": "24-48 Stunden nach der Untersuchung: Röntgenbilder detailliert auswerten, Röntgenklassen vergeben (I-V), AKU-Protokoll erstellen mit allen Befunden, Kaufempfehlung formulieren und Protokoll an Käufer übergeben",
        "itemListElement": [
          {
            "@type": "HowToDirection",
            "text": "Röntgenbilder werden nach dem 5-Klassen-System bewertet (I=ohne Befund bis V=hochgradig röntgenpositiv)"
          },
          {
            "@type": "HowToDirection",
            "text": "Detailliertes AKU-Protokoll mit allen klinischen und röntgenologischen Befunden wird erstellt"
          },
          {
            "@type": "HowToDirection",
            "text": "Kaufempfehlung basierend auf Gesamtbewertung: uneingeschränkt empfehlenswert, bedingt empfehlenswert oder nicht empfehlenswert"
          },
          {
            "@type": "HowToDirection",
            "text": "Protokoll gehört dem Käufer und dient als rechtliches Beweismittel bei späteren Streitigkeiten"
          }
        ]
      }
    ],
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Unabhängiger AKU-Tierarzt"
      },
      {
        "@type": "HowToSupply",
        "name": "Röntgengerät (bei großer AKU)"
      },
      {
        "@type": "HowToSupply",
        "name": "Budget für AKU-Kosten (150-1.500€)"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Kaufvertrag mit AKU-Vorbehalt"
      },
      {
        "@type": "HowToTool",
        "name": "Kostenaufstellung vom Tierarzt"
      }
    ]
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

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>AKU Pferd: Kosten, Ablauf & Vergleich (Große vs. Kleine AKU)</title>
        <meta name="description" content="Beim Pferdekauf ist die Ankaufsuntersuchung (AKU) die wichtigste Entscheidung – doch die Kosten variieren zwischen 150€ und 1.500€. Große oder kleine AKU? Was wird genau untersucht? Kompletter Guide mit Kostenübersicht, Ablauf und Entscheidungshilfe." />
        <meta name="keywords" content="aku pferd, ankaufsuntersuchung pferd, aku kosten, kleine aku, große aku, aku ablauf, got 2024, röntgenbilder pferd, aku versicherung, aku klassen, pferdekauf aku" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Technical Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#5A4B3B" />
        <meta name="msapplication-TileColor" content="#5A4B3B" />

        {/* Canonical and hreflang */}
        <link rel="canonical" href="https://www.pferdewert.de/pferde-ratgeber/aku-pferd" />
        <link rel="alternate" hrefLang="de-DE" href="https://pferdewert.de/pferde-ratgeber/aku-pferd" />

        {/* Open Graph */}
        <meta property="og:title" content="AKU Pferd: Kosten, Ablauf & Vergleich (Große vs. Kleine AKU)" />
        <meta property="og:description" content="Beim Pferdekauf ist die Ankaufsuntersuchung (AKU) die wichtigste Entscheidung – doch die Kosten variieren zwischen 150€ und 1.500€. Kompletter Guide mit Kostenübersicht, Ablauf und Entscheidungshilfe." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/aku-pferd" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-pferd-ratgeber.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKU Pferd: Kosten, Ablauf & Vergleich (Große vs. Kleine AKU)" />
        <meta name="twitter:description" content="Beim Pferdekauf ist die Ankaufsuntersuchung (AKU) die wichtigste Entscheidung – doch die Kosten variieren zwischen 150€ und 1.500€. Kompletter Guide." />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Prefetch for Core Pages */}
        <link rel="prefetch" href="/pferde-preis-berechnen" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>

      <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
        <RatgeberHero
          badgeLabel="Pferde-Ratgeber"
          badgeIcon={<Award className="h-4 w-4" />}
          title="AKU Pferd: Kosten, Ablauf & Vergleich"
          subtitle="Beim Pferdekauf ist die Ankaufsuntersuchung (AKU) die wichtigste Entscheidung – doch die Kosten variieren zwischen 150€ und 1.500€. Große oder kleine AKU? Was wird genau untersucht? Dieser Ratgeber erklärt alle Untersuchungsumfänge, aktuelle Preise nach neuer GOT, Versicherungs-Möglichkeiten und gibt Ihnen eine klare Entscheidungshilfe für Ihre individuelle Situation."
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
          src={getRatgeberBySlug('aku-pferd')?.image || '/images/ratgeber/aku-pferd/hero.webp'}
          alt="AKU Pferd: Ankaufsuntersuchung beim Pferd - Tierarzt untersucht Pferd"
          priority
        />

        <RatgeberTableOfContents sections={akuSections} onNavigate={handleTableOfContentsClick} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Article Content */}
          <article className="max-w-5xl mx-auto space-y-16">
            {/* Was ist eine AKU beim Pferd? */}
            <div id="basics" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('basics', 'Was ist eine AKU beim Pferd?')}
              </h2>

              <ContentSection
                title="Definition der Ankaufsuntersuchung"
                icon="📋"
                content={
                  <>
                    <p className="text-lg mb-6">
                      Die <strong>Ankaufsuntersuchung (AKU)</strong> beim Pferd ist eine <strong>veterinärmedizinische Untersuchung vor dem Pferdekauf</strong> zur Feststellung des Gesundheitszustands zum Untersuchungszeitpunkt. Wichtig: Die AKU ist <strong>keine Garantie</strong>, sondern eine <strong>Momentaufnahme</strong> – sie dokumentiert den gesundheitlichen Status des Pferdes am Tag der Untersuchung.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                      Die AKU wird von einem unabhängigen Tierarzt durchgeführt, der weder für Käufer noch Verkäufer tätig ist. Das schriftliche Protokoll dient als Grundlage für die Kaufentscheidung und kann im Streitfall als Beweismittel herangezogen werden.
                    </p>
                    <p className="text-lg text-gray-700">
                      <strong>Rechtlicher Rahmen:</strong> Die AKU unterliegt der Gebührenordnung für Tierärzte (GOT) und folgt dem Röntgenleitfaden 2018 der Gesellschaft für Pferdemedizin.
                    </p>
                  </>
                }
              />

              <ContentSection
                title="Zweck und Nutzen der AKU"
                icon="⚖️"
                content={
                  <>
                    <p className="text-lg text-gray-700 mb-6">
                      Die Ankaufsuntersuchung beim Pferd dient primär der <strong>Risikominimierung beim Pferdekauf</strong>. Sie hilft, versteckte Mängel zu erkennen, die beim normalen Probereiten nicht sichtbar sind:
                    </p>
                    <ul className="space-y-3 text-lg text-gray-700">
                      <li>• <strong>Kaufpreis-Absicherung:</strong> Bei Kaufpreisen ab 5.000€ ist die AKU ein unverzichtbares Instrument zur finanziellen Absicherung</li>
                      <li>• <strong>Versteckte Mängel erkennen:</strong> Chronische Erkrankungen, Gelenkveränderungen oder Atemwegsprobleme werden sichtbar</li>
                      <li>• <strong>Verhandlungsbasis schaffen:</strong> Befunde können als Grundlage für Preisverhandlungen dienen</li>
                      <li>• <strong>Rechtliche Absicherung:</strong> Das AKU-Protokoll dokumentiert den Zustand vor Vertragsabschluss</li>
                    </ul>
                    <RatgeberHighlightBox title="Praxisbeispiel" icon="💡" padding="p-5 md:p-6">
                      <p className="text-base">
                        Ein Turnierpferd mit Kaufpreis 15.000€ zeigt bei der großen AKU Röntgenklasse III im Sprunggelenk. Der Käufer kann entweder vom Kauf zurücktreten oder den Preis um 3.000€ verhandeln.
                      </p>
                    </RatgeberHighlightBox>
                  </>
                }
              />
            </div>

            {/* Große vs. Kleine AKU */}
            <div id="classes" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('classes', 'Große vs. Kleine AKU im direkten Vergleich')}
              </h2>

              <ContentSection
                title="Die kleine AKU – Umfang und Eignung"
                icon="📊"
                content={
                  <>
                    <p className="text-lg mb-6">
                      Die <strong>kleine Ankaufsuntersuchung</strong> umfasst ausschließlich die <strong>klinische Untersuchung ohne Röntgenbilder</strong>:
                    </p>
                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Untersuchungsumfang:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Allgemeinzustand (Ernährungszustand, Temperatur, Puls)</li>
                        <li>• Bewegungsapparat (Gangbildanalyse Schritt/Trab, Flexionsproben)</li>
                        <li>• Herz-Kreislauf-System (Auskultation, Pulsmessung)</li>
                        <li>• Atmungsorgane (Lungenauskultation, Atemfrequenz)</li>
                        <li>• Augenuntersuchung (Sehfähigkeit, Trübungen)</li>
                      </ul>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="font-semibold text-brand-brown">Dauer:</p>
                        <p className="text-gray-700">1-2 Stunden</p>
                      </div>
                      <div>
                        <p className="font-semibold text-brand-brown">Kosten:</p>
                        <p className="text-gray-700">150-300€ (Durchschnitt 220€)</p>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg">
                      <h4 className="font-bold text-brand-brown mb-3">Geeignet für:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Freizeitpferde mit Kaufpreis unter 5.000€</li>
                        <li>• Ältere Pferde ohne Leistungsanspruch (&gt;15 Jahre)</li>
                        <li>• Beistellpferde</li>
                        <li>• Bekannte Pferde nach längerem Probereiten (&gt;4 Wochen)</li>
                      </ul>
                    </div>
                  </>
                }
              />

              <ContentSection
                title="Die große AKU – Erweiterte Diagnostik"
                icon="🔬"
                content={
                  <>
                    <p className="text-lg mb-6">
                      Die <strong>große Ankaufsuntersuchung</strong> kombiniert die <strong>klinische Untersuchung mit Röntgendiagnostik</strong> (10-18 Aufnahmen):
                    </p>
                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Zusätzlicher Umfang:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Standard-Röntgenbilder: Vorderfußwurzelgelenk, Krongelenk, Hufgelenk, Sprunggelenk</li>
                        <li>• Optional: Kniegelenk, Gleichbein, Rücken, Hals</li>
                        <li>• Befundung nach Röntgenleitfaden (Klasse I-V)</li>
                        <li>• Detaillierte Röntgenbilder-Bewertung</li>
                      </ul>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="font-semibold text-brand-brown">Dauer:</p>
                        <p className="text-gray-700">2-3 Stunden vor Ort + 24-48h Befundung</p>
                      </div>
                      <div>
                        <p className="font-semibold text-brand-brown">Kosten:</p>
                        <p className="text-gray-700">800-1.500€ (Durchschnitt 1.100€)</p>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg">
                      <h4 className="font-bold text-brand-brown mb-3">Geeignet für:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Sport-/Turnierpferde unabhängig vom Preis</li>
                        <li>• Kaufpreis über 10.000€</li>
                        <li>• Leistungspferde mit hoher Belastung</li>
                        <li>• Jungpferde als Zukunftsinvestition</li>
                      </ul>
                    </div>
                  </>
                }
              />

              <div className="overflow-x-auto">
                <h3 className="text-2xl font-bold text-brand-brown mb-4">Vergleichstabelle: Kleine vs. Große AKU</h3>
                <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-brand-brown text-white">
                    <tr>
                      <th className="p-4 text-left">Kriterium</th>
                      <th className="p-4 text-left">Kleine AKU</th>
                      <th className="p-4 text-left">Große AKU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-4 font-semibold">Klinische Untersuchung</td>
                      <td className="p-4">✓ Ja</td>
                      <td className="p-4">✓ Ja</td>
                    </tr>
                    <tr className="bg-amber-50">
                      <td className="p-4 font-semibold">Röntgenbilder</td>
                      <td className="p-4">✗ Nein</td>
                      <td className="p-4">✓ 10-18 Aufnahmen</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Dauer vor Ort</td>
                      <td className="p-4">1-2 Stunden</td>
                      <td className="p-4">2-3 Stunden</td>
                    </tr>
                    <tr className="bg-amber-50">
                      <td className="p-4 font-semibold">Kosten</td>
                      <td className="p-4">150-300€</td>
                      <td className="p-4">800-1.500€</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Empfohlen bei Kaufpreis</td>
                      <td className="p-4">&lt; 5.000€</td>
                      <td className="p-4">&gt; 10.000€</td>
                    </tr>
                    <tr className="bg-amber-50">
                      <td className="p-4 font-semibold">Empfohlen für Nutzung</td>
                      <td className="p-4">Freizeit</td>
                      <td className="p-4">Sport/Turnier</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Röntgenklassen-Bewertung</td>
                      <td className="p-4">✗ Nicht enthalten</td>
                      <td className="p-4">✓ Nach Leitfaden 2018</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <RatgeberHighlightBox title="Entscheidungshilfe" icon="🎯" padding="p-5 md:p-6">
                <p className="text-lg">
                  Wenn Sie unsicher sind, ob kleine oder große AKU: <strong>Bei Kaufpreis &gt;10.000€ oder sportlicher Nutzung → immer große AKU!</strong>
                </p>
              </RatgeberHighlightBox>
            </div>

            {/* AKU Pferd Kosten */}
            <div id="costs" className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('costs', 'AKU Pferd Kosten: Aktuelle Preise (2024/2025)')}
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 md:p-6">
                <p className="text-gray-700">
                  Die AKU ist eine wichtige Kostenfaktor beim Pferdekauf. Um die Gesamtbudget besser einzuordnen, empfehlen wir auch unseren Ratgeber <Link href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-blue-600 font-semibold hover:underline">&ldquo;Was kostet ein Pferd?&rdquo; zu lesen</Link>, der alle Anschaffungs- und laufenden Pferdehaltungskosten transparent macht.
                </p>
              </div>

              <ContentSection
                title="Kleine AKU Kosten"
                icon="💰"
                content={
                  <>
                    <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg mb-6 border border-brand-brown/20">
                      <p className="text-xl font-bold text-brand-brown mb-2">Preisrange: 150-300€</p>
                      <p className="text-lg text-gray-700">(Durchschnitt: 220€)</p>
                    </div>

                    <h4 className="font-bold text-brand-brown mb-3 text-lg">Kostenfaktoren:</h4>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li>• <strong>Region:</strong> Nord: 150-250€, Süd: 180-300€</li>
                      <li>• <strong>Tierarzt-Qualifikation:</strong> Fachtierarzt teurer als Allgemein-Praktiker</li>
                      <li>• <strong>Wochenende/Feiertag-Zuschläge:</strong> +20-30%</li>
                      <li>• <strong>Anfahrtskosten:</strong> Bei Entfernung &gt;20km: +30-60€</li>
                    </ul>

                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg">
                      <h4 className="font-bold text-brand-brown mb-4">Typische Kosten nach GOT (Stand 2024):</h4>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between py-2 border-b">
                          <span>Klinische Untersuchung:</span>
                          <span className="font-semibold">120-180€ (GOT-Satz 2-3x)</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Gangbildanalyse:</span>
                          <span className="font-semibold">30-50€</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Flexionsproben:</span>
                          <span className="font-semibold">20-40€</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span>Anfahrt:</span>
                          <span className="font-semibold">20-50€</span>
                        </div>
                      </div>
                    </div>
                  </>
                }
              />

              <ContentSection
                title="Große AKU Kosten (inkl. Röntgen)"
                icon="💶"
                content={
                  <>
                    <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg mb-6 border border-brand-brown/20">
                      <p className="text-xl font-bold text-brand-brown mb-2">Preisrange: 800-1.500€</p>
                      <p className="text-lg text-gray-700">(Durchschnitt: 1.100€)</p>
                    </div>

                    <h4 className="font-bold text-brand-brown mb-3 text-lg">Kostenaufschlüsselung:</h4>
                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg mb-6">
                      <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between py-2 border-b">
                          <span>Klinische Untersuchung (wie kleine AKU):</span>
                          <span className="font-semibold">150-300€</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Röntgenbilder Standard (10 Aufnahmen):</span>
                          <span className="font-semibold">500-800€</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                          <span>Röntgenbilder erweitert (18 Aufnahmen):</span>
                          <span className="font-semibold">900-1.200€</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span>Befundung + Protokoll:</span>
                          <span className="font-semibold">100-150€</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-lg text-gray-700 mb-6">
                      <strong>Preis pro Röntgenbild:</strong> 50-80€ (je nach Region und Gerät)
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-amber-50 p-5 rounded-lg">
                        <h4 className="font-bold text-brand-brown mb-3">Standard-Röntgenbilder (10 Aufnahmen):</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Vorderfußwurzelgelenk (2 Projektionen): 100-160€</li>
                          <li>• Krongelenk vorne (2 Projektionen): 100-160€</li>
                          <li>• Hufgelenk vorne (2 Projektionen): 100-160€</li>
                          <li>• Sprunggelenk hinten (4 Projektionen): 200-320€</li>
                        </ul>
                      </div>
                      <div className="bg-white border border-brand-brown/20 p-5 rounded-lg">
                        <h4 className="font-bold text-brand-brown mb-3">Optionale Zusatzbilder:</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Kniegelenk: +100-160€</li>
                          <li>• Rücken: +150-240€</li>
                          <li>• Hals: +100-150€</li>
                        </ul>
                      </div>
                    </div>
                  </>
                }
              />

              <RatgeberHighlightBox title="Neue GOT und Preisanpassungen (2020/2022)" icon="📊" padding="p-6">
                <p className="text-lg mb-6">
                  Die Gebührenordnung für Tierärzte (GOT) wurde 2020 und 2022 angepasst, was zu Preiserhöhungen von <strong>12-20%</strong> führte.
                </p>

                <h4 className="font-bold text-brand-brown mb-3">Vergleich alte vs. neue GOT-Sätze:</h4>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
                    <thead className="bg-brand-brown text-white">
                      <tr>
                        <th className="p-3 text-left text-sm">Leistung</th>
                        <th className="p-3 text-right text-sm">GOT 2017</th>
                        <th className="p-3 text-right text-sm">GOT 2020</th>
                        <th className="p-3 text-right text-sm">GOT 2022</th>
                        <th className="p-3 text-right text-sm">Änderung</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="p-3 text-sm">Klinische Untersuchung (2x Satz)</td>
                        <td className="p-3 text-right text-sm">96€</td>
                        <td className="p-3 text-right text-sm">108€</td>
                        <td className="p-3 text-right text-sm font-semibold">120€</td>
                        <td className="p-3 text-right text-sm text-red-600 font-semibold">+25%</td>
                      </tr>
                      <tr className="bg-amber-50">
                        <td className="p-3 text-sm">Röntgenbild (1 Aufnahme, 2x Satz)</td>
                        <td className="p-3 text-right text-sm">44€</td>
                        <td className="p-3 text-right text-sm">50€</td>
                        <td className="p-3 text-right text-sm font-semibold">56€</td>
                        <td className="p-3 text-right text-sm text-red-600 font-semibold">+27%</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-sm">Gangbildanalyse</td>
                        <td className="p-3 text-right text-sm">26€</td>
                        <td className="p-3 text-right text-sm">30€</td>
                        <td className="p-3 text-right text-sm font-semibold">34€</td>
                        <td className="p-3 text-right text-sm text-red-600 font-semibold">+31%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white p-5 rounded-lg border border-brand-brown/20">
                  <h4 className="font-bold text-brand-brown mb-3">Auswirkung auf AKU-Gesamtkosten:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Kleine AKU:</strong> +24€ (von 196€ auf 220€)</li>
                    <li>• <strong>Große AKU:</strong> +132€ (von 968€ auf 1.100€)</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  <strong>Hinweis:</strong> Tierärzte können laut GOT den 1-3fachen Satz berechnen. Bei komplexen Fällen oder Spezialkliniken oft 2,5-3facher Satz.
                </p>
              </RatgeberHighlightBox>
            </div>

            {/* Ablauf der Ankaufsuntersuchung */}
            <div id="process" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('process', 'Ablauf der Ankaufsuntersuchung (Schritt für Schritt)')}
              </h2>

              <ContentSection
                title="Phase 1: Vorbereitung und Terminvereinbarung"
                icon="📅"
                content={
                  <>
                    <p className="text-sm text-gray-600 mb-4 italic">1-2 Wochen vorher</p>
                    <h4 className="font-bold text-brand-brown mb-3">Schritte:</h4>
                    <ol className="space-y-3 text-gray-700 list-decimal list-inside mb-6">
                      <li><strong>Tierarzt-Auswahl:</strong> Wählen Sie einen unabhängigen Tierarzt (nicht der Stallvet des Verkäufers!)</li>
                      <li><strong>Terminabstimmung:</strong> Koordinieren mit Verkäufer, Tierarzt und Ihnen</li>
                      <li><strong>Röntgenbilder-Umfang festlegen:</strong> Standard (10 Aufnahmen) oder erweitert (18 Aufnahmen)?</li>
                      <li><strong>Kosten vorab klären:</strong> Kostenvoranschlag vom Tierarzt anfordern</li>
                      <li><strong>Kaufvertrag vorbereiten:</strong> AKU-Vorbehalt schriftlich fixieren</li>
                    </ol>
                    <RatgeberHighlightBox title="Wichtiger Tipp" icon="⚠️" padding="p-4">
                      <p>Vereinbaren Sie den Termin nicht Freitags oder Samstags – die Befundung erfolgt erst Mo-Fr.</p>
                    </RatgeberHighlightBox>
                  </>
                }
              />

              <ContentSection
                title="Phase 2: Klinische Untersuchung"
                icon="🔍"
                content={
                  <>
                    <p className="text-sm text-gray-600 mb-4 italic">1-2 Stunden</p>
                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Timeline:</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="flex gap-4">
                          <span className="font-semibold text-brand-brown min-w-[100px]">0-15 Min:</span>
                          <span>Allgemeinzustand (Temperatur, Puls, Gewicht, Ernährungszustand)</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-semibold text-brand-brown min-w-[100px]">15-30 Min:</span>
                          <span>Gangbildanalyse Schritt und Trab (auf hartem/weichem Boden)</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-semibold text-brand-brown min-w-[100px]">30-50 Min:</span>
                          <span>Flexionsproben Vorder- und Hinterhand (Belastungstest)</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-semibold text-brand-brown min-w-[100px]">50-70 Min:</span>
                          <span>Herz/Lunge Auskultation, Atemfrequenz</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-semibold text-brand-brown min-w-[100px]">70-90 Min:</span>
                          <span>Augenuntersuchung, Zahnkontrolle, Palpation Gliedmaßen</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="font-semibold text-brand-brown min-w-[100px]">90-120 Min:</span>
                          <span>Dokumentation Befunde</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">
                      <strong>Verhalten während Untersuchung:</strong> Bleiben Sie ruhig, stellen Sie Fragen, notieren Sie Auffälligkeiten.
                    </p>
                  </>
                }
              />

              <ContentSection
                title="Phase 3: Röntgenuntersuchung (nur große AKU)"
                icon="🩻"
                content={
                  <>
                    <p className="text-sm text-gray-600 mb-4 italic">1-1.5 Stunden</p>

                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Standard-Röntgenbilder (10 Aufnahmen):</h4>
                      <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                        <li>Vorderfußwurzelgelenk li/re (2 Projektionen je)</li>
                        <li>Krongelenk vorne li/re (2 Projektionen je)</li>
                        <li>Hufgelenk vorne li/re (2 Projektionen je)</li>
                        <li>Sprunggelenk hinten li/re (2 Projektionen je)</li>
                      </ol>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-3">Optionale Zusatzbilder:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Kniegelenk hinten</li>
                        <li>• Rücken (Dornfortsätze, Wirbelkörper)</li>
                        <li>• Hals (Halswirbelsäule)</li>
                        <li>• Gleichbein</li>
                      </ul>
                    </div>

                    <RatgeberHighlightBox title="Röntgenleitfaden 2018 – Bewertungsklassen" icon="📋" padding="p-6">
                      <div className="space-y-3 text-sm md:text-base">
                        <div className="flex gap-3">
                          <span className="font-bold text-green-600 min-w-[80px]">Klasse I:</span>
                          <span>Ohne besonderen Befund</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="font-bold text-blue-600 min-w-[80px]">Klasse II:</span>
                          <span>Geringgradig verändert, klinisch unwichtig</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="font-bold text-yellow-600 min-w-[80px]">Klasse III:</span>
                          <span>Mittelgradig verändert, klinisch relevant</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="font-bold text-orange-600 min-w-[80px]">Klasse IV:</span>
                          <span>Hochgradig verändert, prognostisch ungünstig</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="font-bold text-red-600 min-w-[80px]">Klasse V:</span>
                          <span>Hochgradig verändert, klinisch evident</span>
                        </div>
                      </div>
                    </RatgeberHighlightBox>
                  </>
                }
              />

              <ContentSection
                title="Phase 4: Befundung und Protokoll"
                icon="📄"
                content={
                  <>
                    <p className="text-sm text-gray-600 mb-4 italic">24-48h nach Untersuchung</p>

                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Schriftliche Dokumentation:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Zusammenfassung klinische Befunde</li>
                        <li>• Röntgenbilder-Bewertung (Klasse I-V je Aufnahme)</li>
                        <li>• Empfehlung zur Kaufeignung (geeignet/bedingt geeignet/nicht geeignet)</li>
                        <li>• Einschränkungen für Nutzungszweck</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Übergabe Protokoll:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Per E-Mail (PDF) oder postalisch</li>
                        <li>• Röntgenbilder auf CD/DVD oder Cloud-Link</li>
                        <li>• Telefonische Befundbesprechung mit Tierarzt</li>
                      </ul>
                    </div>

                    <RatgeberHighlightBox title="Wichtig zu wissen" icon="⚠️" padding="p-4">
                      <p className="font-semibold">Das Protokoll gehört dem Käufer (Auftraggeber), nicht dem Verkäufer!</p>
                    </RatgeberHighlightBox>
                  </>
                }
              />

              <RatgeberInfoTiles headline="⏰ Zeitaufwand nach AKU-Klasse" tiles={akuTimeTiles} />
            </div>

            {/* Untersuchungsumfang */}
            <div id="findings" className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('findings', 'Untersuchungsumfang: Was wird bei der AKU genau geprüft?')}
              </h2>

              <ContentSection
                title="Bewegungsapparat und Lahmheitsuntersuchung"
                icon="🏃"
                content={
                  <>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Gangbildanalyse:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Schritt auf hartem Boden (Pflasterung, Asphalt)</li>
                          <li>• Trab auf hartem Boden (freier Trab, Zirkel rechts/links)</li>
                          <li>• Trab auf weichem Boden (Sandplatz, Reitbahn)</li>
                          <li>• Beobachtung Taktfehler, Asymmetrien, Ausweichbewegungen</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Flexionsproben:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• <strong>Vorderhand:</strong> Hufgelenk, Krongelenk, Fesselgelenk (je 60 Sekunden)</li>
                          <li>• <strong>Hinterhand:</strong> Sprunggelenk, Kniegelenk (je 60 Sekunden)</li>
                          <li>• <strong>Rücken:</strong> Längsbiegung, Aufwölbung</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Palpation:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Sehnen (oberflächliche/tiefe Beugesehne, Fesselträger)</li>
                          <li>• Bänder (Kollateralbänder Karpalgelenk)</li>
                          <li>• Muskulatur (Verspannungen, Atrophien)</li>
                        </ul>
                      </div>
                    </div>
                  </>
                }
              />

              <ContentSection
                title="Innere Organe und Kreislaufsystem"
                icon="❤️"
                content={
                  <>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Herz-Auskultation:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Herzfrequenz Ruhe (28-40 Schläge/Min normal)</li>
                          <li>• Herztöne (regelmäßig, klar, ohne Nebengeräusche)</li>
                          <li>• Herzgeräusche (falls vorhanden: Grad I-VI Klassifikation)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Lungen-Auskultation:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Atemfrequenz Ruhe (8-16 Atemzüge/Min normal)</li>
                          <li>• Atemgeräusche (vesikulär, bronchial)</li>
                          <li>• Rassel-/Giemengeräusche (Hinweis auf Atemwegserkrankung)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Weitere Checks:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Puls (Arteria facialis, Arteria digitalis)</li>
                          <li>• Körpertemperatur (rektal, 37,5-38,5°C normal)</li>
                          <li>• Schleimhäute (Farbe, Feuchtigkeit, Kapillarfüllzeit)</li>
                        </ul>
                      </div>
                    </div>
                  </>
                }
              />

              <ContentSection
                title="Augen, Zähne und Allgemeinzustand"
                icon="👁️"
                content={
                  <>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Ophthalmologische Untersuchung:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Sehfähigkeit (Reaktion auf Bewegungen)</li>
                          <li>• Hornhaut (Trübungen, Narben)</li>
                          <li>• Linse (Katarakt, Altersveränderungen)</li>
                          <li>• Glaskörper (Floater, Trübungen)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Zahnstatus:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Zahnalter (Abgleich mit Equidenpass)</li>
                          <li>• Zahnfehlstellungen (Über-/Unterbiss, Wellen)</li>
                          <li>• Haken, Kanten, scharfe Zähne</li>
                          <li>• EOTRH-Anzeichen (bei älteren Pferden)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-brand-brown mb-3">Allgemeinzustand:</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Ernährungszustand (BCS 1-9, ideal: 5-6)</li>
                          <li>• Fell/Haut (Glanz, Parasiten, Ekzeme)</li>
                          <li>• Verhaltensbeobachtung (nervös, gelassen, aggressiv)</li>
                          <li>• Konstitution (Proportionen, Exterieur)</li>
                        </ul>
                      </div>
                    </div>
                  </>
                }
              />
            </div>

            {/* Versicherung & AKU-Kosten */}
            <div id="versicherung" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('versicherung', 'Versicherung & AKU-Kosten: Wer zahlt?')}
              </h2>

              <RatgeberHighlightBox title="Wichtige Klarstellung" icon="⚠️" padding="p-6">
                <p className="text-xl font-bold text-red-600 mb-3">
                  KEINE Pferdekrankenversicherung übernimmt AKU-Kosten VOR Vertragsabschluss!
                </p>
                <p className="text-gray-700">
                  Die AKU findet vor dem Versicherungsabschluss statt, daher gilt sie nicht als versicherbares Risiko. Versicherungen greifen erst nach Vertragsabschluss.
                </p>
              </RatgeberHighlightBox>

              <ContentSection
                title="Pferdekrankenversicherung und AKU-Übernahme"
                icon="🏥"
                content={
                  <>
                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-3">Kaufpreisversicherungen (Sonderfall):</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Einige Anbieter bieten &quot;Kaufpreisversicherungen&quot; (Uelzener, Allianz)</li>
                        <li>• <strong>Kostenübernahme:</strong> 50-100% der AKU-Kosten bei Kaufabbruch nach negativer AKU</li>
                        <li>• <strong>Voraussetzung:</strong> Abschluss VOR AKU-Termin</li>
                        <li>• <strong>Beitrag:</strong> 80-150€ einmalig (abhängig von Kaufpreis)</li>
                      </ul>
                    </div>

                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg">
                      <h4 className="font-bold text-brand-brown mb-3">Wann zahlt Versicherung nach Kauf?</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• <strong>Tierarztkosten nach Kaufabschluss:</strong> Normal versichert</li>
                        <li>• <strong>Nachuntersuchungen bei Beschwerden:</strong> Versicherungsleistung greifbar</li>
                        <li>• <strong>Vorerkrankungen aus AKU:</strong> Oft ausgeschlossen (Präexistenz)</li>
                      </ul>
                    </div>
                  </>
                }
              />

              <ContentSection
                title="Käufer oder Verkäufer: Wer trägt die Kosten?"
                icon="💶"
                content={
                  <>
                    <div className="bg-gradient-to-r from-brand-brown/10 to-amber-50 p-6 rounded-lg mb-6">
                      <p className="text-xl font-bold text-brand-brown mb-2">Standard:</p>
                      <p className="text-lg">Käufer zahlt AKU (in 95% der Fälle)</p>
                    </div>

                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-3">Begründung:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Käufer beauftragt die Untersuchung</li>
                        <li>• Käufer wählt den Tierarzt</li>
                        <li>• Käufer erhält das Protokoll</li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-3">Verhandlungssache: Kostenaufteilung möglich</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 50/50-Teilung bei hohen Kaufpreisen (&gt;20.000€)</li>
                        <li>• Verkäufer zahlt bei mehreren Interessenten (Fairness)</li>
                        <li>• Verkäufer zahlt bei AKU-Verpflichtung im Kaufvertrag</li>
                      </ul>
                    </div>

                    <RatgeberHighlightBox title="Bei negativer AKU" icon="❌" padding="p-5">
                      <p className="font-semibold mb-2">Kosten bleiben beim Käufer!</p>
                      <p className="text-sm text-gray-700">
                        Auch wenn Kauf platzt, zahlt Käufer die AKU. <strong>Ausnahme:</strong> Schriftliche Vereinbarung mit Verkäufer.
                      </p>
                    </RatgeberHighlightBox>

                    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="font-semibold text-blue-900">💡 Tipp:</p>
                      <p className="text-blue-800">Klären Sie die Kostenübernahme <strong>vor</strong> der Untersuchung schriftlich!</p>
                    </div>
                  </>
                }
              />

              <ContentSection
                title="Steuerliche Absetzbarkeit der AKU-Kosten"
                icon="📊"
                content={
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-700 mb-4 flex items-center">
                          <span className="mr-2">✅</span> Gewerbliche Pferdehaltung
                        </h4>
                        <p className="text-gray-700 mb-4">
                          AKU als <strong>Betriebsausgabe absetzbar</strong>
                        </p>
                        <div className="bg-white p-4 rounded">
                          <p className="font-semibold text-gray-800 mb-2">Voraussetzungen:</p>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Gewerbliche Tätigkeit (Zucht, Reitbetrieb, Pensionsstall)</li>
                            <li>• Gewinnerzielungsabsicht nachweisbar</li>
                            <li>• Pferd wird betrieblich genutzt</li>
                          </ul>
                        </div>
                        <div className="mt-4">
                          <p className="font-semibold text-gray-800 mb-2">Absetzbar:</p>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• AKU-Kosten komplett (150-1.500€)</li>
                            <li>• Anfahrtskosten zum Tierarzt</li>
                            <li>• Kopien/Protokoll-Gebühren</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-700 mb-4 flex items-center">
                          <span className="mr-2">❌</span> Private Pferdehaltung
                        </h4>
                        <p className="text-gray-700 mb-4">
                          <strong>Nicht absetzbar</strong>
                        </p>
                        <div className="bg-white p-4 rounded">
                          <p className="font-semibold text-gray-800 mb-2">Ausnahme:</p>
                          <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Reitbetrieb mit Gewerbeanmeldung</li>
                            <li>• Zucht mit Gewinnerzielungsabsicht (nachgewiesen über 3 Jahre)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                      <p className="font-semibold text-yellow-900">⚠️ Wichtig:</p>
                      <p className="text-yellow-800">
                        Bei Unsicherheit Steuerberater konsultieren! Absetzbarkeit hängt von individueller Situation ab.
                      </p>
                    </div>
                  </>
                }
              />
            </div>

            {/* Wann ist eine AKU sinnvoll? */}
            <div id="sinnvoll" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('sinnvoll', 'Wann ist eine AKU sinnvoll?')}
              </h2>

              <ContentSection
                title="AKU-Pflicht: Wann unbedingt erforderlich?"
                icon="🚨"
                content={
                  <>
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-6">
                      <h4 className="font-bold text-red-800 mb-4">AKU ist unbedingt erforderlich bei:</h4>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li><strong>Kaufpreis &gt;5.000€:</strong> Immer empfohlen zur Absicherung der Investition</li>
                        <li><strong>Sport-/Turnierpferde:</strong> Unabhängig vom Preis – Gesundheit ist Leistungsvoraussetzung</li>
                        <li><strong>Jungpferde/Fohlen:</strong> Bei Zukunftsinvestition – versteckte Entwicklungsstörungen erkennen</li>
                        <li><strong>Vorerkrankungen bekannt:</strong> Absicherung gegen chronische Beschwerden</li>
                        <li><strong>Fernes Verkaufsgebiet:</strong> Wenn Rücktransport teuer wäre</li>
                      </ol>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h4 className="font-bold text-yellow-800 mb-3">Zusätzliche Indikatoren (Red Flags!):</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Verkäufer drängt auf schnellen Kaufabschluss (Red Flag!)</li>
                        <li>• Pferd wurde kürzlich verletzt oder operiert</li>
                        <li>• Verkäufer verweigert AKU-Vorbehalt im Kaufvertrag</li>
                      </ul>
                    </div>
                  </>
                }
              />

              <ContentSection
                title="Wann reicht eine kleine AKU?"
                icon="✅"
                content={
                  <>
                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
                      <h4 className="font-bold text-green-800 mb-4">Kleine AKU ausreichend bei:</h4>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li><strong>Freizeitpferde &lt;3.000€:</strong> Geringe finanzielle Risiko-Exposition</li>
                        <li><strong>Ältere Pferde (&gt;15 Jahre):</strong> Ohne Leistungsanspruch, Begleitpferd</li>
                        <li><strong>Beistellpferde:</strong> Keine sportliche Nutzung geplant</li>
                        <li><strong>Bekanntes Pferd:</strong> Probereiten &gt;4 Wochen, keine Auffälligkeiten</li>
                      </ol>
                    </div>

                    <RatgeberHighlightBox title="Rechenbeispiel" icon="💡" padding="p-5">
                      <div className="space-y-2 text-gray-700">
                        <p>• <strong>Kaufpreis:</strong> 2.500€</p>
                        <p>• <strong>Kleine AKU:</strong> 220€ (8,8% vom Kaufpreis)</p>
                        <p>• <strong>Große AKU:</strong> 1.100€ (44% vom Kaufpreis – unverhältnismäßig)</p>
                        <p className="pt-3 font-semibold text-brand-brown">
                          Entscheidungsregel: Bei Kaufpreis &lt;3.000€ und Freizeitnutzung → kleine AKU reicht meist aus.
                        </p>
                      </div>
                    </RatgeberHighlightBox>
                  </>
                }
              />

              <ContentSection
                title="ROI-Kalkulation: AKU-Kosten vs. Kaufpreis-Risiko"
                icon="📊"
                content={
                  <>
                    <div className="space-y-6 mb-6">
                      <div className="bg-white border border-brand-brown/20 p-6 rounded-lg">
                        <h4 className="font-bold text-brand-brown mb-3">Rechenbeispiel 1: Sport-Pferd 15.000€</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Große AKU-Kosten: 1.200€</li>
                          <li>• Versteckter Mangel (z.B. Chip im Sprunggelenk): 5.000€ OP-Kosten + 3 Monate Ausfall</li>
                          <li className="pt-2 font-semibold text-green-600">
                            ✓ ROI: 1.200€ investiert → 8.000€+ gespart (Faktor 6,7x)
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white border border-brand-brown/20 p-6 rounded-lg">
                        <h4 className="font-bold text-brand-brown mb-3">Rechenbeispiel 2: Freizeitpferd 3.000€</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li>• Kleine AKU-Kosten: 220€</li>
                          <li>• Versteckter Mangel (z.B. chronische Lahmheit): Pferd unverkäuflich, Totalverlust 3.000€</li>
                          <li className="pt-2 font-semibold text-green-600">
                            ✓ ROI: 220€ investiert → 3.000€ gespart (Faktor 13,6x)
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="overflow-x-auto mb-6">
                      <h4 className="font-bold text-brand-brown mb-3">Break-even-Analyse:</h4>
                      <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                        <thead className="bg-brand-brown text-white">
                          <tr>
                            <th className="p-3 text-left text-sm">Kaufpreis</th>
                            <th className="p-3 text-left text-sm">AKU-Kosten</th>
                            <th className="p-3 text-left text-sm">Wahrsch. Mangel</th>
                            <th className="p-3 text-left text-sm">Erwarteter Verlust</th>
                            <th className="p-3 text-left text-sm">ROI</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="p-3">3.000€</td>
                            <td className="p-3">220€</td>
                            <td className="p-3">15%</td>
                            <td className="p-3">450€</td>
                            <td className="p-3 font-semibold text-green-600">2,0x</td>
                          </tr>
                          <tr className="bg-amber-50">
                            <td className="p-3">8.000€</td>
                            <td className="p-3">800€</td>
                            <td className="p-3">12%</td>
                            <td className="p-3">960€</td>
                            <td className="p-3 font-semibold text-green-600">1,2x</td>
                          </tr>
                          <tr>
                            <td className="p-3">15.000€</td>
                            <td className="p-3">1.200€</td>
                            <td className="p-3">10%</td>
                            <td className="p-3">1.500€</td>
                            <td className="p-3 font-semibold text-green-600">1,25x</td>
                          </tr>
                          <tr className="bg-amber-50">
                            <td className="p-3">30.000€</td>
                            <td className="p-3">1.500€</td>
                            <td className="p-3">8%</td>
                            <td className="p-3">2.400€</td>
                            <td className="p-3 font-semibold text-green-600">1,6x</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <RatgeberHighlightBox title="Entscheidungsbaum" icon="🎯" padding="p-5">
                      <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                        <li>Kaufpreis &gt;10.000€ → Große AKU (immer lohnend)</li>
                        <li>Kaufpreis 5.000-10.000€ → Große AKU bei Sport, Kleine AKU bei Freizeit</li>
                        <li>Kaufpreis &lt;5.000€ → Kleine AKU ausreichend (ROI &gt;2x)</li>
                      </ol>
                    </RatgeberHighlightBox>
                  </>
                }
              />
            </div>

            {/* Rechtsaspekte */}
            <div id="rechtsaspekte" className="space-y-8 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('rechtsaspekte', 'Rechtsaspekte: AKU und Kaufvertrag')}
              </h2>

              <ContentSection
                title="Negative AKU: Rücktrittsrecht und Gewährleistung"
                icon="⚖️"
                content={
                  <>
                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-3">Empfohlene Formulierung für AKU-Vorbehalt im Kaufvertrag:</h4>
                      <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                        <p className="text-gray-700 italic">
                          &quot;Der Kauf steht unter dem Vorbehalt einer positiven Ankaufsuntersuchung durch einen vom Käufer zu benennenden Tierarzt. Die Untersuchung erfolgt bis spätestens [Datum]. Bei negativer AKU ist der Käufer zum kostenlosen Rücktritt berechtigt. AKU-Kosten trägt der Käufer.&quot;
                        </p>
                      </div>
                    </div>

                    <div className="bg-white border border-brand-brown/20 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Rücktrittsrecht bei negativer AKU:</h4>
                      <ul className="space-y-3 text-gray-700">
                        <li>• <strong>Mit AKU-Vorbehalt:</strong> Käufer kann kostenlos zurücktreten</li>
                        <li>• <strong>Ohne AKU-Vorbehalt:</strong> Kein automatisches Rücktrittsrecht (Gewährleistung greifen lassen)</li>
                        <li>• <strong>Wichtig:</strong> Rücktritt muss innerhalb vereinbarter Frist erfolgen (meist 7-14 Tage)</li>
                      </ul>
                    </div>

                    <RatgeberHighlightBox title="Gewährleistungsausschluss nach positiver AKU" icon="⚠️" padding="p-5">
                      <p className="mb-3">
                        Positive AKU schließt Gewährleistungsansprüche für untersuchte Bereiche oft aus.
                      </p>
                      <p className="font-semibold text-brand-brown mb-2">Grenze:</p>
                      <p className="text-sm text-gray-700 mb-3">
                        Arglistiges Verschweigen kann trotzdem zur Haftung führen.
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        Beispiel: Verkäufer weiß von Vorerkrankung, verschweigt sie aber – trotz positiver AKU haftet Verkäufer
                      </p>
                    </RatgeberHighlightBox>
                  </>
                }
              />

              <ContentSection
                title="AKU-Protokoll als Beweismittel"
                icon="📄"
                content={
                  <>
                    <div className="bg-amber-50 p-6 rounded-lg mb-6">
                      <h4 className="font-bold text-brand-brown mb-4">Beweiswert vor Gericht:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• AKU-Protokoll ist <strong>anerkanntes Beweismittel</strong> bei Kaufstreitigkeiten</li>
                        <li>• Dokumentiert Gesundheitszustand zum Kaufzeitpunkt</li>
                        <li>• Widerlegt Behauptungen &quot;Mangel war schon vorher da&quot;</li>
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white border border-brand-brown/20 p-5 rounded-lg">
                        <h4 className="font-bold text-brand-brown mb-3">Aufbewahrungspflicht:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Käufer sollte Protokoll + Röntgenbilder <strong>mindestens 5 Jahre</strong> aufbewahren</li>
                          <li>• Digital + physisch sichern (Festplatte, Cloud, Ausdrucke)</li>
                        </ul>
                      </div>
                      <div className="bg-white border border-brand-brown/20 p-5 rounded-lg">
                        <h4 className="font-bold text-brand-brown mb-3">Röntgenbilder-Eigentum:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Röntgenbilder gehören dem <strong>Auftraggeber</strong> (Käufer)</li>
                          <li>• Tierarzt muss Kopien herausgeben (auf CD/DVD oder Cloud)</li>
                          <li>• Verkäufer hat kein Recht auf Röntgenbilder (außer vereinbart)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-bold text-brand-brown mb-3">Weitergabe an Käufer:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Protokoll wird ausschließlich an Käufer übergeben</li>
                        <li>• Verkäufer erhält nur mit Einverständnis des Käufers Einsicht</li>
                        <li>• <strong>Datenschutz:</strong> Tierarzt darf keine Informationen an Dritte geben</li>
                      </ul>
                    </div>
                  </>
                }
              />
            </div>

            {/* AKU-Tierarzt finden */}
            <section id="tierarzt" className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40">
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

            {/* AKU-Ergebnisse in der Pferdebewertung */}
            <section id="valuation" className="space-y-6 md:space-y-8 scroll-mt-32 lg:scroll-mt-40">
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
            </section>
          </article>

          {/* FAQ Section */}
          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ
              faqs={akuFaqItems}
              sectionTitle="Häufig gestellte Fragen zur AKU beim Pferd"
            />
          </section>

          {/* Fazit Section */}
          <section id="fazit" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <article className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand mb-8">
                {numberedTitle('fazit', 'Fazit: Die wichtigsten Takeaways zur AKU beim Pferd')}
              </h2>

              <div className="space-y-6">
                {/* Takeaway 1 */}
                <div className="bg-white border-l-4 border-blue-500 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-brand-brown text-xl mb-3">
                    1. Große vs. Kleine AKU
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Die Entscheidung hängt vom Kaufpreis und der geplanten Nutzung ab. Bei Kaufpreisen über 10.000€ oder sportlicher Nutzung ist die große AKU mit Röntgenbildern unverzichtbar. Für Freizeitpferde unter 5.000€ reicht die kleine AKU meist aus.
                  </p>
                </div>

                {/* Takeaway 2 */}
                <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-brand-brown text-xl mb-3">
                    2. Kosten-Transparenz
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Rechnen Sie mit 150-300€ für die kleine AKU und 800-1.500€ für die große AKU. Beachten Sie die neuen GOT-Preise 2024 – die Gebührenordnung wurde 2020 und 2022 angepasst, was zu Preiserhöhungen von 12-20% führte.
                  </p>
                </div>

                {/* Takeaway 3 */}
                <div className="bg-white border-l-4 border-red-500 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-brand-brown text-xl mb-3">
                    3. Versicherung zahlt (fast) nie
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    In 95% der Fälle trägt der Käufer die AKU-Kosten. Pferdekrankenversicherungen übernehmen keine Kosten vor Vertragsabschluss. Kostenaufteilung mit dem Verkäufer ist verhandelbar – klären Sie dies vor der Untersuchung schriftlich!
                  </p>
                </div>

                {/* Takeaway 4 */}
                <div className="bg-white border-l-4 border-green-500 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-brand-brown text-xl mb-3">
                    4. Ablauf planen
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Eine große AKU dauert 2-3 Stunden vor Ort, plus 24-48 Stunden für die Befundung. Wählen Sie einen unabhängigen Tierarzt (nicht den Stallvet des Verkäufers!) und vereinbaren Sie einen AKU-Vorbehalt im Kaufvertrag.
                  </p>
                </div>

                {/* Takeaway 5 */}
                <div className="bg-white border-l-4 border-purple-500 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-brand-brown text-xl mb-3">
                    5. Rechtlich absichern
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Verankern Sie einen AKU-Vorbehalt im Kaufvertrag – nur so haben Sie ein kostenloses Rücktrittsrecht bei negativer AKU. Das Protokoll gehört Ihnen und dient als Beweismittel bei späteren Streitigkeiten.
                  </p>
                </div>
              </div>

              {/* Summary Highlight Box */}
              <div className="mt-8 bg-gradient-to-r from-amber-50 to-white p-6 md:p-8 rounded-lg border-2 border-brand-brown/20">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">💡</span>
                  <div>
                    <h4 className="font-bold text-brand-brown text-lg mb-3">
                      Ihr nächster Schritt
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Mit diesen fünf Kernpunkten sind Sie optimal vorbereitet für die Ankaufsuntersuchung. Nutzen Sie unsere KI-gestützte Pferdebewertung, um den fairen Marktwert bereits vor der AKU einzuschätzen – so gehen Sie mit realistischen Erwartungen in den Kaufprozess.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <RatgeberRelatedArticles
            title={numberedTitle('related', 'Weiterführende Artikel')}
            description="Vertiefen Sie Ihr Wissen über Pferdekauf und -bewertung."
            articles={akuRelatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: '/images/ratgeber/aku-pferd/hero.webp',
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
