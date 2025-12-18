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
    title: 'Islandpferd kaufen 2025: Tölt, FIZO & Preise von 3.000-25.000€',
    description: 'Islandpferd kaufen ➤ Tölt & Pass erklärt ✓ FIZO-Noten verstehen ✓ Preise 3.000-25.000€ ✓ Import aus Island ✓ IPZV-Züchter finden.',
    keywords: 'islandpferd kaufen, isländer kaufen, tölt pferd, fizo test, islandpferd preis, ipzv züchter, islandpferd aus island kaufen',
    ogTitle: 'Islandpferd kaufen 2025: Tölt, FIZO & Preise von 3.000-25.000€',
    ogDescription: 'Islandpferd kaufen ➤ Tölt & Pass erklärt ✓ FIZO-Noten verstehen ✓ Preise 3.000-25.000€ ✓ Import aus Island ✓ IPZV-Züchter finden.',
    twitterTitle: 'Islandpferd kaufen 2025: Tölt, FIZO & Preise',
    twitterDescription: 'Islandpferd kaufen ➤ Tölt & Pass ✓ FIZO-Noten ✓ Preise 3.000-25.000€ ✓ Import aus Island ✓ IPZV-Züchter',
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
    { id: 'vierfuenfgaenger', title: 'Viergänger vs. Fünfgänger: Pass als Zusatzgangart' },
    { id: 'fizo', title: 'FIZO-Bewertungssystem detailliert erklärt' },
    { id: 'winterhaerte', title: 'Winterhärte: Die genetische Superkraft' },
    { id: 'gesundheit', title: 'Gesundheit und Langlebigkeit' },
    { id: 'preisueberblick', title: 'Preisübersicht: Islandpferde nach Kategorie' },
    { id: 'kaufweg', title: 'Wo Islandpferde kaufen? IPZV und Marktplätze' },
    { id: 'import', title: 'Islandpferd aus Island kaufen: Import-Guide' },
    { id: 'anfaenger', title: 'Islandpferd für Anfänger?' },
    { id: 'tierschutz', title: 'Islandpferde in Not: Rettung und Adoption' },
    { id: 'regional', title: 'Regionale Märkte in Deutschland' },
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
    },
    {
      question: 'Viergänger oder Fünfgänger: Welches Islandpferd passt zu mir?',
      answer: 'Für Anfänger und Freizeitreiter ist ein guter Viergänger völlig ausreichend. Der Pass ist eine Zusatzgangart, die nur etwa 30-40% der Islandpferde haben. Fünfgänger sind wertvoll für Turnierspitzensportler, ältere Reiter oder jemanden, der das maximum Komfort-Niveau sucht. Preislich sind Fünfgänger 20-50% teurer. Entscheidend ist die Tölt-Qualität – ein ausgezeichneter Tölt bei einem Viergänger ist besser als ein mittelmäßiger Tölt bei einem Fünfgänger.'
    },
    {
      question: 'Kann ich ein Islandpferd direkt aus Island importieren?',
      answer: 'Ja, das ist möglich und kann 15-30% günstiger sein. Ein Import erfordert aber eine 4-wöchige Quarantäne und kostet ca. 3.000-5.200€ zusätzlich (Transport, Quarantäne, Veterinär, Papiere). Sie benötigen ein WorldFengur-Pedigree-Zertifikat und ein EU-Gesundheitszeugnis. Nachteile sind fehlende Möglichkeit zum Probereiten vor Kauf und mögliche Transportstressprobleme. Dies ist nur für erfahrene Käufer empfohlen.'
    },
    {
      question: 'Was bedeuten die FIZO-Noten 7, 8 oder 9?',
      answer: 'FIZO-Noten auf einer Skala von 5.0-10.0: 7.0-7.5 bedeutet "Gut" – das Pferd hat solide Basis für Freizeitreiterei. 8.0-8.5 bedeutet "Sehr gut" – Turniereinsatz möglich. 9.0+ bedeutet "Ausgezeichnet" – internationale Spitzenpferde mit großem Zuchtpotenzial. Für privaten Freizeitkauf empfehlen wir mindestens 6.5, besser 7.0+. Turnierpferde sollten mindestens 7.5 haben.'
    },
    {
      question: 'Wo finde ich seriöse Islandpferd-Händler in Deutschland?',
      answer: 'Die sicherste Quelle ist der IPZV (Islandpferde-Reiter- und Züchterverband) mit offiziellem Züchter- und Verkaufsverzeichnis. Alle IPZV-Mitglieder haben ethische Standards. Weitere Quellen: ehorses und Pferdemarkt mit Verkäufer-Bewertungen, regionale Islandpferd-Shows und -Vereine, die WorldFengur-Datenbank für internationale Züchter. NICHT empfohlen für teure Pferde: eBay Kleinanzeigen (Betrugsrisiko).'
    }
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('islandpferd').map(entry => ({
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
        slug="islandpferd"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/islandpferd-weide-1.webp"
        locales={seoLocales}
        datePublished="2025-12-15"
        wordCount={2650}
        breadcrumbTitle="Islandpferd kaufen"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeIcon={ICONS.award}
          badgeLabel="Kompletter Ratgeber"
          title="Islandpferd kaufen: Tölt, FIZO & Preise 3.000-25.000€"
          subtitle="Entdecke die faszinierende Welt der Islandpferde mit ihren einzigartigen Gangarten Tölt und Pass. Erfahre alles über FIZO-Bewertungen, Preisübersichten, Import aus Island und seriöse IPZV-Züchter."
          readTime="16 Min."
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

          {/* Section: Viergänger vs. Fünfgänger */}
          <section id="vierfuenfgaenger" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Viergänger vs. Fünfgänger: Pass als Zusatzgangart
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht alle Islandpferde haben die gleichen Gangarten. Der Pass ist eine besondere, angeborene Gangart, die nicht jedes Islandpferd beherrscht. Dies macht den Unterschied zwischen Vier- und Fünfgängern aus:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Was ist Pass?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Pass ist eine Seitengangart, bei der die Beine auf einer Seite des Pferdes zusammen vorwärts gehen – erst die beiden Beine links, dann die beiden Beine rechts. Dies erzeugt eine schaukelnd-seitwärts Bewegung des Pferderumpfs. Der Pass ist noch weicher und bequemer als der Tölt und wird oft von höchsten Tölt-Reitern bevorzugt.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Wertunterschied zwischen 4- und 5-Gänger
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Viergänger (Schritt, Trab, Galopp, Tölt): ca. 3.000-15.000€</li>
              <li>• Fünfgänger (+ Pass zusätzlich): ca. 5.000-25.000€</li>
              <li>• Preisaufschlag für Pass: 20-50% höher als Viergänger</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Wann braucht man Pass?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Pass ist nicht zwingend erforderlich, aber sehr wertvoll für:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Gangpferd-Turniere auf höchstem Niveau</li>
              <li>• Ältere oder gelenkempfindliche Reiter (noch weicher als Tölt)</li>
              <li>• Professionelle Züchter und Verkäufer von Spitzenpferden</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Prüfung der Passveranlagung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Passveranlagung ist angeboren und lässt sich nicht trainieren. Ein junges Pferd ohne Pass wird niemals Pass entwickeln. Bei einem Probereiten sollten Sie explizit fragen, ob das Pferd Pass hat, und ihn unbedingt ausprobieren, bevor Sie kaufen.
            </p>
          </section>

          {/* Section: FIZO */}
          <section id="fizo" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              FIZO-Bewertungssystem detailliert erklärt
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              FIZO (Functional Intangible Zoning Ordnung) ist das offizielle Bewertungssystem für Islandpferde vom internationalen Verband FEIF. Ähnlich wie bei der{' '}
              <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">
                Ankaufsuntersuchung (AKU)
              </LocalizedLink>{' '}
              bei anderen Pferderassen, gibt FIZO-Tests Aufschluss über Qualität und Gesundheit. FIZO bewertet:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Gangarten und Bewegungsqualität</li>
              <li>• Gebäude und Körperbau</li>
              <li>• Temperament und Reitbarkeit</li>
              <li>• Gesundheit und Konstitution</li>
              <li>• Abstammung und Zuchtwert (BLUP)</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Bewertungsskala und Notenvergabe
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              FIZO-Bewertungen nutzen eine Skala von 5.0 bis 10.0 Punkten:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• 5.0-6.0: Befriedigend (für Freizeitreiterei ausreichend)</li>
              <li>• 6.5-7.5: Gut (solide Grundlagen vorhanden)</li>
              <li>• 8.0-8.5: Sehr gut (für Turniere geeignet)</li>
              <li>• 9.0+: Ausgezeichnet (Spitzenpferde mit Zuchtpotenzial)</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              BLUP: Zuchtwert-Schätzung verstehen
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              BLUP-Werte zeigen den genetischen Potenzial für die Zucht. Ein hoher BLUP-Wert bedeutet, dass die Nachkommen dieses Pferdes wahrscheinlich auch gute Gangarten und Gebäude haben werden. Für Züchter ist der BLUP-Wert oft noch wichtiger als die aktuelle FIZO-Bewertung.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              So liest man ein FIZO-Protokoll
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein FIZO-Protokoll enthält detaillierte Informationen. Achten Sie auf:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Gesamtnote für jede Gangart einzeln</li>
              <li>• Gebäudenote (wichtig für Langlebigkeit)</li>
              <li>• Temperament und Reitbarkeit</li>
              <li>• BLUP-Wert (Zuchtwertschätzung)</li>
              <li>• Notizen des Prüfers zu speziellen Stärken/Schwächen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Mindestnoten für verschiedene Nutzungen
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Freizeitreiterei: 6.0+</li>
              <li>• Reitbeteiligung: 6.5+</li>
              <li>• Tölt-Turniere: 7.5+</li>
              <li>• Spitzensport / Zucht: 8.5+</li>
            </ul>
          </section>


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
              Bei der Haltung von Islandpferden sollten Sie folgende Punkte beachten – ähnliche Anforderungen gelten übrigens auch für{' '}
              <LocalizedLink href="/pferd-kaufen/haflinger" className="text-brand hover:text-brand-dark underline">
                Haflinger
              </LocalizedLink>, eine ebenso robuste Rasse:
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
              Islandpferde gelten als eine der gesündesten und langlebigsten Pferderassen – ein Grund, warum sie besonders als{' '}
              <LocalizedLink href="/pferd-kaufen/freizeitpferd" className="text-brand hover:text-brand-dark underline">
                Freizeitpferde
              </LocalizedLink>{' '}
              beliebt sind. Ihre genetische Reinheit und jahrhundertelange isolierte Züchtung machen sie robust:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Geringes Krankheitsrisiko</li>
              <li>• Lange Lebenserwartung</li>
              <li>• Weniger anfällig für Erbkrankheiten</li>
              <li>• Hohe Leistungsfähigkeit bis ins Seniorenalter</li>
            </ul>
          </section>

          {/* Section: Preisübersicht */}
          <section id="preisueberblick" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Preisübersicht: Islandpferde nach Kategorie
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Preise für Islandpferde hängen stark von Ausbildung, Gebäude, FIZO-Bewertung und Alter ab. Hier ist ein Überblick der gängigen Preisklassen:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Detaillierte Preiskategorien
            </h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-brand-light">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left font-semibold">Kategorie</th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">Alter / Ausbildung</th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">Preisrange</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Fohlen (Viergänger)</td>
                    <td className="border border-gray-300 p-3">1-2 Jahre, unangeritten</td>
                    <td className="border border-gray-300 p-3">2.500-4.500€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Fohlen (Fünfgänger)</td>
                    <td className="border border-gray-300 p-3">1-2 Jahre, mit Pass</td>
                    <td className="border border-gray-300 p-3">4.000-7.000€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Rohling Viergänger</td>
                    <td className="border border-gray-300 p-3">3-4 Jahre, unangeritten</td>
                    <td className="border border-gray-300 p-3">3.000-6.000€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Rohling Fünfgänger</td>
                    <td className="border border-gray-300 p-3">3-4 Jahre, mit Pass</td>
                    <td className="border border-gray-300 p-3">5.000-10.000€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Freizeitpferd (solides Tölt)</td>
                    <td className="border border-gray-300 p-3">4-8 Jahre, geritten</td>
                    <td className="border border-gray-300 p-3">8.000-15.000€</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Turnierpferd (FIZO 7.5+)</td>
                    <td className="border border-gray-300 p-3">5-12 Jahre, erfahren</td>
                    <td className="border border-gray-300 p-3">12.000-20.000€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Spitzenpferd (FIZO 8.5+)</td>
                    <td className="border border-gray-300 p-3">5+ Jahre, internationale Erfolge</td>
                    <td className="border border-gray-300 p-3">20.000-35.000€+</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Import aus Island</td>
                    <td className="border border-gray-300 p-3">Transport + Quarantäne</td>
                    <td className="border border-gray-300 p-3">+2.500-5.000€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Faktoren, die den Preis beeinflussen
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• FIZO-Bewertung und BLUP-Wert (höher = teurer)</li>
              <li>• Gangartqualität, besonders Tölt-Qualität</li>
              <li>• Ausbildungsstand (Rohling vs. fertig gerittenes Pferd)</li>
              <li>• Gebäude und Konstitution</li>
              <li>• Abstammung (bekannte Zuchtlinien teurer)</li>
              <li>• Alter (Fohlen günstiger, reife Turnierpferde teurer)</li>
              <li>• Pass vorhanden (20-50% Preisaufschlag)</li>
            </ul>

            {/* CTA Box */}
            <RatgeberHighlightBox
              title="Faire Preisfindung mit KI-Unterstützung"
              icon={ICONS.award}
            >
              <p className="text-base text-gray-700 mb-4">
                Die Preisfindung bei Islandpferden ist komplex. FIZO-Bewertungen, Gangarten-Qualität und Ausbildungsstand beeinflussen den Wert erheblich. Unsere KI-Analyse hilft Ihnen, einen fairen Preis zu ermitteln – in nur 2 Minuten.
              </p>
              <LocalizedLink
                href="/pferde-preis-berechnen"
                className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
              >
                Islandpferd-Preis berechnen
                <Sparkles className="w-4 h-4 ml-2" />
              </LocalizedLink>
            </RatgeberHighlightBox>
          </section>

          {/* Section: Wo kaufen */}
          <section id="kaufweg" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Wo Islandpferde kaufen? IPZV und Marktplätze
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt mehrere sichere und seriöse Kanäle zum Kauf von Islandpferden. Achten Sie beim Kauf auf Transparenz und Zertifizierungen:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              IPZV (Islandpferde-Reiter- und Züchterverband)
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der IPZV ist der größte deutsche Verband für Islandpferde-Enthusiasten. Die IPZV-Webseite hat ein Züchter- und Pferdeverkaufsverzeichnis. Alle IPZV-Züchter haben sich zur Einhaltung ethischer Richtlinien verpflichtet. Dies ist die sicherste Quelle für seriöse Züchter.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              WorldFengur Datenbank
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die isländische Zuchtdatenbank WorldFengur registriert alle reinrassigen Islandpferde der Welt. Sie können nach Pferden, FIZO-Ergebnissen und BLUP-Werten suchen. Dies ist besonders wertvoll, wenn Sie ein Pferd direkt aus Island kaufen möchten.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Online-Marktplätze: ehorses und Pferdemarkt
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Plattformen wie ehorses und Pferdemarkt haben Islandpferd-Inserate. Wichtig: Überprüfen Sie die Verkäufer-Bewertungen, fordern Sie FIZO-Zertifikate an und vereinbaren Sie IMMER einen Probereittag vor Kaufvertragsabschluss.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              eBay Kleinanzeigen: WARNUNG
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              eBay Kleinanzeigen ist für günstige, private Angebote geeignet, aber für teurere Islandpferde (über 10.000€) NICHT zu empfehlen. Das Betrugrisiko ist höher, und es gibt keinen Käuferschutz. Nutzen Sie für höherwertige Pferde spezialisierte Marktplätze.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Direkt aus Island kaufen: Vor- und Nachteile
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Islandpferde direkt vom Züchter in Island zu kaufen kann günstiger sein (+20-30% Ersparnis gegenüber Deutschland). Nachteile:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Höhere Transport- und Quarantänekosten (2.500-5.000€)</li>
              <li>• Sprachbarrieren bei Verhandlungen</li>
              <li>• Kein Probereiten vor dem Kauf (Online-Videos)</li>
              <li>• Risiko beim Import (Gesundheitsprobleme)</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Seriöse Gestüte in Deutschland
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Etablierte deutsche Gestüte haben oft mehrere Pferde zum Verkauf, geben Gewährleistungen und ermöglichen lange Probereitphasen. Bekannte Gestüte finden Sie im IPZV-Verzeichnis mit Kundenbewertungen.
            </p>
          </section>

          {/* Section: Import aus Island */}
          <section id="import" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Islandpferd aus Island kaufen: Import-Guide
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Pferd direkt aus Island zu importieren ist durchaus möglich, erfordert aber Planung und Beachtung verschiedener Aspekte:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Vorteile des Direktimports
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• 15-30% günstiger als deutsche Preise</li>
              <li>• Direkter Kontakt mit Züchtern</li>
              <li>• Größere Auswahl (ganze Island statt nur Deutschland)</li>
              <li>• Authentische isländische Blutlinien</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Quarantäne und Import-Kosten
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Islandpferde müssen bei der Einfuhr in die EU eine 4-wöchige Quarantäne durchlaufen. Kosten:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Transport Island-Deutschland: 1.500-2.500€</li>
              <li>• Quarantäne-Stall (28 Tage): 800-1.500€</li>
              <li>• Tierärztliche Untersuchungen: 500-800€</li>
              <li>• Zollabfertigung und Papiere: 200-400€</li>
              <li>• Gesamtkosten für Import: ca. 3.000-5.200€</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Transportlogistik
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Spezialisierte Pferdetransport-Unternehmen bieten Island-Deutschland-Routen an. Der Transport dauert typischerweise 3-5 Tage und erfolgt in modernen Pferdetransportern mit Futter und Wasser an Bord.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Eingewöhnungszeit
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nach der Quarantäne benötigen Islandpferde 2-4 Wochen Eingewöhnung im neuen Stall. Die Futterumstellung sollte schrittweise erfolgen. Viele Pferde zeigen in den ersten 2-3 Wochen Verhaltensänderungen (Nervosität, Appetitlust). Dies normalisiert sich meist schnell.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Rechtliche Aspekte beim Import
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Pedigree-Zertifikat aus Island (WorldFengur)</li>
              <li>• EU-Gesundheitszeugnis vom isländischen Tierarzt</li>
              <li>• Mikrochip-Registrierung</li>
              <li>• Schriftlicher Kaufvertrag auch in Isländisch/Englisch</li>
            </ul>
          </section>

          {/* Section: Anfänger */}
          <section id="anfaenger" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Islandpferd für Anfänger?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die kurze Antwort: JA, Islandpferde sind hervorragend für Anfänger geeignet – wenn das richtige Pferd gewählt wird.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Warum sind Islandpferde für Anfänger ideal?
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Ausgeglichenes, ruhiges Temperament</li>
              <li>• Hohe Nervenstärke und Stressresistenz</li>
              <li>• Menschenfreundlich und anhänglich</li>
              <li>• Großer, stabiler Sitz beim Tölt (sicherer für Anfänger)</li>
              <li>• Verzeihen Anfängerfehler besser als nervöse Rassen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Empfohlener Ausbildungsstand des Pferdes
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Für Anfänger ist es wichtig, kein junges, unangerittenes Rohling-Fohlen zu kaufen. Besser geeignet sind:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• 4-8 Jahre alte Freizeitpferde mit 3+ Jahren Reiterfahrung</li>
              <li>• FIZO-Bewertung mindestens 6.5-7.0 (solide Basis)</li>
              <li>• Ruhiges Temperament (nicht nervös oder heißblütig)</li>
              <li>• Vordressur-Erfahrung empfohlen</li>
              <li>• Keine Anfängerpferde: unreife, zu junge oder zu temperamentvolle Pferde</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Tölt-Unterricht ist wichtig
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Auch wenn Islandpferde für Anfänger geeignet sind, sollten Sie als Anfänger speziellen Tölt-Unterricht nehmen. Die Gangart ist ungewöhnlich für deutsche Reiter und erfordert etwas Eingewöhnung. Ein Tölt-Trainer kann Ihnen helfen, die Balance und Hilfengebung zu erlernen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Alternative: Reitbeteiligung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn Sie unsicher sind, ob ein Islandpferd zu Ihnen passt, kann eine Reitbeteiligung sinnvoll sein. Sie probieren das Pferd über 3-6 Monate aus und entscheiden dann, ob Sie es kaufen möchten.
            </p>
          </section>

          {/* Section: Tierschutz */}
          <section id="tierschutz" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Islandpferde in Not: Rettung und Adoption
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt eine wachsende Tierschutz-Bewegung rund um Islandpferde. Mehrere Rettungsorganisationen vermitteln Pferde, die vernachlässigt oder in schwieriger Situation sind.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Islandpferdehilfe e.V.
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Islandpferdehilfe ist ein gemeinnütziger Verein, der vernachlässigte Islandpferde rettet, rehabilitiert und vermittelt. Die Organisation arbeitet eng mit Tierarztkliniken zusammen und versorgt traumatisierte Pferde mit Rehabilitation.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Vor- und Nachteile von Tierschutz-Isländern
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteile:</strong>
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Sehr günstig (1.000-4.000€ Schutzgebühr)</li>
              <li>• Oft ältere, erfahrenere Pferde</li>
              <li>• Tierschutz unterstützen</li>
              <li>• Umfangreiche Unterstützung durch Verein</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              <strong>Nachteile:</strong>
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Oft unbekannte Vorgeschichte / Trauma</li>
              <li>• Mögliche Verhaltensprobleme</li>
              <li>• Zeitaufwand für Rehabilitation</li>
              <li>• Höhere Tierarztkosten (langfristige Probleme)</li>
            </ul>
          </section>

          {/* Section: Regional */}
          <section id="regional" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Regionale Märkte in Deutschland
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Islandpferde sind nicht überall gleich verbreitet. Einige Bundesländer haben etablierte Islandpferd-Communities mit regelmäßigen Turnieren und Shows:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Bayern: Isländer-Hochburg
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bayern ist das Zentrum der deutschen Islandpferd-Szene mit den meisten Züchtern, Trainern und Shows. Hier finden Sie die größte Auswahl und auch die aktivsten Vereine (z.B. Bayerischer Islandpferde-Verein). Nachteil: Preise oft höher als anderswo.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Schleswig-Holstein: Tradition trifft Moderne
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Schleswig-Holstein hat eine lange Islandpferd-Tradition und ist bekannt für hochwertige Zuchtpferde. Die Weideflächen sind oft besser geeignet für Offenstall-Haltung als in anderen Regionen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              NRW und Baden-Württemberg
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              In diesen Bundesländern gibt es kleinere aber spezialisierte Zuchtbetriebe. Oft gibt es regionale Islandpferd-Reitgruppen und Turniere, aber eine geringere Anzahl von Verkaufsangeboten als in Bayern.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Regionale Vereine und Shows
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fast jede Region mit Islandpferde-Aktivität hat einen lokalen oder regionalen Verein mit regelmäßigen Treffen, Trainings und Shows. Diese Shows sind ideal, um Züchter kennenzulernen und mehrere Pferde zu vergleichen.
            </p>
          </section>


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
              Weitere Informationen zum Pferdekauf und zur Preisermittlung finden Sie in unserem <LocalizedLink href="/pferd-kaufen" className="text-brand hover:text-brand-dark underline">umfassenden Pferdekauf-Ratgeber</LocalizedLink>.
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
            <p className="text-lg text-gray-700 leading-relaxed">
              Einen rechtssicheren{' '}
              <LocalizedLink href="/pferd-kaufen/kaufvertrag" className="text-brand hover:text-brand-dark underline">
                Pferdekaufvertrag
              </LocalizedLink>{' '}
              sollten Sie unbedingt abschließen. Wichtige Punkte:
            </p>
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