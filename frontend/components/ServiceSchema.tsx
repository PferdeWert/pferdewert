// components/ServiceSchema.tsx
import React from 'react';
import { info } from '@/lib/log';

interface ServiceArea {
  type: 'Country' | 'State' | 'City' | 'AdministrativeArea';
  name: string;
  containedInPlace?: ServiceArea;
}

interface ServiceOfferData {
  name: string;
  description: string;
  url?: string;
  price?: string;
  priceRange?: string;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'OnlineOnly' | 'InStoreOnly';
  validFrom?: string;
  validThrough?: string;
  category?: string;
}

interface ServiceProviderData {
  type: 'Organization' | 'LocalBusiness' | 'ProfessionalService';
  name: string;
  url: string;
  description?: string;
  logo?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  numberOfEmployees?: string;
  slogan?: string;
}

interface ServiceSchemaProps {
  // Main service information
  serviceName: string;
  serviceDescription: string;
  serviceUrl?: string;
  serviceType?: 'Service' | 'ProfessionalService' | 'FinancialService';

  // Service provider/organization
  provider: ServiceProviderData;

  // Service areas (geographical coverage)
  areaServed?: ServiceArea[];

  // Service offers (pricing, packages, etc.)
  offers?: ServiceOfferData[];

  // Service categories and keywords
  serviceCategory?: string[];
  keywords?: string[];

  // Service delivery modes
  serviceOutput?: string;
  serviceAudience?: {
    audienceType: string;
    name?: string;
    description?: string;
  }[];

  // Operational details
  hoursAvailable?: {
    dayOfWeek: string[];
    opens?: string;
    closes?: string;
  }[];

  // Quality indicators
  hasQualityMeasure?: {
    name: string;
    value: string;
    description?: string;
  }[];

  // Additional context
  additionalType?: string;
  potentialAction?: {
    type: 'AssessAction' | 'BuyAction' | 'OrderAction';
    name: string;
    url: string;
    expectedDuration?: string;
  }[];
}

