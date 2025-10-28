import { NextPage } from "next"
import React from "react"
import Head from "next/head"
import Link from "next/link"
import { ClipboardList, Stethoscope, Microscope, FileText, CheckCircle, ChevronDown } from "lucide-react"

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
import { getRelatedArticles, getRatgeberPath } from "@/lib/ratgeber-registry"
import { createHeroMetaItems } from "@/utils/ratgeber/heroMetaItems"

interface PhaseStep {
  phase: string
  icon: React.ReactElement
  description: string
  details: string[]
}

interface AKUClass {
  title: string
  costs: string
  scope: string
  recommendation: string
}

const sections = [
  { id: "overview", title: "Warum der Ablauf wichtig ist" },
  { id: "phasen", title: "Die 5 Phasen der AKU" },
  { id: "klassen", title: "Welche AKU-Klasse brauchst du?" },
  { id: "vorbereitung", title: "So bereitest du dich vor" },
  { id: "faq", title: "FAQ zum AKU-Ablauf" }
]

const heroMetaItems = createHeroMetaItems([
  {
    icon: <ClipboardList className="h-4 w-4" />,
    label: "5 Phasen Schritt für Schritt"
  },
  {
    icon: <Stethoscope className="h-4 w-4" />,
    label: "Klinische & Röntgenuntersuchung"
  },
  {
    icon: <CheckCircle className="h-4 w-4" />,
    label: "Checklisten & Vorbereitung"
  }
])

const phaseSteps: PhaseStep[] = [
  {
    phase: "Phase 1 – Vorbericht & Anamnese",
    icon: <ClipboardList className="h-6 w-6 text-brand-brown" />,
    description: "Dokumentation von Vorerkrankungen, bisheriger Nutzung und Haltung. Der Tierarzt fragt Besitzer und Verkäufer nach bekannten Auffälligkeiten.",
    details: [
      "Vorgeschichte des Pferdes abklären (Verletzungen, Erkrankungen)",
      "Informationen zu Training, Haltung und Fütterung",
      "Verhalten des Pferdes im Alltag dokumentieren"
    ]
  },
  {
    phase: "Phase 2 – Allgemeine klinische Untersuchung",
    icon: <Stethoscope className="h-6 w-6 text-brand-brown" />,
    description: "Erste körperliche Untersuchung: Abhören von Herz & Lunge, Temperaturmessung, Zahnkontrolle und Beurteilung des Allgemeinzustands.",
    details: [
      "Herz-Kreislauf und Atemwege überprüfen",
      "Schleimhäute, Reflexe und Zahnstatus beurteilen",
      "Haltungsfehler oder äußere Verletzungen erkennen"
    ]
  },
  {
    phase: "Phase 3 – Bewegungsuntersuchung & Flexionstests",
    icon: <FileText className="h-6 w-6 text-brand-brown" />,
    description: "Pferd wird in Schritt, Trab und unter Belastung beobachtet. Flexionstests zeigen versteckte Lahmheiten oder Gelenkprobleme auf.",
    details: [
      "Gangwerk in allen Gangarten analysieren",
      "Beugeproben an Vorder- und Hinterbeinen durchführen",
      "Belastungstest auf hartem und weichem Boden"
    ]
  },
  {
    phase: "Phase 4 – Röntgen & Bildgebung",
    icon: <Microscope className="h-6 w-6 text-brand-brown" />,
    description: "Je nach AKU-Klasse werden 8–18 (oder mehr) Röntgenaufnahmen gemacht. Standardmäßig: Hufe, Fesselgelenke, Sprunggelenke, Kniegelenke.",
    details: [
      "Aufnahmen nach veterinärmedizinischem Standard anfertigen",
      "Auswertung auf Arthrosen, Frakturen oder Veränderungen",
      "Bei Bedarf erweiterte Bilder (Rücken, Hals, Schulter)"
    ]
  },
  {
    phase: "Phase 5 – Befundung & Protokoll",
    icon: <CheckCircle className="h-6 w-6 text-brand-brown" />,
    description: "Alle Ergebnisse werden zusammengefasst und als AKU-Protokoll dokumentiert. Der Tierarzt bewertet, ob das Pferd kauftauglich ist – und gibt Empfehlungen.",
    details: [
      "Bewertung nach AKU-Klasse (Klasse 1–5)",
      "Übergabe eines schriftlichen Protokolls mit allen Befunden",
      "Besprechung kritischer Punkte und Handlungsempfehlungen"
    ]
  }
]

