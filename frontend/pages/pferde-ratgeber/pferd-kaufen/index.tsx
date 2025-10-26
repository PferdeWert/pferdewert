import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { ArrowRight, TrendingUp, Shield, CheckCircle, MapPin, ChevronDown, AlertTriangle } from "lucide-react"

import Layout from "@/components/Layout"
import ContentSection from "@/components/ContentSection"
import FAQ from "@/components/FAQ"
import RatgeberHero from "@/components/ratgeber/RatgeberHero"
import RatgeberHeroImage from "@/components/ratgeber/RatgeberHeroImage"
import RatgeberHighlightBox from "@/components/ratgeber/RatgeberHighlightBox"
import RatgeberInfoTiles from "@/components/ratgeber/RatgeberInfoTiles"
import RatgeberRegionGrid from "@/components/ratgeber/RatgeberRegionGrid"
import RatgeberRelatedArticles from "@/components/ratgeber/RatgeberRelatedArticles"
import RatgeberFinalCTA from "@/components/ratgeber/RatgeberFinalCTA"
import RatgeberTableOfContents from "@/components/ratgeber/RatgeberTableOfContents"
import { FAQItem } from "@/types/faq.types"
import scrollToSection from "@/utils/ratgeber/scrollToSection"
import { getRatgeberBySlug } from "@/lib/ratgeber-registry"
import { createHeroMetaItems } from "@/utils/ratgeber/heroMetaItems"

const sections = [
  { id: "preise", title: "Was kostet ein Pferd beim Pferdekauf 2025?" },
  { id: "bewertung-5-saeulen", title: "5 Säulen der Pferdebewertung beim Pferdekauf" },
  { id: "checkliste", title: "7-Schritte-Checkliste zum Pferdekauf" },
  { id: "red-flags", title: "Red Flags beim Pferdekauf" },
  { id: "anfaenger", title: "Pferd kaufen für Anfänger" },
  { id: "regionen", title: "Regionale Unterschiede beim Pferdekauf" },
  { id: "fehler", title: "Fehler beim Pferdekauf vermeiden" },
  { id: "faire-preise", title: "Faire Preise beim Pferdekauf" },
  { id: "kaufwege", title: "Pferd kaufen Online vs. Händler vs. Privat" },
  { id: "faq", title: "FAQ zum Pferdekauf" },
  { id: "fazit", title: "Fazit: Sicherer Pferdekauf" }
]

const heroMetaItems = createHeroMetaItems([
  {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "15 Min. Lesezeit"
  },
  {
    icon: <Shield className="h-4 w-4" />,
    label: "Aktualisiert Oktober 2025"
  },
  {
    icon: <CheckCircle className="h-4 w-4" />,
    label: "7-Schritte-Checkliste"
  }
])

const priceTiles = [
  {
    title: "Einsteigerbereich",
    value: "1.000 – 5.000 €",
    description: "Freizeitpferde zum Pferdekauf ohne spezielle Ausbildung, ältere Pferde, Beistellpferde."
  },
  {
    title: "Mittelklasse",
    value: "5.000 – 20.000 €",
    description: "Gut ausgebildete Freizeitpferde zum Pferdekauf, Sportpferde mit solider Grundausbildung."
  },
  {
    title: "Profisegment",
    value: "20.000+ €",
    description: "Turnierpferde zum Pferdekauf mit Erfolgen, hochwertige Zuchtpferde, Spezialausbildung."
  }
]

const anfaengerRassen = [
  {
    title: "Haflinger",
    value: "2.500 – 6.000 €",
    description: "Robust, ausgeglichen, gutmütig – ideale Wahl beim Pferdekauf für Anfänger."
  },
  {
    title: "Fjordpferde",
    value: "3.000 – 7.000 €",
    description: "Ruhig, zuverlässig, sozial verträglich mit starkem Will-to-please beim Pferdekauf."
  },
  {
    title: "Quarter Horses",
    value: "3.500 – 10.000 €",
    description: "Gelassen, menschenbezogen, vielseitig beim Pferdekauf einsetzbar."
  },
  {
    title: "Freiberger",
    value: "4.000 – 8.000 €",
    description: "Vielseitig, robust, unkompliziert – ideal beim Pferdekauf für Fahren und Reiten."
  }
]

const regionTiles = [
  {
    title: "Bayern",
    description: "Zucht-Hochburg mit Premium-Preisen beim Pferdekauf. Hochwertige Warmblüter aus renommierten Zuchtlinien. Preise 10-15% über Bundesdurchschnitt."
  },
  {
    title: "Nordrhein-Westfalen",
    description: "Größter deutscher Pferdemarkt für Pferdekauf mit über 300.000 Pferden. Breite Preisspanne, große Auswahl in allen Kategorien."
  },
  {
    title: "Niedersachsen",
    description: "Hannoveraner-Heimat mit erstklassigen Sportpferden zum Pferdekauf. Preise im oberen Segment für hochwertige Turnierpferde."
  },
  {
    title: "Schleswig-Holstein",
    description: "Holsteiner Zucht weltbekannt – beim Pferdekauf für exzellente Springpferde. Moderate Preise bei hoher Qualität."
  }
]

// SEO-optimized FAQ data - synced with schema-faq.json
const faqItems: FAQItem[] = [
  {
    question: "Was kostet ein Pferd im Durchschnitt?",
    answer: "Der Kaufpreis variiert stark je nach Disziplin und Ausbildungsstand: Freizeitpferde kosten €2,500-8,000, Dressurpferde €8,000-25,000, Springpferde €10,000-50,000+. Zusätzlich zum Kaufpreis fallen jährliche Kosten von €3,000-6,000 für Unterbringung, Futter, Tierarzt und Hufschmied an."
  },
  {
    question: "Was sollte man beim Pferdekauf beachten?",
    answer: "Die Top-Tipps beim Pferdekauf sind diese 6 Punkte: 1) Durchführung einer professionellen Ankaufsuntersuchung (AKU), 2) Mehrfaches Probereiten unter verschiedenen Bedingungen, 3) Prüfung aller Papiere und Dokumente, 4) Objektive Pferdebewertung (z.B. mit AI-Tools), 5) Schriftlicher Kaufvertrag mit allen Details, 6) Vermeidung von Red Flags wie unrealistisch niedrigen Preisen oder fehlenden Papieren."
  },
  {
    question: "Wie läuft eine Ankaufsuntersuchung (AKU) ab?",
    answer: "Eine AKU beim Pferdekauf umfasst mehrere Komponenten: 1) Klinische Untersuchung (Allgemeinzustand, Herzfrequenz, Atmung), 2) Röntgenaufnahmen der Gliedmaßen, 3) Blutuntersuchung auf Substanzen, 4) Bewegungsanalyse an der Longe und unter dem Reiter, 5) Beurteilung der Belastbarkeit. Die Kosten liegen zwischen €150-500 je nach Umfang. Eine AKU sollte immer von einem unabhängigen Tierarzt durchgeführt werden."
  },
  {
    question: "Wo kann man seriös und sicher ein Pferd kaufen?",
    answer: "Seriöse Kaufmöglichkeiten umfassen: 1) Spezialisierte Online-Plattformen wie ehorses.de, 2) Lokale Pferdehöfe und Züchter mit gutem Ruf, 3) Reitvereine und Pensionsbetriebe, 4) Pferdebörsen und Auktionen, 5) Empfehlungen von Trainern und Tierärzten. Wichtig ist immer: Persönliche Besichtigung, mehrfaches Probereiten und professionelle AKU durchführen."
  },
  {
    question: "Welche Papiere und Dokumente brauchst du beim Pferdekauf?",
    answer: "Erforderliche Dokumente beim Pferdekauf: 1) Equidenpass (EU-Pflicht mit Identifikation und Impfungen), 2) Abstammungsnachweis/Zuchtpapiere bei Rassepferden, 3) Schriftlicher Kaufvertrag mit allen Details, 4) AKU-Bericht vom Tierarzt, 5) Eigentumsnachweis des Verkäufers, 6) Haftungsausschluss-Vereinbarung (falls gewünscht). Alle Papiere sollten vor Kaufabschluss geprüft werden."
  },
  {
    question: "Was sind die schlimmsten Red Flags beim Pferdekauf?",
    answer: "Warnsignale und Risiken beim Pferdekauf: 1) Unrealistisch niedrige Preise ohne plausible Erklärung, 2) Verkäufer lehnt AKU ab oder drängt zu bestimmtem Tierarzt, 3) Fehlende oder unvollständige Papiere, 4) Pferd ist stark sediert beim Probereiten, 5) Verkäufer verhindert mehrfache Besichtigungen, 6) Keine Informationen zur Vorgeschichte/Gesundheit, 7) Druck zu schneller Kaufentscheidung, 8) Widersprüchliche Angaben zu Alter, Ausbildung oder Leistungen."
  },
  {
    question: "Welche Versicherungen brauchst du nach dem Pferdekauf?",
    answer: "Empfohlene Versicherungen für Pferdebesitzer: 1) Haftpflichtversicherung (€5-15/Monat, deckt Schäden durch das Pferd), 2) OP-Versicherung (€30-80/Monat, übernimmt Operationskosten), 3) Krankenversicherung (optional, €50-150/Monat), 4) Lebensversicherung (optional, bei wertvollen Pferden). Die Haftpflichtversicherung ist besonders wichtig und in vielen Reitbetrieben Pflicht."
  },
  {
    question: "Wie bewertet man ein Pferd beim Pferdekauf objektiv?",
    answer: "Objektive Pferdebewertung erfolgt nach mehreren Kriterien: 1) Rasse und Abstammung (Zuchtlinien, Stammbaum), 2) Ausbildungsstand und Leistungen (Turniererfolge, Ausbildungsniveau), 3) Alter und Gesundheitszustand (AKU-Ergebnis, Vorerkrankungen), 4) Exterieur und Interieur (Körperbau, Charakter), 5) Marktvergleich (aktuelle Verkaufspreise ähnlicher Pferde). PferdeWert.de hilft dir dabei eine objektive Bewertung zu bekommen. Dabei werden alle Bewertungsfaktoren datenbasiert verglichen."
  }
]

const relatedArticles = [
  {
    href: "/pferde-ratgeber/aku-pferd",
    image: getRatgeberBySlug("aku-pferd")?.image || "/images/ratgeber/aku-pferd/hero.webp",
    title: "AKU Pferd: Der komplette Guide",
    badge: "AKU Guide",
    readTime: "12 Min.",
    description: "Alle Fakten zur Ankaufsuntersuchung – ideal zur Vorbereitung auf den Pferdekauf."
  },
  {
    href: "/pferde-ratgeber/pferd-verkaufen",
    image: getRatgeberBySlug("pferd-verkaufen")?.image || "/images/ratgeber/pferd-verkaufen/hero.webp",
    title: "Pferd verkaufen: Optimaler Preis mit KI",
    badge: "Verkauf",
    readTime: "9 Min.",
    description: "Alles für den erfolgreichen Verkauf – Preisstrategie, Inserate und Verhandlung."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/ablauf",
    image: getRatgeberBySlug("aku-pferd/ablauf")?.image || "/images/ratgeber/aku-pferd/ablauf/hero.webp",
    title: "AKU Ablauf verstehen",
    badge: "AKU Guide",
    readTime: "10 Min.",
    description: "Von Vorbereitung bis Befund – so läuft die Ankaufsuntersuchung Schritt für Schritt."
  }
]

