// components/PferdeWertServiceSchema.tsx
import React from 'react';
import ServiceSchema, {
  createServiceArea,
  createServiceOffer,
  createServiceAudience,
  createPotentialAction,
  createQualityMeasure
} from './ServiceSchema';
import { SCHEMA_PRICING, PRICING_FORMATTED } from '@/lib/pricing';

interface PferdeWertServiceSchemaProps {
  // Page context to customize the schema
  pageType?: 'homepage' | 'service' | 'calculator';

  // Service-specific details
  serviceUrl?: string;

  // Whether to include detailed offers
  includeOffers?: boolean;
}

export default function PferdeWertServiceSchema({
  pageType = 'service',
  serviceUrl,
  includeOffers = true
}: PferdeWertServiceSchemaProps): React.JSX.Element {

  // Service provider data for PferdeWert
  const provider = {
    type: 'Organization' as const,
    name: 'PferdeWert',
    url: 'https://pferdewert.de',
    description: 'Deutschlands führende Plattform für professionelle KI-basierte Pferdebewertung. Entwickelt von Reitern für Reiter.',
    logo: 'https://pferdewert.de/images/logo.webp',
    image: 'https://pferdewert.de/images/blossi-shooting.webp',
    email: 'info@pferdewert.de',
    address: {
      addressCountry: 'DE'
    },
    foundingDate: '2024-01-01',
    slogan: 'Entwickelt von Reitern für Reiter'
  };

  // Service areas - Germany-wide coverage
  const areaServed = [
    createServiceArea('Deutschland', 'Country'),
    createServiceArea('Baden-Württemberg', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Bayern', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Berlin', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Brandenburg', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Bremen', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Hamburg', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Hessen', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Mecklenburg-Vorpommern', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Niedersachsen', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Nordrhein-Westfalen', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Rheinland-Pfalz', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Saarland', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Sachsen', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Sachsen-Anhalt', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Schleswig-Holstein', 'State', createServiceArea('Deutschland', 'Country')),
    createServiceArea('Thüringen', 'State', createServiceArea('Deutschland', 'Country'))
  ];

  // Service offers
  const offers = includeOffers ? [
    createServiceOffer(
      'KI-basierte Pferdebewertung',
      'Professionelle Bewertung des Marktwerts Ihres Pferdes mittels künstlicher Intelligenz in nur 2 Minuten. Berücksichtigt Abstammung, Ausbildungsstand, Gesundheitsstatus und aktuelle Marktdaten.',
      SCHEMA_PRICING.price,
      {
        url: serviceUrl || 'https://pferdewert.de/pferde-preis-berechnen',
        priceCurrency: SCHEMA_PRICING.priceCurrency,
        availability: 'OnlineOnly',
        category: 'Pferdebewertung'
      }
    ),
    createServiceOffer(
      'Sofortige Marktwertanalyse',
      'Erhalten Sie innerhalb von 2 Minuten eine detaillierte Analyse des Marktwerts Ihres Pferdes basierend auf über 1000 Marktdaten und KI-Algorithmen.',
      SCHEMA_PRICING.price,
      {
        url: serviceUrl || 'https://pferdewert.de/pferde-preis-berechnen',
        priceCurrency: SCHEMA_PRICING.priceCurrency,
        availability: 'OnlineOnly',
        category: 'Marktanalyse'
      }
    )
  ] : [];

  // Service categories and keywords
  const serviceCategory = [
    'Pferdebewertung',
    'Marktwertanalyse',
    'KI-basierte Bewertung',
    'Pferdehandel',
    'Equine Valuation'
  ];

  const keywords = [
    'Pferd bewerten',
    'Pferdewert berechnen',
    'Marktwert Pferd',
    'Pferdebewertung online',
    'Was ist mein Pferd wert',
    'Pferdepreis berechnen',
    'Pferdebewertung Deutschland',
    'KI Pferdebewertung',
    'Pferdewert Gutachten',
    'Pferdemarkt Deutschland'
  ];

  // Target audience
  const serviceAudience = [
    createServiceAudience('Pferdebesitzer', 'Pferdebesitzer', 'Besitzer von Pferden, die den aktuellen Marktwert ihres Pferdes berechnen möchten'),
    createServiceAudience('Pferdekäufer', 'Pferdekäufer', 'Personen, die ein Pferd kaufen möchten und eine objektive Werteinschätzung benötigen'),
    createServiceAudience('Pferdeverkäufer', 'Pferdeverkäufer', 'Personen, die ihr Pferd verkaufen möchten und den optimalen Verkaufspreis berechnen wollen'),
    createServiceAudience('Reitställe', 'Reitställe', 'Reitställe und Pferdehöfe, die ihre Bestände bewerten lassen möchten'),
    createServiceAudience('Pferdehändler', 'Pferdehändler', 'Professionelle Pferdehändler, die eine schnelle und zuverlässige Bewertung benötigen')
  ];

  // Quality measures
  const hasQualityMeasure = [
    createQualityMeasure(
      'KI-Genauigkeit',
      '95%',
      'Unsere KI-Algorithmen erreichen eine Bewertungsgenauigkeit von 95% basierend auf Marktdatenanalysen'
    ),
    createQualityMeasure(
      'Bewertungsgeschwindigkeit',
      '2 Minuten',
      'Erhalten Sie Ihr Bewertungsergebnis in weniger als 2 Minuten'
    ),
    createQualityMeasure(
      'Marktdatenbasis',
      '1000+ Datenpunkte',
      'Unsere Bewertung basiert auf über 1000 aktuellen Marktdaten aus ganz Deutschland'
    ),
    createQualityMeasure(
      'Kundenzufriedenheit',
      '5/5 Sterne',
      'Durchschnittliche Bewertung von 5/5 Sternen basierend auf Kundenfeedback'
    )
  ];

  // Potential actions
  const potentialAction = [
    createPotentialAction(
      'AssessAction',
      'Pferdebewertung starten',
      serviceUrl || 'https://pferdewert.de/pferde-preis-berechnen',
      'PT2M'
    ),
    createPotentialAction(
      'BuyAction',
      'Bewertung kaufen',
      serviceUrl || 'https://pferdewert.de/pferde-preis-berechnen',
      'PT2M'
    )
  ];

  // Service name and description based on page type
  const getServiceDetails = () => {
    switch (pageType) {
      case 'calculator':
        return {
          name: 'Pferdewert Rechner - KI-basierte Bewertung',
          description: `Berechnen Sie den Marktwert Ihres Pferdes in nur 2 Minuten mit unserem KI-basierten Pferdewert Rechner. Professionelle Bewertung für nur ${PRICING_FORMATTED.current}.`
        };

      case 'homepage':
        return {
          name: 'PferdeWert - Professionelle Pferdebewertung',
          description: 'Deutschlands führende Plattform für KI-basierte Pferdebewertung. Ermitteln Sie den Marktwert Ihres Pferdes schnell, präzise und kostengünstig.'
        };

      default: // service
        return {
          name: 'KI-basierte Pferdebewertung',
          description: `Professionelle Bewertung des Marktwerts von Pferden mittels künstlicher Intelligenz. Schnell, präzise und basierend auf aktuellen Marktdaten für nur ${PRICING_FORMATTED.current}.`
        };
    }
  };

  const serviceDetails = getServiceDetails();

  return (
    <ServiceSchema
      serviceName={serviceDetails.name}
      serviceDescription={serviceDetails.description}
      serviceUrl={serviceUrl || 'https://pferdewert.de/pferde-preis-berechnen'}
      serviceType="ProfessionalService"
      provider={provider}
      areaServed={areaServed}
      offers={offers}
      serviceCategory={serviceCategory}
      keywords={keywords}
      serviceOutput="Detaillierte Pferdebewertung mit Marktwertanalyse"
      serviceAudience={serviceAudience}
      hasQualityMeasure={hasQualityMeasure}
      additionalType="https://schema.org/FinancialService"
      potentialAction={potentialAction}
    />
  );
}

// Export for use in specific contexts
export function ServicePageSchema(): React.JSX.Element {
  return (
    <PferdeWertServiceSchema
      pageType="service"
      serviceUrl="https://pferdewert.de/pferde-preis-berechnen"
      includeOffers={true}
    />
  );
}

export function CalculatorPageSchema(): React.JSX.Element {
  return (
    <PferdeWertServiceSchema
      pageType="calculator"
      serviceUrl="https://pferdewert.de/pferde-preis-berechnen"
      includeOffers={true}
    />
  );
}

export function HomepageServiceSchema(): React.JSX.Element {
  return (
    <PferdeWertServiceSchema
      pageType="homepage"
      serviceUrl="https://pferdewert.de/pferde-preis-berechnen"
      includeOffers={false}
    />
  );
}