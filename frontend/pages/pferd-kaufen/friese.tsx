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
    title: 'Friese kaufen 2025: KFPS-Papiere, Preise & Gesundheit',
    description: 'Friese kaufen ➤ Wichtige KFPS-Papiere ✓ Rassetypische Gesundheit ✓ Preise 5.000-50.000€ ✓ Barocke Pferderasse. Jetzt informieren!',
    keywords: 'friese kaufen, friesenpferd, KFPS, barocke pferderasse, friesen pferd kaufen',
    ogTitle: 'Friese kaufen: KFPS-Papiere, Preise & Gesundheit',
    ogDescription: 'Alles über Friesen: KFPS-Registrierung, Gesundheit, Preise und Zuchtlinien. Mit KI-gestützter Bewertung in 2 Minuten.',
    twitterTitle: 'Friese kaufen: Der komplette Ratgeber',
    twitterDescription: 'KFPS-Papiere, Gesundheit, Preise & Zuchtlinien. Jetzt informieren!',
  },
  at: {
    title: 'Friese kaufen in Österreich: KFPS & Preise 2025',
    description: 'Friese kaufen in Österreich ➤ KFPS-Registrierung ✓ Züchter in AT ✓ Preise & Gesundheit ✓ Barocke Rasse. Jetzt informieren!',
    keywords: 'friese kaufen österreich, friesenpferd österreich, KFPS österreich',
    ogTitle: 'Friese kaufen in Österreich: KFPS & Preise',
    ogDescription: 'Alles über Friesen in Österreich: KFPS-Dokumente, Züchter und Preise.',
    twitterTitle: 'Friese kaufen in Österreich',
    twitterDescription: 'KFPS-Registrierung, Züchter in AT, Preise & Gesundheit.',
  },
  ch: {
    title: 'Friese kaufen Schweiz: KFPS-Papiere & CHF-Preise',
    description: 'Friese kaufen in der Schweiz ➤ KFPS-Dokumente ✓ CHF 8.000-80.000 ✓ Schweizer Züchter ✓ Gesundheit. Jetzt informieren!',
    keywords: 'friese kaufen schweiz, friesenpferd schweiz, KFPS schweiz',
    ogTitle: 'Friese kaufen in der Schweiz: KFPS & Preise',
    ogDescription: 'Alles über Friesen in der Schweiz: KFPS, CHF-Preise und Züchter.',
    twitterTitle: 'Friese kaufen Schweiz',
    twitterDescription: 'KFPS-Dokumente, CHF 8.000-80.000, Schweizer Züchter.',
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
    { id: 'gesundheit', title: 'Gesundheit und typische Friesen-Probleme' },
    { id: 'preise', title: 'Friesen-Preise und Zuchtlinien' },
    { id: 'disziplinen', title: 'Friesen für verschiedene Disziplinen' },
    { id: 'pflege', title: 'Pflege und Haltung von Friesen' },
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
        wordCount={805}
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
          readTime="8 Min."
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