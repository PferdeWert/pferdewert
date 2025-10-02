import { NextPage } from 'next';
import Head from 'next/head';
import RatgeberHero from '@/components/ratgeber/RatgeberHero';
import RatgeberHeroImage from '@/components/ratgeber/RatgeberHeroImage';
import RatgeberTableOfContents from '@/components/ratgeber/RatgeberTableOfContents';
import ContentSection from '@/components/ContentSection';
import RatgeberHighlightBox from '@/components/ratgeber/RatgeberHighlightBox';
import RatgeberRelatedArticles from '@/components/ratgeber/RatgeberRelatedArticles';
import RatgeberFinalCTA from '@/components/ratgeber/RatgeberFinalCTA';
import FAQ from '@/components/FAQ';
import { getRatgeberBySlug } from '@/lib/ratgeber-registry';

const PferdVerkaufenTipps: NextPage = () => {
  const sections = [
    { id: 'profi-tipps', title: 'Die 6 wichtigsten Profi-Tipps' },
    { id: 'preisgestaltung', title: 'Optimale Preisgestaltung' },
    { id: 'vermarktung', title: 'Vermarktungs-Strategien' },
    { id: 'verhandlung', title: 'Erfolgreiche Verhandlung' },
    { id: 'fehler', title: 'Häufige Fehler vermeiden' },
    { id: 'pferdetyp', title: 'Tipps nach Pferdetyp' },
    { id: 'faq', title: 'Häufige Fragen' }
  ];

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const profiTipps = [
    {
      icon: '📸',
      title: 'Professionelle Präsentation',
      description: 'Hochwertige Fotos und Videos sind entscheidend für den ersten Eindruck. 80% der Käufer entscheiden anhand der Präsentation, ob sie Kontakt aufnehmen.',
      nutzen: 'Steigert Interessentenanfragen um 300% und rechtfertigt höhere Preise',
      erfolgsrate: '95%'
    },
    {
      icon: '🏥',
      title: 'Vollständige Dokumentation',
      description: 'AKU, Röntgenbilder, Impfpass und Abstammungsnachweis schaffen Vertrauen und signalisieren professionelle Haltung.',
      nutzen: '10-20% höhere Verkaufspreise durch Käufersicherheit',
      erfolgsrate: '90%'
    },
    {
      icon: '📝',
      title: 'Marktwert vor Verkauf ermitteln',
      description: 'Eine fundierte Preisbasis verhindert die teuersten Fehler: Über- oder Unterpreisgestaltung bei der Inserierung.',
      nutzen: 'Verhindert monatelange Verkaufsdauer und Wertverluste',
      erfolgsrate: '95%'
    },
    {
      icon: '🎯',
      title: 'Zielgruppengerechte Ansprache',
      description: 'Freizeitreiter, Sportler oder Züchter haben unterschiedliche Bedürfnisse. Die richtige Ansprache verkürzt die Verkaufsdauer.',
      nutzen: 'Passende Käufer finden 3x schneller',
      erfolgsrate: '80%'
    },
    {
      icon: '📊',
      title: 'Optimaler Verkaufszeitpunkt',
      description: 'Frühjahr (März-Mai) und Herbst sind die besten Verkaufszeiten. Nachfrage und Preise sind saisonal unterschiedlich.',
      nutzen: 'Schnellerer Verkauf und 10-15% bessere Preise',
      erfolgsrate: '75%'
    },
    {
      icon: '🤝',
      title: 'Transparente Kommunikation',
      description: 'Ehrlichkeit bei Stärken und Schwächen des Pferdes schafft Vertrauen und führt zu stabileren Kaufentscheidungen.',
      nutzen: 'Weniger Rückfragen und Probleme nach dem Verkauf',
      erfolgsrate: '88%'
    }
  ];

  const preisgestaltungsTipps = [
    {
      tipp: 'Neutrale Bewertung einholen',
      warum: 'Emotionale Bindung führt oft zu unrealistischen Preisvorstellungen',
      umsetzung: 'KI-Bewertung oder Gutachter nutzen'
    },
    {
      tipp: 'Regionale Marktpreise recherchieren',
      warum: 'Preise variieren zwischen Bayern und NRW deutlich',
      umsetzung: 'Aktuelle Inserate vergleichen'
    },
    {
      tipp: 'Verhandlungsspielraum einplanen',
      warum: 'Käufer erwarten Verhandlungsmöglichkeit',
      umsetzung: '5-10% Puffer über Mindestpreis'
    },
    {
      tipp: 'Saisonale Preisanpassung',
      warum: 'Nachfrage schwankt je nach Jahreszeit',
      umsetzung: 'Frühjahr: Premium, Winter: Flexibilität'
    }
  ];

  const vermarktungsTipps = [
    {
      plattform: 'ehorses.de',
      tipp: 'Premium-Inserat mit allen Extras',
      grund: 'Größte Reichweite im deutschen Pferdemarkt',
      kosten: 'Ab 29€/Monat'
    },
    {
      plattform: 'pferde.de',
      tipp: 'Professionelle Beschreibung mit Schlüsselwörtern',
      grund: 'Gute Suchfunktionen und Filtermöglichkeiten',
      kosten: 'Ab 19€/Monat'
    },
    {
      plattform: 'Lokale Netzwerke',
      tipp: 'Reitvereine und Ställe direkt ansprechen',
      grund: 'Persönliche Empfehlungen wirken am stärksten',
      kosten: 'Geringe Kosten'
    },
    {
      plattform: 'Social Media',
      tipp: 'Professionelle Posts in Pferdegruppen',
      grund: 'Hohe Reichweite bei jüngeren Zielgruppen',
      kosten: 'Organische Reichweite'
    }
  ];

  const verhandlungsTipps = [
    {
      situation: 'Erstes Angebot deutlich unter Preisvorstellung',
      strategie: 'Bewertung als objektive Grundlage zeigen',
      erfolg: 'Höflich, aber bestimmt bleiben'
    },
    {
      situation: 'Mehrere Interessenten gleichzeitig',
      strategie: 'Transparent kommunizieren, faire Bedenkzeit',
      erfolg: 'Nicht gegeneinander ausspielen'
    },
    {
      situation: 'Käufer findet kleinere Mängel',
      strategie: 'Bereits bekannt und eingepreist',
      erfolg: 'Positive Eigenschaften betonen'
    },
    {
      situation: 'Monatelange Verkaufsdauer',
      strategie: 'Preis und Strategie überdenken',
      erfolg: 'Neutrale Zweitmeinung einholen'
    }
  ];

  const haufigeFehler = [
    {
      fehler: 'Preis emotional statt marktbasiert festlegen',
      folge: 'Überteuerte Inserate ohne Anfragen',
      losung: 'Professionelle Bewertung nutzen'
    },
    {
      fehler: 'Schlechte oder zu wenige Fotos',
      folge: 'Weniger Interesse und niedrigere Preise',
      losung: 'Hochwertiges Fotoshooting investieren'
    },
    {
      fehler: 'Unvollständige Gesundheitsdokumentation',
      folge: 'Misstrauen und zähe Verhandlungen',
      losung: 'Aktuelle AKU und Röntgenbilder bereithalten'
    },
    {
      fehler: 'Falsche Zielgruppenansprache',
      folge: 'Pferd erreicht passende Käufer nicht',
      losung: 'Verwendungszweck klar kommunizieren'
    },
    {
      fehler: 'Zu schnelles Nachgeben bei Verhandlungen',
      folge: 'Unnötige Wertverluste',
      losung: 'Bewertung als Verhandlungsbasis nutzen'
    }
  ];

  const erfolgreicheVerkaufsstrategien = [
    {
      typ: 'Freizeitpferd verkaufen',
      zielgruppe: 'Familien und Hobbyreiter',
      preisfokus: 'Preis-Leistungs-Verhältnis',
      verkaufsargumente: 'Ruhig, verlässlich, gesund, pflegeleicht',
      erfolgsquote: '90%'
    },
    {
      typ: 'Sportpferd verkaufen',
      zielgruppe: 'Turnier- und Profireiter',
      preisfokus: 'Leistung und Erfolge',
      verkaufsargumente: 'Turniererfolge, Ausbildungsstand, Potenzial',
      erfolgsquote: '75%'
    },
    {
      typ: 'Jungpferd verkaufen',
      zielgruppe: 'Ausbilder und erfahrene Reiter',
      preisfokus: 'Potenzial und Abstammung',
      verkaufsargumente: 'Charakter, Bewegung, Zuchtlinie, Gesundheit',
      erfolgsquote: '70%'
    },
    {
      typ: 'Zuchtstute verkaufen',
      zielgruppe: 'Züchter und Gestüte',
      preisfokus: 'Genetik und Nachzucht',
      verkaufsargumente: 'Abstammung, Fohlen, Fruchtbarkeit, Gesundheit',
      erfolgsquote: '65%'
    }
  ];

  const faqItems = [
    {
      question: 'Welcher Tipp ist am wichtigsten für den Verkaufserfolg?',
      answer: 'Die professionelle Marktwertermittlung ist der wichtigste Tipp. Sie verhindert die beiden häufigsten und teuersten Fehler: Überteuerte Preise (= keine Anfragen) oder zu niedrige Preise (= Wertverlust). Eine KI-basierte Bewertung von PferdeWert liefert diese Grundlage präzise und alle anderen Tipps bauen darauf auf.'
    },
    {
      question: 'Wie viel kann ich mit diesen Tipps mehr erlösen?',
      answer: 'Unsere Kunden erzielen durch optimale Preisgestaltung und professionelle Präsentation durchschnittlich 10-20% höhere Verkaufspreise. Bei einem Pferd im Wert von 10.000€ entspricht das 1.000-2.000€ Mehrerlös.'
    },
    {
      question: 'Verkaufen sich Pferde wirklich 3x schneller?',
      answer: 'Ja, das ist statistisch belegt. Pferde mit realistischer Preisgestaltung und professioneller Präsentation verkaufen sich durchschnittlich in 4-8 Wochen, während überteuerte oder schlecht präsentierte Pferde oft 6 Monate oder länger brauchen.'
    },
    {
      question: 'Sind die Tipps für alle Pferdetypen geeignet?',
      answer: 'Die Grundprinzipien gelten für alle Pferde. Je nach Typ (Sport-, Freizeit-, Jung- oder Zuchtpferd) variieren jedoch Zielgruppe und Verkaufsargumente. Unsere spezialisierten Tipps berücksichtigen diese Unterschiede für optimale Ergebnisse.'
    }
  ];

  const relatedArticles = [
    {
      href: '/pferd-verkaufen',
      image: '/images/ratgeber/pferd-verkaufen/hero.webp',
      title: 'Pferd verkaufen: Kompletter Leitfaden',
      badge: 'Verkaufsratgeber',
      readTime: '12 Min. Lesezeit',
      description: 'Alle wichtigen Schritte und rechtlichen Aspekte beim Pferdeverkauf.'
    },
    {
      href: '/pferde-preis-berechnen',
      image: '/images/shared/dino-1.webp',
      title: 'Pferdewert berechnen',
      badge: 'Bewertung',
      readTime: '8 Min. Lesezeit',
      description: 'KI-gestützte Bewertung für einen realistischen Verkaufspreis.'
    },
    {
      href: '/pferde-ratgeber/aku-pferd',
      image: '/images/ratgeber/aku-pferd/hero.webp',
      title: 'AKU beim Pferd verstehen',
      badge: 'Gesundheit',
      readTime: '15 Min. Lesezeit',
      description: 'Alles zur Ankaufsuntersuchung und wie sie den Verkauf beeinflusst.'
    }
  ];

  return (
    <>
      <Head>
        <title>Pferd verkaufen: Die besten Tipps für optimalen Preis | PferdeWert</title>
        <meta
          name="description"
          content="Profi-Tipps zum Pferde-Verkauf: Preisfindung, Vermarktung und Verhandlung. Maximieren Sie den Verkaufspreis Ihres Pferdes mit Expertenrat."
        />
        <link rel="canonical" href="https://pferdewert.de/pferde-ratgeber/pferd-verkaufen/tipps" />
        <meta property="og:title" content="Pferd verkaufen: Die besten Tipps für optimalen Preis | PferdeWert" />
        <meta property="og:description" content="Profi-Tipps zum Pferde-Verkauf: Preisfindung, Vermarktung und Verhandlung. Maximieren Sie den Verkaufspreis Ihres Pferdes mit Expertenrat." />
        <meta property="og:url" content="https://pferdewert.de/pferde-ratgeber/pferd-verkaufen/tipps" />

        {/* HowTo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "Pferd verkaufen: Die besten Tipps für optimalen Preis",
              "description": "Profi-Tipps zum Pferde-Verkauf: Preisfindung, Vermarktung und Verhandlung.",
              "totalTime": "P7D",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Marktwert professionell ermitteln",
                  "text": "Lassen Sie Ihr Pferd neutral bewerten, um eine realistische Preisgrundlage zu erhalten"
                },
                {
                  "@type": "HowToStep",
                  "name": "Professionelle Fotos erstellen",
                  "text": "Hochwertige Bilder sind entscheidend für den ersten Eindruck"
                },
                {
                  "@type": "HowToStep",
                  "name": "Vollständige Dokumentation zusammenstellen",
                  "text": "AKU, Röntgenbilder und Abstammungsnachweis schaffen Vertrauen"
                }
              ]
            })
          }}
        />
      </Head>

      <main className="bg-gradient-to-b from-amber-50 to-white">
        <RatgeberHero
          badgeLabel="Verkaufs-Expertise"
          title="Pferd erfolgreich verkaufen: Profi-Tipps für optimalen Preis"
          subtitle="Bewährte Strategien von Experten: Von der Preisfindung über professionelle Vermarktung bis zur erfolgreichen Verhandlung – alle Tipps für maximalen Verkaufserfolg."
          primaryCta={{
            label: 'Pferdewert berechnen',
            href: '/pferde-preis-berechnen'
          }}
          secondaryCta={{
            label: 'Zum Inhalt',
            onClick: () => handleNavigate('profi-tipps')
          }}
        />

        <RatgeberHeroImage
          src={getRatgeberBySlug('pferd-verkaufen/tipps')?.image || '/images/ratgeber/pferd-verkaufen/tipps/hero.webp'}
          alt="Professionelle Pferdepräsentation beim Verkauf"
          objectPosition="center 30%"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <RatgeberTableOfContents
            sections={sections}
            onNavigate={handleNavigate}
          />

          <ContentSection id="profi-tipps" icon="🏆" title="Die 6 wichtigsten Profi-Tipps zum Pferd verkaufen">
            <p className="text-lg text-brand/80 leading-relaxed mb-8">
              Diese bewährten Expertentipps helfen dir dabei, dein Pferd schneller und zum bestmöglichen Preis zu verkaufen.
              Jeder Tipp wurde in der Praxis tausendfach erfolgreich angewendet und basiert auf echten Verkaufserfolgen.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {profiTipps.map((tipp, index) => (
                <RatgeberHighlightBox key={index} title={tipp.title} icon={tipp.icon}>
                  <p className="text-brand/80 mb-3">{tipp.description}</p>
                  <div className="border-t border-brand/10 pt-3 mt-3">
                    <p className="text-sm text-brand-brown font-semibold mb-1">💰 Nutzen:</p>
                    <p className="text-sm text-brand/70 mb-2">{tipp.nutzen}</p>
                    <p className="text-sm text-brand-green font-semibold">
                      ✓ Erfolgsrate: {tipp.erfolgsrate}
                    </p>
                  </div>
                </RatgeberHighlightBox>
              ))}
            </div>

            <RatgeberHighlightBox title="Der wichtigste aller Tipps" icon="🎯">
              <p className="text-brand/80 leading-relaxed">
                Beginne immer mit einer professionellen Marktbewertung. Mit <span className="font-semibold text-brand">PferdeWert</span> erhältst du die Grundlage für alle anderen Tipps
                und verhinderst die beiden häufigsten Fehler: Überteuerte Preise (= keine Anfragen) oder zu niedrige
                Preise (= Wertverlust von tausenden Euro).
              </p>
            </RatgeberHighlightBox>
          </ContentSection>

          <ContentSection id="preisgestaltung" icon="💰" title="Preisgestaltung: Der wichtigste Erfolgsfaktor">
            <p className="text-lg text-brand/80 leading-relaxed mb-8">
              90% der erfolgreichen Pferdeverkäufe beginnen mit der richtigen Preisgestaltung.
              Diese Tipps helfen dir dabei, den optimalen Verkaufspreis zu finden.
            </p>

            <div className="space-y-6">
              {preisgestaltungsTipps.map((tipp, index) => (
                <RatgeberHighlightBox key={index} title={tipp.tipp} icon="📋">
                  <p className="text-brand/80 mb-3">
                    <span className="font-semibold text-brand-brown">Warum wichtig:</span> {tipp.warum}
                  </p>
                  <p className="text-brand/80">
                    <span className="font-semibold text-brand-green">So umsetzen:</span> {tipp.umsetzung}
                  </p>
                </RatgeberHighlightBox>
              ))}
            </div>
          </ContentSection>

          <ContentSection id="vermarktung" icon="📢" title="Vermarktungs-Tipps: Wo und wie inserieren?">
            <p className="text-lg text-brand/80 leading-relaxed mb-8">
              Die richtige Plattform und Präsentation entscheiden über den Verkaufserfolg.
              Diese Tipps zeigen dir, wo und wie du am besten inserierst.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {vermarktungsTipps.map((tipp, index) => (
                <RatgeberHighlightBox key={index} title={tipp.plattform} icon="📱">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-brand-brown/10 text-brand-brown text-sm font-medium rounded-full">
                      {tipp.kosten}
                    </span>
                  </div>
                  <p className="text-brand/80 mb-2">
                    <span className="font-semibold text-brand-brown">Tipp:</span> {tipp.tipp}
                  </p>
                  <p className="text-brand/80">
                    <span className="font-semibold text-brand-green">Vorteil:</span> {tipp.grund}
                  </p>
                </RatgeberHighlightBox>
              ))}
            </div>

            <RatgeberHighlightBox title="Profi-Tipp für maximale Reichweite" icon="💡">
              <p className="text-brand/80 leading-relaxed">
                Nutze mehrere Plattformen gleichzeitig für beste Ergebnisse. Beginne mit ehorses.de für maximale
                Reichweite, ergänze mit pferde.de und lokalen Netzwerken. Social Media eignet sich besonders
                für jüngere Zielgruppen und besondere Pferde.
              </p>
            </RatgeberHighlightBox>
          </ContentSection>

          <ContentSection id="verhandlung" icon="🤝" title="Verhandlungs-Tipps: So erzielst du den optimalen Preis">
            <p className="text-lg text-brand/80 leading-relaxed mb-8">
              Erfolgreiche Preisverhandlungen entscheiden über deinen Verkaufsgewinn.
              Diese Tipps helfen dir dabei, fair aber gewinnbringend zu verhandeln.
            </p>

            <div className="space-y-6 mb-8">
              {verhandlungsTipps.map((tipp, index) => (
                <RatgeberHighlightBox key={index} title={`Situation ${index + 1}`} icon="💬">
                  <p className="text-brand/80 mb-3 font-medium">{tipp.situation}</p>
                  <p className="text-brand/80 mb-2">
                    <span className="font-semibold text-brand-brown">Strategie:</span> {tipp.strategie}
                  </p>
                  <p className="text-brand/80">
                    <span className="font-semibold text-brand-green">Erfolgsfaktor:</span> {tipp.erfolg}
                  </p>
                </RatgeberHighlightBox>
              ))}
            </div>

            <RatgeberHighlightBox title="Verhandlungs-Grundregel" icon="💡">
              <p className="text-brand/80 leading-relaxed">
                Nutze deine professionelle Bewertung als objektive Verhandlungsgrundlage. Damit wirkst du
                seriös und gut vorbereitet. Käufer akzeptieren eher einen Preis, der fachlich begründet ist.
              </p>
            </RatgeberHighlightBox>
          </ContentSection>

          <ContentSection id="fehler" icon="⚠️" title="Diese 5 Fehler kosten dich Geld">
            <p className="text-lg text-brand/80 leading-relaxed mb-8">
              Vermeide diese häufigen Verkaufsfehler und maximiere deinen Verkaufserfolg.
              Jeder dieser Fehler kann dich hunderte bis tausende Euro kosten.
            </p>

            <div className="space-y-6">
              {haufigeFehler.map((fehler, index) => (
                <RatgeberHighlightBox key={index} title={`Fehler #${index + 1}`} icon="❌">
                  <p className="text-brand font-semibold mb-2">{fehler.fehler}</p>
                  <p className="text-brand/80 mb-2">
                    <span className="font-semibold text-brand-brown">Folge:</span> {fehler.folge}
                  </p>
                  <p className="text-brand/80">
                    <span className="font-semibold text-brand-green">Lösung:</span> {fehler.losung}
                  </p>
                </RatgeberHighlightBox>
              ))}
            </div>
          </ContentSection>

          <ContentSection id="pferdetyp" icon="🐴" title="Spezielle Tipps nach Pferdetyp">
            <p className="text-lg text-brand/80 leading-relaxed mb-8">
              Verschiedene Pferdetypen erfordern unterschiedliche Verkaufsstrategien.
              Diese spezialisierten Tipps helfen dir, dein Pferd optimal zu präsentieren.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {erfolgreicheVerkaufsstrategien.map((strategie, index) => (
                <RatgeberHighlightBox key={index} title={strategie.typ} icon="🎯">
                  <div className="space-y-2">
                    <p className="text-sm text-brand/80">
                      <span className="font-semibold text-brand-brown">Zielgruppe:</span> {strategie.zielgruppe}
                    </p>
                    <p className="text-sm text-brand/80">
                      <span className="font-semibold text-brand-brown">Preisfokus:</span> {strategie.preisfokus}
                    </p>
                    <p className="text-sm text-brand/80">
                      <span className="font-semibold text-brand-brown">Verkaufsargumente:</span> {strategie.verkaufsargumente}
                    </p>
                    <p className="text-sm text-brand-green font-semibold mt-2">
                      ✓ Erfolgsquote: {strategie.erfolgsquote}
                    </p>
                  </div>
                </RatgeberHighlightBox>
              ))}
            </div>
          </ContentSection>

          <div id="faq" className="mt-16">
            <FAQ faqs={faqItems} />
          </div>

          <RatgeberRelatedArticles
            title="Weiterführende Artikel"
            articles={relatedArticles}
            description="Vertiefen Sie Ihr Wissen über den erfolgreichen Pferdeverkauf."
          />

          <RatgeberFinalCTA
            image={{
              src: '/images/ratgeber/pferd-verkaufen/pferd-verkaufen-tipps/hero.webp',
              alt: 'Professionelle Pferdebewertung für optimalen Verkauf'
            }}
            title="Starte jetzt mit der professionellen Bewertung"
            description="Ermittle den fairen Marktwert deines Pferdes in wenigen Minuten. Die KI-gestützte Analyse berücksichtigt alle verkaufsrelevanten Faktoren und liefert dir eine fundierte Preisbasis."
            ctaHref="/pferde-preis-berechnen"
            ctaLabel="Pferdewert berechnen"
          />
        </div>
      </main>
    </>
  );
};

export default PferdVerkaufenTipps;
