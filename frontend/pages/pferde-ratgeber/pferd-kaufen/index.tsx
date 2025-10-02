import { NextPage } from "next"
import Head from "next/head"
import { ArrowRight, TrendingUp, Shield, CheckCircle, MapPin, ChevronDown } from "lucide-react"

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

const sections = [
  { id: "preise", title: "Was kostet ein Pferd? Preisübersicht 2025" },
  { id: "checkliste", title: "Die 7-Schritte-Checkliste" },
  { id: "anfaenger", title: "Pferd für Anfänger kaufen" },
  { id: "regionen", title: "Regionale Unterschiede" },
  { id: "fehler", title: "Häufige Fehler vermeiden" },
  { id: "faire-preise", title: "Faire Pferde-Preise erkennen" },
  { id: "kaufwege", title: "Online vs. Händler vs. Privat" },
  { id: "faq", title: "Häufig gestellte Fragen" }
]

const heroMetaItems = [
  {
    icon: <TrendingUp className="h-4 w-4" />,
    label: "15 Min. Lesezeit"
  },
  {
    icon: <Shield className="h-4 w-4" />,
    label: "Aktualisiert 2025"
  },
  {
    icon: <CheckCircle className="h-4 w-4" />,
    label: "7-Schritte-Checkliste"
  }
]

const priceTiles = [
  {
    title: "Freizeitpferde",
    value: "1.500 – 8.000 €",
    description: "Gut ausgebildete Freizeitpferde mit gutem Charakter und Grundausbildung."
  },
  {
    title: "Dressurpferde",
    value: "5.000 – 30.000 €+",
    description: "Von jungen Talenten mit Basis-Ausbildung bis zu turniererfahrenen L-Pferden."
  },
  {
    title: "Springpferde",
    value: "5.000 – 50.000 €+",
    description: "Preis abhängig von Ausbildungsstand und Turniererfolgen."
  },
  {
    title: "Fohlen & Jungpferde",
    value: "800 – 5.000 €",
    description: "Preis stark abhängig von Abstammung und Zuchtlinien."
  },
  {
    title: "Reitponys",
    value: "2.000 – 10.000 €",
    description: "Gut ausgebildete, kinderfreundliche Ponys mit ruhigem Charakter."
  }
]

const anfaengerRassen = [
  {
    title: "Haflinger",
    value: "2.500 – 6.000 €",
    description: "Robust, ausgeglichen, gutmütig. Ideal für Freizeit und leichte Arbeit."
  },
  {
    title: "Fjordpferde",
    value: "3.000 – 7.000 €",
    description: "Ruhig, zuverlässig, sozial verträglich mit starkem Will-to-please."
  },
  {
    title: "Quarter Horses",
    value: "3.500 – 10.000 €",
    description: "Gelassen, menschenbezogen, vielseitig einsetzbar."
  },
  {
    title: "Freiberger",
    value: "4.000 – 8.000 €",
    description: "Vielseitig, robust, unkompliziert. Für Fahren und Reiten geeignet."
  }
]

const regionTiles = [
  {
    title: "Bayern",
    description: "Zucht-Hochburg mit Premium-Preisen. Hochwertige Warmblüter aus renommierten Zuchtlinien. Preise 10-15% über Bundesdurchschnitt."
  },
  {
    title: "Nordrhein-Westfalen",
    description: "Größter deutscher Pferdemarkt mit über 300.000 Pferden. Breite Preisspanne, große Auswahl in allen Kategorien."
  },
  {
    title: "Niedersachsen",
    description: "Hannoveraner-Heimat mit erstklassigen Sportpferden. Preise im oberen Segment für hochwertige Turnierpferde."
  },
  {
    title: "Schleswig-Holstein",
    description: "Holsteiner Zucht weltbekannt für exzellente Springpferde. Moderate Preise bei hoher Qualität."
  }
]

