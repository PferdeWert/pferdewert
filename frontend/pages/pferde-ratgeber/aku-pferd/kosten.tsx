import { NextPage } from "next"
import Head from "next/head"
import { Calculator, Wallet, PiggyBank, MapPin, ChevronDown } from "lucide-react"

import Layout from "@/components/Layout"
import FAQ from "@/components/FAQ"
import RatgeberHero from "@/components/ratgeber/RatgeberHero"
import RatgeberHeroImage from "@/components/ratgeber/RatgeberHeroImage"
import RatgeberHighlightBox from "@/components/ratgeber/RatgeberHighlightBox"
import RatgeberRelatedArticles from "@/components/ratgeber/RatgeberRelatedArticles"
import RatgeberFinalCTA from "@/components/ratgeber/RatgeberFinalCTA"
import RatgeberTableOfContents from "@/components/ratgeber/RatgeberTableOfContents"
import { FAQItem } from "@/types/faq.types"
import scrollToSection from "@/utils/ratgeber/scrollToSection"

const sections = [
  { id: "overview", title: "AKU Kosten im Überblick" },
  { id: "klassen", title: "Kosten pro AKU-Klasse" },
  { id: "zusatzkosten", title: "Zusatzkosten & Faktoren" },
  { id: "regionen", title: "Regionale Preisunterschiede" },
  { id: "spartipps", title: "Spartipps & Budgetplanung" },
  { id: "faq", title: "FAQ zu AKU Kosten" }
]

const heroMetaItems = [
  {
    icon: <Calculator className="h-4 w-4" />,
    label: "Kosten je Klasse erklärt"
  },
  {
    icon: <Wallet className="h-4 w-4" />,
    label: "Budgetplanung inklusive"
  },
  {
    icon: <PiggyBank className="h-4 w-4" />,
    label: "Spartipps vom Tierarzt"
  }
]

const classCosts = [
  {
    title: "Klasse I – Kleine AKU",
    value: "150 – 300 €",
    description: "Klinische Untersuchung, Flexionstests, ohne Röntgen. Für Freizeitpferde und kleinere Budgets."
  },
  {
    title: "Klasse II – Große AKU",
    value: "400 – 800 €",
    description: "Standardumfang inkl. Röntgen (10–12 Aufnahmen). Empfohlen für Sportpferde und Kaufpreise bis 25.000 €."
  },
  {
    title: "Klasse III – Erweiterte AKU",
    value: "800 – 1.500 €",
    description: "Zusätzliche Röntgenbilder, Ultraschall. Für hochwertige Sport- und Zuchtpferde sinnvoll."
  },
  {
    title: "Klasse IV/V – Spezialdiagnostik",
    value: "ab 1.500 €",
    description: "Individuelle Untersuchungen (Endoskopie, Labor, MRT). Für internationale Verkäufe und Höchstpreise."
  }
]

const extraCosts = [
  "Anfahrtskosten: 40 – 180 € je nach Kilometer & Region",
  "Sedierung für Röntgen: 45 – 120 €",
  "Wochenend- und Feiertagszuschläge: +20–30 %",
  "Zusatzaufnahmen Rücken/Hals: 120 – 250 €",
  "Labor (Blutbild, Doping): 100 – 250 €"
]

const regionen = [
  {
    title: "Deutschland (Durchschnitt)",
    description: "Klasse I: 150–300 €, Klasse II: 400–800 €, Klasse III: 800–2.000 €. Zuschläge für Sedierung & Anfahrt einplanen."
  },
  {
    title: "Bayern & Süddeutschland",
    description: "Höhere Lebenshaltungskosten: Klasse II oft 450–900 €. Premiumkliniken mit modernem Equipment."
  },
  {
    title: "Norddeutschland",
    description: "Etwas günstiger: Klasse II 380–750 €. Ländliche Strukturen, dafür ggf. längere Anfahrten."
  }
]

const savingsTips = [
  "Tierarzt direkt am Stalltermin mehrerer Käufer beteiligen – Anfahrtskosten teilen",
  "Röntgenbilder aus Voruntersuchungen mitbringen und auf Aktualität prüfen (max. 6 Monate)",
  "Werktagstermine wählen, Wochenendzuschläge vermeiden",
  "Vorab klären, welche Zusatzdiagnostik wirklich notwendig ist",
  "AKU-Kosten als Verhandlungsbasis nutzen, falls Befunde vorliegen"
]

const faqItems: FAQItem[] = [
  {
    question: "Wer bezahlt die AKU?",
    answer:
      "In der Regel der Käufer. Bei Kaufabbruch aufgrund kritischer Befunde können Kostenanteile mit dem Verkäufer verhandelt werden – wichtige Punkte vorab vertraglich klären."
  },
  {
    question: "Wie viel sollte ich für die AKU einplanen?",
    answer:
      "Plane 2–5 % des Kaufpreises für die AKU ein. Für Freizeitpferde reicht oft Klasse II, bei Sportpferden solltest du Klasse III oder Spezialdiagnostik einkalkulieren."
  },
  {
    question: "Welche Zusatzkosten können entstehen?",
    answer:
      "Anfahrt, Sedierung, Laborwerte, Spezialaufnahmen, Wochenendzuschläge – frage vorab nach einem transparenten Kostenvoranschlag."
  },
  {
    question: "Kann ich bei der AKU sparen?",
    answer:
      "Ja: Wähle Tierärzte mit kurzer Anfahrt, kombiniere Termine mit anderen Käufern und lass nur sinnvolle Zusatzdiagnostik durchführen."
  }
]

