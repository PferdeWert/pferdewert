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
import { Sparkles, Award, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import AuthorBox from '@/components/AuthorBox';

// FAST REFRESH FIX: Define icons at module level to prevent recreation
const sparklesIcon = <Sparkles className="w-5 h-5" />;
const awardIcon = <Award className="w-5 h-5" />;
const shieldIcon = <ShieldCheck className="w-5 h-5" />;
const alertIcon = <AlertTriangle className="w-5 h-5" />;

// SEO Locale Content for RatgeberHead
const seoLocales = {
  de: {
    title: 'Pony kaufen: Kompletter Leitfaden für Anfänger | PferdeWert.de',
    description: 'Pony kaufen: Umfassender Guide mit Rassen, Kosten & Kauftipps. Vermeide teure Fehler mit unserer Checkliste. Worauf beim Ponykauf achten? Jetzt informieren!',
    keywords: 'pony kaufen, ponyrassen, ponypreise, pony kosten, ponykauf',
    ogTitle: 'Pony kaufen: Kompletter Leitfaden für Anfänger',
    ogDescription: 'Pony kaufen: Guide mit Rassen, Kosten & Kauftipps. Vermeide Fehler beim Ponykauf!',
    twitterTitle: 'Pony kaufen: Kompletter Leitfaden für Anfänger',
    twitterDescription: 'Guide mit Rassen, Kosten & Kauftipps. Vermeide Fehler beim Ponykauf!',
  },
  at: {
    title: 'Pony kaufen in Österreich: Kompletter Leitfaden | PferdeWert.at',
    description: 'Pony kaufen in Österreich: Umfassender Guide mit österreichischen Rassen, Kosten & Kauftipps. Vermeide Fehler beim Ponykauf. Jetzt Leitfaden lesen!',
    keywords: 'pony kaufen österreich, ponyrassen, ponypreise, pony kosten, ponykauf',
    ogTitle: 'Pony kaufen in Österreich: Kompletter Leitfaden',
    ogDescription: 'Guide für österreichische Ponykäufer: Rassen, Kosten & Kauftipps. Vermeide Fehler!',
    twitterTitle: 'Pony kaufen in Österreich: Kompletter Leitfaden',
    twitterDescription: 'Guide für österreichische Ponykäufer: Rassen, Kosten & Tipps!',
  },
  ch: {
    title: 'Pony kaufen in der Schweiz: Kompletter Leitfaden | PferdeWert.ch',
    description: 'Pony kaufen in der Schweiz: Guide mit Rassen, CHF-Kosten & Kauftipps für Schweizer Käufer. Vermeide Fehler beim Ponykauf. Jetzt Ratgeber lesen!',
    keywords: 'pony kaufen schweiz, ponyrassen, ponypreise, pony kosten, ponykauf',
    ogTitle: 'Pony kaufen in der Schweiz: Kompletter Leitfaden',
    ogDescription: 'Guide für Schweizer Ponykäufer: Rassen, CHF-Kosten & Kauftipps!',
    twitterTitle: 'Pony kaufen in der Schweiz: Kompletter Leitfaden',
    twitterDescription: 'Guide für Schweizer Ponykäufer: Rassen, CHF-Kosten & Tipps!',
  },
};

export default function PonyKaufen() {

  const heroPrimaryCta = {
    label: 'Jetzt Pferdewert berechnen',
    href: "/pferde-preis-berechnen",
    icon: sparklesIcon
  };

  const sections = [
    { id: 'rassen', title: 'Ponyrassen Übersicht' },
    { id: 'groesse', title: 'Ponygröße und Eignung' },
    { id: 'kosten', title: 'Ponypreise & Kostenrahmen' },
    { id: 'temperament', title: 'Temperament & Charakter' },
    { id: 'pony-vs-pferd', title: 'Pony vs. Pferd' },
    { id: 'kaufwege', title: 'Kaufwege' },
    { id: 'red-flags', title: 'Rote Flaggen beim Ponykauf' },
    { id: 'aku', title: 'Kaufuntersuchung (AKU)' },
    { id: 'anfaenger', title: 'Anfänger-Geeignetheit' },
    { id: 'checkliste', title: 'Checkliste' },
    { id: 'faq', title: 'Häufig gestellte Fragen' },
  ];

  const faqItems = [
    {
      question: 'Wie viel kostet ein echtes Pony?',
      answer: 'Der Preis hängt stark vom Ausbildungsstand ab. Ungeritten Fohlen/Jährling: 600–3.000 Euro. Roh und ungeritten Ponys: 1.500–6.000 Euro. Angeritten Ponys mit Grundausbildung: 3.000–10.000 Euro. Fertig ausgebildete und sport-bereite Ponys: 8.000–25.000+ Euro. Hinzu kommen Erstausstattung (1.500–3.500 Euro) und Jahresunterhaltskosten (1.200–2.000 Euro). Im ersten Jahr kostet ein Ponykauf insgesamt 4.000–8.000 Euro (Kaufpreis + Ausrüstung + Unterhalt). In den Folgejahren rechne mit 1.200–2.000 Euro pro Jahr.'
    },
    {
      question: 'Welche Ponyrasse ist die freundlichste?',
      answer: 'Haflinger gelten als die sanftmütigsten Ponys – ideal für Anfänger und Kinder. Sie sind geduldig, willig und zuverlässig, und verzeihen Anfängerfehler. Deutsche Reitponys sind ebenfalls zuverlässig und ausgeglichen. Welsh Ponys sind lebhaft aber freundlich und lernwillig. Shetland Ponys sind intelligent, manchmal aber eigensinnig und brauchen konsequente Führung. Für absolute Anfänger empfehlen wir Haflinger oder Deutsche Reitponys – beide haben das richtige Temperament und die Geduld für Lernprozesse.'
    },
    {
      question: 'Ist ein Pony günstiger als ein Pferd?',
      answer: 'Ja, normalerweise beim Kauf. Ponys kosten durchschnittlich 500–6.000 Euro, während Pferde 1.500–25.000+ Euro kosten. Allerdings sind die Unterhaltskosten ähnlich – die Größe spielt eine Rolle. Ein großes Pony kostet oft genauso viel zu unterhalten wie ein kleines Pferd. Die Antwort auf „Ist ein Pony günstiger?" ist also: Ja, beim Kauf, aber nicht unbedingt beim Unterhalt. Für schwere Reiter (über 80 kg) ist jedoch ein Pferd die bessere Wahl, da ein Pony überlastet würde.'
    },
    {
      question: 'Welche Ponyrassen können erwachsene Reiter tragen?',
      answer: 'Nur große Ponyrassen eignen sich für erwachsene Reiter: Haflinger (bis 120 kg), Deutsches Reitpony (bis 110 kg), Isländer (bis 100 kg), Welsh B/C (bis 110 kg). Shetland und Mini-Shetland sind zu klein. Die Faustregel für Tragfähigkeit ist: Das Pony muss mindestens das 6- bis 8-fache des Reitergewichts wiegen. Ein 70 kg schwerer Reiter braucht also mindestens ein 420–560 kg schweres Pony. Bei über 100 kg Körpergewicht ist meist ein Pferd die bessere Wahl.'
    },
    {
      question: 'Sind Ponys für Anfänger geeignet?',
      answer: 'Ja, aber mit der richtigen Rasse. Haflinger und Deutsche Reitponys sind ideal für Anfänger. Shetland Ponys (zu eigensinnig) und Isländer (zu intelligent und brauchen erfahrene Hand) sollte man als Anfänger meiden. Wichtig: Kaufe ein bereits ausgebildetes (angeritten) Pony, nicht ein rohes Pony. Professionelle Unterrichtsstunden mit qualifiziertem Trainer sind ebenfalls essential. Für Kinder unter 12 Jahren ist Beaufsichtigung durch Erwachsene notwendig.'
    },
    {
      question: 'Wie lange sollte eine Probezeit sein?',
      answer: 'Standard-Probezeit: 2–4 Wochen. Ungeritten Ponys brauchen längere Probezeit (4 Wochen) zum Trainieren und zur Evaluation. Angeritten Ponys (bereits ausgebildet) können mit 2 Wochen auskommen. Der Kaufvertrag muss die Probezeit und Rückgaberecht klar regeln. Während der Probezeit hast du das Recht, das Pony zurückzugeben, falls es nicht deinen Erwartungen entspricht.'
    },
    {
      question: 'Warum ist eine Ankaufsuntersuchung (AKU) wichtig?',
      answer: 'Eine Ankaufsuntersuchung ist deine wichtigste Schutzmaßnahme beim Ponykauf. Sie prüft, ob das Pony gesund ist und für deine Zwecke geeignet. Der Tierarzt testet Lahmheit, Atemwege, Herz und Zahnkontrolle. Eine AKU gibt dir Verhandlungs-Leverage und schützt dich rechtlich gegen versteckte Gesundheitsmängel. Kosten: 200–1.500 Euro je nach Umfang. Für ein Pony über 3.000 Euro Kaufpreis empfehlen wir eine vollständige AKU mit X-rays und Ultraschall.'
    },
    {
      question: 'Auf welche roten Flaggen sollte ich beim Ponykauf achten?',
      answer: 'Kenne diese Warnsignale: Der Verkäufer weigert sich, eine AKU durchführen zu lassen (großes Warnsignal). Keine Veterinär-Dokumente vorhanden ist verdächtig. Der Verkäufer setzt dich unter Druck („Nur heute verfügbar"). Das Pony wird nur auf Fotos gezeigt, keine persönliche Besichtigung möglich. Der Preis ist unrealistisch niedrig oder drastisch reduziert mit „urgent sale" Druck. Fehlende oder gefälschte Papiere. Offensichtliche Lahmheit, aggressives Verhalten oder chronischer Husten deuten auf Gesundheitsprobleme hin. Vermeide diese Red Flags und kaufe nur bei seriösen Verkäufern.'
    }
  ];

  // Related articles from registry
  const relatedArticles = getRelatedArticles('pony').map(entry => ({
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
        slug="pony"
        basePath="/pferd-kaufen"
        image="/images/ratgeber/pony-foal-green-pasture.webp"
        locales={seoLocales}
        datePublished="2025-11-30"
        wordCount={1900}
        breadcrumbTitle="Pony kaufen"
        faqItems={faqItems}
      />

      <article>
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Kauf & Verkauf"
          title="Pony kaufen: Der komplette Leitfaden für Anfänger & Profis"
          subtitle="Erfahre alles über Ponyrassen, realistische Kosten und den besten Kaufweg. So vermeidest du teure Fehler beim Ponykauf."
          readTime="8 Min."
          publishDate="November 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={heroPrimaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/pony-foal-green-pasture.webp"
          alt="Dartmoor Pony mit Fohlen auf grüner Weide - ideal für Kinder und Familien"
          priority={true}
          objectPosition="center 40%"
          attribution={{
            author: 'John Kaye',
            license: 'CC BY-SA 2.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
            source: 'Geograph Britain and Ireland'
          }}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} />

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-12">

          {/* Introduction */}
          <section className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Du möchtest ein <strong>Pony kaufen</strong>? Dann bist du hier richtig. Die Wahl der passenden Rasse, realistische Kosten und der beste Kaufweg – all das kann überwältigend wirken. In diesem Guide erfährst du alles Wichtige: Von Ponyrassen über Budgets bis zur rechtlichen Absicherung. So vermeidest du teure Fehler beim <strong>Pony kaufen</strong>.
            </p>
          </section>

          {/* Section: Rassen */}
          <section id="rassen" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Ponyrassen Übersicht – Die wichtigsten Sorten und ihre Unterschiede
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Die richtige Ponyrasse zu wählen ist der erste Schritt. Wer ein <strong>Pony kaufen</strong> will, sollte die Unterschiede kennen. Jede Rasse hat eigene Charakteristiken und Kosten.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Shetland Pony – Der Klassiker für Kinder
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Du willst ein <strong>Shetland Pony kaufen</strong>? Diese Rasse ist klein (95–107 cm) aber voller Persönlichkeit. Die Kosten liegen zwischen 500 und 3.500 Euro. Shetlands sind intelligent, manchmal eigensinnig. Ideal für Kinder und Anfänger. Robust und langlebig – manche werden über 30 Jahre alt.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Welsh Pony – Der spiritvolle Allrounder
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Welsh Pony kaufen ist für viele die beste Wahl. Diese Rasse (120–150 cm) kostet 2.500 bis 8.000 Euro. Welsh Ponys sind lebhaft, freundlich und lernwillig. Perfekt für Jugendliche und erfahrene Anfänger.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Haflinger – Der sanfte Riese
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wer ein <strong>Haflinger kaufen</strong> möchte, bekommt Sanftmut pur. Diese Rasse (140–155 cm) kostet 3.000 bis 15.000 Euro. Haflinger sind zuverlässig und willig. Ideal für Familien und Anfänger.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Isländer – Der hardy Abenteurer
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Isländer (130–145 cm) kosten 5.000 bis 40.000 Euro. Der Preis hängt vom Ausbildungsstand ab. Diese robusten Ponys können auch Erwachsene tragen. Vielseitig einsetzbar: Freizeit bis Wanderritt. Für Anfänger allerdings eine Herausforderung.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Deutsches Reitpony – Der moderne Sportler
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Du willst ein Deutsches Reitpony kaufen? Diese Rasse (120–148 cm) kostet 4.000 bis 20.000 Euro. Modern gezüchtet, athletisch und ausgeglichen. Ideal für ambitionierte Sport-Reiter.
            </p>

            {/* Rassen-Tabelle */}
            <div className="overflow-x-auto mt-8">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Rasse</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Größe (cm)</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Kosten (€)</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Temperament</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Ideal für</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-medium">Shetland</td>
                    <td className="px-4 py-3">95–107</td>
                    <td className="px-4 py-3">500–3.500</td>
                    <td className="px-4 py-3">Intelligent, eigensinnig</td>
                    <td className="px-4 py-3">Kleine Kinder</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Welsh</td>
                    <td className="px-4 py-3">120–150</td>
                    <td className="px-4 py-3">2.500–8.000</td>
                    <td className="px-4 py-3">Lebhaft, freundlich</td>
                    <td className="px-4 py-3">Jugendliche</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Haflinger</td>
                    <td className="px-4 py-3">140–155</td>
                    <td className="px-4 py-3">3.000–15.000</td>
                    <td className="px-4 py-3">Sanftmütig, willig</td>
                    <td className="px-4 py-3">Anfänger, Familien</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Isländer</td>
                    <td className="px-4 py-3">130–145</td>
                    <td className="px-4 py-3">5.000–40.000</td>
                    <td className="px-4 py-3">Hardy, intelligent</td>
                    <td className="px-4 py-3">Erfahrene Reiter</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Deutsches Reitpony</td>
                    <td className="px-4 py-3">120–148</td>
                    <td className="px-4 py-3">4.000–20.000</td>
                    <td className="px-4 py-3">Athletisch, ausgeglichen</td>
                    <td className="px-4 py-3">Sport-Reiter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Größe */}
          <section id="groesse" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Ponygröße und Eignung nach Alter & Gewicht
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Du willst ein <strong>Pony kaufen</strong>, aber welche Größe? Das ist entscheidend für Sicherheit und Erfolg. Zu schwere Reiter belasten das Tier.
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li><strong>Kinder 3–8 Jahre</strong>: Mini-Shetland (90–110 cm), max. 80 kg Reitergewicht</li>
              <li><strong>Kinder 8–12 Jahre</strong>: Mittleres Pony (120–140 cm), 80–100 kg Gewicht</li>
              <li><strong>Jugendliche/leichte Erwachsene</strong>: Große Ponys (140–155 cm), unter 70 kg</li>
              <li><strong>Erwachsene über 70 kg</strong>: Sehr großes Pony oder besser ein <LocalizedLink href="/pferd-kaufen" className="text-brand hover:text-brand-dark underline">Pferd kaufen</LocalizedLink></li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              <strong>Faustregel</strong>: Das Pony sollte 6–8x das Reitergewicht wiegen. Bei 70 kg brauchst du ein 420–560 kg Pony.
            </p>
          </section>

          {/* CTA Box 1: KI-Bewertung */}
          <RatgeberHighlightBox
            title="Objektive Preisbewertung in 2 Minuten"
            icon={awardIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Unsicher, ob der Preis fair ist? PferdeWerts KI-gestützte Analyse vergleicht das Pony mit aktuellen Marktpreisen und liefert dir eine fundierte Einschätzung – objektiv und unabhängig.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Jetzt Pferdewert berechnen
              <TrendingUp className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Kosten */}
          <section id="kosten" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Ponypreise & Kostenrahmen – Kaufpreis bis Jahresbudget
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Was kostet es, ein <strong>Pony zu kaufen</strong>? Mehr als nur der Kaufpreis! Plane ein realistisches Budget.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kaufpreis nach Ausbildungsstand
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li><strong>Fohlen/Jährling (ungeritten)</strong>: 600–3.000 Euro</li>
              <li><strong>Roh (keine Ausbildung)</strong>: 1.500–6.000 Euro</li>
              <li><strong>Angeritten (Grundausbildung)</strong>: 3.000–10.000 Euro</li>
              <li><strong>Fertig ausgebildet</strong>: 8.000–25.000+ Euro</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Erstausstattung
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li><strong>Sattel</strong>: 800–2.000 Euro</li>
              <li><strong>Zubehör</strong> (Halfter, Trense, Decke, Putzzeug): 300–1.000 Euro</li>
              <li><strong>Gesamt Erstausstattung</strong>: 1.500–3.500 Euro</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Monatliche Unterhaltskosten
            </h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li><strong>Futter</strong>: 300–400 Euro/Monat</li>
              <li><strong>Einstreu</strong>: 50–100 Euro/Monat</li>
              <li><strong>Hufschmied</strong> (alle 6–8 Wochen): 15–20 Euro/Monat</li>
              <li><strong>Gesamt monatlich</strong>: 365–520 Euro</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Total Cost of Ownership
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wer ein <strong>Pony kaufen</strong> will, sollte langfristig planen. Für eine detaillierte Kostenübersicht lies auch unseren <LocalizedLink href="/pferde-ratgeber/was-kostet-ein-pferd" className="text-brand hover:text-brand-dark underline">Was kostet ein Pferd?</LocalizedLink> Ratgeber.
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li><strong>Jahr 1</strong> (Kauf + Ausrüstung + Unterhalt): 4.000–8.000 Euro</li>
              <li><strong>Folgejahre</strong>: 1.200–2.000 Euro/Jahr</li>
              <li><strong>Nach 5 Jahren</strong>: 8.000–18.000 Euro</li>
              <li><strong>Über 20 Jahre Lebensdauer</strong>: 25.000–48.000 Euro</li>
            </ul>
          </section>

          {/* Section: Temperament */}
          <section id="temperament" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Temperament & Charakter – Welche Rasse passt zu mir?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Das Temperament ist genauso wichtig wie die Größe. Ein sanftes Pony mit Geduld ist für Anfänger unbezahlbar.
            </p>
            <ul className="space-y-4 text-lg text-gray-700">
              <li><strong>Shetland Ponys</strong> sind intelligent und unabhängig – manchmal eigensinnig. Sie brauchen konsequente Führung und können Anfänger testen.</li>
              <li><strong>Haflinger</strong> gelten als die sanftmütigsten Ponys überhaupt – geduldig, willig und zuverlässig. Sie verzeihen Anfängerfehler.</li>
              <li><strong>Welsh Ponys</strong> sind lebhaft und freundlich, lernwillig aber mit etwas Feuer. Für Anfänger ist ein erfahrenes Welsh Pony eine gute Wahl.</li>
              <li><strong>Isländer</strong> sind robust und intelligent, aber brauchen eine erfahrene Hand.</li>
              <li><strong>Deutsche Reitponys</strong> sind modern gezüchtet, ausgeglichen und anfängerfreundlich.</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Für absolute Anfänger empfehlen wir Haflinger oder Deutsche Reitponys – beide haben das richtige Temperament und die Geduld für Lernprozesse.
            </p>
          </section>

          {/* Section: Pony vs. Pferd */}
          <section id="pony-vs-pferd" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Pony vs. Pferd – Die echten Unterschiede
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Viele Käufer fragen sich: Sollte ich ein <strong>Pony</strong> oder ein <LocalizedLink href="/pferd-kaufen" className="text-brand hover:text-brand-dark underline">Pferd kaufen</LocalizedLink>? Hier sind die wichtigsten Unterschiede.
            </p>

            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Kriterium</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Pony</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Pferd</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-medium">Größe</td>
                    <td className="px-4 py-3">95–155 cm</td>
                    <td className="px-4 py-3">160+ cm</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Gewicht</td>
                    <td className="px-4 py-3">200–600 kg</td>
                    <td className="px-4 py-3">600–800+ kg</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Kaufpreis</td>
                    <td className="px-4 py-3">500–6.000€</td>
                    <td className="px-4 py-3">1.500–25.000€+</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Tragfähigkeit</td>
                    <td className="px-4 py-3">80–120 kg</td>
                    <td className="px-4 py-3">120–150 kg</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Lebensdauer</td>
                    <td className="px-4 py-3">30–35 Jahre</td>
                    <td className="px-4 py-3">25–30 Jahre</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Unterhaltskosten</td>
                    <td className="px-4 py-3">Ähnlich</td>
                    <td className="px-4 py-3">Ähnlich</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Für schwere Reiter (über 80 kg) ist ein Pferd die bessere Wahl. Für Kinder und leichte Reiter ist ein <strong>Pony kaufen</strong> perfekt.
            </p>
          </section>

          {/* Section: Kaufwege */}
          <section id="kaufwege" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kaufwege – Marktplätze, Züchter, Händler & Facebook
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wo solltest du dein <strong>Pony kaufen</strong>? Es gibt mehrere Wege. Jeder hat Vor- und Nachteile. Unser <LocalizedLink href="/pferde-ratgeber/pferdemarkt" className="text-brand hover:text-brand-dark underline">Pferdemarkt-Guide</LocalizedLink> zeigt dir alle Optionen im Detail.
            </p>
            <ul className="space-y-4 text-lg text-gray-700">
              <li><strong>Marktplatz-Plattformen</strong> (Kleinanzeigen, eHorses, pferde.de): Große Auswahl, Preisvergleich möglich. Nachteil: Betrugsgefahr. Immer AKU machen!</li>
              <li><strong>Direkte Züchter</strong>: Kennen Genetik und Gesundheitshistorie. Zuverlässig, langfristige Unterstützung. Nachteil: Höhere Preise, weniger Auswahl.</li>
              <li><strong>Pferdehändler</strong>: Professionell, mehrere Optionen, verhandelbar. Nachteil: Höhere Margen. Nur bei seriösen Dealern ein <strong>Pony kaufen</strong>!</li>
              <li><strong>Facebook Gruppen</strong>: Lokal, persönlich, Community-Vetting. Nachteil: Kein Käuferschutz.</li>
            </ul>
          </section>

          {/* CTA Box 2: Sicherheit */}
          <RatgeberHighlightBox
            title="Rechtliche Absicherung beim Ponykauf"
            icon={shieldIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Kaufvertrag, AKU und Versicherungen sind unverzichtbar. Informiere dich über alle rechtlichen Aspekte in unserem Pferdekaufvertrag-Ratgeber.
            </p>
            <LocalizedLink
              href="/pferd-kaufen/kaufvertrag"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Mehr zum Kaufvertrag
              <ShieldCheck className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: Rote Flaggen */}
          <section id="red-flags" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Rote Flaggen beim Ponykauf – Was man vermeiden sollte
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht alle Verkäufer meinen es gut. Kenne diese Warnsignale, bevor du ein <strong>Pony kaufen</strong> willst:
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Verkäufer-Warnsignale
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>Weigert sich, AKU zu erlauben</li>
              <li>Keine Veterinär-Dokumente</li>
              <li>Drucksituationen (&quot;Nur heute verfügbar!&quot;)</li>
              <li>Nur Fotos, keine Besichtigung möglich</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Gesundheits-Warnsignale
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>Lahmheit oder Bewegungsprobleme</li>
              <li>Aggressives Verhalten (Beißen, Aufbäumen)</li>
              <li>Chronischer Husten oder Schnupfen</li>
              <li>Sichtbar untergewichtig</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Preis-Warnsignale
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>Unrealistisch günstig (Trainiertes Pony für 200€? Unmöglich!)</li>
              <li>&quot;Dringender Verkauf&quot;-Druck</li>
              <li>50% unter Marktwert</li>
            </ul>
          </section>

          {/* CTA Box 3: Warnung */}
          <RatgeberHighlightBox
            title="Betrüger erkennen und vermeiden"
            icon={alertIcon}
          >
            <p className="text-base text-gray-700 mb-4">
              Vertraue deinem Bauchgefühl. Wenn etwas zu gut klingt, um wahr zu sein, ist es das wahrscheinlich auch. Nutze PferdeWerts Preisbewertung, um realistische Marktpreise zu kennen.
            </p>
            <LocalizedLink
              href="/pferde-preis-berechnen"
              className="inline-flex items-center text-brand font-semibold hover:text-brand-dark transition-colors"
            >
              Realistischen Preis berechnen
              <Sparkles className="w-4 h-4 ml-2" />
            </LocalizedLink>
          </RatgeberHighlightBox>

          {/* Section: AKU */}
          <section id="aku" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Kaufuntersuchung (AKU) & Rechtliche Absicherung
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Wer ein <strong>Pony kaufen</strong> will, braucht eine AKU! Die Ankaufsuntersuchung ist deine wichtigste Schutzmaßnahme. Sie schützt vor versteckten Gesundheitsproblemen. Unser <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-brand hover:text-brand-dark underline">AKU-Ratgeber</LocalizedLink> erklärt alle Details.
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Was prüft der Tierarzt?
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Lahmheit</strong>: Walk-, Trot- und Lunge-Tests</li>
              <li><strong>Atemwege</strong>: Auf Wheezing und Probleme hören</li>
              <li><strong>Herz</strong>: Herzgeräusch-Check</li>
              <li><strong>Zähne</strong>: Bestätigt das Alter</li>
              <li><strong>Optional</strong>: X-rays und Ultraschall (+300–500 Euro)</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              AKU Kosten
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Kleine AKU</strong> (klinisch): 200–350 Euro</li>
              <li><strong>Vollständige AKU</strong> (mit X-rays + Ultraschall): 800–1.500 Euro</li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Bei einem <strong>Pony kaufen</strong> über 3.000 Euro: Immer die vollständige AKU!
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kaufvertrag Essentials
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>Pony-Beschreibung</strong>: Alter, Rasse, Farbe, Abzeichen</li>
              <li><strong>Gewährleistung</strong>: Typisch 2 Wochen für Gesundheitsmängel</li>
              <li><strong>Probezeit</strong>: 2–4 Wochen ist Standard</li>
              <li><strong>Zahlung</strong>: Nach erfolgreicher AKU verhandelbar</li>
              <li><strong>Eigentumsübertragung</strong>: Muss dokumentiert sein</li>
            </ul>
          </section>

          {/* Section: Anfänger */}
          <section id="anfaenger" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Anfänger-Geeignetheit & Kindersicherheit beim Ponykauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nicht alle Ponys eignen sich für Anfänger. Hier die wichtigsten Tipps:
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Für Anfänger geeignet?</strong> Ja! Aber nur mit der richtigen Rasse. Haflinger und Deutsche Reitponys sind ideal. Shetland und Isländer eher für Erfahrene. Wichtig: Immer ein angeritten <strong>Pony kaufen</strong>, keinen Rohling!
            </p>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Kindersicherheit nach Alter
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li><strong>3–6 Jahre</strong>: Mini-Shetland, immer beaufsichtigt</li>
              <li><strong>6–10 Jahre</strong>: Shetland oder Welsh</li>
              <li><strong>10+ Jahre</strong>: Welsh, Haflinger, Deutsche Reitponys</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-8">
              Was Anfänger brauchen
            </h3>
            <ul className="space-y-2 text-lg text-gray-700">
              <li>Ausgebildetes Pony (angeritten)</li>
              <li>Ruhiges Temperament</li>
              <li>Professioneller Trainer (15–40 Euro/Stunde)</li>
              <li>Für Kinder unter 12: Erwachsenenaufsicht</li>
            </ul>
          </section>

          {/* Section: Checkliste */}
          <section id="checkliste" className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Checkliste – Die Top 10 Punkte vor dem Ponykauf
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Du willst ein <strong>Pony kaufen</strong>? Nutze diese Checkliste:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Ponyrasse passt zu Reiteralter/Gewicht/Erfahrung
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Temperament getestet (mindestens Probe-Ritt)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                AKU vereinbart und durchgeführt (vor Finalkauf)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Dokumente verifiziert (Alter, Eigentum, Pedigree)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Jahresbudget berechnet (Futter, Hufschmied, Tierarzt, Versicherung)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Haltung vorbereitet (Stall/Weidefläche verfügbar)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Trainer gefunden (für Unterricht und Eingewöhnung)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Pferdeversicherung geklärt und geplant
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Tierarzt gesucht (für Routine-Pflege und Notfälle)
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 mr-3 mt-0.5 rounded border-2 border-gray-300 flex-shrink-0"></span>
                Notfall-Plan erstellt (Vet-Kontakte, Haftungsversicherung)
              </li>
            </ul>
          </section>

          {/* Fazit */}
          <section className="scroll-mt-32 lg:scroll-mt-40 space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Fazit: Mit Wissen zum perfekten Pony
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ein <strong>Pony kaufen</strong> erfordert Planung. Mit diesem Guide triffst du die beste Entscheidung:
            </p>
            <ol className="space-y-3 text-lg text-gray-700 list-decimal list-inside">
              <li><strong>Rasse wählen</strong>: Passend zu Alter, Gewicht und Erfahrung</li>
              <li><strong>Budget planen</strong>: Kaufpreis + laufende Kosten</li>
              <li><strong>AKU machen</strong>: Dein wichtigster Schutz</li>
              <li><strong>Rote Flaggen erkennen</strong>: Betrüger vermeiden</li>
            </ol>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              Du hast jetzt alles Wissen für einen erfolgreichen Ponykauf. Dein perfektes Pony wartet!
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Tipp</strong>: Nutze den <LocalizedLink href="/pferde-preis-berechnen" className="text-brand hover:text-brand-dark underline">PferdeWert Pony-Evaluator</LocalizedLink> um den wahren Marktwert zu erfahren. Unsere KI analysiert in nur 2 Minuten AKU-Daten und Marktvergleiche. So weißt du genau, ob der Preis fair ist, bevor du ein <strong>Pony kaufen</strong> gehst.
            </p>
          </section>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen"
              sectionSubtitle="Die wichtigsten Fragen und Antworten rund um den Ponykauf"
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
          title="Bereit für eine professionelle Ponybewertung?"
          description="Nutze unsere KI-gestützte Analyse in nur 2 Minuten und erhalte eine fundierte Einschätzung des Ponywerts – objektiv, schnell und zuverlässig."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Ponywert berechnen"
        />
      </article>
    </Layout>
  );
}