export default function ServiceSchema({
  serviceName,
  serviceDescription,
  serviceUrl,
  serviceType = 'ProfessionalService',
  provider,
  areaServed = [],
  offers = [],
  serviceCategory = [],
  keywords = [],
  serviceOutput,
  serviceAudience = [],
  hoursAvailable = [],
  hasQualityMeasure = [],
  additionalType,
  potentialAction = []
}: ServiceSchemaProps): React.JSX.Element {

  // Main Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': serviceType,
    'name': serviceName,
    'description': serviceDescription,
    'url': serviceUrl || provider.url,
    'provider': {
      '@type': provider.type,
      'name': provider.name,
      'url': provider.url,
      'description': provider.description,
      'logo': provider.logo,
      'image': provider.image,
      'telephone': provider.telephone,
      'email': provider.email,
      'address': provider.address ? {
        '@type': 'PostalAddress',
        'streetAddress': provider.address.streetAddress,
        'addressLocality': provider.address.addressLocality,
        'addressRegion': provider.address.addressRegion,
        'postalCode': provider.address.postalCode,
        'addressCountry': provider.address.addressCountry
      } : undefined,
      'sameAs': provider.sameAs,
      'foundingDate': provider.foundingDate,
      'numberOfEmployees': provider.numberOfEmployees,
      'slogan': provider.slogan
    },
    'areaServed': areaServed.length > 0 ? areaServed.map(area => ({
      '@type': area.type,
      'name': area.name,
      'containedInPlace': area.containedInPlace ? {
        '@type': area.containedInPlace.type,
        'name': area.containedInPlace.name
      } : undefined
    })) : undefined,
    'serviceType': serviceCategory.length > 0 ? serviceCategory[0] : undefined,
    'category': serviceCategory,
    'keywords': keywords.length > 0 ? keywords.join(', ') : undefined,
    'serviceOutput': serviceOutput,
    'audience': serviceAudience.length > 0 ? serviceAudience.map(audience => ({
      '@type': 'Audience',
      'audienceType': audience.audienceType,
      'name': audience.name,
      'description': audience.description
    })) : undefined,
    'hoursAvailable': hoursAvailable.length > 0 ? hoursAvailable.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': hours.dayOfWeek,
      'opens': hours.opens,
      'closes': hours.closes
    })) : undefined,
    'hasOfferCatalog': offers.length > 0 ? {
      '@type': 'OfferCatalog',
      'name': `${serviceName} Angebote`,
      'itemListElement': offers.map((offer) => ({
        '@type': 'Offer',
        'name': offer.name,
        'description': offer.description,
        'url': offer.url,
        'price': offer.price,
        'priceRange': offer.priceRange,
        'priceCurrency': offer.priceCurrency || 'EUR',
        'availability': `https://schema.org/${offer.availability || 'InStock'}`,
        'validFrom': offer.validFrom,
        'validThrough': offer.validThrough,
        'category': offer.category,
        'itemOffered': {
          '@type': 'Service',
          'name': offer.name,
          'description': offer.description
        }
      }))
    } : undefined,
    'hasQualityMeasure': hasQualityMeasure.length > 0 ? hasQualityMeasure.map(measure => ({
      '@type': 'QualitativeValue',
      'name': measure.name,
      'value': measure.value,
      'description': measure.description
    })) : undefined,
    'additionalType': additionalType,
    'potentialAction': potentialAction.length > 0 ? potentialAction.map(action => ({
      '@type': action.type,
      'name': action.name,
      'target': action.url,
      'expectedDuration': action.expectedDuration
    })) : undefined
  };

  // Clean up undefined values
  const cleanSchema = JSON.parse(JSON.stringify(serviceSchema, (key, value) => {
    return value === undefined ? undefined : value;
  }));

  // Log schema generation for debugging
  info('Service Schema generated:', {
    serviceName,
    provider: provider.name,
    offersCount: offers.length,
    serviceAreas: areaServed.length
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cleanSchema, null, 2)
        }}
      />
    </>
  );
}

// Helper function to create area served data
export function createServiceArea(
  name: string,
  type: 'Country' | 'State' | 'City' | 'AdministrativeArea' = 'Country',
  containedInPlace?: ServiceArea
): ServiceArea {
  return {
    type,
    name,
    containedInPlace
  };
}

// Helper function to create service offers
export function createServiceOffer(
  name: string,
  description: string,
  price?: string,
  options: {
    url?: string;
    priceRange?: string;
    priceCurrency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'OnlineOnly' | 'InStoreOnly';
    validFrom?: string;
    validThrough?: string;
    category?: string;
  } = {}
): ServiceOfferData {
  return {
    name,
    description,
    price,
    ...options
  };
}

// Helper function to create service audience
export function createServiceAudience(
  audienceType: string,
  name?: string,
  description?: string
): NonNullable<ServiceSchemaProps['serviceAudience']>[0] {
  return {
    audienceType,
    name,
    description
  };
}

// Helper function to create opening hours
export function createOpeningHours(
  dayOfWeek: string[],
  opens?: string,
  closes?: string
): NonNullable<ServiceSchemaProps['hoursAvailable']>[0] {
  return {
    dayOfWeek,
    opens,
    closes
  };
}

// Helper function to create quality measures
export function createQualityMeasure(
  name: string,
  value: string,
  description?: string
): NonNullable<ServiceSchemaProps['hasQualityMeasure']>[0] {
  return {
    name,
    value,
    description
  };
}

// Helper function to create potential actions
export function createPotentialAction(
  type: 'AssessAction' | 'BuyAction' | 'OrderAction',
  name: string,
  url: string,
  expectedDuration?: string
): NonNullable<ServiceSchemaProps['potentialAction']>[0] {
  return {
    type,
    name,
    url,
    expectedDuration
  };
}