import LocalizedLink from '@/components/LocalizedLink';
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
import { Sparkles, Award, AlertTriangle, FileCheck } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const awardIcon = <Award className="w-5 h-5" />;
const alertIcon = <AlertTriangle className="w-5 h-5" />;
const fileCheckIcon = <FileCheck className="w-5 h-5" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Fohlen kaufen: Kompletter Ratgeber 2025 | PferdeWert.de',
    description: 'Fohlen kaufen leicht gemacht: Ratgeber mit Marktplätzen, Preisen, Gesundheitschecks, Rechtlichem. Schritt-für-Schritt Anleitung + Checkliste für sicheren Kauf.',
    keywords: 'fohlen kaufen, fohlenkauf, fohlen preis, wo fohlen kaufen, absetzer, jährling, fohlen gesundheit',
    ogTitle: 'Fohlen kaufen: Kompletter Ratgeber 2025',
    ogDescription: 'Fohlen kaufen: Marktplätze, Preise, Gesundheit, Recht. Praktische Checkliste für sichere Fohlenkäufe.',
    twitterTitle: 'Fohlen kaufen: Kompletter Ratgeber 2025',
    twitterDescription: 'Fohlen kaufen mit Sicherheit: Guide zu Marktplätzen, Preisen und Gesundheitschecks.',
  },
  at: {
    title: 'Fohlen kaufen in Österreich: Kompletter Ratgeber | PferdeWert.at',
    description: 'Fohlen kaufen in Österreich: Ratgeber mit österreichischen Marktplätzen, Euro-Preisen, Gesundheitschecks. Schritt-für-Schritt + Checkliste für AT-Käufer.',
    keywords: 'fohlen kaufen österreich, fohlenkauf, österreichische marktplätze, pferd kaufen at',
    ogTitle: 'Fohlen kaufen in Österreich: Kompletter Ratgeber',
    ogDescription: 'Fohlen kaufen für Österreicher: Marktplätze, Preise in €, Gesundheitschecks, Rechtliches für AT.',
    twitterTitle: 'Fohlen kaufen in Österreich: Ratgeber 2025',
    twitterDescription: 'Fohlen kaufen für österreichische Pferdefreunde: Marktplätze, Preise, Tipps für AT.',
  },
  ch: {
    title: 'Fohlen kaufen in der Schweiz: Kompletter Ratgeber | PferdeWert.ch',
    description: 'Fohlen kaufen in der Schweiz: Ratgeber mit CH-Marktplätzen, CHF-Preisen, Gesundheitschecks. Praktische Checkliste für Schweizer Fohlenkäufer.',
    keywords: 'fohlen kaufen schweiz, fohlenkauf ch, schweizer pferdemarkt, jungpferd schweiz',
    ogTitle: 'Fohlen kaufen in der Schweiz: Kompletter Ratgeber',
    ogDescription: 'Fohlen kaufen für die Schweiz: Schweizer Marktplätze, CHF-Preise, Gesundheit, Rechtliches für CH.',
    twitterTitle: 'Fohlen kaufen in der Schweiz: Ratgeber 2025',
    twitterDescription: 'Fohlen kaufen für Schweizer Pferdefreunde: Marktplätze, CHF-Preise, Tipps für CH.',
  },
};

