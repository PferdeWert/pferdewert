import { NextPage } from "next"
import Head from "next/head"
import { ClipboardList, Stethoscope, Microscope, FileText, CheckCircle } from "lucide-react"

import Layout from "@/components/Layout"
import ContentSection from "@/components/ContentSection"
import FAQ from "@/components/FAQ"
import RatgeberHero from "@/components/ratgeber/RatgeberHero"
import RatgeberHeroImage from "@/components/ratgeber/RatgeberHeroImage"
import RatgeberHighlightBox from "@/components/ratgeber/RatgeberHighlightBox"
import RatgeberInfoTiles from "@/components/ratgeber/RatgeberInfoTiles"
import RatgeberRelatedArticles from "@/components/ratgeber/RatgeberRelatedArticles"
import RatgeberFinalCTA from "@/components/ratgeber/RatgeberFinalCTA"
import RatgeberTableOfContents from "@/components/ratgeber/RatgeberTableOfContents"
import { FAQItem } from "@/types/faq.types"
import scrollToSection from "@/utils/ratgeber/scrollToSection"

interface PhaseTile {
  id: string
  title: string
  duration: string
  description: string
  steps: string[]
  keyPoints: string[]
}

interface AkuClassTile {
  title: string
  scope: string
  costs: string
  recommendation: string
}

const sections = [
  { id: "overview", title: "AKU Ablauf im Überblick" },
  { id: "phasen", title: "Die 5 Phasen der Ankaufsuntersuchung" },
  { id: "klassen", title: "AKU-Klassen & Umfang" },
  { id: "tipps", title: "Vorbereitung & Protokoll" },
  { id: "faq", title: "FAQ zur AKU" }
]

const heroMetaItems = [
  {
    icon: <ClipboardList className="h-4 w-4" />,
    label: "5 Phasen verständlich erklärt"
  },
  {
    icon: <Stethoscope className="h-4 w-4" />,
    label: "Tierarzt-Checklisten inklusive"
  },
  {
    icon: <Microscope className="h-4 w-4" />,
    label: "Spezialdiagnostik im Überblick"
  }
]

const phases: PhaseTile[] = [
  {
    id: "vorbereitung",
    title: "1. Vorbereitung & Termin",
    duration: "1–2 Wochen vorher",
    description: "Planung, Tierarztauswahl und Abstimmung mit dem Verkäufer.",
    steps: [
      "Unabhängigen Tierarzt mit AKU-Erfahrung beauftragen",
      "AKU-Klasse nach Kaufpreis & Nutzung festlegen",
      "Kosten und Anfahrt im Vorfeld abstimmen",
      "Papiere, Vorbefunde und Trainingsnachweise zusammenstellen"
    ],
    keyPoints: [
      "Tierarzt darf nicht der Verkäufer-Arzt sein",
      "Längere Anfahrten rechtzeitig einplanen",
      "Backup-Termin für Schlechtwetter reservieren"
    ]
  },
  {
    id: "anamnese",
    title: "2. Anamnese & Vorgeschichte",
    duration: "15–30 Minuten",
    description: "Gesundheitsfragen, Einsatzzweck und bisherige Leistungen klären.",
    steps: [
      "Krankengeschichte und Behandlungen erfassen",
      "Impfungen, Wurmkuren, Huftermine prüfen",
      "Verhalten und Trainingsstand diskutieren",
      "Identität per Pass oder Chip verifizieren"
    ],
    keyPoints: [
      "Ehrliche Angaben schaffen Rechtssicherheit",
      "Frühere Lahmheiten offen ansprechen",
      "Alle Unterlagen griffbereit halten"
    ]
  },
  {
    id: "klinisch",
    title: "3. Klinische Untersuchung",
    duration: "45–90 Minuten",
    description: "Systematische Prüfung von Kopf bis Schweif inklusive Bewegungsanalyse.",
    steps: [
      "Adspektion im Stand: Körperbau & Gliedmaßen",
      "Palpation von Gelenken, Sehnen und Bändern",
      "Herz- und Lungencheck, Atemwege, Augen",
      "Bewegungsanalyse im Schritt, Trab und bei Bedarf Galopp"
    ],
    keyPoints: [
      "Vergleich beider Körperseiten",
      "Alle Befunde werden protokolliert",
      "Ruhiges Pferd erleichtert die Untersuchung"
    ]
  },
  {
    id: "bildgebung",
    title: "4. Bildgebung & Spezialdiagnostik",
    duration: "30–120 Minuten",
    description: "Röntgen, Ultraschall und weitere Spezialuntersuchungen je nach Klasse.",
    steps: [
      "Standard-Röntgen (10–12 Aufnahmen)",
      "Optionale Rücken-, Hals- oder Kopfaufnahmen",
      "Ultraschall bei Sehnenverdacht",
      "Endoskopie & Blutprofile nach Bedarf"
    ],
    keyPoints: [
      "Umfang vorab vereinbaren – Kosten im Blick behalten",
      "Röntgenbilder gehören dem Auftraggeber",
      "Spezialdiagnostik bei hochpreisigen Pferden empfehlenswert"
    ]
  },
  {
    id: "befund",
    title: "5. Befundauswertung & Protokoll",
    duration: "30–45 Minuten",
    description: "Zusammenfassung aller Ergebnisse, Risikobewertung und Kaufempfehlung.",
    steps: [
      "Befunde nach AKU-Schema (OB/MB) einordnen",
      "Protokoll inkl. Bilddokumentation erstellen",
      "Kaufempfehlung oder Einschränkung formulieren",
      "Empfehlungen für Nachuntersuchungen geben"
    ],
    keyPoints: [
      "Alles schriftlich fixieren lassen",
      "Rückfragen direkt klären",
      "Protokoll digital speichern und Versicherer informieren"
    ]
  }
]

