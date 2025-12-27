// components/PferdeWertReviewSchema.tsx
import React from 'react';
import ReviewSchema, { createReviewFromTestimonial, calculateAggregateRating } from './ReviewSchema';
import { useCountryConfig } from '@/hooks/useCountryConfig';

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

// Factory function to create item schemas based on country
const getItemSchemas = (domain: string, leadingPlatformText: string) => ({
  service: {
    name: 'PferdeWert',
    type: 'Organization' as const,
    url: `https://${domain}`,
    description: leadingPlatformText,
    image: `https://${domain}/images/shared/blossi-shooting.webp`
  },
  about: {
    name: 'PferdeWert',
    type: 'Organization' as const,
    url: `https://${domain}`,
    description: leadingPlatformText,
    image: `https://${domain}/images/shared/blossi-shooting.webp`
  },
  homepage: {
    name: 'PferdeWert',
    type: 'Organization' as const,
    url: `https://${domain}`,
    description: `${leadingPlatformText} Entwickelt von Reitern für Reiter.`,
    image: `https://${domain}/images/shared/blossi-shooting.webp`
  }
});

// Factory function for organization data based on country
const getOrganizationData = (domain: string) => ({
  name: 'PferdeWert',
  url: `https://${domain}`,
  logo: `https://${domain}/images/logo.webp`,
  sameAs: [] as string[]
});

// CRITICAL FIX: Pre-compute reviews from testimonials at module level
const REVIEWS_DATA = TESTIMONIALS_DATA.map(createReviewFromTestimonial);
const AGGREGATE_RATING_DATA = calculateAggregateRating(REVIEWS_DATA);

export default function PferdeWertReviewSchema({
  pageType = 'homepage',
  serviceUrl,
  includeTestimonials = true
}: PferdeWertReviewSchemaProps): React.JSX.Element {
  const { isAustria, isSwitzerland, domain } = useCountryConfig();

  // Localized leading platform text
  const leadingPlatformText = isAustria
    ? 'Österreichs führende Plattform für professionelle KI-basierte Pferdebewertung'
    : isSwitzerland
      ? 'Die Schweizer Plattform für professionelle KI-basierte Pferdebewertung'
      : 'Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung';

  // Use pre-computed data - no array creation in render!
  const reviews = includeTestimonials ? REVIEWS_DATA : [];
  const aggregateRating = includeTestimonials ? AGGREGATE_RATING_DATA : undefined;

  // Get localized item schemas and organization data
  const itemSchemas = getItemSchemas(domain, leadingPlatformText);
  const organizationData = getOrganizationData(domain);

  // Get item reviewed - use localized schema
  const itemReviewed = itemSchemas[pageType as keyof typeof itemSchemas];

  // Only override URL if needed and different - minimizes object creation
  const finalItemReviewed = (pageType === 'service' && serviceUrl && serviceUrl !== itemReviewed.url)
    ? { ...itemReviewed, url: serviceUrl }
    : itemReviewed;

  return (
    <ReviewSchema
      itemReviewed={finalItemReviewed}
      aggregateRating={aggregateRating}
      reviews={reviews}
      organization={organizationData}
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