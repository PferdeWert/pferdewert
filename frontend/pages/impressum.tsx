// pages/impressum.tsx
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { info, error } from '@/lib/log';

// TypeScript Interfaces
interface ImpressumSektion {
  id: string;
  titel: string;
  inhalt: string[];
  wichtig?: boolean;
}

interface KontaktInfo {
  name: string;
  adresse: string[];
  kontakt: {
    email: string;
    telefon?: string;
    website: string;
  };
  rechtliches: {
    umsatzsteuer: string;
    verantwortlich: string;
    berufsbezeichnung?: string;
  };
}

interface HaftungshinweisSektion {
  titel: string;
  text: string[];
}

// Datenstrukturen
const kontaktInfo: KontaktInfo = {
  name: 'PferdeWert GbR',
  adresse: [
    'Sabine und Benjamin Reder',
    'Feigenweg 17B',
    '70619 Stuttgart',
    'Deutschland'
  ],
  kontakt: {
    email: 'info@pferdewert.de',
    website: 'https://pferdewert.de'
  },
  rechtliches: {
    umsatzsteuer: 'Nicht umsatzsteuerpflichtig gemäß § 19 UStG (Kleinunternehmerregelung)',
    verantwortlich: 'Sabine und Benjamin Reder'
  }
};

const impressumSektionen: ImpressumSektion[] = [
  {
    id: 'anbieter',
    titel: '1. Angaben gemäß § 5 TMG',
    inhalt: [
      `${kontaktInfo.name}`,
      ...kontaktInfo.adresse
    ],
    wichtig: true
  },
  {
    id: 'kontakt',
    titel: '2. Kontakt',
    inhalt: [
      `E-Mail: ${kontaktInfo.kontakt.email}`,
      `Website: ${kontaktInfo.kontakt.website}`
    ]
  },
  {
    id: 'verantwortlich',
    titel: '3. Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
    inhalt: [
      kontaktInfo.rechtliches.verantwortlich,
      'Feigenweg 17B',
      '70619 Stuttgart'
    ]
  },
  {
    id: 'umsatzsteuer',
    titel: '4. Umsatzsteuer-ID',
    inhalt: [
      kontaktInfo.rechtliches.umsatzsteuer
    ]
  },
  {
    id: 'aufsichtsbehoerde',
    titel: '5. Aufsichtsbehörde',
    inhalt: [
      'Für unsere Tätigkeit als Pferdebewertungsservice gibt es keine spezielle Aufsichtsbehörde.',
      'Bei allgemeinen Beschwerden wenden Sie sich an die örtlichen Behörden in Stuttgart.'
    ]
  },
  {
    id: 'berufshaftpflicht',
    titel: '6. Berufshaftpflichtversicherung',
    inhalt: [
      'Betriebshaftpflichtversicherung vorhanden',
      'Versicherer: Wird auf Anfrage mitgeteilt',
      'Geltungsraum: Deutschland und EU'
    ]
  }
];

const haftungshinweise: HaftungshinweisSektion[] = [
  {
    titel: 'Haftung für Inhalte',
    text: [
      'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
    ]
  },
  {
    titel: 'Haftung für Links',
    text: [
      'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.',
      'Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.'
    ]
  },
  {
    titel: 'Urheberrecht',
    text: [
      'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.',
      'Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.'
    ]
  }
];

// Tracking-Funktion
const trackEvent = (eventName: string, parameters?: object) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
    info('GA4 Event:', eventName, parameters);
  }
};