const relatedArticles = [
  {
    href: "/pferde-ratgeber/aku-pferd",
    image: "/images/blossi-shooting.webp",
    title: "AKU Pferd Überblick",
    badge: "AKU Guide",
    readTime: "12 Min.",
    description: "Das komplette Grundwissen zu Ablauf, Klassen, Kosten und Befunden der AKU."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/ablauf",
    image: "/veterinarian-examining-horse-health-check.webp",
    title: "AKU Ablauf verstehen",
    badge: "AKU Guide",
    readTime: "10 Min.",
    description: "Von Vorbereitung bis Befund: So läuft die Ankaufsuntersuchung Schritt für Schritt ab."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/klassen",
    image: "/horse-in-stable--professional-care.webp",
    title: "AKU Klassen erklärt",
    badge: "AKU Guide",
    readTime: "8 Min.",
    description: "Welche Klasse ist die richtige? Bedeutung, Risiko und Kaufempfehlung im Überblick."
  }
]

const AkuPferdKosten: NextPage = () => {
  const handleNavigate = (id: string) => scrollToSection(id)

  const handleScrollToToc = () => {
    if (typeof window === "undefined") return
    document.getElementById("inhaltsverzeichnis")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <>
        <Head>
          <title>AKU Pferd Kosten 2025: Transparente Übersicht | PferdeWert</title>
          <meta
            name="description"
            content="Alle Kosten der Ankaufsuntersuchung im Überblick: Preise pro Klasse, Zusatzkosten, regionale Unterschiede und Spartipps."
          />
        </Head>

        <RatgeberHero
          badgeLabel="AKU Guide"
          badgeIcon={<Calculator className="h-4 w-4" />}
          title="AKU Kosten transparent erklärt"
          subtitle="Von der kleinen AKU bis zur Spezialdiagnostik – erfahre, welche Kosten auf dich zukommen und wie du klug planst."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Pferdewert mit AKU berechnen",
            icon: <Calculator className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: <ChevronDown className="h-5 w-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src="/person-evaluating-horse-for-purchase.webp"
          alt="Käufer bewertet Pferd und kalkuliert AKU-Kosten"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            <section id="overview" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">AKU Kosten im Überblick</h2>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Womit du rechnen solltest
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Kosten der Ankaufsuntersuchung setzen sich aus dem gewählten Umfang (AKU-Klasse) und zusätzlichen Leistungen
                wie Röntgen, Labor und Anfahrt zusammen. Plane je nach Kaufpreis und Anspruch 2–5 % des Kaufpreises ein.
              </p>

              <RatgeberHighlightBox title="Kostenfaktoren" icon={<Wallet className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>• Umfang der Bildgebung (Anzahl und Art der Röntgenaufnahmen)</li>
                  <li>• Zusatzdiagnostik wie Ultraschall, Endoskopie oder Laborwerte</li>
                  <li>• Region, Klinikgröße und Wochenendzuschläge</li>
                  <li>• Reise- und Wartezeiten der Tierärzte</li>
                </ul>
              </RatgeberHighlightBox>
            </section>

            <section id="klassen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Kosten pro AKU-Klasse</h2>

              <h3 className="text-2xl font-serif font-bold text-brand mb-6">
                Preisrahmen je Klasse
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classCosts.map((cost) => (
                  <div key={cost.title} className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
                    <h4 className="text-xl font-serif font-bold text-brand">
                      {cost.title}
                    </h4>
                    <p className="text-2xl font-bold text-brand-brown">
                      {cost.value}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {cost.description}
                    </p>
                  </div>
                ))}
              </div>

              <RatgeberHighlightBox title="Faustregel" icon={<Calculator className="h-5 w-5 text-brand-brown" />}>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Freizeitpferde bis 5.000 € kommen mit Klasse II aus. Für hochwertige Sport- oder Zuchtpferde solltest du Klasse III
                  oder Spezialdiagnostik einplanen – so minimierst du Folgerisiken.
                </p>
              </RatgeberHighlightBox>
            </section>

            <section id="zusatzkosten" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Zusatzkosten & Faktoren</h2>

              <RatgeberHighlightBox title="Typische Zusatzkosten" icon={<Wallet className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  {extraCosts.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </RatgeberHighlightBox>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Was beeinflusst die Rechnung?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Je spezialisierter die Praxis und je umfangreicher die Diagnostik, desto höher die Kosten. Kläre im Vorfeld, ob
                du sämtliche Zusatzleistungen wirklich benötigst – und lass dir die Preisstruktur transparent erklären.
              </p>
            </section>

            <section id="regionen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Regionale Preisunterschiede</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {regionen.map((region) => (
                  <div key={region.title} className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-brand-brown" />
                      <h4 className="text-xl font-serif font-bold text-brand">
                        {region.title}
                      </h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {region.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="spartipps" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Spartipps & Budgetplanung</h2>

              <RatgeberHighlightBox title="So sparst du bei der AKU" icon={<PiggyBank className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  {savingsTips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </RatgeberHighlightBox>
            </section>
          </article>

          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ sectionTitle="Häufig gestellte Fragen zu AKU Kosten" faqs={faqItems} />
          </section>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Alles zu Ablauf, Umfang und Entscheidungshilfen der Ankaufsuntersuchung."
            articles={relatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: "/person-evaluating-horse-for-purchase.webp",
              alt: "Pferdebewertung unter Berücksichtigung der AKU-Kosten"
            }}
            title="AKU geplant? Berechne deinen Pferdewert"
            description="Unsere KI integriert AKU-Befunde und Kosten, damit du mit klaren Zahlen verhandeln kannst."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Pferdewert mit AKU prüfen"
          />
        </div>
      </>
    </Layout>
  )
}

export default AkuPferdKosten