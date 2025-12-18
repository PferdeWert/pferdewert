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
import { Sparkles, ShieldAlert, Heart } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const shieldIcon = <ShieldAlert className="w-5 h-5" />;
const heartIcon = <Heart className="w-5 h-5" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Friese kaufen 2025: KFPS-Prädikate, Preise & Gesundheitstests',
    description: 'Friese kaufen ➤ KFPS Star & Kroon erklärt ✓ Preise 3.000-50.000€ ✓ Gentests für Dwarfism ✓ Barock vs. Sport-Typ. Jetzt informieren!',
    keywords: 'friese kaufen, friesenpferd kaufen, KFPS prädikate, friese preis, barock friese, friese kaufen deutschland',
    ogTitle: 'Friese kaufen: KFPS-Prädikate, Preise & Gesundheitstests',
    ogDescription: 'Alles über Friesen: KFPS Star/Kroon, Genetische Tests, Preisübersicht und Zuchtlinien. Mit KI-gestützter Bewertung in 2 Minuten.',
    twitterTitle: 'Friese kaufen: Der komplette Ratgeber zu KFPS & Preisen',
    twitterDescription: 'KFPS-Prädikate, Dwarfism-Tests, 3.000-50.000€. Jetzt informieren!',
  },
  at: {
    title: 'Friese kaufen in Österreich: KFPS-Prädikate & Preise 2025',
    description: 'Friese kaufen in Österreich ➤ KFPS Star/Kroon ✓ Züchter in AT ✓ Preise 3.000-50.000€ ✓ Gesundheitstests. Jetzt informieren!',
    keywords: 'friese kaufen österreich, friesenpferd österreich, KFPS prädikate österreich',
    ogTitle: 'Friese kaufen in Österreich: KFPS & Prädikate',
    ogDescription: 'Friesen in Österreich: KFPS-Registrierung, Prädikate, Züchter und aktuelle Preise.',
    twitterTitle: 'Friese kaufen in Österreich',
    twitterDescription: 'KFPS-Prädikate, Züchter, Preise & Gesundheitstests.',
  },
  ch: {
    title: 'Friese kaufen Schweiz: KFPS-Prädikate & CHF-Preise 2025',
    description: 'Friese kaufen in der Schweiz ➤ KFPS Star/Kroon ✓ CHF 5.000-100.000 ✓ Schweizer Züchter ✓ Gentests. Jetzt informieren!',
    keywords: 'friese kaufen schweiz, friesenpferd schweiz, KFPS prädikate schweiz',
    ogTitle: 'Friese kaufen in der Schweiz: KFPS & Prädikate',
    ogDescription: 'Friesen in der Schweiz: KFPS-Registrierung, Prädikate, CHF-Preise und Züchter.',
    twitterTitle: 'Friese kaufen Schweiz',
    twitterDescription: 'KFPS-Prädikate, CHF 5.000-100.000, Schweizer Züchter.',
  },
};

