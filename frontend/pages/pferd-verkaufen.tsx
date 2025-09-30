import { NextPage } from "next"
import Head from "next/head"
import { TrendingUp, Calculator, Users, MapPin, FileText, Camera } from "lucide-react"

import Layout from "@/components/Layout"
import ContentSection from "@/components/ContentSection"
import FAQ from "@/components/FAQ"
import RatgeberHero from "@/components/ratgeber/RatgeberHero"
import RatgeberHeroImage from "@/components/ratgeber/RatgeberHeroImage"
import RatgeberHighlightBox from "@/components/ratgeber/RatgeberHighlightBox"
import RatgeberInfoTiles from "@/components/ratgeber/RatgeberInfoTiles"
import RatgeberRegionGrid from "@/components/ratgeber/RatgeberRegionGrid"
import RatgeberRelatedArticles from "@/components/ratgeber/RatgeberRelatedArticles"
import RatgeberTableOfContents from "@/components/ratgeber/RatgeberTableOfContents"
import RatgeberFinalCTA from "@/components/ratgeber/RatgeberFinalCTA"
import { FAQItem } from "@/types/faq.types"
import scrollToSection from "@/utils/ratgeber/scrollToSection"

const sections = [
  { id: "bewertung", title: "Warum Preisbewertung beim Verkauf?" },
  { id: "strategien", title: "Verkaufsstrategien & Preisrahmen" },
  { id: "markt", title: "Regionale Marktanalyse" },
  { id: "dokumente", title: "Dokumente & Präsentation" },
  { id: "verhandlung", title: "Verhandlungen souverän führen" },
  { id: "faq", title: "FAQ zum Pferdeverkauf" }
]

const heroMetaItems = [
  {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "9 Min. Lesezeit"
  },
  {
    icon: <Calculator className="h-4 w-4" />,
    label: "Preisstrategie mit KI"
  },
  {
    icon: <Users className="h-4 w-4" />,
    label: "3x schnellere Verkäufe"
  }
]

const strategyTiles = [
  {
    title: "Premium-Positioning",
    value: "15.000 €+",
    description: "Für Sport- & Zuchtpferde mit Erfolgen. Professionelle Präsentation maximiert den Preis."
  },
  {
    title: "Schnellverkauf",
    value: "5.000 – 12.000 €",
    description: "Freizeitpferde mit aktueller AKU und ehrlicher Beschreibung finden in 4–6 Wochen neue Besitzer."
  },
  {
    title: "Wertsteigerung",
    value: "+10–20 %",
    description: "Gezielte Ausbildung, Trainingsnachweise und hochwertige Medien steigern die Nachfrage deutlich."
  }
]

const regionTiles = [
  {
    title: "Bayern",
    description: "Ø 8.500 € · Hohe Nachfrage nach Freizeit- und Sportpferden, Premiumpreise möglich."
  },
  {
    title: "Nordrhein-Westfalen",
    description: "Ø 9.200 € · Größte Käuferbasis, kurze Verkaufszeiten durch viele Interessenten."
  },
  {
    title: "Niedersachsen",
    description: "Ø 7.800 € · Warmblutzucht mit stabilen Preisen, gutes Verhältnis aus Angebot und Nachfrage."
  }
]

const documentChecklist = [
  {
    title: "Aktuelle AKU & Röntgen",
    description: "Zeigen Gesundheitszustand transparent – Pflicht bei hochwertigen Pferden."
  },
  {
    title: "Abstammung & Leistungsnachweise",
    description: "Belegen Qualität, Ausbildung und Potential – wichtig für Sport- und Zuchtkäufer."
  },
  {
    title: "Impfpass & Gesundheitsakte",
    description: "Sorgt für Vertrauen und erleichtert Versicherungsabschlüsse."
  },
  {
    title: "Professionelle Fotos & Videos",
    description: "Seitliche Standaufnahme, Bewegungsbilder und Reitvideos sind Standard."
  }
]

const negotiationTips = [
  {
    scenario: "Erstes Angebot deutlich unter deiner Vorstellung",
    advice: "Freundlich bleiben, Bewertungsdaten als Grundlage aufzeigen und Mindestpreis klar kommunizieren."
  },
  {
    scenario: "Mehrere Interessenten gleichzeitig",
    advice: "Verbindliche Fristen setzen, fair bleiben und Entscheidungen transparent erklären."
  },
  {
    scenario: "Käufer spricht kleinere Mängel an",
    advice: "Befund einordnen, passende Nutzung vorschlagen und Preis ggf. mit Gegenleistung anpassen."
  }
]

const faqItems: FAQItem[] = [
  {
    question: "Wie finde ich den richtigen Verkaufspreis?",
    answer:
      "Nutze unsere KI-Auswertung. Sie berücksichtigt Alter, Ausbildung, Erfolge, Region und Gesundheitsdaten für eine marktrealistische Preisspanne."
  },
  {
    question: "Wie schnell verkauft sich ein Pferd zum fairen Preis?",
    answer:
      "Faires Pricing führt innerhalb von 2–4 Wochen zu qualifizierten Anfragen. Vollständige Unterlagen beschleunigen den Abschluss."
  },
  {
    question: "Was passiert, wenn ich zu teuer starte?",
    answer:
      "Überteuerte Pferde bleiben monatelang im Netz. Nach Preissenkung wirkt dein Inserat wie ein Ladenhüter – besser von Beginn an realistisch."
  },
  {
    question: "Welche Unterlagen sollte ich bereithalten?",
    answer:
      "Equidenpass, Impfpass, AKU, Röntgenbilder, Abstammung, Trainingsnachweise und hochwertige Medien sind Pflicht."
  }
]

