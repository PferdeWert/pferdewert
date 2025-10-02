import { NextPage } from "next"
import Head from "next/head"
import { ClipboardList, ShieldAlert, CheckCircle, ChevronDown } from "lucide-react"

import Layout from "@/components/Layout"
import FAQ from "@/components/FAQ"
import RatgeberHero from "@/components/ratgeber/RatgeberHero"
import RatgeberHeroImage from "@/components/ratgeber/RatgeberHeroImage"
import RatgeberHighlightBox from "@/components/ratgeber/RatgeberHighlightBox"
import RatgeberRelatedArticles from "@/components/ratgeber/RatgeberRelatedArticles"
import RatgeberTableOfContents from "@/components/ratgeber/RatgeberTableOfContents"
import RatgeberFinalCTA from "@/components/ratgeber/RatgeberFinalCTA"
import { FAQItem } from "@/types/faq.types"
import scrollToSection from "@/utils/ratgeber/scrollToSection"
import { getRatgeberBySlug } from "@/lib/ratgeber-registry"

interface ClassTile {
  title: string
  description: string
  costs: string
  recommendation: string
  risk: string
}

const sections = [
  { id: "overview", title: "Warum AKU-Klassen wichtig sind" },
  { id: "klassen", title: "Die fünf AKU-Klassen im Vergleich" },
  { id: "entscheidung", title: "Entscheidungshilfe nach Klasse" },
  { id: "faq", title: "FAQ zu AKU-Klassen" }
]

const heroMetaItems = [
  {
    icon: <ClipboardList className="h-4 w-4" />,
    label: "Alle Klassen kompakt erklärt"
  },
  {
    icon: <ShieldAlert className="h-4 w-4" />,
    label: "Risiko-Einschätzung inklusive"
  },
  {
    icon: <CheckCircle className="h-4 w-4" />,
    label: "Kaufempfehlungen vom Tierarzt"
  }
]

const classTiles: ClassTile[] = [
  {
    title: "Klasse 1 – Ohne Befund",
    description: "Keine klinisch relevanten Auffälligkeiten. Röntgen- und Bewegungsbefunde unauffällig.",
    costs: "Teil der gewählten AKU-Klasse",
    recommendation: "Kauf uneingeschränkt empfohlen",
    risk: "Sehr gering"
  },
  {
    title: "Klasse 2 – Geringfügige Befunde",
    description: "Leichte Abweichungen ohne funktionelle Bedeutung (z. B. minimale röntgenologische Veränderungen).",
    costs: "Meist Klasse I/II",
    recommendation: "Kauf in der Regel empfohlen – Befunde dokumentieren",
    risk: "Gering"
  },
  {
    title: "Klasse 3 – Mäßige Befunde",
    description: "Befunde mit möglicher Auswirkung bei hoher Belastung (z. B. moderate Arthrosen).",
    costs: "Häufig Klasse II/III",
    recommendation: "Verwendungszweck prüfen, Zweitmeinung sinnvoll",
    risk: "Mittel"
  },
  {
    title: "Klasse 4 – Deutliche Befunde",
    description: "Relevante Befunde mit hohem Risiko (chronische Lahmheiten, deutliche Arthrosen).",
    costs: "Klasse III/IV",
    recommendation: "Nur bei Spezialanforderungen, Preis neu verhandeln",
    risk: "Hoch"
  },
  {
    title: "Klasse 5 – Hochgradige Befunde",
    description: "Schwerwiegende Befunde mit erheblicher Einschränkung (manifeste Lahmheiten, schwere Herzprobleme).",
    costs: "Klasse IV/V",
    recommendation: "Kauf nicht empfohlen, nur für Gnadenhof/Einschränkungen",
    risk: "Sehr hoch"
  }
]

const decisionTiles = [
  {
    title: "Klasse 1–2: Grünes Licht",
    detail: "Optimale Voraussetzungen für Sport, Zucht und Freizeit. Preisverhandlung eher über Ausstattung und Ausbildung."
  },
  {
    title: "Klasse 3: Gezielte Abwägung",
    detail: "Verwendungszweck kritisch prüfen, Trainingsplan anpassen, Kontrolluntersuchungen vereinbaren."
  },
  {
    title: "Klasse 4–5: Hohe Vorsicht",
    detail: "Nur bei speziellen Anforderungen oder deutlich reduziertem Preis in Betracht ziehen. Tierärztliche Zweitmeinung einholen."
  }
]

const faqItems: FAQItem[] = [
  {
    question: "Wer legt die AKU-Klasse fest?",
    answer:
      "Der untersuchende Tierarzt stuft alle Befunde nach dem gängigen AKU-Schema ein. Die Bewertung dient als Entscheidungsgrundlage für Käufer und Verkäufer."
  },
  {
    question: "Ändert sich der Kaufpreis je nach Klasse?",
    answer:
      "Ja. Klassen 1–2 rechtfertigen den vereinbarten Preis. Bei Klasse 3 solltest du je nach Risiko neu verhandeln, Klassen 4–5 führen meist zu hohen Abschlägen oder Kaufabbruch."
  },
  {
    question: "Kann sich eine Klasse nach der AKU noch ändern?",
    answer:
      "Das Protokoll bildet den Zustand am Untersuchungstag ab. Bei späteren Nachuntersuchungen kann sich die Bewertung ändern – dokumentiere Entwicklungen sorgfältig."
  },
  {
    question: "Wie gehe ich mit Klasse-3-Befunden um?",
    answer:
      "Prüfe gemeinsam mit dem Tierarzt, ob der geplante Einsatzzweck realistisch ist. Häufig helfen angepasste Trainingspläne oder regelmäßige Kontrollen."
  }
]