const faqItems: FAQItem[] = [
  {
    question: "Was kostet ein Pferd durchschnittlich?",
    answer:
      "Ein Freizeitpferd kostet zwischen 1.500€ und 8.000€. Gut ausgebildete Freizeitpferde mit solidem Charakter liegen bei 3.500€ bis 5.000€. Sportpferde für Dressur oder Springen bewegen sich zwischen 5.000€ und 50.000€, abhängig von Ausbildungsstand und Turniererfolgen. Fohlen und Jungpferde sind mit 800€ bis 5.000€ günstiger, brauchen aber noch mehrere Jahre Ausbildung."
  },
  {
    question: "Kann man Pferde für 200-500 Euro kaufen?",
    answer:
      "Ja, solche Angebote existieren, aber Vorsicht ist geboten. Pferde in diesem Preissegment haben meist erhebliche Probleme: chronische Erkrankungen, schwere Ausbildungsdefizite, Verhaltensauffälligkeiten oder hohes Alter. Eine gründliche Ankaufsuntersuchung ist hier absolut essentiell. Oft übersteigen die anschließenden Tierarzt- und Ausbildungskosten den niedrigen Kaufpreis um ein Vielfaches. Für Anfänger sind diese Pferde nicht geeignet."
  },
  {
    question: "Brauche ich eine Ankaufsuntersuchung?",
    answer:
      "Ja, unbedingt! Die AKU ist Ihre wichtigste Absicherung vor teuren Fehlkäufen. Eine kleine AKU kostet 150€ bis 250€, eine große AKU mit Röntgen 400€ bis 600€. Diese Investition kann Sie vor Kosten im fünfstelligen Bereich bewahren. Wählen Sie die AKU-Klasse passend zum Kaufpreis: Bei Pferden unter 3.000€ reicht oft die kleine AKU, bei Pferden über 5.000€ ist die große AKU mit Röntgen Standard."
  },
  {
    question: "Wo finde ich Pferde in meiner Nähe?",
    answer:
      "Nutzen Sie große Online-Pferdemarktplätze wie ehorses.de, pferde.de oder kleinanzeigen.de mit Regionalfilter. Geben Sie Ihre PLZ oder Ihr Bundesland ein, um nur lokale Angebote zu sehen. Besuchen Sie außerdem lokale Gestüte, Ausbildungsbetriebe und Reiterhöfe. Regionale Pferdemarkt-Events, Hengstparaden und Zuchtschauen sind gute Gelegenheiten für persönliche Kontakte."
  },
  {
    question: "Ist ein älteres Pferd besser für Anfänger?",
    answer:
      "Ja, in der Regel. Pferde zwischen 8 und 15 Jahren sind ideal für Anfänger. Sie haben einen ausgeglichenen, gefestigten Charakter, umfangreiche Lebenserfahrung und eine solide Ausbildung. Jungpferde unter 6 Jahren sind für Anfänger ungeeignet – sie sind noch unsicher, brauchen erfahrene Ausbilder und können unberechenbar reagieren. Die goldene Mitte liegt bei 8-15 Jahren."
  },
  {
    question: "Wie erkenne ich einen seriösen Verkäufer?",
    answer:
      "Seriöse Verkäufer zeigen vollständige Papiere (Equidenpass, Eigentumsurkunde), sind transparent über Gesundheitszustand und Vorgeschichte des Pferdes, ermöglichen mehrfache Besichtigungen und Proberitte, stimmen einer unabhängigen Ankaufsuntersuchung durch Ihren Tierarzt zu und drängen nicht zu schnellen Entscheidungen. Warnsignale sind: Zeitdruck, Verweigerung von AKU oder Proberitt, unvollständige Papiere, widersprüchliche Aussagen zur Geschichte."
  },
  {
    question: "Lohnt sich eine Pferdebewertung vor dem Kauf?",
    answer:
      "Absolut! Eine objektive Bewertung des Marktwerts verschafft Ihnen entscheidende Vorteile: Sie wissen vor der Verhandlung, ob der Preis fair oder überteuert ist, Sie können selbstbewusster verhandeln und Sie vermeiden Überzahlung um mehrere tausend Euro. Mit PferdeWert.de erhalten Sie in nur 2 Minuten eine AI-gestützte Bewertung. Unser Algorithmus berücksichtigt über 50 Kriterien sowie aktuelle Marktdaten."
  }
]

