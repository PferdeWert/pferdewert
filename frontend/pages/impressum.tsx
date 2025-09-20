// pages/impressum.tsx

import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import { PRICING_FORMATTED } from "@/lib/pricing";
import {
  EnvelopeIcon,
  MapPinIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
  ScaleIcon
} from "@heroicons/react/24/outline";

export default function Impressum() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "LegalDocument"],
    "name": "Impressum - PferdeWert.de",
    "description": "Rechtliche Angaben und Kontaktdaten von PferdeWert.de - Professionelle AI-gestützte Pferdebewertung in Deutschland",
    "url": "https://pferdewert.de/impressum",
    "about": {
      "@type": "Organization",
      "name": "PferdeWert GbR",
      "legalName": "PferdeWert GbR - Sabine und Benjamin Reder",
      "url": "https://pferdewert.de",
      "logo": "https://pferdewert.de/logo.png",
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "name": "Sabine Reder",
          "jobTitle": "Geschäftsführerin & Pferdeexpertin"
        },
        {
          "@type": "Person",
          "name": "Benjamin Reder",
          "jobTitle": "Geschäftsführer & Tech-Entwickler"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Feigenweg 17B",
        "postalCode": "70619",
        "addressLocality": "Stuttgart",
        "addressRegion": "Baden-Württemberg",
        "addressCountry": "DE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "info@pferdewert.de",
        "contactType": "customer service",
        "areaServed": "DE",
        "availableLanguage": "German"
      },
      "description": "Spezialisiert auf AI-gestützte Pferdebewertungen und Marktanalysen für den deutschen Pferdemarkt",
      "knowsAbout": ["Pferdebewertung", "Pferdemarkt", "Künstliche Intelligenz", "Marktanalyse"],
      "serviceArea": {
        "@type": "Country",
        "name": "Deutschland"
      }
    },
    "inLanguage": "de",
    "isPartOf": {
      "@type": "WebSite",
      "name": "PferdeWert.de",
      "url": "https://pferdewert.de"
    }
  };

  return (
    <Layout>
      <Head>
        <title>Impressum & Kontakt | PferdeWert.de - Rechtliche Angaben TMG</title>
        <meta
          name="description"
          content={`Impressum PferdeWert.de ➤ Rechtssichere Angaben gemäß TMG & MDStV ✓ Kontakt Pferdebewertung ✓ Anbieterkennung Deutschland ✓ Verantwortliche Personen ✓ Direkter Kontakt für ${PRICING_FORMATTED.current}`}
        />
        <meta
          name="keywords"
          content="impressum pferdewert, kontakt pferdebewertung, rechtliche angaben tmg, anbieterkennung deutschland, impressum dienstleister, kontaktdaten unternehmen, verantwortliche personen, geschäftsadresse stuttgart"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Impressum & Kontakt | PferdeWert.de - Rechtliche Angaben" />
        <meta property="og:description" content="Vollständiges Impressum von PferdeWert.de mit allen rechtlichen Angaben gemäß TMG. Direkte Kontaktmöglichkeiten für Pferdebewertung und Support." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/impressum" />
        <meta property="og:image" content="https://pferdewert.de/og-impressum.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Impressum & Kontakt | PferdeWert.de" />
        <meta name="twitter:description" content="Rechtssichere Angaben und Kontakt für professionelle Pferdebewertung" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://pferdewert.de/impressum" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="PferdeWert GbR" />
        <meta name="geo.region" content="DE-BW" />
        <meta name="geo.placename" content="Stuttgart" />
        <meta name="geo.position" content="48.7758;9.1829" />
        <meta name="ICBM" content="48.7758, 9.1829" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Impressum & Rechtliche Angaben
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Vollständige Anbieterkennung gemäß § 5 TMG und § 55 MDStV für PferdeWert.de -
            Ihre vertrauensvolle Plattform für professionelle Pferdebewertungen
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Unternehmensangaben */}
          <section className="rounded-lg bg-white p-6 shadow-md ring-1 ring-gray-200">
            <div className="mb-4 flex items-center">
              <BuildingOfficeIcon className="mr-3 h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-semibold text-gray-900">Unternehmensangaben</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-gray-900">Angaben gemäß § 5 TMG:</h3>
                <address className="not-italic text-gray-700">
                  <strong className="text-amber-700">PferdeWert GbR</strong><br />
                  <span className="font-medium">Sabine und Benjamin Reder</span><br />
                  Feigenweg 17B<br />
                  70619 Stuttgart<br />
                  Deutschland
                </address>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="mb-2 font-medium text-gray-900">Geschäftstätigkeit:</h3>
                <p className="text-gray-700">
                  AI-gestützte Pferdebewertung und Marktanalysen für den deutschen Pferdemarkt
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="mb-2 font-medium text-gray-900">Umsatzsteuer-ID:</h3>
                <p className="text-gray-700">
                  Nicht umsatzsteuerpflichtig gemäß § 19 UStG (Kleinunternehmerregelung)
                </p>
              </div>
            </div>
          </section>

          {/* Kontaktinformationen */}
          <section className="rounded-lg bg-white p-6 shadow-md ring-1 ring-gray-200">
            <div className="mb-4 flex items-center">
              <EnvelopeIcon className="mr-3 h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-semibold text-gray-900">Kontakt & Support</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <EnvelopeIcon className="mr-3 mt-1 h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">E-Mail Kontakt:</h3>
                  <a
                    href="mailto:info@pferdewert.de"
                    className="text-amber-600 hover:text-amber-700 transition-colors duration-200"
                  >
                    info@pferdewert.de
                  </a>
                  <p className="mt-1 text-sm text-gray-600">
                    Für Fragen zu Pferdebewertungen, Support und allgemeine Anfragen
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPinIcon className="mr-3 mt-1 h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Geschäftsadresse:</h3>
                  <address className="not-italic text-gray-700">
                    Feigenweg 17B<br />
                    70619 Stuttgart, Baden-Württemberg<br />
                    Deutschland
                  </address>
                </div>
              </div>

              <div className="rounded-md bg-amber-50 p-4">
                <div className="flex items-start">
                  <ShieldCheckIcon className="mr-3 mt-1 h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-medium text-amber-800">Datenschutz & Sicherheit</h3>
                    <p className="mt-1 text-sm text-amber-700">
                      Ihre Daten werden vertraulich behandelt.
                      <Link href="/datenschutz" className="ml-1 underline hover:no-underline">
                        Datenschutzerklärung
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Verantwortlichkeiten */}
          <section className="rounded-lg bg-white p-6 shadow-md ring-1 ring-gray-200">
            <div className="mb-4 flex items-center">
              <DocumentTextIcon className="mr-3 h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-semibold text-gray-900">Verantwortlichkeiten</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-gray-900">Verantwortlich für den Inhalt gemäß § 55 Abs. 2 MDStV:</h3>
                <address className="not-italic text-gray-700">
                  <strong>Sabine und Benjamin Reder</strong><br />
                  Feigenweg 17B<br />
                  70619 Stuttgart<br />
                  Deutschland
                </address>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="mb-2 font-medium text-gray-900">Fachliche Qualifikationen:</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Sabine Reder:</strong> Langjährige Erfahrung in Pferdezucht und -bewertung</p>
                  <p><strong>Benjamin Reder:</strong> Technische Entwicklung und AI-Implementierung</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="mb-2 font-medium text-gray-900">Haftungshinweis:</h3>
                <p className="text-sm text-gray-600">
                  Bewertungen sind Marktschätzungen basierend auf AI-Algorithmen und Marktdaten.
                  Keine Gewähr für Vollständigkeit oder Richtigkeit der Bewertungsergebnisse.
                </p>
              </div>
            </div>
          </section>

          {/* Rechtliche Bestimmungen */}
          <section className="rounded-lg bg-white p-6 shadow-md ring-1 ring-gray-200">
            <div className="mb-4 flex items-center">
              <ScaleIcon className="mr-3 h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-semibold text-gray-900">Rechtliche Bestimmungen</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium text-gray-900">Anwendbares Recht:</h3>
                <p className="text-gray-700">
                  Es gilt das Recht der Bundesrepublik Deutschland.
                  Gerichtsstand ist Stuttgart.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="mb-2 font-medium text-gray-900">EU-Streitschlichtung:</h3>
                <p className="text-gray-700">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                </p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 transition-colors duration-200"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="mb-2 font-medium text-gray-900">Verbraucherschlichtung:</h3>
                <p className="text-sm text-gray-600">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                  vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="mb-2 font-medium text-gray-900">Weitere rechtliche Seiten:</h3>
                <div className="space-y-1">
                  <Link href="/agb" className="block text-amber-600 hover:text-amber-700 transition-colors duration-200">
                    → Allgemeine Geschäftsbedingungen (AGB)
                  </Link>
                  <Link href="/datenschutz" className="block text-amber-600 hover:text-amber-700 transition-colors duration-200">
                    → Datenschutzerklärung
                  </Link>
                  <Link href="/widerruf" className="block text-amber-600 hover:text-amber-700 transition-colors duration-200">
                    → Widerrufsbelehrung
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="mt-12 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Haben Sie Fragen zu unseren Bewertungen?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Unser Team steht Ihnen für alle Fragen rund um Pferdebewertungen,
            technische Unterstützung und Feedback gerne zur Verfügung.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:info@pferdewert.de"
              className="inline-flex items-center justify-center rounded-md bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700 transition-colors duration-200"
            >
              <EnvelopeIcon className="mr-2 h-5 w-5" />
              Kontakt aufnehmen
            </a>
            <a
              href="/pferd-bewerten"
              className="inline-flex items-center justify-center rounded-md border border-amber-600 px-6 py-3 text-base font-medium text-amber-600 hover:bg-amber-50 transition-colors duration-200"
            >
              Pferd bewerten lassen
            </a>
          </div>
        </section>

        {/* Last Updated */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </footer>
      </main>
    </Layout>
  );
}