const akuClasses: AkuClassTile[] = [
  {
    title: "Klasse I – Kleine AKU",
    scope: "Klinische Untersuchung & einfache Flexionstests",
    costs: "150 – 300 €",
    recommendation: "Für Freizeitpferde bis ca. 5.000 €"
  },
  {
    title: "Klasse II – Große AKU",
    scope: "Klinik + Standard-Röntgen (10–12 Aufnahmen)",
    costs: "400 – 800 €",
    recommendation: "Für Sportpferde und Kaufpreise bis 25.000 €"
  },
  {
    title: "Klasse III – Erweiterte AKU",
    scope: "Zusätzliche Röntgenprojektionen, Ultraschall",
    costs: "800 – 1.500 €",
    recommendation: "Für hochwertige Sport- und Zuchtpferde"
  },
  {
    title: "Klasse IV/V – Spezial-AKU",
    scope: "Individuelle Diagnostik inkl. Endoskopie & Labor",
    costs: "ab 1.500 €",
    recommendation: "Für internationale Verkäufe & Profis"
  }
]

const preparationChecklist = [
  "Pferdepass, Impfpass, vorhandene Röntgenbilder & Befunde",
  "Pferd sauber vorstellen, Hufe frisch auskratzen oder beschlagen",
  "Ruhige Fläche für Schritt/Trab an der Hand und an der Longe",
  "Zeitpuffer für Röntgen & Spezialdiagnostik einplanen",
  "Fragen & Einsatzprofil schriftlich notieren"
]

const faqItems: FAQItem[] = [
  {
    question: "Wie lange dauert eine komplette AKU?",
    answer:
      "Je nach Umfang zwischen 2 und 4 Stunden. Erweiterte Klassen mit Spezialdiagnostik können zusätzliche Termine erfordern."
  },
  {
    question: "Wer trägt die AKU-Kosten?",
    answer:
      "In der Regel der Käufer. Bei Abbruch aufgrund schwerer Befunde können anteilige Kosten mit dem Verkäufer verhandelt werden." 
  },
  {
    question: "Wann lohnt sich eine erweiterte AKU?",
    answer:
      "Je höher der Kaufpreis und der sportliche Anspruch, desto umfassender sollte die Diagnostik sein. Für Pferde über 15.000 € ist Klasse II/III Standard."
  },
  {
    question: "Wie aussagekräftig sind AKU-Befunde?",
    answer:
      "Sie dokumentieren den Zustand am Untersuchungstag. Besprich mit dem Tierarzt, welche Befunde kaufpreismindernd oder risikoreich sind."
  }
]