const akuClasses: AKUClass[] = [
  {
    title: "Klasse I – Kleine AKU",
    costs: "150 – 300 €",
    scope: "Klinische Untersuchung ohne Röntgen",
    recommendation: "Für Freizeitpferde mit kleinem Budget"
  },
  {
    title: "Klasse II – Große AKU",
    costs: "400 – 800 €",
    scope: "Standardumfang inkl. 10–12 Röntgenaufnahmen",
    recommendation: "Empfohlen für Sportpferde bis 25.000 €"
  },
  {
    title: "Klasse III – Erweiterte AKU",
    costs: "800 – 1.500 €",
    scope: "Zusätzliche Bilder + Ultraschall",
    recommendation: "Für hochwertige Sport- und Zuchtpferde"
  },
  {
    title: "Klasse IV/V – Spezialdiagnostik",
    costs: "ab 1.500 €",
    scope: "Endoskopie, Labor, MRT nach Bedarf",
    recommendation: "Für internationale Verkäufe und Spitzenpferde"
  }
]

const preparationSteps = [
  "Termin frühzeitig mit unabhängigem Tierarzt vereinbaren",
  "Voruntersuchungen oder vorhandene Röntgenbilder bereitstellen",
  "Pferd am Tag der AKU nicht sedieren (Bewegungsbeurteilung!)",
  "Hufe sauber und gepflegt präsentieren",
  "Versicherungspolice und Kaufpreis bereits klären",
  "Budget für Zusatzkosten (Anfahrt, Sedierung) einplanen"
]

const faqItems: FAQItem[] = [
  {
    question: "Wie lange dauert eine AKU?",
    answer:
      "Je nach Umfang 1,5–4 Stunden. Klasse II dauert ca. 2–3 Stunden, Klasse III/IV kann einen ganzen Tag in Anspruch nehmen."
  },
  {
    question: "Wer sucht den Tierarzt aus?",
    answer:
      "Der Käufer wählt den Tierarzt, um Neutralität zu gewährleisten. Ein vom Verkäufer beauftragter Tierarzt kann Interessenkonflikte haben."
  },
  {
    question: "Was passiert bei einem negativen Befund?",
    answer:
      "Je nach Schweregrad kannst du vom Kaufvertrag zurücktreten, eine Zweitmeinung einholen oder den Preis neu verhandeln."
  },
  {
    question: "Darf der Verkäufer bei der AKU dabei sein?",
    answer:
      "Ja, der Verkäufer kann anwesend sein – hat jedoch kein Mitspracherecht beim Ablauf. Manche Käufer bevorzugen eine AKU ohne Verkäufer."
  }
]

const relatedArticles = getRelatedArticles('aku-pferd/ablauf').map(entry => ({
  href: getRatgeberPath(entry.slug),
  image: entry.image,
  title: entry.title,
  badge: entry.category,
  readTime: entry.readTime,
  description: entry.description
}))