const relatedArticles = [
  {
    href: "/pferd-kaufen",
    image: "/blossi-5.webp",
    title: "Pferd kaufen: Faire Preise erkennen",
    badge: "Kauf",
    readTime: "10 Min.",
    description: "Preischeck für Käufer: So erkennst du faire Angebote und verhandelst souverän."
  },
  {
    href: "/aku-pferd",
    image: "/images/blossi-shooting.webp",
    title: "AKU Pferd Überblick",
    badge: "AKU Guide",
    readTime: "12 Min.",
    description: "Verstehe Ablauf, Kosten und Befunde der AKU als Basis für deine Preisverhandlungen."
  }
]

const PferdVerkaufen: NextPage = () => {
  const handleNavigate = (id: string) => scrollToSection(id)

  const handleScrollToToc = () => {
    if (typeof window === "undefined") return
    document.getElementById("inhaltsverzeichnis")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <>
        <Head>
          <title>Pferd verkaufen: Optimaler Preis durch KI-Bewertung | PferdeWert</title>
          <meta
            name="description"
            content="Verkaufe dein Pferd schneller und profitabler: KI-basierte Preisbewertung, regionale Marktinsights und Checklisten für einen erfolgreichen Verkauf."
          />
        </Head>

        <RatgeberHero
          badgeLabel="Verkaufsratgeber"
          badgeIcon={<TrendingUp className="h-4 w-4" />}
          title="Pferd verkaufen: Optimaler Preis mit KI"
          subtitle="Mit objektiven Marktdaten verkaufst du dein Pferd schneller, sicherer und zum fairen Preis."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Verkaufspreis berechnen",
            icon: <Calculator className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: <Users className="h-5 w-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src="/images/pferd-verkaufen-bayern-hero.jpg"
          alt="Pferdeverkauf mit professioneller Bewertung"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            <section id="bewertung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Warum Preisbewertung beim Verkauf?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Der richtige Einstiegspreis entscheidet über Tempo und Erfolg. Mit der KI-Analyse definierst du eine fundierte
                Preisstrategie, argumentierst professionell und minimierst Wertverluste.
              </p>
              <RatgeberHighlightBox title="Erfolgshebel" icon="💡">
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>• Marktwert vor Inserat bestimmen</li>
                  <li>• Unterlagen digital bereitstellen</li>
                  <li>• Verhandlungsreserve festlegen, Mindestpreis definieren</li>
                </ul>
              </RatgeberHighlightBox>
            </section>

            <section id="strategien" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Verkaufsstrategien & Preisrahmen</h2>
              <RatgeberInfoTiles headline="Strategien im Vergleich" tiles={strategyTiles} />
            </section>

            <section id="markt" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Regionale Marktanalyse</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Preise und Verkaufsdauer variieren je nach Region. Nutze regionale Insights, um Inserate gezielt zu platzieren und
                Käufergruppen anzusprechen.
              </p>
              <RatgeberRegionGrid
                regions={regionTiles.map((region) => ({
                  title: region.title,
                  description: region.description,
                  icon: <MapPin className="h-5 w-5 text-brand-brown" />
                }))}
              />
            </section>

            <section id="dokumente" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Dokumente & Präsentation</h2>
              <ContentSection
                title="Checkliste für erfolgreiche Inserate"
                icon={<FileText className="h-6 w-6" />}
                content={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {documentChecklist.map((doc) => (
                      <RatgeberHighlightBox key={doc.title} title={doc.title} icon={<Camera className="h-5 w-5 text-brand-brown" />}>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">{doc.description}</p>
                      </RatgeberHighlightBox>
                    ))}
                  </div>
                }
              />
            </section>

            <section id="verhandlung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Verhandlungen souverän führen</h2>
              <RatgeberHighlightBox title="Tipps für jede Situation" icon={<Users className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  {negotiationTips.map((tip) => (
                    <li key={tip.scenario}>
                      <strong>{tip.scenario}:</strong> {tip.advice}
                    </li>
                  ))}
                </ul>
              </RatgeberHighlightBox>
            </section>
          </article>

          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ sectionTitle="Häufig gestellte Fragen zum Pferdeverkauf" faqs={faqItems} />
          </section>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Vertiefe deine Strategie rund um Kauf, Verkauf und AKU deines Pferdes."
            articles={relatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: "/images/pferd-verkaufen-bayern-hero.jpg",
              alt: "Pferdeverkauf mit KI-Bewertung"
            }}
            title="Verkaufe dein Pferd zum fairen Marktpreis"
            description="Mit unserer KI-Bewertung erhältst du eine klare Preisstrategie, überzeugende Argumente und professionelle Unterlagen für deinen Verkauf."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Verkaufspreis berechnen"
          />
        </div>
      </>
    </Layout>
  )
}

export default PferdVerkaufen
