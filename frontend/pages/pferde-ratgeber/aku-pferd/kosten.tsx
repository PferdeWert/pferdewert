import { NextPage } from "next"
import { useMemo } from "react"
import LocalizedLink from '@/components/LocalizedLink'
import { Calculator, Wallet, PiggyBank, MapPin, ChevronDown } from "lucide-react"

import Layout from "@/components/Layout"
import FAQ from "@/components/FAQ"
import RatgeberHero from "@/components/ratgeber/RatgeberHero"
import RatgeberHeroImage from "@/components/ratgeber/RatgeberHeroImage"
import RatgeberHighlightBox from "@/components/ratgeber/RatgeberHighlightBox"
import RatgeberRelatedArticles from "@/components/ratgeber/RatgeberRelatedArticles"
import RatgeberFinalCTA from "@/components/ratgeber/RatgeberFinalCTA"
import RatgeberTableOfContents from "@/components/ratgeber/RatgeberTableOfContents"
import RatgeberHead from "@/components/ratgeber/RatgeberHead"
import { FAQItem } from "@/types/faq.types"
import scrollToSection from "@/utils/ratgeber/scrollToSection"
import { getRelatedArticles, getRatgeberPath } from "@/lib/ratgeber-registry"
import AuthorBox from '@/components/AuthorBox'

// FAST REFRESH FIX: Define all JSX icons at module level to prevent infinite reload loops
const calculatorIcon = <Calculator className="h-4 w-4" />;
const calculatorIconLarge = <Calculator className="h-5 w-5" />;
const chevronDownIcon = <ChevronDown className="h-5 w-5" />;
const walletBrownIcon = <Wallet className="h-5 w-5 text-brand-brown" />;
const calculatorBrownIcon = <Calculator className="h-5 w-5 text-brand-brown" />;
const piggyBankBrownIcon = <PiggyBank className="h-5 w-5 text-brand-brown" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'AKU Pferd Kosten 2025: Kleine & Große AKU Preise | PferdeWert.de',
    description: 'AKU Pferd Kosten 2025: ✓ Kleine AKU 150–300€ ✓ Große AKU 400–800€ ✓ Regionale Unterschiede ✓ Wer zahlt? ✓ Spartipps vom Experten',
    keywords: 'aku pferd kosten, ankaufsuntersuchung pferd kosten, aku pferd preis, große aku kosten, kleine aku kosten',
    ogTitle: 'AKU Pferd Kosten 2025: Was kostet die Ankaufsuntersuchung?',
    ogDescription: 'Kleine AKU 150–300€, Große AKU 400–800€. Alle Kosten transparent erklärt mit Spartipps.',
  },
  at: {
    title: 'AKU Pferd Kosten Österreich 2025: Preise & Spartipps | PferdeWert.at',
    description: 'AKU Kosten in Österreich 2025: ✓ Kleine AKU 150–300€ ✓ Große AKU 400–800€ ✓ Österreichische Tierärzte ✓ Spartipps für den Pferdekauf',
    keywords: 'aku pferd kosten österreich, ankaufsuntersuchung pferd kosten, aku pferd preis',
    ogTitle: 'AKU Pferd Kosten Österreich 2025: Was kostet die Ankaufsuntersuchung?',
    ogDescription: 'Alle AKU Kosten in Österreich transparent erklärt. Spartipps für den Pferdekauf!',
  },
  ch: {
    title: 'AKU Pferd Kosten Schweiz 2025: Preise in CHF | PferdeWert.ch',
    description: 'AKU Kosten in der Schweiz 2025: ✓ Kleine AKU ab 200 CHF ✓ Große AKU ab 500 CHF ✓ Schweizer Tierärzte ✓ Spartipps für den Pferdekauf',
    keywords: 'aku pferd kosten schweiz, ankaufsuntersuchung pferd kosten, aku pferd preis chf',
    ogTitle: 'AKU Pferd Kosten Schweiz 2025: Was kostet die Ankaufsuntersuchung?',
    ogDescription: 'Alle AKU Kosten in der Schweiz transparent erklärt. Spartipps für Schweizer Käufer!',
  },
};

