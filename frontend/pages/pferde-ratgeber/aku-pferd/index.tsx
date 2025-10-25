import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Clock, Calendar, Award, ArrowRight, ChevronDown } from 'lucide-react'

import Layout from '@/components/Layout'
import FAQ from '@/components/FAQ'
import RatgeberHero from '@/components/ratgeber/RatgeberHero'
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage'
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox'
import RatgeberInfoTiles from '@/components/ratgeber/RatgeberInfoTiles'
import RatgeberRegionGrid from '@/components/ratgeber/RatgeberRegionGrid'
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles'
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents'
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA'
import {
  akuSections,
  akuTimeTiles,
  akuRegions,
  akuFaqItems,
  akuRelatedArticles,
  akuClasses
} from '@/data/ratgeber/akuPferd'
import scrollToSection from '@/utils/ratgeber/scrollToSection'
import { getRatgeberBySlug } from '@/lib/ratgeber-registry'

const AKUPferd: NextPage = () => {
  const getSectionNumber = (sectionId: string) => {
    const index = akuSections.findIndex(section => section.id === sectionId)
    return index === -1 ? undefined : index + 1
  }

  const numberedTitle = (sectionId: string, title: string) => {
    const number = getSectionNumber(sectionId)
    return number ? `${number}. ${title}` : title
  }

  const heroMetaItems = [
    {
      icon: <Clock className="h-4 w-4" />,
      label: '12 min Lesezeit'
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: (
        <span suppressHydrationWarning>
          {new Date().toLocaleDateString('de-DE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </span>
      )
    },
    {
      icon: <Award className="h-4 w-4" />,
      label: 'Experten-Ratgeber'
    }
  ]

  const handleTableOfContentsClick = (sectionId: string) => {
    scrollToSection(sectionId)
  }

  const handleScrollToToc = () => {
    if (typeof window === 'undefined') return
    document.getElementById('inhaltsverzeichnis')?.scrollIntoView({ behavior: 'smooth' })
  }

  // JSON-LD Structured Data - OPTIMIERT FÜR INFORMATIONAL INTENT
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "Guide",
    "name": "Ankaufsuntersuchung beim Pferd: Der komplette Leitfaden",
    "description": "Alles über die Ankaufsuntersuchung (AKU) beim Pferd – Definition, Ablauf, Befundklassen und worauf Sie achten sollten",
    "author": {
      "@type": "Organization",
      "name": "PferdeWert.de"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Verstehen Sie die AKU-Grundlagen",
        "text": "Eine AKU ist eine standardisierte tierärztliche Untersuchung vor dem Pferdekauf, die den Gesundheitszustand und die körperliche Eignung dokumentiert."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Wählen Sie die richtige AKU-Klasse",
        "text": "Kleine AKU für Freizeitpferde (1-2 Stunden, klinische Untersuchung). Große AKU für Sportpferde (2-4 Stunden, mit Röntgenaufnahmen)."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Verstehen Sie das aktuelle Befundungssystem (seit 2018)",
        "text": "Seit dem Röntgenleitfaden 2018 der GPM: o.b.B. (ohne besonderen Befund) oder präzise Beschreibung der Abweichungen mit Unterscheidung zwischen Befunden und Risiko-Befunden. Das alte Klassensystem I-V existiert nicht mehr."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Wählen Sie einen unabhängigen Tierarzt",
        "text": "Ein unabhängiger Veterinär gibt objektive Befunde. Vermeiden Sie den Stallveterinär des Verkäufers wegen Interessenskonflikten."
      }
    ]
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PferdeWert.de",
    "url": "https://pferdewert.de",
    "logo": "https://pferdewert.de/images/logo.webp",
    "description": "Deutschlands führende Plattform für KI-gestützte Pferdebewertung",
    "sameAs": [
      "https://www.facebook.com/pferdewert",
      "https://www.instagram.com/pferdewert"
    ]
  }

  return (
    <>
      <Head>
        {/* OPTIMIERT: Fokus auf "aku pferd" (informational), KEIN Kosten-Keyword */}
        <title>Ankaufsuntersuchung beim Pferd: Der komplette Leitfaden zur AKU</title>
        <meta name="description" content="Was ist eine AKU? Erfahren Sie alles über die Ankaufsuntersuchung beim Pferd – Ablauf, Befundklassen, Unterschied zwischen kleiner und großer AKU sowie worauf Sie bei der Wahl des Tierarztes achten sollten." />
        <meta name="keywords" content="aku pferd, ankaufsuntersuchung pferd, aku ablauf, kleine aku, große aku, aku klassen, befunde, röntgenbilder" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Technical Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#5A4B3B" />
        <meta name="msapplication-TileColor" content="#5A4B3B" />

        {/* Canonical and hreflang */}
        <link rel="canonical" href="https://www.pferdewert.de/pferde-ratgeber/aku-pferd" />
        <link rel="alternate" hrefLang="de-DE" href="https://pferdewert.de/pferde-ratgeber/aku-pferd" />

        {/* Open Graph */}
        <meta property="og:title" content="Ankaufsuntersuchung beim Pferd: Der komplette Leitfaden zur AKU" />
        <meta property="og:description" content="Was ist eine AKU? Alles über die Ankaufsuntersuchung beim Pferd – Ablauf, Befundklassen und worauf Sie achten sollten." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/aku-pferd" />
        <meta property="og:image" content="https://pferdewert.de/images/aku-pferd-ratgeber.jpg" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ankaufsuntersuchung beim Pferd: Der komplette Leitfaden" />
        <meta name="twitter:description" content="Was ist eine AKU? Alles über Ablauf, Befundklassen und worauf Sie achten sollten." />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Prefetch for Core Pages */}
        <link rel="prefetch" href="/pferde-preis-berechnen" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </Head>

      <Layout fullWidth={true} background="bg-gradient-to-b from-amber-50 to-white">
        {/* HERO: Fokus auf "Was ist AKU?" nicht "Kosten" */}
        <RatgeberHero
          badgeLabel="Pferde-Ratgeber"
          badgeIcon={<Award className="h-4 w-4" />}
          title="Ankaufsuntersuchung beim Pferd"
          subtitle="Die AKU ist die wichtigste Investition beim Pferdekauf. In diesem Leitfaden erfahren Sie, wie eine Ankaufsuntersuchung abläuft, welche Befundklassen es gibt und wann Sie welche Art von AKU benötigen. Schützen Sie sich vor versteckten Mängeln mit fundiertem Wissen."
          metaItems={heroMetaItems}
          primaryCta={{
            href: '/pferde-preis-berechnen',
            label: 'Pferdewert jetzt berechnen',
            icon: <ArrowRight className="w-5 h-5" />
          }}
          secondaryCta={{
            label: 'Zum Inhalt',
            icon: <ChevronDown className="w-5 h-5" />,
            onClick: handleScrollToToc
          }}
        />

        <RatgeberHeroImage
          src={getRatgeberBySlug('aku-pferd')?.image || '/images/ratgeber/aku-pferd/hero.webp'}
          alt="Ankaufsuntersuchung beim Pferd - Tierarzt untersucht Pferd gründlich"
          priority
        />

        <RatgeberTableOfContents sections={akuSections} onNavigate={handleTableOfContentsClick} />

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Article Content */}
          <article className="max-w-5xl mx-auto space-y-16">

            {/* 1. Was ist eine AKU? */}
            <div id="definition" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('definition', 'Was ist eine AKU beim Pferd?')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Eine <strong>Ankaufsuntersuchung (AKU)</strong> ist eine standardisierte tierärztliche Untersuchung, die <em>vor dem Pferdekauf</em> durchgeführt wird. Sie dient dem Käufer als wichtigstes Mittel, um den aktuellen Gesundheitszustand und die körperliche Eignung des Pferdes für den beabsichtigten Verwendungszweck zu überprüfen.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                Die AKU ist nicht nur eine medizinische Untersuchung – sie ist auch ein <strong>rechtliches Dokument</strong>, das Ihnen Sicherheit und Absicherung vor versteckten Mängeln bietet. Mit einem gültigen AKU-Vorbehalt können Sie den Kauf ohne Begründung rückgängig machen, wenn die AKU erhebliche Befunde zeigt.
              </p>
              <RatgeberHighlightBox title="Wichtig: Definition der AKU">
                <ul className="list-disc list-inside space-y-2">
                  <li>Standardisierte tierärztliche Untersuchung vor dem Pferdekauf</li>
                  <li>Dokumentiert den Gesundheitszustand zu einem bestimmten Zeitpunkt</li>
                  <li>Umfasst klinische Untersuchung und optional Röntgenaufnahmen</li>
                  <li>Dient als rechtliches Beweismittel bei späteren Streitigkeiten</li>
                  <li>Ermöglicht Rücktritt &bdquo;ohne Befund&ldquo; (mit AKU-Vorbehalt im Kaufvertrag)</li>
                </ul>
              </RatgeberHighlightBox>
            </div>

            {/* 2. Warum eine AKU wichtig ist */}
            <div id="importance" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('importance', 'Warum eine AKU beim Pferdekauf so wichtig ist')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Ein Pferdekauf ist eine große finanzielle und emotionale Entscheidung. Eine AKU schützt Sie vor teuren Überraschungen, die erst Wochen oder Monate nach dem Kauf sichtbar werden.
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="border-l-4 border-brand pl-4">
                  <h3 className="font-bold text-lg mb-2">Medizinischer Schutz</h3>
                  <p className="text-gray-700">Deckt versteckte Gesundheitsprobleme auf – von Arthrosen über Herzprobleme bis zu chronischen Lahmheiten, die dem Käufer sonst nicht aufgefallen wären.</p>
                </div>
                <div className="border-l-4 border-brand pl-4">
                  <h3 className="font-bold text-lg mb-2">Rechtliche Absicherung</h3>
                  <p className="text-gray-700">Das AKU-Protokoll ist ein offizielles Dokument, das bei Streitigkeiten vor Gericht als Beweismittel akzeptiert wird.</p>
                </div>
                <div className="border-l-4 border-brand pl-4">
                  <h3 className="font-bold text-lg mb-2">Rücktrittsrecht</h3>
                  <p className="text-gray-700">Mit einem AKU-Vorbehalt im Kaufvertrag können Sie den Kauf rückgängig machen, wenn erhebliche Befunde vorliegen – ohne weitere Diskussionen mit dem Verkäufer.</p>
                </div>
                <div className="border-l-4 border-brand pl-4">
                  <h3 className="font-bold text-lg mb-2">Bessere Entscheidung</h3>
                  <p className="text-gray-700">Sie treffen Ihre Kaufentscheidung basierend auf objektiven Fakten, nicht auf dem Eindruck beim Probereiten.</p>
                </div>
              </div>
            </div>

            {/* 3. Kleine vs. Große AKU */}
            <div id="types" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('types', 'Kleine vs. Große AKU: Was ist der Unterschied?')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Je nach Kaufpreis und Verwendungszweck des Pferdes gibt es verschiedene AKU-Umfänge. Wir zeigen Ihnen, welche AKU für Ihre Situation sinnvoll ist.
              </p>

              {/* Info Tiles */}
              <RatgeberInfoTiles
                headline="AKU-Arten im Überblick"
                tiles={[
                  {
                    title: 'Kleine AKU',
                    value: '1-2 Stunden',
                    description: 'Reine klinische Untersuchung ohne Röntgenbilder. Geeignet für Freizeitpferde bis ca. 5.000€.'
                  },
                  {
                    title: 'Große AKU',
                    value: '2-4 Stunden',
                    description: 'Klinische Untersuchung + 18 Standard-Röntgenaufnahmen (seit 2018). Empfohlen ab 10.000€ oder für Sportpferde.'
                  },
                  {
                    title: 'Spezial-AKU',
                    value: 'Individuell',
                    description: 'Alle Leistungen der großen AKU + Ultraschall, Endoskopie, Laboruntersuchungen. Für hochwertige Zucht- und Sportpferde.'
                  }
                ]}
              />

              {/* Detailed Classes Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">AKU-Umfang</th>
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">Inhalt</th>
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">Dauer</th>
                      <th className="border border-amber-300 px-4 py-2 text-left font-bold">Geeignet für</th>
                    </tr>
                  </thead>
                  <tbody>
                    {akuClasses.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-amber-50'}>
                        <td className="border border-amber-200 px-4 py-3 font-bold text-brand">{item.title}</td>
                        <td className="border border-amber-200 px-4 py-3">
                          <ul className="list-disc list-inside text-sm">
                            {item.includes.map((inc, i) => <li key={i}>{inc}</li>)}
                          </ul>
                        </td>
                        <td className="border border-amber-200 px-4 py-3">{item.duration}</td>
                        <td className="border border-amber-200 px-4 py-3">{item.suitable}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Ablauf der Untersuchung */}
            <div id="process" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('process', 'Wie läuft eine AKU ab? Schritt-für-Schritt-Anleitung')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Eine AKU besteht aus mehreren Phasen. Hier ist ein Überblick über den kompletten Ablauf:
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-brand p-6 rounded">
                  <h3 className="text-xl font-bold mb-2">Phase 1: Vorbereitung (vor dem Untersuchungstermin)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Unabhängigen Tierarzt auswählen</strong> – nicht den Stallveterinär des Verkäufers</li>
                    <li><strong>AKU-Klasse festlegen</strong> – kleine oder große AKU?</li>
                    <li><strong>Röntgenumfang definieren</strong> – Standard sind 18 Aufnahmen (seit Röntgenleitfaden 2018)</li>
                    <li><strong>AKU-Vorbehalt im Kaufvertrag</strong> – vereinbaren für kostenloses Rücktrittsrecht</li>
                    <li><strong>Kosten klären</strong> – schriftliche Kostenaufstellung vom Tierarzt einholen</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-brand p-6 rounded">
                  <h3 className="text-xl font-bold mb-2">Phase 2: Klinische Untersuchung (am Untersuchungstag, 1-2 Stunden)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Allgemeinzustand:</strong> Körperkondition, Temperatur, Verhalten</li>
                    <li><strong>Gangbildanalyse:</strong> Schritt und Trab auf hartem und weichem Boden, Longieren</li>
                    <li><strong>Flexionsproben:</strong> Alle Gelenke einzeln prüfen, auf Reaktionen achten</li>
                    <li><strong>Herz-Kreislauf:</strong> Herzfrequenz, Atemfrequenz, Abhören mit Stethoskop</li>
                    <li><strong>Lungen-Untersuchung:</strong> Atemgeräusche kontrollieren</li>
                    <li><strong>Zähne, Augen, Ohren:</strong> Detaillierte Untersuchung</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-brand p-6 rounded">
                  <h3 className="text-xl font-bold mb-2">Phase 3: Röntgenuntersuchung (nur bei großer AKU, 1-1,5 Stunden)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>18 Standard-Aufnahmen (seit 2018):</strong> Vorderfußwurzelgelenk, Fesselgelenk vorne/hinten, Hufgelenk, Sprunggelenk, sowie weitere Standard-Aufnahmen für umfassende Bewertung</li>
                    <li><strong>Digitale Entwicklung:</strong> Aufnahmen sofort verfügbar zur ersten Sichtung</li>
                    <li><strong>Zusatzaufnahmen bei Befunden:</strong> Falls nötig, werden erweiterte Aufnahmen gemacht</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-brand p-6 rounded">
                  <h3 className="text-xl font-bold mb-2">Phase 4: Befundung & Protokoll-Erstellung (24-48 Stunden später)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Röntgenauswertung:</strong> Alle 18 Bilder werden detailliert beurteilt</li>
                    <li><strong>Präzise Befundbeschreibung (seit 2018):</strong> Jeder Befund wird individuell beschrieben – o.b.B., Abweichung, oder Risiko-Befund</li>
                    <li><strong>AKU-Protokoll erstellen:</strong> Vollständiger Bericht mit allen Befunden und Bewertung</li>
                    <li><strong>Kaufempfehlung formulieren:</strong> Basierend auf Befunddaten und beabsichtigter Reitweise</li>
                    <li><strong>Übergabe an Käufer:</strong> Protokoll gehört dem Käufer, nicht dem Verkäufer</li>
                  </ul>
                </div>
              </div>

              <RatgeberHighlightBox title="Zeitrahmen der AKU">
                <ul className="list-disc list-inside space-y-2">
                  {akuTimeTiles.map((tile, idx) => (
                    <li key={idx}><strong>{tile.title}:</strong> {tile.value} ({tile.description})</li>
                  ))}
                </ul>
              </RatgeberHighlightBox>
            </div>

            {/* 5. Befunde verstehen */}
            <div id="findings" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('findings', 'Befunde verstehen: Das aktuelle System seit 2018')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Seit dem <strong>Röntgenleitfaden 2018 der Gesellschaft für Pferdemedizin (GPM)</strong> wird das alte Klassensystem (I-V) nicht mehr verwendet. Das neue System ist präziser und fairere für Pferde, da es stärker auf individuelle Befundbeschreibung und Risikoanalyse setzt – nicht auf pauschale Klassifizierung.
              </p>

              <RatgeberHighlightBox title="Warum wurde das alte Klassensystem abgeschafft?">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Unfaire Disqualifikation:</strong> Das alte System (Klasse I-V) führte dazu, dass Pferde mit identischen Befunden unterschiedlich bewertet wurden</li>
                  <li><strong>Fehlende Aussagekraft:</strong> Befundklassen sagten nichts über das tatsächliche Lahmheitsrisiko aus</li>
                  <li><strong>Zu starr:</strong> Ein einzelnes Befund im Sprunggelenk (Klasse III) bedeutete nicht automatisch Probleme bei der gewünschten Reitweise</li>
                  <li><strong>Neue Lösung:</strong> Präzise Beschreibung + klare Unterscheidung zwischen Befunden und risikobehafteten Befunden</li>
                </ul>
              </RatgeberHighlightBox>

              <div className="mt-8 space-y-4">
                <h3 className="text-2xl font-bold font-serif text-brand">Das neue Befundungssystem seit 2018:</h3>

                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                  <h3 className="font-bold text-lg text-green-900">o.b.B. – Ohne besonderen Befund</h3>
                  <p className="text-gray-700 mt-2">Es wurden <strong>keine Abweichungen von der normalen Röntgenanatomie</strong> gefunden. Das Pferd zeigt optimale Befunde für die beabsichtigte Reitweise. Dies ist der beste mögliche Befund.</p>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                  <h3 className="font-bold text-lg text-yellow-900">Befunde mit Abweichungen (ohne Risiko-Kennzeichnung)</h3>
                  <p className="text-gray-700 mt-2">Der Befund zeigt Abweichungen von der Norm. <strong>Das Lahmheitsrisiko ist aber nicht verlässlich einschätzbar.</strong> Diese Befunde sind teils altersgerecht, teils ohne bekannte funktionelle Bedeutung. Sie erfordern eine individuelle Bewertung.</p>
                </div>

                <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                  <h3 className="font-bold text-lg text-red-900">Risiko-Befunde (mit &quot;Risiko&quot;-Kennzeichnung)</h3>
                  <p className="text-gray-700 mt-2">Der Befund ist <strong>mit einem bekannten Lahmheitsrisiko verbunden.</strong> Diese Befunde sind deutlich problematischer und beeinflussen die Kaufempfehlung. Je nach Schweregrad und Reitweise kann ein Risiko-Befund ein Ausschlusskriterium sein.</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-gray-800"><strong>Wie liest man einen modernen AKU-Befund?</strong></p>
                <p className="text-gray-700 mt-2">Der Tierarzt beschreibt für jede untersuchte Körperregion präzise, welche Befunde vorliegen. Jeder Befund wird einzeln evaluiert – nicht das ganze Pferd wird in eine Klasse eingeteilt. Manche Befunde bekommen die Zusatzbezeichnung &quot;Risiko&quot;, wenn sie mit Lahmheitsrisiko verbunden sind.</p>
              </div>
            </div>

            {/* 6. Wann braucht man welche Stufe? */}
            <div id="when" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('when', 'Wann braucht man welche AKU-Stufe?')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Die Wahl zwischen kleiner und großer AKU hängt von mehreren Faktoren ab. Hier ist eine Orientierungshilfe:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-amber-300 bg-amber-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <span className="inline-block bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">✓</span>
                    Kleine AKU ausreichend
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ Freizeitpferde unter 5.000€</li>
                    <li>✓ Junge Pferde ohne Vorgeschichte</li>
                    <li>✓ Probepferde vor kurzfristigem Kauf</li>
                    <li>✓ Pferde mit hervorragender Bewegungsqualität</li>
                  </ul>
                </div>

                <div className="border border-red-300 bg-red-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <span className="inline-block bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">!</span>
                    Große AKU empfohlen
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>! Kaufpreis über 10.000€</li>
                    <li>! Sportpferde (Dressur, Springen, Vielseitigkeit)</li>
                    <li>! Ältere Pferde (7+ Jahre)</li>
                    <li>! Pferde mit unklarer Vorgeschichte</li>
                    <li>! Pferde mit früheren Verletzungen</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. Worauf sollte man achten? */}
            <div id="what-to-watch" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('what-to-watch', 'Worauf sollte man bei der AKU achten?')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Einige Tipps, um das Beste aus Ihrer AKU herauszuholen:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">🔍</div>
                  <div>
                    <h3 className="font-bold mb-2">Unabhängiger Tierarzt</h3>
                    <p className="text-gray-700">Wählen Sie einen Tierarzt, der nicht mit dem Verkäufer verbunden ist. Das ist essentiell für objektive Befunde.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">📋</div>
                  <div>
                    <h3 className="font-bold mb-2">AKU-Vorbehalt im Kaufvertrag</h3>
                    <p className="text-gray-700">Vereinbaren Sie schriftlich, dass der Kauf an eine positive AKU gekoppelt ist. Dies ermöglicht kostenloses Rücktrittsrecht ohne Befund.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">🐎</div>
                  <div>
                    <h3 className="font-bold mb-2">Probereiten beim AKU-Termin</h3>
                    <p className="text-gray-700">Reiten Sie das Pferd direkt vor der AKU. So sieht der Tierarzt das Pferd in Bewegung und kann besser klinische Befunde einordnen.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">💬</div>
                  <div>
                    <h3 className="font-bold mb-2">Fragen beim Untersuchungstermin stellen</h3>
                    <p className="text-gray-700">Nutzen Sie den Termin, um offene Fragen zu stellen. Der Tierarzt kann viel über Voraussagen zukünftiger Probleme erklären.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">⏱️</div>
                  <div>
                    <h3 className="font-bold mb-2">Ausreichend Zeit für große AKU einplanen</h3>
                    <p className="text-gray-700">Großes AKU mit Röntgen benötigt 2-4 Stunden. Hetzen Sie nicht – eine gründliche Untersuchung braucht Zeit.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-2xl">📸</div>
                  <div>
                    <h3 className="font-bold mb-2">Röntgenbilder-Archiv behalten</h3>
                    <p className="text-gray-700">Bekommen Sie die Röntgenbilder auf CD/USB. So können Sie diese auch einem Zweittierarzt zeigen, falls nötig.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Rechtliche Aspekte */}
            <div id="legal" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('legal', 'Rechtliche Aspekte der AKU')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Die AKU hat auch rechtliche Implikationen, die Sie kennen sollten:
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-lg mb-2">AKU-Vorbehalt im Kaufvertrag</h3>
                  <p className="text-gray-700 mb-3">Ein AKU-Vorbehalt ist eine schriftliche Vereinbarung, dass der Kauf an ein positives AKU-Ergebnis gekoppelt ist. Mit dieser Klausel haben Sie das Recht, vom Kaufvertrag zurückzutreten, wenn die AKU erhebliche oder risikobehaftete Befunde zeigt – <strong>ohne Angabe von Gründen und ohne finanzielle Konsequenzen</strong>.</p>
                  <p className="text-gray-700 font-semibold mt-3">Musterformulierung: &bdquo;Dieser Kaufvertrag wird unter der Bedingung geschlossen, dass das Pferd die AKU ohne erhebliche Befunde besteht. Ein kostenfreier Rücktritt ist möglich, falls Risiko-Befunde oder wesentliche Abweichungen festgestellt werden, die für die beabsichtigte Reitweise problematisch sind.&ldquo;</p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-bold text-lg mb-2">AKU-Protokoll als Beweis im Rechtsstreit</h3>
                  <p className="text-gray-700">Das offizielle AKU-Protokoll ist ein anerkanntes Beweismittel vor Gericht. Wenn später Probleme auftreten, die auf den Kaufzeitpunkt zurückzuführen sind, können Sie das AKU-Protokoll vorlegen als Nachweis, dass diese Probleme beim Kauf bereits vorhanden waren (oder nicht).</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-bold text-lg mb-2">Wer trägt die Kosten im Streitfall?</h3>
                  <p className="text-gray-700">Üblicherweise trägt der Käufer die AKU-Kosten. Im Kaufvertrag sollte aber festgehalten werden, wer zahlt, falls die AKU erhebliche Befunde zeigt und der Kauf rückgängig gemacht wird. Oft wird vereinbart, dass der Verkäufer die Kosten trägt, wenn wesentliche Abweichungen oder Risiko-Befunde vorliegen.</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-bold text-lg mb-2">Gewährleistungsrecht nach Kauf</h3>
                  <p className="text-gray-700">Mit einem ordnungsgemäß durchgeführten AKU-Vorbehalt sind Sie rechtlich gut abgesichert. Sollten nach dem Kauf Probleme auftauchen, die auf ein unerkanntes Leiden hindeuten, können Sie das AKU-Protokoll als Nachweis heranziehen, dass diese Probleme beim Kauf nicht erkannt wurden – eine wichtige Grundlage für eventuelle Schadensersatzforderungen.</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded">
                <p className="text-gray-800 text-sm"><strong>Hinweis:</strong> Dies ist eine Informationsdarstellung. Bei rechtlichen Fragen sollten Sie einen Anwalt für Pferdekauf oder Tierrecht konsultieren.</p>
              </div>
            </div>

            {/* 9. Den richtigen Tierarzt wählen */}
            <div id="vet-selection" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('vet-selection', 'So finden Sie den richtigen AKU-Tierarzt')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Die Wahl des Tierarztes ist entscheidend für die Qualität der AKU. Hier sind Kriterien für einen guten AKU-Tierarzt:
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-amber-50 rounded border-l-4 border-amber-500">
                  <span className="flex-shrink-0 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold">Spezialisierung auf AKU</h3>
                    <p className="text-gray-700 text-sm">Der Tierarzt sollte regelmäßig AKUs durchführen und Erfahrung mit verschiedenen Pferderassen und Disziplinen haben.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-amber-50 rounded border-l-4 border-amber-500">
                  <span className="flex-shrink-0 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold">Unabhängigkeit vom Verkäufer</h3>
                    <p className="text-gray-700 text-sm">Der Tierarzt sollte nicht die reguläre Stallveterinär des Verkäufers sein. Das könnte zu Interessenskonflikten führen.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-amber-50 rounded border-l-4 border-amber-500">
                  <span className="flex-shrink-0 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold">Moderne Röntgen-Ausrüstung</h3>
                    <p className="text-gray-700 text-sm">Digitale Röntgengeräte mit guter Bildqualität sind Standard. Das ermöglicht detaillierte Befundung und schnelle Bildbearbeitung.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-amber-50 rounded border-l-4 border-amber-500">
                  <span className="flex-shrink-0 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold">Gute Reputation in der Pferde-Community</h3>
                    <p className="text-gray-700 text-sm">Fragen Sie andere Pferdebesitzer oder Reitschulen nach Empfehlungen. Eine gute Reputation ist ein Zeichen für Qualität und Fairness.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-amber-50 rounded border-l-4 border-amber-500">
                  <span className="flex-shrink-0 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold">Transparente Kostenkalkulation</h3>
                    <p className="text-gray-700 text-sm">Der Tierarzt sollte vorab Kosten transparent machen – keine versteckten Gebühren für Zusatzuntersuchungen.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-amber-50 rounded border-l-4 border-amber-500">
                  <span className="flex-shrink-0 text-xl">✓</span>
                  <div>
                    <h3 className="font-bold">Mobile AKU-Durchführung</h3>
                    <p className="text-gray-700 text-sm">Viele gute AKU-Tierärzte kommen mit Röntgenausrüstung zum Pferd. Das reduziert Stress für das Pferd.</p>
                  </div>
                </div>
              </div>

              {/* Regional recommendations */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Wo finden Sie AKU-Spezialisten?</h3>
                <RatgeberRegionGrid regions={akuRegions} />
              </div>
            </div>

            {/* 10. Nach der AKU – Was dann? */}
            <div id="after-aku" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('after-aku', 'Nach der AKU: Wie geht es weiter?')}
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Das AKU-Protokoll liegt vor – was tun Sie jetzt damit?
              </p>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">o.b.B. (Ohne besonderen Befund): Kauf empfohlen</h3>
                  <p className="text-gray-700 mb-3">Falls die AKU nur &quot;o.b.B.&quot; zeigt (keine Abweichungen von der Norm), können Sie das Pferd mit gutem Gewissen kaufen. Speichern Sie das Protokoll ab – es könnte später bei Garantiefragen relevant sein.</p>
                  <p className="text-gray-700 font-semibold">Nächste Schritte: Kaufvertrag unterzeichnen, Zahlungsmodalitäten klären, Versicherung abschließen.</p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Mit Abweichungen (ohne Risiko-Kennzeichnung): Abwägung nötig</h3>
                  <p className="text-gray-700 mb-3">Wenn die AKU Befunde mit Abweichungen zeigt (ohne &quot;Risiko&quot;-Kennzeichnung), müssen Sie abwägen:</p>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• Sind diese Abweichungen für Ihren beabsichtigten Verwendungszweck relevant?</li>
                    <li>• Wie ist das Risikoprofil des Tierarztes einzuschätzen?</li>
                    <li>• Würde eine Reitweise-Anpassung helfen (z.B. nur Freizeit statt Turniersport)?</li>
                  </ul>
                  <p className="text-gray-700 mt-3 font-semibold">Tipp: Holen Sie eine Zweitmeinung von einem anderen AKU-Tierarzt ein, wenn Sie unsicher sind.</p>
                </div>

                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Mit Risiko-Befunden: Rücktritt empfohlen</h3>
                  <p className="text-gray-700 mb-3">Bei Befunden mit &quot;Risiko&quot;-Kennzeichnung würden die meisten Tierärzte vom Kauf für die beabsichtigte Reitweise abraten. Mit einem AKU-Vorbehalt können Sie kostenfrei vom Kauf zurücktreten.</p>
                  <p className="text-gray-700 font-semibold">Hinweis: Machen Sie von Ihrem Rücktrittsrecht Gebrauch – Risiko-Befunde haben oft ernsthafte Konsequenzen, die sich nicht bessern.</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-gray-800"><strong>Wichtig:</strong> Falls Sie nach dem Kauf (ohne AKU-Vorbehalt) später feststellen, dass das Pferd bereits beim Kauf erkrankt war, können Sie eventuell Gewährleistungsrechte geltend machen – aber das ist deutlich schwieriger ohne AKU-Dokumentation.</p>
              </div>
            </div>

            {/* 11. Fazit & Takeaways */}
            <div id="takeaways" className="space-y-6 scroll-mt-32 lg:scroll-mt-40">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand">
                {numberedTitle('takeaways', 'Fazit: Die 10 wichtigsten Erkenntnisse zur AKU')}
              </h2>

              <RatgeberHighlightBox title="Wichtigste Takeaways">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Eine AKU ist die wichtigste Investition beim Pferdekauf – sie schützt vor versteckten Mängeln</li>
                  <li>Nutzen Sie einen unabhängigen Tierarzt, nicht den Stallveterinär des Verkäufers</li>
                  <li>Vereinbaren Sie einen AKU-Vorbehalt im Kaufvertrag für kostenloses Rücktrittsrecht</li>
                  <li>Kleine AKU (1-2h) für Freizeitpferde &lt;5.000€, große AKU für Sportpferde ab 10.000€</li>
                  <li>Die Untersuchung besteht aus klinischer Prüfung + 18 Standard-Röntgenaufnahmen (bei großer AKU, seit 2018)</li>
                  <li>AKU-Befunde seit 2018: o.b.B., Abweichungen, oder Risiko-Befunde (nicht mehr Klassen I-V)</li>
                  <li>Das AKU-Protokoll gehört dem Käufer und ist rechtliches Beweismittel</li>
                  <li>Mit guter Vorbereitung bekommen Sie objektive, zuverlässige Befunde</li>
                  <li>Eine gründliche große AKU dauert 2-4 Stunden – hetzen Sie nicht</li>
                  <li>Speichern Sie das Protokoll auf – es wird bei zukünftigen tierärztlichen Fragen wertvoll sein</li>
                </ol>
              </RatgeberHighlightBox>

              <div className="mt-8 p-6 bg-gradient-to-r from-brand/5 to-amber-100 rounded-lg border border-brand/20">
                <h3 className="font-bold text-lg mb-3">Eine AKU ist eine Investition in Sicherheit – nicht nur Geld sparen!</h3>
                <p className="text-gray-700 leading-relaxed">
                  Die AKU ist nicht nur dazu da, Kosten zu sparen. Sie ermöglicht Ihnen, eine <strong>informierte Kaufentscheidung</strong> zu treffen. Mit dem Wissen um den genauen Gesundheitszustand des Pferdes können Sie realistische Erwartungen setzen und das Pferd später richtig trainieren und betreuen.
                </p>
              </div>
            </div>

            {/* KOSTEN-HINWEIS: Link zur Spoke-Seite */}
            <div className="mt-16 p-6 bg-amber-50 border-l-4 border-brand rounded-lg">
              <h3 className="font-bold text-lg mb-2">Was kostet eine AKU?</h3>
              <p className="text-gray-700 mb-4">
                Die Kosten für eine Ankaufsuntersuchung variieren je nach Umfang, Region und Tierarzt. Eine detaillierte Kostenübersicht mit aktuellen Preisen nach neuer Gebührenordnung für Tierärzte (GOT 2024) finden Sie in unserem Kosten-Guide.
              </p>
              <Link href="/pferde-ratgeber/aku-pferd/kosten" className="inline-block px-6 py-2 bg-brand text-white rounded hover:bg-brand/90 transition">
                Zur detaillierten Kostenübersicht →
              </Link>
            </div>

          </article>

          {/* FAQ Section */}
          <div className="mt-16">
            <FAQ faqs={akuFaqItems} />
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <RatgeberRelatedArticles
              title="Weiterführende Artikel zur AKU"
              description="Vertiefen Sie Ihr Wissen mit unseren speziellen Guides zu AKU-Ablauf, Befundklassen und Kosten."
              articles={akuRelatedArticles}
            />
          </div>

          {/* Final CTA */}
          <RatgeberFinalCTA
            title="Bereit, die richtige Kaufentscheidung zu treffen?"
            description="Nutzen Sie unsere KI-gestützte Pferdebewertung, um den Marktwert Ihres zukünftigen Pferdes zu analysieren. Kombiniert mit einer professionellen AKU erhalten Sie maximale Sicherheit beim Pferdekauf."
            image={{
              src: '/images/shared/blossi-shooting.webp',
              alt: 'KI-gestützte Pferdebewertung für sichere Kaufentscheidungen'
            }}
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Pferdewert berechnen"
          />

        </div>
      </Layout>
    </>
  )
}

export default AKUPferd
