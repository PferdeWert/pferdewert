/**
 * FeatureCompare Component - Detailed Feature Comparison Table
 * 
 * Features:
 * - Side-by-side comparison of all 3 pricing tiers
 * - Visual checkmarks and highlights for included features
 * - Mobile-optimized responsive design
 * - Clear differentiation between tier capabilities
 * - Professional trust-building design
 * 
 * @author PferdeWert.de
 * @version 1.0.0 - Initial Implementation
 */

import React from 'react';
import { PRICING_TIERS, type TierConfig, type PricingTier, formatTierPrice, getTierSavings } from '@/lib/pricing';

interface FeatureCompareProps {
  selectedTier: PricingTier;
  onTierSelect: (config: TierConfig) => void;
  className?: string;
}

// Detailed feature comparison data
const COMPARISON_FEATURES = [
  {
    category: 'Analyse-Umfang',
    features: [
      { 
        name: 'Sofortige Preisspanne', 
        basic: true, 
        standard: true, 
        premium: true,
        description: 'Schnelle Marktpreis-Einschätzung'
      },
      { 
        name: 'Detaillierte AI-Analyse', 
        basic: false, 
        standard: true, 
        premium: true,
        description: 'Umfassende KI-gestützte Bewertung'
      },
      { 
        name: 'AI-Vision Foto-Analyse', 
        basic: false, 
        standard: false, 
        premium: true,
        description: 'Revolutionäre Foto-basierte KI-Bewertung'
      },
      { 
        name: 'Exterieur-Bewertung', 
        basic: false, 
        standard: false, 
        premium: true,
        description: 'Detaillierte Körperbau-Analyse'
      },
      { 
        name: 'Gesundheits-Assessment', 
        basic: false, 
        standard: false, 
        premium: true,
        description: 'Gesundheitsprüfung via Foto-AI'
      }
    ]
  },
  {
    category: 'Report & Dokumentation',
    features: [
      { 
        name: 'PDF-Report', 
        basic: '3-5 Seiten', 
        standard: '15+ Seiten', 
        premium: '25+ Seiten',
        description: 'Umfang des Bewertungsreports'
      },
      { 
        name: 'Bewertungszertifikat', 
        basic: false, 
        standard: true, 
        premium: true,
        description: 'Offizielles Bewertungszertifikat'
      },
      { 
        name: 'Marktvergleich', 
        basic: 'Basis', 
        standard: 'Umfassend', 
        premium: 'Premium',
        description: 'Vergleich mit ähnlichen Pferden'
      },
      { 
        name: 'Verkaufsempfehlungen', 
        basic: false, 
        standard: true, 
        premium: true,
        description: 'Optimale Verkaufsstrategie'
      }
    ]
  },
  {
    category: 'Support & Service',
    features: [
      { 
        name: 'Email-Support', 
        basic: 'Standard', 
        standard: 'Priority', 
        premium: 'Premium',
        description: 'Support-Level und Reaktionszeit'
      },
      { 
        name: 'Telefon-Beratung', 
        basic: false, 
        standard: false, 
        premium: '15 Min',
        description: 'Persönliche Beratung am Telefon'
      },
      { 
        name: 'Persönlicher Ansprechpartner', 
        basic: false, 
        standard: false, 
        premium: true,
        description: 'Dedicated Account Manager'
      }
    ]
  },
  {
    category: 'Lieferzeit & Garantie',
    features: [
      { 
        name: 'Bearbeitungszeit', 
        basic: '< 1 Minute', 
        standard: '2-3 Minuten', 
        premium: '5-10 Minuten',
        description: 'Zeit bis zur Fertigstellung'
      },
      { 
        name: 'Geld-zurück-Garantie', 
        basic: true, 
        standard: true, 
        premium: true,
        description: '30 Tage Geld-zurück-Garantie'
      }
    ]
  }
];

