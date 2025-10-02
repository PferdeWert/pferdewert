// components/PferdeWertReviewSchema.tsx
import React from 'react';
import ReviewSchema, { createReviewFromTestimonial, calculateAggregateRating } from './ReviewSchema';

interface PferdeWertReviewSchemaProps {
  // Page context to customize the schema
  pageType?: 'homepage' | 'service' | 'about';
  
  // Service-specific details
  serviceUrl?: string;
  
  // Whether to include current testimonials as reviews
  includeTestimonials?: boolean;
}

export default function PferdeWertReviewSchema({
  pageType = 'homepage',
  serviceUrl,
  includeTestimonials = true
}: PferdeWertReviewSchemaProps): React.JSX.Element {
  
  // Current testimonials that we can convert to reviews
  const testimonials = includeTestimonials ? [
    {
      name: "Miriam F.",
      quote: "Nach einem Jahr gemeinsamer Zeit war ich neugierig, wie mein Pferd aktuell bewertet wird. Die Bewertung über PferdeWert war für mich eine tolle Möglichkeit, eine realistische Einschätzung zu bekommen – unkompliziert, nachvollziehbar und professionell. Wer wissen möchte, was das eigene Pferd wirklich wert ist, findet bei PferdeWert eine durchdachte und fachlich fundierte Einschätzung. Besonders gut: Es wird nicht nur pauschal bewertet, sondern auch individuell auf Abstammung und Gesundheitsstatus eingegangen.",
      rating: 5,
      verifiedDate: "2024-01-15"
    },
    {
      name: "Eva T.",
      quote: "Nach einer Verletzung von Fürstiano war ich unsicher über seinen aktuellen Marktwert. Die PferdeWert-Analyse war super einfach auszufüllen und das Ergebnis kam sofort. Besonders hilfreich fand ich die detaillierte Aufschlüsselung der Bewertungsfaktoren - das hat mir wirklich geholfen, die Situation realistisch einzuschätzen. Auch wenn für mich mein Pferd unbezahlbar bleibt, war es interessant zu wissen, wo er marktmäßig steht.",
      rating: 5,
      verifiedDate: "2024-12-20"
    },
    {
      name: "Denise B.",
      quote: "Auch wenn ein Verkauf meiner beiden Stuten nicht in Frage kommt, war ich neugierig, wo ihr aktueller Marktwert liegt. Die Bewertung bei PferdeWert war überraschend einfach – ein paar Fragen zur Abstammung, zu eventuellen Krankheitsbildern, Ausbildung und Turniererfolgen, das war's. Keine 10 Minuten später hatte ich eine detaillierte Analyse zu beiden Pferden. Perfekt für alle, die vor einem Pferdekauf oder Pferdeverkauf stehen oder einfach so wissen möchten, was ihre Pferde wert sind.",
      rating: 5,
      verifiedDate: "2025-01-12"
    }
  ] : [];

  // Convert testimonials to review format
  const reviews = testimonials.map(createReviewFromTestimonial);
  
  // Calculate aggregate rating
  const aggregateRating = calculateAggregateRating(reviews);

  // Define item being reviewed based on page type
  const getItemReviewed = () => {
    const baseUrl = 'https://pferdewert.de';
    
    switch (pageType) {
      case 'service':
        return {
          name: 'KI-basierte Pferdebewertung',
          type: 'Service' as const,
          url: serviceUrl || `${baseUrl}/pferde-preis-berechnen`,
          description: 'Professionelle Bewertung des Marktwerts von Pferden mittels künstlicher Intelligenz in nur 2 Minuten',
          image: `${baseUrl}/images/blossi-shooting.webp`
        };
      
      case 'about':
        return {
          name: 'PferdeWert - Pferdebewertung Service',
          type: 'Organization' as const,
          url: baseUrl,
          description: 'Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung',
          image: `${baseUrl}/images/blossi-shooting.webp`
        };
      
      default: // homepage
        return {
          name: 'PferdeWert',
          type: 'LocalBusiness' as const,
          url: baseUrl,
          description: 'Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung. Entwickelt von Reitern für Reiter.',
          image: `${baseUrl}/images/blossi-shooting.webp`
        };
    }
  };

  // Organization data
  const organization = {
    name: 'PferdeWert',
    url: 'https://pferdewert.de',
    logo: 'https://pferdewert.de/images/logo.webp',
    sameAs: [
      // Add social media profiles when available
      // 'https://www.facebook.com/pferdewert',
      // 'https://www.instagram.com/pferdewert',
    ]
  };

  return (
    <ReviewSchema
      itemReviewed={getItemReviewed()}
      aggregateRating={aggregateRating}
      reviews={reviews}
      organization={organization}
    />
  );
}

// Export for use in specific contexts
export function ServiceReviewSchema(): React.JSX.Element {
  return (
    <PferdeWertReviewSchema 
      pageType="service" 
      serviceUrl="https://pferdewert.de/pferde-preis-berechnen"
      includeTestimonials={true}
    />
  );
}

export function HomepageReviewSchema(): React.JSX.Element {
  return (
    <PferdeWertReviewSchema 
      pageType="homepage" 
      includeTestimonials={true}
    />
  );
}

export function AboutReviewSchema(): React.JSX.Element {
  return (
    <PferdeWertReviewSchema 
      pageType="about" 
      includeTestimonials={true}
    />
  );
}