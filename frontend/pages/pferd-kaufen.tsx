import { NextPage } from "next"
import Head from "next/head"
import { ArrowRight, TrendingUp, Shield, AlertTriangle, MapPin, ClipboardList } from "lucide-react"

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

const sections = [
  { id: "bewertung", title: "Warum Preisbewertung beim Pferdekauf?" },
  { id: "preise", title: "Pferdepreise 2024 im Überblick" },
  { id: "prozess", title: "Der sichere Kaufprozess" },
  { id: "warnsignale", title: "Warnsignale & typische Fehler" },
  { id: "markt", title: "Regionale Marktinsights" },
  { id: "faq", title: "FAQ zum Pferdekauf" }
]

const heroMetaItems = [
  {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "10 Min. Lesezeit"
  },
  {
    icon: <Shield className="h-4 w-4" />,
    label: "Preis-Sicherheit durch KI"
  },
  {
    icon: <ClipboardList className="h-4 w-4" />,
    label: "Checklisten inklusive"
  }
]

const priceTiles = [
  {
    title: "Freizeitpferde",
    value: "2.000 – 8.000 €",
    description: "Solide Ausbildung, verlässlich im Gelände, beliebt für Familien und Wieder-Einsteiger."
  },
  {
    title: "Turnierpferd (A/L)",
    value: "8.000 – 25.000 €",
    description: "Sportpferde mit Turniererfahrung, ideal für ambitionierte Reiter mit Trainingsplan."
  },
  {
    title: "Sportpferd (M/S)",
    value: "25.000 – 100.000 €+",
    description: "Professionell ausgebildete Pferde mit internationalem Potential und Erfolgsnachweisen."
  }
]

const kaufSchritte = [
  {
    step: "1",
    title: "Preis vorab prüfen",
    detail: "Erfasse alle Daten im KI-Tool und erhalte sofort eine objektive Preisrange."
  },
  {
    step: "2",
    title: "Besichtigung planen",
    detail: "Mit Marktkenntnis erkennst du Unstimmigkeiten und stellst gezielte Fragen."
  },
  {
    step: "3",
    title: "Verhandeln mit Fakten",
    detail: "Nutze die Analyse als Argumentationsbasis – so kaufst du zum fairen Preis."
  }
]

const warnsignale = [
  "Preis deutlich unter Marktwert – Hinweis auf versteckte Mängel",
  "Keine oder sehr alte Röntgenbilder verfügbar",
  "Verkäufer drängt auf schnellen Abschluss ohne AKU",
  "Nur kurzer Proberitt erlaubt, kein Gelände-Test",
  "Erfolge passen nicht zum Alter oder Ausbildungsstand"
]

const regionTiles = [
  {
    title: "Bayern",
    description: "Premium-Region mit hoher Nachfrage nach Freizeit- und Sportpferden – Preise tendenziell höher."
  },
  {
    title: "Nordrhein-Westfalen",
    description: "Größte Käuferbasis, schnelle Verkäufe durch hohe Stall- und Vereinsdichte."
  },
  {
    title: "Niedersachsen",
    description: "Traditionelle Warmblutzucht, ausgewogenes Preis-Leistungs-Verhältnis."
  }
]

const faqItems: FAQItem[] = [
  {
    question: "Kann ich die Bewertung für Kaufentscheidungen nutzen?",
    answer:
      "Ja, die KI zeigt dir eine objektive Preisspanne. So erkennst du sofort, ob ein Angebot fair ist und kannst professionell verhandeln."
  },
  {
    question: "Wann sollte ich die Bewertung machen lassen?",
    answer:
      "Idealerweise vor der ersten Besichtigung. Du gehst vorbereitet in Gespräche und kannst mehrere Pferde schnell vergleichen."
  },
  {
    question: "Brauche ich immer eine AKU?",
    answer:
      "Eine unabhängige AKU ist dringend empfohlen. Sie schafft Transparenz, schützt vor Risiken und ist Basis für Preisverhandlungen."
  },
  {
    question: "Wie reagiert der Verkäufer auf meine Preisargumente?",
    answer:
      "Datenbasierte Argumente wirken professionell. Bleib sachlich, erkläre deine Bewertung und bleib flexibel – so erreichst du faire Kompromisse."
  }
]

const relatedArticles = [
  {
    href: "/aku-pferd",
    image: "/images/blossi-shooting.webp",
    title: "AKU Pferd: Der komplette Guide",
    badge: "AKU Guide",
    readTime: "12 Min.",
    description: "Alle Fakten zur Ankaufsuntersuchung – ideal zur Vorbereitung auf den Pferdekauf."
  },
  {
    href: "/pferd-verkaufen",
    image: "/dino-1.webp",
    title: "Pferd verkaufen: Optimaler Preis mit KI",
    badge: "Verkauf",
    readTime: "9 Min.",
    description: "Alles für den erfolgreichen Verkauf – Preisstrategie, Inserate und Verhandlung."
  },
  {
    href: "/aku-pferd-ablauf",
    image: "/veterinarian-examining-horse-health-check.jpg",
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
          <title>Pferd kaufen: Preis prüfen & fair verhandeln | PferdeWert</title>
          <meta
            name="description"
            content="Pferd kaufen deutschlandweit: KI-Preischeck, regionale Marktinsights und Checklisten – so vermeidest du Überzahlung."
          />
        </Head>

        <RatgeberHero
          badgeLabel="Pferde-Ratgeber"
          badgeIcon={<TrendingUp className="h-4 w-4" />}
          title="Pferd kaufen: Preis prüfen & fair verhandeln"
          subtitle="Mit objektiven Marktdaten gehst du vorbereitet in Besichtigungen und verhandelst dein Wunschpferd zum fairen Preis."
          metaItems={heroMetaItems}
          primaryCta={{
            href: "/pferde-preis-berechnen",
            label: "Kaufpreis vor Verhandlung prüfen",
            icon: <ArrowRight className="h-5 w-5" />
          }}
          secondaryCta={{
            label: "Zum Inhalt",
            icon: <ClipboardList className="h-5 w-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src="/images/pferd-kaufen-hero.webp"
          alt="Pferd kaufen mit professioneller Preisbewertung"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            <section id="bewertung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Warum Preisbewertung beim Pferdekauf?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Pferdepreise schwanken stark nach Region, Ausbildungsstand und Nachfrage. Mit einer KI-gestützten Bewertung kennst du
                die faire Preisspanne, bevor du zum Verkäufer fährst. So erkennst du Über- und Unterpreise und verhandelst auf Faktenbasis.
              </p>
              <RatgeberHighlightBox title="Vorteile der KI-Bewertung" icon="💡">
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>• Objektive Preisrange statt Bauchgefühl</li>
                  <li>• Vergleich ähnlicher Pferde in deiner Region</li>
                  <li>• Verhandlungssicherheit mit konkreten Zahlen</li>
                </ul>
              </RatgeberHighlightBox>
            </section>

            <section id="preise" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Pferdepreise 2024 im Überblick</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die aktuellen Marktdaten zeigen: Qualität und Region bestimmen den Preis. Mit unserer Bewertung siehst du,
                wo dein Wunschpferd preislich einzuordnen ist und wie viel Verhandlungsspielraum realistisch ist.
              </p>
              <RatgeberInfoTiles headline="Aktuelle Preisbänder" tiles={priceTiles} />
            </section>

            <section id="prozess" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Der sichere Kaufprozess</h2>
              <ContentSection
                title="Drei Schritte zum fairen Kauf"
                icon="🧭"
                content={
                  <div className="space-y-4">
                    {kaufSchritte.map((schritt) => (
                      <div key={schritt.step} className="flex gap-4 items-start">
                        <span className="bg-brand-brown text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                          {schritt.step}
                        </span>
                        <div>
                          <h3 className="font-serif text-xl text-brand-brown mb-1">{schritt.title}</h3>
                          <p className="text-gray-700 text-sm md:text-base leading-relaxed">{schritt.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            </section>

            <section id="warnsignale" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Warnsignale & typische Fehler</h2>
              <RatgeberHighlightBox title="Achte auf diese Anzeichen" icon={<AlertTriangle className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  {warnsignale.map((zeichen) => (
                    <li key={zeichen}>{zeichen}</li>
                  ))}
                </ul>
              </RatgeberHighlightBox>
              <RatgeberHighlightBox title="Häufige Fehler vermeiden" icon={<Shield className="h-5 w-5 text-brand-brown" />}>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base leading-relaxed">
                  <li>• Ohne Preisbewertung kaufen und mehrere tausend Euro zu viel zahlen</li>
                  <li>• Kaufvertrag & Zusicherungen nicht schriftlich fixieren</li>
                  <li>• Verkäufer-Tierarzt mit der AKU beauftragen</li>
                  <li>• Emotionale Entscheidungen ohne Fakten treffen</li>
                </ul>
              </RatgeberHighlightBox>
            </section>

            <section id="markt" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Regionale Marktinsights</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                In Zuchtzentren zahlst du mehr, in ländlichen Regionen oft weniger. Plane Anreise- und Transportkosten ein und vergleiche
                ähnliche Pferde in Nachbarregionen, um bessere Deals zu finden.
              </p>
              <RatgeberRegionGrid
                regions={regionTiles.map((region) => ({
                  title: region.title,
                  description: region.description,
                  icon: <MapPin className="h-5 w-5 text-brand-brown" />
                }))}
              />
            </section>
          </article>

          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <FAQ sectionTitle="Häufig gestellte Fragen zum Pferdekauf" faqs={faqItems} />
          </section>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            description="Vertiefe dein Wissen rund um Kauf, Verkauf und AKU deines Wunschpferdes."
            articles={relatedArticles}
          />

          <RatgeberFinalCTA
            image={{
              src: "/images/pferd-kaufen-hero.webp",
              alt: "Pferdebewertung vor dem Kauf"
            }}
            title="Bereit für deinen fairen Pferdekauf?"
            description="Nutze unsere KI-Analyse für eine objektive Preisbewertung und verhandle mit der Sicherheit aktueller Marktdaten."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert prüfen"
          />
        </div>
      </>
    </Layout>
  )
}

export default PferdKaufen