const relatedArticles = [
  {
    href: "/pferde-ratgeber/aku-pferd",
    image: "/images/blossi-shooting.webp",
    title: "AKU Pferd: Der komplette Guide",
    badge: "AKU Guide",
    readTime: "12 Min.",
    description: "Alle Fakten zur Ankaufsuntersuchung – ideal zur Vorbereitung auf den Pferdekauf."
  },
  {
    href: "/pferde-ratgeber/pferd-verkaufen",
    image: "/images/dino-1.webp",
    title: "Pferd verkaufen: Optimaler Preis mit KI",
    badge: "Verkauf",
    readTime: "9 Min.",
    description: "Alles für den erfolgreichen Verkauf – Preisstrategie, Inserate und Verhandlung."
  },
  {
    href: "/pferde-ratgeber/aku-pferd/ablauf",
    image: "/veterinarian-examining-horse-health-check.webp",
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
          <title>Pferd kaufen: Der ultimative Ratgeber für 2025 | PferdeWert</title>
          <meta
            name="description"
            content="Pferd kaufen mit System: 7-Schritte-Checkliste, faire Preise erkennen, häufige Fehler vermeiden. Vom Budget bis zur AKU – der komplette Ratgeber."
          />
        </Head>

        <RatgeberHero
          badgeLabel="Ultimativer Kaufratgeber"
          badgeIcon={<TrendingUp className="h-4 w-4" />}
          title="Pferd kaufen: Der ultimative Ratgeber für 2025"
          subtitle="Von der realistischen Budgetplanung über die Auswahl seriöser Plattformen bis zur professionellen Ankaufsuntersuchung – dieser umfassende Guide führt Sie durch jeden Schritt zum Traumpferd."
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
          src={getRatgeberBySlug('pferd-kaufen')?.image || '/images/ratgeber/aku-kosten-hero.webp'}
          alt="Pferd kaufen – der ultimative Ratgeber für 2025"
          priority
        />

        <RatgeberTableOfContents sections={sections} onNavigate={handleNavigate} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          <article className="max-w-5xl mx-auto space-y-16">
            {/* Einleitung */}
            <section className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Sie träumen davon, endlich Ihr eigenes Pferd zu besitzen? Der Kauf eines Pferdes ist eine der aufregendsten
                Entscheidungen im Leben eines Reiters – aber auch eine der komplexesten. Zwischen überhöhten Preisen, unzähligen
                Inseraten und der Angst vor Fehlkäufen kann die Suche nach dem Traumpferd schnell überwältigend werden.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Dieser umfassende Ratgeber führt Sie durch jeden Schritt des Pferdekaufs: von der realistischen Budgetplanung über
                die Auswahl seriöser Verkaufsplattformen bis zur professionellen Ankaufsuntersuchung. <strong>Besonders wichtig:</strong>{" "}
                Sie erfahren, wie Sie faire Marktpreise erkennen und Überzahlung vermeiden.
              </p>
            </section>

            {/* Preisübersicht 2025 */}
            <section id="preise" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Was kostet ein Pferd? Preisübersicht 2025</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Preise beim Pferdekauf variieren erheblich – von unter 1.000 Euro bis weit über 50.000 Euro. Um realistische
                Erwartungen zu entwickeln, sollten Sie die aktuellen Marktpreise nach Pferdetyp kennen:
              </p>

              <RatgeberInfoTiles headline="Aktuelle Marktpreise nach Pferdetyp" tiles={priceTiles} />

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand mt-8">
                Faktoren, die den Pferde-Preis beeinflussen
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Der Preis eines Pferdes ergibt sich aus einer Vielzahl von Kriterien:
              </p>

              <ul className="space-y-3 text-gray-700 leading-relaxed">
                <li>
                  <strong>Rasse und Abstammung:</strong> Warmblüter aus anerkannten Zuchtlinien sind teurer als Pferde ohne
                  Papiere. Die Abstammung von erfolgreichen Hengsten kann den Preis um 2.000€ bis 5.000€ erhöhen.
                </li>
                <li>
                  <strong>Alter und Gesundheitszustand:</strong> Pferde zwischen 6 und 12 Jahren befinden sich in ihrer besten
                  Phase und erzielen Höchstpreise. Ältere Pferde (15+ Jahre) sind günstiger.
                </li>
                <li>
                  <strong>Ausbildungsstand:</strong> Jeder Ausbildungsschritt erhöht den Wert. Ein rohes 3-jähriges Pferd kostet
                  deutlich weniger als ein 5-jähriges mit solider Grundausbildung.
                </li>
                <li>
                  <strong>Turniererfolge:</strong> Nachweisliche Erfolge auf Turnieren sind direkte Wertsteigerer. Ein Pferd mit
                  Platzierungen auf A-Niveau ist 2.000€ bis 3.000€ mehr wert.
                </li>
                <li>
                  <strong>Gesundheit und Röntgenbilder:</strong> Pferde mit aktuellem Röntgen-TÜV erzielen deutlich höhere
                  Preise. Vorerkrankungen können den Wert um 30-50% senken.
                </li>
                <li>
                  <strong>Charakter und Rittigkeit:</strong> Ein Pferd mit unkompliziertem, freundlichem Charakter und guter
                  Rittigkeit ist wertvoller als eines mit Schwierigkeiten.
                </li>
              </ul>

              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                Die große Preisspanne macht deutlich: Ohne Marktkenntnisse riskieren Sie, mehrere tausend Euro zu viel zu
                bezahlen. Mit PferdeWert.de können Sie in nur 2 Minuten den fairen Marktwert eines Pferdes berechnen lassen –
                basierend auf modernster KI-Technologie und aktuellen Marktdaten.
              </p>
            </section>

            {/* 7-Schritte-Checkliste */}
            <section id="checkliste" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Die 7-Schritte-Checkliste: So kaufen Sie Ihr Traumpferd
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Der strukturierte Ablauf beim Pferdekauf verhindert teure Fehler und emotionale Spontankäufe. Folgen Sie dieser
                bewährten Checkliste:
              </p>

              {/* Schritt 1 */}
              <ContentSection
                title="Schritt 1: Budget und Folgekosten kalkulieren"
                icon="1️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Der Kaufpreis ist nur der Anfang. Die laufenden Kosten für Pferdehaltung übersteigen den Anschaffungspreis
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
                      Stellen Sie sicher, dass Ihr Budget diese Summen dauerhaft tragen kann.
                    </p>
                  </div>
                }
              />

              {/* Schritt 2 */}
              <ContentSection
                title="Schritt 2: Anforderungen definieren"
                icon="2️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Bevor Sie mit der Suche beginnen, klären Sie diese essentiellen Fragen:
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Ihr Erfahrungslevel</h3>
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
                title="Schritt 3: Seriöse Verkaufsplattformen nutzen"
                icon="3️⃣"
                content={
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Die großen Online-Pferdemarktplätze bieten die größte Auswahl:
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
                      AI-Bewertung von PferdeWert.de erhalten Sie in 2 Minuten eine objektive Einschätzung des Marktwerts. So
                      starten Sie die Verhandlung mit klarem Preiswissen und vermeiden Überzahlung.
                    </p>
                  </div>
                }
              />

              {/* Schritt 4 */}
              <ContentSection
                title="Schritt 4: Besichtigung professionell vorbereiten"
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

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Proberitte organisieren</h3>
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
                      Schließen Sie die Pferdehaftpflichtversicherung bereits vor der Übergabe ab, sodass das Pferd vom Moment des
                      Eigentumswechsels an versichert ist. Die Pferdehaftpflicht ist in Deutschland nicht gesetzlich vorgeschrieben,
                      aber absolut essentiell – Schäden durch Pferde können sechsstellige Summen erreichen.
                    </p>

                    <h3 className="text-xl font-serif text-brand mt-6 mb-3">Eingewöhnungsphase</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Planen Sie 2-4 Wochen Eingewöhnungszeit ein. Das Pferd muss sich an neue Umgebung, Boxennachbarn,
                      Fütterungszeiten und Ihre Handhabung gewöhnen. Starten Sie mit leichter Arbeit und steigern Sie langsam.
                    </p>
                  </div>
                }
              />
            </section>

            {/* Pferd für Anfänger kaufen */}
            <section id="anfaenger" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Pferd für Anfänger kaufen: Worauf achten?</h2>
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
                Ein Pferd kaufen ohne ausreichende Reitausbildung ist riskant. <strong>Investieren Sie parallel zum Pferdekauf in
                regelmäßigen Reitunterricht.</strong> So entwickeln Sie sich gemeinsam mit Ihrem Pferd weiter und vermeiden
                gefährliche Situationen durch Unwissenheit.
              </p>
            </section>

            {/* Regionale Unterschiede */}
            <section id="regionen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Regionale Unterschiede: Wo kauft man Pferde am besten?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Der deutsche Pferdemarkt ist regional unterschiedlich geprägt. Je nach Bundesland finden Sie verschiedene
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
                Die großen Pferde-Plattformen wie ehorses.de und pferde.de ermöglichen bundesweite Suche. <strong>Bedenken Sie:</strong>{" "}
                Ein perfektes Pferd 400 km entfernt kann trotz höherer Transportkosten die bessere Wahl sein als ein mittelmäßiges
                Pferd vor Ort.
              </p>
            </section>

            {/* Häufige Fehler vermeiden */}
            <section id="fehler" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Häufige Fehler beim Pferdekauf vermeiden</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Viele Pferdekäufe scheitern oder führen zu Enttäuschungen durch vermeidbare Fehler. Lernen Sie aus den häufigsten
                Fehlern anderer:
              </p>

              <div className="grid gap-6">
                <div>
                  <h3 className="text-xl font-serif text-brand mb-3">Fehler 1: Emotionaler Kauf ohne objektive Prüfung</h3>
                  <div className="space-y-3 text-gray-700 leading-relaxed">
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Das Problem:</p>
                      <p>
                        Sie verlieben sich beim ersten Blick in ein Pferd und kaufen überstürzt, ohne kritische Prüfung. Besonders
                        bei schönen, großen Augen schaltet sich der Verstand aus.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Nehmen Sie immer eine emotional unbeteiligte, erfahrene Person zur Besichtigung mit. Diese kann objektiv
                        beurteilen und Sie vor Spontankäufen bewahren.
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
                        Sie kennen die aktuellen Marktpreise nicht und glauben der Preisvorstellung des Verkäufers. Verkäufer
                        überschätzen ihre Pferde häufig um 20-40%.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Mit der AI-Bewertung von PferdeWert.de erhalten Sie in nur 2 Minuten eine objektive Marktwert-Einschätzung.
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
                        Sie sparen die 200€ für eine kleine AKU oder wählen bei einem 15.000€ Turnierpferd nur die kleine statt der
                        großen AKU mit Röntgen.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        NIEMALS auf die AKU verzichten. Wählen Sie die AKU-Klasse passend zum Kaufpreis. Bei Pferden über 5.000€ ist
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
                      <p>Sie konzentrieren sich nur auf den Kaufpreis und vergessen die laufenden Kosten von 400€ bis 700€ pro Monat.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Kalkulieren Sie realistisch mit mindestens 5.000€ Jahreskosten. Legen Sie eine Notfallreserve von 2.000€ für
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
                        Seien Sie ehrlich zu Ihrem Können. Anfänger brauchen erfahrene, gelassene Lehrmeister-Pferde. Investieren Sie
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
                      <p>Sie verlassen sich auf mündliche Zusagen und Handschlag-Geschäfte.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-brown mb-1">Die Lösung:</p>
                      <p>
                        Bestehen Sie auf einem schriftlichen Kaufvertrag, auch bei Privatkäufen von netten Menschen. Nutzen Sie
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
                        Lassen Sie sich nicht drängen. Vereinbaren Sie mindestens 2-3 Probetermine an verschiedenen Tagen. Seriöse
                        Verkäufer geben Ihnen die Zeit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Faire Preise erkennen */}
            <section id="faire-preise" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">So erkennen Sie faire Pferde-Preise</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Die Preisfindung beim Pferdekauf ist eine der größten Herausforderungen. Woher wissen Sie, ob 8.000€ für ein
                bestimmtes Pferd angemessen oder überteuert sind?
              </p>

              <h3 className="text-xl font-serif text-brand mt-6 mb-3">Marktanalyse: Vergleichspreise recherchieren</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Schauen Sie sich auf Verkaufsplattformen ähnliche Pferde an:
              </p>
              <ul className="space-y-2 text-gray-700 leading-relaxed">
                <li>• Gleiche oder ähnliche Rasse</li>
                <li>• Vergleichbares Alter (±2 Jahre)</li>
                <li>• Ähnlicher Ausbildungsstand</li>
                <li>• Gleiche Region</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Notieren Sie sich 8-10 Vergleichsangebote und bilden Sie einen Durchschnittspreis.
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

              <RatgeberHighlightBox title="Die Lösung: AI-gestützte Pferdebewertung">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  PferdeWert.de nutzt modernste Künstliche Intelligenz, um den fairen Marktwert eines Pferdes in nur 2 Minuten zu
                  berechnen. Unser Algorithmus wurde von erfahrenen Reitern entwickelt und berücksichtigt über 50
                  Bewertungskriterien sowie aktuelle Marktdaten.
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-brand">Die Vorteile für Sie:</h4>
                  <ul className="space-y-2 text-gray-700 leading-relaxed">
                    <li>• <strong>Verhandlungssicherheit:</strong> Sie wissen, was das Pferd wirklich wert ist</li>
                    <li>• <strong>Schnelligkeit:</strong> Ergebnis in 2 Minuten, nicht Tage der Recherche</li>
                    <li>• <strong>Objektivität:</strong> KI ohne emotionale Verzerrung</li>
                    <li>• <strong>Aktualität:</strong> Berücksichtigt aktuelle Markttrends</li>
                  </ul>
                </div>
              </RatgeberHighlightBox>
            </section>

            {/* Online vs. Händler vs. Privat */}
            <section id="kaufwege" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">Pferd kaufen: Online vs. Händler vs. Privat</h2>
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

          {/* Final CTA */}
          <RatgeberFinalCTA
            image={{
              src: getRatgeberBySlug('pferd-kaufen')?.image || '/images/ratgeber/aku-kosten-hero.webp',
              alt: "Pferdebewertung vor dem Kauf"
            }}
            title="Bereit für Ihren fairen Pferdekauf?"
            description="Nutzen Sie unsere KI-Analyse für eine objektive Preisbewertung. Starten Sie die Verhandlung mit klarem Preiswissen und vermeiden Sie Überzahlung."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert berechnen"
          />
        </div>
      </>
    </Layout>
  )
}

export default PferdKaufen