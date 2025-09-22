import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { FAQProps, FAQItem } from '../types/faq.types';

const FAQ: React.FC<FAQProps> = ({
  faqs,
  sectionTitle = "Häufig gestellte Fragen",
  withToggle = true,
  withSchema = true,
  initialOpenItems = [],
  className = ""
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set(initialOpenItems));

  const toggleItem = useCallback((index: number) => {
    if (!withToggle) return;

    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, [withToggle]);

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

  const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <svg
      className={`w-5 h-5 text-brand-brown transition-transform duration-300 ${
        isOpen ? 'transform rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <>
      {generateSchema()}
      <section className={`bg-brand-light rounded-xl p-6 lg:p-8 ${className}`}>
        {sectionTitle && (
          <h2 className="font-serif text-h3 text-brand-DEFAULT font-semibold mb-6 lg:mb-8">
            {sectionTitle}
          </h2>
        )}

        <div className="space-y-4">
          {faqs.map((faq: FAQItem, index: number) => {
            const isOpen = openItems.has(index);
            const isHighlighted = faq.highlight;

            return (
              <div
                key={index}
                className={`bg-white rounded-lg border transition-all duration-200 ${
                  isHighlighted
                    ? 'border-brand-gold bg-brand-gold/5 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {withToggle ? (
                  <button
                    onClick={() => toggleItem(index)}
                    className={`w-full p-4 lg:p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 rounded-lg transition-colors duration-200 ${
                      isOpen ? 'hover:bg-brand-light/50' : 'hover:bg-brand-light'
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    aria-describedby={`faq-question-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <h3 className="font-serif text-lg text-brand-DEFAULT font-semibold pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    <ChevronIcon isOpen={isOpen} />
                  </button>
                ) : (
                  <div className="p-4 lg:p-6">
                    <h3 className="font-serif text-lg text-brand-DEFAULT font-semibold mb-3 leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                )}

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    withToggle
                      ? isOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                      : 'max-h-none opacity-100'
                  }`}
                >
                  <div className={`px-4 lg:px-6 ${withToggle ? 'pb-4 lg:pb-6' : ''}`}>
                    <div className="text-base text-brand-DEFAULT/80 leading-relaxed prose prose-brand max-w-none">
                      <ReactMarkdown>
                        {faq.answer}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FAQ;