export default function FrieseKaufen() {

  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: sparklesIcon
  };

  const sections = [
    { id: 'kfps-papiere', title: 'Friesen-spezifische Merkmale und KFPS-Papiere' },
    { id: 'kfps-praedikate', title: 'KFPS-Prädikate und Einstufungen erklärt' },
    { id: 'preise-kategorien', title: 'Preisübersicht: Friesen nach Kategorie' },
    { id: 'gesundheit', title: 'Gesundheit und genetische Erkrankungen' },
    { id: 'gentests', title: 'Genetische Tests und Wasserklar-Zertifikat' },
    { id: 'barock-vs-sport', title: 'Barock-Friese vs. Sport-Friese: Die zwei Typen' },
    { id: 'wo-kaufen', title: 'Wo Friesen kaufen? Marktplätze & Verkäufer' },
    { id: 'preise', title: 'Friesen-Preise und Zuchtlinien' },
    { id: 'disziplinen', title: 'Friesen für verschiedene Disziplinen' },
    { id: 'anfaenger', title: 'Sind Friesen für Anfänger geeignet?' },
    { id: 'behang-mauke', title: 'Behang und Mauke: Pflegeanforderungen' },
    { id: 'friesen-in-not', title: 'Friesen in Not: Rettung und Adoption' },
    { id: 'checkliste', title: 'Checkliste für den perfekten Friese-Kauf' },
    { id: 'training', title: 'Training und Vorbereitung vor dem Friese-Kauf' },
    { id: 'kosten', title: 'Kosten und Finanzplanung' },
    { id: 'investition', title: 'Der Friese als Investition' },
    { id: 'rechtliche', title: 'Rechtliche Aspekte beim Friese-Kauf' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Was kostet ein Friese mit KFPS-Papieren?',
      answer: 'Ein Friese mit vollständigen KFPS-Papieren kostet zwischen 5.000 und 50.000 EUR. Jungpferde mit guter Abstammung beginnen bei 5.000-8.000 EUR. Ausgebildete Freizeitpferde liegen bei 8.000-15.000 EUR. Friesen mit besonderen Zuchtlinien oder Turniererfolgen können 20.000-50.000 EUR kosten. Ohne KFPS-Papiere sind Friesen deutlich günstiger, aber für die Zucht nicht geeignet.'
    },
    {
      question: 'Wie erkenne ich echte KFPS-Papiere?',
      answer: 'Echte KFPS-Papiere tragen das offizielle Logo des Koninklijk Friesch Paarden Stamboek und eine eindeutige Registrierungsnummer. Sie enthalten detaillierte Abstammungsnachweise über mindestens drei Generationen, den UELN-Code (Lebensummer), Chip-Nummer und Beschreibung der Abzeichen. Überprüfen Sie die Echtheit direkt beim KFPS über deren Online-Datenbank oder kontaktieren Sie den niederländischen Hauptverband.'
    },
    {
      question: 'Welche Gesundheitsprobleme sind typisch für Friesen?',
      answer: 'Friesen neigen zu bestimmten erblichen Erkrankungen: Dwarfism (Zwergwuchs) mit genetischen Tests nachweisbar, erhöhte Anfälligkeit für Mauke durch den starken Behang, Sommerekzem bei etwa 15% der Friesen, und eine Disposition zu bestimmten Stoffwechselproblemen. Eine gründliche Ankaufsuntersuchung mit genetischen Tests ist daher unerlässlich. Verlangen Sie Testergebnisse für Dwarfism und Hydrocephalus.'
    },
    {
      question: 'Sind Friesen nur für die Dressur geeignet?',
      answer: 'Nein, Friesen sind vielseitige Pferde. Sie eignen sich hervorragend für die barocke Dressur und das Freizeitreiten, sind traditionelle Kutschpferde mit natürlicher Eignung, werden oft in Theater und Film eingesetzt, und können auch leichtere Springaufgaben bewältigen. Ihre spektakulären Gänge und das imposante Erscheinungsbild machen sie besonders für Showauftritte beliebt. Wichtig ist die individuelle Beurteilung des jeweiligen Pferdes.'
    },
    {
      question: 'Wie aufwendig ist die Pflege des Behangs?',
      answer: 'Die Pflege des typischen Friesen-Behangs erfordert täglich 20-30 Minuten zusätzlich. Der Behang muss täglich entwirrt und gebürstet werden, bei feuchtem Wetter komplett getrocknet werden, regelmäßig gewaschen werden (alle 1-2 Wochen), und im Winter besonders vor Staunässe geschützt werden. Viele Besitzer verwenden spezielle Pflegeprodukte und Behangschoner. Die intensive Pflege ist essentiell zur Vorbeugung von Mauke und anderen Hautproblemen.'
    },
    {
      question: 'Wo finde ich seriöse Friesen-Züchter?',
      answer: 'Seriöse Züchter finden Sie über das KFPS (offizielle niederländische Stammbuchorganisation), den Friesenpferde-Zuchtverband e.V. in Deutschland, direkt in Friesland (Niederlande) als Ursprungsregion, oder über anerkannte Gestüte mit KFPS-Lizenz. Achten Sie auf transparente Zuchtbedingungen, vollständige Papiere und die Möglichkeit zum Probereiten. Vermeiden Sie Angebote ohne KFPS-Registrierung oder mit auffällig niedrigen Preisen.'
    },
    {
      question: 'Brauche ich Erfahrung für einen Friesen?',
      answer: 'Friesen sind keine Anfängerpferde. Sie benötigen fortgeschrittene Reitkenntnisse, da sie sensibel und temperamentvoll sind. Erfahrung mit energievollen Pferderassen ist von Vorteil. Die Pferde reagieren fein auf Hilfen und brauchen eine konsequente aber faire Führung. Für Reitanfänger empfiehlt sich zunächst Unterricht auf Schulpferden und der Erwerb solider Grundkenntnisse, bevor ein eigener Friese angeschafft wird.'
    },
    {
      question: 'Kann ich einen Friesen als Freizeitpferd nutzen?',
      answer: 'Ja, Friesen eignen sich sehr gut als Freizeitpferde, wenn man ihre Besonderheiten beachtet. Sie sind ausdauernd und trittsicher im Gelände, haben einen freundlichen und menschenbezogenen Charakter, und ihre imposante Erscheinung macht jedes Ausreiten zu etwas Besonderem. Allerdings benötigen sie regelmäßige Bewegung und mentale Beschäftigung. Ihre Sensibilität erfordert einen einfühlsamen Umgang. Mit der richtigen Pflege und Haltung sind Friesen wunderbare Freizeitpartner.'
    },
    {
      question: 'Barock-Friese oder Sport-Friese: Welcher Typ passt zu mir?',
      answer: 'Barock-Friesen haben einen kräftigen Körperbau, üppigen Behang und sind ideal für Kutschfahrten, Shows und traditionelle Dressur. Sie sind eher rustikal und wiegen oft über 500 kg. Sport-Friesen sind leichter und eleganter gebaut mit besseren Galoppierfähigkeiten, eignen sich für moderne Dressur und leichte Sprünge. Für Anfänger sind beide Typen eher weniger geeignet. Deine Ziele und das verfügbare Budget sollten deine Wahl leiten.'
    },
    {
      question: 'Wo kann ich einen seriösen Friesen kaufen?',
      answer: 'Seriöse Quellen sind die KFPS-Datenbank (offizielle Online-Börse), anerkannte Gestüte in den Niederlanden und Deutschland, spezialisierte Pferdehändler mit KFPS-Lizenz, sowie Pferdemarktplätze wie ehorses oder PferdeMarkt. Vorsicht bei eBay Kleinanzeigen für hochpreisige Pferde - dort finden sich leider auch Betrüger. Vor dem Kauf: Immer das Pferd live besichtigen, reiten, und eine AKU durchführen lassen.'
    },
    {
      question: 'Wie erkenne ich KFPS-Prädikate wie Star oder Kroon?',
      answer: 'KFPS-Prädikate sind Qualitätseinstufungen in den Papieren. Stamboek ist die Basiseintragung. Ster (Star) ist die erste Qualitätsstufe, vergeben an Pferde mit guter Bewegung und Exterieur. Kroon (Krone) ist eine höhere Einstufung mit strengeren Anforderungen. Model ist die höchste Stuteneinstufung. Preferent ist ein Prädikat für besondere Zuchtwerte. Höhere Prädikate bedeuten bessere Genetik und höhere Preise.'
    }
  ];

  // Related articles from registry (will be added after registry update)
  const relatedArticles = getRelatedArticles('friese').map(entry => ({
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
        slug="friese"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/friese-weide.webp"
        locales={seoLocales}
        datePublished="2025-12-15"
        wordCount={2600}
        breadcrumbTitle="Friese kaufen"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeIcon={heartIcon}
          badgeLabel="Barocke Pferderasse"
          title="Friese kaufen: Worauf bei der barocken Pferderasse achten"
          subtitle="Wenn du einen Friese kaufen möchtest, stehst du vor einer besonderen Herausforderung. Diese majestätische Pferderasse mit ihrer barocken Erscheinung und bewegenden Eleganz fasziniert Pferdeliebhaber weltweit."
          readTime="15 Min."
          publishDate="Dezember 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/friese-weide.webp"
          alt="Schwarzer Friese mit wallendem Behang auf grüner Weide"
          priority={true}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn du einen <strong>Friese kaufen</strong> möchtest, stehst du vor einer besonderen Herausforderung. Diese majestätische Pferderasse mit ihrer barocken Erscheinung und bewegenden Eleganz fasziniert Pferdeliebhaber weltweit. Anders als bei anderen Pferderassen erfordert der Kauf eines Friesenpferdes eine sorgfältige und nuancierte Herangehensweise.
            </p>
          </section>

          {/* KFPS-Papiere Section */}
          <section id="kfps-papiere" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Friesen-spezifische Merkmale und KFPS-Papiere
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Friesenpferde sind mehr als nur ein Pferd - sie sind ein Kulturerbe. Die Rasse wird streng durch das Koninklijk Friesch Paarden Stamboek (KFPS) reguliert, was beim <strong>Friese kaufen</strong> besondere Aufmerksamkeit verdient.
            </p>
            
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die Bedeutung der KFPS-Registrierung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bei einem seriösen Friese-Kauf sind die KFPS-Papiere entscheidend. Sie garantieren:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Reinrassigkeit</li>
              <li>• Abstammungsnachweis</li>
              <li>• Zuchtstandards</li>
              <li>• Eintragungsmöglichkeiten für Zuchtzwecke</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Achte darauf, dass dein Friese nicht nur äußerlich korrekt ist, sondern auch offizielle Papiere besitzt. Ein Friese ohne KFPS-Dokumente ist wie ein Kunstwerk ohne Echtheitszertifikat.
            </p>

            <h4 className="text-xl font-serif font-bold text-gray-900 mt-6">
              Geschichte und Bedeutung des KFPS
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das Koninklijk Friesch Paarden Stamboek (KFPS) wurde 1879 gegründet und ist einer der ältesten und strengsten Pferdezuchtverbände weltweit. Ihre Aufgaben umfassen:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Strenge Selektion der Zuchttiere</li>
              <li>• Genetische Gesundheitsprüfungen</li>
              <li>• Dokumentation der Abstammungslinien</li>
              <li>• Festlegung von Rassestandards</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nur Pferde, die alle Kriterien erfüllen, erhalten das begehrte KFPS-Zertifikat. Dies garantiert nicht nur Reinrassigkeit, sondern auch höchste Zuchtqualität.
            </p>
          </section>

          {/* KFPS-Prädikate Section */}
          <section id="kfps-praedikate" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              KFPS-Prädikate und Einstufungen erklärt
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die KFPS vergibt verschiedene Prädikate an Friesen, die deren Qualität und Zuchtwert angeben. Diese Einstufungen beeinflussen den Preis und die Eignung für bestimmte Ziele erheblich.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die verschiedenen KFPS-Einstufungen
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="bg-amber-50 p-4 rounded-lg">
                <strong>Stamboek:</strong> Die Basiseintragung für reinrassige Friesen. Pferde mit normaler Qualität und durchschnittlichen Bewegungen.
              </li>
              <li className="bg-amber-50 p-4 rounded-lg">
                <strong>Ster (Star):</strong> Die erste Qualitätsstufe. Vergeben an Pferde mit guter Bewegung, korrektem Exterieur und guter Abstammung. Ein wichtiger Qualitätsstandard für Freizeitkäufer.
              </li>
              <li className="bg-amber-50 p-4 rounded-lg">
                <strong>Kroon (Krone):</strong> Eine höhere Einstufung mit strengeren Anforderungen an Exterieur, Bewegung und Abstammung. Nur die besten Pferde erhalten dieses Prädikat.
              </li>
              <li className="bg-amber-50 p-4 rounded-lg">
                <strong>Model:</strong> Die höchste Stuteneinstufung. Für Stuten mit ausgezeichnetem Exterieur und Bewegungspotenzial, ideal für Zucht.
              </li>
              <li className="bg-amber-50 p-4 rounded-lg">
                <strong>Preferent:</strong> Ein Zuchtwert-Prädikat für Pferde mit besonderem genetischem Potenzial. Oft bei bekannten Zuchthengsten und -stuten.
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              Die Prädikate sind entscheidend beim Friese-Kauf: Ein Star-Friese kostet typischerweise 30-50% mehr als ein Stamboek-Pferd, aber bietet bessere Langzeitaussichten. Wenn du den Friesen zuchten oder zu Turnieren führen möchtest, solltest du mindestens ein Ster-Prädikat anstreben.
            </p>
          </section>

          {/* Preisübersicht nach Kategorie */}
          <section id="preise-kategorien" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Preisübersicht: Friesen nach Kategorie
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Preise für Friesenpferde variieren je nach Alter, Ausbildungsstand, KFPS-Prädikat und Zuchtwert erheblich. Hier findest du eine realistische Übersicht der Marktpreise:
            </p>

            <div className="overflow-x-auto bg-amber-50 p-6 rounded-lg">
              <table className="w-full text-lg text-gray-700">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 font-bold">Kategorie</th>
                    <th className="text-left py-3 font-bold">Preisrange</th>
                    <th className="text-left py-3 font-bold">Merkmale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold">Fohlen (1-2 Jahre)</td>
                    <td className="py-4">3.000 - 8.000 €</td>
                    <td className="py-4">Ohne Ausbildung, gutes Potenzial, oft ohne Ster-Prädikat</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold">Freizeitpferd (5-10 Jahre)</td>
                    <td className="py-4">8.000 - 15.000 €</td>
                    <td className="py-4">Grundausbildung vorhanden, gutes Temperament, Stamboek/Ster</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold">Ausgebildetes Pferd</td>
                    <td className="py-4">15.000 - 25.000 €</td>
                    <td className="py-4">Mittlere bis gute Ausbildung, mehrjähriges Training, Star-Prädikat</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-semibold">Top-Zuchtpferd (Ster/Kroon)</td>
                    <td className="py-4">25.000 - 50.000 €</td>
                    <td className="py-4">Hervorragende Abstammung, Zuchtpotenzial, Turniererfolge möglich</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold">Ohne KFPS-Papiere</td>
                    <td className="py-4">2.000 - 5.000 €</td>
                    <td className="py-4">Keine Reinrassigkeit-Garantie, nicht züchtbar, oft günstige &bdquo;Gnadenbrotplätze&ldquo;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              <strong>Wichtig:</strong> Kaufpreise können in speziellen Marktregionen (Niederlande, Deutschland) abweichen. Top-Zuchthengste oder international erfolgreiche Dressurpferde können auch über 50.000 EUR kosten. Vergleiche mehrere Angebote, bevor du dich entscheidest.
            </p>
          </section>

          {/* Gesundheit Section */}
          <section id="gesundheit" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Gesundheit und typische Friesen-Probleme
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Friesenpferde haben einige rassenspezifische Gesundheitsherausforderungen, die du beim Kauf unbedingt berücksichtigen musst.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Genetische Besonderheiten
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Rasse neigt zu bestimmten Erbkrankheiten:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Dwarfism (Zwergwuchs)</li>
              <li>• Erbliche Muskelerkrankungen</li>
              <li>• Erhöhte Anfälligkeit für bestimmte Stoffwechselprobleme</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein umfassender tierärztlicher Check vor dem Kauf ist daher unerlässlich. Eine professionelle{' '}
              <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">
                Ankaufsuntersuchung (AKU)
              </LocalizedLink>{' '}
              mit genetischen Tests ist bei Friesen besonders wichtig. Lass dir die komplette Gesundheitshistorie und mögliche Abstammungstests zeigen.
            </p>

            {/* Strategic Highlight Box for Health Warning */}
            <RatgeberHighlightBox
              title="Wichtiger Gesundheitshinweis"
              icon={shieldIcon}
            >
              <p className="text-base text-gray-700 leading-relaxed">
                Bestehe immer auf einer großen Ankaufsuntersuchung (AKU) mit genetischen Tests für Dwarfism und Hydrocephalus. Die zusätzlichen Kosten von 800-1.500 EUR schützen dich vor teuren Überraschungen und gesundheitlichen Problemen.
              </p>
            </RatgeberHighlightBox>
          </section>

          {/* Genetische Tests Section */}
          <section id="gentests" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Genetische Tests und Wasserklar-Zertifikat
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Genetische Tests sind beim Friese-Kauf essentiell. Die erblichen Erkrankungen der Rasse können durch DNA-Analysen zuverlässig identifiziert werden.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Wichtige Gentests für Friesen
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="border-l-4 border-brand-brown pl-4">
                <strong>Dwarfism-Test (CA1/CA2 Marker):</strong> Testet auf das Zwergwuchsen-Gen. Pferde mit zwei mutierten Genen erhalten nur verkrüppelte Nachkommen. Kostenpunkt: ca. 150-200 EUR pro Pferd.
              </li>
              <li className="border-l-4 border-brand-brown pl-4">
                <strong>Hydrocephalus-Test:</strong> Identifiziert das Gen für Wasserkopf, eine potenziell tödliche Erbkrankheit. Sollte bei jedem Zuchtkandidaten durchgeführt werden. Kosten: ca. 150-200 EUR.
              </li>
              <li className="border-l-4 border-brand-brown pl-4">
                <strong>Aortariss-Prädisposition:</strong> Friesen haben eine erhöhte Neigung zu spontanen Aortarissen. Ein Test kann teilweise durchgeführt werden, ist aber nicht standardisiert. Lass dies mit dem Tierarzt besprechen.
              </li>
              <li className="border-l-4 border-brand-brown pl-4">
                <strong>Wasserklar-Zertifikat:</strong> Ein informelles Zertifikat, das das Pferd als frei von bestimmten genetischen Erkrankungen einstuft. Nicht offiziell, aber als Verkaufsargument beliebt. Verlangen Sie offizielle KFPS-Gentestergebnisse statt nur &quot;Wasserklar&quot;-Behauptungen.
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gesamtbudget für Gentests
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Eine komplette Gentestbatterie (Dwarfism + Hydrocephalus + zusätzliche Marker) kostet typischerweise 300-500 EUR. Für Zuchtkandidaten oder hochpreisige Freizeitpferde ist dieses Investment essentiell und sollte Teil der Ankaufsuntersuchung sein. Gute Züchter haben ihre Tiere bereits getestet und stellen die Ergebnisse gerne zur Verfügung.
            </p>
          </section>

          {/* Barock vs. Sport-Friese Section */}
          <section id="barock-vs-sport" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Barock-Friese vs. Sport-Friese: Die zwei Typen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              In der modernen Friesenzucht haben sich zwei unterschiedliche Typen entwickelt: Der klassische Barock-Friese und der modernere Sport-Friese. Jeder Typ hat unterschiedliche Stärken und ist für verschiedene Ziele geeignet.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  Barock-Friese
                </h3>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li><strong>Körperbau:</strong> Massiv, kräftig, kompakt</li>
                  <li><strong>Behang:</strong> Üppig und sehr wallend</li>
                  <li><strong>Gewicht:</strong> Oft über 500 kg</li>
                  <li><strong>Bewegung:</strong> Korrekt, aber nicht besonders elastisch</li>
                  <li><strong>Einsatz:</strong> Kutschfahren, Shows, traditionelle Dressur</li>
                  <li><strong>Preis:</strong> Oft günstiger als Sport-Friesen</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  Sport-Friese
                </h3>
                <ul className="space-y-2 text-lg text-gray-700">
                  <li><strong>Körperbau:</strong> Eleganter, schlanker, höher im Viereck</li>
                  <li><strong>Behang:</strong> Moderater Behang, nicht so üppig</li>
                  <li><strong>Gewicht:</strong> 450-500 kg</li>
                  <li><strong>Bewegung:</strong> Bessere Gangarten, elastischer, rhythmischer</li>
                  <li><strong>Einsatz:</strong> Moderne Dressur, leichte Sprünge, Freizeitreiten</li>
                  <li><strong>Preis:</strong> Höher wegen besserer Reitqualitäten</li>
                </ul>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mt-8">
              <strong>Die wichtigste Frage:</strong> Möchtest du deinen Friesen fahren, reiten oder beide? Barock-Friesen sind Kutschpferde, die traditionell gezogen wurden. Sport-Friesen sind auf modernes Reiten optimiert. Für Anfänger und Freizeitreiter ist der Sport-Typ oft besser geeignet, da er mehr Elastizität und bessere Bewegungen hat.
            </p>
          </section>

          {/* Wo Friesen kaufen? */}
          <section id="wo-kaufen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Wo Friesen kaufen? Marktplätze und Verkäufer
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt verschiedene Wege, einen seriösen Friesen zu finden. Nicht alle Quellen sind gleich zuverlässig - achte auf Seriösität und offizielle Papiere.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Seriöse Kaufquellen
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <strong>KFPS-Online-Datenbank:</strong> Die offizielle Börse des Koninklijk Friesch Paarden Stamboek (KFPS.nl). Hier sind alle registrierten Züchter und Verkäufer gelistet. Vollständige Papiere garantiert, aber auch die teuersten Pferde.
              </li>
              <li className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <strong>Gestüte in Friesland (Niederlande):</strong> Die ursprüngliche Heimat der Friesen. Züchter vor Ort haben oft die beste Auswahl und können direkten Kontakt anbieten. Transport muss organisiert werden.
              </li>
              <li className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <strong>Spezialisierte deutsche Gestüte:</strong> Es gibt anerkannte Friesen-Zuchtbetriebe in Deutschland (besonders NRW und Bayern), die KFPS-zertifizierte Pferde züchten.
              </li>
              <li className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <strong>ehorses und PferdeMarkt:</strong> Spezialisierte Pferdehandelsplattformen mit Verifizierung und Käuferschutz. Gute Filteroptionen nach KFPS-Status.
              </li>
              <li className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <strong>Friesenpferde-Zuchtverband e.V. (Deutschland):</strong> Bietet Listen von zertifizierten Züchtern und organisiert teilweise auch Verkaufsveranstaltungen.
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Vorsicht bei diesen Quellen
            </h3>

            <ul className="space-y-3 text-lg text-gray-700">
              <li className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <strong>eBay Kleinanzeigen:</strong> Ungeeignet für teure Friesen. Hier verstecken sich oft Betrüger und unseriöse Verkäufer. Private Verkäufer können legitim sein, aber verlange immer die Papiere und eine AKU.
              </li>
              <li className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <strong>Facebook-Gruppen ohne Moderation:</strong> Keine Kontrolle über Verkäufer, hohe Betrugsquoten. Nutze nur moderierte, offizielle KFPS-Gruppen.
              </li>
              <li className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <strong>Privatverkäufe ohne Papiere:</strong> &quot;Günstige Schnäppchen&quot; ohne Papiere sind oft Pferde mit versteckten Problemen. Nicht züchtbar, keine Wiederkaufsmöglichkeiten.
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Checkliste vor dem Kauf
            </h3>

            <ul className="space-y-2 text-lg text-gray-700">
              <li>✓ Papiere prüfen: Sind KFPS-Dokumente vollständig und original?</li>
              <li>✓ Ancestry überprüfen: Lass die Abstammung im KFPS-Register nachlesen</li>
              <li>✓ Live sehen: Besichtige das Pferd persönlich, reite es, wenn möglich</li>
              <li>✓ AKU durchführen: Unerlässlich vor dem Kauf (800-1.500 EUR)</li>
              <li>✓ Gentests verlangen: Dwarfism- und Hydrocephalus-Tests sollten vorhanden sein</li>
              <li>✓ Video von Bewegungen: Lass dir Videos zeigen, bevor du das Pferd besuchst</li>
              <li>✓ Kaufvertrag: Mit vollständigen Bedingungen, Gewährleistung und Rückgaberecht</li>
            </ul>
          </section>

          {/* Preise Section */}
          <section id="preise" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Friesen-Preise und Zuchtlinien
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Preise für Friesenpferde variieren erheblich und hängen von mehreren Faktoren ab.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Preisbestimmende Kriterien
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• KFPS-Einstufung</li>
              <li>• Abstammungslinie</li>
              <li>• Ausbildungsstand</li>
              <li>• Exterieur und Bewegungsbild</li>
              <li>• Zuchtwert</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Friese mit Top-Abstammung und herausragenden Bewegungen kann schnell einen fünfstelligen Betrag kosten. Budgetiere realistisch und lass dich nicht von der barocken Schönheit blenden.
            </p>
          </section>

          {/* Disziplinen Section */}
          <section id="disziplinen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Friesen für verschiedene Disziplinen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Entgegen mancher Vorurteile sind Friesen keine reinen Schaupferde. Wer ein{' '}
              <LocalizedLink href="/pferd-kaufen/dressurpferd" className="text-brand hover:text-brand-dark underline">
                Dressurpferd sucht
              </LocalizedLink>, findet im Friesen einen idealen Partner. Sie eignen sich für verschiedene Reitdisziplinen:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Vielseitigkeit der Rasse
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Barocke Dressur</li>
              <li>• Freizeitreiten</li>
              <li>• Kutschfahren</li>
              <li>• Theater und Film</li>
              <li>• Leichte Gangarten-Dressur</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wichtig: Jedes Pferd ist individuell. Ein Ankaufstraining kann dir helfen, die tatsächlichen Stärken deines potenziellen Friesenpferdes zu erkennen.
            </p>
          </section>

          {/* Anfänger Section */}
          <section id="anfaenger" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Sind Friesen für Anfänger geeignet?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die ehrliche Antwort: Nein, Friesen sind nicht für absolute Anfänger geeignet. Dies ist eine wichtige Realität, die viele Pferdeliebhaber übersehen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Warum Friesen eine Herausforderung für Anfänger sind
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="border-l-4 border-amber-500 pl-4">
                <strong>Sensibles Temperament:</strong> Friesen reagieren feinfühlig auf Hilfen und Stimmungen des Reiters. Unsicherheit oder falsche Signale können zu Widerständen führen.
              </li>
              <li className="border-l-4 border-amber-500 pl-4">
                <strong>Hohe Energie:</strong> Diese Pferde haben viel Temperament und benötigen konsequente, faire Führung. Anfänger können diese Energie oft nicht richtig kanalisieren.
              </li>
              <li className="border-l-4 border-amber-500 pl-4">
                <strong>Große und kräftige Körper:</strong> Mit einem Gewicht von 450-550 kg ist ein Friese physisch anspruchsvoll zu bewältigen. Anfänger können in gefährliche Situationen geraten.
              </li>
              <li className="border-l-4 border-amber-500 pl-4">
                <strong>Hohe Unterhaltskosten:</strong> Die spezielle Pflege, Fütterung und mögliche gesundheitliche Probleme erfordern finanzielle Stabilität.
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Alternative für Anfänger
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Wenn du wirklich von Friesen träumst, aber noch Anfänger bist, gibt es bessere Wege:
            </p>

            <ul className="space-y-2 text-lg text-gray-700">
              <li>• <strong>Reitbeteiligung auf einem Friesen:</strong> Teile dir ein Friesen-Pferd mit einem erfahrenen Besitzer. So lernst du die Rasse kennen.</li>
              <li>• <strong>Unterricht mit Friesenpferden:</strong> Suche dir einen Reitbetrieb, der Schulpferde-Friesen hat und Anfängerlektionen anbietet.</li>
              <li>• <strong>Anfänger-freundliche Rassen erst:</strong> Lerne auf Pferden wie Haflingern, Tinkern oder stabilen Warmblütern, bevor du dich einem Friesen zuwendest.</li>
              <li>• <strong>Mit Trainer kaufen:</strong> Wenn du bereits fortgeschritten bist, kaufe einen Friesen zusammen mit deinem Trainer aus und mache ein Intensiv-Training.</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              Ein Friese braucht einen erfahrenen Partner. Die beste Freude mit dieser wunderbaren Rasse erhältst du, wenn du bereit bist, die nötige Erfahrung und Verständnis mitzubringen.
            </p>
          </section>

          {/* Behang und Mauke Section */}
          <section id="behang-mauke" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Behang und Mauke: Pflegeanforderungen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der charakteristische Behang ist eines der schönsten Merkmale eines Friesenpferdes - aber auch eine große Verantwortung. Mauke ist die häufigste Nebenwirkung mangelnder Behangpflege.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die tägliche Behangroutine
            </h3>

            <div className="bg-amber-50 p-6 rounded-lg space-y-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Täglich (30-45 Minuten):</h4>
                <ul className="space-y-2 text-lg text-gray-700 list-disc pl-5">
                  <li>Behang kämmen und entwirren mit breiter Bürste</li>
                  <li>Trocknung bei feuchtem Wetter (mit Handtuch trocknen)</li>
                  <li>Spezialshampoos bei Verschmutzung verwenden</li>
                  <li>Fesseln auf Rötung und Reizungen prüfen</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Wöchentlich:</h4>
                <ul className="space-y-2 text-lg text-gray-700 list-disc pl-5">
                  <li>Gründliches Waschen des Behangs mit warmem Wasser</li>
                  <li>Entfernung von Schlamm und Verschmutzungen</li>
                  <li>Massage der Fesseln zur Verbesserung der Zirkulation</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Monatlich:</h4>
                <ul className="space-y-2 text-lg text-gray-700 list-disc pl-5">
                  <li>Professionelle Behangpflege oder gründliches Home-Spa</li>
                  <li>Überprüfung auf erste Anzeichen von Mauke</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Was ist Mauke und wie vermeidet man sie?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Mauke ist eine chronische Dermatitis der Fesseln, verursacht durch Feuchtigkeit, Schmutz und Bakterien. Sie ist bei Friesen deutlich häufiger als bei anderen Rassen wegen des dichten Behangs.
            </p>

            <ul className="space-y-3 text-lg text-gray-700">
              <li className="bg-green-50 p-4 rounded-lg">
                <strong>Prävention #1 - Trockener Stall:</strong> Friesen brauchen trockene Box mit guter Einstreu. Feuchte Stallungen führen zu Mauke.
              </li>
              <li className="bg-green-50 p-4 rounded-lg">
                <strong>Prävention #2 - Behangschoner:</strong> Für Winter oder feuchte Perioden: spezielle Behangschoner mit Reißverschluss schützen vor Nässe.
              </li>
              <li className="bg-green-50 p-4 rounded-lg">
                <strong>Prävention #3 - Spezialshampoos:</strong> Regelmäßige Verwendung von antiseptischen Behangshampos (mit Teebaum oder Aloe-Vera).
              </li>
              <li className="bg-green-50 p-4 rounded-lg">
                <strong>Prävention #4 - Regelmäßige Kontrolle:</strong> Tägliche Überprüfung auf rote Flecken oder Schwellungen. Frühe Erkennung verhindert schlimme Verläufe.
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kosten und Produkte
            </h3>

            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Spezial-Behangshampo: 15-30 EUR pro Liter</li>
              <li>• Behangschoner (Paar): 80-150 EUR</li>
              <li>• Professionelle Behangpflege/Spa: 100-200 EUR pro Besuch</li>
              <li>• Hochwertige Bürsten und Kämme: 30-80 EUR</li>
              <li>• Tierärztliche Mauke-Behandlung: 200-500 EUR (falls nötig)</li>
            </ul>
          </section>

          {/* Friesen in Not Section */}
          <section id="friesen-in-not" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Friesen in Not: Rettung und Adoption
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt alternative Wege, einen Friesen zu bekommen - durch Adoption aus Tierschutz oder Friesenhilfe-Organisationen. Dies ist oft günstiger und hilft Pferden in schwierigen Situationen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Friesenhilfe-Organisationen in Deutschland
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <strong>Friesenhilfe e.V. Deutschland:</strong> Eine spezialisierte Organisation für Friesen in Not. Sie vermittelt Pferde an seriöse Privathalter oder Gnadenbrotplätze.
              </li>
              <li className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <strong>Tierschutzverbände:</strong> Größere Tierschutzorganisationen haben gelegentlich auch Friesen in ihren Beständen, die ein neues Zuhause suchen.
              </li>
              <li className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <strong>Gnadenbrotplatz-Netzwerke:</strong> Online-Portale verbinden Privathalter mit Pferden, die Gnadenbrotplätze brauchen.
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Vor- und Nachteile von Adoptionen
            </h3>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Vorteile</h4>
                <ul className="space-y-2 text-lg text-gray-700 list-disc pl-5">
                  <li>Drastisch reduzierte Adoptionsgebühren (100-500 EUR)</li>
                  <li>Moralische Genugtuung: Du hilfst einem Pferd in Not</li>
                  <li>Oft bereits trainiert und mit Erfahrung</li>
                  <li>Ausführliche Hintergrundberichte vom Tierheim</li>
                  <li>Nachbetreuung und Unterstützung von der Organisation</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Nachteile</h4>
                <ul className="space-y-2 text-lg text-gray-700 list-disc pl-5">
                  <li>Pferde können Verhaltensprobleme oder Traumata haben</li>
                  <li>Gesundheitliche Probleme sind oft vorhandenes Grund für die Abgabe</li>
                  <li>Ungewisse Abstammung und Papiere</li>
                  <li>Keine KFPS-Registrierung (nicht züchtbar)</li>
                  <li>Umgewöhnung und Retraining erforderlich</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Schutzgebühren und Kosten
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Friesenhilfe-Organisationen erheben meist eine Schutzgebühr von 100-500 EUR. Diese deckt Tierarztkosten und die Betreuung während des Aufenthalts. Die Gebühr ist deutlich niedriger als ein Zuchtkauf, garantiert aber nicht ein problemloses Pferd. Manche Friesen in Gnadenbrotplätzen haben langfristige Verhaltens- oder Gesundheitsprobleme, die anhaltende Unterstützung erfordern.
            </p>
          </section>

          {/* Pflege Section */}
          <section id="pflege" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
              Pflege und Haltung von Friesen
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die charakteristische, wallende Mähne und der üppige Behang erfordern intensive Pflege. Plane täglich mindestens 30 Minuten zusätzlich für die Fellpflege ein. Die empfindlichen Fesseln benötigen besondere Aufmerksamkeit, um Mauke und andere Hautprobleme zu vermeiden. Regelmäßiges Waschen und Trocknen des Behangs ist essentiell.
            </p>
          </section>

          {/* Checkliste Section */}
          <section id="checkliste" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
              Checkliste für den perfekten Friese-Kauf
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bevor du einen Friese kaufst, solltest du folgende Punkte unbedingt berücksichtigen:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Vollständige tierärztliche Untersuchung</li>
              <li>• Überprüfung der KFPS-Papiere</li>
              <li>• Bewertung des Bewegungspotenzials</li>
              <li>• Charaktertest und Wesensbeurteilung</li>
              <li>• Budget für Pflege und Training einplanen</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Investiere Zeit in die Auswahl - ein Friese wird zu deinem treuen Begleiter und Partner.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Weitere allgemeine Tipps zum Pferdekauf findest du in unserem <LocalizedLink href="/pferd-kaufen" className="text-brand hover:text-brand-dark underline">umfassenden Ratgeber zum Pferd kaufen</LocalizedLink>.
            </p>
          </section>

          {/* Training Section */}
          <section id="training" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
              Training und Vorbereitung vor dem Friese-Kauf
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Bevor du einen Friese kaufst, solltest du deine Reitfähigkeiten und Erwartungen ehrlich einschätzen. Friesen sind keine Einsteigerpferde. Sie benötigen:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Fortgeschrittene Reitkenntnisse</li>
              <li>• Erfahrung mit energievollen und sensiblen Pferderassen</li>
              <li>• Zusätzliche Reittrainings speziell für Friesen</li>
              <li>• Mentale und körperliche Fitness für anspruchsvolle Trainings</li>
            </ul>
          </section>

          {/* Kosten Section */}
          <section id="kosten" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
              Kosten und Finanzplanung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kauf eines Friesenpferdes ist eine erhebliche finanzielle Investition. Eine detaillierte Übersicht zu{' '}
              <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand hover:text-brand-dark underline">
                allen Kosten beim Pferdekauf
              </LocalizedLink>{' '}
              findest du in unserem separaten Ratgeber. Berücksichtige folgende Kostenaspekte:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Kaufpreis: 5.000 - 50.000 € je nach Qualität</li>
              <li>• Monatliche Unterhaltskosten: ca. 500 - 1.000 €</li>
              <li>• Spezielle Ausbildung und Training</li>
              <li>• Spezifische Gesundheitsvorsorge</li>
              <li>• Versicherungen</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Zusätzliche Kaufüberlegungen
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Beim Friese-Kauf spielen auch weniger offensichtliche Faktoren eine Rolle:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Zukünftige Nutzungsart (Sport, Freizeit, Zucht)</li>
              <li>• Unterhaltskosten und Versorgungsmöglichkeiten</li>
              <li>• Kompatibilität mit deinem Reitstil und Erfahrungsniveau</li>
              <li>• Langfristige Gesundheits- und Trainingsaussichten</li>
            </ul>
          </section>

          {/* Investition Section */}
          <section id="investition" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
              Der Friese als Investition - Wertbeständigkeit und Zukunftspotenzial
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Friesenpferd ist mehr als ein Haustier - es ist eine potenzielle Wertanlage. Faktoren, die den langfristigen Wert beeinflussen:
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Abstammungslinie und KFPS-Zertifizierung</li>
              <li>• Erfolge in Turnieren oder Zucht</li>
              <li>• Gesundheitszustand und Trainingsstand</li>
              <li>• Seltenheit und Qualität der Blutlinie</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              In der Pferdewelt gehören gut gezüchtete Friesen zu den begehrtesten und wertbeständigsten Rassen. Eine kluge Investition kann sich über Jahre hinweg auszahlen.
            </p>

            {/* Strategic CTA Box */}
            <RatgeberHighlightBox
              title="Möchtest du den Wert deines Friesenpferdes präzise ermitteln?"
              icon={sparklesIcon}
            >
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Nutze unsere KI-gestützte Bewertung für eine objektive Einschätzung in nur 2 Minuten. Perfekt für Kaufentscheidungen oder Wertermittlung.
              </p>
              <LocalizedLink 
                href="/pferde-preis-berechnen" 
                className="inline-block bg-brand-brown text-white px-6 py-2 rounded-lg hover:bg-brand-brownDark transition-colors"
              >
                Jetzt Pferdewert berechnen
              </LocalizedLink>
            </RatgeberHighlightBox>
          </section>

          {/* Rechtliche Section */}
          <section id="rechtliche" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand">
              Rechtliche Aspekte beim Friese-Kauf
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Auf dem Weg zum Friesen-Besitz gibt es wichtige rechtliche Punkte zu beachten. Informiere dich vorab über die wichtigsten Vertragsinhalte in unserem{' '}
              <LocalizedLink href="/pferd-kaufen/kaufvertrag" className="text-brand hover:text-brand-dark underline">
                Ratgeber zum Pferdekaufvertrag
              </LocalizedLink>.
            </p>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>• Kaufvertrag mit detaillierten Angaben zur Abstammung</li>
              <li>• Gesundheitszeugnis und tierärztliche Untersuchung</li>
              <li>• Überprüfung der KFPS-Papiere</li>
              <li>• Vereinbarungen zur Gewährleistung</li>
              <li>• Mögliche Vereinbarungen zum Wiederkaufsrecht</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein sorgfältig formulierter Kaufvertrag schützt beide Parteien und schafft Klarheit in allen wesentlichen Aspekten des Pferdehandels.
            </p>
          </section>

          {/* Conclusion */}
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Fazit
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kauf eines Friesenpferdes ist eine Herzensangelegenheit und eine professionelle Entscheidung zugleich. Lass Emotion und Verstand gleichermaßen sprechen. Bedenke, dass ein Friese nicht nur ein Pferd ist, sondern ein lebendiges Kunstwerk mit eigener Persönlichkeit, das Hingabe und Verständnis braucht.
            </p>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
            <div className="max-w-3xl mx-auto">
              <FAQ
                faqs={faqItems}
                sectionTitle="Häufig gestellte Fragen"
                sectionSubtitle="Die wichtigsten Antworten zu KFPS-Papieren, Gesundheit und Haltung beim Friese-Kauf"
                withSchema={false}
              />
            </div>
          </section>

          {/* Author Box */}
          <AuthorBox />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <RatgeberRelatedArticles
              title="Weitere hilfreiche Artikel"
              articles={relatedArticles}
              description="Vertiefe dein Wissen über Pferdekauf und verschiedene Rassen."
            />
          )}

          {/* Final CTA */}
          <RatgeberFinalCTA
            image={{
              src: '/images/shared/blossi-shooting.webp',
              alt: 'Professionelle Pferdebewertung mit KI',
              width: 1200,
              height: 800
            }}
            title="Bereit für deinen Friesen?"
            description="Ermittle den fairen Wert deines Wunschpferdes mit unserer KI-gestützten Bewertung in nur 2 Minuten. Objektiv, transparent und wissenschaftlich fundiert."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Jetzt Pferdewert berechnen"
          />
        </div>
      </article>
    </Layout>
  );
}