export default function FohlenKaufen() {
  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: '/pferde-preis-berechnen',
    icon: sparklesIcon,
  };

  const sections = [
    { id: 'marktplaetze', title: 'Wo Fohlen kaufen – Die besten Marktplätze' },
    { id: 'preise', title: 'Kaufpreis verstehen – Faktoren und Preis-Matrix' },
    { id: 'zeitpunkt', title: 'Der richtige Zeitpunkt: Säugling, Absetzer oder Jährling?' },
    { id: 'gesundheit', title: 'Gesundheit und Tierärztliche Untersuchung' },
    { id: 'rechtliches', title: 'Rechtliche Absicherung und Kaufvertrag' },
    { id: 'checkliste', title: 'Praktische Checkliste: Was vor dem Kauf prüfen' },
    { id: 'kosten', title: 'Finanzierungsoptionen und versteckte Kosten' },
    { id: 'nachbetreuung', title: 'Nachbetreuung: Die ersten Monate nach Kauf' },
    { id: 'faq', title: 'Häufige Fragen zum Fohlenkauf' },
  ];

  const faqItems = [
    {
      question: 'Wann sollte man Fohlen kaufen?',
      answer:
        'Das optimale Kauffenster ist der Absetzer (8–12 Monate) – alt genug, um Transportstress zu verkraften, jung genug für Training. Der Charakter zeigt sich bereits deutlich, und die Preisspanne (€1.500–€3.500) ist ideal. Säuglinge (0–6 Monate) sind nur für Züchter oder erfahrene Reiter geeignet. Jährling (12–24 Monate) für risikoaverse Käufer. Zeitpunkt im Jahr: Frühjahr (März–April) beste Auswahl, teurer. Herbst günstiger, weniger Auswahl.',
    },
    {
      question: 'Was kostet ein gutes Fohlen?',
      answer:
        'Warmblut-Fohlen (Hannoveraner, Oldenburger): €2.000–€8.000. Spezialrassen (Friese, Haflinger): €1.500–€5.000. Freizeitfohlen: €800–€2.000. Preise unter €300–€600 sind RED FLAG (Schlachtmarkt-Indikator). Zusätzliche Kosten: Transport (€500–€2.000), Tierarzt (€200–€400), Versicherung (€20–€50/Monat), Haltung Jahr 1 (€100–€300/Monat). Realistisches 5-Jahres-Budget: €15.000–€30.000.',
    },
    {
      question: 'Wie erkenne ich ein gutes Fohlen?',
      answer:
        'Physisch: Klare Augen, normales Laufen ohne Lahmheit, Nabel integriert, gutes Fell. Verhaltensmäßig: Vertrauensvoll (keine Menschenangst), neugierig, nicht aggressiv. Rote Flaggen zu vermeiden: Augentränfluss (ERU-Zeichen), Lahmheit, Bewegungsunregelmäßigkeiten, Angststörung (teuer zu beheben). Immer essentiell: Tierärztliche Ankaufsuntersuchung durchführen BEVOR du kaufst – nicht danach!',
    },
    {
      question: 'Brauche ich einen Kaufvertrag beim Fohlenkauf?',
      answer:
        'JA, absolut essentiell – auch bei Privatverkauf. Der Vertrag MUSS enthalten: Identifikation (Name, Rasse, Alter, Chip-Nr., Equidenpass-Nr.), Kaufpreis und Zahlungsbedingungen, Gewährleistungsfrist (mindestens 6 Monate), Rückgaberecht (Probierzeit?), Equidenpass-Übergabe, Haftung für Transportschäden. Fachanwalt für Tierkauf (€150–€300) empfohlen für Fohlen >€2.000. Verkäufer, die einen Vertrag ablehnen, sind Warnsignal – nicht kaufen!',
    },
    {
      question: 'Wo kann ich Fohlen online kaufen?',
      answer:
        'Größte Marktplätze: ehorses.de (1.600+ Inserate, Gütesiegel-System), pferde.de (gute Filter, solide Auswahl), kleinanzeigen.de (Privatverkäufer, günstiger), deine-tierwelt.de (mittlere Auswahl). Spezialisiert: fohlenborse.de (Züchter-fokussiert), FN-registrierte Züchter direkt. Direktkauf beim Züchter oft günstiger, aber erfordert Recherche. Sicherheit: Nur Marktplätze mit Käufer-Schutz nutzen!',
    },
    {
      question: 'Was ist die teuerste OP beim Pferd?',
      answer:
        'Kolik-OPs sind oft teuer (€2.000–€5.000). Für Fohlen spezifisch: Orthopädische OPs (OCD-Entfernung, Gelenkspülungen) = €1.500–€3.000+. Augenoperationen (ERU-bedingt) = €500–€2.000. Daher: Krankenversicherung SOFORT nach Kauf abschließen (spart Tausende später). Eine OP-Versicherung kostet €20–€50/Monat für Fohlen und ist eine der besten Investitionen.',
    },
    {
      question: 'Kann man Pferde vom Schlachter kaufen?',
      answer:
        'Ja, es gibt Rettungsorganisationen wie fohlenrettung-swg.de, die Fohlen vor dem Schlachtmarkt bewahren. Preise sind deutlich günstiger (€300–€800). ABER: Die medizinische Vorgeschichte ist oft unbekannt, psychologische Traumata möglich, Risiken höher. Nicht ideal für Anfänger. Für Anfänger: eher seriöse Züchter oder etablierte Marktplätze mit Käufer-Schutz vertrauen.',
    },
    {
      question: 'Was sind rote Flaggen beim Fohlenkauf?',
      answer:
        'Warnsignale zum sofortigen Kaufabbruch: 1. Sehr niedriger Preis (€300–€600) = Schlachtmarkt-Indikator. 2. Verkäufer verweigert Vet-Check = Deal-Stopper. 3. Fohlen-Angst vor Menschen = Sozialisierungs-Defizit (teuer zu beheben). 4. Augentränfluss oder Augen-Schwellungen = ERU (chronisch, teuer). 5. Lahmheit oder Bewegungsunregelmäßigkeiten = Beinprobleme oder Gelenkerkrankung. 6. Verweigerte Abstammungs-Papiere = rechtliche Risiken. Immer fragen: „Kann ich meinen Tierarzt mitbringen?" – seriöse Verkäufer erlauben das!',
    },
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('fohlen').map((entry) => ({
    href: getRatgeberPath(entry.slug),
    image: entry.image,
    title: entry.title,
    badge: entry.category,
    readTime: entry.readTime,
    description: entry.description,
  }));

  return (
    <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
      <RatgeberHead
        slug="fohlen"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/braunes-fohlen-stute-weide-irland.webp"
        locales={seoLocales}
        datePublished="2025-12-13"
        wordCount={3200}
        breadcrumbTitle="Fohlen kaufen"
        faqItems={faqItems}
        noindex={true}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Kauf & Verkauf"
          badgeIcon={awardIcon}
          title="Fohlen kaufen: Der komplette Ratgeber 2025"
          subtitle="Ein Fohlen zu kaufen ist verlockend – doch der Fohlenkauf ist medizinisch komplexer und rechtlich tückischer, als viele erwarten. Dieser Ratgeber zeigt dir alle Schritte: von Marktplätzen über Preise bis zum Kaufvertrag."
          readTime="16 Min."
          publishDate="Dezember 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/braunes-fohlen-stute-weide-irland.webp"
          alt="Braunes Fohlen mit Stute auf einer grünen Weide in Irland"
          priority={true}
          objectPosition="center 40%"
          attribution={{
            author: 'William Murphy',
            license: 'CC BY-SA 2.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
            source: 'Wikimedia Commons'
          }}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">
          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Fohlen kaufen</strong> ist verlockend – schließlich kostet ein junges Pferd
              deutlich weniger als ein ausgewachsenes. Doch hier lauert ein großes Risiko: Der
              Fohlenkauf ist medizinisch komplexer und rechtlich tückischer, als viele Anfänger
              erwarten. Versteckte Krankheiten, unbekannte Charakterzüge und mangelnde Absicherung
              können Jahre später zu teuren Problemen führen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dieser Ratgeber zeigt dir alle Schritte vom ersten Gedanken bis zum Kaufvertrag. Du
              erfährst, wo die besten Marktplätze sind, welche Preise realistisch sind, worauf
              Tierärzte beim Gesundheitscheck achten, und wie du dich rechtlich absicherst. Mit
              praktischer Checkliste und klaren Empfehlungen. Für einen umfassenden Überblick über
              den gesamten Pferdekauf-Prozess lies auch unseren{' '}
              <LocalizedLink
                href="/pferd-kaufen"
                className="text-brand hover:text-brand-dark underline"
              >
                ultimativen Pferdekauf-Ratgeber
              </LocalizedLink>
              .
            </p>
          </section>

          {/* Section: Marktplätze */}
          <section id="marktplaetze" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Wo Fohlen kaufen – Die besten Marktplätze und Börsen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Deine erste Frage: Wo findest du überhaupt ein seriöses Fohlen? Die gute Nachricht –
              es gibt mehrere bewährte Kanäle.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Online-Marktplätze für Fohlenverkauf
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>ehorses.de</strong> ist derzeit der größte Fohlen-Marktplatz im
              deutschsprachigen Raum mit etwa 1.600+ Inseraten. Das Gütesiegel-System für
              vertrauenswürdige Verkäufer und umfangreiche Filter-Optionen machen es zum Standard
              für Käufer. <strong>pferde.de</strong> bietet ebenfalls eine solide Auswahl mit sehr
              guten Such-Filtern – besonders praktisch für spezifische Rassen oder Altersklassen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Kleinanzeigen.de</strong> wird oft unterschätzt, eignet sich aber besonders
              für Privatverkäufer und kleinere Züchter. Spezialisierte Fohlenbörsen wie
              fohlenborse.de richten sich eher an Züchter, zeigen dir aber auch hochwertige,
              dokumentierte Fohlen mit Stammbaum. Mehr zu allen Plattformen findest du in unserem{' '}
              <LocalizedLink
                href="/pferde-ratgeber/pferdemarkt"
                className="text-brand hover:text-brand-dark underline"
              >
                umfassenden Pferdemarkt-Guide
              </LocalizedLink>
              .
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Direkter Kauf beim Züchter
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein seriöser Züchter bietet immense Vorteile: Du kennst die komplette
              Gesundheitshistorie, erhältst persönliche Beratung und verhandelst oft bessere Preise.
              Die Identifikation von seriösen Züchtern ist allerdings entscheidend. Achte auf:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>FN-Stutbuch-Eintrag</strong> (Zuchtverband der Deutschen Reiterlichen
                Vereinigung) – das ist das Vertrauens-Siegel
              </li>
              <li>
                • <strong>Betriebsbesichtigungen</strong>, die erlaubt sind – seriöse Züchter laden
                dich zur Stallbesichtigung ein
              </li>
              <li>
                • <strong>Referenzen von bisherigen Käufern</strong>, die du kontaktieren kannst
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Fohlenrettung und Adoptionstiere
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt Rettungsorganisationen wie fohlenrettung-swg.de, die Fohlen vor dem
              Schlachtmarkt bewahren. Preise sind deutlich günstiger, oft €300–€800. Aber die
              medizinische Vorgeschichte ist häufig unbekannt, das Risiko höher. Für absolute
              Anfänger meist nicht ideal.
            </p>
          </section>

          {/* Section: Preise */}
          <section id="preise" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kaufpreis verstehen – Faktoren und Preis-Matrix
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das Preis-Wirrwarr beim Fohlenkauf verwirrt viele Erstkäufer. Lass mich klare Zahlen
              geben.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Was kostet ein Fohlen? Realistische Preise 2025
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die gängigen Spannbreiten (basierend auf aktueller Marktanalyse ehorses.de und
              pferde.de):
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Warmblut-Fohlen</strong> (Hannoveraner, Oldenburger): €2.000–€8.000
              </li>
              <li>
                • <strong>Spezialrassen</strong> (Friese, Haflinger): €1.500–€5.000
              </li>
              <li>
                • <strong>Einfache Freizeitfohlen</strong>: €800–€2.000
              </li>
              <li>
                • <strong>RED FLAG Preis</strong>: €300–€600 deutet auf Schlachtmarkt-Kandidaten hin
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Der Preis ist nicht einfach verhandelbar – er zeigt die Qualität und Zukunftsvision
              für das Fohlen. Mehr zur Preiseinschätzung findest du in unserem Ratgeber{' '}
              <LocalizedLink
                href="/pferde-ratgeber/was-kostet-ein-pferd"
                className="text-brand hover:text-brand-dark underline"
              >
                Was kostet ein Pferd?
              </LocalizedLink>
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Einflussfaktoren auf den Preis
            </h3>
            <ol className="space-y-4 text-lg text-gray-700 list-decimal list-inside">
              <li>
                <strong>Rasse und Zuchtrichtung</strong>: Ein Hannoveraner Dressur-Fohlen von guter
                Linie kostet mehr als ein einfaches Freizeitfohlen. Spezialrassen (Friesen) haben
                eigenständige Marktsegmente.
              </li>
              <li>
                <strong>Abstammung und Pedigree</strong>: Ist der Vater ein renommierter Hengst? Das
                bedeutet oft €500–€2.000 Preisaufschlag.
              </li>
              <li>
                <strong>Alter und Entwicklungsstand</strong>: Ein Säugling kostet weniger als ein
                Absetzer, der Absetzer weniger als ein Jährling.
              </li>
              <li>
                <strong>Individuelle Merkmale</strong>: Rasse-Reinheit, Farbe, erkennbares
                Größenpotenzial – all diese Faktoren beeinflussen den Preis.
              </li>
            </ol>
          </section>

          {/* CTA Box 1: KI-Bewertung */}
          <RatgeberHighlightBox title="Objektive Preisbewertung in 2 Minuten" icon={awardIcon}>
            <p className="text-base text-gray-700 mb-4">
              Unsicher, ob der Preis fair ist? PferdeWerts KI-gestützte Analyse vergleicht das Pferd
              mit aktuellen Marktpreisen und liefert dir eine fundierte Einschätzung – objektiv und
              unabhängig.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Jetzt Pferdewert berechnen
              <Sparkles className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Zeitpunkt */}
          <section id="zeitpunkt" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Der richtige Zeitpunkt: Säugling, Absetzer oder Jährling?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht alle Fohlen-Alter sind gleich geeignet für Käufer. Hier meine ehrliche
              Bewertung.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Säugling (0–6 Monate): Kaufen mit Muttermare?
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteile:</strong> Natürliche Haltung mit Mutter, Mutter liefert Milch (keine
              Flaschenaufzucht nötig), deutlich günstiger (€500–€1.500).
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Nachteile:</strong> Mutter muss mitgekauft oder angemietet werden, längerer
              Investitionshorizont (4–5 Jahre bis Reitbarkeit), höhere Verantwortung und
              medizinische Risiken.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Fazit:</strong> Ideal nur für Züchter oder sehr erfahrene Reiter.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Absetzer (8–12 Monate): Der Goldstandard
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Absetzer ist das ideale Kauffenster für die meisten Käufer:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Reif genug</strong>, um Transportstress zu verkraften
              </li>
              <li>
                • <strong>Charakter zeigt sich</strong> bereits
              </li>
              <li>
                • <strong>Preis-Fenster ideal</strong> (€1.500–€3.500)
              </li>
              <li>• Beginnt, von der Mutter unabhängig zu werden</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Aber: Du benötigst gute Stallinfrastruktur und solides Fütterungswissen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Jährling (12–24 Monate): Training möglich
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Vorteile:</strong> Größer und robuster, kann bereits Grundausbildung
              (Longenarbeit) erhalten, Charakter ist stabil und zeigt sich deutlich.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Nachteile:</strong> Deutlich teurer (€2.500–€5.000+) – du bezahlst für
              investierte Zeit. Weniger &quot;Potential&quot; wahrnehmbar, da bereits entwickelt.
            </p>
          </section>

          {/* Section: Gesundheit */}
          <section id="gesundheit" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Gesundheit und Tierärztliche Untersuchung beim Fohlenkauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die Ankaufsuntersuchung (AKU) ist nicht optional – sie ist MUSS. Punkt. In unserem{' '}
              <LocalizedLink
                href="/pferde-ratgeber/aku-pferd"
                className="text-brand hover:text-brand-dark underline"
              >
                detaillierten AKU-Ratgeber
              </LocalizedLink>{' '}
              erfährst du alles über Ablauf, Bewertung und wie Befunde den Pferdewert beeinflussen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Die Ankaufsuntersuchung – Schritt für Schritt
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein erfahrener Tierarzt untersucht externe Faktoren (€200–€400):
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Körper-Inspektion</strong>: Allgemeiner Zustand, Fell, Hufe
              </li>
              <li>
                • <strong>Lauffähigkeit</strong>: Trottest auf harter und weicher Fläche
              </li>
              <li>
                • <strong>Herz-Lungen-Auskultation</strong>: Herzrhythmus, Atemgeräusche
              </li>
              <li>
                • <strong>Zahnuntersuchung</strong>: Altersgerechte Zahnentwicklung
              </li>
              <li>
                • <strong>Hufqualität</strong>: Hornstruktur, mögliche Probleme
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              <strong>Optional (aber empfohlen):</strong> Röntgen-Screening der Beine/Becken
              (+€300–€500) und Bluttest auf latente Infektionen. Eine{' '}
              <LocalizedLink
                href="/pferde-ratgeber/aku-pferd/kosten"
                className="text-brand hover:text-brand-dark underline"
              >
                detaillierte Kostenaufschlüsselung
              </LocalizedLink>{' '}
              hilft dir bei der Budgetplanung.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Fohlen-spezifische Untersuchungen
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Nabelbruch-Kontrolle</strong> (bis 2–3 Monate oft selbstheilend)
              </li>
              <li>
                • <strong>Augenkrankheit-Screening</strong> (ERU – equine recurrent uveitis)
              </li>
              <li>
                • <strong>Wachstumsstörungen</strong> (OCD – Osteochondritis Dissecans)
              </li>
            </ul>
          </section>

          {/* CTA Box 2: Rote Flaggen */}
          <RatgeberHighlightBox title="Rote Flaggen beim Fohlenkauf" icon={alertIcon}>
            <p className="text-base text-gray-700 mb-4">
              Einige Warnsignale sollten dich sofort zum Kaufabbruch bewegen:
            </p>
            <ul className="space-y-2 text-base text-gray-700">
              <li>• Sehr niedriger Preis (€300–€600) = Schlachtmarkt-Indikator</li>
              <li>• Verkäufer verweigert Vet-Check = sofortiger Deal-Stopper</li>
              <li>• Fohlen-Angst vor Menschen = Sozialisierungs-Defizit</li>
              <li>• Augentränfluss oder Augen-Schwellungen = ERU (chronisch, teuer)</li>
              <li>• Lahmheit oder Bewegungsunregelmäßigkeiten = Beinprobleme</li>
              <li>• Verweigerte Abstammungs-Papiere = rechtliche Risiken</li>
            </ul>
          </RatgeberHighlightBox>

          {/* Section: Rechtliches */}
          <section id="rechtliches" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Rechtliche Absicherung und Kaufvertrag für Fohlen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist die am meisten unterschätzte Komponente beim Fohlenkauf. Rechtliche Klarheit
              schützt dich vor teuren Überraschungen. Unser{' '}
              <LocalizedLink
                href="/pferd-kaufen/kaufvertrag"
                className="text-brand hover:text-brand-dark underline"
              >
                Pferdekaufvertrag-Ratgeber
              </LocalizedLink>{' '}
              erklärt alle Details.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Der Kaufvertrag – Muss-Elemente
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein solider Kaufvertrag MUSS folgendes enthalten:
            </p>
            <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
              <li>
                <strong>Identifikation</strong>: Name, Rasse, Alter, Farbe, Abzeichen, Chip-Nr.,
                Equidenpass-Nr.
              </li>
              <li>
                <strong>Kaufpreis und Zahlungsbedingungen</strong>: Anzahlung? Ratenzahlung?
              </li>
              <li>
                <strong>Gewährleistungsfrist</strong>: Gesetzlich 6 Monate, oft verkürzt –
                verhandle für min. 6 Monate
              </li>
              <li>
                <strong>Rückgaberecht</strong>: Probierzeit? Typischerweise 2 Wochen. Kosten bei
                Rückgabe?
              </li>
              <li>
                <strong>Haftung für Transportschäden</strong>
              </li>
              <li>
                <strong>Equidenpass-Übergabe und Chip-Umregistrierung</strong>
              </li>
            </ol>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Equidenpass und offizielle Dokumentation
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Equidenpass ist nicht optional – ohne ihn kann das Fohlen nicht verkauft,
              versichert oder geritten werden. Der Pass muss enthalten: Identifikation (Foto,
              Abzeichen, Chip-Daten), Impfhistorie (muss aktuell sein) und Behandlungs-Logbuch.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Der Verkäufer MUSS den Pass übergeben – nicht einbehalten!</strong> Wenn der
              Pass fehlt: NICHT KAUFEN. Es sei denn, du verhandelst eine massive Preisreduktion und
              der Verkäufer verspricht, den Pass zu beantragen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gewährleistung und Verbraucherschutz
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das BGB (Bürgerliches Gesetzbuch, §474–479) regelt Kaufrecht: Standard-Gewährleistung
              beträgt 6 Monate (oft verkürzt auf 2–4 Wochen). Ein Mangel ist eine latente
              Erkrankung, die bei Übergabe bereits bestand. Normale Alters- oder
              Entwicklungs-Variationen gelten NICHT als Mangel.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Für Fohlen {'>'}€2.000 empfehle ich: <strong>Fachanwalt für Tierkauf konsultieren</strong>{' '}
              (€150–€300). Das spart dir potenziell Tausende.
            </p>
          </section>

          {/* Section: Checkliste */}
          <section id="checkliste" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Praktische Checkliste: Was vor dem Kauf prüfen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hier ist deine Schritt-für-Schritt Checkliste zum Abhaken.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Online-Phase
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>☐ Inserat gründlich lesen (Rasse, Alter, Abstammung, Preis realistisch?)</li>
              <li>☐ Verkäufer-Profil prüfen (Rating, Bewertungen?)</li>
              <li>☐ Referenzen erfragen – andere Käufer kontaktieren</li>
              <li>
                ☐ Betrug-Warnsignale identifizieren (Stock-Photos, zu billiger Preis, gestohlene
                Texte)
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Bei Besichtigung
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>☐ Stallbedingungen anschauen (sauber, sicher, fohlen-gerecht?)</li>
              <li>☐ Interaktion Fohlen-Mensch beobachten (vertrauensvoll oder verängstigt?)</li>
              <li>☐ Bewegung checken (normales Trotting auf Weide?)</li>
              <li>☐ Mutter sehen (wenn Säugling)</li>
              <li>☐ Ursprungspapiere zeigen lassen</li>
              <li>☐ Fotos/Videos der Besichtigung machen</li>
              <li>
                ☐ Frage: &quot;Kann ich meinen Tierarzt mitbringen?&quot; – seriöse Verkäufer erlauben das
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Nach Kaufvertrag
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>☐ Tierärztliche Ankaufsuntersuchung SOFORT terminieren</li>
              <li>☐ Transport arrangieren (mit Versicherung, nicht im eigenen Hänger)</li>
              <li>☐ Versicherung abschließen</li>
              <li>☐ Equidenpass-Chip-Umregistrierung durchführen</li>
              <li>☐ Post-Kauf-Support mit Verkäufer absprechen</li>
            </ul>
          </section>

          {/* CTA Box 3: Rechtliche Absicherung */}
          <RatgeberHighlightBox title="Rechtliche Absicherung ist essentiell" icon={fileCheckIcon}>
            <p className="text-base text-gray-700 mb-4">
              Kaufvertrag, AKU, Versicherungen – diese Punkte solltest du nie überspringen.
              PferdeWert hilft dir zusätzlich mit einer objektiven Bewertung, um teure Fehlkäufe zu
              vermeiden.
            </p>
            <LocalizedLink
              href="/pferd-kaufen/kaufvertrag"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Mehr zum Kaufvertrag
              <FileCheck className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Kosten */}
          <section id="kosten" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Finanzierungsoptionen und versteckte Kosten
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das Geld: Ein wichtiger Realitäts-Check.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Versteckte Kosten beim Fohlenkauf
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der Kaufpreis ist nur der Anfang! Viele Käufer übersehen die Zusatzkosten:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Transport</strong>: €500–€2.000 (abhängig von Entfernung und
                Hänger-Versicherer)
              </li>
              <li>
                • <strong>Tierärztliche Ankaufsuntersuchung</strong>: €200–€400
              </li>
              <li>
                • <strong>Versicherung</strong> (ideal sofort abschließen): €20–€50/Monat
              </li>
              <li>
                • <strong>Haltungskosten im ersten Jahr</strong>: €100–€300/Monat (Futter, Einstreu,
                Hufschmied)
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Realistische Kosten-Kalkulation über 5 Jahre
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein ehrliches Budget für ein gutes Fohlen (€2.000–€4.000):
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Kaufpreis</strong>: €1.500–€4.000
              </li>
              <li>
                • <strong>Transport</strong>: €800
              </li>
              <li>
                • <strong>Tierarzt</strong>: €300–€500 (Ankauf)
              </li>
              <li>
                • <strong>Jahr 1–2 Haltung</strong>: €1.200–€3.600/Jahr
              </li>
              <li>
                • <strong>Futter-Spezial</strong>: €60–€100/Monat
              </li>
              <li>
                • <strong>Hufschmied</strong>: €80–€120 alle 8–10 Wochen
              </li>
              <li>
                • <strong>Jahr 3–5 (optional Training)</strong>: €100–€300/Monat
              </li>
              <li>
                • <strong>Versicherung</strong>: €20–€50/Monat
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold mt-4">
              Gesamtbudget: €15.000–€30.000 über 5 Jahre.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Viele unterschätzen dies massiv. Sei ehrlich mit dir selbst.
            </p>
          </section>

          {/* Section: Nachbetreuung */}
          <section id="nachbetreuung" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Nachbetreuung: Die ersten Monate nach Kauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dein Fohlen ist bei dir angekommen – jetzt beginnt die kritische Phase.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Eingewöhnung und Sozialisierung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Der erste Monat ist entscheidend. Gib dem Fohlen:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Ruhige Stallumgebung</strong> mit bekannter Bezugsperson
              </li>
              <li>
                • <strong>Kontakt zu anderen Pferden</strong> (Sozialisierung ist essentiell)
              </li>
              <li>
                • <strong>Alltags-Handling</strong> üben (Hufbearbeitung, Tierarzt-Besuche,
                Transportladen)
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Ziel: Ein Gefühl von &quot;Ich bin sicher&quot; aufbauen statt Druck ausüben. Nach 2–3 Monaten
              können Absetzer/Jährling mit leichter Longenarbeit beginnen.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Fütterung und Wachstums-Management
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Kritisch</strong>: Zu schnelles Wachstum = OCD-Risiko.
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                • <strong>Fohlen-spezielle Rationen</strong> mit ausreichenden Mineralien
              </li>
              <li>
                • <strong>Calcium-Phosphor-Balance</strong> ist essentiell
              </li>
              <li>
                • <strong>Weidezugang {'>'}14 Std/Tag</strong> ideal
              </li>
              <li>
                • <strong>Tierarzt-Konsultation</strong> zur Wachstums-Kurve empfohlen
              </li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Impfplan und Parasitenbekämpfung
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Impfplan</strong>: Grundimmunisierung (Tetanus, Influenza) ab Woche 4–8.
              Equine-Herpesvirus und Rhinovirus optional aber empfohlen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Parasitenbekämpfung</strong>: Regelmäßige Wurm-Kuren alle 6–8 Wochen
              (Jungfohlen), später 1–2x/Jahr. Equidenpass muss sorgfältig gepflegt werden – alle
              Impfungen und Behandlungen eintragen.
            </p>
          </section>

          {/* Fazit */}
          <section className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Zusammenfassung: Dein Weg zum perfekten Fohlen
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fohlenkauf verlangt klare Planung. Die wichtigsten Punkte:
            </p>
            <ol className="space-y-4 text-lg text-gray-700 list-decimal list-inside">
              <li>
                <strong>Wähle dein Zeitfenster</strong>: Absetzer (8–12 Monate) ist der Goldstandard.
                Preis, Reife und Trainierbarkeit sind optimal ausbalanciert.
              </li>
              <li>
                <strong>Prüfe Marktplätze gründlich</strong>: ehorses, pferde.de, Kleinanzeigen –
                oder direkter Züchter. Vertraue auf Käufer-Schutz-Funktionen.
              </li>
              <li>
                <strong>Setze ein realistisches Budget</strong>: €15.000–€30.000 über 5 Jahre (nicht
                nur der Kaufpreis, sondern Haltung, Fütterung, Versicherung, Training).
              </li>
              <li>
                <strong>Gesundheit ist nicht verhandelbar</strong>: Tierärztliche Ankaufsuntersuchung
                ist MUSS. Rote Flaggen wie sehr billige Preise ignorieren.
              </li>
              <li>
                <strong>Rechtliche Absicherung schützt dich</strong>: Ein klarer Kaufvertrag mit
                mindestens 6 Monaten Gewährleistung ist Standard.
              </li>
              <li>
                <strong>Versicherung sofort abschließen</strong>: Fohlen sind Wachstums-Risiko (OCD,
                orthopädische Probleme). €20–€50/Monat jetzt spart Tausende später.
              </li>
            </ol>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              Du bist bereit für den nächsten Schritt? Nutze die Fohlenkauf-Checkliste, recherchiere
              auf ehorses oder pferde.de, und führe eine Tierärztliche Untersuchung durch BEVOR du
              unterschreibst. Mit den richtigen Werkzeugen wirst du ein gesundes, sicheres Fohlen
              finden.
            </p>
          </section>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufige Fragen zum Fohlenkauf"
              sectionSubtitle="Die wichtigsten Fragen und Antworten rund um Marktplätze, Preise, Gesundheit und rechtliche Aspekte beim Fohlenkauf"
              withSchema={false}
            />
          </div>
        </section>

        {/* Author Box */}
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <AuthorBox />
        </div>

        {/* Related Articles */}
        <RatgeberRelatedArticles title="Weitere hilfreiche Ratgeber" articles={relatedArticles} />

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={{
            src: '/images/shared/blossi-shooting.webp',
            alt: 'Pferdebewertung mit PferdeWert',
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
