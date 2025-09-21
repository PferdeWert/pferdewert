import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import { info } from '@/lib/log';

// Definiere TypeScript-Interfaces für AGB-Sektionen
interface AGBSektion {
  id: string;
  titel: string;
  inhalt: string[];
  wichtig?: boolean;
}

interface FAQItem {
  frage: string;
  antwort: string;
}

const AGB: NextPage = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // AGB-Sektionen definieren
  const agbSektionen: AGBSektion[] = [
    {
      id: 'anbieter',
      titel: '1. Anbieter und Geltungsbereich',
      inhalt: [
        'Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die über die Website pferdewert.de zwischen der PferdeWert GbR und Kunden abgeschlossen werden.',
        'Anbieterin: PferdeWert GbR, Sabine und Benjamin Reder, Feigenweg 17B, 70619 Stuttgart',
        'E-Mail: info@pferdewert.de, Website: https://pferdewert.de'
      ],
      wichtig: true
    },
    {
      id: 'leistungen',
      titel: '2. Leistungsbeschreibung',
      inhalt: [
        'PferdeWert.de bietet KI-gestützte Pferdebewertungen basierend auf Kundenangaben zu Pferdedaten.',
        'Die Bewertung erfolgt durch fortschrittliche Algorithmen und aktuelle Marktdaten.',
        'Das Ergebnis stellt eine Einschätzung dar und ist nicht rechtlich bindend.',
        'Keine tierärztliche Untersuchung oder Garantie für Marktwert wird übernommen.'
      ]
    },
    {
      id: 'vertragsschluss',
      titel: '3. Vertragsschluss und Zahlung',
      inhalt: [
        'Der Vertrag kommt durch erfolgreiche Zahlung über Stripe zustande.',
        'Nach Zahlungsbestätigung wird das Bewertungsergebnis sofort bereitgestellt.',
        'Alle Preise verstehen sich inkl. gesetzlicher MwSt.',
        'Zahlungsabwicklung erfolgt sicher über Stripe als Zahlungsdienstleister.'
      ],
      wichtig: true
    },
    {
      id: 'widerruf',
      titel: '4. Widerrufsrecht',
      inhalt: [
        'Bei digitalen Inhalten erlischt das Widerrufsrecht nach § 356 Abs. 5 BGB.',
        'Dies gilt, wenn die Leistung mit ausdrücklicher Zustimmung vor Ablauf der Widerrufsfrist erbracht wird.',
        'Durch den Erhalt der Bewertung bestätigen Sie den Verlust des Widerrufsrechts.',
        'Bei technischen Problemen kontaktieren Sie uns für eine Lösung.'
      ]
    },
    {
      id: 'haftung',
      titel: '5. Haftungsbeschränkung',
      inhalt: [
        'Die Bewertung basiert auf algorithmischen Berechnungen und verfügbaren Marktdaten.',
        'Keine Gewähr für Richtigkeit, Vollständigkeit oder Aktualität der Ergebnisse.',
        'Haftung beschränkt sich auf Vorsatz und grobe Fahrlässigkeit.',
        'Nutzung der Bewertungsergebnisse erfolgt auf eigenes Risiko des Kunden.'
      ]
    },
    {
      id: 'datenschutz',
      titel: '6. Datenschutz und Verwendung',
      inhalt: [
        'Erhobene Pferdedaten werden ausschließlich für die Bewertung verwendet.',
        'Keine Weitergabe von Kundendaten an Dritte ohne ausdrückliche Zustimmung.',
        'Detaillierte Informationen in unserer Datenschutzerklärung.',
        'Kunden können jederzeit Auskunft über gespeicherte Daten verlangen.'
      ],
      wichtig: true
    },
    {
      id: 'verfuegbarkeit',
      titel: '7. Verfügbarkeit und technische Anforderungen',
      inhalt: [
        'Wir bemühen uns um 99,9% Verfügbarkeit der Website.',
        'Wartungsarbeiten werden nach Möglichkeit angekündigt.',
        'Aktuelle Browser-Versionen werden für optimale Nutzung empfohlen.',
        'Bei technischen Störungen erfolgt schnellstmögliche Behebung.'
      ]
    },
    {
      id: 'schlussbestimmungen',
      titel: '8. Schlussbestimmungen',
      inhalt: [
        'Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.',
        'Erfüllungsort und Gerichtsstand ist Stuttgart (bei Kaufleuten).',
        'Änderungen dieser AGB werden per E-Mail oder Website-Hinweis mitgeteilt.',
        'Sollten einzelne Bestimmungen unwirksam sein, bleibt der Rest der AGB gültig.'
      ]
    }
  ];

  // FAQ-Daten für AGB
  const faqItems: FAQItem[] = [
    {
      frage: 'Ist die Pferdebewertung rechtlich bindend?',
      antwort: 'Nein, unsere KI-Bewertung stellt eine Markteinschätzung dar und ist nicht rechtlich bindend. Sie dient als Orientierungshilfe für Kauf- und Verkaufsentscheidungen.'
    },
    {
      frage: 'Kann ich mein Geld zurückbekommen?',
      antwort: 'Da es sich um digitale Inhalte handelt, die sofort bereitgestellt werden, erlischt das Widerrufsrecht nach § 356 BGB. Bei technischen Problemen finden wir eine Lösung.'
    },
    {
      frage: 'Wie werden meine Daten verwendet?',
      antwort: 'Ihre Pferdedaten werden ausschließlich für die Bewertung verwendet und nicht an Dritte weitergegeben. Details finden Sie in unserer Datenschutzerklärung.'
    },
    {
      frage: 'Was passiert bei technischen Problemen?',
      antwort: 'Bei technischen Störungen kontaktieren Sie uns per E-Mail. Wir lösen Probleme schnellstmöglich und sorgen für eine zufriedenstellende Lösung.'
    }
  ];

  // GA4 Event Tracking
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        page_title: 'AGB - Allgemeine Geschäftsbedingungen',
        page_location: window.location.href,
        ...parameters
      });
      info('GA4 Event:', eventName, parameters);
    }
  }, []);

  // Smooth Scroll zu Sektion
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      trackEvent('agb_section_navigate', {
        section_id: sectionId,
        section_title: agbSektionen.find(s => s.id === sectionId)?.titel
      });
    }
  }, [trackEvent, agbSektionen]);

  // Page Load Tracking
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      trackEvent('page_view', {
        page_title: 'AGB - Allgemeine Geschäftsbedingungen',
        content_type: 'legal_document'
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [trackEvent]);

  // Scroll Spy für aktive Sektion
  useEffect(() => {
    const handleScroll = () => {
      const sections = agbSektionen.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [agbSektionen]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        {/* Standard Meta Tags */}
        <title>AGB - Allgemeine Geschäftsbedingungen | PferdeWert.de</title>
        <meta
          name="description"
          content="Allgemeine Geschäftsbedingungen für die Nutzung der PferdeWert.de Pferdebewertungsplattform. Transparente Bedingungen für unsere Services."
        />
        <meta name="keywords" content="pferdebewertung agb, allgemeine geschäftsbedingungen, pferdewert nutzungsbedingungen" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://pferdewert.de/agb" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="AGB - Allgemeine Geschäftsbedingungen | PferdeWert.de" />
        <meta property="og:description" content="Allgemeine Geschäftsbedingungen für die Nutzung der PferdeWert.de Pferdebewertungsplattform. Transparente Bedingungen für unsere Services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pferdewert.de/agb" />
        <meta property="og:site_name" content="PferdeWert.de" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AGB - Allgemeine Geschäftsbedingungen | PferdeWert.de" />
        <meta name="twitter:description" content="Allgemeine Geschäftsbedingungen für die Nutzung der PferdeWert.de Pferdebewertungsplattform. Transparente Bedingungen für unsere Services." />

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="prefetch" href="/datenschutz" />
        <link rel="prefetch" href="/impressum" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'AGB - Allgemeine Geschäftsbedingungen',
              description: 'Allgemeine Geschäftsbedingungen für die Nutzung der PferdeWert.de Pferdebewertungsplattform. Transparente Bedingungen für unsere Services.',
              url: 'https://pferdewert.de/agb',
              inLanguage: 'de-DE',
              isPartOf: {
                '@type': 'WebSite',
                name: 'PferdeWert.de',
                url: 'https://pferdewert.de'
              },
              about: {
                '@type': 'Organization',
                name: 'PferdeWert GbR',
                url: 'https://pferdewert.de'
              },
              dateModified: new Date().toISOString().split('T')[0],
              publisher: {
                '@type': 'Organization',
                name: 'PferdeWert GbR',
                url: 'https://pferdewert.de'
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PferdeWert GbR',
              url: 'https://pferdewert.de',
              logo: 'https://pferdewert.de/images/logo.png',
              description: 'KI-gestützte Pferdebewertung für faire Marktpreise',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Feigenweg 17B',
                addressLocality: 'Stuttgart',
                postalCode: '70619',
                addressCountry: 'DE'
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'info@pferdewert.de',
                availableLanguage: 'German'
              },
              sameAs: [
                'https://pferdewert.de'
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map(item => ({
                '@type': 'Question',
                name: item.frage,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.antwort
                }
              }))
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        {/* Header Section */}
        <section className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Allgemeine Geschäftsbedingungen
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Transparente Bedingungen für die Nutzung unserer Pferdebewertungsplattform
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                  Rechtssicherheit
                </span>
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                  Faire Konditionen
                </span>
                <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                  Transparent
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4">
              <nav className="flex space-x-8">
                {agbSektionen.map((sektion) => (
                  <button
                    key={sektion.id}
                    onClick={() => scrollToSection(sektion.id)}
                    className={`whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeSection === sektion.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {sektion.titel}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* AGB Content */}
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {agbSektionen.map((sektion, index) => (
                <div
                  key={sektion.id}
                  id={sektion.id}
                  className={`rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md ${
                    sektion.wichtig ? 'border-l-4 border-blue-500' : ''
                  }`}
                >
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    {sektion.titel}
                    {sektion.wichtig && (
                      <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        Wichtig
                      </span>
                    )}
                  </h2>
                  <div className="space-y-3">
                    {sektion.inhalt.map((absatz, absatzIndex) => (
                      <p key={absatzIndex} className="text-gray-600 leading-relaxed">
                        {absatz}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Häufig gestellte Fragen zu den AGB
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Antworten auf die wichtigsten Fragen zu unseren Geschäftsbedingungen
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">
                    {item.frage}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.antwort}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-blue-50 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Fragen zu den AGB?
              </h2>
              <p className="mt-4 text-gray-600">
                Bei Fragen zu unseren Geschäftsbedingungen kontaktieren Sie uns gerne
              </p>
              <div className="mt-6">
                <a
                  href="mailto:info@pferdewert.de"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => trackEvent('agb_contact_click', { contact_method: 'email' })}
                >
                  E-Mail senden
                </a>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                info@pferdewert.de • Antwort innerhalb von 24 Stunden
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AGB;