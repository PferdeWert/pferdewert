import LocalizedLink from '@/components/LocalizedLink'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo, useCallback } from 'react'
import { FileText, AlertTriangle } from 'lucide-react'
import Layout from '@/components/Layout'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import FAQ from '@/components/FAQ'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import RatgeberHead from '@/components/ratgeber/RatgeberHead'
import { getRelatedArticles, getRatgeberPath } from '@/lib/ratgeber-registry'
import scrollToSection from '@/utils/ratgeber/scrollToSection'
import { info } from '@/lib/log'
import AuthorBox from '@/components/AuthorBox'

// FAST REFRESH FIX: Define icons at module level
const fileTextIcon = <FileText className="h-4 w-4" />
const warningIcon = <AlertTriangle className="w-5 h-5 text-brand-brown" />

// Section definitions for Table of Contents (locale-aware)
const getSections = (locale: string) => {
  const baseSections = [
    { id: 'was-ist-vertrag', title: 'Was ist ein Pferdekaufvertrag und warum ist er unverzichtbar?' },
    { id: 'sieben-bestandteile', title: 'Die sieben wesentlichen Bestandteile eines Pferdekaufvertrags' },
    { id: 'privat-vs-gewerblich', title: 'Private vs. gewerblicher Pferdeverkauf: Unterschiede erklärt' },
    { id: 'haeufige-fehler', title: 'Häufige Fehler beim Pferdekaufvertrag – und wie du sie vermeidest' },
    { id: 'checkliste', title: 'Checkliste: Schritt-für-Schritt Anleitung zum Vertragsausfüllen' },
    { id: 'gewaehrleistung', title: 'Gewährleistung und Mängelrechte: Fristen und deine Rechte' },
    { id: 'besondere-klauseln', title: 'Besondere Klauseln und Zusatzvereinbarungen' },
    { id: 'rechtliche-besonderheiten', title: 'Rechtliche Besonderheiten: Datenschutz, Steuern und weitere Aspekte' },
  ]

  // Add locale-specific section for AT and CH
  if (locale === 'at') {
    baseSections.push({ id: 'recht-oesterreich', title: 'Pferdekaufrecht in Österreich: ABGB-Besonderheiten' })
  } else if (locale === 'ch') {
    baseSections.push({ id: 'recht-schweiz', title: 'Pferdekaufrecht in der Schweiz: OR-Besonderheiten' })
  }

  baseSections.push(
    { id: 'praktische-tipps', title: 'Praktische Tipps für Verkäufer und Käufer' },
    { id: 'faq', title: 'Häufige Fragen zum Pferdekaufvertrag' }
  )

  return baseSections
}

// FAQ Items
const faqItems = [
  {
    question: 'Was muss in einen Pferdekaufvertrag?',
    answer: 'Die sieben Essentials: Pferd-Identifikation (Name, Rasse, Alter, Chip-Nummer), Kaufpreis & Zahlungsbedingungen, Gefahrübergang, Gewährleistungsregelungen, Beschaffenheitsmerkmale, Übergabe-Bestätigung, Unterschriften. Jedes Feld muss klar und spezifisch sein &ndash; vage Formulierungen führen zu Disputes.'
  },
  {
    question: 'Kann man ein Pferd ohne Vertrag kaufen?',
    answer: 'Rechtlich möglich, aber extrem riskant. Ohne schriftliche Vereinbarung sind Dispute schwer zu lösen und dein rechtlicher Schutz minimal. Ein Vertrag schützt dich UND den Verkäufer. Immer nutzen.'
  },
  {
    question: 'Wie lange habe ich Gewährleistung beim Pferdekauf?',
    answer: 'Private Verkäufe: 2 Jahre Standard (BGB §437). Kann auf 1 Jahr reduziert werden. Gewerbliche Verkäufe: Nur mit Vereinbarung, meist 6-12 Monate oder Ausschluss. Mängel müssen innerhalb dieser Frist angezeigt werden.'
  },
  {
    question: 'Kann ich ein Pferd zurückgeben nach dem Kauf?',
    answer: 'Nur wenn Mängel innerhalb der Gewährleistungsfrist auftreten UND der Verkäufer sich weigert zu reparieren/reduzieren. Probezeit und Rückgabe-Rechte müssen vorab vereinbart sein. Normale &ldquo;Gewöhnung&rdquo; ist kein Rückgabe-Grund.'
  },
  {
    question: 'Muss Ankaufsuntersuchung im Vertrag stehen?',
    answer: 'Nicht rechtlich erforderlich, aber hochempfohlen. Wenn AKU gemacht wurde: Anhang an Vertrag heften und Befunde referenzieren. Das schützt beide Parteien vor späteren Streitigkeiten über &ldquo;bekannte&rdquo; vs. &ldquo;unbekannte&rdquo; Mängel. Mehr Informationen zur Ankaufsuntersuchung findest du in unserem Ankaufsuntersuchung-Ratgeber.'
  },
  {
    question: 'Was ist der Unterschied zwischen privat und gewerblichem Verkauf?',
    answer: 'Private Verkäufer unterliegen stärkerer Gewährleistungspflicht (2 Jahre, Käufer-Schutz). Gewerbliche Verkäufer können Gewährleistung ausschließen und setzen oft härtere Bedingungen. Das hängt davon ab, ob der Verkäufer regelmäßig Pferde verkauft (Unternehmer) oder einmalig privat verkauft.'
  }
]