const AkuPferdAblauf: NextPage = () => {
  const handleNavigate = (id: string) => scrollToSection(id)

  const handleScrollToToc = () => {
    if (typeof window === "undefined") return
    document.getElementById("inhaltsverzeichnis")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <>
        <Head>
          <title>AKU Pferd Ablauf: 5 Phasen Schritt für Schritt | PferdeWert</title>
          <meta
            name="description"
            content="So läuft die Ankaufsuntersuchung ab: Alle 5 Phasen, Vorbereitung, AKU-Klassen und Tipps für eine erfolgreiche Pferdebewertung."
          />
        </Head>

        <RatgeberHero
          badgeLabel="AKU Guide"
          badgeIcon={<ClipboardList className="h-4 w-4" />}
          title="AKU Ablauf verstehen"
          subtitle="Von der Anamnese bis zum Protokoll – erfahre, wie die Ankaufsuntersuchung Schritt für Schritt abläuft und wie du dich optimal vorbereitest."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Pferdewert mit AKU berechnen",
            icon: <CheckCircle className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: <ChevronDown className="h-5 w-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src='/images/ratgeber/aku-pferd/ablauf/aku-ablauf-untersuchung.webp'
          alt="Tierarzt führt Ankaufsuntersuchung bei Pferd durch"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            <section id="overview" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Warum der Ablauf wichtig ist
              </h2>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Was passiert bei der AKU?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Ankaufsuntersuchung ist eine strukturierte tierärztliche Prüfung, die in fünf aufeinander aufbauenden Phasen
                durchgeführt wird. Jede Phase deckt andere Aspekte der Pferdegesundheit ab – von der Erstbegutachtung bis zur
                finalen Befundung. Verstehe den Ablauf, damit du weißt, worauf es ankommt und wie du dich optimal vorbereitest.
              </p>

              <RatgeberHighlightBox
                title="Darum solltest du den Ablauf kennen"
                icon={<ClipboardList className="h-5 w-5 text-brand-brown" />}
              >
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>• Du kannst gezielte Fragen stellen und verstehst die Ergebnisse besser</li>
                  <li>• Transparenz reduziert Überraschungen und erhöht das Vertrauen</li>
                  <li>• Frühzeitige Planung spart Zeit, Geld und Nerven</li>
                </ul>
              </RatgeberHighlightBox>
            </section>

            <section id="phasen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Die 5 Phasen der AKU</h2>

              <div className="space-y-8">
                {phaseSteps.map((phase, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">{phase.icon}</div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-brand">
                        {phase.phase}
                      </h3>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed">
                      {phase.description}
                    </p>

                    <ul className="space-y-2 text-gray-700">
                      {phase.details.map((detail, idx) => (
                        <li key={idx} className="leading-relaxed">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="klassen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Welche AKU-Klasse brauchst du?
              </h2>

              <h3 className="text-2xl font-serif font-bold text-brand mb-6">
                Welche Klasse passt zu deinem Kaufpreis?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {akuClasses.map((klasse) => (
                  <div key={klasse.title} className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
                    <h4 className="text-xl font-serif font-bold text-brand">
                      {klasse.title}
                    </h4>
                    <p className="text-2xl font-bold text-brand-brown">
                      {klasse.costs}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {klasse.scope}
                    </p>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong className="text-brand">Empfehlung:</strong> {klasse.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <RatgeberHighlightBox
                title="Faustregel zur Klassenwahl"
                icon={<ClipboardList className="h-5 w-5 text-brand-brown" />}
              >
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Plane 2–5 % des Kaufpreises für die AKU ein. Für Freizeitpferde reicht meist Klasse II, bei Sport- und Zuchtpferden
                  solltest du Klasse III oder höher wählen. Unsere <Link href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand-brown font-semibold hover:underline">Kostenübersicht für die Pferdeanschaffung</Link> hilft dir, alle Ausgaben im Blick zu behalten.
                </p>
              </RatgeberHighlightBox>
            </section>

            <section id="vorbereitung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                So bereitest du dich vor
              </h2>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Tipps zum AKU-Protokoll
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Lass dir das Protokoll vollständig aushändigen – inklusive aller Röntgenbilder und Befunde. Kläre vorab, wer
                das Protokoll nach der Untersuchung aufbewahrt. Für spätere Verkäufe oder Versicherungen ist eine lückenlose
                Dokumentation Gold wert.
              </p>

              <RatgeberHighlightBox
                title="Checkliste: Vorbereitung zur AKU"
                icon={<CheckCircle className="h-5 w-5 text-brand-brown" />}
              >
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  {preparationSteps.map((step, idx) => (
                    <li key={idx}>• {step}</li>
                  ))}
                </ul>
              </RatgeberHighlightBox>
            </section>
          </article>

          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ sectionTitle="Häufig gestellte Fragen zum AKU-Ablauf" faqs={faqItems} />
          </section>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Vertiefe dein Wissen über AKU-Kosten, Klassen und wie Befunde den Pferdewert beeinflussen."
            articles={relatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: "/images/shared/blossi-shooting.webp",
              alt: "Tierarzt bei der Ankaufsuntersuchung"
            }}
            title="AKU abgeschlossen – und jetzt?"
            description="Nutze das AKU-Protokoll für eine fundierte Preisempfehlung. Unsere KI integriert alle Befunde und gibt dir einen marktgerechten Wert."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Pferdewert berechnen"
          />
        </div>
      </>
    </Layout>
  )
}

export default AkuPferdAblauf
