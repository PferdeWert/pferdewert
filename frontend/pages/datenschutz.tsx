// frontend/pages/datenschutz.tsx
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import { info } from '@/lib/log';

// TypeScript Interfaces
interface DatenschutzSektion {
  id: string;
  titel: string;
  inhalt: string[];
  wichtig?: boolean;
}

interface KontaktInfo {
  titel: string;
  name: string;
  adresse: string;
  email: string;
  telefon?: string;
}

interface DatenKategorie {
  typ: string;
  zweck: string;
  rechtsgrundlage: string;
  speicherdauer: string;
}

// Data Definitions
const datenschutzSektionen: DatenschutzSektion[] = [
  {
    id: 'verantwortlicher',
    titel: '1. Verantwortlicher',
    inhalt: [
      'Verantwortlicher im Sinne der DSGVO ist:',
      'PferdeWert GbR, Sabine und Benjamin Reder',
      'Feigenweg 17B, 70619 Stuttgart',
      'E-Mail: info@pferdewert.de',
      'Website: https://pferdewert.de'
    ],
    wichtig: true
  },
  {
    id: 'datenerfassung',
    titel: '2. Welche Daten erfassen wir?',
    inhalt: [
      'Wir erfassen nur die Daten, die für die Pferdebewertung und Vertragsabwicklung notwendig sind:',
      '• Pferdeangaben: Rasse, Alter, Geschlecht, Ausbildungsstand, Gesundheitszustand',
      '• Kontaktdaten: E-Mail-Adresse für die Übermittlung des Bewertungsberichts',
      '• Zahlungsdaten: Über unseren Zahlungsdienstleister Stripe verarbeitet',
      '• Website-Nutzung: Anonymisierte Analytics-Daten zur Verbesserung unseres Services'
    ]
  },
  {
    id: 'rechtsgrundlage',
    titel: '3. Rechtsgrundlage der Verarbeitung',
    inhalt: [
      'Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf folgenden Rechtsgrundlagen:',
      '• Art. 6 Abs. 1 lit. b DSGVO - Vertragserfüllung für die Pferdebewertung',
      '• Art. 6 Abs. 1 lit. f DSGVO - Berechtigte Interessen für Website-Analytics',
      '• Art. 6 Abs. 1 lit. a DSGVO - Einwilligung für Newsletter und Marketing (optional)'
    ],
    wichtig: true
  },
  {
    id: 'zahlungsabwicklung',
    titel: '4. Zahlungsabwicklung über Stripe',
    inhalt: [
      'Zur sicheren Abwicklung von Zahlungen nutzen wir Stripe Payments Europe, Ltd.:',
      '• Adresse: 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland',
      '• Ihre Zahlungsdaten werden direkt an Stripe übermittelt und dort verarbeitet',
      '• Wir erhalten keine Kreditkartendaten - diese verbleiben sicher bei Stripe',
      '• Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)',
      '• Datenschutzerklärung von Stripe: https://stripe.com/privacy'
    ]
  },
  {
    id: 'website-analytics',
    titel: '5. Website-Analytics',
    inhalt: [
      'Wir verwenden Google Analytics zur Verbesserung unserer Website:',
      '• Anonymisierte Erfassung von Nutzungsstatistiken',
      '• IP-Anonymisierung ist aktiviert',
      '• Keine Verknüpfung mit personenbezogenen Daten',
      '• Sie können der Nutzung über Browser-Einstellungen widersprechen',
      '• Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)'
    ]
  },
  {
    id: 'speicherdauer',
    titel: '6. Speicherdauer',
    inhalt: [
      'Wir speichern Ihre Daten nur so lange wie notwendig:',
      '• Pferdebewertungsdaten: 6 Monate nach Erstellung des Berichts',
      '• Kontaktanfragen: 6 Monate nach Bearbeitung',
      '• Zahlungsdaten: Gemäß handelsrechtlicher Aufbewahrungsfristen (10 Jahre)',
      '• Website-Analytics: 26 Monate (Google Analytics Standard)'
    ]
  },
  {
    id: 'ihre-rechte',
    titel: '7. Ihre Rechte',
    inhalt: [
      'Nach der DSGVO haben Sie folgende Rechte:',
      '• Recht auf Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)',
      '• Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)',
      '• Recht auf Löschung Ihrer Daten (Art. 17 DSGVO)',
      '• Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)',
      '• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)',
      '• Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)',
      '• Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)'
    ],
    wichtig: true
  },
  {
    id: 'datensicherheit',
    titel: '8. Datensicherheit',
    inhalt: [
      'Wir treffen umfassende Sicherheitsmaßnahmen zum Schutz Ihrer Daten:',
      '• SSL-Verschlüsselung für alle Datenübertragungen',
      '• Sichere Server in EU-Rechenzentren',
      '• Regelmäßige Sicherheitsupdates und Backups',
      '• Zugriff nur durch autorisierte Personen',
      '• Keine Weitergabe an Dritte ohne Ihre Einwilligung'
    ]
  }
];