const PferdKaufen: NextPage = () => {
  const handleNavigate = (id: string) => scrollToSection(id)

  const handleScrollToToc = () => {
    if (typeof window === "undefined") return
    document.getElementById("inhaltsverzeichnis")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <>
        <Head>
          {/* Primary Meta Tags */}
          <title>Pferd kaufen 2025: Preise, KI-Bewertung & Anfänger-Guide</title>
          <meta
            name="description"
            content="Pferd kaufen 2025: Aktuelle Preise für Anfänger & Profis, KI-gestützte Bewertung, 7-Schritte-Checkliste & Red Flags. Jetzt informieren!"
          />
          <meta
            name="keywords"
            content="pferd kaufen, pferd kaufen anfänger, dressurpferde kaufen, was kostet ein pferd, pferd kaufen preis, pferdebewertung, aku pferd, pferd kaufen checkliste"
          />
          <meta name="author" content="PferdeWert.de" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="content-language" content="de-DE" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/pferd-kaufen" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/pferd-kaufen" />
          <meta property="og:title" content="Pferd kaufen: Der ultimative Ratgeber 2025" />
          <meta property="og:description" content="Pferd kaufen 2025: Aktuelle Preise für Anfänger & Profis, KI-gestützte Bewertung, 7-Schritte-Checkliste & Red Flags. Jetzt informieren!" />
          <meta property="og:image" content="https://pferdewert.de/images/pferd-kaufen-ratgeber-og.jpg" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Pferd kaufen 2025: Preise, KI-Bewertung & Anfänger-Guide" />
          <meta name="twitter:description" content="Pferd kaufen 2025: Aktuelle Preise für Anfänger & Profis, KI-gestützte Bewertung, 7-Schritte-Checkliste & Red Flags." />
          <meta name="twitter:image" content="https://pferdewert.de/images/pferd-kaufen-ratgeber-og.jpg" />

          {/* Article Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "Pferd kaufen: Der ultimative Ratgeber 2025",
                "description": "Alles über Pferdekauf: Preise, Bewertung, AKU, Kaufvertrag & Red Flags. Mit AI-gestütztem Bewertungstool.",
                "author": {
                  "@type": "Organization",
                  "name": "PferdeWert.de"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "PferdeWert.de",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://pferdewert.de/logo.png"
                  }
                },
                "datePublished": "2025-01-05",
                "dateModified": "2025-01-05",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen"
                }
              })
            }}
          />

          {/* HowTo Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Pferd kaufen: 8-Schritt-Anleitung",
                "description": "Professionelle Schritt-für-Schritt-Anleitung zum sicheren Pferdekauf mit Bedarfsanalyse, Budgetplanung, Besichtigung, AKU-Untersuchung und Kaufvertrag.",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://pferdewert.de/images/pferd-kaufen-anleitung.jpg",
                  "width": 1200,
                  "height": 630
                },
                "totalTime": "PT4W",
                "estimatedCost": {
                  "@type": "MonetaryAmount",
                  "currency": "EUR",
                  "value": "2500-50000"
                },
                "supply": [
                  {
                    "@type": "HowToSupply",
                    "name": "Budget für Pferdekauf"
                  },
                  {
                    "@type": "HowToSupply",
                    "name": "Checkliste für Besichtigung"
                  },
                  {
                    "@type": "HowToSupply",
                    "name": "Kontaktdaten unabhängiger Tierarzt für AKU"
                  },
                  {
                    "@type": "HowToSupply",
                    "name": "Kaufvertrag-Vorlage"
                  }
                ],
                "tool": [
                  {
                    "@type": "HowToTool",
                    "name": "PferdeWert.de AI-Bewertungstool"
                  }
                ],
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Bedarfsanalyse durchführen",
                    "text": "Definiere deine Anforderungen genau: Welche Disziplin (Dressur, Springen, Freizeit)? Welches Erfahrungslevel hast du? Welches Budget steht zur Verfügung? Berücksichtige auch die jährlichen Kosten von €3,000-6,000 für Unterbringung, Futter, Tierarzt und Hufschmied.",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#bedarfsanalyse",
                    "image": "https://pferdewert.de/images/bedarfsanalyse.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Budget realistisch planen",
                    "text": "Kalkuliere nicht nur den Kaufpreis (Freizeitpferde €2,500-8,000, Dressurpferde €8,000-25,000, Springpferde €10,000-50,000+), sondern auch Nebenkosten: AKU-Untersuchung (€150-500), Transport (€200-800), Erstausstattung (€500-1,500) und jährliche Unterhaltungskosten (€3,000-6,000).",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#budget",
                    "image": "https://pferdewert.de/images/budgetplanung.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Geeignete Pferde suchen und vorselektieren",
                    "text": "Nutze seriöse Plattformen wie ehorses.de, besuche lokale Pferdehöfe und Züchter mit gutem Ruf, frage in Reitvereinen nach Empfehlungen. Achte bei Online-Inseraten auf vollständige Informationen, realistische Preise und klare Fotos. Erstelle eine Shortlist von 3-5 Pferden für Besichtigungen.",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#pferdesuche",
                    "image": "https://pferdewert.de/images/pferdesuche.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "Mehrfache Besichtigungen und Probereiten",
                    "text": "Besuche jedes Pferd mindestens zweimal zu unterschiedlichen Tageszeiten. Probereiten in verschiedenen Gangarten und Situationen (Halle, Gelände, mit/ohne andere Pferde). Achte auf Verhalten beim Putzen, Satteln, Führen. Nimm einen erfahrenen Reiter oder Trainer mit zur Einschätzung.",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#besichtigung",
                    "image": "https://pferdewert.de/images/probereiten.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 5,
                    "name": "Professionelle Ankaufsuntersuchung (AKU) durchführen",
                    "text": "Beauftrage einen unabhängigen Tierarzt (nicht den Stallveterinär) für eine umfassende AKU. Diese umfasst: Klinische Untersuchung (Herz, Lunge, Allgemeinzustand), Röntgenaufnahmen der Gliedmaßen, Blutuntersuchung auf Substanzen, Bewegungsanalyse an der Longe und unter dem Reiter. Kosten: €150-500 je nach Umfang.",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#aku",
                    "image": "https://pferdewert.de/images/aku-untersuchung.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 6,
                    "name": "Objektive Bewertung des Pferdewertes",
                    "text": "Nutze moderne Bewertungsmethoden zur objektiven Preiseinschätzung: AI-gestützte Tools wie PferdeWert.de analysieren Rasse, Alter, Ausbildungsstand, Gesundheitszustand und Marktvergleiche. Vergleiche mit aktuellen Verkaufspreisen ähnlicher Pferde. Berücksichtige das AKU-Ergebnis bei der Wertermittlung.",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#bewertung",
                    "image": "https://pferdewert.de/images/bewertung.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 7,
                    "name": "Preisverhandlung und schriftlicher Kaufvertrag",
                    "text": "Verhandle fair basierend auf objektiver Bewertung und AKU-Ergebnis. Erstelle einen detaillierten schriftlichen Kaufvertrag mit: Kaufpreis, Zahlungsmodalitäten, Identifikation des Pferdes (Equidenpass-Nummer), Gesundheitszustand laut AKU, Gewährleistungsausschlüsse, Rücktrittsrechte, Übergabedatum. Beide Parteien unterschreiben.",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#kaufvertrag",
                    "image": "https://pferdewert.de/images/kaufvertrag.jpg"
                  },
                  {
                    "@type": "HowToStep",
                    "position": 8,
                    "name": "Übergabe, Versicherung und Transport organisieren",
                    "text": "Organisiere vor Übergabe: Haftpflichtversicherung abschließen (€5-15/Monat, oft Pflicht), optional OP-Versicherung (€30-80/Monat), professionellen Transport buchen (€200-800 je nach Entfernung), Stallplatz reservieren. Bei Übergabe: Equidenpass prüfen, Abstammungsnachweis mitnehmen, Futter-/Pflegegewohnheiten erfragen.",
                    "url": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen#uebergabe",
                    "image": "https://pferdewert.de/images/uebergabe.jpg"
                  }
                ]
              })
            }}
          />

          {/* BreadcrumbList Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Startseite",
                    "item": "https://pferdewert.de"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Ratgeber",
                    "item": "https://pferdewert.de/pferde-ratgeber"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Pferd kaufen",
                    "item": "https://pferdewert.de/pferde-ratgeber/pferd-kaufen"
                  }
                ]
              })
            }}
          />

          {/* FAQPage Schema */}
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
        </Head>

        <RatgeberHero
          badgeLabel="Ultimativer Kaufratgeber"
          badgeIcon={<TrendingUp className="h-4 w-4" />}
          title="Pferd kaufen: Der ultimative Ratgeber für 2025"
          subtitle="Von der realistischen Budgetplanung über die Auswahl seriöser Plattformen bis zur professionellen Ankaufsuntersuchung – dieser umfassende Guide führt dich durch jeden Schritt zum Traumpferd."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Jetzt Pferdewert berechnen",
            icon: <ArrowRight className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: <ChevronDown className="h-5 w-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src={getRatgeberBySlug('pferd-kaufen')?.image || '/images/ratgeber/pferd-kaufen/hero.webp'}
          alt="Pferd kaufen – der ultimative Ratgeber für 2025"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            {/* Einleitung */}
            <section className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Du möchtest ein Pferd kaufen und suchst nach Expertise? Du fragst dich, worauf es wirklich ankommt? Du bist nicht allein: Über{" "}
                <strong>40.000 Menschen suchen monatlich</strong> nach &quot;pferd kaufen&quot;.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>100% der Top-10-Suchergebnisse</strong> sind Marktplätze mit tausenden Inseraten, aber{" "}
                <strong>kein einziger Ratgeber</strong>, der dir die entscheidenden Fragen beantwortet: Was kostet ein Pferd wirklich?
                Welche Faktoren beeinflussen den Preis? Und wie erkenne ich ein faires Angebot?
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unsere Analyse zeigt: <strong>75% aller Fragen drehen sich um Preise und Kosten</strong> –
                genau hier setzt dieser Ratgeber an.
              </p>
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="font-semibold mb-3">Was dich in diesem Pferdekauf-Guide erwartet:</p>
                <ul className="space-y-2 list-disc list-inside ml-2">
                  <li>Realistische Preisübersichten nach Rasse und Ausbildung</li>
                  <li>Die 5 Säulen der professionellen Pferdebewertung</li>
                  <li>Schritt-für-Schritt-Kaufprozess vom ersten Kontakt bis zum Vertrag</li>
                  <li>Regionale Marktunterschiede in Deutschland</li>
                  <li>Red Flags: So erkennst du unseriöse Angebote</li>
                  <li>8 FAQ-Antworten auf die wichtigsten Käuferfragen</li>
                </ul>
              </div>
            </section>

            {/* Preisübersicht 2025 */}
            <section id="preise" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand"><Link href="/pferde-ratgeber/pferd-kaufen#preise" className="text-brand-brown hover:underline">Was kostet ein Pferd? Preisübersicht 2025</Link></h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die erste und wichtigste Frage: <strong>Was kostet ein Pferd beim Pferdekauf wirklich?</strong> Die Preise beim erfolgreichen Pferdekauf variieren erheblich – von unter 1.000 Euro für ältere Freizeitpferde bis weit über 20.000 Euro für Turnierpferde. Um realistische Erwartungen zu entwickeln, solltest du die aktuellen Marktpreise kennen:
              </p>

              <RatgeberInfoTiles headline="Preisklassen beim Pferdekauf nach Verwendungszweck" tiles={priceTiles} />

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
                Was macht den riesigen Preisunterschied beim Pferdekauf aus?
              </h3>

              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  <strong>Ausbildungsstand:</strong> Ein rohes 3-jähriges Pferd kostet deutlich weniger als ein turniererfahrenes 8-jähriges mit A-Dressur-Erfolgen. Jeder Ausbildungsschritt erhöht den Wert spürbar.
                </li>
                <li>
                  <strong>Gesundheitszustand:</strong> Pferde mit positiver Ankaufsuntersuchung (AKU) und aktuellen Röntgenbildern erzielen 20-30% höhere Preise. Vorerkrankungen können den Wert um 30-50% senken.
                </li>
                <li>
                  <strong>Rasse und Abstammung:</strong> Warmblüter aus bekannten Zuchtlinien (z.B. erfolgreiche Hengstlinien) sind teurer als Kleinpferde oder Pferde ohne Papiere. Die Abstammung kann den Preis um 2.000€ bis 5.000€ erhöhen.
                </li>
                <li>
                  <strong><Link href="/pferde-ratgeber/pferd-kaufen#anfaenger" className="text-brand-brown hover:underline">Charakter</Link>:</strong> Anfängerfreundliche, nervensichere Pferde mit unkompliziertem Wesen haben einen Aufpreis von 15-25%. Ein guter Charakter ist gerade für Freizeitreiter oft wichtiger als sportliche Leistung.
                </li>
                <li>
                  <strong>Turniererfolge:</strong> Nachweisbare Platzierungen auf A-Niveau steigern den Wert um 2.000€ bis 3.000€. Pferde mit L-Erfolgen können deutlich mehr kosten.
                </li>
              </ul>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
                <Link href="/pferde-ratgeber/pferd-kaufen#regionen" className="text-brand-brown hover:underline">Regionale Preisunterschiede</Link> in Deutschland
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Der Standort beeinflusst den Pferdemarkt erheblich. In traditionellen Zuchtregionen mit hoher Pferdedichte sind die Preise anders strukturiert als in Großstadtnähe oder strukturschwachen Gebieten:
              </p>

              <ul className="space-y-3 text-gray-700 leading-relaxed mt-4">
                <li>
                  <strong>Bayern:</strong> Premium-Segment mit 10-15% höheren Preisen. Grund: Starke Zuchttraditionen (v.a. Warmblüter), wohlhabende Kundschaft, hohe Qualitätsansprüche.
                </li>
                <li>
                  <strong>Norddeutschland (Niedersachsen, Schleswig-Holstein):</strong> Etablierte Zuchtregionen mit Preisniveau leicht über Bundesdurchschnitt (+5-10%). Große Auswahl an Sportpferden durch Hannoveraner- und Holsteiner-Zucht.
                </li>
                <li>
                  <strong>NRW und Rheinland:</strong> Größter deutscher Pferdemarkt mit breiter Preisspanne. Durchschnittspreise auf Bundesniveau, aber enorme Auswahl in allen Kategorien.
                </li>
              </ul>

              <div className="mt-6 p-4 bg-brand-light rounded-lg border-l-4 border-brand">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-brand-brown">Tipp:</strong> Berechne den fairen Marktwert deines Wunschpferdes inklusive regionaler Faktoren mit unserem{" "}
                  <Link href="/pferde-preis-berechnen" className="text-brand-brown font-semibold hover:underline">
                    KI-gestützten Preisrechner
                  </Link>
                  .
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                Die große Preisspanne macht deutlich: Ohne Marktkenntnisse riskieren Sie, mehrere tausend Euro zu viel zu
                bezahlen. Mit <Link href="/" className="text-brand-brown font-semibold hover:underline">PferdeWert.de</Link> können Sie in nur 2 Minuten den fairen Marktwert eines Pferdes berechnen lassen –
                basierend auf modernster KI-Technologie und aktuellen Marktdaten.
              </p>
            </section>

            {/* 5 Säulen der Pferdebewertung */}
            <section id="bewertung-5-saeulen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                <Link href="/pferde-ratgeber/pferd-kaufen#bewertung-5-saeulen" className="text-brand-brown hover:underline">Die 5 Säulen der Pferdebewertung</Link>: So wird der Wert ermittelt
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Beim Pferdekauf basiert eine professionelle Bewertung auf fünf zentralen Säulen, die gemeinsam den fairen Marktwert bestimmen. Diese Faktoren werden von Tierärzten, Ausbildern und Sachverständigen herangezogen – und bilden auch die Grundlage für die KI-gestützte Bewertung bei PferdeWert.de.
              </p>

              {/* Säule 1: Gesundheitszustand */}
              <ContentSection
                title="Säule 1 beim Pferdekauf: Gesundheitszustand – Die wichtigste Grundlage"
                icon="🏥"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Der Gesundheitszustand ist beim Pferdekauf das Fundament aller Bewertungen. Beim Pferdekauf: Ein gesundes Pferd entfaltet sein volles Potenzial – ein krankes Pferd verliert dramatisch an Wert, unabhängig von Ausbildung oder Abstammung.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Was eine <Link href="/pferde-ratgeber/aku-pferd" className="text-brand-brown hover:underline">AKU (Ankaufsuntersuchung)</Link> bewertet:</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Bewegungsapparat:</strong> Lahmheiten, Arthrose, Sehnenschäden, Hufrollenprobleme</li>
                      <li>• <strong>Atmungsorgane:</strong> Dämpfigkeit, chronischer Husten, Atemwegserkrankungen</li>
                      <li>• <strong>Herz-Kreislauf-System:</strong> Herzgeräusche, Belastbarkeit</li>
                      <li>• <strong>Augen:</strong> Grauer Star, Mondblindheit, Sehschwächen</li>
                      <li>• <strong>Zähne:</strong> Zahnfehlstellungen, die Futteraufnahme beeinträchtigen</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Einfluss auf den Wert:</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Positive AKU ohne Befund: +0% bis +15%</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Ein klinisch unauffälliges Pferd mit positiver AKU und guten Röntgenbildern erzielt Aufpreise von 10-15% gegenüber nicht geprüften Pferden. Käufer zahlen gerne mehr für Sicherheit.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Leichte Befunde: -10% bis -25%</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Kleine röntgenologische Veränderungen ohne aktuelle Lahmheit (z.B. leichte Arthrose) mindern den Wert. Käufer kalkulieren zukünftige Tierarztkosten ein.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Schwere Befunde: -40% bis -70%</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Chronische Erkrankungen wie Dämpfigkeit, Hufrollenentzündung oder wiederkehrende Lahmheiten machen das Pferd nur noch eingeschränkt nutzbar. Der Wert sinkt massiv.
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Merke:</strong> Die <Link href="/pferde-ratgeber/aku-pferd" className="text-brand-brown font-semibold hover:underline">AKU</Link> ist keine Garantie für ewige Gesundheit, aber sie zeigt den aktuellen Zustand objektiv. Ohne AKU kaufst du ein erhebliches Gesundheitsrisiko mit.
                    </p>
                  </div>
                }
              />

              {/* Säule 2: Ausbildung und Reitbarkeit */}
              <ContentSection
                title="Säule 2 beim Pferdekauf: Ausbildung und Reitbarkeit – Der Leistungsfaktor"
                icon="🎓"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Ein rohes 3-jähriges Pferd und ein turniererfahrenes 8-jähriges mit L-Dressur-Erfolgen mögen dieselbe Abstammung haben – der Wertunterschied beträgt dennoch 8.000€ bis 15.000€. Die Ausbildung ist der größte Werttreiber nach der Gesundheit.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Ausbildungsstufen und Wertsteigerung:</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Roh / Jungpferd (3-4 Jahre): Basiswert</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Noch nicht angeritten, braucht weitere Ausbildung. Wert richtet sich nach Abstammung, Potenzial und Gesundheit.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Angeritten / Grundausbildung: +2.000€ bis +4.000€</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Pferd kennt Sattel, Reiter, Grundgangarten und einfache Übungen. Anfängertauglich bei gutem Charakter.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Solide E-/A-Ausbildung: +4.000€ bis +7.000€</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Pferd beherrscht Dressur-Grundlagen, ist sicher im Gelände, hat erste Turniererfahrung. Vielseitig einsetzbar.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">L-Niveau und höher: +8.000€ bis +25.000€+</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Turniererfahrung auf L-Niveau oder höher, nachweisbare Platzierungen, hochspezialisierte Ausbildung (Dressur, Springen, Vielseitigkeit).
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Zusätzliche Ausbildungsfaktoren:</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Geländesicherheit:</strong> Pferde, die sicher im Gelände sind, erzielen 10-15% höhere Preise bei Freizeitreitern</li>
                      <li>• <strong>Verladetraining:</strong> Pferde, die problemlos verladen, sparen Zeit und Nerven – Aufpreis ca. 5%</li>
                      <li>• <strong>Schmiede-Bravheit:</strong> Pferde, die beim Hufschmied kooperativ sind, sind beliebter</li>
                      <li>• <strong>Bodenarbeit:</strong> Zusatzqualifikationen wie Freiarbeit, Zirkuslektionen erhöhen den Wert bei speziellen Zielgruppen</li>
                    </ul>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Wichtig:</strong> Selbst das beste Training zählt nichts, wenn die Gesundheit fehlt. Ausbildung steigert den Wert nur bei gesunden Pferden nachhaltig.
                    </p>
                  </div>
                }
              />

              {/* Säule 3: Charakter und Temperament */}
              <ContentSection
                title="Säule 3 beim Pferdekauf: Charakter und Temperament – Der wichtige Faktor"
                icon="💚"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Ein 6-jähriges Warmblut mit A-Dressur kann 5.000€ kosten – oder 12.000€. Was den Unterschied macht? Oft der Charakter. Ein nervensicheres, ausgeglichenes Pferd mit &quot;Will-to-please&quot; ist für viele Käufer mehr wert als ein schwieriges Hochleistungspferd.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Positiver Charakter: Das erhöht den Wert</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Anfängertauglich:</strong> Geduldig, fehlerverzeihend, ruhig → Aufpreis 15-25%</li>
                      <li>• <strong>Nervensicher:</strong> Gelassen im Straßenverkehr, bei Lärm, in neuen Situationen → Aufpreis 10-15%</li>
                      <li>• <strong>Sozialverträglich:</strong> Kommt mit anderen Pferden klar, keine Aggressivität → Aufpreis 5-10%</li>
                      <li>• <strong>Handling-freundlich:</strong> Lässt sich problemlos führen, putzen, verladen → Aufpreis 5-10%</li>
                      <li>• <strong>Menschenbezogen:</strong> Sucht Kontakt, &quot;Will-to-please&quot;-Mentalität → Aufpreis 10-15%</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Negativer Charakter: Das senkt den Wert</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Schreckhaftigkeit:</strong> Ständiges Scheuen, nervöses Verhalten → Abschlag 15-30%</li>
                      <li>• <strong>Dominanz/Sturheit:</strong> Ignoriert Hilfen, setzt eigenen Willen durch → Abschlag 20-35%</li>
                      <li>• <strong>Aggressivität:</strong> Beißen, Schlagen, Drohen → Abschlag 30-50%</li>
                      <li>• <strong>Verladeschwierigkeiten:</strong> Pferd lässt sich nicht verladen → Abschlag 10-20%</li>
                      <li>• <strong>Boxenunruhe:</strong> Weben, Koppen, Unruhe → Abschlag 15-25%</li>
                    </ul>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Tipp:</strong> Der Charakter zeigt sich oft erst bei mehrfachen Besuchen und Proberitten. Lass dir Zeit und beobachte das Pferd in unterschiedlichen Situationen: beim Putzen, beim Satteln, im Gelände, in der Halle.
                    </p>
                  </div>
                }
              />

              {/* Säule 4: Exterieur und Interieur */}
              <ContentSection
                title="Säule 4 beim Pferdekauf: Exterieur und Interieur – Optik und Potenzial"
                icon="🐴"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      &quot;Ein schönes Pferd verkauft sich leichter&quot; – das ist mehr als nur ein Spruch. Das Exterieur (äußere Erscheinung) und Interieur (innere Qualitäten wie Bewegungsablauf) beeinflussen sowohl den aktuellen Wert als auch das zukünftige Potenzial.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Exterieur-Merkmale, die den Wert steigern:</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Korrekte Gliedmaßenstellung:</strong> Gerade Beine ohne X-/O-Beinigkeit → Aufpreis 5-10%</li>
                      <li>• <strong>Edles Erscheinungsbild:</strong> Harmonische Proportionen, &quot;Hingucker&quot;-Optik → Aufpreis 10-20%</li>
                      <li>• <strong>Gute Bemuskelung:</strong> Topline, Rückenmuskulatur, athletischer Körperbau → Aufpreis 5-10%</li>
                      <li>• <strong>Ausdrucksstarker Kopf:</strong> Große Augen, edle Züge (v.a. bei Zucht- und Showpferden) → Aufpreis 5-15%</li>
                      <li>• <strong>Gesunde Hufe:</strong> Große, gut geformte Hufe mit korrekter Stellung → Aufpreis 5%</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Interieur-Merkmale, die den Wert steigern:</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Raumgreifende Gänge:</strong> Aktive Hinterhand, Schwung, Kadenz → Aufpreis 10-20%</li>
                      <li>• <strong>Taktreinheit:</strong> Klarer, gleichmäßiger Takt in allen Gangarten → Aufpreis 5-10%</li>
                      <li>• <strong>Springvermögen:</strong> Natürliche Springanlage mit guter Technik → Aufpreis 15-30% (bei Springpferden)</li>
                      <li>• <strong>Balance und Geschmeidigkeit:</strong> Leichtfüßigkeit, gute Biegsamkeit → Aufpreis 10-15%</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Exterieur-Mängel, die den Wert senken:</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Fehlstellungen:</strong> X-Beine, O-Beine, kuhhessig → Abschlag 15-30%</li>
                      <li>• <strong>Rückenprobleme:</strong> Senkrücken, Karpfenrücken → Abschlag 20-40%</li>
                      <li>• <strong>Schlechte Hufe:</strong> Zu kleine, deformierte oder brüchige Hufe → Abschlag 10-20%</li>
                      <li>• <strong>Kurzer Hals:</strong> Eingeschränkte Aufrichtung, schlechte Anlehnung → Abschlag 5-15%</li>
                    </ul>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Wichtig:</strong> Exterieur-Mängel lassen sich nicht beheben. Gesundheit und Charakter haben Vorrang – aber bei zwei gleich gesunden, charakterstarken Pferden entscheidet das Exterieur über den Preis.
                    </p>
                  </div>
                }
              />

              {/* Säule 5: Marktfähigkeit und Preistrends */}
              <ContentSection
                title="Säule 5 beim Pferdekauf: Marktfähigkeit und Preistrends – Der Zeitfaktor"
                icon="📊"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Der Pferdemarkt unterliegt Trends, Moden und saisonalen Schwankungen. Ein Barockpferd kann heute 12.000€ wert sein – vor fünf Jahren waren es vielleicht nur 7.000€. Die Marktfähigkeit bestimmt, wie leicht sich ein Pferd verkaufen lässt und welchen Preis es erzielt.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Faktoren, die die Marktfähigkeit erhöhen:</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Trendige Rassen:</strong> Barockpferde, Isländer, Friesen erleben Hochphasen → Aufpreis 10-30%</li>
                      <li>• <strong>Vielseitige Einsetzbarkeit:</strong> Pferde, die für Freizeit UND Sport taugen → Aufpreis 10-15%</li>
                      <li>• <strong>Kompakte Größe:</strong> Pferde um 155-165 cm Stockmaß sind universell reitbar → Aufpreis 5-10%</li>
                      <li>• <strong>Papiere und Abstammung:</strong> Zuchtbuch-Eintragung, bekannte Hengstlinien → Aufpreis 10-25%</li>
                      <li>• <strong>Geeignet für Reitschulen:</strong> Robuste, geduldige Pferde mit guter Ausbildung → Aufpreis 10-20%</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Faktoren, die die Marktfähigkeit senken:</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Zu große Pferde:</strong> Über 175 cm Stockmaß – für viele Reiter zu groß → Abschlag 10-20%</li>
                      <li>• <strong>Sehr alte Pferde:</strong> Über 18 Jahre – begrenzte Nutzungsdauer → Abschlag 30-50%</li>
                      <li>• <strong>Seltene Rassen ohne Nachfrage:</strong> Schwer vermittelbar → Abschlag 15-30%</li>
                      <li>• <strong>Spezialausbildung ohne breite Zielgruppe:</strong> Z.B. nur Fahren oder nur Zucht → Abschlag 10-20%</li>
                      <li>• <strong>Fehlende Papiere:</strong> Keine Abstammungsnachweise, kein Zuchtbucheintrag → Abschlag 15-25%</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Saisonale Preisschwankungen:</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Frühjahr (März-Mai): Hochsaison</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Viele Käufer starten die Saison. Höchste Nachfrage, Preise liegen 5-10% über Jahresdurchschnitt.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Herbst (September-Oktober): Zwischenhoch</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Letzte Chance vor dem Winter. Moderate Nachfrage, Preise nahe Jahresdurchschnitt.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Winter (November-Februar): Nebensaison</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Weniger Käufer, Verkäufer unter Druck. Preise 5-15% unter Jahresdurchschnitt – beste Zeit für Schnäppchen.
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Tipp:</strong> Wenn du zeitlich flexibel bist, nutze die Wintersaison für den Kauf. Verkäufer sind verhandlungsbereiter, und du hast mehr Zeit für Proberitte.
                    </p>
                  </div>
                }
              />

              {/* Warum professionelle Bewertung wichtig ist */}
              <div className="mt-8 space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
                  Warum eine professionelle Bewertung beim Pferdekauf so wichtig ist
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Diese fünf Säulen greifen ineinander. Ein Pferd mit perfekter Gesundheit (Säule 1), aber schlechtem Charakter (Säule 3) ist deutlich weniger wert als ein Pferd, das in allen Bereichen durchschnittlich abschneidet. Die richtige Gewichtung und Kombination dieser Faktoren erfordert Erfahrung – oder eine KI, die auf tausenden realen Verkaufsfällen trainiert wurde.
                </p>

                <p className="text-gray-700 leading-relaxed">
                  <strong>Das Problem:</strong> Die meisten Käufer haben nicht die Expertise, alle fünf Säulen objektiv zu bewerten. Verkäufer überschätzen ihr Pferd aus emotionaler Bindung. Händler setzen Preise mit Gewinnmarge an. Du brauchst eine unabhängige, datenbasierte Einschätzung.
                </p>
              </div>

              {/* CTA Box */}
              <div className="mt-8 bg-gradient-to-br from-amber-50 to-white border-2 border-brand-brown/20 rounded-xl p-6 md:p-8">
                <h4 className="text-2xl font-serif font-bold text-brand mb-4">
                  KI-gestützte Bewertung vs. traditionelle Schätzung
                </h4>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="font-semibold text-brand-brown mb-2">Traditionelle Schätzung:</h5>
                    <ul className="space-y-2 text-gray-700 leading-relaxed text-sm">
                      <li>• Subjektiv und emotional geprägt</li>
                      <li>• Kostet 150€-300€ für Gutachter</li>
                      <li>• Dauert 3-5 Tage</li>
                      <li>• Basiert auf Einzelmeinung</li>
                      <li>• Berücksichtigt keine aktuellen Marktdaten</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-brand-brown mb-2">PferdeWert.de KI-Bewertung:</h5>
                    <ul className="space-y-2 text-gray-700 leading-relaxed text-sm">
                      <li>• Objektiv und datenbasiert</li>
                      <li>• Transparent & nachvollziehbar</li>
                      <li>• Ergebnis in 2 Minuten</li>
                      <li>• Basiert auf tausenden Verkaufsfällen</li>
                      <li>• Berücksichtigt aktuelle Markttrends</li>
                    </ul>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Unser KI-Algorithmus bewertet alle fünf Säulen gleichzeitig, gewichtet sie nach ihrer Bedeutung für deinen spezifischen Fall und vergleicht das Ergebnis mit aktuellen Marktdaten. So erhältst du in Minuten, was traditionell Tage dauert – und das zu einem Bruchteil der Kosten.
                </p>

                <Link
                  href="/pferde-preis-berechnen"
                  className="inline-flex items-center gap-2 bg-brand-brown text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-brown/90 transition-colors"
                >
                  Jetzt Pferdewert berechnen
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </section>

            {/* 7-Schritte-Checkliste */}
            <section id="checkliste" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Die 7-Schritte-Checkliste: So kaufst Du Dein Traumpferd
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Der strukturierte Ablauf beim erfolgreichen Pferdekauf verhindert teure Fehler und emotionale Spontankäufe. Folge dieser
                bewährten Checkliste:
              </p>

              {/* Schritt 1 */}
              <ContentSection
                title="Schritt 1: Budget beim Pferdekauf und Folgekosten kalkulieren"
                icon="1️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Der Kaufpreis beim Pferdekauf ist nur der Anfang. Die <Link href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand-brown font-semibold hover:underline">laufenden Kosten für Pferdehaltung</Link> übersteigen den Anschaffungspreis
                      oft bereits im ersten Jahr:
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Monatliche Fixkosten</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Stallmiete:</strong> 200€ bis 600€ je nach Region und Ausstattung</li>
                      <li>• <strong>Futter und Einstreu:</strong> 100€ bis 200€ (Heu, Kraftfutter, Mineralfutter, Stroh)</li>
                      <li>• <strong>Versicherung:</strong> 15€ bis 50€ (Haftpflicht obligatorisch, OP-Versicherung empfohlen)</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Regelmäßige Kosten</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Hufschmied:</strong> 40€ bis 120€ alle 6-8 Wochen</li>
                      <li>• <strong>Tierarzt (Routine):</strong> 500€ bis 1.500€ pro Jahr</li>
                      <li>• <strong>Reitunterricht:</strong> 30€ bis 60€ pro Stunde</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Einmalige/unregelmäßige Kosten</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Sattel und Trense:</strong> 800€ bis 3.000€</li>
                      <li>• <strong>Decken, Putzzeug, Ausrüstung:</strong> 300€ bis 800€</li>
                      <li>• <strong>Notfall-Reserve:</strong> 1.000€ bis 3.000€ für unvorhergesehene Tierarztkosten</li>
                    </ul>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      Rechnen Sie mit <strong>4.000€ bis 8.000€ laufenden Kosten pro Jahr</strong> – zusätzlich zum Kaufpreis.
                      Unsere <Link href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand-brown font-semibold hover:underline">detaillierte Übersicht der Pferdehaltungskosten</Link> hilft Ihnen bei der realistischen Budgetplanung.
                      Stellen Sie sicher, dass Ihr Budget diese Summen dauerhaft tragen kann.
                    </p>
                  </div>
                }
              />

              {/* Schritt 2 */}
              <ContentSection
                title="Schritt 2: Anforderungen für Ihren Pferdekauf"
                icon="2️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Bevor Sie mit der Suche beginnen, klären Sie diese essentiellen Fragen:
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Ihr Erfahrungslevel beim Pferdekauf</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• Anfänger brauchen ein erfahrenes, ausgeglichenes Pferd</li>
                      <li>• Fortgeschrittene können jüngere oder anspruchsvollere Pferde bewältigen</li>
                      <li>• Profis können auch Problempferde oder junge Pferde ausbilden</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Verwendungszweck</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• Freizeitreiten (Ausritte, leichte Dressur)</li>
                      <li>• Turnierreiten (Dressur, Springen, Vielseitigkeit)</li>
                      <li>• Zucht (Stutenmaterial, Deckhengste)</li>
                      <li>• Bodenarbeit und Horsemanship</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Ideales Alter</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• 3-5 Jahre: jung, braucht weitere Ausbildung</li>
                      <li>• 6-12 Jahre: beste Jahre, voll leistungsfähig</li>
                      <li>• 13-18 Jahre: erfahren, oft ruhiger</li>
                      <li>• 19+ Jahre: Freizeitpferde, günstigere Rentner-Pferde</li>
                    </ul>

                    <p className="text-gray-700 leading-relaxed font-medium">
                      Je klarer Ihre Anforderungen, desto gezielter können Sie suchen und desto schneller finden Sie das passende
                      Pferd.
                    </p>
                  </div>
                }
              />

              {/* Schritt 3 */}
              <ContentSection
                title="Schritt 3: Seriöse Verkaufsplattformen beim Pferdekauf"
                icon="3️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Die großen Online-Pferdemarktplätze zum Pferdekauf bieten die größte Auswahl:
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Top Pferdemarkt-Plattformen</h3>
                    <ul className="space-y-3 text-gray-700 leading-relaxed">
                      <li>
                        <strong>ehorses.de:</strong> Größter europäischer Pferdemarkt mit über 19.000 Verkaufspferden. Detaillierte
                        Suchfilter nach Rasse, Alter, Preis, Stockmaß und Region.
                      </li>
                      <li>
                        <strong>pferde.de:</strong> Etabliertes deutsches Pferdeportal mit Kleinanzeigen und Community-Funktionen.
                        Private Anbieter und professionelle Händler.
                      </li>
                      <li>
                        <strong>billyrider.de:</strong> Gezielt an Reiter-Community mit Fokus auf Freizeitpferde und praktischen
                        Filterfunktionen.
                      </li>
                      <li>
                        <strong>kleinanzeigen.de:</strong> Regionale Nähe, oft Privatverkäufe aus der Umgebung.
                      </li>
                      <li>
                        <strong>Lokale Züchter und Händler:</strong> Persönliche Beratung, Gewährleistung, oft bereits durchgeführte
                        AKU. Preise meist 10-20% höher.
                      </li>
                    </ul>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Kritischer Tipp:</strong> Bevor Sie in Kaufverhandlungen gehen, sollten Sie wissen, ob der angebotene Preis fair ist. Mit der
                      KI-Bewertung von PferdeWert.de erhalten Sie in 2 Minuten eine objektive Einschätzung des Marktwerts. So
                      starten Sie die Verhandlung mit klarem Preiswissen und vermeiden Überzahlung.
                    </p>
                  </div>
                }
              />

              {/* Schritt 4 */}
              <ContentSection
                title="Schritt 4: Besichtigung beim Pferdekauf professionell vorbereiten"
                icon="4️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Die erste Besichtigung entscheidet oft über Kauf oder Absage. Bereiten Sie sich gründlich vor:
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Checkliste für die Besichtigung</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• Nehmen Sie eine erfahrene Person mit (Reitlehrer, Trainer, erfahrener Reiter)</li>
                      <li>• Beobachten Sie das Pferd zunächst in der Box und auf der Weide</li>
                      <li>• Lassen Sie den Verkäufer das Pferd putzen, satteln und vorführen</li>
                      <li>• Achten Sie auf Handling: Ist das Pferd beim Führen, Putzen und Satteln brav?</li>
                      <li>• Beobachten Sie Gang und Bewegung an der Hand (alle Gangarten)</li>
                      <li>• Lassen Sie den Verkäufer das Pferd zuerst reiten</li>
                      <li>• Vereinbaren Sie einen Probetermin zum Selbereiten</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Proberitte beim Pferdekauf organisieren</h3>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Bestehen Sie auf mindestens einen, besser zwei Probetermine an verschiedenen Tagen. Testen Sie das Pferd in
                      verschiedenen Situationen:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• In der Halle/auf dem Platz</li>
                      <li>• Im Gelände</li>
                      <li>• In allen Gangarten</li>
                      <li>• Bei leichten Übungen passend zum Ausbildungsstand</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Warnsignale ernst nehmen</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• Pferd ist schwer einzufangen oder zu satteln</li>
                      <li>• Verkäufer verweigert Proberitte oder will dabei bleiben</li>
                      <li>• Pferd zeigt Ängstlichkeit oder Aggressivität</li>
                      <li>• Unklare Aussagen zu Vorerkrankungen oder Geschichte</li>
                      <li>• Verkäufer drängt zu schneller Kaufentscheidung</li>
                    </ul>
                  </div>
                }
              />

              {/* Schritt 5 */}
              <ContentSection
                title="Schritt 5: Ankaufsuntersuchung (AKU) durchführen"
                icon="5️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Die Ankaufsuntersuchung ist der wichtigste Schritt zum Schutz vor Fehlkäufen. <strong>Niemals sollten Sie ein
                      Pferd ohne AKU kaufen.</strong>
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Was ist eine AKU?</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Eine Ankaufsuntersuchung ist eine veterinärmedizinische Untersuchung, die den Gesundheitszustand eines Pferdes
                      vor dem Kauf objektiv bewertet. Ein Tierarzt prüft das Pferd systematisch auf Erkrankungen, Verletzungen und
                      Mängel.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">AKU-Varianten und Kosten</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Kleine AKU: 150€ – 250€</h4>
                        <p className="text-gray-700 leading-relaxed">Klinische Untersuchung ohne Röntgen, für günstige Freizeitpferde</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Große AKU: 400€ – 600€</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Inklusive Röntgen der wichtigsten Gliedmaßen, Standard für Turnierpferde
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-brand-brown mb-1">Erweiterte AKU: 800€ – 1.200€</h4>
                        <p className="text-gray-700 leading-relaxed">
                          Zusätzlich Ultraschall, Endoskopie, Blutbild – für teure Sportpferde
                        </p>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Worauf die AKU achtet</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• Herz und Lunge (Belastbarkeit)</li>
                      <li>• Augen (Sehvermögen)</li>
                      <li>• Zähne und Kiefer</li>
                      <li>• Gliedmaßen und Hufe (Lahmheiten, Verschleiß)</li>
                      <li>• Rücken und Sattelbereich</li>
                      <li>• Röntgenbilder (Arthrose, Chips, Hufrollenentzündung)</li>
                    </ul>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Wichtig:</strong> Der Käufer wählt den Tierarzt und bezahlt die AKU. Akzeptieren Sie niemals einen vom Verkäufer organisierten
                      Tierarzt – hier besteht Interessenkonflikt.
                    </p>
                  </div>
                }
              />

              {/* Schritt 6 */}
              <ContentSection
                title="Schritt 6: Kaufvertrag und Rechtliches"
                icon="6️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Ein schriftlicher Kaufvertrag ist beim Pferdekauf rechtlich nicht vorgeschrieben, aber dringend empfohlen:
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Wichtige Vertragsklauseln</h3>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• Vollständige Angaben zu Käufer und Verkäufer</li>
                      <li>• Detaillierte Pferdebeschreibung (Name, Rasse, Alter, Farbe, Abzeichen, Chipnummer)</li>
                      <li>• Kaufpreis und Zahlungsmodalitäten</li>
                      <li>• Übergabedatum</li>
                      <li>• Aussagen zu Gesundheit und bekannten Mängeln</li>
                      <li>• Regelung zur AKU (wer zahlt, welche Klasse)</li>
                      <li>• Rücktrittsregelung bei negativer AKU</li>
                      <li>• Gewährleistungsausschluss oder -einschluss</li>
                    </ul>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Gewährleistung und Sachmängelhaftung</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Bei privaten Verkäufen wird die Gewährleistung meist ausgeschlossen (&ldquo;gekauft wie gesehen&rdquo;). Dies ist rechtlich
                      zulässig. Bei Händlern gilt die gesetzliche Gewährleistung von 2 Jahren, oft verkürzt auf 1 Jahr.
                    </p>

                    <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                      <strong className="text-brand-brown">Tipp:</strong> Dokumentieren Sie den Zustand des Pferdes bei Übergabe mit Fotos und notieren Sie eventuelle Besonderheiten im
                      Übergabeprotokoll.
                    </p>
                  </div>
                }
              />

              {/* Schritt 7 */}
              <ContentSection
                title="Schritt 7: Transport und Eingewöhnung"
                icon="7️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Nach erfolgreichem Kauf steht der Transport in den neuen Stall an:
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Professioneller Pferdetransport</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nutzen Sie erfahrene Pferdetransport-Unternehmen (Kosten: 1€ – 2,50€ pro km). Vergewissern Sie sich, dass der
                      Transporter versichert ist und die Fahrer Erfahrung mit Pferden haben.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Versicherung sofort aktivieren</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Schließe die Pferdehaftpflichtversicherung bereits vor der Übergabe ab, sodass das Pferd vom Moment des
                      Eigentumswechsels an versichert ist. Die Pferdehaftpflicht ist in Deutschland nicht gesetzlich vorgeschrieben,
                      aber absolut essentiell – Schäden durch Pferde können sechsstellige Summen erreichen.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Eingewöhnungsphase</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Plane 2-4 Wochen Eingewöhnungszeit ein. Das Pferd muss sich an neue Umgebung, Boxennachbarn,
                      Fütterungszeiten und deine Handhabung gewöhnen. Starte mit leichter Arbeit und steigere langsam.
                    </p>
                  </div>
                }
              />
            </section>

            {/* Red Flags beim Pferdekauf */}
            <section id="red-flags" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand"><Link href="/pferde-ratgeber/pferd-kaufen#red-flags" className="text-brand-brown hover:underline">Red Flags</Link> beim Pferdekauf: Warnzeichen, die Du nicht ignorieren solltest</h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Beim Pferdekauf gibt es bestimmte <strong>Warnsignale</strong>, die Du ernst nehmen solltest. Diese &quot;Red Flags&quot; können auf ernsthafte Probleme hinweisen – sei es beim Pferd selbst oder beim Verkäufer. Ein geschulter Blick für diese Warnzeichen kann Dich vor teuren Fehlkäufen bewahren.
              </p>

              {/* Red Flag 1: Unrealistische Preise */}
              <ContentSection
                title="Red Flag 1: Unrealistisch niedrige Preise"
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                content={
                  <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-red-800 font-semibold">⚠️ Achtung bei Schnäppchen!</p>
                      <p className="text-red-700 mt-2">
                        Ein ausgebildetes Turnierpferd für 3.000 € oder ein junges Warmblut mit Top-Abstammung für 2.000 €?
                        Hier besteht ein hohes Risiko, dass etwas nicht stimmt.
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      <strong>Warum niedrige Preise ein Warnsignal sind:</strong>
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Versteckte Gesundheitsprobleme:</strong> Chronische Erkrankungen, alte Verletzungen oder Stoffwechselstörungen</li>
                      <li>• <strong>Verhaltensauffälligkeiten:</strong> Schwere Unarten, Aggressivität oder traumatische Erfahrungen</li>
                      <li>• <strong>Rechtliche Probleme:</strong> Ungeklärte Eigentumsverhältnisse oder Betrugsversuche</li>
                      <li>• <strong>Dringlicher Verkauf:</strong> Finanzielle Not des Besitzers – kann auf Vernachlässigung hindeuten</li>
                    </ul>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                      <p className="text-blue-800 font-semibold">💡 Tipp:</p>
                      <p className="text-blue-700 mt-2">
                        Nutze unseren <Link href="/pferde-preis-berechnen" className="text-blue-600 underline hover:text-blue-800">Pferde-Preis-Rechner</Link>,
                        um realistische Marktwerte zu ermitteln. So erkennst Du sofort, ob ein Preis zu schön ist, um wahr zu sein.
                      </p>
                    </div>
                  </div>
                }
              />

              {/* Red Flag 2: Fehlende Informationen */}
              <ContentSection
                title="Red Flag 2: Fehlende oder unvollständige Informationen"
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Seriöse Verkäufer sind <strong>transparent und offen</strong> über ihr Pferd. Wenn wichtige Informationen fehlen
                      oder nur vage Antworten kommen, solltest Du hellhörig werden.
                    </p>

                    <p className="text-gray-700 leading-relaxed"><strong>Kritische Informationen, die NICHT fehlen dürfen:</strong></p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• <strong>Gesundheitszustand:</strong> Impfpass, Wurmkuren, bekannte Erkrankungen</li>
                      <li>• <strong>Vorgeschichte:</strong> Vorbesitzer, Ausbildungsstand, Einsatzgebiet</li>
                      <li>• <strong>Charakter & Umgang:</strong> Verhaltensweisen, Besonderheiten im Handling</li>
                      <li>• <strong>Haltungsbedingungen:</strong> Wie wurde das Pferd bisher gehalten?</li>
                      <li>• <strong>Verkaufsgrund:</strong> Warum wird das Pferd verkauft?</li>
                    </ul>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                      <p className="text-red-800 font-semibold">⚠️ Besonders kritisch:</p>
                      <ul className="space-y-1 text-red-700 mt-2">
                        <li>• Verkäufer weicht direkten Fragen aus</li>
                        <li>• &quot;Weiß ich nicht&quot; als Standardantwort</li>
                        <li>• Widersprüche in den Angaben</li>
                        <li>• Keine Videos oder nur alte Fotos verfügbar</li>
                      </ul>
                    </div>
                  </div>
                }
              />

              {/* Red Flag 3: Keine Proberitte/AKU erwünscht */}
              <ContentSection
                title="Red Flag 3: Proberitte oder AKU werden vermieden"
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                content={
                  <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-red-800 font-semibold">🚩 Absolutes No-Go!</p>
                      <p className="text-red-700 mt-2">
                        Ein Verkäufer, der Proberitte oder eine Ankaufsuntersuchung (AKU) ablehnt oder erschwert,
                        hat mit hoher Wahrscheinlichkeit etwas zu verbergen.
                      </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed"><strong>Typische Ausreden unseriöser Verkäufer:</strong></p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed">
                      <li>• &quot;Das Pferd ist zu wertvoll für Proberitte&quot; (ernst gemeinte Verkäufer ermöglichen mehrere Proberitte!)</li>
                      <li>• &quot;Eine AKU ist nicht nötig, das Pferd ist kerngesund&quot; (ein gesundes Pferd besteht problemlos eine AKU)</li>
                      <li>• &quot;Ich muss beim Probereiten dabei sein&quot; (legitim bei fremden Reitern, aber übertriebene Kontrolle ist verdächtig)</li>
                      <li>• &quot;Komm lieber morgen, heute ist das Pferd nicht gut drauf&quot; (wiederholtes Verschieben ist ein Warnsignal)</li>
                    </ul>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                      <p className="text-blue-800 font-semibold">✅ So sollte es laufen:</p>
                      <ul className="space-y-1 text-blue-700 mt-2">
                        <li>• Mindestens 2-3 Proberitte an verschiedenen Tagen möglich</li>
                        <li>• AKU ausdrücklich erwünscht und unterstützt</li>
                        <li>• Verkäufer stellt alle Unterlagen bereit (Röntgenbilder, Impfpass etc.)</li>
                        <li>• Du darfst das Pferd selbst vorbereiten, satteln, führen</li>
                      </ul>
                    </div>
                  </div>
                }
              />

              {/* Red Flag 4: Versteckte Gesundheitsprobleme */}
              <ContentSection
                title="Red Flag 4: Hinweise auf versteckte Gesundheitsprobleme"
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Manche Verkäufer versuchen aktiv, <strong>gesundheitliche Probleme zu verschleiern</strong>.
                      Diese Warnzeichen helfen Dir, getarnte Probleme zu erkennen:
                    </p>

                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-gray-800">🩺 Körperliche Warnzeichen beim Pferd:</p>
                        <ul className="space-y-2 text-gray-700 leading-relaxed mt-2">
                          <li>• <strong>Bewegungsauffälligkeiten:</strong> Lahmheit, steifer Gang, Taktstörungen</li>
                          <li>• <strong>Hufrehe-Anzeichen:</strong> Trachtenzwang, erhöhte Pulsation in den Hufen</li>
                          <li>• <strong>Atemwegsprobleme:</strong> Nasenausfluss, Husten, verstärkte Atmung in Ruhe</li>
                          <li>• <strong>Hautprobleme:</strong> kahle Stellen, Ekzeme, Narben</li>
                          <li>• <strong>Magengeschwüre:</strong> Appetitlosigkeit, Flankenbeißen, Unwilligkeit beim Satteln</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">💊 Verdächtige Verhaltensweisen des Verkäufers:</p>
                        <ul className="space-y-2 text-gray-700 leading-relaxed mt-2">
                          <li>• Pferd wurde &quot;gerade frisch entwurmt&quot; oder &quot;heute Morgen noch behandelt&quot;</li>
                          <li>• Auffällig viele Medikamente oder Ergänzungsfuttermittel im Spind</li>
                          <li>• Verkäufer besteht darauf, das Pferd selbst zu bewegen (um Lahmheit zu kaschieren)</li>
                          <li>• Besichtigungstermin nur zu bestimmten Uhrzeiten möglich (z.B. wenn Schmerzmittel wirken)</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                      <p className="text-red-800 font-semibold">⚠️ Achtung bei diesen Aussagen:</p>
                      <ul className="space-y-1 text-red-700 mt-2">
                        <li>• &quot;Das Pferd braucht halt besonderes Futter/Einstreu&quot; (kann auf Allergien oder PSSM hindeuten)</li>
                        <li>• &quot;Der lahmt immer etwas nach dem Aufstehen&quot; (Arthrose, Sehnenschäden?)</li>
                        <li>• &quot;Das gibt sich nach ein paar Minuten Bewegung&quot; (chronische Probleme werden kleingeredet)</li>
                      </ul>
                    </div>
                  </div>
                }
              />

              {/* Red Flag 5: Druckausübung */}
              <ContentSection
                title="Red Flag 5: Zeitdruck und Druckausübung"
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Seriöse Verkäufer geben Dir Zeit für Deine Entscheidung. <strong>Zeitdruck ist eine klassische Verkaufstaktik</strong>,
                      um Dich zu einer übereilten – und oft bereuten – Entscheidung zu drängen.
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                      <p className="text-red-800 font-semibold">🚩 Typische Drucksituationen:</p>
                      <ul className="space-y-2 text-red-700 mt-2">
                        <li>• &quot;Wenn du das Pferd heute nicht kaufst, ist es morgen weg&quot;</li>
                        <li>• &quot;Ein anderer Interessent kommt gleich, entscheide dich jetzt&quot;</li>
                        <li>• &quot;Der Preis gilt nur noch heute&quot;</li>
                        <li>• &quot;Ich brauche eine Anzahlung, um es für dich zu reservieren&quot; (ohne Kaufvertrag!)</li>
                        <li>• Ständige Anrufe oder Nachrichten nach der Besichtigung</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                      <p className="text-blue-800 font-semibold">✅ So verhält sich ein seriöser Verkäufer:</p>
                      <ul className="space-y-1 text-blue-700 mt-2">
                        <li>• Gibt Dir Zeit zum Überlegen (mehrere Tage bis Wochen)</li>
                        <li>• Ermöglicht mehrere Besichtigungen</li>
                        <li>• Unterstützt Dich bei der AKU-Organisation</li>
                        <li>• Beantwortet Nachfragen geduldig und ausführlich</li>
                        <li>• Akzeptiert, wenn Du einen Fachmann zur Besichtigung mitbringst</li>
                      </ul>
                    </div>

                    <p className="text-gray-700 leading-relaxed mt-4">
                      <strong>Merke:</strong> Ein gutes Pferd findet seinen Käufer – auch ohne Druck. Lass Dich niemals hetzen!
                    </p>
                  </div>
                }
              />

              {/* Red Flag 6: Fehlende Papiere */}
              <ContentSection
                title="Red Flag 6: Fehlende oder zweifelhafte Papiere"
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Die <strong>Papiere eines Pferdes</strong> sind nicht nur für Zucht oder Turniere wichtig – sie dokumentieren
                      Identität, Abstammung und Gesundheit. Fehlende oder fragwürdige Dokumente sollten Dich stutzig machen.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-gray-800">📋 Diese Papiere sollten vorhanden sein:</p>
                        <ul className="space-y-2 text-gray-700 leading-relaxed mt-2">
                          <li>• <strong>Equidenpass (Pferdereisepass):</strong> Gesetzlich vorgeschrieben! Enthält Impfungen, Medikamenteneintragungen, Chip-Nummer</li>
                          <li>• <strong>Abstammungsnachweis/Zuchtpapiere:</strong> Bei Zuchtpferden unerlässlich</li>
                          <li>• <strong>Eigentumsnachweis:</strong> Kaufvertrag des aktuellen Besitzers</li>
                          <li>• <strong>Gesundheitsunterlagen:</strong> Impfpass, frühere AKU-Berichte, Röntgenbilder</li>
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800">🚨 Warnzeichen bei Papieren:</p>
                        <ul className="space-y-2 text-gray-700 leading-relaxed mt-2">
                          <li>• <strong>Kein Equidenpass vorhanden:</strong> Illegal und mit hohen Bußgeldern belegt!</li>
                          <li>• <strong>&quot;Papiere kommen noch nach&quot;:</strong> Klassische Ausrede – kaufe NIE ohne vollständige Unterlagen</li>
                          <li>• <strong>Chip-Nummer stimmt nicht überein:</strong> Identitätsbetrug möglich</li>
                          <li>• <strong>Manipulierte Einträge:</strong> Durchstreichungen, unleserliche Änderungen im Equidenpass</li>
                          <li>• <strong>Verkäufer ist nicht Eigentümer:</strong> &quot;Ich verkaufe für einen Freund&quot; – erhöhtes Betrugsrisiko</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                      <p className="text-red-800 font-semibold">⚠️ Rechtliche Konsequenzen fehlender Papiere:</p>
                      <ul className="space-y-1 text-red-700 mt-2">
                        <li>• Pferd darf nicht transportiert werden (Equidenpass-Pflicht!)</li>
                        <li>• Keine Turnierteilnahme möglich</li>
                        <li>• Probleme beim Weiterverkauf</li>
                        <li>• Bußgelder bis zu mehreren Tausend Euro</li>
                        <li>• Bei Medikamentengabe: Gefahr für andere Pferde bei Schlachtung</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                      <p className="text-blue-800 font-semibold">💡 Tipp:</p>
                      <p className="text-blue-700 mt-2">
                        Lass Dir den <strong>Chip auslesen</strong> und vergleiche die Nummer mit dem Equidenpass.
                        Das gibt Dir Sicherheit, dass Pferd und Papiere zusammengehören. Die meisten Tierärzte machen das kostenlos.
                      </p>
                    </div>
                  </div>
                }
              />

              <div className="bg-amber-50 border-l-4 border-yellow-500 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-serif text-brand mb-3">
                  🎯 Zusammenfassung: Vertraue Deinem Bauchgefühl!
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Ein gutes Bauchgefühl ist unbezahlbar.</strong> Wenn Dir beim Pferdekauf etwas komisch vorkommt –
                  sei es das Verhalten des Verkäufers, versteckte Informationen oder merkwürdige Umstände – dann zögere nicht,
                  vom Kauf Abstand zu nehmen. Es gibt immer andere Pferde, aber ein Fehlkauf kann Dich jahrelang belasten.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3">
                  <strong>Nimm Dir Zeit, stelle Fragen, hol Dir professionelle Hilfe</strong> – und vor allem:
                  Lass Dich niemals unter Druck setzen. Ein seriöser Verkäufer wird Deine Vorsicht verstehen und unterstützen.
                </p>
              </div>
            </section>

            {/* Pferd für Anfänger kaufen */}
            <section id="anfaenger" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand"><Link href="/pferde-ratgeber/pferd-kaufen#anfaenger" className="text-brand-brown hover:underline">Pferd für Anfänger</Link> kaufen: Worauf achten?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Der Kauf des ersten eigenen Pferdes ist ein besonderer Moment – aber auch eine Herausforderung für unerfahrene
                Käufer. Diese Aspekte sind speziell für Anfänger wichtig:
              </p>

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Charaktermerkmale anfängertauglicher Pferde</h3>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li>• <strong>Gelassenheit:</strong> Ruhiges Temperament, nicht schreckhaft</li>
                <li>• <strong>Geduld:</strong> Verzeiht Fehler des Reiters</li>
                <li>• <strong>Gehorsam:</strong> Reagiert auf Hilfen, ohne stur oder dominant zu sein</li>
                <li>• <strong>Gesundheit:</strong> Keine chronischen Erkrankungen oder Schmerzprobleme</li>
                <li>• <strong>Erfahrung:</strong> Kennt verschiedene Situationen (Gelände, Halle, Straßenverkehr)</li>
              </ul>

              <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                <strong className="text-brand-brown">Warnung:</strong> Ein &quot;Anfängerpferd&quot; ist nicht dasselbe wie ein günstiges oder altes Pferd. Viele günstige Angebote sind
                problembehaftet – schwierig im Umgang, gesundheitlich angeschlagen oder unzureichend ausgebildet.
              </p>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">Geeignete Rassen für Einsteiger</h3>
              <RatgeberInfoTiles headline="Anfängerfreundliche Pferderassen" tiles={anfaengerRassen} />

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Das richtige Alter für Anfänger</h3>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <div>
                  <h4 className="text-lg font-semibold text-brand-brown mb-1">Ideal: 8-15 Jahre</h4>
                  <p>
                    Pferde in diesem Alter haben genügend Erfahrung, einen gefestigten Charakter und sind körperlich noch fit. Ein
                    10-jähriges, gut ausgebildetes Pferd ist oft die beste Wahl für Anfänger.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-brand-brown mb-1">Zu jung: unter 6 Jahre</h4>
                  <p>
                    Junge Pferde sind noch in der Ausbildung, oft unsicher und brauchen erfahrene Reiter. Für Anfänger ungeeignet.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-brand-brown mb-1">Zu alt: über 20 Jahre</h4>
                  <p>
                    Sehr alte Pferde können gesundheitliche Einschränkungen haben und brauchen besondere Pflege. Als erstes Pferd
                    riskant.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Erforderlicher Ausbildungsstand</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Anfänger brauchen ein Pferd mit <strong>solider Grundausbildung:</strong>
              </p>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li>• Sicher im Gelände und in der Halle</li>
                <li>• Kennt alle drei Gangarten</li>
                <li>• Lässt sich gut händeln (führen, putzen, verladen)</li>
                <li>• Kennt Trensen, Satteln, Hufe geben</li>
                <li>• Ist gewohnt, alleine geritten zu werden</li>
              </ul>

              <p className="text-lg text-gray-700 leading-relaxed">
                Ein Pferd kaufen ohne ausreichende Reitausbildung ist riskant. <strong>Investiere parallel zum Pferdekauf in
                regelmäßigen Reitunterricht.</strong> So entwickelst du dich gemeinsam mit deinem Pferd weiter und vermeidest
                gefährliche Situationen durch Unwissenheit.
              </p>
            </section>

            {/* Regionale Unterschiede */}
            <section id="regionen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Regionale Unterschiede: Wo kauft man Pferde am besten?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Der deutsche Pferdemarkt ist regional unterschiedlich geprägt. Je nach Bundesland findest du verschiedene
                Schwerpunkte, Preisstrukturen und Angebote:
              </p>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">Pferdemarkt nach Bundesländern</h3>
              <RatgeberRegionGrid
                regions={regionTiles.map((region) => ({
                  title: region.title,
                  description: region.description,
                  icon: <MapPin className="h-5 w-5 text-brand-brown" />
                }))}
              />

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Preisunterschiede zwischen Regionen</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Regionale Preisunterschiede von 5-15% sind normal:
              </p>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li>• <strong>Teuer:</strong> München, Hamburg, Frankfurt (Großstadtnähe)</li>
                <li>• <strong>Mittel:</strong> Ländliche Gebiete in Bayern, NRW, Niedersachsen</li>
                <li>
                  • <strong>Günstiger:</strong> Ostdeutsche Bundesländer, ländliche Regionen in Brandenburg,
                  Mecklenburg-Vorpommern
                </li>
              </ul>

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Vorteile lokaler Käufe</h3>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li>• <strong>Persönliche Besichtigung:</strong> Mehrfache Besichtigungen ohne hohe Fahrtkosten</li>
                <li>• <strong>Günstigerer Transport:</strong> Kurze Transportwege sparen Kosten und Stress</li>
                <li>• <strong>Netzwerk aufbauen:</strong> Tipps zu Tierärzten, Hufschmieden und Ställen</li>
                <li>• <strong>Nachkontakte möglich:</strong> Bei Problemen Verkäufer leichter erreichbar</li>
              </ul>

              <p className="text-lg text-gray-700 leading-relaxed">
                Die großen Pferde-Plattformen wie ehorses.de und pferde.de ermöglichen bundesweite Suche. <strong>Bedenke:</strong>{" "}
                Ein perfektes Pferd 400 km entfernt kann trotz höherer Transportkosten die bessere Wahl sein als ein mittelmäßiges
                Pferd vor Ort.
              </p>
            </section>

            {/* Häufige Fehler vermeiden */}
            <section id="fehler" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand"><Link href="/pferde-ratgeber/pferd-kaufen#fehler" className="text-brand-brown hover:underline">Häufige Fehler beim Pferdekauf vermeiden</Link></h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Viele Pferdekäufe scheitern oder führen zu Enttäuschungen durch vermeidbare Fehler. Lerne aus den häufigsten
                Fehlern anderer:
              </p>

              <div className="grid gap-6">
                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 1: Emotionaler Kauf ohne objektive Prüfung</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>
                        Du verliebst dich beim ersten Blick in ein Pferd und kaufst überstürzt, ohne kritische Prüfung. Besonders
                        bei schönen, großen Augen schaltet sich der Verstand aus.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Nimm immer eine emotional unbeteiligte, erfahrene Person zur Besichtigung mit. Diese kann objektiv
                        beurteilen und dich vor Spontankäufen bewahren.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 2: Überzahlung durch fehlende Marktkenntnis</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>
                        Du kennst die aktuellen Marktpreise nicht und glaubst der Preisvorstellung des Verkäufers. Verkäufer
                        überschätzen ihre Pferde häufig um 20-40%.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Mit der KI-gestützten Bewertung von PferdeWert.de erhältst du in nur 2 Minuten eine objektive Marktwert-Einschätzung.
                        Eine Investition, die sich beim ersten Kauf vielfach amortisiert.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 3: AKU auslassen oder falsche Klasse wählen</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>
                        Du sparst die 200€ für eine kleine AKU oder wählst bei einem 15.000€ Turnierpferd nur die kleine statt der
                        großen AKU mit Röntgen.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        NIEMALS auf die AKU verzichten. Wähle die AKU-Klasse passend zum Kaufpreis. Bei Pferden über 5.000€ ist
                        die große AKU mit Röntgen Standard.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 4: Folgekosten unterschätzen</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>Du konzentrierst dich nur auf den Kaufpreis und vergisst die laufenden Kosten von 400€ bis 700€ pro Monat.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Kalkuliere realistisch mit mindestens 5.000€ Jahreskosten. Lege eine Notfallreserve von 2.000€ für
                        unvorhergesehene Tierarztkosten an.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 5: Pferd passt nicht zum Reiterniveau</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>
                        Anfänger kaufen junge, unerfahrene Pferde oder temperamentvolle Rassen, die erfahrene Reiter brauchen.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Sei ehrlich zu deinem Können. Anfänger brauchen erfahrene, gelassene Lehrmeister-Pferde. Investiere
                        parallel in Reitunterricht.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 6: Keinen schriftlichen Kaufvertrag abschließen</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>Du verlässt dich auf mündliche Zusagen und Handschlag-Geschäfte.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Bestehe auf einem schriftlichen Kaufvertrag, auch bei Privatkäufen von netten Menschen. Nutze
                        Muster-Verträge von FN oder Rechtsanwälten.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 7: Schnellkauf ohne Probezeit</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>
                        Der Verkäufer drängt zu schneller Entscheidung (&quot;drei andere Interessenten&quot;) oder erlaubt keine ausreichende
                        Probezeit.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Lass dich nicht drängen. Vereinbare mindestens 2-3 Probetermine an verschiedenen Tagen. Seriöse
                        Verkäufer geben dir die Zeit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Faire Preise erkennen */}
            <section id="faire-preise" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">So erkennst du faire Pferde-Preise</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Preisfindung beim Pferdekauf ist eine der größten Herausforderungen. Woher weißt du, ob 8.000€ für ein
                bestimmtes Pferd angemessen oder überteuert sind?
              </p>

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Marktanalyse: Vergleichspreise recherchieren</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Schau dir auf Verkaufsplattformen ähnliche Pferde an:
              </p>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li>• Gleiche oder ähnliche Rasse</li>
                <li>• Vergleichbares Alter (±2 Jahre)</li>
                <li>• Ähnlicher Ausbildungsstand</li>
                <li>• Gleiche Region</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Notiere dir 8-10 Vergleichsangebote und bilde einen Durchschnittspreis.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mt-6 bg-amber-50 border-l-4 border-brand-green p-4 rounded">
                <strong className="text-brand-brown">Achtung:</strong> Online-Preise sind oft Wunschpreise der Verkäufer. Tatsächliche Verkaufspreise liegen häufig 10-20% darunter.
              </p>

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Bewertungskriterien verstehen</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Ein fairer Preis ergibt sich aus der Kombination dieser Faktoren:
              </p>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  <strong>Rasse und Zuchtlinien (Einfluss: 20-30%):</strong> Warmblüter aus erfolgreichen Zuchtlinien rechtfertigen
                  deutliche Preisaufschläge.
                </li>
                <li>
                  <strong>Ausbildung und Turnierergebnisse (Einfluss: 30-40%):</strong> Jede Ausbildungsstufe erhöht den Wert. Von
                  Basis (+1.500€-3.000€) bis höhere Klassen (+8.000€-20.000€+).
                </li>
                <li>
                  <strong>Gesundheit und Alter (Einfluss: 20-30%):</strong> Pferde in ihren besten Jahren (6-12) erzielen
                  Höchstpreise. Gesundheitsprobleme senken den Wert um 30-50%.
                </li>
                <li>
                  <strong>Aktueller Markttrend (Einfluss: 10-20%):</strong> Modetrends beeinflussen Preise. Wenn Barockpferde
                  populär sind, steigen ihre Preise.
                </li>
              </ul>

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Das Problem: Verkäufer überschätzen ihre Pferde</h3>
              <p className="text-gray-700 leading-relaxed">
                Studien und Markterfahrung zeigen: Die meisten privaten Verkäufer überschätzen den Wert ihres Pferdes um
                durchschnittlich <strong>25-35%</strong>. Emotionale Bindung, in die Ausbildung investierte Zeit und die subjektive
                Wahrnehmung führen zu überhöhten Preisvorstellungen.
              </p>

              <RatgeberHighlightBox title="Die Lösung: KI-gestützte Pferdebewertung">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  PferdeWert.de nutzt modernste Künstliche Intelligenz, um den fairen Marktwert eines Pferdes in nur 2 Minuten zu
                  berechnen. Unser Algorithmus wurde von erfahrenen Reitern entwickelt und berücksichtigt über 50
                  Bewertungskriterien sowie aktuelle Marktdaten.
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-brand">Die Vorteile für dich:</h4>
                  <ul className="space-y-2 text-gray-700 leading-relaxed">
                    <li>• <strong>Verhandlungssicherheit:</strong> Du weißt, was das Pferd wirklich wert ist</li>
                    <li>• <strong>Schnelligkeit:</strong> Ergebnis in 2 Minuten, nicht Tage der Recherche</li>
                    <li>• <strong>Objektivität:</strong> KI ohne emotionale Verzerrung</li>
                    <li>• <strong>Aktualität:</strong> Berücksichtigt aktuelle Markttrends</li>
                  </ul>
                </div>
              </RatgeberHighlightBox>
            </section>

            {/* Online vs. Händler vs. Privat */}
            <section id="kaufwege" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Pferd kaufen: <Link href="/pferde-ratgeber/pferd-kaufen#kaufwege" className="text-brand-brown hover:underline">Online vs. Händler vs. Privat</Link></h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Wahl des Verkaufswegs beeinflusst Preis, Sicherheit und Kaufabwicklung erheblich:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Online-Pferdemarkt</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand mb-2">Vorteile:</p>
                      <ul className="space-y-1">
                        <li>• Riesige Auswahl (19.000+ Pferde)</li>
                        <li>• Einfacher Preisvergleich</li>
                        <li>• Bundesweite Suche</li>
                        <li>• Filter-Funktionen</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-brand mb-2">Nachteile:</p>
                      <ul className="space-y-1">
                        <li>• Keine physische Vorab-Besichtigung</li>
                        <li>• Betrugsrisiko</li>
                        <li>• Transportkosten</li>
                        <li>• Zeitaufwand für Anfahrten</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Pferdehändler</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand mb-2">Vorteile:</p>
                      <ul className="space-y-1">
                        <li>• 12 Monate Gewährleistung</li>
                        <li>• Professionelle Beratung</li>
                        <li>• AKU oft inklusive</li>
                        <li>• Probezeit möglich</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-brand mb-2">Nachteile:</p>
                      <ul className="space-y-1">
                        <li>• 10-30% höhere Preise</li>
                        <li>• Kommission</li>
                        <li>• Verkaufsdruck</li>
                        <li>• Begrenzte Auswahl</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Privatkauf</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand mb-2">Vorteile:</p>
                      <ul className="space-y-1">
                        <li>• Günstigste Option</li>
                        <li>• Direkte Historie</li>
                        <li>• Oft ehrlicher</li>
                        <li>• Persönlicher Kontakt</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-brand mb-2">Nachteile:</p>
                      <ul className="space-y-1">
                        <li>• Keine Gewährleistung</li>
                        <li>• AKU auf eigene Kosten</li>
                        <li>• Verhandlungsgeschick nötig</li>
                        <li>• Rechtliches Risiko</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <RatgeberHighlightBox title="Sicherheitstipps für Online-Kauf">
                <ul className="space-y-2 text-gray-700 leading-relaxed">
                  <li>• Niemals Geld überweisen vor persönlicher Besichtigung</li>
                  <li>• Bei unrealistisch günstigen Angeboten skeptisch sein</li>
                  <li>• Verkäufer vorab telefonisch kontaktieren</li>
                  <li>• Bei Auffälligkeiten (schlechte Deutschkenntnisse, Zahlungsdruck) Abstand nehmen</li>
                  <li>• Immer persönlich besichtigen – niemals blind kaufen</li>
                </ul>
              </RatgeberHighlightBox>
            </section>
          </article>

          {/* FAQ */}
          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ sectionTitle="Häufig gestellte Fragen zum Pferdekauf" faqs={faqItems} />
          </section>

          {/* Related Articles */}
          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Vertiefe dein Wissen rund um Pferdekauf, AKU und Verkauf."
            articles={relatedArticles}
          />

          {/* Fazit */}
          <section id="fazit" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Fazit: Informiert kaufen, fair bezahlen
              </h2>

              <p className="text-lg text-gray-700 mb-6">
                Ein Pferd zu kaufen ist eine der größten Entscheidungen im Reiterleben – emotional und finanziell. Die wichtigsten Learnings:
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-bold text-gray-900 mb-2">Vorbereitung ist alles:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li>Realistische Budgetplanung (Kaufpreis + Erstausstattung + laufende Kosten)</li>
                    <li>Professionelle Bewertung nutzen für faire Preise</li>
                    <li>Große AKU ab €5.000 Kaufpreis ist Pflicht</li>
                  </ul>
                </div>

                <p className="text-gray-700">
                  <span className="font-bold"><Link href="/pferde-ratgeber/pferd-kaufen#bewertung-5-saeulen" className="text-brand-brown hover:underline">Die 5 Säulen der Bewertung</Link></span> (Gesundheit, Ausbildung, Charakter, Exterieur, Marktfähigkeit) geben dir eine objektive Grundlage für Verhandlungen.
                </p>

                <p className="text-gray-700">
                  <span className="font-bold">Regionale Unterschiede</span> können bis zu 15% Preisabweichung bedeuten – plane Transportkosten von Anfang an ein.
                </p>

                <p className="text-gray-700">
                  <span className="font-bold">Red Flags erkennen</span> schützt vor Fehlinvestitionen: Unrealistische Preise, fehlende AKU, Druckmethoden sind klare Warnsignale.
                </p>

                <p className="text-lg text-gray-700 mt-6">
                  Du möchtest jetzt den nächsten Schritt gehen oder dein Pferd <Link href="/pferde-ratgeber/pferd-verkaufen" className="text-brand-brown hover:underline">verkaufen</Link>? <span className="font-bold">Bewerte dein Wunschpferd mit PferdeWert</span> – unsere KI vergleicht es mit tausenden verifizierten Marktdaten und gibt dir eine objektive Preiseinschätzung in Minuten.
                </p>

                <div className="mt-6">
                  <Link
                    href="/pferde-preis-berechnen"
                    className="inline-flex items-center px-6 py-3 bg-brand-brown text-white font-semibold rounded-lg hover:bg-brand-brown-dark transition-colors"
                  >
                    Jetzt Pferdewert ermitteln und mit Vertrauen kaufen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <RatgeberFinalCTA
            image={{
              src: getRatgeberBySlug('pferd-kaufen')?.image || '/images/ratgeber/pferd-kaufen/hero.webp',
              alt: "Pferdebewertung vor dem Kauf"
            }}
            title="Bereit für deinen fairen Pferdekauf?"
            description="Nutze unsere KI-Analyse für eine objektive Preisbewertung. Starte die Verhandlung mit klarem Preiswissen und vermeide Überzahlung."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert berechnen"
          />
        </div>
      </>
    </Layout>
  )
}

export default PferdKaufen
