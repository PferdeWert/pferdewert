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

// CRITICAL FIX: Move testimonials OUTSIDE component to prevent infinite Fast Refresh loop
// Each render creating a new array object was causing Fast Refresh to think props changed
const TESTIMONIALS_DATA = [
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
];

// CRITICAL FIX: Define item schemas OUTSIDE component to prevent object recreation on each render
const ITEM_SCHEMAS = {
  service: {
    name: 'KI-basierte Pferdebewertung',
    type: 'Service' as const,
    url: 'https://pferdewert.de/pferde-preis-berechnen',
    description: 'Professionelle Bewertung des Marktwerts von Pferden mittels künstlicher Intelligenz in nur 2 Minuten',
    image: 'https://pferdewert.de/images/shared/blossi-shooting.webp'
  },
  about: {
    name: 'PferdeWert - Pferdebewertung Service',
    type: 'Organization' as const,
    url: 'https://pferdewert.de',
    description: 'Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung',
    image: 'https://pferdewert.de/images/shared/blossi-shooting.webp'
  },
  homepage: {
    name: 'PferdeWert',
    type: 'LocalBusiness' as const,
    url: 'https://pferdewert.de',
    description: 'Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung. Entwickelt von Reitern für Reiter.',
    image: 'https://pferdewert.de/images/shared/blossi-shooting.webp'
  }
};

// CRITICAL FIX: Organization data OUTSIDE component
const ORGANIZATION_DATA = {
  name: 'PferdeWert',
  url: 'https://pferdewert.de',
  logo: 'https://pferdewert.de/images/logo.webp',
  sameAs: [] as string[]
};

// CRITICAL FIX: Pre-compute reviews from testimonials at module level
const REVIEWS_DATA = TESTIMONIALS_DATA.map(createReviewFromTestimonial);
const AGGREGATE_RATING_DATA = calculateAggregateRating(REVIEWS_DATA);

export default function PferdeWertReviewSchema({
  pageType = 'homepage',
  serviceUrl,
  includeTestimonials = true
}: PferdeWertReviewSchemaProps): React.JSX.Element {

  // Use pre-computed data - no array creation in render!
  const reviews = includeTestimonials ? REVIEWS_DATA : [];
  const aggregateRating = includeTestimonials ? AGGREGATE_RATING_DATA : undefined;

  // Get item reviewed - use static schema directly
  const itemReviewed = ITEM_SCHEMAS[pageType as keyof typeof ITEM_SCHEMAS];

  // Only override URL if needed and different - minimizes object creation
  const finalItemReviewed = (pageType === 'service' && serviceUrl && serviceUrl !== itemReviewed.url)
    ? { ...itemReviewed, url: serviceUrl }
    : itemReviewed;

  return (
    <ReviewSchema
      itemReviewed={finalItemReviewed}
      aggregateRating={aggregateRating}
      reviews={reviews}
      organization={ORGANIZATION_DATA}
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