const sections = [
  { id: "overview", title: "AKU Kosten im Überblick" },
  { id: "klassen", title: "Kosten pro AKU-Klasse" },
  { id: "zusatzkosten", title: "Zusatzkosten & Faktoren" },
  { id: "regionen", title: "Regionale Preisunterschiede" },
  { id: "spartipps", title: "Spartipps & Budgetplanung" },
  { id: "wer-zahlt", title: "Wer zahlt die AKU?" },
  { id: "faq", title: "FAQ zu AKU Kosten" }
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
  },
  {
    question: "Was ist ein realistisches Budget für die AKU?",
    answer:
      "Plane 2–5 % des Kaufpreises für die AKU ein. Für ein Pferd zu 10.000€ solltest du also 200–500€ einplanen. Dazu kommen optional: Anfahrtskosten (40–180€), Sedierung (45–120€), und Zusatzuntersuchungen (100–250€)."
  },
  {
    question: "Kann ich bei der AKU Geld sparen?",
    answer:
      "Ja: (1) Wähle Tierärzte in der Nähe (Anfahrtskosten sparen), (2) Kombiniere Termine mit anderen Käufern (Anfahrt teilen), (3) Wähle Wochentage statt Wochenende (keine Zuschläge), (4) Überlege, welche Zusatzdiagnostik wirklich nötig ist."
  },
  {
    question: "Sind alte Röntgenbilder günstiger?",
    answer:
      "Ja, aber nicht empfohlen: Alte Röntgenbilder (älter als 6 Monate) sind für Kaufentscheidungen weniger aussagekräftig, da sich Befunde schnell ändern. Eine neue AKU mit aktuellen Bildern ist die sichere Wahl – auch wenn sie etwas kostet."
  }
]

