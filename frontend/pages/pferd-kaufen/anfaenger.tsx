import { useMemo } from 'react';
import LocalizedLink from '@/components/LocalizedLink'
import Layout from '@/components/Layout';
import RatgeberHead from '@/components/ratgeber/RatgeberHead';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import { Sparkles, CheckCircle, ShieldCheck, Award } from 'lucide-react';
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const checkCircleIcon = <CheckCircle className="w-5 h-5" />;
const checkCircleGreenIcon = <CheckCircle className="h-5 w-5 text-green-600 mr-2" />;
const checkCircleGreenFlexIcon = <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />;
const shieldIcon = <ShieldCheck className="h-6 w-6 mr-2" />;
const awardIcon = <Award className="h-6 w-6 mr-2" />;

const heroImageAttribution = {
  author: 'Waugsberg',
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
  source: 'Wikimedia Commons',
  originalUrl: 'https://commons.wikimedia.org/wiki/File:Flehmendes_Pferd_32_c.jpg'
};

const finalCtaImage = {
  src: '/images/shared/blossi-shooting.webp',
  alt: 'Pferdebewertung mit PferdeWert'
};

const sections = [
  { id: 'charaktereigenschaften', title: 'Was macht ein gutes Anfängerpferd aus?' },
  { id: 'alter', title: 'Das ideale Alter für ein Anfängerpferd' },
  { id: 'rassen', title: 'Anfängerpferd-Rassen: Die Top 7' },
  { id: 'kosten', title: 'Kosten: Kaufpreis und Unterhalt' },
  { id: 'kaufquellen', title: 'Wo findet man ein Anfängerpferd?' },
  { id: 'aku', title: 'Ankaufsuntersuchung (AKU)' },
  { id: 'rechtliches', title: 'Rechtliche Absicherung' },
  { id: 'versicherungen', title: 'Versicherungen für Anfängerpferde' },
  { id: 'faq', title: 'Häufig gestellte Fragen' },
];

const faqItems = [
    {
      question: 'Wie alt sollte ein Anfängerpferd sein?',
      answer: 'Ein echtes Verlasspferd für Anfänger sollte mindestens 10 Jahre alt sein, optimal sind 12-18 Jahre. In diesem Alter sind Pferde charakterlich gefestigt, haben unzählige Situationen erlebt und reagieren gelassen. Das Wichtigste: Sie verzeihen Anfängerfehler. Pferde unter 10 Jahren sind für absolute Anfänger zu unberechenbar. Ältere Pferde (15-20 Jahre) aus Reitschulen sind oft die besten Lehrmeister – mit gründlicher AKU.'
    },
    {
      question: 'Was kostet ein gutes Anfängerpferd (Verlasspferd)?',
      answer: 'Ein geeignetes Verlasspferd kostet zwischen 3.000€ und 10.000€. Ausgediente Schulpferde (12-18 Jahre) gibt es ab 2.000-5.000€. Ältere, gesunde Haflinger oder Fjordpferde kosten 4.000-8.000€. Wichtig: Beim Anfängerpferd ist Charakter wichtiger als Preis! Ein ruhiges 15-jähriges Pferd für 3.000€ ist besser als ein nervöses 8-jähriges für 10.000€. Budget auch 300-500€ für die AKU ein.'
    },
    {
      question: 'Was ist ein Verlasspferd und warum brauche ich das?',
      answer: 'Ein Verlasspferd ist ein besonders ruhiges, erfahrenes Pferd, das Anfängerfehler verzeiht und in jeder Situation gelassen bleibt. Es "überhört" falsche Hilfen, bleibt bei Schreckmomenten ruhig und gibt dem Reiter Sicherheit. Typische Verlasspferde sind ältere Schulpferde, erfahrene Haflinger oder Fjordpferde. Als Anfänger brauchst du genau das – ein Pferd, das DIR beibringt, nicht umgekehrt.'
    },
    {
      question: 'Welche Rassen sind als Anfängerpferd am besten?',
      answer: 'Die besten Rassen für Anfänger sind: 1) Haflinger (extrem geduldig, robust), 2) Norwegisches Fjordpferd (stark, gutmütig), 3) Isländer (trittsicher, gelassen), 4) Ausgediente Schulpferde jeder Rasse. WICHTIG: Der individuelle Charakter zählt mehr als die Rasse! Ein ruhiger 15-jähriger Mix ist besser als ein nervöser junger Haflinger. Teste IMMER persönlich.'
    },
    {
      question: 'Warum sind Schulpferde ideal für Anfänger?',
      answer: 'Schulpferde sind an Anfänger gewöhnt – sie kennen unsichere Hilfen, unausbalancierte Sitze und nervöse Reiter. Sie haben gelernt, Fehler zu verzeihen und geduldig zu sein. Viele Reitschulen geben ältere Schulpferde (14-20 Jahre) günstig ab. Vorteil: Du kennst das Pferd oft schon vom Unterricht. Nachteil: Gesundheitscheck ist Pflicht, da sie oft Verschleiß haben.'
    },
    {
      question: 'Ist eine AKU bei älteren Anfängerpferden wichtig?',
      answer: 'ABSOLUT! Gerade bei älteren Pferden (12+ Jahre) ist die Ankaufsuntersuchung Pflicht. Arthrose, Zahnprobleme und Herz-Kreislauf-Erkrankungen sind häufig. Ein kleiner AKU (300-400€) reicht bei Pferden bis 5.000€. Bei Schulpferden: Frage nach der Krankengeschichte und lasse Gelenke gründlich prüfen. Die AKU schützt dich vor teuren Überraschungen.'
    },
    {
      question: 'Kann ich als Anfänger ein junges Pferd kaufen?',
      answer: 'NEIN – als absoluter Anfänger solltest du KEIN Pferd unter 10 Jahren kaufen. Junge Pferde (unter 7 Jahre) brauchen erfahrene Ausbilder. Auch "fertig ausgebildete" junge Pferde testen ihre Grenzen und brauchen konsequente Führung. Die Folge: 40% der Erstkäufer sind überfordert und verkaufen das Pferd innerhalb von 2 Jahren wieder. Wähle stattdessen ein erfahrenes Verlasspferd!'
    }
];