const datenKategorien: DatenKategorie[] = [
  {
    typ: 'Pferdeangaben',
    zweck: 'AI-gestützte Pferdebewertung',
    rechtsgrundlage: 'Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)',
    speicherdauer: '6 Monate'
  },
  {
    typ: 'E-Mail-Adresse',
    zweck: 'Übermittlung Bewertungsbericht',
    rechtsgrundlage: 'Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)',
    speicherdauer: '6 Monate'
  },
  {
    typ: 'Zahlungsdaten',
    zweck: 'Zahlungsabwicklung',
    rechtsgrundlage: 'Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)',
    speicherdauer: '10 Jahre (handelsrechtlich)'
  },
  {
    typ: 'Website-Nutzung',
    zweck: 'Service-Verbesserung',
    rechtsgrundlage: 'Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO)',
    speicherdauer: '26 Monate'
  }
];

const kontaktInfo: KontaktInfo = {
  titel: 'Datenschutzbeauftragter',
  name: 'Benjamin Reder',
  adresse: 'Feigenweg 17B, 70619 Stuttgart',
  email: 'datenschutz@pferdewert.de'
};

const Datenschutz: NextPage = () => {
  const [aktiverAbschnitt, setAktiverAbschnitt] = useState<string>('verantwortlicher');
  const [isLoading, setIsLoading] = useState(false);

  // GA4 Event Tracking
  const trackEvent = useCallback((eventName: string, parameters?: object) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        page_title: 'Datenschutz',
        page_location: window.location.href,
        ...parameters
      });
      info('GA4 Event:', eventName, parameters);
    }
  }, []);

  // Scroll Spy Effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const sektion of datenschutzSektionen) {
        const element = document.getElementById(sektion.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (aktiverAbschnitt !== sektion.id) {
              setAktiverAbschnitt(sektion.id);
              trackEvent('datenschutz_section_view', { section: sektion.id });
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [aktiverAbschnitt, trackEvent]);

  // Smooth Scroll Navigation
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      trackEvent('datenschutz_navigation_click', { target_section: sectionId });
    }
  }, [trackEvent]);

  // Contact Handler
  const handleContactClick = useCallback(() => {
    trackEvent('datenschutz_contact_click', { contact_type: 'email' });
  }, [trackEvent]);

  // Download Handler
  const handleDownloadClick = useCallback(() => {
    setIsLoading(true);
    trackEvent('datenschutz_download_click');

    // Simulate download preparation
    setTimeout(() => {
      setIsLoading(false);
      // In real implementation, trigger actual download
      info('Datenschutzerklärung download requested');
    }, 1000);
  }, [trackEvent]);

  // Page Load Tracking
  useEffect(() => {
    trackEvent('page_view', {
      page_title: 'Datenschutz',
      page_type: 'legal'
    });
  }, [trackEvent]);

  const jsonLdWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung von PferdeWert.de: Wie wir Ihre Daten bei der Pferdebewertung schützen und verwenden. DSGVO-konform und transparent.',
    url: 'https://pferdewert.de/datenschutz',
    isPartOf: {
      '@type': 'WebSite',
      name: 'PferdeWert.de',
      url: 'https://pferdewert.de'
    },
    inLanguage: 'de-DE',
    about: {
      '@type': 'Thing',
      name: 'Datenschutz bei Pferdebewertung'
    }
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PferdeWert GbR',
    description: 'Professionelle KI-gestützte Pferdebewertung',
    url: 'https://pferdewert.de',
    email: 'info@pferdewert.de',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Feigenweg 17B',
      postalCode: '70619',
      addressLocality: 'Stuttgart',
      addressCountry: 'DE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'datenschutz@pferdewert.de',
      contactType: 'Data Protection Officer',
      availableLanguage: 'German'
    }
  };

  const jsonLdLegalPage = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Datenschutzerklärung - PferdeWert.de',
    description: 'Umfassende Datenschutzerklärung für die Nutzung der PferdeWert.de Pferdebewertungsplattform',
    url: 'https://pferdewert.de/datenschutz',
    mainEntity: {
      '@type': 'Organization',
      name: 'PferdeWert GbR'
    },
    about: [
      'Datenschutz',
      'DSGVO Compliance',
      'Pferdebewertung Datenschutz',
      'Stripe Zahlungsabwicklung',
      'Website Analytics'
    ]
  };

  return (
    <Layout>
      <Head>
        {/* Primary Meta Tags */}
        <title>Datenschutz - Sicherer Umgang mit Ihren Daten | PferdeWert.de</title>
        <meta name="title" content="Datenschutz - Sicherer Umgang mit Ihren Daten | PferdeWert.de" />
        <meta name="description" content="Datenschutzerklärung von PferdeWert.de: Wie wir Ihre Daten bei der Pferdebewertung schützen und verwenden. DSGVO-konform und transparent." />
        <meta name="keywords" content="pferdebewertung datenschutz, DSGVO pferdewert, datenschutz pferde, stripe datenschutz, pferdewert privacy" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="language" content="de" />
        <meta name="author" content="PferdeWert.de" />
        <meta name="publisher" content="PferdeWert.de" />
        <meta name="copyright" content="PferdeWert GbR" />
        <meta name="audience" content="Pferdebesitzer, Pferdekäufer" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/datenschutz" />
        <meta property="og:title" content="Datenschutz - Sicherer Umgang mit Ihren Daten | PferdeWert.de" />
        <meta property="og:description" content="Datenschutzerklärung von PferdeWert.de: Wie wir Ihre Daten bei der Pferdebewertung schützen und verwenden. DSGVO-konform und transparent." />
        <meta property="og:image" content="https://pferdewert.de/images/og-datenschutz.jpg" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="PferdeWert.de" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pferdewert.de/datenschutz" />
        <meta property="twitter:title" content="Datenschutz - Sicherer Umgang mit Ihren Daten | PferdeWert.de" />
        <meta property="twitter:description" content="Datenschutzerklärung von PferdeWert.de: Wie wir Ihre Daten bei der Pferdebewertung schützen und verwenden. DSGVO-konform und transparent." />
        <meta property="twitter:image" content="https://pferdewert.de/images/og-datenschutz.jpg" />

        {/* Additional Meta Tags */}
        <link rel="canonical" href="https://pferdewert.de/datenschutz" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLegalPage) }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                DSGVO-konforme Datenverarbeitung
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Datenschutzerklärung
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Transparente Informationen über den sicheren Umgang mit Ihren Daten bei der Pferdebewertung
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownloadClick}
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  Als PDF herunterladen
                </button>
                <Link
                  href="/impressum"
                  className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Zum Impressum
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Navigation Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Inhaltsverzeichnis</h3>
                  <ul className="space-y-2">
                    {datenschutzSektionen.map((sektion) => (
                      <li key={sektion.id}>
                        <button
                          onClick={() => scrollToSection(sektion.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            aktiverAbschnitt === sektion.id
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          }`}
                        >
                          {sektion.titel}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Kontakt</h4>
                    <p className="text-sm text-gray-600 mb-2">{kontaktInfo.name}</p>
                    <a
                      href={`mailto:${kontaktInfo.email}`}
                      onClick={handleContactClick}
                      className="text-sm text-blue-600 hover:text-blue-700 underline"
                    >
                      {kontaktInfo.email}
                    </a>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Important Notice */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-tr-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-blue-800">Wichtiger Hinweis</h3>
                      <p className="mt-2 text-blue-700">
                        Diese Datenschutzerklärung entspricht den Anforderungen der DSGVO und erklärt transparent,
                        wie wir Ihre Daten bei der AI-gestützten Pferdebewertung verarbeiten.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-6 space-y-12">
                  {datenschutzSektionen.map((sektion, index) => (
                    <section key={sektion.id} id={sektion.id} className="scroll-mt-24">
                      <div className={`${sektion.wichtig ? 'bg-amber-50 border-l-4 border-amber-400 pl-6 py-4' : ''} rounded-r-lg`}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                          {sektion.titel}
                          {sektion.wichtig && (
                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Wichtig
                            </span>
                          )}
                        </h2>
                        <div className="prose prose-lg max-w-none">
                          {sektion.inhalt.map((absatz, absatzIndex) => (
                            <p key={absatzIndex} className="text-gray-700 mb-4 leading-relaxed">
                              {absatz.includes('https://') ? (
                                <>
                                  {absatz.split('https://')[0]}
                                  <a
                                    href={`https://${absatz.split('https://')[1]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700 underline"
                                    onClick={() => trackEvent('external_link_click', { url: absatz.split('https://')[1] })}
                                  >
                                    https://{absatz.split('https://')[1]}
                                  </a>
                                </>
                              ) : (
                                absatz
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </section>
                  ))}

                  {/* Data Categories Table */}
                  <section className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Übersicht Datenverarbeitung</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Datentyp
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Zweck
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Rechtsgrundlage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Speicherdauer
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {datenKategorien.map((kategorie, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {kategorie.typ}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {kategorie.zweck}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-700">
                                {kategorie.rechtsgrundlage}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {kategorie.speicherdauer}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Contact Section */}
                  <section className="bg-blue-50 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Fragen zum Datenschutz?</h2>
                    <p className="text-gray-700 mb-4">
                      Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten oder zur Ausübung Ihrer Rechte
                      können Sie sich jederzeit an uns wenden:
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <h3 className="font-semibold text-gray-900 mb-2">{kontaktInfo.titel}</h3>
                      <p className="text-gray-700">{kontaktInfo.name}</p>
                      <p className="text-gray-700">{kontaktInfo.adresse}</p>
                      <a
                        href={`mailto:${kontaktInfo.email}`}
                        onClick={handleContactClick}
                        className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {kontaktInfo.email}
                      </a>
                    </div>
                  </section>

                  {/* Last Updated */}
                  <section className="text-center py-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Letzte Aktualisierung: 21. September 2025
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Diese Datenschutzerklärung ist Teil unserer{' '}
                      <Link href="/agb" className="text-blue-600 hover:text-blue-700 underline">
                        Allgemeinen Geschäftsbedingungen
                      </Link>
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Datenschutz;