const AkuPferdKosten: NextPage = () => {

  // CRITICAL: Related articles MUST be inside component with useMemo to avoid Fast Refresh loops
  // Module-level .map() creates new array instances on every Fast Refresh → infinite reload
  const relatedArticles = useMemo(
    () =>
      getRelatedArticles('aku-pferd/kosten').map((entry) => ({
        href: getRatgeberPath(entry.slug),
        image: entry.image,
        title: entry.title,
        badge: entry.category,
        readTime: entry.readTime,
        description: entry.description,
      })),
    []
  )

  const handleNavigate = (id: string) => scrollToSection(id)

  const handleScrollToToc = () => {
    if (typeof window === "undefined") return
    document.getElementById("inhaltsverzeichnis")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Layout fullWidth background="bg-gradient-to-b from-amber-50 to-white">
      <>
        <RatgeberHead
          slug="aku-pferd/kosten"
          image="/images/ratgeber/aku-pferd/kosten/woman-handler-horse-halter-outdoor.webp"
          locales={seoLocales}
          datePublished="2025-10-15"
          dateModified="2025-12-25"
          wordCount={2200}
          breadcrumbTitle="AKU Kosten"
          author={{
            name: "Benjamin Reder",
            url: "https://pferdewert.de/ueber-pferdewert",
            jobTitle: "Gründer von PferdeWert.de, KI-Experte & Pferdebesitzer seit 2017",
            image: "https://pferdewert.de/images/shared/benjamin-reder.webp"
          }}
          faqItems={faqItems.map(f => ({ question: f.question, answer: f.answer }))}
          noindex={true}
        />

        <RatgeberHero
          badgeLabel="AKU Guide"
          badgeIcon={calculatorIcon}
          title="AKU Kosten transparent erklärt"
          subtitle="Von der kleinen AKU bis zur Spezialdiagnostik – erfahre, welche Kosten auf dich zukommen und wie du klug planst."
          readTime="10 Min."
          publishDate="Dezember 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Pferdewert mit AKU berechnen",
            icon: calculatorIconLarge
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: chevronDownIcon,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src='/images/ratgeber/aku-pferd/kosten/woman-handler-horse-halter-outdoor.webp'
          alt="Käufer bewertet Pferd und kalkuliert AKU-Kosten"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            {/* Kontextbox: Link zur Hub-Seite */}
            <div className="bg-amber-50 border-l-4 border-brand p-6 rounded-lg mb-8">
              <p className="text-gray-700 mb-2">
                <strong>Noch nicht vertraut mit der AKU?</strong> Unser Hauptratgeber erklärt dir den kompletten Ablauf,
                den Unterschied zwischen kleiner und großer AKU sowie die verschiedenen Befundklassen.
              </p>
              <LocalizedLink
                 href="/pferde-ratgeber/aku-pferd"
                className="text-blue-600 hover:text-blue-800 underline font-semibold inline-flex items-center gap-2"
              >
                → Zum AKU-Überblick-Ratgeber
              </LocalizedLink>
            </div>

            <section id="overview" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">AKU Kosten im Überblick</h2>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Womit du rechnen solltest
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Kosten der Ankaufsuntersuchung setzen sich aus dem gewählten Umfang (AKU-Klasse) und zusätzlichen Leistungen
                wie Röntgen, Labor und Anfahrt zusammen. Plane je nach Kaufpreis und Anspruch 2–5 % des Kaufpreises ein. Für einen
                vollständigen Überblick aller Pferdekaufskosten{" "}
                <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-blue-600 hover:text-blue-800 underline">
                  schau dir unseren Kostenratgeber an
                </LocalizedLink>
                . Mehr zum gesamten Kaufprozess findest du in unserem{" "}
                <LocalizedLink href="/pferd-kaufen" className="text-blue-600 hover:text-blue-800 underline">
                  Pferdekauf-Ratgeber
                </LocalizedLink>
                .
              </p>

              <RatgeberHighlightBox title="Kostenfaktoren" icon={walletBrownIcon}>
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

              <RatgeberHighlightBox title="Faustregel" icon={calculatorBrownIcon}>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  Freizeitpferde bis 5.000 € kommen mit Klasse II aus. Für hochwertige{" "}
                  <LocalizedLink href="/pferd-kaufen/dressurpferd" className="text-blue-600 hover:text-blue-800 underline">
                    Dressurpferde
                  </LocalizedLink>
                  {" "}oder{" "}
                  <LocalizedLink href="/pferd-kaufen/springpferd" className="text-blue-600 hover:text-blue-800 underline">
                    Springpferde
                  </LocalizedLink>
                  {" "}solltest du Klasse III oder Spezialdiagnostik einplanen – so minimierst du Folgerisiken.
                </p>
              </RatgeberHighlightBox>
            </section>

            <section id="zusatzkosten" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Zusatzkosten & Faktoren</h2>

              <RatgeberHighlightBox title="Typische Zusatzkosten" icon={walletBrownIcon}>
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
                du sämtliche Zusatzleistungen wirklich benötigst – und lass dir die Preisstruktur transparent erklären. Bei Pferden
                aus Online-Inseraten oder vom{" "}
                <LocalizedLink href="/pferde-ratgeber/pferdemarkt" className="text-blue-600 hover:text-blue-800 underline">
                  Pferdemarkt
                </LocalizedLink>
                {" "}solltest du besonders auf eine umfassende AKU achten.
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

              <RatgeberHighlightBox title="So sparst du bei der AKU" icon={piggyBankBrownIcon}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  {savingsTips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </RatgeberHighlightBox>
            </section>

            {/* Wer zahlt die AKU? */}
            <section id="wer-zahlt" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Wer zahlt die AKU beim Pferdekauf?
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Die Kostenfrage beim Pferdekauf ist häufig Anlass für Konflikte. Hier zeigen wir,
                wer grundsätzlich bezahlt und welche Regelungen möglich sind.
              </p>

              <RatgeberHighlightBox title="Standardfall: Der Käufer zahlt" icon={walletBrownIcon}>
                <p className="text-gray-700 mb-3">
                  <strong>Grundregel:</strong> Wer die AKU in Auftrag gibt, zahlt sie – in den meisten Fällen ist das der Käufer.
                  Der Käufer hat ein berechtigtes Interesse an objektiven Befunden vor seiner Kaufentscheidung.
                </p>
              </RatgeberHighlightBox>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8 mb-4">
                Alternative Kostenmodelle
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-2">Kostenteilung (50/50)</h4>
                  <p className="text-gray-700 text-sm">
                    Käufer und Verkäufer teilen sich die Kosten hälftig. Das ist eine faire Lösung,
                    wenn beide vom objektiven Befund profitieren möchten.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-2">Ergebnisabhängige Zahlung</h4>
                  <p className="text-gray-700 text-sm">
                    <strong>Ohne Befund:</strong> Käufer zahlt | <strong>Mit Befund:</strong> Verkäufer zahlt.
                    Dies ist verbreitet bei Kaufabbruch aufgrund kritischer Befunde.
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mt-8">
                <strong>Tipp:</strong> Vereinbare die Kostenregelung frühzeitig im Kaufprozess. In unserem{" "}
                <LocalizedLink href="/pferd-kaufen" className="text-blue-600 hover:text-blue-800 underline">
                  umfassenden Ratgeber zum Pferdekauf
                </LocalizedLink>
                {" "}erfährst du, wie du den gesamten Kaufablauf strukturiert angehst.
              </p>

              <RatgeberHighlightBox title="Wichtig: Schriftliche Festlegung" icon={walletBrownIcon}>
                <p className="text-gray-700">
                  <strong>Vereinbare alle Kostenpunkte schriftlich im{" "}
                  <LocalizedLink href="/pferd-kaufen/kaufvertrag" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                    Pferdekaufvertrag
                  </LocalizedLink>
                  {" "}oder per E-Mail</strong>, um später Streitigkeiten zu vermeiden. Dies gilt besonders, wenn die Kostenübernahme
                  an das Ergebnis der AKU gekoppelt ist (z.B. &ldquo;ohne Befund&rdquo;). In unserem Kaufvertrags-Ratgeber findest du
                  alle wichtigen Klauseln und ein kostenloses Muster.
                </p>
              </RatgeberHighlightBox>
            </section>
          </article>

          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ
              sectionTitle="Häufig gestellte Fragen zu AKU Kosten"
              sectionSubtitle="Alles was du über die Kosten der Ankaufsuntersuchung wissen möchtest"
              faqs={faqItems}
              withSchema={false}
            />
          </section>

          {/* Author Box */}
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <AuthorBox />
          </div>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Alles zu Ablauf, Umfang und Entscheidungshilfen der Ankaufsuntersuchung."
            articles={relatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: "/images/shared/blossi-shooting.webp",
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