const rassenData = [
  {
    title: '1. Haflinger – Der Klassiker für Anfänger',
    staerken: [
      'Extrem gutmütig und geduldig',
      'Robust und gesundheitlich stabil',
      'Für schwerere Reiter geeignet (bis 100 kg)',
      'Sehr nervenstark und unaufgeregt',
      'Wendig im Gelände'
    ],
    wichtig: [
      'Stockmaß: 138-148 cm',
      'Preis: 5.000-12.000€',
      'Tendenz zu Übergewicht – Fütterung beachten',
      'Sehr triebig – weniger für sportliche Ambitionen'
    ]
  },
  {
    title: '2. Isländer – Trittsicher und ausdauernd',
    staerken: [
      'Außergewöhnlich trittsicher',
      'Sehr ausdauernd (ideal für Langstrecken)',
      'Fünf Gangarten (inkl. Tölt und Pass)',
      'Wetterhart und genügsam',
      'Menschenbezogen'
    ],
    wichtig: [
      'Stockmaß: 130-145 cm',
      'Preis: 4.000-10.000€',
      'Besondere Gangarten erfordern Schulung',
      'Benötigen Artgenossen (Herdentiere)'
    ]
  },
  {
    title: '3. Deutsches Reitpony – Vielseitig und lernwillig',
    staerken: [
      'Sehr intelligent und lernfreudig',
      'Vielseitig einsetzbar (Dressur, Springen, Gelände)',
      'Ideal für Kinder und leichtere Erwachsene',
      'Gutmütig bei guter Erziehung'
    ],
    wichtig: [
      'Stockmaß: 138-148 cm',
      'Preis: 6.000-15.000€',
      'Maximales Reitergewicht: ca. 70 kg',
      'Brauchen geistige Beschäftigung'
    ]
  },
  {
    title: '4. Quarter Horse – Der sanfte Riese aus Amerika',
    staerken: [
      'Extrem ruhig und nervenstark',
      'Sehr menschenbezogen',
      'Schnelle Auffassungsgabe',
      'Für schwerere Reiter geeignet',
      'Ideal für Westernreiten'
    ],
    wichtig: [
      'Stockmaß: 145-160 cm',
      'Preis: 5.000-15.000€',
      'Tendenz zu Übergewicht',
      'Nicht für klassische Dressur geeignet'
    ]
  },
  {
    title: '5. Norwegisches Fjordpferd – Robust und kraftvoll',
    staerken: [
      'Sehr kräftig trotz kleiner Größe',
      'Extrem robust und gesund',
      'Gutmütig und geduldig',
      'Für schwerere Reiter geeignet'
    ],
    wichtig: [
      'Stockmaß: 135-150 cm',
      'Preis: 5.000-12.000€',
      'Charakteristische Stehmähne',
      'Wetterhart und genügsam'
    ]
  },
  {
    title: '6. Connemara Pony – Sportlich und zuverlässig',
    staerken: [
      'Sehr vielseitig (Dressur, Springen, Gelände)',
      'Gutmütig und lernwillig',
      'Trittsicher und ausdauernd',
      'Robust und gesund'
    ],
    wichtig: [
      'Stockmaß: 128-148 cm',
      'Preis: 5.000-15.000€',
      'Für leichtere Erwachsene (bis 75 kg)',
      'Sportliche Veranlagung'
    ]
  },
  {
    title: '7. Ausgediente Schulpferde – Der Geheimtipp',
    staerken: [
      'An Anfänger gewöhnt',
      'Sehr gelassen und geduldig',
      'Verzeihen Fehler',
      'Oft günstig zu erwerben',
      'Verschiedene Rassen verfügbar'
    ],
    wichtig: [
      'Preis: 2.000-8.000€',
      'Meist älter (12-20 Jahre)',
      'Gesundheitscheck besonders wichtig',
      'Oft mit "Schulpferd-Gewohnheiten"'
    ]
  }
];

// Related articles will be generated inside component with useMemo to prevent Fast Refresh loops

const opKostenData = [
  { label: 'Kolik-OP:', kosten: '3.000-8.000€' },
  { label: 'Frakturbehandlung:', kosten: '5.000-15.000€' },
  { label: 'Chip-OP am Gelenk:', kosten: '2.000-4.000€' },
  { label: 'Augen-OP:', kosten: '1.500-3.000€' }
];

const weitereVersicherungenData = [
  {
    name: 'Pferdeunfallversicherung:',
    beschreibung: 'Zahlt bei Invalidität oder Tod des Pferdes eine Summe aus. Sinnvoll nur bei sehr teuren Pferden (15.000€+).'
  },
  {
    name: 'Pferdelebensversicherung:',
    beschreibung: 'Zahlt bei Tod des Pferdes den Zeitwert. Meist zu teuer für Freizeitpferde.'
  },
  {
    name: 'Reiterunfallversicherung:',
    beschreibung: 'Für den Reiter selbst. Sinnvoll, wenn keine private Unfallversicherung vorhanden.'
  }
];

// SEO Metadata - Fokus auf Verlasspferd und Schulpferde für absolute Anfänger
const seoLocales = {
  de: {
    title: "Anfängerpferd kaufen: Verlasspferde & Schulpferde für Einsteiger",
    description: "Anfängerpferd kaufen: Ruhige Rassen für Einsteiger. Alter 10-18 Jahre, 3.000-10.000€. Worauf achten? Tipps & Checkliste.",
    keywords: "anfängerpferd kaufen, verlasspferd kaufen, schulpferd kaufen, pferd für anfänger, erstes pferd kaufen, ruhiges pferd kaufen",
    ogTitle: "Anfängerpferd kaufen: Verlasspferde & Schulpferde für Einsteiger",
    ogDescription: "Verlasspferde für Anfänger: Schulpferde, Haflinger & Fjordpferde. Alter 10-18 Jahre, fehlerverzeihend, geduldig. So findest du dein erstes Pferd.",
    twitterTitle: "Anfängerpferd kaufen: Verlasspferde Guide",
    twitterDescription: "Verlasspferde für Einsteiger: Schulpferde, ältere Pferde, Haflinger. Charakter > Rasse. Preise 3.000-10.000€.",
  },
};