const relatedArticles = [
  {
    href: "/pferde-ratgeber/aku-pferd",
    image: "/images/blossi-shooting.webp",
    title: "AKU Pferd Überblick",
    badge: "AKU Guide",
    readTime: "12 Min.",
    description: "Der zentrale AKU-Ratgeber mit Kosten, Ablauf und Befundbewertung in einem Überblick."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/ablauf",
    image: "/veterinarian-examining-horse-health-check.webp",
    title: "AKU Ablauf verstehen",
    badge: "AKU Guide",
    readTime: "10 Min.",
    description: "Von Vorbereitung bis Befund – so läuft die Ankaufsuntersuchung Schritt für Schritt ab."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/kosten",
    image: "/person-evaluating-horse-for-purchase.webp",
    title: "AKU Kosten transparent",
    badge: "Kosten & Preise",
    readTime: "7 Min.",
    description: "Was jede Klasse kostet, wer bezahlt und wie du bei der AKU sparen kannst."
  }
]

const AkuPferdKlassen: NextPage = () => {
  const handleNavigate = (id: string) => scrollToSection(id)

  const handleScrollToToc = () => {
    if (typeof window === "undefined") return
    document.getElementById("inhaltsverzeichnis")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <>
        <Head>
          <title>AKU Pferd Klassen: Bedeutung & Entscheidungshilfe | PferdeWert</title>
          <meta
            name="description"
            content="AKU-Klassen 1–5 einfach erklärt: Bedeutung, Risiko, Verwendungszweck und Kaufempfehlung für jede Befundklasse."
          />
        </Head>

        <RatgeberHero
          badgeLabel="AKU Guide"
          badgeIcon={<ClipboardList className="h-4 w-4" />}
          title="AKU Klassen verstehen"
          subtitle="Von OB bis hochgradigem Befund – erfahre, was die AKU-Klassen bedeuten und wie du Entscheidungen triffst."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Pferdewert nach AKU prüfen",
            icon: <CheckCircle className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: <ChevronDown className="h-5 w-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src={getRatgeberBySlug('aku-pferd/klassen')?.image || '/images/ratgeber/aku-klassen-hero.webp'}
          alt="Tierärztliche Begutachtung eines Pferdes im Stall"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            <section id="overview" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Warum AKU-Klassen wichtig sind</h2>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Befunde richtig einordnen
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nach jeder Ankaufsuntersuchung werden Befunde in Klassen eingestuft – von OB (ohne Befund) bis hin zu hochgradigen
                Einschränkungen. Sie helfen dir, Risiken einzuschätzen, Preise fair zu verhandeln und den Einsatz deines zukünftigen
                Pferdes realistisch zu planen.
              </p>

              <RatgeberHighlightBox title="Darum lohnt sich das Verständnis" icon={<ShieldAlert className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>• Kaufentscheidungen auf Faktenbasis treffen</li>
                  <li>• Trainings- und Einsatzplanung optimal anpassen</li>
                  <li>• Versicherungen & Verträge mit realistischen Daten schließen</li>
                </ul>
              </RatgeberHighlightBox>
            </section>

            <section id="klassen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Die fünf AKU-Klassen im Vergleich</h2>

              <h3 className="text-2xl font-serif font-bold text-brand mb-6">
                Klassen, Risiko & Empfehlung
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classTiles.map((klasse) => (
                  <div key={klasse.title} className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
                    <h4 className="text-xl font-serif font-bold text-brand">
                      {klasse.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Risiko:</span>
                      <span className="text-lg font-bold text-brand-brown">{klasse.risk}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {klasse.description}
                    </p>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong className="text-brand">Empfehlung:</strong> {klasse.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <RatgeberHighlightBox title="Kosten je nach Befund" icon={<ShieldAlert className="h-5 w-5 text-brand-brown" />}>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Die Klassifizierung beeinflusst den empfohlenen AKU-Umfang: Während Klassen 1–2 meist mit der kleinen bzw. großen AKU
                  abgedeckt sind, erfordern Klassen 3–5 zusätzliche Diagnostik und Budget für Nachuntersuchungen.
                </p>
              </RatgeberHighlightBox>
            </section>

            <section id="entscheidung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Entscheidungshilfe nach Klasse</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {decisionTiles.map((tile) => (
                  <RatgeberHighlightBox key={tile.title} title={tile.title} icon={<ShieldAlert className="h-5 w-5 text-brand-brown" />} padding="p-6">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{tile.detail}</p>
                  </RatgeberHighlightBox>
                ))}
              </div>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                So gehst du nach der AKU weiter vor
              </h3>
              <ul className="space-y-2 text-gray-700 text-base leading-relaxed">
                <li>• Bewertung gemeinsam mit dem Tierarzt durchsprechen und dokumentieren</li>
                <li>• Bei Klassen 3–5 Einsatzgebiet, Versicherung und Training anpassen</li>
                <li>• Befunde als Argument für Preisverhandlungen nutzen</li>
                <li>• Bei Unklarheiten eine unabhängige Zweitmeinung einholen</li>
              </ul>
            </section>
          </article>

          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ sectionTitle="Häufig gestellte Fragen zu AKU-Klassen" faqs={faqItems} />
          </section>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Alles, was du zusätzlich zur AKU über Ablauf und Kosten wissen solltest."
            articles={relatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: "/horse-in-stable--professional-care.webp",
              alt: "Pferdebewertung mit dokumentierten AKU-Klassen"
            }}
            title="AKU-Ergebnis erhalten – und jetzt?"
            description="Lass die Befunde von unserer KI auswerten und erhalte eine marktgerechte Preisempfehlung für dein Wunschpferd."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Pferdewert berechnen"
          />
        </div>
      </>
    </Layout>
  )
}

export default AkuPferdKlassen