import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useCallback } from 'react'
import Layout from '@/components/Layout'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import FAQ from '@/components/FAQ'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import { ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react'
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry'

// Section definitions for Table of Contents
const sections = [
  { id: 'eigenschaften', title: 'Was macht ein gutes Springpferd aus?' },
  { id: 'preise', title: 'Springpferd kaufen: Preise und Budget richtig planen' },
  { id: 'verkaufsquellen', title: 'Wo finde ich seriöse Verkaufspferde?' },
  { id: 'aku', title: 'Die Ankaufsuntersuchung: Unverzichtbar beim Pferdekauf' },
  { id: 'probereiten', title: 'Probereiten und Kaufentscheidung' },
  { id: 'kaufvertrag', title: 'Kaufvertrag und rechtliche Aspekte' },
  { id: 'faq', title: 'Häufige Fragen zum Springpferdekauf' }
]

// FAQ Items
const faqItems = [
  {
    question: 'Was kostet ein gutes Springpferd?',
    answer: 'Ein Springpferd kostet je nach Ausbildungsstand zwischen 8.000€ und 100.000€+. Jungpferde (3-4 Jahre) starten ab 8.000-15.000€, angerittene Pferde (4-5 Jahre) kosten 15.000-30.000€, A-L-Springpferde mit Turniererfahrung 25.000-50.000€, M-Springpferde 40.000-80.000€ und S-erfolgreiche Pferde schnell sechsstellige Beträge. Internationale Grand-Prix-Pferde können Millionenbeträge erreichen.'
  },
  {
    question: 'Welche Rassen eignen sich am besten fürs Springreiten?',
    answer: 'Die klassischen Springpferderassen sind Holsteiner, Oldenburger, KWPN (niederländisches Warmblut) und Selle Français. Diese Zuchtlinien werden seit Generationen auf Springeignung selektiert. Aber auch andere Warmblüter, Hannoveraner oder Kreuzungen können hervorragende Springer werden – letztlich zählt die individuelle Veranlagung mehr als der Papiernachweis.'
  },
  {
    question: 'Brauche ich bei jedem Pferdekauf eine AKU?',
    answer: 'Ja, eine Ankaufsuntersuchung (AKU) ist beim Kauf eines Springpferdes unverzichtbar. Die AKU deckt gesundheitliche Probleme auf, die später zu enormen Kosten führen können. Eine kleine AKU kostet 200-400€, eine große AKU mit Röntgen 800-1.500€ – das kann dich vor einem Fehlkauf bewahren, der dich später ein Vielfaches kosten würde. Nutze immer deinen eigenen, unabhängigen Tierarzt.'
  },
  {
    question: 'Wie oft sollte ich ein Pferd probereiten?',
    answer: 'Vereinbare mindestens 2-3 Probetermine zu unterschiedlichen Tageszeiten, um das Pferd in verschiedenen Situationen kennenzulernen. Teste alle Grundgangarten, dann das Springen (erst kleine Hindernisse, dann steigern). Nimm eine erfahrene Begleitperson (idealerweise deinen Trainer) mit und filme das Probereiten zur späteren Analyse. Dein Bauchgefühl muss stimmen!'
  },
  {
    question: 'Was muss in den Kaufvertrag für ein Pferd?',
    answer: 'Ein Pferdekaufvertrag muss enthalten: vollständige Angaben zu Käufer und Verkäufer, genaue Pferdebeschreibung (Name, Alter, Rasse, Chipnummer), Kaufpreis und Zahlungsmodalitäten, Übergabedatum, Garantien und Gewährleistungsvereinbarungen. Wichtig: Vereinbare Rücktrittsrechte bei negativer AKU und dokumentiere alle Zusicherungen schriftlich (z.B. "springt sicher bis 1,20m").'
  },
  {
    question: 'Kann ich ein Springpferd auch günstig kaufen?',
    answer: 'Ja, aber mit realistischen Erwartungen: Jungpferde (3-4 Jahre) aus guter Zucht gibt es ab 8.000-15.000€. Du kannst auch nach Pferden mit kleinen "Schönheitsfehlern" (z.B. Abzeichen) oder aus Privatverkäufen schauen. ABER: Spare niemals an der AKU! Ein vermeintliches Schnäppchen kann durch versteckte Gesundheitsprobleme zum teuren Reinfall werden.'
  }
]

export default function SpringpferdKaufen() {
  // Memoize icons to prevent Fast Refresh infinite loops
  const shieldIcon = useMemo(
    () => <ShieldAlert className="w-5 h-5 text-brand-brown" />,
    []
  )

  const warningIcon = useMemo(
    () => <AlertTriangle className="w-5 h-5 text-brand-brown" />,
    []
  )

  const checkIcon = useMemo(
    () => <CheckCircle className="w-5 h-5 text-brand-brown" />,
    []
  )

  // Memoize onClick handler to prevent Fast Refresh infinite loops
  const handleScrollToContent = useCallback(() => {
    document.getElementById('eigenschaften')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Memoize CTA objects to prevent Fast Refresh infinite loops
  const primaryCta = useMemo(() => ({
    label: 'Jetzt Pferdewert berechnen',
    href: '/pferde-preis-berechnen'
  }), [])

  const secondaryCta = useMemo(() => ({
    label: 'Zum Inhalt',
    onClick: handleScrollToContent
  }), [handleScrollToContent])

  // Memoize image object to prevent Fast Refresh infinite loops
  const finalCtaImage = useMemo(() => ({
    src: '/images/shared/blossi-shooting.webp',
    alt: 'Pferdebesitzer mit Pferd',
    width: 800,
    height: 600
  }), [])

  // Related articles - use registry for consistent data
  const relatedArticles = useMemo(() => {
    const entries = getRelatedArticles('springpferd-kaufen')
    return entries.map(entry => ({
      title: entry.title,
      description: entry.description,
      href: getRatgeberPath(entry.slug),
      image: entry.image,
      badge: entry.category,
      readTime: entry.readTime
    }))
  }, [])

  // JSON-LD Article Schema - memoized to prevent Fast Refresh loops
  const articleSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Springpferd kaufen: Der ultimative Ratgeber für den perfekten Partner',
    description: 'Springpferd kaufen leicht gemacht: Auswahlkriterien, Preise (10.000-100.000€+), seriöse Züchter, AKU-Tipps & Kaufvertrag. Jetzt informieren!',
    url: 'https://www.pferdewert.de/pferde-ratgeber/springpferd-kaufen',
    datePublished: '2025-01-09T10:00:00+01:00',
    dateModified: '2025-01-09T10:00:00+01:00',
    author: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      url: 'https://www.pferdewert.de'
    },
    publisher: {
      '@type': 'Organization',
      name: 'PferdeWert.de',
      url: 'https://www.pferdewert.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pferdewert.de/logo.png',
        width: 600,
        height: 60
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.pferdewert.de/pferde-ratgeber/springpferd-kaufen'
    },
    articleSection: 'Pferde-Ratgeber',
    articleBody: 'Der Traum vom eigenen Springpferd bewegt viele Reiter – doch die Entscheidung will wohlüberlegt sein. Dieser Ratgeber begleitet Sie durch den gesamten Kaufprozess – von der Definition Ihrer Anforderungen über die Suche nach dem passenden Partner bis hin zur rechtssicheren Abwicklung.',
    wordCount: 1450,
    keywords: [
      'springpferd kaufen',
      'springpferd kaufen preis',
      'springpferd kaufen deutschland',
      'springpferd kaufen züchter',
      'springpferd kaufen günstig'
    ],
    inLanguage: 'de-DE'
  }), [])

  // JSON-LD Breadcrumb Schema - memoized to prevent Fast Refresh loops
  const breadcrumbSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'PferdeWert',
        item: 'https://www.pferdewert.de'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Ratgeber',
        item: 'https://www.pferdewert.de/pferde-ratgeber'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Springpferd kaufen',
        item: 'https://www.pferdewert.de/pferde-ratgeber/springpferd-kaufen'
      }
    ]
  }), [])

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <Head>
        {/* Basic Meta Tags */}
        <title>Springpferd kaufen: Ratgeber, Preise & Tipps | PferdeWert</title>
        <meta name="description" content="Springpferd kaufen leicht gemacht: Auswahlkriterien, Preise (10.000-100.000€+), seriöse Züchter, AKU-Tipps & Kaufvertrag. Jetzt informieren!" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/springpferd-kaufen" />
        <meta httpEquiv="content-language" content="de" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Springpferd kaufen: Der ultimative Ratgeber für den perfekten Partner" />
        <meta property="og:description" content="Von der Auswahl über Preise bis zum Kaufvertrag – alles, was du beim Springpferdekauf wissen musst. Mit Experten-Tipps zu AKU, Probereiten & Budget." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/springpferd-kaufen" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content="https://pferdewert.de/images/ratgeber/springpferd-kaufen-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Springpferd kaufen - Ratgeber mit Preisen, Tipps und Checklisten" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Springpferd kaufen: Ratgeber, Preise & Tipps" />
        <meta name="twitter:description" content="Springpferd kaufen: Auswahlkriterien, Preise, Züchter, AKU-Tipps & Kaufvertrag. Der komplette Ratgeber für deine Kaufentscheidung." />
        <meta name="twitter:image" content="https://pferdewert.de/images/ratgeber/springpferd-kaufen-twitter.jpg" />
        <meta name="twitter:creator" content="@PferdeWertDE" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
        />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Kaufratgeber"
          title="Springpferd kaufen: Der ultimative Ratgeber für den perfekten Partner"
          subtitle="Alles was du über Auswahlkriterien, Preise, Züchter, Ankaufsuntersuchung und Kaufvertrag wissen musst – für eine fundierte Kaufentscheidung"
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/springpferd-hero-jumping.webp"
          alt="Springpferd und Reiter John Whitaker beim Sprung über Hindernis bei Olympia 2017"
          priority
          attribution={{
            author: 'Lady-shirakawa',
            license: 'CC BY-SA 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
            source: 'Wikimedia Commons',
            originalUrl: 'https://commons.wikimedia.org/wiki/File:John_Whitaker_and_Argento_jumping_at_Olympia_2017.jpg'
          }}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Content Body - Text First */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
          {/* Intro Section */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Traum vom eigenen Springpferd bewegt viele Reiter – doch die Entscheidung will wohlüberlegt sein. Wer ein Springpferd kaufen möchte, steht vor einer Vielzahl von Fragen: Welche Eigenschaften muss das Pferd mitbringen? Wo finde ich seriöse Verkäufer? Und wie viel Budget muss ich einplanen?
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Die große Auswahl an Verkaufspferden, die teilweise enormen Preisunterschiede und die langfristige Verantwortung machen den Pferdekauf zu einer der wichtigsten Entscheidungen im Reiterleben. Dieser Ratgeber begleitet dich durch den gesamten Kaufprozess – von der Definition deiner Anforderungen über die Suche nach dem passenden Partner bis hin zur rechtssicheren Abwicklung. So triffst du eine fundierte Kaufentscheidung, die dich und dein zukünftiges Springpferd lange glücklich macht.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Tipp:</strong> In unserem <Link href="/pferde-ratgeber/pferd-kaufen" className="text-brand-brown hover:underline font-semibold">umfassenden Pferdekauf-Ratgeber</Link> findest du weitere allgemeine Tipps, die für alle Pferdetypen gelten.
            </p>
          </section>

          {/* Section 1: Eigenschaften */}
          <section id="eigenschaften" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was macht ein gutes Springpferd aus?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein erfolgreiches Springpferd zeichnet sich durch eine Kombination aus körperlichen Voraussetzungen, mentalem Potenzial und reiterlicher Ausbildung aus. Das Springvermögen ist dabei die Grundvoraussetzung – ein gutes Springpferd sollte mit Leichtigkeit, gutem Bascule (Rückenwölbung über dem Sprung) und ausreichend Vermögen springen können. Ebenso wichtig ist der Charakter: Mut, Nervenstärke bei Turnieren, Rittigkeit und ein ausgeglichenes Temperament sind unerlässlich für die Partnerschaft zwischen Reiter und Pferd.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Die besten Rassen fürs Springreiten
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Bei den Rassen haben sich besonders <strong>Holsteiner, Oldenburger, KWPN</strong> (niederländisches Warmblut) und <strong>Selle Français</strong> als erfolgreiche Springpferderassen etabliert. Diese Zuchtlinien werden seit Generationen auf Springeignung selektiert und bringen entsprechende genetische Voraussetzungen mit. Doch auch andere Warmblüter oder Kreuzungen können hervorragende Springer werden – letztlich zählt die individuelle Veranlagung mehr als der Papiernachweis.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              → Interessierst du dich für andere Disziplinen? Lies unseren Ratgeber zum <Link href="/pferde-ratgeber/dressurpferd-kaufen" className="text-brand-brown hover:underline font-semibold">Dressurpferd kaufen</Link>.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Altersaspekte: Jungpferd vs. Turnierpferd
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Die Frage nach dem Alter hängt stark von deinem reiterlichen Können ab. Ein 3-4-jähriges Jungpferd bietet den Vorteil, dass du die Ausbildung selbst gestalten kannst – erfordert aber viel Erfahrung, Zeit und professionelle Unterstützung. Ein 7-10-jähriges, bereits turniererfahrenes Springpferd ist für ambitionierte Amateure oft die bessere Wahl, da der Ausbildungsstand bereits gefestigt ist.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Achte beim Springpferd kaufen auch auf den körperlichen Aufbau: Ein rechteckiges Rahmenmaß (etwas längerer Rücken), gut bemuskelte Hinterhand, korrekte Beinstellung und ein Stockmaß zwischen 165-175 cm sind für Springpferde ideal.
            </p>
          </section>

          {/* Section 2: Preise */}
          <section id="preise" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Springpferd kaufen: Preise und Budget richtig planen
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Die Preise für Springpferde variieren enorm und hängen von zahlreichen Faktoren ab. Ein rohes, aber vielversprechendes 3-jähriges Jungpferd aus guter Zucht kannst du bereits ab 8.000 bis 15.000 Euro erwerben. Angerittene 4-5-jährige Pferde mit ersten Springerfahrungen kosten zwischen 15.000 und 30.000 Euro. Für ein ausgebildetes A- bis L-Springpferd mit Turniererfahrung solltest du 25.000 bis 50.000 Euro einplanen.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Preisklassen im Überblick
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">•</span>
                <span className="text-lg"><strong>Jungpferde (3-4 Jahre):</strong> 8.000 - 15.000€</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">•</span>
                <span className="text-lg"><strong>Angerittene Pferde (4-5 Jahre):</strong> 15.000 - 30.000€</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">•</span>
                <span className="text-lg"><strong>A-L-Springpferde:</strong> 25.000 - 50.000€</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">•</span>
                <span className="text-lg"><strong>M-Springpferde:</strong> 40.000 - 80.000€</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">•</span>
                <span className="text-lg"><strong>S-Springpferde:</strong> 80.000€ - sechsstellig</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">•</span>
                <span className="text-lg"><strong>Grand-Prix-Pferde:</strong> mehrere 100.000€ - Millionen</span>
              </li>
            </ul>

            <RatgeberHighlightBox title="Wichtig: Folgekosten nicht unterschätzen!" icon={warningIcon}>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Neben dem Kaufpreis fallen monatlich laufende Kosten an:
              </p>
              <ul className="space-y-2 text-base text-gray-700">
                <li>• Stallmiete: 500 - 1.200€ (je nach Region und Ausstattung)</li>
                <li>• Futter und Einstreu: 100 - 200€</li>
                <li>• Hufschmied: 80 - 150€ (alle 6-8 Wochen)</li>
                <li>• Tierarzt (Routine): 50 - 100€</li>
                <li>• Versicherungen: 60 - 400€ (Haftpflicht + OP-Versicherung)</li>
                <li>• Turniergebühren und Training: variabel</li>
              </ul>
            </RatgeberHighlightBox>

            <p className="text-lg text-gray-700 leading-relaxed">
              Wichtige Preisfaktoren sind die Abstammung (erfolgreiche Blutlinien erzielen höhere Preise), dokumentierte Turniererfolge, das Alter (6-10 Jahre sind Premium), der Gesundheitszustand und natürlich das individuelle Springtalent. Lasse dich nicht von augenscheinlichen Schnäppchen blenden – oft stecken gesundheitliche Probleme oder Ausbildungsdefizite dahinter.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              → Mehr Details zu Anschaffungs- und laufenden Kosten findest du in unserem <Link href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand-brown hover:underline font-semibold">kompletten Pferde-Kosten-Guide</Link>.
            </p>
          </section>

          {/* Section 3: Verkaufsquellen */}
          <section id="verkaufsquellen" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Wo finde ich seriöse Verkaufspferde?
            </h2>

            <h3 className="text-2xl font-serif font-bold text-brand">
              Online-Plattformen und Pferdemarktplätze
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Die Suche nach dem passenden Springpferd beginnt heute meist online. Etablierte Plattformen wie <strong>ehorses.de, rimondo.com</strong> und <strong>sporthorses.de</strong> bieten eine große Auswahl an Verkaufspferden mit detaillierten Beschreibungen, Fotos und oft auch Videos. Diese Portale haben den Vorteil, dass du gezielt nach Kriterien wie Alter, Größe, Preis und Ausbildungsstand filtern kannst.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Achte auf Anzeigen mit aussagekräftigen Beschreibungen, mehreren aktuellen Fotos aus verschiedenen Perspektiven und idealerweise Videos, die das Pferd beim Springen und in allen Gangarten zeigen.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Züchter und Ausbildungsbetriebe
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Wer ein Springpferd kaufen möchte und Wert auf persönliche Beratung legt, wendet sich direkt an renommierte Züchter und Ausbildungsbetriebe. In Deutschland gibt es zahlreiche spezialisierte Springpferdezüchter, besonders in Norddeutschland (Schleswig-Holstein, Niedersachsen, NRW). Diese Betriebe haben oft mehrere Verkaufspferde in verschiedenen Ausbildungsstadien stehen und können dich individuell beraten.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Händler vs. Privatverkauf
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Beim Händler versus Privatverkauf gibt es Vor- und Nachteile abzuwägen. Händler bieten meist eine größere Auswahl, professionelle Präsentation und oft erweiterte Gewährleistung. Dafür sind die Preise tendenziell höher. Privatverkäufer verkaufen oft aus persönlichen Gründen (Zeitmangel, Gesundheit) und die Preise können günstiger sein – hier fehlt allerdings die gewerbliche Gewährleistung.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Auch internationale Märkte sind interessant: Die <strong>Niederlande, Belgien und Frankreich</strong> haben eine lange Tradition in der Springpferdezucht. Beachte aber zusätzliche Kosten für Transport, eventuell Quarantäne und Sprachbarrieren bei der Kommunikation.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              → Entdecke mehr Verkaufsquellen und Plattformen in unserem <Link href="/pferde-ratgeber/pferdemarkt" className="text-brand-brown hover:underline font-semibold">Pferdemarkt-Guide</Link>.
            </p>
          </section>

          {/* Section 4: AKU */}
          <section id="aku" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Die Ankaufsuntersuchung: Unverzichtbar beim Pferdekauf
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Eine Ankaufsuntersuchung (AKU) durch einen unabhängigen Tierarzt ist beim Kauf eines Springpferdes absolut unverzichtbar und sollte niemals aus Kostengründen eingespart werden. Die AKU gibt Aufschluss über den aktuellen Gesundheitszustand des Pferdes und deckt mögliche Erkrankungen oder Vorschädigungen auf, die später zu erheblichen Problemen führen könnten.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Kleine vs. große AKU
            </h3>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">1.</span>
                <div className="flex-1">
                  <span className="text-lg font-semibold block">Kleine AKU (200-400€)</span>
                  <span className="text-lg">Klinische Untersuchung, Beurteilung in Bewegung, Beugeproben, Herz und Lunge</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">2.</span>
                <div className="flex-1">
                  <span className="text-lg font-semibold block">Große AKU (800-1.500€)</span>
                  <span className="text-lg">Zusätzlich: Röntgenaufnahmen (Hufe, Gelenke, Rücken), Ultraschall Sehnen, Blutbild</span>
                </div>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed">
              → Alle Details zu AKU-Kosten und Preisfaktoren findest du in unserem <Link href="/pferde-ratgeber/aku-pferd/kosten" className="text-brand-brown hover:underline font-semibold">AKU-Kosten-Ratgeber</Link>.
            </p>

            <RatgeberHighlightBox title="Experten-Tipp: Eigener Tierarzt" icon={shieldIcon}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Bestehe darauf, <strong>deinen eigenen, unabhängigen Tierarzt</strong> mit der AKU zu beauftragen – nicht den Tierarzt des Verkäufers. Vereinbare im Kaufvertrag, dass du bei negativem Ausfall der AKU vom Kauf zurücktreten kannst, ohne Kosten tragen zu müssen (außer der AKU selbst). Die Investition von 800 bis 1.500€ kann dich vor einem Fehlkauf bewahren, der dich später ein Vielfaches kosten würde.
              </p>
            </RatgeberHighlightBox>

            <p className="text-lg text-gray-700 leading-relaxed">
              Bei Springpferden ist besonders das Röntgen der Beine wichtig, da diese enormen Belastungen ausgesetzt sind. Viele Käufer entscheiden sich daher für ein erweitertes Röntgenpaket. Auch Ultraschalluntersuchungen der Sehnen können sinnvoll sein, besonders bei älteren Turnierpferden.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              → Ausführliche Informationen zu Ablauf, Kosten und Checkliste findest du in unserem <Link href="/pferde-ratgeber/aku-pferd" className="text-brand-brown hover:underline font-semibold">detaillierten AKU-Ratgeber</Link>.
            </p>
          </section>

          {/* Section 5: Probereiten */}
          <section id="probereiten" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Probereiten und Kaufentscheidung
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das Probereiten ist deine Gelegenheit, das Pferd unter dem Sattel kennenzulernen und zu überprüfen, ob die Chemie zwischen euch stimmt. Vereinbare mindestens zwei, besser drei Probetermine zu unterschiedlichen Tageszeiten – so erlebst du das Pferd in verschiedenen Situationen. Bringe deine eigene Ausrüstung mit (Sattel, Trense, wenn möglich), um zu sehen, wie das Pferd darauf reagiert.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Was beim Probereiten testen?
            </h3>

            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">1.</span>
                <span className="text-lg"><strong>Grundgangarten:</strong> Wie fühlt sich das Pferd im Schritt, Trab und Galopp an? Ist es taktrein, durchlässig und an den Hilfen?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">2.</span>
                <span className="text-lg"><strong>Springen:</strong> Beginne mit kleinen Hindernissen und steigere langsam. Geht es freudig vorwärts oder muss es überzeugt werden?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">3.</span>
                <span className="text-lg"><strong>Technik:</strong> Wie ist die Sprungtechnik? Bleibt es in schwierigeren Situationen (z.B. enge Distanzen) ruhig?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">4.</span>
                <span className="text-lg"><strong>Verhalten:</strong> Beobachte auch das Verhalten beim Satteln, Aufsteigen und nach dem Reiten. Ist das Pferd umgänglich?</span>
              </li>
            </ol>

            <RatgeberHighlightBox title="Checkliste: Zum Probereiten mitnehmen" icon={checkIcon}>
              <ul className="space-y-2 text-base text-gray-700">
                <li>✓ Erfahrene Begleitperson (idealerweise Trainer)</li>
                <li>✓ Eigene Ausrüstung (Sattel, Trense wenn möglich)</li>
                <li>✓ Kamera/Smartphone für Video-Aufnahmen</li>
                <li>✓ Checkliste mit zu testenden Punkten</li>
                <li>✓ Zeitpuffer für Gespräche mit Verkäufer</li>
              </ul>
            </RatgeberHighlightBox>

            <p className="text-lg text-gray-700 leading-relaxed">
              Filmen oder fotografieren Sie das Probereiten – so kannst du später in Ruhe nochmal Revue passieren lassen. Letztendlich sollte aber auch dein Bauchgefühl stimmen: Fühlst du dich auf dem Pferd wohl und sicher? Kannst du dir vorstellen, die nächsten Jahre gemeinsam zu verbringen?
            </p>
          </section>

          {/* Section 6: Kaufvertrag */}
          <section id="kaufvertrag" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kaufvertrag und rechtliche Aspekte
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Sobald du dich für ein Pferd entschieden hast, muss ein schriftlicher Kaufvertrag her – mündliche Vereinbarungen sind beim Pferdekauf rechtlich problematisch und sollten vermieden werden. Der Kaufvertrag sollte alle wichtigen Details enthalten: vollständige Angaben zu Käufer und Verkäufer, genaue Beschreibung des Pferdes (Name, Alter, Rasse, Farbe, Abzeichen, Chipnummer), Kaufpreis und Zahlungsmodalitäten, Übergabedatum und -ort.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Garantien und Gewährleistung
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Besonders wichtig sind Garantien und Gewährleistungsvereinbarungen. Ist das Pferd gesund und frei von Mängeln? Wurden bestimmte Eigenschaften zugesichert (z.B. &quot;springt sicher bis 1,20 m&quot; oder &quot;verladefromm&quot;)? Solche Zusicherungen sollten schriftlich festgehalten werden.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Bei Privatverkäufern wird die Gewährleistung oft ausgeschlossen, bei gewerblichen Händlern gelten die gesetzlichen Gewährleistungsrechte (zwei Jahre, wobei nach sechs Monaten der Käufer beweisen muss, dass der Mangel schon beim Kauf vorlag).
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Equidenpass und Versicherungen
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Der Equidenpass muss vollständig ausgefüllt und korrekt sein – prüfe alle Eintragungen, besonders Impfungen, Wurmkuren und den Eigentumsübergang. Ohne gültigen Equidenpass darf das Pferd nicht transportiert oder auf Turnieren vorgestellt werden.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Denke auch an Versicherungen: Eine <strong>Pferdehaftpflichtversicherung</strong> ist in den meisten Bundesländern zwar nicht gesetzlich vorgeschrieben, aber dringend empfohlen (Kosten ab ca. 60€/Jahr). Eine <strong>OP-Versicherung</strong> (ca. 200-400€/Jahr) übernimmt die oft sehr hohen Kosten bei notwendigen Operationen.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              → Inklusive rechtssicherer Vertragsvorlage und allen wichtigen Klauseln: Unser <Link href="/pferde-ratgeber/pferdekaufvertrag" className="text-brand-brown hover:underline font-semibold">kompletter Pferdekaufvertrag-Ratgeber</Link>.
            </p>
          </section>

          {/* Fazit */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Fazit: Dein Weg zum perfekten Springpferd
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Springpferd zu kaufen ist eine Entscheidung, die gut durchdacht sein will. Die wichtigsten Erfolgsfaktoren sind: klare Anforderungen definieren (Ausbildungsstand, Budget, Charakter), Zeit für die Suche nehmen und nicht zum ersten Pferd greifen, unbedingt eine professionelle Ankaufsuntersuchung durchführen lassen, mehrfach probereiten und eine Begleitperson mitnehmen, sowie alle Vereinbarungen schriftlich im Kaufvertrag festhalten.
            </p>

            <RatgeberHighlightBox title="Deine Checkliste für den Pferdekauf" icon={checkIcon}>
              <ol className="space-y-2 text-base text-gray-700">
                <li>1. Budget realistisch planen (Kaufpreis + laufende Kosten)</li>
                <li>2. Anforderungen klar definieren (Alter, Ausbildungsstand, Größe)</li>
                <li>3. Seriöse Quellen nutzen (Plattformen, Züchter, Empfehlungen)</li>
                <li>4. AKU durch unabhängigen Tierarzt</li>
                <li>5. Mehrfach probereiten mit Begleitperson</li>
              </ol>
            </RatgeberHighlightBox>

            <p className="text-lg text-gray-700 leading-relaxed">
              Nimm dir Zeit für diese wichtige Entscheidung – das richtige Pferd ist einen langen Suchprozess wert. Ein harmonisches Team aus Reiter und Pferd entsteht nicht über Nacht, aber mit dem passenden Partner an deiner Seite stehen dir alle Türen im Springsport offen. Falls du bei der Bewertung eines Verkaufspferdes unsicher bist, kann eine <Link href="/pferde-preis-berechnen" className="text-brand-brown hover:underline font-semibold">professionelle Pferdebewertung</Link> zusätzliche Sicherheit geben und dir helfen, den fairen Marktwert einzuschätzen.
            </p>
          </section>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen zum Springpferdekauf"
              sectionSubtitle="Die wichtigsten Antworten zu Preisen, Rassen, AKU, Probereiten und Kaufvertrag beim Springpferdekauf"
            />
          </div>
        </section>

        {/* Related Articles */}
        <RatgeberRelatedArticles
          title="Weiterführende Artikel"
          articles={relatedArticles}
          description="Vertiefen Sie Ihr Wissen über den Pferdekauf:"
        />

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={finalCtaImage}
          title="Bereit, deinen Pferdepreis zu ermitteln?"
          description="Nutze unsere KI-gestützte Bewertung, um den genauen Marktwert deines Pferdes zu erfahren – in nur 2 Minuten."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </main>
    </Layout>
  )
}
