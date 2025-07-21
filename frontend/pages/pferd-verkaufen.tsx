// pages/pferd-verkaufen.tsx
import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, AlertTriangle, Calculator, Shield, TrendingUp, Euro } from "lucide-react";

export default function PferdVerkaufen() {
  const verkaufstipps = [
    {
      icon: <Calculator className="w-6 h-6 text-brand-brown" />,
      title: "Optimalen Verkaufspreis ermitteln",
      description: "Lass den Marktwert professionell bewerten, bevor du inserierst. So verkaufst du weder zu teuer noch zu günstig."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-accent" />,
      title: "Schneller verkaufen",
      description: "Der richtige Preis führt zu mehr Anfragen und schnellerem Verkauf. Vermeide monatelanges Inserieren."
    },
    {
      icon: <Shield className="w-6 h-6 text-brand-brown" />,
      title: "Verhandlungssicherheit gewinnen",
      description: "Mit einer professionellen Bewertung kannst du selbstbewusst auf Preisverhandlungen eingehen."
    }
  ];

  const verkaufsfehler = [
    "Preis deutlich über Marktwert ansetzen (führt zu keinen Anfragen)",
    "Preis zu niedrig ansetzen (Wertverlust von tausenden Euro)",
    "Pferd ohne Marktkenntnis inserieren",
    "Bei ersten Verhandlungen zu schnell nachgeben",
    "Wichtige Verkaufsargumente nicht kommunizieren"
  ];

  const verkaufsschritte = [
    {
      schritt: "1",
      title: "Marktwert ermitteln",
      description: "Lass dein Pferd professionell bewerten und erhalte eine fundierte Preisspanne für den Verkauf."
    },
    {
      schritt: "2", 
      title: "Inserat erstellen",
      description: "Setze den optimalen Verkaufspreis und erstelle ein aussagekräftiges Inserat mit allen wichtigen Details."
    },
    {
      schritt: "3",
      title: "Erfolgreich verkaufen",
      description: "Verhandle selbstbewusst mit der Bewertung als Grundlage und verkaufe zum fairen Preis."
    }
  ];

  const erfolgsfaktoren = [
    {
      title: "Realistische Preisgestaltung",
      description: "Pferde im marktgerechten Preisbereich verkaufen sich 3x schneller",
      impact: "Sehr wichtig"
    },
    {
      title: "Vollständige Dokumentation", 
      description: "AKU, Röntgenbilder und Abstammungsnachweis erhöhen das Vertrauen",
      impact: "Wichtig"
    },
    {
      title: "Professionelle Fotos",
      description: "Hochwertige Bilder steigern die Anzahl der Anfragen erheblich",
      impact: "Wichtig"
    },
    {
      title: "Ehrliche Beschreibung",
      description: "Transparenz bei Stärken und Schwächen baut Vertrauen auf",
      impact: "Mittel"
    },
    {
      title: "Optimaler Verkaufszeitpunkt",
      description: "Frühjahr und Herbst sind die besten Zeiten für Pferdeverkäufe",
      impact: "Mittel"
    },
    {
      title: "Verhandlungsbereitschaft",
      description: "Kleine Verhandlungsspielräume einplanen, aber Untergrenze definieren",
      impact: "Mittel"
    }
  ];

  return (
    <Layout>
      <>
        <Head>
        <title>Pferd verkaufen – Optimaler Preis & schneller Verkauf | PferdeWert</title>
        <meta
         name="description"
         content="Pferd verkaufen? Ermittle den optimalen Verkaufspreis mit KI-Bewertung ✓ Schneller verkaufen ✓ Faire Preise ✓ Keine Wertverluste in NRW, Bayern & deutschlandweit"
        />
         <meta
         name="keywords"
         content="pferd verkaufen, pferd verkaufen preis, pferd schnell verkaufen, pferd online verkaufen, pferd verkaufen tipps, verkaufspreis pferd"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Pferd verkaufen – Optimaler Preis & schneller Verkauf | PferdeWert" />
        <meta property="og:description" content="Pferd verkaufen? Ermittle den optimalen Verkaufspreis mit KI-Bewertung ✓ Schneller verkaufen ✓ Faire Preise ✓ Keine Wertverluste" />
         <meta property="og:type" content="website" />
         <meta property="og:url" content="https://pferdewert.de/pferd-verkaufen" />
         <meta property="og:image" content="https://pferdewert.de/images/pferd-verkaufen-hero.webp" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content="Pferd verkaufen – Optimaler Preis & schneller Verkauf | PferdeWert" />
        <meta name="twitter:description" content="Pferd verkaufen? Ermittle den optimalen Verkaufspreis mit KI-Bewertung ✓ Schneller verkaufen ✓ Faire Preise ✓ Keine Wertverluste" />
         <meta name="twitter:image" content="https://pferdewert.de/images/pferd-verkaufen-hero.webp" />
         
          {/* Structured Data für SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Pferd verkaufen: Optimaler Preis finden",
                "description": "Ermittle den optimalen Verkaufspreis mit KI-Bewertung und verkaufe dein Pferd schneller zum fairen Preis",
                "url": "https://pferdewert.de/pferd-verkaufen",
                "mainEntity": {
                  "@type": "Service", 
                  "name": "Pferdebewertung für Verkäufer",
                  "provider": {
                    "@type": "Organization",
                    "name": "PferdeWert"
                  }
                }
              })
            }}
          />
          <link rel="canonical" href="https://pferdewert.de/pferd-verkaufen" />
        </Head>

        {/* Hero-Bereich für Verkäufer */}
        <section className="bg-[#fdf9f4] py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Pferd verkaufen: So erzielst du den optimalen Preis
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Verkaufe schneller und zum fairen Preis mit professioneller KI-Bewertung. 
                Keine Wertverluste durch falshe Preisgestaltung.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Optimaler Verkaufspreis in 2 Minuten</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">3x schnellerer Verkauf durch realistischen Preis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Verhandlungssicherheit mit Marktdaten</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pferde-preis-berechnen"
                  className="btn-primary"
                >
                  Jetzt Verkaufspreis ermitteln
                </Link>
                <Link
                  href="/beispiel-analyse"
                  className="btn-secondary"
                >
                  Beispiel-Bewertung ansehen
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <Image
                src="/images/dino-1.webp"
                width={600}
                height={400}
                alt="Unser Pferd Dino - Erfolgreicher Pferdeverkauf mit professioneller Bewertung"
                className="rounded-xl shadow-lg w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Warum optimale Preisgestaltung wichtig ist */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Warum der richtige Preis entscheidend ist
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verkaufstipps.map((tipp, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    {tipp.icon}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {tipp.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {tipp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Häufige Verkaufsfehler vermeiden */}
        <section className="bg-red-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Diese Verkaufsfehler kosten dich Geld
              </h2>
              <p className="text-lg text-gray-600">
                Vermeide diese häufigen Fehler beim Pferdeverkauf:
              </p>
            </div>

            <div className="space-y-4">
              {verkaufsfehler.map((fehler, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-red-200 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{fehler}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                <Shield className="w-5 h-5" />
                Jetzt Wertverluste vermeiden
              </Link>
            </div>
          </div>
        </section>

        {/* So verkaufst du erfolgreich - 3 Schritte */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              So verkaufst du dein Pferd erfolgreich
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {verkaufsschritte.map((schritt, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-brand-brown rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-xl">{schritt.schritt}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {schritt.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {schritt.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/pferde-preis-berechnen"
                className="btn-primary"
              >
                <Calculator className="w-5 h-5" />
                Schritt 1: Marktwert ermitteln
              </Link>
            </div>
          </div>
        </section>

        {/* Erfolgsfaktoren beim Pferdeverkauf */}
        <section className="bg-[#fdf9f4] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Diese Faktoren entscheiden über deinen Verkaufserfolg
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Ein erfolgreicher Pferdeverkauf hängt von verschiedenen Faktoren ab. 
              Je besser du diese optimierst, desto schneller und gewinnbringender verkaufst du.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {erfolgsfaktoren.map((faktor, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {faktor.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      faktor.impact === 'Sehr wichtig' ? 'bg-red-100 text-red-700' :
                      faktor.impact === 'Wichtig' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {faktor.impact}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faktor.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Verkaufs-spezifisch */}
        <section className="bg-gradient-to-r from-brand-brown to-brand-brownDark py-16 px-6 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Verkaufe dein Pferd zum optimalen Preis
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Professionelle Bewertung in 2 Minuten • Marktbasierte Preisanalyse • Sofort verfügbar
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/pferde-preis-berechnen"
                className="bg-white text-brand-brown font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Euro className="w-5 h-5" />
                Jetzt Verkaufspreis ermitteln → 9,90€
              </Link>
              <Link
                href="/beispiel-analyse"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-brand-brown transition-colors"
              >
                Beispiel-Bewertung ansehen
              </Link>
            </div>
            
            <p className="text-sm text-orange-200 mt-4">
              ⚡ Über 150 zufriedene Kunden • Durchschnitt 4.7/5 Sterne
            </p>
          </div>
        </section>

        {/* FAQ Section - verkaufsspezifisch */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Häufig gestellte Fragen zum Pferdeverkauf
            </h2>
            
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-6 border border-gray-200" open>
                <summary className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-brand-brown">
                  Wie finde ich den richtigen Verkaufspreis für mein Pferd?
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Der optimale Verkaufspreis hängt von vielen Faktoren ab: Rasse, Alter, Ausbildungsstand, Gesundheit und aktuelle Marktlage. Unsere KI-Analyse berücksichtigt alle diese Faktoren und gibt dir eine fundierte Preisspanne basierend auf aktuellen Verkaufsdaten.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <summary className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-brand-brown">
                  Wie schnell verkauft sich ein Pferd zum richtigen Preis?
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Pferde mit realistischer Preisgestaltung verkaufen sich durchschnittlich 3x schneller. Während überteuerte Pferde oft monatelang inseriert bleiben, finden fair bepreiste Pferde meist binnen 4-8 Wochen neue Besitzer.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <summary className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-brand-brown">
                  Was passiert, wenn ich mein Pferd zu teuer anbiete?
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Überteuerte Pferde generieren weniger Anfragen und verkaufen sich deutlich langsamer. Oft müssen Verkäufer nach Monaten den Preis reduzieren - dann aber unter Zeitdruck und mit weniger Verhandlungsspielraum.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <summary className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-brand-brown">
                  Kann ich die Bewertung für Verhandlungen nutzen?
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Absolut! Die professionelle Bewertung gibt dir Sicherheit bei Preisverhandlungen. Du kannst objektiv argumentieren und weißt genau, welche Untergrenze fair ist.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <summary className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-brand-brown">
                  Was kostet die Verkaufspreis-Analyse?
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Die umfassende Preisanalyse kostet aktuell nur 9,90€ (statt regulär 39€). Eine Investition, die sich beim Verkauf um ein Vielfaches auszahlt - bereits 100€ mehr Verkaufspreis rechtfertigen die Analyse.
                </p>
              </details>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}