// SEO Locales for RatgeberHead
const seoLocales = {
  de: {
    title: 'Pferdekaufvertrag: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    description: 'Pferdekaufvertrag leicht erklärt: 7 wesentliche Bestandteile, häufige Fehler vermeiden, kostenloses Muster downloaden. Rechtlich sicher kaufen & verkaufen.',
    keywords: 'pferdekaufvertrag, pferdekauf vertrag, pferdekaufvertrag privat, pferdekaufvertrag muster, pferdekaufvertrag ohne gewährleistung',
    ogTitle: 'Pferdekaufvertrag: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    ogDescription: 'Pferdekaufvertrag leicht erklärt: 7 wesentliche Bestandteile, häufige Fehler vermeiden, kostenloses Muster downloaden.',
    twitterTitle: 'Pferdekaufvertrag: 7-Punkte Anleitung',
    twitterDescription: 'Erfahr, welche 7 Punkte in einen rechtssicheren Pferdekaufvertrag gehören & vermeide teure Fehler.',
  },
  at: {
    title: 'Pferdekaufvertrag Österreich: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    description: 'Pferdekaufvertrag in Österreich: 7 wesentliche Bestandteile, häufige Fehler vermeiden. Rechtlich sicher kaufen & verkaufen nach ABGB.',
    keywords: 'pferdekaufvertrag österreich, pferdekauf vertrag, pferdekaufvertrag privat, pferdekaufvertrag muster österreich',
    ogTitle: 'Pferdekaufvertrag Österreich: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    ogDescription: 'Pferdekaufvertrag in Österreich: 7 wesentliche Bestandteile, häufige Fehler vermeiden.',
    twitterTitle: 'Pferdekaufvertrag Österreich: 7-Punkte Anleitung',
    twitterDescription: 'Erfahr, welche 7 Punkte in einen rechtssicheren Pferdekaufvertrag gehören.',
  },
  ch: {
    title: 'Pferdekaufvertrag Schweiz: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    description: 'Pferdekaufvertrag in der Schweiz: 7 wesentliche Bestandteile, häufige Fehler vermeiden. Rechtlich sicher kaufen & verkaufen nach OR.',
    keywords: 'pferdekaufvertrag schweiz, pferdekauf vertrag, pferdekaufvertrag privat, pferdekaufvertrag muster schweiz',
    ogTitle: 'Pferdekaufvertrag Schweiz: Rechtssicherer Kaufvertrag (7-Punkte Anleitung)',
    ogDescription: 'Pferdekaufvertrag in der Schweiz: 7 wesentliche Bestandteile, häufige Fehler vermeiden.',
    twitterTitle: 'Pferdekaufvertrag Schweiz: 7-Punkte Anleitung',
    twitterDescription: 'Erfahr, welche 7 Punkte in einen rechtssicheren Pferdekaufvertrag gehören.',
  },
}

