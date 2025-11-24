import LocalizedLink from '@/components/LocalizedLink';
import Head from 'next/head';
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import { Sparkles, Award, Clock, User, Euro, MapPin, Heart, Calendar } from 'lucide-react';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const awardIcon = <Award className="w-5 h-5" />;
const euroIcon = <Euro className="w-5 h-5" />;
const heartIcon = <Heart className="w-5 h-5" />;
const clockIcon = <Clock className="h-4 w-4" />;
const userIcon = <User className="h-4 w-4" />;

// FAST REFRESH FIX: Define arrays and objects at module level to prevent recreation
const heroMetaItems = [
  { icon: clockIcon, label: '16 Min. Lesezeit' },
  { icon: userIcon, label: 'PferdeWert Redaktion' }
];

export default function Lipizzaner() {
  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: '/pferde-preis-berechnen',
    icon: sparklesIcon
  };

  const sections = [
    { id: 'definition', title: 'Was ist ein Lipizzaner?' },
    { id: 'geschichte', title: 'Herkunft und Geschichte' },
    { id: 'aussehen', title: 'Aussehen und Farbwechsel' },
    { id: 'charakter', title: 'Charakter und Temperament' },
    { id: 'anfaenger', title: 'Sind Lipizzaner für Anfänger geeignet?' },
    { id: 'kaufen', title: 'Lipizzaner kaufen' },
    { id: 'gestuete', title: 'Gestüte und Züchter' },
    { id: 'haltung', title: 'Haltung und Fütterung' },
    { id: 'faq', title: 'Häufig gestellte Fragen' }
  ];

  const faqItems = [
    {
      question: 'Sind Lipizzaner bei der Geburt schwarz?',
      answer: 'Ja, etwa 91% aller Lipizzaner werden dunkelbraun oder schwarz geboren. Der charakteristische Schimmel-Farbwechsel beginnt typischerweise zwischen dem 2. und 3. Lebensjahr und setzt sich bis zum 6.-10. Jahr fort. Manche Pferde benötigen bis zu 15 Jahre zur vollständigen Ergrauerung. Dies wird durch das Grey-Gen (Grauungsfaktor) gesteuert – eine Mutation, die progressive Weißhaarigkeit verursacht.'
    },
    {
      question: 'Sind Lipizzaner für Anfänger geeignet?',
      answer: 'Traditionell nicht, da Lipizzaner sehr sensibel und intelligent sind und hohe Anforderungen an den Reiter stellen. Allerdings gibt es praktische Lösungen: Ein professioneller Trainer mit Erfahrung mit der Rasse, eine Mentor-Partnership mit einem erfahrenen Reiter, oder ein Bodenarbeit-zuerst-Ansatz können Anfängern helfen. Der Schlüssel ist, ehrlich die eigene Erfahrung und das Budget zu evaluieren.'
    },
    {
      question: 'Wie viel kostet ein Lipizzaner?',
      answer: 'Der Preis hängt stark vom Alter und der Ausbildung ab: Fohlen (0-2 Jahre) kosten 3.000-8.000 EUR, junge trainierte Pferde (3-7 Jahre) 8.000-15.000 EUR, fertig ausgebildete (8-15 Jahre) 15.000-25.000 EUR+, und ältere Pferde (15+ Jahre) 5.000-12.000 EUR. Seltene Farben, Champion-Pedigree und Zuchtgenehmigung können 10-30% Aufschlag bedeuten. Hinzu kommen jährliche Unterhaltskosten von 8.100-16.400+ EUR.'
    },
    {
      question: 'Was macht Lipizzaner in der Spanischen Hofreitschule Wien so besonders?',
      answer: 'Lipizzaner sind die einzige Pferderasse, die bei der Spanischen Hofreitschule Wien eingesetzt wird. Seit ihrer Gründung 1572 nutzt diese Institution ausschließlich Lipizzaner für ihre berühmten Dressur-Vorführungen. Ihre einzigartige Kombination aus Intelligenz, Sensibilität und klassischer Trainierbarkeit ist perfekt für die spektakulären "Schulen der Höhe" – Bewegungen wie Levade, Courbette und Capriole, die extreme Finesse erfordern.'
    },
    {
      question: 'Wo werden Lipizzaner gezüchtet?',
      answer: 'Die wichtigsten Zuchtbetriebe sind: Gestüt Lipica (Slowenien) mit über 300 Pferden seit 1580 – die ursprüngliche Gestüt und größte weltweit; Gestüt Piber (Österreich) mit etwa 60 Pferden – offizieller Lieferant der Spanischen Hofreitschule Wien; und Monterotondo (Italien) mit etwa 80 Pferden. Auch Ungarn und Tschechien haben renommierte private Züchter mit wachsender Reputation.'
    },
    {
      question: 'Wie alt wird ein Lipizzaner durchschnittlich?',
      answer: 'Lipizzaner haben eine bemerkenswerte Lebenserwartung von durchschnittlich 25-30 Jahren – älter als viele andere Warmblut-Rassen. Viele Lipizzaner bleiben bis zum 20. Lebensjahr und länger reittauglich. Zuchtpferde werden oft Jahrzehnte lang genutzt. Diese Langlebigkeit kombiniert mit ihrer Zuverlässigkeit macht Lipizzaner zu echten Lebensgefährten für 25-30 Jahre.'
    },
    {
      question: 'Sind Lipizzaner spanische oder österreichische Pferde?',
      answer: 'Weder noch ursprünglich – Lipizzaner stammen aus Lipica (heute Slowenien), gegründet 1580 von Erzherzog Karl II., damals Teil des Habsburger-Reiches. Die Rasse kombiniert spanische Genetik (durch Andalusier-Einkreuzung) mit lokalen Karst-Pferden der Region. Die österreichische Verbindung entsteht durch die historische Nutzung bei der Spanischen Hofreitschule Wien und dem Gestüt Piber in Österreich.'
    },
    {
      question: 'Kann man Lipizzaner privat züchten?',
      answer: 'Ja, mit Genehmigung durch die Lipizzaner International Federation. Private Züchter benötigen eine Zuchtzulassung (ca. 300-500 EUR) und die Zuchtpferde müssen Rasse-Standards erfüllen. Die Pferde müssen auch in Zucht-Registern eingetragen sein. Professionelle Gestüte wie Lipica bieten Beratung und Unterstützung für qualitätsbewusste private Züchter.'
    }
  ];

  const relatedArticles = [
    {
      href: '/pferde-ratgeber/dressurpferd-kaufen',
      image: '/images/ratgeber/dressage-rider-competition-arena.webp',
      title: 'Dressurpferd kaufen: Der ultimative Ratgeber',
      badge: 'Kauf & Verkauf',
      readTime: '14 Min.',
      description: 'Erfahre alles über Preise, Qualitätskriterien und Kaufquellen für Dressurpferde. Vom A-Pferd bis Grand Prix.'
    },
    {
      href: '/pferde-ratgeber/was-kostet-ein-pferd',
      image: '/images/ratgeber/horses-mountain-field-spain.webp',
      title: 'Was kostet ein Pferd? Alle Kosten im Überblick',
      badge: 'Finanzen',
      readTime: '16 Min.',
      description: 'Kaufpreis, monatliche Unterhaltskosten, Tierarzt, Hufschmied und mehr. Plane dein Budget realistisch.'
    },
    {
      href: '/pferde-ratgeber/anfaengerpferd-kaufen',
      image: '/images/ratgeber/anfaengerpferd-hero.webp',
      title: 'Anfängerpferd kaufen: Der Ratgeber für Einsteiger',
      badge: 'Kauf & Verkauf',
      readTime: '12 Min.',
      description: 'Das perfekte erste Pferd finden: Geeignete Rassen, Charakter-Eigenschaften und worauf du als Anfänger achten solltest.'
    }
  ];

  return (
    <Layout
      fullWidth={true}
      background="bg-gradient-to-b from-amber-50 to-white"
    >
      <Head>
        <title>Lipizzaner – Der ultimative Ratgeber zur edlen Pferderasse</title>
        <meta name="description" content="Alles über Lipizzaner: Geschichte, Farben, Charakter & Kaufen. Kompletter Ratgeber mit Preisen, Gestüten & Tipps für Anfänger. 2025 aktualisiert." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="lipizzaner, barockpferde, lipizzaner kaufen, lipizzaner preis, lipizzaner charakter, lipizzaner gestüte, spanische hofreitschule wien" />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/lipizzaner" />

        {/* Open Graph */}
        <meta property="og:title" content="Lipizzaner – Der ultimative Ratgeber zur edlen Pferderasse" />
        <meta property="og:description" content="Lipizzaner sind edle Barockpferde mit faszinierender Geschichte. Erfahre alles über ihre Herkunft, den einzigartigen Farbwechsel, Charakter und wie du einen kaufst." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/lipizzaner" />
        <meta property="og:image" content="https://pferdewert.de/images/ratgeber/lipizzaner-white-horse.webp" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lipizzaner – Der ultimative Pferderasse-Ratgeber" />
        <meta name="twitter:description" content="Alles über Lipizzaner: Geschichte, Farben, Charakter & wie du einen kaufst. Mit Preisen, Gestüten & Tipps für Anfänger." />
        <meta name="twitter:image" content="https://pferdewert.de/images/ratgeber/lipizzaner-white-horse.webp" />
        <meta name="twitter:creator" content="@pferdewert" />
        <meta name="twitter:site" content="@pferdewert" />

        {/* Article Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'Lipizzaner – Der ultimative Ratgeber zur edlen Barockpferderasse',
              description: 'Alles über Lipizzaner: Geschichte, Farben, Charakter & Kaufen. Kompletter Ratgeber mit Preisen, Gestüten & Tipps für Anfänger. 2025 aktualisiert.',
              image: {
                '@type': 'ImageObject',
                url: 'https://pferdewert.de/images/ratgeber/lipizzaner-white-horse.webp',
                width: 2047,
                height: 1151,
                alt: 'Weißer Lipizzaner - edle Barockpferderasse mit charakteristischer Schimmelfärbung'
              },
              author: {
                '@type': 'Organization',
                name: 'PferdeWert',
                url: 'https://pferdewert.de'
              },
              publisher: {
                '@type': 'Organization',
                name: 'PferdeWert.de',
                url: 'https://pferdewert.de',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://pferdewert.de/logo.png',
                  width: 250,
                  height: 60
                }
              },
              datePublished: '2025-11-23',
              dateModified: '2025-11-23',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://pferdewert.de/pferde-ratgeber/lipizzaner'
              },
              articleSection: 'Pferderassen Guide',
              keywords: ['lipizzaner', 'barockpferde', 'lipizzaner kaufen', 'lipizzaner preis', 'spanische hofreitschule wien', 'lipizzaner gestüte', 'pferderasse'],
              wordCount: 3150,
              timeRequired: 'PT16M',
              inLanguage: 'de-DE'
            })
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://pferdewert.de'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Pferde-Ratgeber',
                  item: 'https://pferdewert.de/pferde-ratgeber'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Lipizzaner',
                  item: 'https://pferdewert.de/pferde-ratgeber/lipizzaner'
                }
              ]
            })
          }}
        />
      </Head>

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Pferderassen"
          title="Lipizzaner – Der ultimative Ratgeber zur edlen Barockpferderasse"
          subtitle="Lipizzaner sind nicht nur elegante Barockpferde – sie sind lebende Geschichte. Erfahre alles über ihre faszinierende Herkunft, den einzigartigen Farbwechsel und wie du einen Lipizzaner kaufst."
          metaItems={heroMetaItems}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/lipizzaner-white-horse.webp"
          alt="Weißer Lipizzaner - edle Barockpferderasse mit charakteristischer Schimmelfärbung"
          priority={true}
          objectPosition="center 30%"
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Lipizzaner</strong> sind nicht nur elegante Barockpferde – sie sind lebende Geschichte. Mit ihrer Fähigkeit, von Geburt an dunkel zu sein und erst später zum charakteristischen Schimmel zu ergrauen, verkörpern sie eine einzigartige Pferderasse. Noch beeindruckender: Sie sind die einzigen Pferde, die bei der berühmten Spanischen Hofreitschule Wien eingesetzt werden – seit über 450 Jahren das Zentrum der klassischen Dressur.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              In diesem Ratgeber erfährst du alles, was du über Lipizzaner wissen musst. Wir behandeln ihre faszinierende Herkunft aus dem slowenischen Karst, ihre besonderen körperlichen Merkmale und ihren bemerkenswerten Charakter. Du wirst lernen, ob ein Lipizzaner wirklich nur für erfahrene Reiter geeignet ist – oder ob es praktische Lösungen für Anfänger gibt. Und natürlich zeigen wir dir, wie viel ein Lipizzaner kostet, wo du einen kaufst und wie du ihn optimal hältst und fütterst.
            </p>
          </section>

          {/* Section: Definition */}
          <section id="definition" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was ist ein Lipizzaner? Definition und Grundmerkmale
            </h2>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die Rasse im Überblick
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese eleganten Barockpferde gehören zur Familie der Warmblüter, die für ihre harmonische Bewegung und ihre Eignung für klassische Reitweisen bekannt sind. Die Rasse wurde speziell für die klassische Dressur gezüchtet, was sich in ihrer Intelligenz, Sensibilität und Fähigkeit zur Zusammenarbeit mit dem Reiter zeigt. Wenn du mehr über verschiedene Pferdetypen erfahren möchtest, findest du in unserem <LocalizedLink href="/pferde-ratgeber" className="text-brand hover:text-brand-dark underline">Pferde-Ratgeber</LocalizedLink> weitere Details.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Was diese edlen Pferde wirklich besonders macht, ist eine einzigartige genetische Eigenschaft: Die meisten werden dunkelbraun oder schwarz geboren und werden erst im Laufe ihres Lebens zum charakteristischen Schimmel. Diese Farbveränderung ist so ungewöhnlich, dass viele Menschen beim ersten Treffen überrascht sind.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Größe, Gewicht und Körperbau
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese Barockpferde sind mittlere bis große Pferde mit idealen Proportionen für klassische Reitweisen. Sie erreichen eine Widerristhöhe zwischen <strong>148 und 162 Zentimetern</strong> – meistens bewegen sie sich im Bereich von 153 bis 158 Zentimetern. Ein ausgewachsenes Tier wiegt etwa <strong>500 bis 600 Kilogramm</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Körperbau ist robust und muskulös, aber gleichzeitig elegant. Die Pferde haben einen mäßig langen Hals, einen starken Rücken und kräftige Hinterquartiere – perfekt für die hochelastischen Bewegungen der klassischen Dressur. Ihre Bewegungen wirken ausdrucksstark und fedrig, was Zuschauer fasziniert.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Warum Lipizzaner so besonders sind
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Kombination aus Intelligenz, Sensibilität und klassischen Trainingsveranlagungen macht diese Rasse unvergleichlich. Diese Pferde lernen schnell, vergessen aber auch keine Fehler – sie erfordern daher erfahrene, konsequente Reiter. Ihre emotionale Bindungsfähigkeit ist legendär; viele Besitzer berichten von tiefem Vertrauen und starken Partnerschaften.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die historische Verbindung zur Spanischen Hofreitschule Wien und zur 450 Jahre alten Zucht in Gestüt Lipica verleiht ihnen einen Status, den viele andere Rassen nicht haben. Das ist nicht nur Tradition – es ist lebendige Kunstgeschichte.
            </p>
          </section>

          {/* Section: Geschichte */}
          <section id="geschichte" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Herkunft und Geschichte: Vom Karst zur Weltbühne
            </h2>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die Ursprünge in Lipica (Slowenien)
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Geschichte der Lipizzaner beginnt <strong>1580 im slowenischen Karst</strong>, als Erzherzog Karl II. das Gestüt Lipica gründete. Die Entscheidung, ausgerechnet diese raue, felsige Plateau-Landschaft zu wählen, war strategisch klug: Die harten Bedingungen formten eine natürlich robuste, genügsame Pferderasse.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Name &quot;Lipizzaner&quot; stammt von &quot;Lipica&quot; – dem Ort der ursprünglichen Gestüt. Seit fast 450 Jahren werden dort nach denselben Grundprinzipien Pferde gezüchtet. Das Gestüt beherbergt heute über 300 Pferde und ist damit die größte Lipizzaner-Zuchtanlage der Welt. Was besonders beeindruckend ist: Lipica führt detaillierte Stammbäume seit der Gründung – ein beispielloses Zuchtdokument.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Habsburger Einfluss und klassische Dressur
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Habsburger erkannten früh das Potenzial dieser Pferde für die Hofkultur. Sie führten spanische Pferderassen (vor allem Andalusier) ein, um die eleganten Bewegungen zu verstärken. Dies war eine bewusste Züchtung für klassische Reitweisen – nicht für Jagd oder Krieg, sondern für die raffinierte Kunstform der klassischen Dressur.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Operation Cowboy und die Rettung der Rasse
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Zweite Weltkrieg bedrohte die Existenz der Rasse. Als die sowjetischen Truppen näher kamen, war Gestüt Lipica in Gefahr. Im Mai 1945 startete die amerikanische Armee eine bemerkenswerte Rettungsoperation – genannt &quot;Operation Cowboy&quot; – um die Pferde in Sicherheit zu bringen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Amerikanische Kavalleriemänner riskierten ihre Leben, um über 250 Lipizzaner-Pferde über Hunderte von Kilometern nach Österreich zu evakuieren. Dies rettete nicht nur die Rasse vor genetischem Kollaps, sondern ermöglichte auch die Wiederherstellung von Gestüt Lipica nach dem Krieg.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Spanische Hofreitschule Wien – Die berühmteste Bühne
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Spanische Hofreitschule Wien ist das kulturelle Herz der Lipizzaner. Seit ihrer Gründung 1572 nutzt diese Institution ausschließlich Lipizzaner für ihre berühmten Dressur-Vorführungen. Die &quot;Schulen der Höhe&quot; – spektakuläre Bewegungen wie Levade, Courbette und Capriole – sind nur mit den sensibelsten und intelligentesten Pferden möglich.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Im Jahr 2022 erkannte die <a href="https://ich.unesco.org/en/RL/lipizzaner-horse-breeding-traditions-01985" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark underline font-medium">UNESCO</a> die Lipizzaner-Zucht und die klassische Dressur in Wien als &quot;immaterielles Kulturerbe der Menschheit&quot; an. Dies würdigt nicht nur die Pferde, sondern auch 450 Jahre kontinuierliche Pferdekunst.
            </p>
          </section>

          {/* CTA Box 1 */}
          <RatgeberHighlightBox
            title="UNESCO Kulturerbe seit 2022"
            icon={awardIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Die Lipizzaner-Zucht und die klassische Dressur der Spanischen Hofreitschule Wien wurden 2022 als immaterielles Kulturerbe der UNESCO anerkannt – eine Würdigung von 450 Jahren Pferdekunst.
            </p>
          </RatgeberHighlightBox>

          {/* Section: Aussehen */}
          <section id="aussehen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Aussehen und besondere Merkmale: Der charakteristische Schimmel-Farbwechsel
            </h2>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Warum Lipizzaner bei der Geburt dunkel sind
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dies ist eine der überraschendsten Eigenschaften der Rasse: <strong>91% aller Lipizzaner werden dunkelbraun oder schwarz geboren</strong>. Wenn du ein Lipizzaner-Fohlen siehst, würdest du es vielleicht für einen schwarzen Wallach halten – nicht für den klassischen weißen Schimmel!
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Grund liegt in einer genetischen Mutation, der sogenannten &quot;Grey-Gen&quot; (Grauungsfaktor). Obwohl das Gen bereits vorhanden ist, wird es bei der Geburt nicht aktiv. Das Pigment entwickelt sich normal. Erst nach Monaten und Jahren beginnt der Farbwechsel.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Der Farbwechsel im Detail: Genetik und Zeitrahmen
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das Grey-Gen wirkt sich auf die Melaninproduktion aus. Mit jedem Haarwechsel (etwa alle 3-6 Monate) ersetzen weiße Haare die pigmentierten Haare. Dies geschieht graduell und individuell unterschiedlich schnell.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Der typische Zeitrahmen:</strong>
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-brand mt-1 flex-shrink-0" />
                <span><strong>Mit 2-3 Jahren:</strong> Erste sichtbare Ergrauerung (helle Flöckchen im Fell)</span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-brand mt-1 flex-shrink-0" />
                <span><strong>Mit 6-10 Jahren:</strong> Deutlich heller, aber oft noch gemischte Färbung</span>
              </li>
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-brand mt-1 flex-shrink-0" />
                <span><strong>Mit 15+ Jahren:</strong> Vollständig weiß oder hellgrau</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Allerdings variiert dies erheblich. Manche Lipizzaner sind mit 6 Jahren schon fast weiß, andere benötigen 15 Jahre für die vollständige Umwandlung. Dies ist genetisch vorbestimmt und hängt von den spezifischen Allelen ab.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Ausnahmen: Schwarze und braune Lipizzaner
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Etwa <strong>9% der Lipizzaner bleiben dunkel</strong>. Die Conversano-Familie ist überwiegend schwarz, die Favory-Familie zeigt einen falben (goldbraunen) Farbton. Dies sind keine genetischen Fehler, sondern anerkannte Farb-Varianten.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Historisch bevorzugten die Habsburger die weißen Schimmel für ihre Prunk-Auftritte. Daher wurde selektiv auf diese Farbe hin gezüchtet. Die schwarzen und braunen Lipizzaner waren lange Zeit weniger beliebt – heute werden sie wieder geschätzt und gelten als seltene, begehrte Varianten.
            </p>
          </section>

          {/* Section: Charakter */}
          <section id="charakter" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Charakter und Temperament: Intelligent, sensibel und lernfähig
            </h2>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Intelligenz und Lernfähigkeit
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lipizzaner sind berüchtigt für ihre Intelligenz. Sie lernen schnell – aber das bedeutet auch, dass sie Fehler im Training schnell bemerken. Ein Trainer muss konsistent sein; die Pferde verzeihen Unklarheit nicht einfach.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese Intelligenz ist ein großer Vorteil in der klassischen Dressur. Lipizzaner verstehen komplexe Hilfen und können mit minimalen Reiterangaben kommunizieren. Sie sind wie Schachspieler unter den Pferden – immer einen Zug voraus.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Sensibilität und emotionale Natur
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lipizzaner sind hochsensibel. Sie spüren sofort, wenn ein Reiter nervös, unsicher oder angespannt ist. Diese Eigenschaft macht sie zu exzellenten Pferden für erfahrene Reiter, die ihre Körperspannung kontrollieren können. Für unerfahrene oder nervöse Reiter kann dies problematisch sein – der Lipizzaner wird dann ebenfalls nervös.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Gleichzeitig ermöglicht diese Sensibilität tiefe emotionale Bindungen. Lipizzaner-Besitzer berichten häufig davon, dass ihre Pferde ihre Stimmungen spiegeln und bei Bedarf Trost bieten. Es ist eine echte Partnerschaft, keine Meister-Sklave-Beziehung.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Langlebigkeit und Verlässlichkeit
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lipizzaner haben eine bemerkenswerte Lebenserwartung. Sie werden durchschnittlich <strong>25-30 Jahre alt</strong> – älter als viele andere Warmblut-Rassen. Viele Lipizzaner sind noch mit über 20 Jahren reittauglich, und Zuchtpferde werden oft für Jahrzehnte genutzt.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese Langlebigkeit kombiniert mit ihrer Zuverlässigkeit macht Lipizzaner zu echten Lebensgefährten. Wenn du einen Lipizzaner kaufst, verpflichtest du dich zu einer 25-30-jährigen Partnerschaft.
            </p>
          </section>

          {/* CTA Box 2 */}
          <RatgeberHighlightBox
            title="Lebenslange Partnerschaft"
            icon={heartIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Mit einer Lebenserwartung von 25-30 Jahren sind Lipizzaner echte Lebensgefährten. Diese Langlebigkeit, kombiniert mit ihrer tiefen Bindungsfähigkeit, macht sie zu idealen Partnern für klassische Reitweisen.
            </p>
          </RatgeberHighlightBox>

          {/* Section: Anfänger */}
          <section id="anfaenger" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Sind Lipizzaner für Anfänger geeignet? Praktische Lösungen für interessierte Reiter
            </h2>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Warum diese Rasse traditionell nicht für Anfänger empfohlen wird
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die klassische Antwort ist: Nein, diese sensiblen Barockpferde sind nichts für Anfänger. Und für viele Einsteiger ist das korrekt. Ihre Sensibilität bedeutet, dass unsichere Hilfen zu Verwirrung führen. Ihre Intelligenz bedeutet, dass sie schnell lernen, aber auch schnell frustriert sind. Grundlagen zum Reiteinstieg findest du in unserem <LocalizedLink href="/pferde-ratgeber/anfaengerpferd-kaufen" className="text-brand hover:text-brand-dark underline">Anfängerpferd-Ratgeber</LocalizedLink>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein unerfahrener Reiter kann ungewollt schlechte Gewohnheiten unterrichten, die das Pferd dann dauerhaft beibehält.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Drei praktische Strategien für Anfänger mit Lipizzaner-Traum
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Aber es gibt Lösungen:
            </p>
            <div className="space-y-6 mt-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Strategie 1: Professioneller Trainer (Teuer, aber sicher)</h4>
                <p className="text-gray-700">
                  Der beste Weg ist, einen Trainer zu finden, der Erfahrung mit Lipizzanern und Anfängern hat. Diese Trainer unterrichten sowohl das Pferd als auch den Reiter. Die Kosten sind erheblich – 3.000-5.000 EUR für intensive Trainingswochen – aber die Ergebnisse sind solide.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Strategie 2: Mentor-Partnership (Moderate Kosten)</h4>
                <p className="text-gray-700">
                  Partnerschaften mit erfahrenen Lipizzaner-Reitern funktionieren gut. Du teilst dir das Pferd mit einem erfahrenen Reiter, der dir hilft und das Pferd regelmäßig arbeitet. Kostenersparnis und Mentorship in einem.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h4 className="font-bold text-lg text-gray-900 mb-2">Strategie 3: Bodenarbeit-Zuerst (Niedrigste Kosten)</h4>
                <p className="text-gray-700">
                  Manche Anfänger starten mit 6-12 Monaten Bodenarbeit, Freiheitsdressur und Liberty-Training. Sie bauen so eine echte Beziehung auf, verstehen die Pferdesprache und gewinnen Selbstvertrauen – bevor sie aufsitzen.
                </p>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Anfänger-Checkliste: Ist ein Lipizzaner das richtige Pferd für dich?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Stelle dir diese Fragen ehrlich:
            </p>
            <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
              <li>Habe ich Zugang zu einem Trainer, der Lipizzaner kennt?</li>
              <li>Kann ich 5.000-8.000 EUR pro Jahr aufbringen?</li>
              <li>Bin ich bereit, täglich mit diesem Pferd zu arbeiten, auch bei Rückschlägen?</li>
              <li>Kann ich akzeptieren, dass &quot;Abkürzungen&quot; beim Training nicht funktionieren?</li>
              <li>Habe ich 3-5 Jahre Geduld für den Aufbau einer echten Partnerschaft?</li>
            </ol>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Wenn du 4-5 &quot;Ja&quot; antwortest: Ein Lipizzaner ist möglich. Wenn du 2-3 antwortest: Du brauchst einen Mentor. Wenn du weniger als 2 antwortest: Warte noch ein paar Jahre.
            </p>
          </section>

          {/* Section: Kaufen */}
          <section id="kaufen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Lipizzaner kaufen – Was du beachten musst und wo du suchen solltest
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Für allgemeine Tipps zum Pferdekauf empfehlen wir unseren ausführlichen <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand hover:text-brand-dark underline">Ratgeber: Was kostet ein Pferd?</LocalizedLink>. Da Lipizzaner oft für klassische Dressur eingesetzt werden, ist auch unser <LocalizedLink href="/pferde-ratgeber/dressurpferd-kaufen" className="text-brand hover:text-brand-dark underline">Dressurpferd-Ratgeber</LocalizedLink> hilfreich.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Preisübersicht 2025: Was kostet ein Lipizzaner?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der realistische Preis hängt vom Alter und der Ausbildung ab:
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100">
                    <th className="p-4 font-bold border-b">Alter</th>
                    <th className="p-4 font-bold border-b">Preisspanne</th>
                    <th className="p-4 font-bold border-b">Beschreibung</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Fohlen (0-2 Jahre)</td>
                    <td className="p-4 font-semibold text-brand">3.000-8.000 EUR</td>
                    <td className="p-4 text-gray-600">Potenzial vorhanden, aber unbekannt</td>
                  </tr>
                  <tr className="border-b bg-stone-50">
                    <td className="p-4">Junge Pferde (3-7 Jahre)</td>
                    <td className="p-4 font-semibold text-brand">8.000-15.000 EUR</td>
                    <td className="p-4 text-gray-600">Erste Ausbildung abgeschlossen</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Fertig ausgebildete (8-15 Jahre)</td>
                    <td className="p-4 font-semibold text-brand">15.000-25.000+ EUR</td>
                    <td className="p-4 text-gray-600">Bewährtes Temperament und Fähigkeiten</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="p-4">Ältere (15+ Jahre)</td>
                    <td className="p-4 font-semibold text-brand">5.000-12.000 EUR</td>
                    <td className="p-4 text-gray-600">Weniger Reiterjahre, aber zuverlässig</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Prämien hinzurechnen:</strong> Seltene Farben (schwarzer Lipizzaner): +10-20%, Champion-Pedigree: +20-30%, Zuchtgenehmigung: +15-25%, pro Jahr ernsthafte Ausbildung: +1.000 EUR.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Wo man einen Lipizzaner kauft
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Direkter Kauf von Gestüten (BESTE OPTION):</strong> Gestüt Lipica (Slowenien) hat die größte Auswahl – über 300 Pferde. Preise sind wettbewerbsfähig, die Dokumentation ist exzellent. Gestüt Piber (Österreich) hat höchste Qualität, aber selten Tiere zum Verkauf.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Private Züchter:</strong> Es gibt hochwertige Privatbetriebe in ganz Europa. Vorteil: persönliche Verbindung, oft faire Preise. Nachteil: Qualität ist variabel, du musst gründlich recherchieren.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Online-Plattformen (ehorses.de, equidenarium.com):</strong> Große Auswahl, schnell. Nachteil: Käufer-Beware-Prinzip, oft Vermittlungs-Markups. Bei jedem Kauf solltest du einen rechtssicheren <LocalizedLink href="/pferde-ratgeber/pferdekaufvertrag" className="text-brand hover:text-brand-dark underline">Pferdekaufvertrag</LocalizedLink> abschließen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gesamtkostenrechner: Über den Kaufpreis hinaus
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kaufpreis ist nur der Anfang. Jährliche Kosten für einen Lipizzaner:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Unterbringung (Stall/Weide):</strong> 3.000-6.000 EUR</li>
              <li><strong>Fütterung:</strong> 1.500-2.500 EUR</li>
              <li><strong>Tierarzt:</strong> 800-1.500 EUR</li>
              <li><strong>Hufschmied:</strong> 400-600 EUR</li>
              <li><strong>Versicherung:</strong> 400-800 EUR</li>
              <li><strong>Training/Unterricht:</strong> 2.000-5.000+ EUR</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4 font-semibold">
              Gesamtbudget: 8.100-16.400+ EUR pro Jahr
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das sind 20-30 Jahre – rechne mit insgesamt 160.000-500.000 EUR über das Leben des Pferdes.
            </p>
          </section>

          {/* CTA Box 3 */}
          <RatgeberHighlightBox
            title="Realistisch planen mit PferdeWert"
            icon={euroIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Unsicher, ob der Preis fair ist? PferdeWerts KI-gestützte Analyse vergleicht das Pferd mit aktuellen Marktpreisen und liefert dir eine fundierte Einschätzung – objektiv und unabhängig, in nur 2 Minuten.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Jetzt Pferdewert berechnen
              <Sparkles className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Gestüte */}
          <section id="gestuete" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Gestüte und Züchter: Die wichtigsten Zuchtbetriebe weltweit
            </h2>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gestüt Piber (Österreich) – Der Hofflieferant
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <a href="https://www.piber.com" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark underline font-medium">Gestüt Piber</a> wurde 1920 gegründet und hat eine spezifische Aufgabe: Die <a href="https://www.srs.at" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark underline">Spanische Hofreitschule Wien</a> mit den besten Lipizzanern zu versorgen. Mit etwa 60 Pferden ist es klein und fein.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Zucht nach höchsten Standards ist charakteristisch. Piber verkauft selten an Privatpersonen – wenn überhaupt, dann nur ausgewählte Zuchtpferde. Das macht einen Piber-Lipizzaner zu einem Prestigeobjekt.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gestüt Lipica (Slowenien) – Das Original
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <a href="https://www.lipica.org" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark underline font-medium">Gestüt Lipica</a> ist die Mutter aller Lipizzaner-Zucht. 1580 gegründet, zählt es heute <strong>über 300 Pferde</strong> und ist damit die größte Einrichtung weltweit. Es befindet sich noch immer auf dem ursprünglichen Standort – dem Karst-Plateau, wo die Rasse ihre Robustheit entwickelt hat.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lipica hat ausgezeichnete Verkaufsbeziehungen zu internationalen Käufern. Die Wartelisten können lang sein, aber die Qualität ist garantiert. Preise sind fair, oft 10-15% unter Wiederverkäufern.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Andere bedeutende Gestüte
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand mt-1 flex-shrink-0" />
                <span><strong>Monterotondo (Italien):</strong> Gegründet 1900, etwa 80 Pferde, bekannt für athletischere Lipizzaner. Preise im mittleren Bereich (8.000-18.000 EUR).</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand mt-1 flex-shrink-0" />
                <span><strong>Ungarische/Tschechische Züchter:</strong> Wachsende Reputation, oft günstigere Preise (4.000-12.000 EUR), geografisch näher zu Deutschland.</span>
              </li>
            </ul>
          </section>

          {/* Section: Haltung */}
          <section id="haltung" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Haltung und Fütterung: Hardy und anspruchslos wie die Karst-Vorfahren
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Detaillierte Informationen zu laufenden Kosten findest du in unserem <LocalizedLink href="/pferde-ratgeber/freizeitpferd-kaufen" className="text-brand hover:text-brand-dark underline">Freizeitpferd-Ratgeber</LocalizedLink>.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Herkunft der Robustheit: Die Karst-Adaption
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Karst-Plateau ist kein üppiges Paradies – es ist felsig, trocken und spärlich. Die ursprünglichen Lipizzaner überlebten auf minimalem Futter. Diese genetische Anpassung ist bis heute erhalten.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das bedeutet konkret: Lipizzaner sind &quot;Easy Keeper&quot; – sie brauchen weniger Futter als viele andere Warmblut-Rassen. Dies führt zu niedrigeren Betriebskosten, was besonders für Privatbesitzer wertvoll ist.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Fütterung: Einfach, hochwertig und wirtschaftlich
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Basis:</strong> Hochwertiges Heu (Timothy-Heu, Luzerne-Mischungen, Kräuter-Heu). Ein 500-kg-Lipizzaner braucht 1,5-2% seines Körpergewichts täglich in Heu – etwa 8-10 kg. Kosten: 80-120 EUR monatlich.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Kraftfutter (je nach Aktivität):</strong>
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Ruhe/Freizeit:</strong> Minimal, oft nur hochwertiges Heu</li>
              <li><strong>Leichte Arbeit:</strong> 0,5-1 kg täglich: 15-30 EUR monatlich</li>
              <li><strong>Moderate Arbeit:</strong> 1,5-2,5 kg täglich: 45-75 EUR monatlich</li>
              <li><strong>Performance-Arbeit:</strong> 3-4 kg täglich: 90-120 EUR monatlich</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              <strong>Gesamt-Futter-Budget:</strong> 100-200 EUR monatlich – deutlich unter anderen Barockpferden (150-300 EUR).
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Haltungsoptionen und Bewegungsfreiheit
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lipizzaner brauchen Bewegung. Die traditionelle Piber-Methode – Sommerweiden in den Bergen – wählt Pferde aus, die gerne bewegen. Dies ist genetisch eingebaut.
            </p>
            <ul className="space-y-3 text-lg text-gray-700 mt-4">
              <li><strong>Ideal: Offenstall mit Zugang zu Weide</strong> – 24-Stunden-Zugang mit Unterstand. Pferde regulieren ihre Bewegung selbst.</li>
              <li><strong>Akzeptabel: Box mit Paddock-Zugang</strong> – Mind. 2-3 Stunden täglich Auslauf.</li>
              <li><strong>Zu vermeiden: Isolationshaltung (Box ohne Paddock)</strong> – Dies führt zu Verhaltensproblemen und Gesundheitsrisiken.</li>
            </ul>
          </section>

          {/* Fazit */}
          <section className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Fazit: Dein Weg zum Lipizzaner
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lipizzaner sind mehr als Pferde – sie sind Träger einer 450 Jahre alten Tradition. Ihre Fähigkeit, von dunkel zu weiß zu ergrauen, ihre bemerkenswerte Intelligenz und ihre tiefe emotionale Bindungsfähigkeit machen sie einzigartig.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Sind sie für dich geeignet? Das hängt von drei Dingen ab: <strong>Erfahrung</strong> (kann ein erfahrener Reiter oder mit professioneller Unterstützung anfangen), <strong>Budget</strong> (mindestens 8.000-16.000 EUR pro Jahr), und <strong>Geduld</strong> (diese Rasse braucht 3-5 Jahre zum echten Partnership).
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn du all das hast, erwartet dich eine der erfüllendsten Reiter-Erfahrungen: Ein intelligentes, sensibles Pferd, das 25-30 Jahre lang dein Begleiter sein wird. Ein Lipizzaner ist nicht nur eine Investition – es ist eine Lebenspartnerschaft.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Nächste Schritte:</strong> Nutze unser <LocalizedLink href="/pferde-preis-berechnen" className="text-brand hover:text-brand-dark underline font-semibold">PferdeWert Bewertungstool</LocalizedLink>, um zu überprüfen, ob diese edle Rasse zu deinen Zielen, deinem Budget und deiner Erfahrung passt. Oder kontaktiere direkt renommierte Gestüte wie Lipica oder Piber, um deine erste Recherche zu beginnen.
            </p>
          </section>

          {/* Sources */}
          <section className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 italic">
              Quellen: Lipizzaner International Federation, UNESCO 2022 (Immaterielles Kulturerbe), Gestüt Lipica (seit 1580), Gestüt Piber, Spanische Hofreitschule Wien.
            </p>
          </section>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen"
              sectionSubtitle="Die wichtigsten Fragen und Antworten rund um Lipizzaner"
            />
          </div>
        </section>

        {/* Related Articles */}
        <RatgeberRelatedArticles
          title="Weitere hilfreiche Ratgeber"
          articles={relatedArticles}
        />

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'Pferdebewertung mit PferdeWert'
          }}
          title="Bereit für eine professionelle Pferdebewertung?"
          description="Nutze unsere KI-gestützte Analyse in nur 2 Minuten und erhalte eine fundierte Einschätzung des Pferdewerts – objektiv, schnell und zuverlässig."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}
