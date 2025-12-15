import LocalizedLink from '@/components/LocalizedLink'
import Layout from '@/components/Layout';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import RatgeberHead from '@/components/ratgeber/RatgeberHead';
import FAQ from '@/components/FAQ';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';
import { Sparkles, Award, ShieldCheck, TrendingUp } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const ICONS = {
  sparkles: <Sparkles className="w-5 h-5" />,
  award: <Award className="w-5 h-5" />,
  shield: <ShieldCheck className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />
};

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Islandpferd kaufen: Tölt, Gangarten & FIZO-Tests [2025]',
    description: 'Islandpferd kaufen ✓ Tölt & 5 Gangarten verstehen ✓ FIZO-Bewertung richtig lesen ✓ Winterhaltung & Robustheit ✓ Züchter finden. Experten-Guide für Isländer.',
    keywords: 'islandpferd kaufen, isländer kaufen, tölt pferd, islandpferd gangarten, fizo test, islandpferd züchter',
    ogTitle: 'Islandpferd kaufen: Tölt, Gangarten & FIZO-Tests [2025]',
    ogDescription: 'Islandpferd kaufen ✓ Tölt & 5 Gangarten verstehen ✓ FIZO-Bewertung richtig lesen ✓ Winterhaltung & Robustheit ✓ Züchter finden. Experten-Guide für Isländer.',
    twitterTitle: 'Islandpferd kaufen: Tölt, Gangarten & FIZO-Tests [2025]',
    twitterDescription: 'Islandpferd kaufen ✓ Tölt & 5 Gangarten verstehen ✓ FIZO-Bewertung richtig lesen ✓ Winterhaltung & Robustheit ✓ Züchter finden.',
  },
  at: {
    title: 'Islandpferd kaufen in Österreich: Tölt & FIZO Guide',
    description: 'Islandpferd kaufen in Österreich ✓ Gangarten-Bewertung ✓ FIZO-Tests verstehen ✓ Österreichische Islandpferd-Züchter. Der komplette Kaufratgeber.',
    keywords: 'islandpferd kaufen österreich, isländer kaufen österreich, tölt pferd, fizo test österreich',
    ogTitle: 'Islandpferd kaufen in Österreich: Tölt & FIZO Guide',
    ogDescription: 'Islandpferd kaufen in Österreich ✓ Gangarten-Bewertung ✓ FIZO-Tests verstehen ✓ Österreichische Islandpferd-Züchter. Der komplette Kaufratgeber.',
    twitterTitle: 'Islandpferd kaufen in Österreich: Tölt & FIZO Guide',
    twitterDescription: 'Islandpferd kaufen in Österreich ✓ Gangarten-Bewertung ✓ FIZO-Tests verstehen ✓ Österreichische Islandpferd-Züchter.',
  },
  ch: {
    title: 'Islandpferd kaufen in der Schweiz: Gangarten & FIZO',
    description: 'Islandpferd kaufen in der Schweiz ✓ Tölt & Gangarten ✓ FIZO-Bewertung ✓ Schweizer Züchter & Importe. Experten-Guide für Isländer-Kauf.',
    keywords: 'islandpferd kaufen schweiz, isländer kaufen schweiz, tölt pferd schweiz, fizo schweiz',
    ogTitle: 'Islandpferd kaufen in der Schweiz: Gangarten & FIZO',
    ogDescription: 'Islandpferd kaufen in der Schweiz ✓ Tölt & Gangarten ✓ FIZO-Bewertung ✓ Schweizer Züchter & Importe. Experten-Guide für Isländer-Kauf.',
    twitterTitle: 'Islandpferd kaufen in der Schweiz: Gangarten & FIZO',
    twitterDescription: 'Islandpferd kaufen in der Schweiz ✓ Tölt & Gangarten ✓ FIZO-Bewertung ✓ Schweizer Züchter & Importe.',
  },
};