const Impressum: NextPage = () => {
  const [activeSection, setActiveSection] = useState<string>('anbieter');
  const [isLoading, setIsLoading] = useState(false);

  // Scroll Spy Effekt
  useEffect(() => {
    const handleScroll = () => {
      const sections = impressumSektionen.map(sektion => sektion.id);
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Handler
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      trackEvent('impressum_navigation', {
        section: sectionId,
        method: 'scroll'
      });
    }
  }, []);

  // Download Impressum als PDF
  const downloadImpressum = useCallback(async () => {
    setIsLoading(true);
    try {
      trackEvent('impressum_download_start', {
        format: 'pdf'
      });

      // Hier würde die PDF-Generierung implementiert werden
      await new Promise(resolve => setTimeout(resolve, 1000));

      trackEvent('impressum_download_success', {
        format: 'pdf'
      });
    } catch (err) {
      error('Impressum Download Error:', err);
      trackEvent('impressum_download_error', {
        error: 'download_failed'
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // JSON-LD Schema für Impressum
  const createWebPageSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://pferdewert.de/impressum#webpage',
      url: 'https://pferdewert.de/impressum',
      name: 'Impressum - Rechtliche Informationen | PferdeWert.de',
      description: 'Impressum und rechtliche Informationen zu PferdeWert.de. Kontaktdaten, Verantwortlichkeiten und rechtliche Hinweise zur Pferdebewertung.',
      inLanguage: 'de-DE',
      isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://pferdewert.de#website'
      },
      about: {
        '@type': 'Thing',
        name: 'Impressum und rechtliche Informationen'
      },
      mainEntity: {
        '@type': 'Organization',
        '@id': 'https://pferdewert.de#organization'
      }
    };
  };

  const createOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://pferdewert.de#organization',
      name: kontaktInfo.name,
      legalName: kontaktInfo.name,
      url: kontaktInfo.kontakt.website,
      email: kontaktInfo.kontakt.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Feigenweg 17B',
        postalCode: '70619',
        addressLocality: 'Stuttgart',
        addressCountry: 'DE'
      },
      foundingDate: '2024',
      description: 'KI-gestützte Pferdebewertung und Marktpreisanalyse für den deutschen Pferdemarkt',
      serviceArea: {
        '@type': 'Country',
        name: 'Deutschland'
      },
      knowsAbout: [
        'Pferdebewertung',
        'Pferdepreise',
        'Pferdemarkt',
        'Künstliche Intelligenz'
      ]
    };
  };

  const createAboutPageSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': 'https://pferdewert.de/impressum#aboutpage',
      url: 'https://pferdewert.de/impressum',
      name: 'Impressum',
      description: 'Rechtliche Informationen und Kontaktdaten der PferdeWert GbR',
      inLanguage: 'de-DE',
      about: {
        '@type': 'Organization',
        '@id': 'https://pferdewert.de#organization'
      },
      mainContentOfPage: {
        '@type': 'WebPageElement',
        about: 'Impressum und rechtliche Informationen'
      }
    };
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Impressum - Rechtliche Informationen | PferdeWert.de</title>
        <meta name="description" content="Impressum und rechtliche Informationen zu PferdeWert.de. Kontaktdaten, Verantwortlichkeiten und rechtliche Hinweise zur Pferdebewertung." />
        <meta name="keywords" content="pferdewert impressum, rechtliche informationen, kontakt pferdebewertung, impressum pferdewert, anbieterkennung" />
        <link rel="canonical" href="https://pferdewert.de/impressum" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Impressum - Rechtliche Informationen | PferdeWert.de" />
        <meta property="og:description" content="Impressum und rechtliche Informationen zu PferdeWert.de. Kontaktdaten, Verantwortlichkeiten und rechtliche Hinweise zur Pferdebewertung." />
        <meta property="og:url" content="https://pferdewert.de/impressum" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Impressum - Rechtliche Informationen | PferdeWert.de" />
        <meta name="twitter:description" content="Impressum und rechtliche Informationen zu PferdeWert.de. Kontaktdaten, Verantwortlichkeiten und rechtliche Hinweise zur Pferdebewertung." />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="PferdeWert GbR" />
        <meta name="publisher" content="PferdeWert.de" />
        <meta name="language" content="de" />
        <meta name="geo.region" content="DE-BW" />
        <meta name="geo.placename" content="Stuttgart" />

        {/* Performance & Preloading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="prefetch" href="/datenschutz" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createWebPageSchema())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createOrganizationSchema())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createAboutPageSchema())
          }}
        />
      </Head>

      <Layout>
        <div className="bg-gradient-to-br from-amber-50 via-white to-blue-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Impressum
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Rechtliche Informationen und Kontaktdaten zu PferdeWert.de
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={downloadImpressum}
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                  Impressum als PDF
                </button>
                <a
                  href="mailto:info@pferdewert.de"
                  className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => trackEvent('impressum_contact_click', { method: 'email' })}
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Kontakt aufnehmen
                </a>
              </div>
            </div>

            <div className="lg:flex lg:gap-12">
              {/* Navigation Sidebar */}
              <div className="lg:w-1/4 mb-8 lg:mb-0">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Navigation
                  </h3>
                  <nav className="space-y-2">
                    {impressumSektionen.map((sektion) => (
                      <button
                        key={sektion.id}
                        onClick={() => scrollToSection(sektion.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === sektion.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        {sektion.titel}
                      </button>
                    ))}
                    <div className="border-t pt-2 mt-4">
                      <button
                        onClick={() => scrollToSection('haftung')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === 'haftung'
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        Haftungsausschluss
                      </button>
                    </div>
                  </nav>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:w-3/4">
                <div className="bg-white rounded-lg shadow-sm">
                  {/* Impressum Sektionen */}
                  <div className="p-6 sm:p-8">
                    {impressumSektionen.map((sektion, index) => (
                      <section
                        key={sektion.id}
                        id={sektion.id}
                        className={`${index > 0 ? 'mt-12' : ''} scroll-mt-8`}
                      >
                        <h2 className={`text-xl sm:text-2xl font-bold mb-6 ${
                          sektion.wichtig ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {sektion.titel}
                        </h2>

                        <div className={`prose prose-lg max-w-none ${
                          sektion.wichtig ? 'bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500' : ''
                        }`}>
                          {sektion.inhalt.map((absatz, absatzIndex) => (
                            <p key={absatzIndex} className="mb-3 text-gray-700 leading-relaxed">
                              {sektion.id === 'kontakt' && absatz.includes('E-Mail:') ? (
                                <>
                                  E-Mail:{' '}
                                  <a
                                    href={`mailto:${kontaktInfo.kontakt.email}`}
                                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                                    onClick={() => trackEvent('impressum_email_click', { section: sektion.id })}
                                  >
                                    {kontaktInfo.kontakt.email}
                                  </a>
                                </>
                              ) : sektion.id === 'kontakt' && absatz.includes('Website:') ? (
                                <>
                                  Website:{' '}
                                  <a
                                    href={kontaktInfo.kontakt.website}
                                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent('impressum_website_click', { section: sektion.id })}
                                  >
                                    {kontaktInfo.kontakt.website}
                                  </a>
                                </>
                              ) : (
                                absatz
                              )}
                            </p>
                          ))}
                        </div>
                      </section>
                    ))}

                    {/* Haftungsausschluss */}
                    <section id="haftung" className="mt-12 scroll-mt-8">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                        Haftungsausschluss
                      </h2>

                      {haftungshinweise.map((hinweis, index) => (
                        <div key={index} className="mb-8">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {hinweis.titel}
                          </h3>
                          <div className="space-y-4">
                            {hinweis.text.map((absatz, absatzIndex) => (
                              <p key={absatzIndex} className="text-gray-700 leading-relaxed">
                                {absatz}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </section>

                    {/* Rechtliche Hinweise */}
                    <section className="mt-12 bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Weitere rechtliche Hinweise
                      </h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Streitbeilegung
                          </h4>
                          <p className="text-sm text-gray-600">
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                            vor einer Verbraucherschlichtungsstelle teilzunehmen.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Datenschutz
                          </h4>
                          <p className="text-sm text-gray-600">
                            Informationen zur Datenverarbeitung finden Sie in unserer{' '}
                            <a
                              href="/datenschutz"
                              className="text-blue-600 hover:text-blue-800 underline"
                              onClick={() => trackEvent('impressum_datenschutz_link', { source: 'impressum' })}
                            >
                              Datenschutzerklärung
                            </a>.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Kontakt-Aufforderung */}
                    <section className="mt-12 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        Fragen zum Impressum?
                      </h3>
                      <p className="text-blue-800 mb-4">
                        Bei Fragen zu diesen rechtlichen Informationen oder unserem Service
                        können Sie uns jederzeit kontaktieren.
                      </p>
                      <a
                        href="mailto:info@pferdewert.de?subject=Frage%20zum%20Impressum"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        onClick={() => trackEvent('impressum_contact_bottom', { method: 'email' })}
                      >
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        E-Mail senden
                      </a>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Impressum;