export default function AnfaengerpferdKaufen() {
  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: sparklesIcon
  };

  // CRITICAL: Related articles MUST be inside component to avoid Next.js cache issues
  const relatedArticles = useMemo(() =>
    getRelatedArticles('anfaenger').map(entry => ({
      title: entry.title,
      description: entry.description,
      href: getRatgeberPath(entry.slug),
      image: entry.image,
      badge: entry.category,
      readTime: entry.readTime
    })),
  []);

  return (
    <Layout
      fullWidth={true}
      background="bg-gradient-to-b from-amber-50 to-white"
    >
      <RatgeberHead
        slug="anfaenger"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/anfaengerpferd-hero.webp"
        locales={seoLocales}
        datePublished="2025-01-14"
        wordCount={4180}
        breadcrumbTitle="Anfängerpferd kaufen"
        faqItems={faqItems}
        noindex={true}
      />

      <RatgeberHero
        title="Anfängerpferd kaufen: Verlasspferde & Schulpferde für absolute Einsteiger"
        subtitle="Dein erstes eigenes Pferd sollte ein echter Lehrmeister sein – geduldig, fehlerverzeihend und nervenstark. 40% der Erstkäufer scheitern, weil sie ein zu junges oder temperamentvolles Pferd wählen. Hier erfährst du, warum ältere Verlasspferde und ausgediente Schulpferde die beste Wahl für Anfänger sind."
        readTime="12 Min."
        publishDate="Dezember 2025"
        author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
        primaryCta={heroPrimaryCta}
        badgeLabel="Kauf & Verkauf"
      />

      <RatgeberHeroImage
        src="/images/ratgeber/anfaengerpferd-hero.webp"
        alt="Pferd zeigt Flehmen-Reaktion – typisches Verhalten bei neugierigen, aufmerksamen Pferden"
        priority={true}
        objectPosition="center center"
        attribution={heroImageAttribution}
      />

      {/* Table of Contents */}
      <RatgeberTableOfContents sections={sections} />

      <article>
        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">
          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Dieser umfassende Ratgeber begleitet dich durch alle Phasen des Pferdekaufs: von den wichtigsten Charaktereigenschaften über geeignete Rassen, realistische Kosten, den Kaufprozess bis hin zu rechtlichen Absicherungen und Versicherungen. Du erfährst, worauf es wirklich ankommt – und vermeidest die typischen Fehler, die Anfänger teuer zu stehen kommen.
            </p>
          </section>

          {/* Section 1: Charaktereigenschaften */}
          <section id="charaktereigenschaften" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was macht ein gutes Anfängerpferd aus?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Ein Anfängerpferd ist weit mehr als nur ein &ldquo;braves&rdquo; Pferd. Es muss dir als Reiter Sicherheit geben, dir verzeihen können, wenn du Fehler machst, und dich gleichzeitig in deiner reiterlichen Entwicklung fördern. Doch welche konkreten Eigenschaften zeichnen ein ideales Anfängerpferd aus?
              </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die 4 kritischen Charaktereigenschaften
            </h3>

            <div className="space-y-6 my-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    {checkCircleGreenIcon}
                    1. Gelassenheit und Nervenstärke
                  </h4>
                  <p className="text-gray-700 mb-0">
                    Ein Anfängerpferd muss in ungewohnten Situationen ruhig bleiben. Flatternde Plastiktüten, vorbeifahrende Traktoren oder unerwartete Geräusche sollten es nicht aus der Ruhe bringen. Diese Gelassenheit ist nicht verhandelbar – sie schützt dich vor gefährlichen Situationen und gibt dir die Sicherheit, dich auf deine reiterliche Entwicklung zu konzentrieren.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    {checkCircleGreenIcon}
                    2. Verzeihendes Wesen
                  </h4>
                  <p className="text-gray-700 mb-0">
                    Als Anfänger wirst du Fehler machen – falsche Hilfen geben, zu hart mit den Zügeln sein oder unsauber sitzen. Ein gutes Anfängerpferd reagiert darauf nicht mit Bocken, Steigen oder Durchgehen, sondern mit Geduld. Es &ldquo;überhört&rdquo; kleine Fehler und wartet auf die richtige Korrektur.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    {checkCircleGreenIcon}
                    3. Klare Kommunikation
                  </h4>
                  <p className="text-gray-700 mb-0">
                    Ein Anfängerpferd zeigt deutlich, was es mag und was nicht – ohne dabei aggressiv zu werden. Es kommuniziert seine Grenzen klar durch Körpersprache (Ohren, Schweif, Muskelanspannung), sodass du lernst, die Signale zu lesen und darauf zu reagieren.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                    {checkCircleGreenIcon}
                    4. Grundausbildung und Erfahrung
                  </h4>
                  <p className="text-gray-700 mb-0">
                    Das Pferd sollte die drei Grundgangarten (Schritt, Trab, Galopp) sicher beherrschen, auf Hilfengebung reagieren und idealerweise Erfahrung im Gelände haben. Es sollte problemlos verladen werden können, beim Schmied und Tierarzt kooperativ sein und sowohl in der Halle als auch im Gelände zuverlässig sein.
                  </p>
                </div>
              </div>
            </section>

          {/* Section 2: Alter */}
          <section id="alter" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Das ideale Alter für ein Anfängerpferd
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Das Alter eines Pferdes spielt eine entscheidende Rolle für seine Eignung als Anfängerpferd. Hier ist die klare Empfehlung basierend auf Expertenmeinungen und praktischer Erfahrung:
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                <h3 className="text-xl font-semibold text-green-900 mb-3">Optimales Alter für Anfänger: 10-18 Jahre</h3>
                <p className="text-green-800 mb-4">
                  Für absolute Anfänger sind ältere Pferde die beste Wahl! Sie haben unzählige Situationen erlebt, sind charakterlich gefestigt und – das Wichtigste – sie verzeihen deine Anfängerfehler. Ein 14-jähriges Schulpferd ist ein besserer Lehrmeister als ein 8-jähriger &quot;Jungspund&quot;.
                </p>
                <div className="space-y-2 text-green-800">
                  <p className="mb-1 flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Lebenserfahrung:</strong> Kennt alle Schrecksituationen bereits</span>
                  </p>
                  <p className="mb-1 flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Fehlerverzeihend:</strong> Reagiert gelassen auf unsichere Hilfen</span>
                  </p>
                  <p className="mb-1 flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Charakterlich gefestigt:</strong> Keine Überraschungen mehr</span>
                  </p>
                  <p className="mb-0 flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Noch 8-15 Jahre nutzbar:</strong> Mit guter Pflege lange Freude</span>
                  </p>
                </div>
              </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Warum Pferde unter 10 Jahren für Anfänger problematisch sind
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
                Für absolute Anfänger sind Pferde unter 10 Jahren NICHT empfehlenswert – auch wenn sie als &quot;brav&quot; oder &quot;ruhig&quot; beschrieben werden:
              </p>

              <ul className="space-y-3 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span><strong>Noch zu wenig erlebt:</strong> Unter 10 Jahren fehlt die Lebenserfahrung, die Gelassenheit bringt</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span><strong>Testen ihre Grenzen:</strong> Auch &quot;brave&quot; junge Pferde prüfen, was sie sich erlauben können</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span><strong>Reagieren auf Unsicherheit:</strong> Deine Nervosität überträgt sich – erfahrene Pferde bleiben trotzdem ruhig</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span><strong>Brauchen klare Führung:</strong> Anfänger können diese Konsequenz oft noch nicht bieten</span>
                </li>
              </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Ältere Pferde: Ab 15+ Jahre
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
                Pferde über 15 Jahre können für Anfänger geeignet sein, wenn sie gesund sind und regelmäßig tierärztlich untersucht werden. Wichtig:
              </p>

            <ul className="space-y-3 text-gray-700 list-disc list-inside">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Besonders gründliche Ankaufsuntersuchung durchführen lassen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Gesundheitszustand realistisch einschätzen (Arthrose, Zahnprobleme, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Höhere Tierarztkosten einkalkulieren</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span>Kürzere gemeinsame Zeit realistisch sehen</span>
                </li>
              </ul>
            </section>

          {/* Section 3: Rassen */}
          <section id="rassen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Anfängerpferd-Rassen: Die Top 7
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Bestimmte Pferderassen haben sich als besonders anfängerfreundlich erwiesen. Hier sind die Top-Empfehlungen mit ihren spezifischen Stärken:
              </p>

              <div className="space-y-8">
                {rassenData.map((rasse, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{rasse.title}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Stärken:</h4>
                        <ul className="space-y-1 text-gray-700 mb-4">
                          {rasse.staerken.map((staerke, i) => (
                            <li key={i}>• {staerke}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Wichtig zu wissen:</h4>
                        <ul className="space-y-1 text-gray-700 mb-0">
                          {rasse.wichtig.map((info, i) => (
                            <li key={i}>• {info}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <RatgeberHighlightBox
                icon={checkCircleIcon}
                title="Wichtiger Hinweis zur Rassenauswahl"
              >
                <p className="mb-0">
                  Die Rasse ist nur ein Anhaltspunkt. Das <strong>individuelle Temperament</strong> des Pferdes ist entscheidender als die Zugehörigkeit zu einer bestimmten Rasse. Ein gut erzogenes, erfahrenes Warmblut kann besser für Anfänger geeignet sein als ein junger, unausgeglichener Haflinger. Teste jedes Pferd persönlich und nimm eine erfahrene Person zur Beurteilung mit!
                </p>
              </RatgeberHighlightBox>
            </section>

          {/* Section 4: Kosten */}
          <section id="kosten" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kosten: Kaufpreis und Unterhalt
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Viele Anfänger unterschätzen die Gesamtkosten eines Pferdes. Es geht nicht nur um den Kaufpreis – die laufenden Kosten sind die eigentliche finanzielle Herausforderung.
              </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kaufpreis: Was kostet ein Anfängerpferd?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
                Die Anschaffungskosten für ein geeignetes Anfängerpferd liegen zwischen <strong>2.000€ und 15.000€</strong>, abhängig von Alter, Rasse, Ausbildungsstand und Gesundheitszustand.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Preiskategorie</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Preisspanne</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Typisches Profil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Budget-Variante</td>
                      <td className="px-6 py-4 text-sm text-gray-700">2.000-5.000€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Ältere Pferde (15+ Jahre), Schulpferde, Basisausbildung</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Mittleres Segment</td>
                      <td className="px-6 py-4 text-sm text-gray-700">5.000-10.000€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">8-15 Jahre, solide <LocalizedLink href="/pferd-kaufen/freizeitpferd" className="text-brand hover:text-brand-dark underline">Freizeitausbildung</LocalizedLink>, gesund</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Premium</td>
                      <td className="px-6 py-4 text-sm text-gray-700">10.000-15.000€+</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Jünger, sehr gut ausgebildet, ggf. Turniererfahrung</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Was beeinflusst den Kaufpreis?</h4>

            <ul className="space-y-3 text-gray-700 list-disc list-inside">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Alter:</strong> Pferde zwischen 8-12 Jahren sind meist am teuersten</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Ausbildung:</strong> Vielseitig ausgebildete Pferde kosten mehr</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Gesundheit:</strong> Gesunde Pferde ohne Vorerkrankungen sind teurer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Papiere:</strong> Pferde mit Abstammungsnachweis ca. 20-30% teurer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 mt-1">•</span>
                  <span><strong>Verkäufer:</strong> Händler verlangen 20-30% mehr als Privatverkäufer</span>
                </li>
              </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Einmalige Kaufnebenkosten
            </h3>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Kosten</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hinweise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Ankaufsuntersuchung (AKU)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">300-800€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Klein-AKU 300-400€, Groß-AKU mit Röntgen 600-800€</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Transport</td>
                      <td className="px-6 py-4 text-sm text-gray-700">150-500€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Abhängig von Entfernung</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Erstausstattung</td>
                      <td className="px-6 py-4 text-sm text-gray-700">500-1.500€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Sattel, Trense, Putzzeug, Decken, etc.</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Versicherungen (Setup)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">50-150€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Einmalige Gebühren</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">GESAMT</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">1.000-2.950€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Zusätzlich zum Kaufpreis</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Laufende monatliche Kosten
            </h3>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Position</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Monatlich</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Jährlich</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Stallmiete</td>
                      <td className="px-6 py-4 text-sm text-gray-700">200-500€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">2.400-6.000€</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Hufschmied</td>
                      <td className="px-6 py-4 text-sm text-gray-700">40-80€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">480-960€</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Tierarzt (Routine)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">30-60€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">360-720€</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Versicherungen</td>
                      <td className="px-6 py-4 text-sm text-gray-700">70-140€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">840-1.680€</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Zusatzfutter & Mineralien</td>
                      <td className="px-6 py-4 text-sm text-gray-700">30-80€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">360-960€</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Sonstiges (Equipment, etc.)</td>
                      <td className="px-6 py-4 text-sm text-gray-700">30-60€</td>
                      <td className="px-6 py-4 text-sm text-gray-700">360-720€</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">GESAMT</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">400-920€</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">4.800-11.040€</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <RatgeberHighlightBox
                icon={checkCircleIcon}
                title="Realistische Budgetplanung"
              >
                <p className="mb-3">
                  <strong>Faustregel:</strong> Plane mindestens <strong>500€ pro Monat</strong> für die laufenden Kosten ein. Zusätzlich solltest du eine <strong>Notreserve von 2.000-3.000€</strong> für unvorhergesehene Tierarztkosten (z.B. Kolik-OP) haben.
                </p>
                <p className="mb-0">
                  <strong>Gesamtkosten im ersten Jahr:</strong> Kaufpreis (z.B. 7.000€) + Kaufnebenkosten (1.500€) + laufende Kosten (6.000€) = <strong>ca. 14.500€</strong>
                </p>
              </RatgeberHighlightBox>
            </section>

          {/* Section 5: Kaufquellen */}
          <section id="kaufquellen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Wo findet man ein Anfängerpferd?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Es gibt verschiedene Wege, ein geeignetes Anfängerpferd zu finden. Jeder hat seine Vor- und Nachteile:
              </p>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">Empfohlen</span>
                    Online-Pferdemarktplätze
                  </h3>

                  <h4 className="font-semibold text-gray-900 mb-2">Plattformen:</h4>
                  <ul className="space-y-1 text-gray-700 mb-4">
                    <li>• <strong>ehorses.de:</strong> Größter Pferdemarkt mit über 20.000 Angeboten</li>
                    <li>• <strong>pferde.de:</strong> Spezialisiert auf Freizeitpferde</li>
                    <li>• <strong>kleinanzeigen.de:</strong> Günstige Privatangebote</li>
                  </ul>

                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Vorteile:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Große Auswahl</li>
                        <li>• Filter nach Kriterien möglich</li>
                        <li>• Detaillierte Beschreibungen</li>
                        <li>• Bewertungen von Verkäufern</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Nachteile:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Qualität variiert stark</li>
                        <li>• Viele unseriöse Angebote</li>
                        <li>• Keine Gewährleistung bei Privat</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                    <p className="text-sm text-yellow-800 mb-0">
                      <strong>Tipp:</strong> Achte auf ausführliche Beschreibungen, mehrere Fotos und Videos, sowie transparente Kommunikation. Meide Angebote ohne Probezeit oder ohne Möglichkeit zur AKU.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Pferdehändler</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Vorteile:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• 12-24 Monate Gewährleistung</li>
                        <li>• Rückgaberecht oft möglich</li>
                        <li>• Meist mehrere Pferde zur Auswahl</li>
                        <li>• Beratung inklusive</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Nachteile:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• 20-30% teurer als Privat</li>
                        <li>• Nicht alle Händler sind seriös</li>
                        <li>• Verkaufsdruck</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
                    <p className="text-sm text-blue-800 mb-0">
                      <strong>Für Anfänger empfohlen:</strong> Die Mehrkosten lohnen sich wegen der rechtlichen Absicherung und Gewährleistung. Suche nach Händlern mit guten Bewertungen.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-3">Geheimtipp</span>
                    Reitschulen & Reitvereine
                  </h3>

                  <p className="text-gray-700 mb-4">
                    Viele Reitschulen geben ältere Schulpferde ab, wenn diese für den Schulbetrieb zu alt werden. Diese Pferde sind ideal für Anfänger:
                  </p>

                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start">
                      {checkCircleGreenFlexIcon}
                      <span>An Anfänger gewöhnt und sehr geduldig</span>
                    </li>
                    <li className="flex items-start">
                      {checkCircleGreenFlexIcon}
                      <span>Du kennst das Pferd oft schon vom Reitunterricht</span>
                    </li>
                    <li className="flex items-start">
                      {checkCircleGreenFlexIcon}
                      <span>Meist günstiger Preis (2.000-6.000€)</span>
                    </li>
                    <li className="flex items-start">
                      {checkCircleGreenFlexIcon}
                      <span>Gesundheitszustand ist bekannt</span>
                    </li>
                  </ul>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <p className="text-sm text-yellow-800 mb-0">
                      <strong>Beachte:</strong> Schulpferde sind meist älter (12-20 Jahre) und haben oft Verschleißerscheinungen. Gründliche AKU ist Pflicht!
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Privatverkäufer</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Vorteile:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• 20-30% günstiger als Händler</li>
                        <li>• Kennen das Pferd meist gut</li>
                        <li>• Ehrliche Auskunft (bei seriösen)</li>
                        <li>• Oft emotionale Bindung</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Nachteile:</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Keine Gewährleistung</li>
                        <li>• Kein Rückgaberecht</li>
                        <li>• Keine rechtliche Absicherung</li>
                        <li>• Risiko unseriöser Verkäufer</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                    <p className="text-sm text-red-800 mb-0">
                      <strong>Wichtig:</strong> Bei Privatkäufen IMMER eine AKU durchführen und einen schriftlichen Kaufvertrag abschließen. Nimm eine erfahrene Person mit!
                    </p>
                  </div>
                </div>
              </div>
            </section>

          {/* Section 6: AKU */}
          <section id="aku" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Ankaufsuntersuchung (AKU): Pflicht, nicht optional
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Die Ankaufsuntersuchung durch einen Tierarzt ist <strong>keine optionale Zusatzleistung</strong>, sondern absolute Pflicht beim Pferdekauf. Sie schützt dich vor teuren Fehlkäufen und gibt dir Sicherheit über den Gesundheitszustand deines zukünftigen Partners.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
                <h3 className="text-xl font-semibold text-red-900 mb-3">Warum ist die AKU so wichtig?</h3>
                <p className="text-red-800 mb-4">
                  Versteckte Gesundheitsprobleme können später zu Kosten von <strong>5.000€ bis 15.000€</strong> führen (z.B. chronische Lahmheiten, Atemwegserkrankungen, Herz-Kreislauf-Probleme). Die AKU-Kosten von 300-800€ sind dagegen vernachlässigbar.
                </p>
                <p className="text-red-800 mb-0">
                  <strong>Beispiel:</strong> Ein nicht erkannter Hufrollenbefund kann das Pferd nach wenigen Monaten unreitbar machen – Behandlungskosten: 3.000-8.000€.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Zwei Arten der AKU</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Kleine AKU (Klinische Untersuchung)</h4>
                  <p className="text-sm text-gray-600 mb-4">Kosten: 300-400€ | Dauer: 1-1,5 Stunden</p>

                  <h5 className="font-semibold text-gray-900 mb-2">Umfang:</h5>
                  <ul className="space-y-1 text-gray-700 mb-4">
                    <li>• Allgemeinzustand (Körperkondition, Ernährung)</li>
                    <li>• Herz-Kreislauf-System (Herzfrequenz, Atmung)</li>
                    <li>• Bewegungsapparat (Gliedmaßen, Rücken, Hals)</li>
                    <li>• Haut, Augen, Zähne, Hufe</li>
                    <li>• Bewegung an der Hand und unter dem Sattel</li>
                    <li>• Beugeproben der Gliedmaßen</li>
                  </ul>

                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-blue-800 mb-0">
                      <strong>Geeignet für:</strong> Pferde bis 5.000€, ältere Pferde (15+ Jahre), wenn Budget knapp ist
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border-2 border-green-300">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Große AKU (mit Röntgen)</h4>
                  <p className="text-sm text-gray-600 mb-4">Kosten: 600-800€ | Dauer: 2-3 Stunden</p>

                  <h5 className="font-semibold text-gray-900 mb-2">Zusätzlich zur kleinen AKU:</h5>
                  <ul className="space-y-1 text-gray-700 mb-4">
                    <li>• Röntgenbilder der Gliedmaßen (standardisiert)</li>
                    <li>• Detaillierte Hufanalyse</li>
                    <li>• Rückenuntersuchung</li>
                    <li>• Optional: Blutuntersuchung</li>
                    <li>• Optional: Endoskopie der Atemwege</li>
                  </ul>

                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm text-green-800 mb-0">
                      <strong>Empfohlen für:</strong> Pferde über 5.000€, jüngere Pferde (unter 12 Jahre), bei geplanter sportlicher Nutzung
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Ablauf der AKU</h3>

              <ol className="space-y-4 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-gray-900">Tierarzt beauftragen:</strong> Wähle DEINEN eigenen Tierarzt, nicht den des Verkäufers. Vereinbare Termin am Standort des Pferdes.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-gray-900">Vorbesprechung:</strong> Teile dem Tierarzt deine geplante Nutzung mit (Freizeitreiten, gelegentliche Ausritte, etc.).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-gray-900">Klinische Untersuchung:</strong> Der Tierarzt untersucht das Pferd im Stall und auf dem Platz (ca. 60 Min.).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-gray-900">Röntgen (bei großer AKU):</strong> Standardisierte Aufnahmen der Gliedmaßen (ca. 45 Min.).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-0.5">5</span>
                  <div>
                    <strong className="text-gray-900">Befundbesprechung:</strong> Der Tierarzt erklärt dir die Ergebnisse und gibt eine Kaufempfehlung.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0 mt-0.5">6</span>
                  <div>
                    <strong className="text-gray-900">Schriftlicher Bericht:</strong> Du erhältst ein Protokoll mit allen Befunden (wichtig für Versicherung und spätere Reklamation).
                  </div>
                </li>
              </ol>

              <RatgeberHighlightBox
                icon={checkCircleIcon}
                title="Wichtig: Das bedeutet das AKU-Ergebnis"
              >
                <p className="mb-3">
                  Die AKU ist <strong>KEIN Qualitätssiegel</strong>. Sie dokumentiert nur den aktuellen Gesundheitszustand zum Untersuchungszeitpunkt. Ein &ldquo;positives&rdquo; AKU-Ergebnis bedeutet nicht &ldquo;perfektes Pferd&rdquo;, sondern &ldquo;für den angegebenen Verwendungszweck geeignet&rdquo;.
                </p>
                <p className="mb-0">
                  <strong>Beispiel:</strong> Ein Pferd mit leichter Arthrose kann für Freizeitreiten geeignet sein (AKU positiv), aber nicht für Turnierreiten (AKU negativ). Der Verwendungszweck bestimmt die Bewertung!
                </p>
              </RatgeberHighlightBox>
            </section>

          {/* Section 7: Rechtliches */}
          <section id="rechtliches" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Rechtliche Absicherung beim Pferdekauf
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Ein Pferdekauf ist ein <strong>Kaufvertrag nach BGB</strong> und unterliegt denselben Regeln wie andere Kaufverträge. Doch es gibt wichtige Besonderheiten, die du kennen solltest.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Der Pferdekaufvertrag: 7 essenzielle Bestandteile</h3>

              <div className="space-y-4 mb-8">
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">1. Identifikation des Pferdes</h4>
                  <ul className="space-y-1 text-gray-700 mb-0">
                    <li>• Name, Alter, Rasse, Farbe, Geschlecht</li>
                    <li>• Besondere Merkmale (Abzeichen, Brandzeichen)</li>
                    <li>• Pferdepass-Nummer (UELN)</li>
                    <li>• Chip-Nummer falls vorhanden</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">2. Käufer und Verkäufer</h4>
                  <ul className="space-y-1 text-gray-700 mb-0">
                    <li>• Vollständige Namen und Adressen</li>
                    <li>• Geburtsdaten</li>
                    <li>• Bei Minderjährigen: Zustimmung der Eltern</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">3. Kaufpreis und Zahlungsmodalitäten</h4>
                  <ul className="space-y-1 text-gray-700 mb-0">
                    <li>• Gesamtkaufpreis (inkl. oder zzgl. MwSt.)</li>
                    <li>• Zahlungsweise (Barzahlung, Überweisung)</li>
                    <li>• Fälligkeit der Zahlung</li>
                    <li>• Eventuelle Anzahlung</li>
                    <li>• Was passiert bei Zahlungsverzug?</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">4. Zustandsbeschreibung</h4>
                  <ul className="space-y-1 text-gray-700 mb-0">
                    <li>• Gesundheitszustand (AKU-Ergebnis beilegen!)</li>
                    <li>• Ausbildungsstand und Fähigkeiten</li>
                    <li>• Temperament und Verhalten</li>
                    <li>• Bekannte Vorerkrankungen oder Mängel</li>
                    <li>• Turniererfolge (falls relevant)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-5 border-2 border-yellow-300">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">5. Gewährleistung (WICHTIG!)</h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Gesetzliche Regelung:</strong>
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li>• <strong>Privatverkauf:</strong> Gewährleistung kann komplett ausgeschlossen werden</li>
                    <li>• <strong>Händler:</strong> Gewährleistung mindestens 12 Monate (kann nicht ausgeschlossen werden)</li>
                  </ul>
                  <div className="bg-yellow-50 p-3 rounded">
                    <p className="text-sm text-yellow-800 mb-0">
                      <strong>Tipp für Anfänger:</strong> Kaufe lieber bei einem Händler mit Gewährleistung, auch wenn es 20-30% teurer ist. Bei Privatkäufen bist du rechtlich weitgehend schutzlos!
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">6. Übergabe und Eigentumsübergang</h4>
                  <ul className="space-y-1 text-gray-700 mb-0">
                    <li>• Datum der Übergabe</li>
                    <li>• Ort der Übergabe</li>
                    <li>• Wann geht das Eigentum über? (meist mit Zahlung)</li>
                    <li>• Wann geht die Gefahr über? (Wer haftet bei Unfall/Tod?)</li>
                    <li>• Was wird mitübergeben? (Pferdepass, Impfausweis, Halfter, etc.)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">7. Probezeit (optional, aber empfohlen)</h4>
                  <ul className="space-y-1 text-gray-700 mb-0">
                    <li>• Dauer der Probezeit (typisch: 1-4 Wochen)</li>
                    <li>• Bedingungen für Rücktritt</li>
                    <li>• Kostenregelung bei Rücktritt (z.B. Stallkosten)</li>
                    <li>• Versicherungsschutz während Probezeit</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Probezeit: Dein Sicherheitsnetz</h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Eine schriftlich vereinbarte Probezeit von <strong>2-4 Wochen</strong> gibt dir die Möglichkeit, das Pferd in verschiedenen Situationen kennenzulernen. Dies ist besonders für Anfänger wertvoll.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
                <h4 className="text-lg font-semibold text-green-900 mb-3">Was solltest du während der Probezeit testen?</h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Verschiedene Gangar ten:</strong> Schritt, Trab, Galopp in Halle und Gelände</span>
                  </li>
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Bodenarbeit:</strong> Putzen, Führen, Anbinden, Hufe geben</span>
                  </li>
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Verladen:</strong> Wie reagiert das Pferd beim Transport?</span>
                  </li>
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Verschiedene Reiter:</strong> Lass auch andere (erfahrene) Personen reiten</span>
                  </li>
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Tierarzt/Hufschmied:</strong> Wie verhält sich das Pferd?</span>
                  </li>
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Herde:</strong> Wie integriert sich das Pferd in die neue Umgebung?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Kostenlose Kaufvertrag-Vorlage</h4>
                <p className="text-blue-800 mb-4">
                  Verwende eine professionelle Vertragvorlage, um nichts zu vergessen:
                </p>
                <LocalizedLink href="/pferd-kaufen/kaufvertrag" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold underline">
                  Zum Pferdekaufvertrag-Ratgeber mit kostenloser Vorlage →
                </LocalizedLink>
              </div>
            </section>

          {/* Section 8: Versicherungen */}
          <section id="versicherungen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Versicherungen für Anfängerpferde
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
                Versicherungen sind ein wichtiger Teil des Pferdebesitzes. Einige sind unverzichtbar, andere optional – abhängig von deinem Budget und Sicherheitsbedürfnis.
              </p>

              <div className="space-y-6">
                <div className="bg-red-50 rounded-lg p-6 border-2 border-red-500">
                  <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
                    {shieldIcon}
                    1. Pferdehaftpflichtversicherung – UNVERZICHTBAR
                  </h3>

                  <p className="text-red-800 mb-4">
                    Die Haftpflichtversicherung ist <strong>gesetzlich nicht vorgeschrieben, aber absolut unverzichtbar</strong>. Sie schützt dich vor existenzbedrohenden Schadensersatzforderungen.
                  </p>

                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Was ist versichert?</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Personenschäden (z.B. Tritt verletzt jemanden schwer)</li>
                      <li>• Sachschäden (z.B. Pferd beschädigt Auto)</li>
                      <li>• Vermögensschäden (z.B. durch Verkehrsunfall)</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Kosten:</h4>
                      <p className="text-gray-700 mb-0">30-60€ pro Monat (abhängig von Deckungssumme)</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Deckungssumme:</h4>
                      <p className="text-gray-700 mb-0">Mindestens 5 Mio. € (besser: 10 Mio. €)</p>
                    </div>
                  </div>

                  <div className="bg-red-100 p-4 rounded">
                    <p className="text-sm text-red-900 mb-0">
                      <strong>Wichtig:</strong> Schließe die Versicherung VOR der Pferdeübergabe ab! Viele Versicherer bieten auch Probezeit-Versicherungen an.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-lg p-6 border-2 border-amber-400">
                  <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                    {awardIcon}
                    2. Pferde-OP-Versicherung – STARK EMPFOHLEN
                  </h3>

                  <p className="text-amber-800 mb-4">
                    Eine OP-Versicherung übernimmt die Kosten für chirurgische Eingriffe. Gerade bei Pferden können OPs extrem teuer werden.
                  </p>

                  <div className="bg-white rounded p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Typische OP-Kosten ohne Versicherung:</h4>
                    <ul className="space-y-2 text-gray-700">
                      {opKostenData.map((item, i) => (
                        <li key={i}>• <strong>{item.label}</strong> {item.kosten}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Kosten:</h4>
                      <p className="text-gray-700 mb-0">40-80€ pro Monat (abhängig von Alter und Vorerkrankungen)</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Wichtig:</h4>
                      <p className="text-gray-700 mb-0">Gesundheitsprüfung vor Vertragsabschluss erforderlich</p>
                    </div>
                  </div>

                  <div className="bg-amber-100 p-4 rounded">
                    <p className="text-sm text-amber-900 mb-0">
                      <strong>Tipp:</strong> Für Anfängerpferde lohnt sich die OP-Versicherung besonders, da du noch keine Rücklagen hast. Ab einem Alter von 15+ Jahren wird die Versicherung deutlich teurer oder nicht mehr angeboten.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-300">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">3. Pferdekrankenversicherung – OPTIONAL</h3>

                  <p className="text-blue-800 mb-4">
                    Die Vollkrankenversicherung deckt auch ambulante Behandlungen, Medikamente und Vorsorge ab. Sie ist jedoch sehr teuer.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Kosten:</h4>
                      <p className="text-gray-700 mb-0">80-150€ pro Monat</p>
                    </div>
                    <div className="bg-white rounded p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Deckung:</h4>
                      <p className="text-gray-700 mb-0">Tierarztkosten, Medikamente, Vorsorge</p>
                    </div>
                  </div>

                  <div className="bg-blue-100 p-4 rounded">
                    <p className="text-sm text-blue-900 mb-0">
                      <strong>Alternative:</strong> Viele Pferdebesitzer sparen das Geld der Krankenversicherung (ca. 100€/Monat = 1.200€/Jahr) lieber in einen Notfallfonds an. Nach 3-4 Jahren hast du 3.600-4.800€ Rücklagen für Tierarztkosten.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Weitere Versicherungen (weniger wichtig)</h3>

                  <ul className="space-y-3 text-gray-700">
                    {weitereVersicherungenData.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="font-semibold min-w-[200px]">{item.name}</span>
                        <span>{item.beschreibung}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 mt-8">
                <h4 className="text-lg font-semibold text-green-900 mb-3">Empfehlung für Anfänger</h4>
                <p className="text-green-800 mb-4">
                  <strong>Absolutes Minimum:</strong>
                </p>
                <ul className="space-y-2 text-green-800 mb-4">
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Pferdehaftpflicht</strong> (30-60€/Monat) – PFLICHT</span>
                  </li>
                  <li className="flex items-start">
                    {checkCircleGreenFlexIcon}
                    <span><strong>Pferde-OP-Versicherung</strong> (40-80€/Monat) – DRINGEND EMPFOHLEN</span>
                  </li>
                </ul>
                <p className="text-green-800 mb-0">
                  <strong>Gesamtkosten:</strong> 70-140€ pro Monat für guten Versicherungsschutz
                </p>
              </div>
            </section>

        </div>

        {/* FAQ Section */}
        <div id="faq" className="scroll-mt-32 lg:scroll-mt-40">
          <FAQ
            faqs={faqItems}
            sectionTitle="Häufig gestellte Fragen"
            sectionSubtitle="Die wichtigsten Antworten zum Kauf eines Anfängerpferdes – damit du bestens vorbereitet bist."
            withSchema={false}
          />
        </div>

        {/* Author Box */}
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <AuthorBox />
        </div>

        {/* Related Articles */}
        <RatgeberRelatedArticles
          title="Weitere hilfreiche Ratgeber zum Pferdekauf"
          articles={relatedArticles}
        />

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={finalCtaImage}
          title="Bereit für dein Anfängerpferd?"
          description="Lass dein Wunschpferd in nur 2 Minuten von unserer KI bewerten und erhalte eine objektive Einschätzung zum fairen Marktwert."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