export default function FeatureCompare({ 
  selectedTier, 
  onTierSelect, 
  className = '' 
}: FeatureCompareProps) {
  
  const tiers = Object.values(PRICING_TIERS);

  const renderFeatureValue = (feature: { [key: string]: boolean | string | number }, tierKey: 'basic' | 'standard' | 'premium') => {
    const value = feature[tierKey];
    
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex justify-center">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      ) : (
        <div className="flex justify-center">
          <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      );
    }
    
    return (
      <div className="text-center">
        <span className={`text-sm font-medium ${tierKey === 'premium' ? 'text-purple-700' : tierKey === 'standard' ? 'text-blue-700' : 'text-gray-700'}`}>
          {value}
        </span>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Detaillierter Feature-Vergleich
        </h3>
        <p className="text-gray-600">
          Alle Funktionen im Überblick - finde das perfekte Paket für deine Bedürfnisse
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <thead>
            <tr>
              <th className="bg-gray-50 p-6 text-left font-semibold text-gray-900 w-1/4">
                Features
              </th>
              {tiers.map((tier) => {
                const savings = getTierSavings(tier.id);
                return (
                  <th 
                    key={tier.id} 
                    className={`p-6 text-center relative ${
                      tier.id === 'standard' 
                        ? 'bg-gradient-to-b from-blue-50 to-purple-50' 
                        : 'bg-gray-50'
                    }`}
                  >
                    {/* Popular Badge */}
                    {tier.badge && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⭐ {tier.badge}
                        </span>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {tier.displayName}
                      </h4>
                      
                      {/* Price Display */}
                      <div className="mb-3">
                        {tier.originalPrice && (
                          <div className="flex items-center justify-center space-x-2 mb-1">
                            <span className="text-gray-400 line-through text-sm">
                              {tier.originalPrice.toFixed(2).replace('.', ',')}€
                            </span>
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">
                              -{savings} sparen
                            </span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900">
                          {formatTierPrice(tier.id)}
                        </div>
                        <div className="text-gray-500 text-sm">einmalig</div>
                      </div>
                      
                      {/* CTA Button */}
                      <button
                        onClick={() => onTierSelect(tier)}
                        className={`
                          w-full px-4 py-2 rounded-xl font-semibold text-sm
                          transition-all duration-200 focus:outline-none focus:ring-4
                          ${tier.id === 'standard'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-purple-300'
                            : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white focus:ring-gray-300'
                          }
                        `}
                      >
                        {tier.ctaText}
                      </button>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {COMPARISON_FEATURES.map((category, categoryIndex) => (
              <React.Fragment key={category.category}>
                {/* Category Header */}
                <tr>
                  <td 
                    colSpan={4} 
                    className="bg-gray-100 px-6 py-4 font-bold text-gray-900 border-t-2 border-gray-200"
                  >
                    {category.category}
                  </td>
                </tr>
                
                {/* Category Features */}
                {category.features.map((feature, featureIndex) => (
                  <tr 
                    key={`${categoryIndex}-${featureIndex}`}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-6">
                      <div>
                        <div className="font-medium text-gray-900 mb-1">
                          {feature.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {feature.description}
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      {renderFeatureValue(feature, 'basic')}
                    </td>
                    <td className={`p-6 text-center ${
                      selectedTier === 'standard' ? 'bg-blue-50' : ''
                    }`}>
                      {renderFeatureValue(feature, 'standard')}
                    </td>
                    <td className="p-6 text-center">
                      {renderFeatureValue(feature, 'premium')}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-8">
        {tiers.map((tier) => (
          <div 
            key={tier.id}
            className={`
              bg-white rounded-2xl shadow-lg p-6 relative
              ${tier.id === 'standard' ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {/* Mobile Header */}
            <div className="text-center mb-6">
              {tier.badge && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                  ⭐ {tier.badge}
                </span>
              )}
              
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {tier.displayName}
              </h4>
              
              <div className="text-2xl font-bold text-gray-900">
                {formatTierPrice(tier.id)}
              </div>
              
              <button
                onClick={() => onTierSelect(tier)}
                className={`
                  w-full mt-4 px-6 py-3 rounded-xl font-semibold
                  transition-all duration-200
                  ${tier.id === 'standard'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white'
                  }
                `}
              >
                {tier.ctaText}
              </button>
            </div>

            {/* Mobile Features */}
            <div className="space-y-4">
              {COMPARISON_FEATURES.map((category) => (
                <div key={category.category}>
                  <h5 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">
                    {category.category}
                  </h5>
                  <div className="space-y-2">
                    {category.features.map((feature, idx) => {
                      const value = feature[tier.id as keyof typeof feature];
                      return (
                        <div key={idx} className="flex items-center justify-between py-1">
                          <span className="text-sm text-gray-700">
                            {feature.name}
                          </span>
                          <div className="text-sm">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )
                            ) : (
                              <span className="font-medium text-gray-900">
                                {value}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-8 p-6 bg-gray-50 rounded-2xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Noch unsicher?
        </h4>
        <p className="text-gray-600 mb-4">
          Alle Pakete kommen mit unserer 30 Tage Geld-zurück-Garantie
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Geld-zurück-Garantie</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Sichere Zahlung</span>
          </div>
        </div>
      </div>
    </div>
  );
}