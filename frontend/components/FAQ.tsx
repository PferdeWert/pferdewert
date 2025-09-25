import React from 'react';
import { FAQProps, FAQItem } from '../types/faq.types';

const FAQ: React.FC<FAQProps> = ({
  faqs,
  sectionTitle = "Häufig gestellte Fragen",
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
      <section className={`section bg-white ${className}`}>
        <div className="container mx-auto px-4">
          {sectionTitle && (
            <div className="text-center mb-16">
              <h2 className="text-h2 font-bold text-gray-900 mb-4">{sectionTitle}</h2>
            </div>
          )}
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq: FAQItem, index: number) => (
              <details
                key={index}
                className="bg-brand-light/50 rounded-2xl border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-brand-gold/30"
              >
                <summary className="p-6 text-lg font-semibold text-gray-900 cursor-pointer flex justify-between items-center list-none">
                  <span className="flex-1">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-brand-gold transition-transform duration-200 details-chevron"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
