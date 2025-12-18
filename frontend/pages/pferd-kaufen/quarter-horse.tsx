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
import AuthorBox from '@/components/AuthorBox';
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry';
import { Sparkles, Award, ShieldAlert, TrendingUp } from 'lucide-react';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const awardIcon = <Award className="w-5 h-5" />;
const shieldIcon = <ShieldAlert className="w-5 h-5" />;
const trendingIcon = <TrendingUp className="w-5 h-5" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Quarter Horse kaufen: Western Bloodlines & AQHA Papiere 2025',
    description: 'Quarter Horse kaufen in Deutschland: Foundation vs Performance Bloodlines, AQHA-Papiere, Western-Ausbildung & Züchter. Preise 3.500-25.000€',
    keywords: 'quarter horse kaufen, aqha papiere, western pferd, cutting horse kaufen, reining horse, quarter horse züchter deutschland',
    ogTitle: 'Quarter Horse kaufen: Western Bloodlines & AQHA Papiere 2025',
    ogDescription: 'Quarter Horse kaufen in Deutschland: Foundation vs Performance Bloodlines, AQHA-Papiere, Western-Ausbildung & Züchter. Preise 3.500-25.000€',
    twitterTitle: 'Quarter Horse kaufen: Western Bloodlines & AQHA Papiere 2025',
    twitterDescription: 'Quarter Horse kaufen in Deutschland: Foundation vs Performance Bloodlines, AQHA-Papiere, Western-Ausbildung & Züchter.',
  },
  at: {
    title: 'Quarter Horse kaufen Österreich: Western & AQHA 2025',
    description: 'Quarter Horse kaufen in Österreich: Bloodlines, AQHA-Registrierung, Western-Disziplinen & Züchter. Foundation & Performance Lines ab 4.000€',
    keywords: 'quarter horse kaufen österreich, aqha österreich, western pferd, quarter horse züchter',
    ogTitle: 'Quarter Horse kaufen Österreich: Western & AQHA 2025',
    ogDescription: 'Quarter Horse kaufen in Österreich: Bloodlines, AQHA-Registrierung, Western-Disziplinen & Züchter. Foundation & Performance Lines ab 4.000€',
    twitterTitle: 'Quarter Horse kaufen Österreich: Western & AQHA 2025',
    twitterDescription: 'Quarter Horse kaufen in Österreich: Bloodlines, AQHA-Registrierung, Western-Disziplinen & Züchter.',
  },
  ch: {
    title: 'Quarter Horse kaufen Schweiz: AQHA & Western 2025',
    description: 'Quarter Horse kaufen Schweiz: US-Bloodlines, AQHA-Papiere, Western-Ausbildung & Schweizer Züchter. Premium Quarter Horses ab 6.000 CHF',
    keywords: 'quarter horse kaufen schweiz, aqha schweiz, western pferd schweiz, quarter horse züchter',
    ogTitle: 'Quarter Horse kaufen Schweiz: AQHA & Western 2025',
    ogDescription: 'Quarter Horse kaufen Schweiz: US-Bloodlines, AQHA-Papiere, Western-Ausbildung & Schweizer Züchter. Premium Quarter Horses ab 6.000 CHF',
    twitterTitle: 'Quarter Horse kaufen Schweiz: AQHA & Western 2025',
    twitterDescription: 'Quarter Horse kaufen Schweiz: US-Bloodlines, AQHA-Papiere, Western-Ausbildung & Schweizer Züchter.',
  },
};

export default function QuarterHorseKaufen() {
  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: sparklesIcon
  };

  const sections = [
    { id: 'bloodlines', title: 'Quarter Horse Bloodlines und ihre Preisunterschiede' },
    { id: 'disziplinen', title: 'Western-Disziplinen und Ausbildungsstand' },
    { id: 'zuechter', title: 'Quarter Horse Züchter in Deutschland finden' },
    { id: 'conformation', title: 'Quarter Horse Conformation – worauf beim Kauf achten' },
    { id: 'preisueberblick', title: 'Preisübersicht: Quarter Horses nach Kategorie' },
    { id: 'aqha-papiere', title: 'AQHA-Papiere und Registrierung erklärt' },
    { id: 'marktplaetze', title: 'Wo Quarter Horses kaufen? Marktplätze & Verkäufer' },
    { id: 'genetische-erkrankungen', title: 'Genetische Erkrankungen: Gentests vor dem Kauf' },
    { id: 'quarter-horse-not', title: 'Quarter Horse in Not: Rettungs- und Adoptionsmöglichkeiten' },
    { id: 'aku-special', title: 'AKU-Besonderheiten beim Quarter Horse' },
    { id: 'preisberechnung', title: 'Preisberechnung leicht gemacht' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Was kostet ein Quarter Horse in Deutschland?',
      answer: 'Die Preise für Quarter Horses variieren stark je nach Ausbildungsstand und Bloodline. Foundation Quarter Horses kosten zwischen 5.000 und 15.000 Euro, während Performance Quarter Horses mit AQHA-Papieren und Turniererfolgen zwischen 10.000 und 50.000 Euro liegen. Ein untrainiertes Jungpferd beginnt bei etwa 5.000 Euro, trainierte Freizeitpferde liegen bei 15.000-30.000 Euro und Top-Turnierpferde können bis zu 100.000 Euro kosten.'
    },
    {
      question: 'Welche Bloodline ist die beste für Quarter Horses?',
      answer: 'Die "beste" Bloodline hängt von deinen Zielen ab. Foundation Quarter Horses sind ideal für Rancharbeit und traditionelles Western Riding mit kompakter Statur und ruhigem Temperament. Performance Bloodlines wie Doc Bar (Cutting), Smart Little Lena (Reining) oder Zippo Pine Bar (Western Pleasure) sind für spezifische Disziplinen optimiert. Wichtiger als die Bloodline ist die individuelle Qualität und das Training des Pferdes.'
    },
    {
      question: 'Sind AQHA-Papiere beim Quarter Horse Kauf wichtig?',
      answer: 'AQHA-Papiere (American Quarter Horse Association) sind absolut wichtig für Wertstabilität, Zuchtmöglichkeiten und Turnierteilnahme. Pferde mit AQHA-Registrierung haben einen nachweisbaren Stammbaum, sind international anerkannt und behalten ihren Wert besser. Für offizielle Western-Turniere sind AQHA-Papiere oft Voraussetzung. Der Preisunterschied zwischen Pferden mit und ohne Papiere kann 30-50% betragen.'
    },
    {
      question: 'Welche Western-Disziplin ist für Einsteiger geeignet?',
      answer: 'Western Pleasure ist die beste Disziplin für Einsteiger. Sie betont ruhige, gleichmäßige Gangarten und erfordert weniger technische Präzision als Reining oder Cutting. Trail Riding ist ebenfalls anfängerfreundlich und verbessert die Partnerschaft zwischen Pferd und Reiter. Reining und Cutting sind hochanspruchsvoll und nur für sehr erfahrene Reiter geeignet. Ein gut ausgebildetes Western Pleasure Pferd kostet zwischen 10.000 und 25.000 Euro.'
    },
    {
      question: 'Wo finde ich seriöse Quarter Horse Züchter in Deutschland?',
      answer: 'Seriöse Quarter Horse Züchter findest du über die DQHA (Deutsche Quarter Horse Association) und EQHA (European Quarter Horse Association). Bayern, Baden-Württemberg und Nordrhein-Westfalen haben die meisten etablierten Züchter. Achte auf AQHA-Registrierung, transparente Trainingshistorie, Gesundheitszeugnisse und die Möglichkeit zum Probereiten. Besuche immer persönlich den Züchterbetrieb und prüfe die Haltungsbedingungen.'
    },
    {
      question: 'Was ist Cow Sense beim Quarter Horse?',
      answer: 'Cow Sense ist die genetisch verankerte Fähigkeit des Quarter Horses, instinktiv mit Rindern zu arbeiten. Diese natürliche Begabung zeigt sich durch schnelle Reaktionen, tiefe Kopfhaltung bei der Arbeit, vorausschauendes Denken und die Fähigkeit, Rinderbewegungen zu antizipieren. Pferde mit ausgeprägtem Cow Sense sind besonders wertvoll für Cutting und Working Cow Horse Disziplinen und können 20-30% teurer sein als vergleichbare Pferde ohne diese Veranlagung.'
    },
    {
      question: 'Eignet sich ein Quarter Horse als Freizeitpferd?',
      answer: 'Quarter Horses sind hervorragende Freizeitpferde! Ihr ruhiges, ausgeglichenes Temperament, die hohe Intelligenz und Lernbereitschaft sowie ihre Vielseitigkeit machen sie ideal für Freizeitreiter. Sie eignen sich für Trail Riding, leichte Western-Disziplinen, Wanderritte und sogar Bodenarbeit. Foundation Bloodlines sind besonders für Freizeitreiter geeignet, da sie oft ruhiger und umgänglicher sind als hochgezüchtete Performance-Linien.'
    },
    {
      question: 'Wie erkenne ich ein gutes Quarter Horse?',
      answer: 'Ein gutes Quarter Horse erkennst du an korrekten Proportionen (breite Brust, muskulöse Hinterhand, kurzer Rücken), gesunden Gelenken ohne Schwellungen oder Asymmetrien, aufmerksamem aber ruhigem Verhalten, gleichmäßigen und taktsicheren Bewegungen sowie einem kompakten, athletischen Körperbau. Die Widerristhöhe liegt typischerweise zwischen 142 und 160 cm. Wichtig sind auch AQHA-Papiere und eine nachvollziehbare Trainingshistorie.'
    },
    {
      question: 'Was sind die häufigsten genetischen Erkrankungen beim Quarter Horse?',
      answer: 'Die drei wichtigsten genetischen Erkrankungen sind HYPP (Hyperkalemic Periodic Paralysis), HERDA (Hereditary Equine Regional Dermal Asthenia) und GBED (Glycogen Branching Enzyme Deficiency). Alle sind autosomal rezessiv und können durch Gentests nachgewiesen werden. Ein responsabler Züchter testet seine Zuchtpferde und informiert potenzielle Käufer über die Ergebnisse. Der Gentest kostet etwa 50-100 Euro und sollte vor dem Kauf durchgeführt werden.'
    },
    {
      question: 'Wo kann ich Quarter Horses in Deutschland kaufen?',
      answer: 'Quarter Horses findest du über mehrere Kanäle: DQHA-Züchterlisten und deren Verkaufsportal, private Züchter über persönliche Kontakte, Marktplätze wie ehorses und Ebay-Kleinanzeigen, spezialisierte Quarter Horse Verkäufer und in seltenen Fällen über Import aus den USA. Für den Privatverkauf solltest du auch auf regionalen Pferdemärkten und Western-Events suchen. Nutze zudem professionelle Verkäufer mit Reputation und nachprüfbarem Track Record.'
    },
    {
      question: 'Lohnt sich der Kauf eines Quarter Horses in Not?',
      answer: 'Quarter Horses in Not sind oft günstiger (1.000-5.000 Euro), benötigen aber möglicherweise Rehabilitation, Retraining oder tierärztliche Behandlung. Dies kann die Gesamtkosten schnell erhöhen. Rettungspferde sind eine großartige Option für erfahrene Reiter mit Zeit, Geduld und Budget für eventuell nötige Therapien. Wichtig: Lass vor dem Kauf immer eine gründliche AKU durchführen und klär die Vorgeschichte des Pferdes. Viele Rettungsorganisationen bieten gute Beratung und transparente Informationen.'
    }
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('quarter-horse').map(entry => ({
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
        slug="quarter-horse"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/quarter-horse-weide.webp"
        locales={seoLocales}
        datePublished="2025-12-14"
        wordCount={2650}
        breadcrumbTitle="Quarter Horse kaufen"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Western & Zucht"
          badgeIcon={awardIcon}
          title="Quarter Horse kaufen: Westernreiten und amerikanische Zuchtlinien"
          subtitle="Der Quarter Horse ist mehr als nur ein Pferd – er ist eine Legende der Westernreiterei. Erfahre alles über Bloodlines, AQHA-Papiere, Western-Disziplinen und worauf du beim Kauf achten musst."
          readTime="15 Min."
          publishDate="Dezember 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/quarter-horse-weide.webp"
          alt="Quarter Horse auf der Weide"
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
              Der <strong>Quarter Horse</strong> ist mehr als nur ein Pferd – er ist eine Legende der Westernreiterei. Mit seiner beeindruckenden Geschichte, die bis in die Pionierzeiten der USA zurückreicht, verkörpert diese Rasse Kraft, Intelligenz und unvergleichliche Wendigkeit. Wenn du einen <strong>Quarter Horse kaufen</strong> möchtest, erwartet dich eine Welt voller Tradition, Sportlichkeit und einzigartiger Charaktereigenschaften.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Bezeichnung &quot;Quarter Horse&quot; geht auf seine historische Stärke zurück: Bei Pferderennen über eine Viertelmeile (ca. 400 Meter) war und ist er unschlagbar schnell. Diese genetische Schnelligkeit kombiniert mit einer außergewöhnlichen Cow Sense macht ihn zur idealen Rasse für Western-Disziplinen und Rancharbeit.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dieser Ratgeber hilft dir, den perfekten Quarter Horse für deine individuellen Bedürfnisse zu finden – sei es als Sportpartner, Freizeitbegleiter oder potenzieller Turnierheld. Weitere allgemeine Informationen zum Pferdekauf findest du in unserem <LocalizedLink href="/pferd-kaufen" className="text-brand hover:text-brand-dark underline">umfassenden Ratgeber zum Pferdekauf</LocalizedLink>.
            </p>
          </section>

          {/* Section: Bloodlines */}
          <section id="bloodlines" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Quarter Horse Bloodlines und ihre Preisunterschiede
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Blutlinien eines Quarter Horses bestimmen nicht nur seinen Wert, sondern auch seine Leistungsfähigkeit und Eignung für bestimmte Disziplinen. Bei der Zucht gibt es zwei Hauptzuchtrichtungen mit unterschiedlichen Zielen, Charakteristiken und Preisen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Foundation Quarter Horses
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Foundation Quarter Horses repräsentieren die ursprüngliche Rasse und ihre traditionellen Qualitäten. Diese Pferde sind näher an den Wurzeln der Rasse und behalten die klassischen Merkmale bei, die Quarter Horses für Rancharbeit berühmt machten.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Traditionelle, kompakte und stämmige Körperform</li>
              <li>• Kurzer, muskulöser Rücken mit breiter, tiefer Brust</li>
              <li>• Ruhiges, ausgeglichenes Temperament und Sanftheit</li>
              <li>• Ideal für Rancharbeit, Trail Riding und traditionelles Western Riding</li>
              <li>• Besonders geeignet für Freizeitreiter und Anfänger</li>
              <li>• Preisbereich: 5.000 - 15.000 €</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Performance Quarter Horses
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Performance Quarter Horses wurden gezielt für Turniersport und spezifische Western-Disziplinen gezüchtet. Sie zeigen eine athletischere Körperform und sind oft spezialisierten Trainingsmethoden unterzogen worden, um in ihrer jeweiligen Disziplin zu dominieren.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Schlankere, athletischere Körperform mit langen Linien</li>
              <li>• Gezüchtet für spezifische Disziplinen (Reining, Cutting, Roping)</li>
              <li>• Oft mit intensivem Training und Turniererfahrung</li>
              <li>• Internationale AQHA-Papiere und Stammbaum-Dokumentation</li>
              <li>• Höheres Energielevel und Ehrgeiz als Foundation-Linien</li>
              <li>• Preisbereich: 10.000 - 50.000 €, top-trainierte Pferde bis 100.000 €</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Bekannte Quarter Horse Bloodlines
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Einige der bekanntesten und wertvollsten Bloodlines sind:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Doc Bar:</strong> Legendäre Cutting-Linie, extrem wertvoll, 20-30% höhere Preise für Top-Nachkommen</li>
              <li>• <strong>Smart Little Lena:</strong> Dominante Reining-Linie mit bekannten Turniererfolgen</li>
              <li>• <strong>Zippo Pine Bar:</strong> Western Pleasure Spezialist mit ruhigem Temperament</li>
              <li>• <strong>Impressive:</strong> Historisch wichtige Linie, aber mit HYPP-Gentest auf Carrier prüfen</li>
              <li>• <strong>Driftwood:</strong> Klassische Foundation-Linie mit ruhigem Naturell</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Wichtig:</strong> Nicht jeder Performance Quarter Horse ist automatisch besser für dich. Die Qualität hängt von individuellen Linien, Trainingsstand, genetischen Anlagen und vor allem von deinen persönlichen Zielen ab. Ein gut trainierter Foundation Quarter Horse kann für Freizeitreiter besser geeignet und günstiger sein als ein untrajnierter Performance Horse.
            </p>
          </section>

          {/* Section: Disziplinen */}
          <section id="disziplinen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Western-Disziplinen und Ausbildungsstand beim Quarter Horse Kauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Beim Kauf eines Quarter Horses solltest du den Ausbildungsstand und die Spezialisierung genau betrachten. Jede Disziplin erfordert spezifische Fähigkeiten und Trainingsansätze:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Reining
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Hochpräzise Bewegungen und Wendungen</li>
              <li>• Anspruchsvollste Western-Disziplin</li>
              <li>• Sehr spezifisches Training erforderlich</li>
              <li>• Professionelle Ausbildung ist entscheidend</li>
              <li>• Anforderungen: Perfekte Stopps, Rollbacks, Spins</li>
              <li>• Nur für sehr erfahrene und technisch versierte Reiter</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Cutting
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Extrem anspruchsvolle Disziplin mit Ranchursprung</li>
              <li>• Erfordert spezifische genetische Veranlagung</li>
              <li>• Nur für erfahrene Reiter geeignet</li>
              <li>• Kernkompetenz: Einzelne Rinder aus der Herde trennen</li>
              <li>• Hohe Anforderungen an Pferd und Reiter</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Western Pleasure
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Harmonische, ruhige Gangart</li>
              <li>• Betont Gleichmäßigkeit und Gelassenheit</li>
              <li>• Gut für <LocalizedLink href="/pferd-kaufen/freizeitpferd" className="text-brand hover:text-brand-dark underline">Freizeitpferd kaufen</LocalizedLink> und Einsteiger in Western-Disziplinen</li>
              <li>• Breiter Einsatzbereich</li>
              <li>• Wichtig: Nicht mit Langsamkeit verwechseln</li>
              <li>• Erfordert präzise Körperkontrolle und Feinabstimmung</li>
            </ul>
          </section>

          {/* CTA Box 1: KI-Bewertung */}
          <RatgeberHighlightBox
            title="Quarter Horse Wert ermitteln – schnell und präzise"
            icon={trendingIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Du hast ein interessantes Quarter Horse gefunden? Unsere KI-gestützte Bewertung analysiert Bloodlines, Ausbildungsstand und aktuelle Marktpreise. In nur 2 Minuten erhältst du eine fundierte Preiseinschätzung.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Quarter Horse bewerten lassen
              <TrendingUp className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Züchter */}
          <section id="zuechter" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Quarter Horse Züchter in Deutschland finden
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Top-Regionen für Quarter Horse Züchter:</strong>
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Bayern:</strong> Bekannt für hochwertige Zuchtlinien und professionelle Aufzucht</li>
              <li>• <strong>Baden-Württemberg:</strong> Traditionelle Züchter mit Fokus auf Sportpferde</li>
              <li>• <strong>Nordrhein-Westfalen:</strong> Große Vielfalt an Züchterbetrieben</li>
              <li>• <strong>Niedersachsen:</strong> Emerging Region für Quarter Horse Züchtung</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Tipps zur professionellen Züchterauswahl:
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• AQHA-Registrierung ist ein MUSS</li>
              <li>• Vorbesitzer und vollständige Trainingshistorie anfordern</li>
              <li>• Gesundheitszeugnisse und tierärztliche Atteste prüfen</li>
              <li>• Züchter-Reputation über Verbände und Online-Bewertungen recherchieren</li>
              <li>• Persönlicher Besuch beim Züchter zur Pferdebegutachtung</li>
            </ul>
          </section>

          {/* Section: Conformation */}
          <section id="conformation" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Quarter Horse Conformation – worauf beim Kauf achten
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Typische Merkmale eines hochwertigen Quarter Horses:</strong>
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Niedrige Withers für optimale Reiterposition</li>
              <li>• Breite, muskulöse Brust als Zeichen von Kraft und Ausdauer</li>
              <li>• Kurzer, kompakter Körperbau – Markenzeichen der Rasse</li>
              <li>• Ausgeprägtes &quot;Cow Sense&quot; als genetische Besonderheit</li>
              <li>• Symmetrische Körperproportionen</li>
              <li>• Kräftige, gut entwickelte Hinterhand</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Detaillierte Begutachtung beim Kauf:
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Gleichmäßige Muskelentwicklung ohne Asymmetrien</li>
              <li>• Gesunde, stabile Gelenke ohne Anzeichen von Abnutzung</li>
              <li>• Präziser Bewegungsablauf und harmonische Gangart</li>
              <li>• Aufmerksame, aber ruhige Grundhaltung</li>
              <li>• Keine Anzeichen von Stress oder Nervosität</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gesundheitscheck: Nicht vergessen!
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Tierärztliche Kaufuntersuchung (AKU) unbedingt durchführen</li>
              <li>• Röntgenaufnahmen der Gelenke</li>
              <li>• Bluttests auf genetische Erkrankungen</li>
              <li>• Impfstatus und Wurmkur prüfen</li>
            </ul>
          </section>

          {/* Warning Box */}
          <RatgeberHighlightBox
            title="Wichtiger Hinweis zu AQHA-Papieren"
            icon={shieldIcon}
          >
            <p className="text-base text-gray-700">
              Kaufe niemals ein Quarter Horse ohne offizielle AQHA-Registrierung! Die Papiere sind nicht nur für Turniere wichtig, sondern auch für Wertstabilität und Zuchtmöglichkeiten. Ein Pferd ohne Papiere verliert 30-50% an Wert.
            </p>
          </RatgeberHighlightBox>

          {/* Section: Preisübersicht nach Kategorie */}
          <section id="preisueberblick" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Preisübersicht: Quarter Horses nach Kategorie
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Preise für Quarter Horses variieren stark je nach Kategorie, Alter, Ausbildungsstand und Bloodline. Hier ist ein realistischer Überblick der aktuellen Marktpreise in Deutschland, Österreich und der Schweiz:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Nach Ausbildungsstand
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-lg border-collapse">
                <thead>
                  <tr className="bg-amber-100 border border-gray-300">
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">Kategorie</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">Deutschland</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">Österreich</th>
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold">Schweiz</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Ungezähmtes/Junges Fohlen</td>
                    <td className="border border-gray-300 px-4 py-2">3.000 - 8.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">3.500 - 9.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">5.000 - 12.000 CHF</td>
                  </tr>
                  <tr className="border border-gray-300 bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Leicht angeritten</td>
                    <td className="border border-gray-300 px-4 py-2">8.000 - 15.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">9.000 - 17.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">12.000 - 22.000 CHF</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Trainiertes Freizeitpferd</td>
                    <td className="border border-gray-300 px-4 py-2">15.000 - 30.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">17.000 - 35.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">22.000 - 45.000 CHF</td>
                  </tr>
                  <tr className="border border-gray-300 bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Turnierpferd (Regional)</td>
                    <td className="border border-gray-300 px-4 py-2">30.000 - 60.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">35.000 - 70.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">45.000 - 85.000 CHF</td>
                  </tr>
                  <tr className="border border-gray-300">
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Top-Turnierpferd (National)</td>
                    <td className="border border-gray-300 px-4 py-2">60.000 - 150.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">70.000 - 180.000 €</td>
                    <td className="border border-gray-300 px-4 py-2">85.000 - 220.000 CHF</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Nach Bloodline und Spezialisierung
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li><strong>Foundation Quarter Horse (standard):</strong> 5.000 - 12.000 € – ideal für Einsteiger und Freizeitreiter</li>
              <li><strong>Performance Foundation:</strong> 10.000 - 20.000 € – gutes Foundation-Temperament mit etwas Training</li>
              <li><strong>Roping/Rancharbeit spezialisiert:</strong> 12.000 - 35.000 € – trainiert für Arbeit mit Rindern</li>
              <li><strong>Western Pleasure trainiert:</strong> 15.000 - 40.000 € – perfekt für Show und Einsteiger</li>
              <li><strong>Reining trainiert:</strong> 25.000 - 100.000 € – eine der anspruchsvollsten und teuersten Disziplinen</li>
              <li><strong>Cutting trainiert:</strong> 30.000 - 150.000+ € – höchste Preisklasse, erfordert Cow Sense und Top-Training</li>
              <li><strong>Doc Bar Bloodline:</strong> +20-30% Aufschlag auf Standard-Preise wegen Cutting-Exzellenz</li>
            </ul>
          </section>

          {/* Section: AQHA-Papiere */}
          <section id="aqha-papiere" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              AQHA-Papiere und Registrierung erklärt
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              AQHA steht für American Quarter Horse Association und ist die größte Zuchtorganisation für Quarter Horses weltweit. AQHA-Papiere sind ein Registrierungszertifikat, das die Abstammung und Echtheit eines Quarter Horses dokumentiert. Sie sind nicht optional – sie sind essentiell für jeden seriösen Pferdekauf.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Was sind AQHA-Papiere genau?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              AQHA-Papiere sind offizielle Registrierungsdokumente, die folgende Informationen enthalten:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Eindeutige Registrierungsnummer des Pferdes</li>
              <li>• Vollständiger Stammbaum (mindestens 3 Generationen)</li>
              <li>• Name, Farbe und Abzeichen des Pferdes</li>
              <li>• Namen und Registrierungsnummern von Sire (Vater) und Dam (Mutter)</li>
              <li>• Geburtsdatum und Zuchtinformation</li>
              <li>• Transferhistorie und aktuelle Besitzerdetails</li>
              <li>• Optional: DNA-Profil und Gentest-Ergebnisse</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Warum sind AQHA-Papiere beim Kauf wichtig?
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Wertstabilität:</strong> Ein Quarter Horse ohne Papiere verliert 30-50% seines Wertes</li>
              <li><strong>Authentizität:</strong> Bestätigt, dass das Pferd tatsächlich ein reinrassiger Quarter Horse ist</li>
              <li><strong>Turnierteilnahme:</strong> AQHA-Papiere sind oft Voraussetzung für offizielle Western-Turniere und Shows</li>
              <li><strong>Zuchtmöglichkeiten:</strong> Essentiell, wenn du das Pferd später zur Zucht verwenden möchtest</li>
              <li><strong>Transparenz:</strong> Vollständiger Stammbaum und Transferhistorie als Nachweis</li>
              <li><strong>Internationale Anerkennung:</strong> AQHA ist weltweit anerkannt und ermöglicht den Export/Import</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              DQHA und EQHA in Europa
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              In Deutschland und Österreich gibt es die DQHA (Deutsche Quarter Horse Association) und in Europa die EQHA (European Quarter Horse Association). Diese sind Partnerverbände der AQHA und ermöglichen die Registrierung von Quarter Horses in Europa. Pferde können sowohl in der AQHA als auch in der DQHA/EQHA registriert sein.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>DQHA:</strong> Registriert Quarter Horses in Deutschland, arbeitet mit AQHA zusammen</li>
              <li>• <strong>EQHA:</strong> Europäischer Dachverband, koordiniert Turniere und Registrierung</li>
              <li>• Viele deutsche Züchter registrieren Pferde in beiden Verbänden</li>
              <li>• DQHA/EQHA-Papiere allein reichen manchmal nicht &ndash; AQHA-Papiere sind &quot;höher rangig&quot;</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kosten der AQHA-Registrierung
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Fohleneintragung:</strong> Ca. 80-150 € bei der DQHA</li>
              <li>• <strong>Transfer/Eigentumsänderung:</strong> Ca. 30-50 € pro Transfer</li>
              <li>• <strong>DNA-Test (optional):</strong> Ca. 100-200 € für vollständiges DNA-Profil</li>
              <li>• <strong>Genetische Tests (HYPP, HERDA, GBED):</strong> Ca. 50-100 € pro Test</li>
              <li>• <strong>Duplikat-Papiere:</strong> Ca. 20-40 € bei Verlust</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Faustregel:</strong> Wenn ein Verkäufer sagt, dass die Papiere &quot;in Arbeit&quot; sind oder dass er sie nicht hat, sollte das ein Warnsignal sein. Seriöse Züchter und Verkäufer haben die Papiere immer verfügbar oder können sie zügig beschaffen.
            </p>
          </section>

          {/* Section: Marktplätze */}
          <section id="marktplaetze" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Wo Quarter Horses kaufen? Marktplätze & Verkäufer
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt verschiedene Kanäle, um ein Quarter Horse in Deutschland zu kaufen. Jeder hat Vor- und Nachteile, die du kennen solltest:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              1. Direkt vom Züchter
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteil:</strong> Beste Transparenz, vollständige Informationen zur Aufzucht und Abstammung, Besuch der Zuchtanlage möglich.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Finde Züchter über DQHA-Website (DQHA.de)</li>
              <li>• Besuche Zuchtbetriebe persönlich</li>
              <li>• Frag nach Stammbaum, Gesundheitstests und Trainingshistorie</li>
              <li>• Verhandlung ist oft möglich, besonders bei mehreren Pferden</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              2. ehorses Marktplatz
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteil:</strong> Große Auswahl, viele Inserate mit Fotos und Videos, Käuferschutz.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• ehorses.de ist eine der größten Pferdeverkaufsplattformen in Deutschland</li>
              <li>• Filterfunktionen: Rasse (Quarter Horse), Preis, Region, Alter</li>
              <li>• Kontakt zu Verkäufern über die Plattform</li>
              <li>• Vorsicht: Qualität der Inserate variiert stark, immer persönlich besichtigen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              3. eBay Kleinanzeigen / Lokale Marktplätze
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteil:</strong> Oft günstigere Preise, private Verkäufer, lokale Nähe möglich.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Suchbegriffe: &quot;Quarter Horse&quot;, &quot;Quarter Horse kaufen&quot;, Region + &quot;Quarter Horse&quot;</li>
              <li>• Vorsicht: Weniger Transparenz und Käuferschutz als auf Fachplattformen</li>
              <li>• Frag nach Papieren, Gesundheit und Trainingshistorie</li>
              <li>• Vermeide Käufe von unseriösen Verkäufern ohne Referenzen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              4. Spezialisierte Quarter Horse Verkäufer
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteil:</strong> Expertise, große Auswahl, Trainingsoptionen vor dem Kauf.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Professionelle Trainer und Verkäufer mit Spezialgebiet Quarter Horses</li>
              <li>• Oft Trainings- und Reitoptionen zum Ausprobieren</li>
              <li>• Höhere Preise, aber oft bessere Beratung</li>
              <li>• Finde sie über DQHA-Kontakte oder Western-Reitclubs</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              5. Import aus den USA
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteil:</strong> Größere Auswahl, oft bessere Performance-Horses, teilweise günstigere Preise.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Versand kostet 3.000-8.000 € je nach Fracht</li>
              <li>• Quarantäne und Zollabwicklung nötig</li>
              <li>• Gesundheitszertifikate müssen vor Import vorliegen</li>
              <li>• Risiko: Pferd ohne Proberitt kaufen, mögliche Transportstress-Folgen</li>
              <li>• Für Profis und erfahrene Käufer – zu komplex für Anfänger</li>
            </ul>
          </section>

          {/* Section: Genetische Erkrankungen */}
          <section id="genetische-erkrankungen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Genetische Erkrankungen: Gentests vor dem Kauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Quarter Horses können von drei Hauptgendefekten betroffen sein, die alle autosomal rezessiv verererbt werden. Dies bedeutet, dass ein Pferd den Defekt nur zeigt, wenn es zwei Kopien des fehlerhaften Gens hat. Ein Carrier (Träger mit nur einer Kopie) zeigt keine Symptome, kann aber an Nachkommen weitergeben. Seriöse Züchter testen ihre Zuchtpferde und geben diese Informationen offen an Käufer weiter.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              HYPP – Hyperkalemic Periodic Paralysis
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Was ist HYPP?</strong> Eine neuromuskuläre Erkrankung, die zu plötzlichen Lähmungen oder Muskelschwäche führt.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Symptome:</strong> Muskelzittern, Lähmungen, oft nach Fütterung oder Stress</li>
              <li>• <strong>Schweregrad:</strong> Mild (kaum Probleme) bis schwer (tödlich)</li>
              <li>• <strong>Besonders häufig bei:</strong> Linien von &quot;Impressive&quot; (legendärer Stallion, aber HYPP N/H positiv)</li>
              <li>• <strong>Management:</strong> Diäte (kaliumarm), regelmäßige Bewegung, Stressabbau</li>
              <li>• <strong>Überprüfung:</strong> Gentest unterscheidet zwischen N/N (normal), N/H (Carrier), H/H (betroffen)</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              HERDA – Hereditary Equine Regional Dermal Asthenia
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Was ist HERDA?</strong> Eine Hauterkrankung, bei der die Haut extrem fragil wird und an verschiedenen Körperstellen Wunden auftreten.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Symptome:</strong> Scheuerstellen, offene Wunden, Infektionen, schlecht heilende Wunden</li>
              <li>• <strong>Schweregrad:</strong> Unmittelbar lebensbedrohlich für betroffene Pferde (H/H)</li>
              <li>• <strong>Besonders häufig bei:</strong> Linien von &quot;Poco Bueno&quot; und &quot;Impressive&quot;</li>
              <li>• <strong>Management:</strong> Keine Heilung, Euthanasie oft notwendig für H/H-Pferde</li>
              <li>• <strong>Überprüfung:</strong> Gentest unterscheidet N/N, N/H, H/H</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              GBED – Glycogen Branching Enzyme Deficiency
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Was ist GBED?</strong> Ein Stoffwechseldefekt, der Muskelenergie beeinträchtigt und zu Muskeldegeneration führt.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Symptome:</strong> Muskelstarre, Lethargie, Bewegungsunlust, Herzprobleme</li>
              <li>• <strong>Schweregrad:</strong> Betroffene Pferde (G/G) sind lebensfähig, aber eingeschränkt</li>
              <li>• <strong>Besonders häufig bei:</strong> Linien von &quot;Impressive&quot; und frühen Cutting-Linien</li>
              <li>• <strong>Management:</strong> Begrenzte Anstrengung, keine Turniere, reduzierte Leistung</li>
              <li>• <strong>Überprüfung:</strong> Gentest unterscheidet N/N, N/G, G/G</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gentests vor dem Kauf durchführen
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Das solltest du immer tun:</strong>
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Frag den Züchter/Verkäufer nach den Ergebnissen der Gentests</li>
              <li>• Verlang die Tests für Sire und Dam (Eltern des Pferdes)</li>
              <li>• Verbiete Zucht mit Carriern (N/H oder N/G) für kommerzielle Zucht</li>
              <li>• Wenn Tests nicht verfügbar sind, lass die Tests selbst machen (ca. 150-200 € für alle 3 Tests)</li>
              <li>• Mache die Tests VOR dem Kaufabschluss, nicht nachher</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Gentest-Laboratorien:</strong> Die wichtigsten Labs sind UC Davis (USA), LABOKLIN (Deutschland) und VGL Labs (USA). Sie alle sind zuverlässig und werden weltweit akzeptiert.
            </p>
          </section>

          {/* Section: Quarter Horse in Not */}
          <section id="quarter-horse-not" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Quarter Horse in Not: Rettungs- und Adoptionsmöglichkeiten
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt viele Quarter Horses, die aufgrund von Vernachlässigung, Alter oder Verhaltensproblemen ein neues Zuhause brauchen. Der Kauf oder die Adoption eines Rettungspferdes kann sowohl finanziell als auch ethisch bereichernd sein, erfordert aber besondere Überlegungen und Erfahrung.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Rettungsorganisationen für Quarter Horses
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Pferderettungshöfe:</strong> Viele regionale Höfe in Deutschland spezialisieren sich auf Rettung von Pferden</li>
              <li>• <strong>Western-Reitclubs:</strong> Einige DQHA-Clubs betreiben Rettungsprogramme</li>
              <li>• <strong>Adoption-Netzwerke:</strong> Online-Gruppen und Foren für Pferd-Adoption</li>
              <li>• <strong>Private Züchter:</strong> Manchmal haben ältere Zuchtstuten Rettungsbedarf</li>
              <li>• <strong>Abgebaute Turnierpferde:</strong> Professionelle Trainer haben oft Pferde, die &quot;in Rente gehen&quot;</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Preise für Quarter Horses in Not
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Rettungspferde sind deutlich günstiger als normale Marktkäufe:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Schutzgebühr/Vermittlungsgebühr:</strong> 500 - 2.000 € (für organisierte Rettungen)</li>
              <li>• <strong>Private Rettungssituation:</strong> 1.000 - 5.000 € (verhandelbar)</li>
              <li>• <strong>Sehr alte oder problematische Pferde:</strong> Bis zu 500 € oder sogar kostenlos</li>
              <li>• <strong>Kostenersparnis:</strong> 50-80% unter Marktwert, aber versteckte Kosten möglich</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Worauf du bei Rettungspferden achten musst
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Gründliche AKU ist ESSENTIELL:</strong> Oft wissen Rettungsorganisationen wenig über die Vorgeschichte</li>
              <li>• <strong>Trainings- und Verhaltensgeschichte:</strong> Frag detailliert nach bisherigen Erfahrungen</li>
              <li>• <strong>Grund für die Rettung:</strong> Vermeide Pferde mit schwerem Verhaltenstrauma</li>
              <li>• <strong>Reiter-Qualifikation:</strong> Du musst erfahren genug sein für Retraining</li>
              <li>• <strong>Zeit und Geduld planen:</strong> Rettungspferde brauchen oft 3-6 Monate Rehabilitation</li>
              <li>• <strong>Budget für Therapie:</strong> Physiotherapie, Zahnbehandlung, Schmiedarbeit kosten extra</li>
              <li>• <strong>Probereiten vereinbaren:</strong> Auch bei Rettungspferden sollte Proberitt möglich sein</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kosten für Rettungspferd-Rehabilitation
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein günstiges Rettungspferd kann durch Rehabilitation schnell teuer werden:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>AKU:</strong> 300-600 € (zwingende Notwendigkeit)</li>
              <li>• <strong>Zahnbehandlung:</strong> 200-500 € bei Vernachlässigung</li>
              <li>• <strong>Schmied/Hufreparatur:</strong> 200-600 € bei schlechtem Zustand</li>
              <li>• <strong>Medikamente/Behandlung:</strong> 100-500 € je nach Gesundheitszustand</li>
              <li>• <strong>Retraining mit Profi:</strong> 1.500-3.000 € für 4-8 Wochen Trainerdienste</li>
              <li>• <strong>Physiotherapie (bei Trauma):</strong> 50-100 € pro Sitzung, oft 5-10 Sessions nötig</li>
              <li>• <strong>Gesamtbudget realistische Erwartung:</strong> 3.000-8.000 € zusätzlich zur Kaufgebühr</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Fazit für Rettungspferde:</strong> Sie können eine wunderbare, erfüllende Erfahrung sein, aber nicht immer günstiger als ein regulärer Kauf. Die emotionale Belohnung ist oft größer als die finanzielle Ersparnis.
            </p>
          </section>

          {/* Section: AKU-Besonderheiten */}
          <section id="aku-special" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              AKU-Besonderheiten beim Quarter Horse
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Ankaufsuntersuchung (AKU) ist essentiell beim Pferdekauf. Beim Quarter Horse gibt es spezifische Aspekte, auf die der Tierarzt besonders achten sollte, um spätere Probleme zu vermeiden.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Spezielle Tests für Quarter Horses
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Rücken und Lendengegend:</strong> Quarter Horses haben oft Probleme hier – Röntgen ist wichtig</li>
              <li>• <strong>Hinterbeine/Hocks:</strong> Knochendichte-Tests besonders bei Performance-Horses</li>
              <li>• <strong>Hufe und Fesselgelenke:</strong> Überprüfung auf chronische Probleme</li>
              <li>• <strong>Augenkontrolle:</strong> Quarter Horses sind anfällig für bestimmte Augendefekte</li>
              <li>• <strong>Blutuntersuchung (optional):</strong> Complete blood work für ältere oder fragliche Pferde</li>
              <li>• <strong>Gentests (empfohlen):</strong> HYPP, HERDA, GBED sollten Teil der AKU sein</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kosten und Dauer der AKU
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Basis-AKU:</strong> 300-500 € (Untersuchung, Bluttest, einfache Röntgen)</li>
              <li>• <strong>Erweiterte AKU mit Röntgen:</strong> 600-1.000 €</li>
              <li>• <strong>Umfassende AKU (mit Genetik):</strong> 1.000-1.500 €</li>
              <li>• <strong>Dauer:</strong> 2-3 Stunden für Basis, bis 6 Stunden für Umfassende</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              AKU-Abbruchkriterien beim Quarter Horse
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Folgende Befunde sollten ein Abbruch des Kaufs sein:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Genetische Defekte: H/H oder G/G bei HYPP oder GBED</li>
              <li>• HERDA H/H (unmittelbar lebensbedrohlich)</li>
              <li>• Fortgeschrittene Arthrosen (besonders Hocks und Rücken)</li>
              <li>• Erhebliche Zahnprobleme oder fehlende Zähne</li>
              <li>• Neurologische Probleme (Ataxie, Lähmungen)</li>
              <li>• Chronische Atemwegserkrankungen (Heaves)</li>
              <li>• Beeinträchtigtes Sehvermögen (Blindheit, schwere Probleme)</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              Eine detaillierte Anleitung zur AKU und Kaufuntersuchungen findest du in unserem <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">umfassenden AKU-Ratgeber</LocalizedLink>.
            </p>
          </section>

          {/* Section: Preisberechnung */}
          <section id="preisberechnung" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Preisberechnung leicht gemacht
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Preisbestimmung für Quarter Horses ist komplex und von vielen Faktoren abhängig. Nutze unseren <LocalizedLink href="/pferde-preis-berechnen" className="text-brand hover:text-brand-dark underline">Pferdewert-Rechner</LocalizedLink>, um einen präzisen Wert zu ermitteln.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Wichtige Preisfaktoren:
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Blutlinie und AQHA-Papiere</li>
              <li>• Aktueller Ausbildungsstand</li>
              <li>• Alter und Gesundheitszustand</li>
              <li>• Turniererfolge und Disziplin-Spezialisierung</li>
              <li>• Genetische Qualität und Abstammung</li>
              <li>• Aktuelle Marktsituation</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Preisrahmen als Orientierung:
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Junges, untrainiertes Pferd:</strong> 5.000 - 15.000 €</li>
              <li>• <strong>Trainierter Freizeitreiterhengst:</strong> 15.000 - 30.000 €</li>
              <li>• <strong>Turnierpferd mit Erfolgen:</strong> 30.000 - 80.000 €</li>
              <li>• <strong>Top-Zuchtpferde:</strong> Bis zu 100.000 €</li>
            </ul>
          </section>

          {/* Conclusion */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Fazit:</strong> Ein Quarter Horse ist mehr als eine Investition – er ist ein Partner für Tradition, Sport und emotionale Verbindung. Nimm dir Zeit, informiere dich gründlich und treffe eine bewusste, durchdachte Entscheidung. Jedes Pferd ist einzigartig, und der richtige Quarter Horse wird dein Reiterleben für immer verändern.
            </p>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <div className="max-w-3xl mx-auto">
              <FAQ
                faqs={faqItems}
                sectionTitle="Häufig gestellte Fragen"
                sectionSubtitle="Die wichtigsten Antworten zu Quarter Horse Kauf, Bloodlines, Western-Disziplinen und AQHA-Registrierung"
                withSchema={false}
              />
            </div>
          </section>

          {/* Author Box */}
          <AuthorBox />

          {/* Related Articles */}
          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            articles={relatedArticles}
            description="Vertiefe dein Wissen über Pferdekauf und Western-Reiten."
          />

          {/* Final CTA */}
          <RatgeberFinalCTA
            image={{
              src: '/images/shared/blossi-shooting.webp',
              alt: 'PferdeWert Expertin mit Pferd',
              width: 800,
              height: 600
            }}
            title="Dein Quarter Horse fair bewerten"
            description="Unsere KI-gestützte Analyse berücksichtigt alle wichtigen Faktoren: Bloodlines, AQHA-Papiere, Ausbildungsstand und aktuelle Marktpreise. Erhalte in nur 2 Minuten eine objektive Bewertung."
            ctaLabel="Jetzt Quarter Horse bewerten"
            ctaHref="/pferde-preis-berechnen"
          />
        </div>
      </article>
    </Layout>
  );
}