export default function IslandpferdKaufen() {

  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: ICONS.sparkles
  };

  const sections = [
    { id: 'toelt', title: 'Die magische Gangart: Tölt als Alleinstellungsmerkmal' },
    { id: 'fizo', title: 'FIZO-Tests: Die Qualitätsprüfung für Islandpferde' },
    { id: 'winterhaerte', title: 'Winterhärte: Die genetische Superkraft' },
    { id: 'gesundheit', title: 'Gesundheit und Langlebigkeit' },
    { id: 'kaufweg', title: 'Ihr Weg zum perfekten Islandpferd' },
    { id: 'kosten', title: 'Kosten und Investition' },
    { id: 'ausbildung', title: 'Ausbildung und Training' },
    { id: 'rechtliches', title: 'Rechtliche und ethische Aspekte' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Was macht Islandpferde so besonders?',
      answer: 'Islandpferde sind einzigartig durch ihre zusätzlichen Gangarten Tölt und Pass, ihre extreme Winterhärte, ihre genetische Reinheit seit über 1000 Jahren und ihre außergewöhnliche Robustheit. Der Tölt bietet ein nahezu erschütterungsfreies Reiten, während ihre isolierte Züchtung auf Island sie zu einer der gesündesten und ursprünglichsten Pferderassen weltweit macht.'
    },
    {
      question: 'Was kostet ein gutes Islandpferd?',
      answer: 'Die Preise für Islandpferde variieren stark: Junge, unausgebildete Pferde kosten zwischen 3.000 und 8.000 EUR. Gut ausgebildete Freizeitpferde mit solidem Tölt liegen bei 8.000 bis 15.000 EUR. Turnierpferde mit exzellenten Gangarten und FIZO-Bewertungen erreichen 15.000 bis 25.000 EUR. Spitzenpferde mit internationalen Erfolgen können auch über 25.000 EUR kosten.'
    },
    {
      question: 'Was bedeutet FIZO bei Islandpferden?',
      answer: 'FIZO ist das offizielle Bewertungssystem für Islandpferde vom Verband FEIF (Internationale Föderation der Islandpferdeverbände). Es bewertet Gangarten (Tölt, Pass, Trab, Galopp, Schritt), Bewegungsqualität, Gebäude, Temperament und Reitbarkeit. Die Bewertung erfolgt in Noten von 5,0 bis 10,0, wobei Pferde ab 8,0 als sehr gut gelten. FIZO-Tests sind entscheidend für die Qualitätsbewertung und Preisfindung.'
    },
    {
      question: 'Wie erkenne ich einen guten Tölt?',
      answer: 'Ein guter Tölt zeigt sich durch klaren Viertakt ohne Schwebephase, gleichmäßigen Rhythmus, hohe Aufrichtung mit aktivem Hinterbein, weiche und erschütterungsfreie Bewegung für den Reiter und natürliche Veranlagung ohne übermäßigen Reitereinsatz. Achte beim Probereiten darauf, dass der Tölt mühelos und entspannt wirkt. Ein verkrampfter oder ungleichmäßiger Tölt deutet auf mangelnde Qualität oder Training hin.'
    },
    {
      question: 'Sind Islandpferde für Anfänger geeignet?',
      answer: 'Ja, Islandpferde eignen sich hervorragend für Anfänger. Ihr ausgeglichenes Temperament, ihre Nervenstärke und ihre Menschenbezogenheit machen sie zu idealen Lehrpferden. Der bequeme Tölt ermöglicht entspanntes Reiten auch für Ungeübte. Ihre robuste Konstitution verzeiht Anfängerfehler besser als empfindlichere Rassen. Wichtig ist die Wahl eines gut ausgebildeten, charakterstarken Pferdes mit gutem Tölt.'
    },
    {
      question: 'Kann ich ein Islandpferd im Offenstall halten?',
      answer: 'Offenstallhaltung ist für Islandpferde ideal und entspricht ihrer natürlichen Lebensweise. Ihre extreme Winterhärte macht sie perfekt für ganzjährige Außenhaltung. Sie benötigen lediglich einen Witterungsschutz (Unterstand), ausreichend Bewegungsfläche und sozialen Kontakt zu Artgenossen. Das dichte, zweischichtige Fell schützt sie selbst bei extremen Minusgraden. Boxenhaltung ist möglich, aber nicht artgerecht für diese robusten Pferde.'
    },
    {
      question: 'Wo finde ich seriöse Islandpferd-Züchter?',
      answer: 'Seriöse Züchter findest du über den IPZV (Islandpferde-Reiter- und Züchterverband), regionale Islandpferde-Vereine, die offizielle Zuchtdatenbank WorldFengur oder Empfehlungen von Trainern und Reitern. Achte auf FEIF-Mitgliedschaft, transparente FIZO-Bewertungen, Möglichkeit zum Probereiten und offene Kommunikation über Abstammung und Gesundheit. Seriöse Züchter zeigen gerne ihre Anlage und andere Pferde.'
    },
    {
      question: 'Brauche ich spezielles Zubehör für Islandpferde?',
      answer: 'Ja, einige Anpassungen sind sinnvoll: Islandsättel sind speziell für die Gangarten konstruiert, kürzere Trensengrößen passen besser zum kompakten Kopf und breitere Sattelgurte verteilen den Druck besser. Spezielle Gangpferde-Beschläge können den Tölt unterstützen. Winterdecken sind meist unnötig durch das dichte Fell. Standard-Reitausrüstung funktioniert aber grundsätzlich auch, nur die Passform muss stimmen.'
    }
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('islandpferd-kaufen').map(entry => ({
    href: getRatgeberPath(entry.slug),
    image: entry.image,
    title: entry.title,
    badge: entry.category,
    readTime: entry.readTime,
    description: entry.description
  }));

  return (
    <Layout
      fullWidth={true}
      background="bg-gradient-to-b from-amber-50 to-white"
    >
      <RatgeberHead
        slug="islandpferd-kaufen"
        image="/images/ratgeber/islandpferd-weide-1.webp"
        locales={seoLocales}
        datePublished="2025-12-15"
        wordCount={1143}
        breadcrumbTitle="Islandpferd kaufen"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeIcon={ICONS.award}
          badgeLabel="Kompletter Ratgeber"
          title="Islandpferd kaufen: Mehr als nur ein Freizeitpferd"
          subtitle="Entdecke die faszinierende Welt der Islandpferde mit ihren einzigartigen Gangarten Tölt und Pass. Erfahre alles über FIZO-Tests, Winterhärte und worauf du beim Kauf achten musst."
          readTime="12 Min."
          publishDate="Dezember 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/islandpferd-weide-1.webp"
          alt="Islandpferd auf grüner Weide mit typischem dichten Fell"
          priority={true}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn Sie den Traum haben, ein <strong>Islandpferd zu kaufen</strong>, begeben Sie sich auf eine faszinierende Reise. Islandpferde sind keine gewöhnlichen Pferde – sie sind Naturwunder mit einzigartigen Eigenschaften, die sie von anderen Pferderassen fundamental unterscheiden. Der Kauf eines Islandpferdes bedeutet mehr, als sich nur ein Reitpferd anzuschaffen: Sie gewinnen einen treuen Begleiter mit einer jahrtausendealten Geschichte und außergewöhnlichen Fähigkeiten.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Diese kleinen, robusten Pferde haben eine bemerkenswerte Entstehungsgeschichte. Seit der Besiedlung Islands durch Wikinger vor über 1000 Jahren werden sie in nahezu unveränderter Form gezüchtet. Ihre Isolation auf der Insel und strenge Importverbote haben dazu geführt, dass Islandpferde eine der reinsten und ursprünglichsten Pferderassen der Welt geblieben sind.
            </p>
          </section>

          {/* Section: Tölt */}
          <section id="toelt" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Die magische Gangart: Tölt als Alleinstellungsmerkmal
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Tölt ist die herausragende Spezialität des Islandpferdes – eine Gangart, die weltweit einzigartig ist. Anders als bei anderen Pferden bietet der Tölt ein nahezu erschütterungsfreies Reitvergnügen:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Extrem weich und geschmeidig</li>
              <li>• Hoher Komfort für Reiter</li>
              <li>• Ermöglicht entspannte, lange Ausritte</li>
              <li>• Geringere Belastung für Gelenke und Rücken</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Professionelle Islandpferd-Züchter legen großen Wert auf die Qualität dieser Gangart. Bei der Auswahl Ihres Islandpferdes sollten Sie daher besonders auf die Tölt-Qualität achten.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die vier Gangarten des Islandpferdes
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Neben dem legendären Tölt beherrscht das Islandpferd vier klassische Gangarten:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Schritt: Ruhig und kontrolliert</li>
              <li>• Trab: Energisch und rhythmisch</li>
              <li>• Galopp: Dynamisch und schwungvoll</li>
              <li>• Tölt (der besondere Zusatz!): Weich und erschütterungsfrei</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Tölt-Training und Entwicklung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht jedes Islandpferd zeigt von Geburt an einen perfekten Tölt. Professionelle Züchter und Trainer investieren viel Zeit in die Entwicklung dieser einzigartigen Gangart:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Frühe Gewöhnung an verschiedene Bodenbeschaffenheiten</li>
              <li>• Gezielte Trainingseinheiten zur Tölt-Verfeinerung</li>
              <li>• Genetische Selektion für gute Tölt-Anlagen</li>
              <li>• Regelmäßige Überprüfung der Gangartqualität</li>
            </ul>
          </section>

          {/* Section: FIZO */}
          <section id="fizo" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              FIZO-Tests: Die Qualitätsprüfung für Islandpferde
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              FIZO-Tests sind entscheidend für die Bewertung von Islandpferden. Diese umfassenden Prüfungen bewerten:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Gangarten und Bewegungsqualität</li>
              <li>• Gesundheit und Konstitution</li>
              <li>• Temperament und Reitbarkeit</li>
              <li>• Abstammung und Zuchtlinien</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Islandpferd mit erfolgreichen FIZO-Tests garantiert Ihnen Qualität und Zuverlässigkeit.
            </p>
          </section>

          {/* CTA Box 1 */}
          <RatgeberHighlightBox
            title="Objektive Bewertung für Ihr Islandpferd"
            icon={ICONS.sparkles}
          >
            <p className="text-base text-gray-700 mb-4">
              Unsicher über den fairen Preis? PferdeWerts KI-gestützte Analyse bewertet Ihr Wunsch-Islandpferd objektiv anhand von FIZO-Kriterien und aktuellen Marktpreisen – in nur 2 Minuten.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Jetzt Islandpferd bewerten lassen
              <TrendingUp className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Winterhärte */}
          <section id="winterhaerte" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Winterhärte: Die genetische Superkraft
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Islandpferde sind buchstäblich für extreme Bedingungen gezüchtet worden. Ihre einzigartige Winterhärte unterscheidet sie von anderen Pferderassen:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Dichtes, zweischichtiges Fell</li>
              <li>• Hohe Widerstandsfähigkeit gegen Kälte</li>
              <li>• Minimaler Zusatzfutterbedarf im Winter</li>
              <li>• Ideal für raue Klimazonen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Haltungsbedingungen im Winter
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bei der Haltung von Islandpferden sollten Sie folgende Punkte beachten:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Offenstall-Haltung bevorzugen</li>
              <li>• Witterungsschutz gewährleisten</li>
              <li>• Ausreichend Bewegungsmöglichkeiten sicherstellen</li>
            </ul>
          </section>

          {/* Section: Gesundheit */}
          <section id="gesundheit" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Gesundheit und Langlebigkeit
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Islandpferde gelten als eine der gesündesten und langlebigsten Pferderassen. Ihre genetische Reinheit und jahrhundertelange isolierte Züchtung machen sie robust:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Geringes Krankheitsrisiko</li>
              <li>• Lange Lebenserwartung</li>
              <li>• Weniger anfällig für Erbkrankheiten</li>
              <li>• Hohe Leistungsfähigkeit bis ins Seniorenalter</li>
            </ul>
          </section>

          {/* Section: Kaufweg */}
          <section id="kaufweg" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Ihr Weg zum perfekten Islandpferd
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bevor Sie ein Islandpferd kaufen, empfehlen wir Ihnen:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Mehrere Pferde in Ruhe zu begutachten</li>
              <li>• Probereiten mit Fokus auf den Tölt</li>
              <li>• Gesundheitszeugnis und FIZO-Testergebnisse zu prüfen</li>
              <li>• Den Züchter nach Abstammung und Vorbesitzern zu befragen</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Weitere Informationen zum Pferdekauf und zur Preisermittlung finden Sie in unserem <LocalizedLink href="/pferde-ratgeber/pferd-kaufen" className="text-brand hover:text-brand-dark underline">umfassenden Pferdekauf-Ratgeber</LocalizedLink>.
            </p>
          </section>

          {/* Section: Kosten */}
          <section id="kosten" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kosten und Investition: Was Sie beim Islandpferdekauf beachten sollten
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kaufpreis für ein Islandpferd variiert erheblich je nach Abstammung, Ausbildungsstand und FIZO-Testergebnissen. Sie können mit folgenden Preisklassen rechnen:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Preisübersicht Islandpferde
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Junges, unausgebildetes Pferd: 3.000 - 8.000 €</li>
              <li>• Gut ausgebildetes Pferd: 8.000 - 15.000 €</li>
              <li>• Turnierpferd mit Tölt-Erfolgen: 15.000 - 25.000 €</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Wichtige Zusatzkosten:</strong>
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Unterhalt: ca. 4.500 - 6.000 € pro Jahr</li>
              <li>• Ausrüstung: 500 - 1.500 € einmalig</li>
              <li>• Veterinärkosten: 300 - 800 € jährlich</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kaufberatung für Einsteiger
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Für Islandpferd-Neulinge empfehlen wir:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Kaufen Sie nicht das erste Pferd, das Sie sehen</li>
              <li>• Lassen Sie einen erfahrenen Tierarzt das Pferd untersuchen</li>
              <li>• Achten Sie auf FIZO-Zertifizierungen</li>
              <li>• Machen Sie mindestens drei Proberitte</li>
              <li>• Informieren Sie sich über spezielle Islandpferde-Versicherungen</li>
            </ul>
          </section>

          {/* CTA Box 2 */}
          <RatgeberHighlightBox
            title="Faire Preisfindung mit KI-Unterstützung"
            icon={ICONS.award}
          >
            <p className="text-base text-gray-700 mb-4">
              Die Preisfindung bei Islandpferden ist komplex. FIZO-Bewertungen, Gangarten-Qualität und Ausbildungsstand beeinflussen den Wert erheblich. Unsere KI-Analyse hilft Ihnen, einen fairen Preis zu ermitteln.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Islandpferd-Preis berechnen
              <Sparkles className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Ausbildung */}
          <section id="ausbildung" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Ausbildung und Training: Die ersten Schritte
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nach dem Kauf Ihres Islandpferdes sind professionelles Training und kontinuierliche Bildung entscheidend:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Spezialisierte Islandpferde-Trainingswochen</li>
              <li>• Tölt-Workshops</li>
              <li>• Gangarten-Schulungen</li>
              <li>• Regelmäßige Gesundheitschecks</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Fazit: Eine Investition fürs Leben
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kauf eines Islandpferdes bedeutet mehr, als nur ein Haustier zu erwerben – Sie gewinnen einen treuen Begleiter mit einzigartigen Fähigkeiten. Lassen Sie sich von ihrer Robustheit, ihrem sanften Wesen und ihrer außergewöhnlichen Tölt-Gangart verzaubern.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Weitere Informationen zum Pferdekauf und zur Preisermittlung finden Sie in unserem <LocalizedLink href="/pferde-ratgeber/pferd-kaufen" className="text-brand hover:text-brand-dark underline">umfassenden Pferdekauf-Ratgeber</LocalizedLink>.
            </p>
          </section>

          {/* Section: Rechtliches */}
          <section id="rechtliches" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Rechtliche und ethische Aspekte beim Islandpferdekauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kauf eines Islandpferdes unterliegt einigen besonderen rechtlichen und ethischen Überlegungen:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Rechtliche Rahmenbedingungen
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Kaufvertrag mit detaillierten Angaben zur Abstammung</li>
              <li>• Gesundheitszeugnis und tierärztliches Gutachten</li>
              <li>• Offenlegungspflicht von Vorerkrankungen</li>
              <li>• Gewährleistungsrechte bei versteckten Mängeln</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Ethische Verantwortung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Islandpferde sind keine Objekte, sondern Lebewesen mit eigener Persönlichkeit:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Respektvolle Haltung</li>
              <li>• Artgerechte Unterbringung</li>
              <li>• Regelmäßige medizinische Versorgung</li>
              <li>• Mentale und physische Gesundheit fördern</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Import- und Exportbestimmungen
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Besonderheiten für Islandpferde:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Strenge Gesundheitschecks</li>
              <li>• Quarantänebestimmungen</li>
              <li>• Genetische Reinheit als Schutzmaßnahme</li>
              <li>• Internationale Zuchtverbände und Zertifizierungen</li>
            </ul>
            
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <LocalizedLink href="/pferde-preis-berechnen" className="inline-flex items-center justify-center w-full px-6 py-3 text-white font-semibold bg-brand-brown hover:bg-brand-brownDark rounded-lg transition-colors">
                Berechnen Sie jetzt den Preis für Ihr Islandpferd
              </LocalizedLink>
            </p>
          </section>

        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen"
              sectionSubtitle="Die wichtigsten Fragen zu Islandpferden, Tölt, FIZO-Tests und allem was Sie vor dem Kauf wissen sollten"
              withSchema={false}
            />
          </div>
        </section>

        {/* Author Box */}
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <AuthorBox />
        </div>

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
          title="Bereit für eine professionelle Islandpferd-Bewertung?"
          description="Nutze unsere KI-gestützte Analyse in nur 2 Minuten und erhalte eine fundierte Einschätzung des Pferdewerts basierend auf FIZO-Kriterien und aktuellen Marktpreisen."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </article>
    </Layout>
  );
}