const Pferdekaufvertrag: NextPage = () => {
  const { locale } = useRouter()
  const currentLocale = locale || 'de'

  // Get locale-specific sections for Table of Contents
  const sections = useMemo(() => getSections(currentLocale), [currentLocale])

  // Handler for Table of Contents navigation
  const handleTableOfContentsClick = (sectionId: string) => {
    info('Navigating to section:', sectionId)
    scrollToSection(sectionId)
  }

  // Memoize onClick handler to prevent Fast Refresh infinite loops
  const handleScrollToContent = useCallback(() => {
    document.getElementById('sieben-bestandteile')?.scrollIntoView({ behavior: 'smooth' })
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

  // CRITICAL: Related articles MUST be inside component to avoid Next.js cache issues
  const relatedArticles = useMemo(() =>
    getRelatedArticles('pferdekaufvertrag').map(entry => ({
      title: entry.title,
      description: entry.description,
      href: getRatgeberPath(entry.slug),
      image: entry.image,
      badge: entry.category,
      readTime: entry.readTime
    })), []
  )

  return (
    <>
      <RatgeberHead
        slug="pferdekaufvertrag"
        image="/images/ratgeber/horses-mountain-field-spain.webp"
        locales={seoLocales}
        datePublished="2025-10-28"
        wordCount={4500}
        breadcrumbTitle="Pferdekaufvertrag"
        faqItems={faqItems}
      />

      <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
        <main className="flex-1">
        {/* Hero Section */}
        <RatgeberHero
          badgeLabel="Rechtsguide"
          badgeIcon={fileTextIcon}
          title="Pferdekaufvertrag: Rechtssicherer Kaufvertrag"
          subtitle="Rechtliche Absicherung beim Pferdekauf und -verkauf: Die 7 wesentlichen Bestandteile, häufige Fehler und praktische Checklisten"
          readTime="15 Min."
          publishDate="November 2025"
          author={{ name: 'Benjamin Reder', href: '/ueber-pferdewert' }}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />

        <RatgeberHeroImage
          src="/images/ratgeber/horses-mountain-field-spain.webp"
          alt="Pferde auf Bianditz Berg in Navarra, Spanien - Symbolbild für Pferdekaufvertrag"
          priority
          attribution={{
            author: 'Mikel Ortega',
            license: 'CC BY-SA 2.0',
            licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
            source: 'Wikimedia Commons',
            originalUrl: 'https://commons.wikimedia.org/wiki/File:Biandintz_eta_zaldiak_-_modified2.jpg'
          }}
        />

        {/* Table of Contents */}
        <RatgeberTableOfContents sections={sections} onNavigate={handleTableOfContentsClick} />

        {/* Content Body - Text First */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12">
          {/* Section 1: Was ist ein Pferdekaufvertrag */}
          <section id="was-ist-vertrag" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Was ist ein Pferdekaufvertrag und warum ist er unverzichtbar?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Pferdekaufvertrag ist eine schriftliche Vereinbarung zwischen Käufer und Verkäufer, die alle Bedingungen eines Pferdeverkaufs dokumentiert. Er basiert auf den Regelungen des Bürgerlichen Gesetzbuchs (BGB) &ndash; konkret{' '}
              <a href="https://www.gesetze-im-internet.de/bgb/__433.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                §433 BGB (Kaufvertrag)
              </a>
              {' '}und{' '}
              <a href="https://www.gesetze-im-internet.de/bgb/__437.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                §437 BGB (Mängelrechte)
              </a>. Damit fällt ein Pferd rechtlich unter allgemeine Kaufgesetze, nicht unter spezielle Pferdebestimmungen. Mehr über die grundlegenden Aspekte erfahren Sie in unserem Leitfaden zum{' '}
              <LocalizedLink href="/pferde-ratgeber/pferd-kaufen" className="text-blue-600 hover:underline">
                Pferdekauf
              </LocalizedLink>.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das bedeutet konkret: Ein Pferd ist juristisch ein &ldquo;bewegliches Gut&rdquo;, und die Regeln für seinen Verkauf unterscheiden sich nicht grundlegend vom Auto- oder Möbelverkauf. Der entscheidende Unterschied? Ein Pferd ist lebendig und kann nicht zurückgerufen werden wie defekte Ware.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Warum ist ein schriftlicher Vertrag entscheidend?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Aus der Praxis zeigen sich die schwersten Fehler bei mündlichen Absprachen. Ein{' '}
              <LocalizedLink href="/pferde-ratgeber/pferd-verkaufen" className="text-blue-600 hover:underline">
                Verkäufer
              </LocalizedLink>
              {' '}sagt: &ldquo;Natürlich ist das Pferd ausgebildet.&rdquo; Der Käufer versteht: &ldquo;Springtraining auf 1,20m.&rdquo; Der Streit ist vorprogrammiert.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein schriftlicher Vertrag schafft drei kritische Schutzebenen:
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">1.</span>
                <span className="text-lg"><strong>Beweis:</strong> Alle Vereinbarungen sind dokumentiert und in einem Streitfall vor Gericht verwertbar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">2.</span>
                <span className="text-lg"><strong>Klarheit:</strong> Beide Parteien müssen den gleichen Text unterzeichnen &ndash; keine Missverständnisse möglich</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-brown font-bold">3.</span>
                <span className="text-lg"><strong>Verjährung:</strong> Mängelrechte verjähren nach zwei Jahren &ndash; nur wenn sie schriftlich vereinbart sind</span>
              </li>
            </ul>

            <RatgeberHighlightBox title="Praxis-Tipp: Rechtsanwalt hinzuziehen" icon={warningIcon}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unterschreibe niemals einen Vertrag, den du nicht vollständig verstanden hast. Nimm dir Zeit, oder lasse einen Rechtsanwalt drüberschauen &ndash; das kostet 150&ndash;300€ und spart dir später tausende.
              </p>
            </RatgeberHighlightBox>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Mündliche Absprachen vs. schriftlicher Vertrag
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Eine häufige Frage: &ldquo;Können wir das Geschäft nicht einfach per Handschlag machen?&rdquo; Rechtlich ist das problematisch. Das BGB §365 bestimmt, dass bestimmte Vereinbarungen schriftlich festgehalten werden müssen &ndash; beim Pferdekauf ist das zwar nicht explizit vorgeschrieben, aber extrem empfohlen.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ohne schriftlichen Vertrag passiert dies regelmäßig: Nach 3 Monaten lahmt das Pferd &rarr; Käufer sagt &ldquo;Das war nicht so, als ich es gekauft habe&rdquo; &rarr; Verkäufer sagt &ldquo;Du hast dich wohl getäuscht&rdquo;. Eine{' '}
              <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-blue-600 hover:underline">
                Ankaufsuntersuchung (AKU)
              </LocalizedLink>
              {' '}hätte viele dieser Probleme von vornherein vermieden.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              Fakt: 30% aller Pferdekauf-Dispute entstehen allein aus fehlenden Verträgen.
            </p>
          </section>

          {/* Section 2: Die sieben wesentlichen Bestandteile */}
          <section id="sieben-bestandteile" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Die sieben wesentlichen Bestandteile eines Pferdekaufvertrags
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein rechtssicherer Pferdekaufvertrag benötigt mindestens diese sieben Komponenten. Fehlt eine, könnte dich das in einem Streitfall teuer kosten.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              1. Vertragsgegenstand: Pferd eindeutig identifizieren
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das klingt trivial &ndash; ist es nicht. Viele Verträge sagen nur: &ldquo;Einen Wallach, Fuchs, 8 Jahre alt.&rdquo; Das ist zu vage. Was, wenn der Verkäufer zwei Wallache hat?
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Schreib auf:
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• <strong>Name des Pferdes</strong> (wie in Pferdepass eingetragen)</li>
              <li className="text-lg">• <strong>Rasse und Abstammung</strong> (Hannoveraner, Warmblut, etc.)</li>
              <li className="text-lg">• <strong>Genaues Alter oder Geburtsdatum</strong></li>
              <li className="text-lg">• <strong>Farbe und Abzeichen</strong> (Fuchs mit weißer Blesse, etc.)</li>
              <li className="text-lg">• <strong>Mikro-Chip-Nummer</strong> (falls vorhanden)</li>
              <li className="text-lg">• <strong>Pferdepass-Nummer</strong> (FN/FEI-Nummer)</li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              2. Kaufpreis und Zahlungsmodalitäten
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Hier entsteht oft Verwirrung. Die Frage ist nicht nur &ldquo;Wie viel?&rdquo; sondern auch &ldquo;Wann?&rdquo; und &ldquo;Wie?&rdquo; Spezifiziere:
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• <strong>Exakter Kaufpreis in Euro</strong> (nicht &ldquo;ca. 12.000€&rdquo;)</li>
              <li className="text-lg">• <strong>Zahlungsform</strong> (Überweisung, Bar, Ratenzahlung?)</li>
              <li className="text-lg">• <strong>Fälligkeitsdatum</strong> (Bei Unterzeichnung? Nach Übergabe?)</li>
              <li className="text-lg">• <strong>Konsequenzen bei Verspätung</strong> (z.B. 2% Verzugszins monatlich)</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Besonder-Fall Ratenzahlung:</strong> Falls der Käufer in Raten zahlt, sollte der Vertrag ein <strong>Eigentumsvorbehalt</strong> enthalten. Das bedeutet: Verkäufer behält das Eigentumsrecht bis zur letzten Zahlung.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              3. Gefahrübergang und Eigentumsübergang
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist ein rechtlicher Knoten: Wann gehört das Pferd dir? Wann trägst du das Risiko, falls es sich verletzt? Meistens fallen beide Momente zusammen &ndash; bei der physischen Übergabe. Das ist auch der BGB-Standard (§446). Dokumentiere:
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• <strong>Übergabedatum und -uhrzeit</strong></li>
              <li className="text-lg">• <strong>Übergabeort</strong> (Stall des Verkäufers? Transportziel?)</li>
              <li className="text-lg">• <strong>Zustand bei Übergabe</strong> (Käufer prüft sichtbare Mängel)</li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              4. Gewährleistung und Mängelrechte
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist der komplexeste Punkt &ndash; und der wichtigste Schutzmechanismus. <strong>Standardregel (BGB §437):</strong> Bei Privatverkäufen beträgt die Gewährleistungsfrist zwei Jahre. Der Käufer kann innerhalb dieser Zeit Mängel reklamieren.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <em>Aber:</em> Der Verkäufer kann diese Gewährleistung <strong>ausschließen</strong>. Das ist legal, muss aber schriftlich stehen. Viele Käufer unterschreiben das unbewusst und sind dann schutzlos.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Wichtig für Käufer:</strong> Wenn keine Mängel bekannt sind, kann der Verkäufer die Gewährleistung ausschließen. Aber wenn Mängel BEKANNT sind (z.B. das Pferd lahmt) und nicht offenbart werden, ist der Ausschluss ungültig.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              5. Beschaffenheitsvereinbarungen
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Hier definierst du, was der Käufer wirklich kauft. Ohne das entsteht Streit. Um Konflikte zu vermeiden, schreib auf:
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• <strong>Reitstunde/Trainingslevel</strong> (z.B. &ldquo;springt sicher bis 1,00m&rdquo;)</li>
              <li className="text-lg">• <strong>Besondere Fähigkeiten oder Limitierungen</strong> (z.B. &ldquo;nicht für Anfänger geeignet&rdquo;)</li>
              <li className="text-lg">• <strong>Bekannte Verhaltensauffälligkeiten</strong> (z.B. &ldquo;Scheuer, braucht geduldigen Reiter&rdquo;)</li>
              <li className="text-lg">• <strong>Gesundheitliche Fakten</strong> (z.B. &ldquo;Husten im Winter&rdquo;, &ldquo;wurde therapiert&rdquo;)</li>
              <li className="text-lg">• <strong>Ankaufsuntersuchungs-Ergebnisse</strong> (wenn{' '}
                <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-blue-600 hover:underline">
                  AKU
                </LocalizedLink>
                {' '}gemacht wurde)</li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              6. Übergabe und Empfangsbestätigung
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein einfacher Punkt, der oft übersehen wird: Dokumentiere, dass der Käufer das Pferd <strong>so akzeptiert hat, wie es ist</strong>. Das schützt beide Parteien.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              7. Schriftformklausel und Unterschriften
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist der formale Abschluss &ndash; und rechtlich entscheidend. Eine typische Formulierung:
            </p>

            <p className="text-lg text-gray-700 leading-relaxed italic bg-amber-50 p-4 rounded-lg">
              &ldquo;Diese Vereinbarung stellt die komplette Abrede zwischen den Parteien dar. Alle bisherigen Absprachen (mündlich oder schriftlich) werden hiermit aufgehoben. Der Vertrag ist nur gültig, wenn er von beiden Parteien unterschrieben ist.&rdquo;
            </p>
          </section>

          {/* Section 3: Private vs. gewerblicher Pferdeverkauf */}
          <section id="privat-vs-gewerblich" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Private vs. gewerblicher Pferdeverkauf: Unterschiede erklärt
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Die rechtliche Klassifizierung des Verkäufers hat massive Auswirkungen auf deine Rechte als Käufer.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Private Verkäufer</strong> (Verbraucher nach BGB): Jemand, der sein Privatpferd verkauft. Reiterliche Gründe, Umzug, Unfall. Nicht berufsmäßig.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Gewerbliche Verkäufer</strong> (Unternehmer nach BGB): Züchter, Pferdetrainer, Pferdehandel &ndash; also jemand, für den{' '}
              <LocalizedLink href="/pferde-ratgeber/pferd-verkaufen" className="text-blue-600 hover:underline">
                Pferdeverkauf
              </LocalizedLink>
              {' '}das Geschäft ist.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Rechtliche Unterschiede
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="p-3 border border-amber-200 font-bold">Kriterium</th>
                    <th className="p-3 border border-amber-200 font-bold">Private Verkauf</th>
                    <th className="p-3 border border-amber-200 font-bold">Gewerblicher Verkauf</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-amber-200">Gesetzliche Gewährleistung</td>
                    <td className="p-3 border border-amber-200">2 Jahre (§437 BGB)</td>
                    <td className="p-3 border border-amber-200">Nur, wenn vertraglich vereinbart</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="p-3 border border-amber-200">Ausschluss möglich?</td>
                    <td className="p-3 border border-amber-200">Ja, aber nur schriftlich und bewusst</td>
                    <td className="p-3 border border-amber-200">Ja, üblicherweise Standard</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-amber-200">Mangelrüge-Frist</td>
                    <td className="p-3 border border-amber-200">7&ndash;14 Tage typisch</td>
                    <td className="p-3 border border-amber-200">Oft nur 7 Tage</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="p-3 border border-amber-200">Käufer-Schutz</td>
                    <td className="p-3 border border-amber-200">Höher (Verbraucherschutz)</td>
                    <td className="p-3 border border-amber-200">Niedriger</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold mt-4">
              Die Botschaft ist klar: Kaufst du von einer Privatperson, hast du mehr Schutz. Kaufst du von einem Züchter oder Händler, musst du alle Rechte explizit aushandeln.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Wann bin ich &ldquo;Unternehmer&rdquo; und wann &ldquo;Privatperson&rdquo;?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Privatperson</strong> (Verbraucher): Du verkaufst dein Reitpferd, weil du nicht mehr reiten kannst. Du hattest es 5&ndash;10 Jahre im Privatbesitz. Das ist nicht dein Geschäftsmodell.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Unternehmer</strong> (Gewerbetreibender): Du verkaufst 2&ndash;3 Pferde pro Jahr regelmäßig. Du züchtest oder trainierst Pferde zum Weiterverkauf. Du betreibst einen Pferdehandel.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das entscheidende Kriterium ist: <strong>Machst du das regelmäßig und mit Gewinnabsicht?</strong> Die Rechtsprechung sagt: Ab ca. 3 Pferdeverkäufen pro Jahr gilt die Person als Unternehmer.
            </p>
          </section>

          {/* Section 4: Häufige Fehler */}
          <section id="haeufige-fehler" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Häufige Fehler beim Pferdekaufvertrag &ndash; und wie du sie vermeidest
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Bei Verträgen passieren regelmäßig die gleichen Fehler. Hier sind die vier teuersten:
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Fehler 1: Zu vage Beschaffenheitsvereinbarungen
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Das Szenario:</strong> Ein Käufer sieht auf der Homepage: &ldquo;Talentiertes Springpferd, 8 Jahre, sehr willig.&rdquo; Der Vertrag sagt: &ldquo;Ein Springpferd.&rdquo; Nach dem Kauf stellt sich heraus: Das Pferd verweigert Sprünge über 0,80m regelmäßig.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Die Lösung:</strong> Beschreib das Traininglevel exakt. Nicht &ldquo;Springpferd&rdquo;, sondern &ldquo;Springpferd, reitet sicher bis 1,10m, zeigt gutes Vermögen für höhere Sprünge&rdquo;.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Fehler 2: Gewährleistung nicht geklärt
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Das Szenario:</strong> Ein Käufer kauft und denkt: &ldquo;Natürlich habe ich Gewährleistung!&rdquo; Der Vertrag hat aber einen Ausschluss-Satz, den der Käufer nicht gelesen hat. Nach Monat 3: Pferd lahmt &rarr; Käufer zahlt 4.000€ Therapiekosten selbst.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Die Lösung:</strong> Unterschreibe NICHTS, ohne die Gewährleistungsklausel explizit gelesen und verstanden zu haben.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Fehler 3: Ankaufsuntersuchung (AKU) nicht dokumentiert
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Das Szenario:</strong> Ein Verkäufer sagt: &ldquo;Ja, natürlich war die{' '}
              <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-blue-600 hover:underline">
                AKU
              </LocalizedLink>
              {' '}gemacht.&rdquo; Es gibt aber keine schriftliche Dokumentation davon.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Die Lösung:</strong> Lasse die AKU von DEINEM Tierarzt machen. Fordere Kopien aller Röntgenaufnahmen und Berichte an. Heften diese dem Vertrag bei.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Fehler 4: Zahlung ohne Sicherheitsklauseln
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Das Szenario:</strong> Ein Verkäufer akzeptiert Ratenzahlung. Es gibt aber keine Klausel über Eigentumsvorbehalt. Der Käufer zahlt die erste Rate, dann nicht mehr &ndash; der Verkäufer kann das Pferd nicht zurückholen.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Die Lösung:</strong> Wenn Ratenzahlung, dann <strong>immer</strong> ein Eigentumsvorbehalt im Vertrag.
            </p>
          </section>

          {/* Section 5: Checkliste */}
          <section id="checkliste" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Checkliste: Schritt-für-Schritt Anleitung zum Vertragsausfüllen
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein guter Pferdekaufvertrag entsteht nicht spontan. Hier ist der Prozess:
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Vor dem Ausfüllen: Informationen sammeln
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Sammle alle relevanten Dokumente:
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• Pferdepass oder FEI-Papiere</li>
              <li className="text-lg">• Microchip-Nummer (beim Tierarzt fragen)</li>
              <li className="text-lg">• Ankaufsuntersuchungs-Befunde (falls vorhanden)</li>
              <li className="text-lg">• Impfpässe und Entwurmungs-Dokumentation</li>
              <li className="text-lg">• Rechnungen für bisherige medizinische Behandlungen</li>
              <li className="text-lg">• Trainings- und Konkurrenzergebnisse (falls relevant)</li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Vertragsabschnitte ausfüllen: Parteien &amp; Gegenstand
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
              Vertragsparteien:<br />
              Verkäufer: [Vollständiger Name], geb. [Geburtsdatum], [Adresse], [Telefon]<br />
              Käufer: [Vollständiger Name], geb. [Geburtsdatum], [Adresse], [Telefon]<br /><br />
              Vertragsgegenstand: Der Wallach/die Stute &ldquo;[Name]&rdquo;, geb. [Datum],<br />
              [Rasse], Farbe [Farbe und Abzeichen], Microchip-Nr. [Nummer]
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Kopiere die Infos direkt aus dem Pferdepass &ndash; keine Fehler riskieren. Die{' '}
              <a href="https://www.pferd-aktuell.de/fn-service/fei-pferdepass" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Deutsche Reiterliche Vereinigung (FN)
              </a>
              {' '}bietet offizielle Richtlinien und Musterverträge an.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Gewährleistung &amp; Mängelrechte klären
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              WICHTIGSTE ENTSCHEIDUNG DES VERTRAGS:
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Option A &ndash; Mit Gewährleistung (für Käufer besser):</strong><br />
              Gewährleistungsfrist: 2 Jahre ab Übergabe, Mangelrüge-Frist: 14 Tage nach Übergabe
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Option B &ndash; Mit Einschränkung (Kompromiss):</strong><br />
              Gewährleistungsfrist: 1 Jahr ab Übergabe, Angeborene/erbliche Fehler ausgeschlossen
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Option C &ndash; Ohne Gewährleistung (für Verkäufer besser):</strong><br />
              &ldquo;Das Pferd wird unter Ausschluss der Gewährleistung verkauft ({' '}
              <a href="https://www.gesetze-im-internet.de/bgb/__444.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                §444 BGB
              </a>).&rdquo;
            </p>

            <RatgeberHighlightBox title="Wichtig: Nur mit AKU!" icon={warningIcon}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unterschreibe Option C nur, wenn du eine aktuelle{' '}
                <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-blue-600 hover:underline">
                  Ankaufsuntersuchung
                </LocalizedLink>
                {' '}hast und der Report sauber ist (keine versteckten Befunde).
              </p>
            </RatgeberHighlightBox>
          </section>

          {/* Section 6: Gewährleistung und Mängelrechte */}
          <section id="gewaehrleistung" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Gewährleistung und Mängelrechte: Fristen und deine Rechte
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist der rechtliche Kern &ndash; und hier verdienen sich Rechtsanwälte ihr Geld.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Gewährleistungsfrist: Wie lange bist du geschützt?
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Die Standardregel (BGB §437):</strong>
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• <strong>Private Verkäufe:</strong> 2 Jahre Gewährleistung</li>
              <li className="text-lg">• <strong>Gewerbliche Verkäufe:</strong> Nur wenn vertraglich vereinbart (meist 6&ndash;12 Monate)</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Wichtig:</strong> Die Frist beginnt mit der Übergabe. Wenn ein Mangel erst nach 2 Jahren 1 Monat auftritt, hast du keine Rechte mehr.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Ausnahme &ndash; Versteckte Mängel:</strong> Wenn ein Mangel vorhanden war, aber verborgen (z.B. Sehnerv-Atrophie), kann der Käufer die Gewährleistung bis 2 Jahre geltend machen.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Mängelrüge: Wie und wann du ein Problem anzeigen musst
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist eine strenge rechtliche Frist: <strong>Innerhalb von 7&ndash;14 Tagen nach Entdeckung musst du den Mangel schriftlich anzeigen.</strong>
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Wichtig:</strong> Nutze die Mitteilung nicht zur Rache. Sag nicht: &ldquo;Du Betrüger!&rdquo; Sag: &ldquo;Ich habe einen Mangel entdeckt und zeige ihn hiermit an.&rdquo;
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Deine Rechte bei Mängeln
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn ein Mangel innerhalb der Gewährleistungsfrist auftritt und du ihn korrekt anzeigst, hast du 4 Optionen (BGB §437&ndash;440):
            </p>

            <ol className="space-y-4 text-gray-700 ml-4">
              <li className="text-lg">
                <strong>Option 1 &ndash; Nacherfüllung (Reparatur):</strong> Der Verkäufer versucht, den Mangel zu beheben. Beim Pferd: Der Verkäufer zahlt Tierarzt-Kosten.
              </li>
              <li className="text-lg">
                <strong>Option 2 &ndash; Minderung (Preisreduktion):</strong> Der Kaufpreis wird reduziert. Beispiel: Kaufpreis war 15.000€, Therapiekosten sind 3.000€ &rarr; Neuer Preis 12.000€.
              </li>
              <li className="text-lg">
                <strong>Option 3 &ndash; Rücktritt (Rückgabe):</strong> Du gibst das Pferd zurück und bekommst dein Geld.
              </li>
              <li className="text-lg">
                <strong>Option 4 &ndash; Schadensersatz:</strong> Du verlangst Schadensersatz, wenn der Verkäufer den Mangel bewusst verschwiegen hat.
              </li>
            </ol>
          </section>

          {/* Section 7: Besondere Klauseln */}
          <section id="besondere-klauseln" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Besondere Klauseln und Zusatzvereinbarungen
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Es gibt Spezial-Situationen, für die man zusätzliche Klauseln braucht.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Probezeit und Rücktrittsrecht
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Manche Käufer wollen das Pferd vor dem Kauf &ldquo;testen&rdquo;. Eine mögliche Vereinbarung:
            </p>

            <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
              Probezeit: 14 Tage ab Übergabe. Der Käufer kann das Pferd in dieser Zeit<br />
              zurückgeben, wenn es nicht seinen Erwartungen entspricht.<br />
              Bedingung: Das Pferd darf nur leicht gearbeitet werden (keine Turniere).<br />
              Rücktrittskosten: Der Käufer trägt Transportkosten hin und zurück.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Eigentumsvorbehalt bei Ratenzahlung
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Wenn der Käufer in Raten zahlt:
            </p>

            <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
              Eigentumsvorbehalt: Das Pferd bleibt Eigentum des Verkäufers bis zur<br />
              Vollzahlung. Der Käufer darf das Pferd reiten und versorgen, besitzt<br />
              es aber nicht.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Vorkaufsrecht und Rückkaufsrecht
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das interessiert vor allem Züchter:
            </p>

            <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
              Rückkaufsrecht: Falls der Käufer das Pferd später verkaufen möchte,<br />
              hat der Verkäufer das Vorkaufsrecht. Der Verkäufer kann das Pferd<br />
              zu 80% des aktuellen Marktpreises zurückkaufen.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Das ist gültig und schützt Züchter vor schlecht versorgten Pferden.
            </p>
          </section>

          {/* Section 8: Rechtliche Besonderheiten */}
          <section id="rechtliche-besonderheiten" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Rechtliche Besonderheiten: Datenschutz, Steuern und weitere Aspekte
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Beim Pferdekaufvertrag gibt es noch weitere wichtige Aspekte, die über die reinen Vertragsinhalte hinausgehen.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Datenschutz und Persönliche Daten im Vertrag
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein Pferdekaufvertrag enthält persönliche Daten: Namen, Adressen, Telefonnummern. Mit der DSGVO (Datenschutz-Grundverordnung) müssen diese sensibel behandelt werden.
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• Speichere den Vertrag sicher (nicht ungesichert in der Cloud)</li>
              <li className="text-lg">• Gib die Kontaktdaten des anderen nicht an Dritte weiter</li>
              <li className="text-lg">• Nach Abschluss kannst du den Vertrag archivieren &ndash; gesetzliche Aufbewahrung für 6&ndash;10 Jahre</li>
              <li className="text-lg">• Digitale Verträge? Achte darauf, dass die Plattform DSGVO-konform ist</li>
            </ul>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Steuern und Umsatzsteuer beim Pferdeverkauf
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Beim{' '}
              <LocalizedLink href="/pferde-ratgeber/pferd-verkaufen" className="text-blue-600 hover:underline">
                Pferdeverkauf
              </LocalizedLink>
              {' '}kann Umsatzsteuer (MwSt.) anfallen &ndash; aber nicht immer:
            </p>

            <ul className="space-y-2 text-gray-700 ml-4">
              <li className="text-lg">• <strong>Private Verkäufer</strong> (Einzelperson, kein Geschäft): Keine Umsatzsteuer</li>
              <li className="text-lg">• <strong>Gewerbliche Verkäufer</strong> (Züchter, Händler): Normalerweise 19% MwSt. auf den Kaufpreis</li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>Im Vertrag festhalten:</strong> Falls Umsatzsteuer anfällt, sollte das explizit erwähnt sein. Der Kaufpreis ist dann entweder inkl. oder exkl. MwSt.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Versicherung beim Pferdetransport und Übergabe
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ein oft übersehener Punkt: Wer haftet, wenn das Pferd während des Verkaufsprozesses verletzt wird?
            </p>

            <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
              Haftung und Versicherung: Der Verkäufer haftet für Schäden am Pferd<br />
              bis zur Übergabe. Nach Übergabe trägt der Käufer volle Verantwortung.<br />
              Transport: Der Käufer trägt Transportkosten und Risiko, falls er den<br />
              Transport organisiert.
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Streitbeilegung und Rechtswahl
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed">
              Falls es später zu Differenzen kommt, ist es sinnvoll, vorab zu klären: Wo wird geklagt? Nach welchem Recht?
            </p>

            <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
              Gerichtsstand: Die zuständigen Gerichte am Wohnort des Beklagten.<br />
              Anwendbares Recht: Bundesrepublik Deutschland (BGB).
            </p>
          </section>

          {/* Österreich-spezifischer Abschnitt */}
          {currentLocale === 'at' && (
            <section id="recht-oesterreich" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Pferdekaufrecht in Österreich: ABGB-Besonderheiten
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                In Österreich gelten für den Pferdekauf die Bestimmungen des <strong>Allgemeinen Bürgerlichen Gesetzbuchs (ABGB)</strong>. Obwohl viele Grundprinzipien dem deutschen BGB ähneln, gibt es wichtige Unterschiede, die österreichische Käufer und Verkäufer kennen sollten.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Gewährleistung nach ABGB (§§ 922&ndash;933)
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed">
                Das österreichische Gewährleistungsrecht unterscheidet sich in einigen Punkten vom deutschen:
              </p>

              <ul className="space-y-3 text-gray-700 ml-4">
                <li className="text-lg">• <strong>Gewährleistungsfrist:</strong> 2 Jahre bei beweglichen Sachen (Pferde) &ndash; identisch mit Deutschland</li>
                <li className="text-lg">• <strong>Beweislastumkehr:</strong> In den ersten 6 Monaten wird vermutet, dass der Mangel bereits bei Übergabe vorhanden war (§ 924 ABGB)</li>
                <li className="text-lg">• <strong>Verbesserung vor Wandlung:</strong> Der Verkäufer hat das Recht auf Nachbesserung, bevor der Käufer vom Vertrag zurücktreten kann</li>
                <li className="text-lg">• <strong>Rügeobliegenheit:</strong> Bei Unternehmern: Mängel müssen unverzüglich gerügt werden (§ 377 UGB)</li>
              </ul>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Besonderheiten beim Pferdekauf in Österreich
              </h3>

              <ul className="space-y-3 text-gray-700 ml-4">
                <li className="text-lg">• <strong>Equidenpass:</strong> Seit 2016 verpflichtend für alle Pferde in Österreich &ndash; muss bei Verkauf übergeben werden</li>
                <li className="text-lg">• <strong>Tierschutzgesetz (TSchG):</strong> Strengere Anforderungen an Haltung und Transport als in Deutschland</li>
                <li className="text-lg">• <strong>Zentrale Equidendatenbank:</strong> Registrierung aller Pferde bei der{' '}
                  <a href="https://www.oekv.at" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Österreichischen Kfz-Prüfstelle (ÖKV)
                  </a>
                </li>
                <li className="text-lg">• <strong>Umsatzsteuer:</strong> 20% USt. bei gewerblichen Verkäufern (vs. 19% in Deutschland)</li>
              </ul>

              <RatgeberHighlightBox title="Tipp für Käufer in Österreich" icon={warningIcon}>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Achte bei einem Kauf aus Deutschland darauf, dass der Equidenpass auf dich umgeschrieben wird und das Pferd in der österreichischen Datenbank registriert wird. Die Umschreibung erfolgt über die zuständige Landeskammer für Land- und Forstwirtschaft.
                </p>
              </RatgeberHighlightBox>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Vertragsklausel für Österreich
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
                Gerichtsstand: Das sachlich und örtlich zuständige Gericht in Österreich.<br />
                Anwendbares Recht: Republik Österreich (ABGB).
              </p>
            </section>
          )}

          {/* Schweiz-spezifischer Abschnitt */}
          {currentLocale === 'ch' && (
            <section id="recht-schweiz" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                Pferdekaufrecht in der Schweiz: OR-Besonderheiten
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                In der Schweiz ist der Pferdekauf im <strong>Obligationenrecht (OR)</strong> geregelt. Das Schweizer Recht unterscheidet sich in mehreren wichtigen Punkten von Deutschland und Österreich.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Gewährleistung nach Obligationenrecht (Art. 197&ndash;210 OR)
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed">
                Das Schweizer Gewährleistungsrecht ist strenger strukturiert:
              </p>

              <ul className="space-y-3 text-gray-700 ml-4">
                <li className="text-lg">• <strong>Gewährleistungsfrist:</strong> 2 Jahre bei beweglichen Sachen (Art. 210 OR)</li>
                <li className="text-lg">• <strong>Rügepflicht:</strong> Mängel müssen <strong>sofort</strong> nach Entdeckung gerügt werden (Art. 201 OR) &ndash; strenger als in DE/AT!</li>
                <li className="text-lg">• <strong>Untersuchungspflicht:</strong> Der Käufer muss die Ware nach Erhalt prüfen (Art. 201 OR)</li>
                <li className="text-lg">• <strong>Wahlrecht:</strong> Wandlung (Rückgabe) oder Minderung (Preisreduktion) &ndash; kein Nachbesserungsrecht</li>
              </ul>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Besonderheiten beim Pferdekauf in der Schweiz
              </h3>

              <ul className="space-y-3 text-gray-700 ml-4">
                <li className="text-lg">• <strong>Tierseuchenverordnung (TSV):</strong> Equidenpass ist Pflicht, Registrierung bei der{' '}
                  <a href="https://www.agate.ch" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Tierverkehrsdatenbank Agate
                  </a>
                </li>
                <li className="text-lg">• <strong>Keine Beweislastumkehr:</strong> Im Gegensatz zu DE/AT muss der Käufer von Anfang an beweisen, dass der Mangel bei Übergabe bestand</li>
                <li className="text-lg">• <strong>Handänderungssteuer:</strong> Je nach Kanton können Steuern auf den Kauf anfallen</li>
                <li className="text-lg">• <strong>Mehrwertsteuer:</strong> 8,1% MWST bei gewerblichen Verkäufern (deutlich niedriger als DE/AT)</li>
              </ul>

              <RatgeberHighlightBox title="Wichtig: Rügepflicht in der Schweiz" icon={warningIcon}>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Die Schweizer Rügepflicht ist kritisch: Entdeckst du einen Mangel, musst du ihn <strong>sofort</strong> schriftlich anzeigen. &ldquo;Sofort&rdquo; bedeutet in der Praxis 1&ndash;3 Tage. Wartest du länger, verlierst du deine Gewährleistungsrechte!
                </p>
              </RatgeberHighlightBox>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Viehgewährschaftsregeln (historisch)
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed">
                Früher gab es in der Schweiz spezielle &ldquo;Viehgewährschaftsregeln&rdquo; mit kurzen Fristen für Tiermängel. Diese wurden 2013 abgeschafft &ndash; heute gelten die normalen OR-Regeln. Allerdings sind kurze Rügefristen bei Pferden weiterhin üblich und sollten im Vertrag definiert werden.
              </p>

              <h3 className="text-2xl font-serif font-bold text-brand mt-8">
                Vertragsklausel für die Schweiz
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed bg-gray-100 p-4 rounded-lg font-mono text-base">
                Gerichtsstand: Das zuständige Gericht am Wohnsitz des Beklagten in der Schweiz.<br />
                Anwendbares Recht: Schweizerisches Obligationenrecht (OR).
              </p>
            </section>
          )}

          {/* Section 9: Praktische Tipps */}
          <section id="praktische-tipps" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
              Praktische Tipps für Verkäufer und Käufer
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Abschließend noch bewährte Tipps, um typische Fehler zu vermeiden:
            </p>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Für Verkäufer
            </h3>

            <ol className="space-y-4 text-gray-700 ml-4">
              <li className="text-lg">
                <strong>Gib den Vertrag rechtzeitig ab</strong> &ndash; Der Käufer sollte ihn VOR dem Besichtigungstermin lesen können.
              </li>
              <li className="text-lg">
                <strong>Sei ehrlich über bekannte Mängel</strong> &ndash; Wenn das Pferd einen bekannten Fehler hat (Sommerekzem, leichte Lahmheit), erwähne ihn. Ein ehrlicher{' '}
                <LocalizedLink href="/pferde-ratgeber/pferd-verkaufen" className="text-blue-600 hover:underline">
                  Verkäufer
                </LocalizedLink>
                {' '}wird nicht verklagt.
              </li>
              <li className="text-lg">
                <strong>Mache Foto- und Videodokumentation</strong> &ndash; Fotos des Übergabezustands schützen dich, falls der Käufer später unbegründete Schäden behauptet.
              </li>
              <li className="text-lg">
                <strong>Nutze beglaubigte Kopien</strong> &ndash; Beide Parteien unterschreiben und bekommen eine Kopie.
              </li>
            </ol>

            <h3 className="text-2xl font-serif font-bold text-brand mt-8">
              Für Käufer
            </h3>

            <ol className="space-y-4 text-gray-700 ml-4">
              <li className="text-lg">
                <strong>Lese den Vertrag dreimal</strong> &ndash; Erst selbst, dann mit jemandem mit Fachwissen, dann nochmal allein.
              </li>
              <li className="text-lg">
                <strong>Stelle alle Fragen VOR der Unterschrift</strong> &ndash; Nachträglich ist es zu spät.
              </li>
              <li className="text-lg">
                <strong>Mache IMMER eine{' '}
                  <LocalizedLink href="/pferde-ratgeber/aku-pferd" className="text-blue-600 hover:underline">
                    Ankaufsuntersuchung
                  </LocalizedLink>
                </strong> &ndash; Die 400&ndash;800€ Kosten sind eine Versicherung gegen 5.000€+ unerwartete Reparaturen.
              </li>
              <li className="text-lg">
                <strong>Dokumentiere den Übergabezustand</strong> &ndash; Videos, Fotos, Notizen. Alles datiert.
              </li>
              <li className="text-lg">
                <strong>Behalte Kopien aller Unterlagen</strong> &ndash; Pferdepass, AKU-Report, Impfpässe, Kaufvertrag. Digitale UND physische Kopien.
              </li>
            </ol>

            <RatgeberHighlightBox title="Fazit: Rechtssicherer Pferdekauf" icon={warningIcon}>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ein Pferdekaufvertrag schützt dich vor kostspieligen Fehlern. Die vier kritischsten Punkte: (1) Nutze immer einen schriftlichen Vertrag, (2) Klare Gewährleistungsvereinbarungen, (3) Dokumentieren ist alles, (4) Unterscheide privat von gewerblich.
              </p>
            </RatgeberHighlightBox>
          </section>
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mt-16 scroll-mt-32 lg:scroll-mt-40">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FAQ
              faqs={faqItems}
              sectionTitle="Häufig gestellte Fragen zum Pferdekaufvertrag"
              sectionSubtitle="Die wichtigsten Antworten zu Verträgen, Gewährleistung und rechtlichen Aspekten beim Pferdekauf"
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
          title="Weiterführende Artikel"
          articles={relatedArticles}
          description="Vertiefen Sie Ihr Wissen über den Pferdekauf und rechtliche Aspekte:"
        />

        {/* Final CTA */}
        <RatgeberFinalCTA
          image={finalCtaImage}
          title="Bereit, deinen Pferdepreis zu ermitteln?"
          description="Nutzen Sie unsere KI-gestützte Bewertung, um den genauen Marktwert deines Pferdes zu erfahren &ndash; in nur 2 Minuten."
          ctaHref="/pferde-preis-berechnen"
          ctaLabel="Jetzt Pferdewert berechnen"
        />
      </main>
    </Layout>
    </>
  )
}

export default Pferdekaufvertrag
