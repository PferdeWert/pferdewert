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
      className={`w-5 h-5 text-[#8c5a1f] transition-transform duration-300 ${
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
      <section className={`bg-[#f7f3ec] rounded-3xl p-6 lg:p-10 shadow-sm border border-[#eadfcd] ${className}`}>
        {sectionTitle && (
          <h2 className="font-serif text-3xl md:text-[2.25rem] text-gray-900 font-semibold mb-6 lg:mb-8">
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
                className={`bg-white rounded-2xl border transition-all duration-200 shadow-sm ${
                  isHighlighted
                    ? 'border-[#f3c27b] bg-[#fff7ec]'
                    : 'border-[#e7e0d4] hover:border-[#d6cab7]'
                }`}
              >
                {withToggle ? (
                  <button
                    onClick={() => toggleItem(index)}
                    className={`w-full p-5 lg:p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#f3c27b] focus:ring-offset-2 rounded-2xl transition-colors duration-200 ${
                      isOpen ? 'bg-[#f9f4ec]' : 'hover:bg-[#f9f4ec]'
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    aria-describedby={`faq-question-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <h3 className="font-serif text-xl text-gray-900 font-semibold pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    <ChevronIcon isOpen={isOpen} />
                  </button>
                ) : (
                  <div className="p-5 lg:p-6">
                    <h3 className="font-serif text-xl text-gray-900 font-semibold mb-3 leading-tight">
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
                  <div className={`px-5 lg:px-6 ${withToggle ? 'pb-5 lg:pb-6' : ''}`}>
                    <div className="text-base text-gray-700 leading-relaxed prose prose-brand max-w-none">
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