const relatedArticles = [
  {
    href: "/aku-pferd",
    image: "/images/blossi-shooting.webp",
    title: "AKU Pferd Überblick",
    badge: "AKU Guide",
    readTime: "12 Min.",
    description: "Kompletter Einstieg in Kosten, Ablauf und Befunde der Ankaufsuntersuchung."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/klassen",
    image: "/horse-in-stable--professional-care.webp",
    title: "AKU Klassen verstehen",
    badge: "AKU Guide",
    readTime: "9 Min.",
    description: "Welcher Umfang ist sinnvoll? Kosten, Nutzen und Entscheidungshilfen für jede Klasse."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/kosten",
    image: "/person-evaluating-horse-for-purchase.webp",
    title: "AKU Kosten 2025",
    badge: "Kosten & Preise",
    readTime: "7 Min.",
    description: "Transparente Kostenübersicht plus Spartipps für Käufer und Verkäufer."
  }
]

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
          <title>AKU Pferd Ablauf: Von Vorbereitung bis Befund | PferdeWert</title>
          <meta
            name="description"
            content="Kompletter Ablauf der Ankaufsuntersuchung: Vorbereitung, klinische Untersuchung, Röntgen, Spezialdiagnostik und Befundauswertung – inklusive Checklisten."
          />
        </Head>

        <RatgeberHero
          badgeLabel="AKU Guide"
          badgeIcon={<ClipboardList className="h-4 w-4" />}
          title="AKU Pferd Ablauf: Schritt für Schritt"
          subtitle="Verstehe jeden Schritt der Ankaufsuntersuchung – von der Vorbereitung bis zum finalen Befund mit klaren To-dos."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Pferdewert nach AKU berechnen",
            icon: <CheckCircle className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: <Stethoscope className="h-5 w-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src="/veterinarian-examining-horse-health-check.jpg"
          alt="Tierärztin untersucht ein Pferd während der AKU"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            <section id="overview" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">AKU Ablauf im Überblick</h2>
              <ContentSection
                icon={<ClipboardList className="h-6 w-6" />}
                title="Was passiert bei der AKU?"
                content={
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Die Ankaufsuntersuchung ist eine strukturierte tierärztliche Prüfung. Sie besteht aus fünf aufeinander aufbauenden
                    Phasen: Vorbereitung, Anamnese, klinische Untersuchung, Bildgebung und Befundbesprechung. Jede Phase liefert
                    Bausteine für deine Kaufentscheidung.
                  </p>
                }
              />
              <RatgeberHighlightBox title="Ziele der AKU" icon={<Stethoscope className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>• Transparenz über den aktuellen Gesundheitszustand</li>
                  <li>• Einschätzung des zukünftigen Einsatzrisikos</li>
                  <li>• Grundlage für Preisverhandlung und Versicherung</li>
                </ul>
              </RatgeberHighlightBox>
            </section>

            <section id="phasen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Die 5 Phasen der Ankaufsuntersuchung</h2>
              <div className="space-y-4 md:space-y-6">
                {phases.map((phase) => (
                  <RatgeberHighlightBox key={phase.id} title={`${phase.title} · ${phase.duration}`} icon={<FileText className="h-5 w-5 text-brand-brown" />} padding="p-6">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">{phase.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <h3 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Ablauf</h3>
                        <ul className="space-y-1 text-gray-700 text-sm md:text-base leading-relaxed">
                          {phase.steps.map((step) => (
                            <li key={step}>• {step}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-brown mb-2 text-sm md:text-base">Wichtige Hinweise</h3>
                        <ul className="space-y-1 text-gray-700 text-sm md:text-base leading-relaxed">
                          {phase.keyPoints.map((point) => (
                            <li key={point}>• {point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </RatgeberHighlightBox>
                ))}
              </div>
            </section>

            <section id="klassen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">AKU-Klassen & Umfang</h2>
              <RatgeberInfoTiles
                headline="Welche Klasse passt zu deinem Kaufpreis?"
                tiles={akuClasses.map((klasse) => ({
                  title: klasse.title,
                  value: klasse.costs,
                  description: `${klasse.scope} · Empfehlung: ${klasse.recommendation}`
                }))}
              />
              <RatgeberHighlightBox title="Entscheidungshilfe" icon={<Microscope className="h-5 w-5 text-brand-brown" />}>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Investiere 2–5 % des Kaufpreises in die AKU. Je höher der sportliche Anspruch, desto umfassender sollte die Diagnostik
                  ausfallen. Besprich unklare Befunde direkt mit dem Untersuchungstierarzt.
                </p>
              </RatgeberHighlightBox>
            </section>

            <section id="tipps" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Vorbereitung & Protokoll</h2>
              <RatgeberHighlightBox title="Vorbereitung am Untersuchungstag" icon={<ClipboardList className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  {preparationChecklist.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </RatgeberHighlightBox>
              <ContentSection
                icon={<FileText className="h-6 w-6" />}
                title="Tipps zum AKU-Protokoll"
                content={
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Lass dir das Protokoll vollständig aushändigen. Markiere kritische MB-Befunde und kläre, ob sie den geplanten Einsatz
                    beeinflussen. Digitale Röntgenbilder solltest du für Versicherungen und zukünftige Tierärzte archivieren.
                  </p>
                }
              />
            </section>
          </article>

          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ sectionTitle="Häufig gestellte Fragen zur AKU" faqs={faqItems} />
          </section>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Vertiefe dein Wissen zu AKU-Umfang, Kosten und Befundinterpretation."
            articles={relatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: "/veterinarian-examining-horse-health-check.jpg",
              alt: "Professionelle Pferdebewertung nach der AKU"
            }}
            title="AKU abgeschlossen – wie geht es weiter?"
            description="Nutze unsere KI, um die AKU-Befunde in eine marktgerechte Preisbewertung zu überführen und sicher zu verhandeln."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Pferdewert jetzt berechnen"
          />
        </div>
      </>
    </Layout>
  )
}

export default AkuPferdAblauf
