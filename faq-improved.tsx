// Verbesserte FAQ-Komponente mit Design System Konsistenz

import React from 'react';
import { FAQProps, FAQItem } from '../types/faq.types';

const FAQImproved: React.FC<FAQProps> = ({
  faqs,
  sectionTitle = "Häufige Fragen",
  withSchema = true,
  className = ""
}) => {
  const generateSchema = () => {
    if (!withSchema) return null;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    );
  };

  return (
    <>
      {generateSchema()}
      {/* Verbesserter Hintergrund mit Design System Farben */}
      <section className={`section bg-gradient-to-b from-white to-brand-light/30 ${className}`}>
        <div className="container mx-auto px-4 max-w-4xl"> {/* Einheitliche Container-Klasse */}
          {sectionTitle && (
            <div className="text-center mb-16">
              <h2 className="text-h2 font-serif text-brand mb-4">{sectionTitle}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Alles was du über Pferdepreis berechnen und Pferdebewertung wissen möchtest
              </p>
            </div>
          )}
          <div className="space-y-4"> {/* Reduzierter Abstand für bessere Dichte */}
            {faqs.map((faq: FAQItem, index: number) => (
              <details
                key={index}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-soft hover:border-brand-green/30 group"
              >
                <summary className="p-6 text-lg font-semibold text-brand cursor-pointer flex justify-between items-center list-none">
                  <span className="flex-1 font-serif">{faq.question}</span>
                  {/* Verbessertes Icon mit Design System Farben */}
                  <svg
                    className="w-5 h-5 text-brand-green transition-all duration-200 group-open:rotate-180 group-hover:text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  {/* Verbesserte Antwort-Darstellung */}
                  <div className="pt-4 border-t border-brand-green/10">
                    <p className="text-gray-700 leading-relaxed font-sans">{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>

          {/* CTA nach FAQ gemäß Design System */}
          <div className="text-center mt-16">
            <a
              href="/pferde-preis-berechnen"
              className="btn-primary"
            >
              Jetzt Pferdewert berechnen
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQImproved;