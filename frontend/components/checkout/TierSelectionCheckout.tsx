/**
 * Tier Selection Checkout Component
 * 
 * Full-width tier selection interface for pre-checkout stage.
 * Allows customers to change their tier selection before proceeding to Stripe.
 * 
 * @author PferdeWert.de UI/UX Designer Agent
 * @version 1.0.0 - Initial Implementation
 */

import { useState, useEffect } from 'react';
import { TIER_PRICES, PRICING_TIERS, formatPrice, type PricingTier } from '@/lib/pricing';
import { savePricingTier, getPricingTier } from '@/lib/pricing-session';
import { info } from '@/lib/log';

interface TierSelectionCheckoutProps {
  initialTier?: PricingTier;
  onProceedToPayment: (selectedTier: PricingTier, price: number) => void;
  isLoading?: boolean;
}

interface TierBoxProps {
  tier: PricingTier;
  isSelected: boolean;
  onSelect: (tier: PricingTier) => void;
}

const TierBox = ({ tier, isSelected, onSelect }: TierBoxProps) => {
  const config = PRICING_TIERS[tier];
  
  return (
    <div
      onClick={() => onSelect(tier)}
      className={`
        relative flex flex-col items-center justify-center
        p-4 rounded-xl border-2 cursor-pointer min-h-[90px]
        transition-all duration-200 ease-in-out
        hover:scale-[1.02] active:scale-[0.98]
        ${isSelected 
          ? 'border-brand-brown bg-brand-brown/10 shadow-md ring-2 ring-brand-brown/20' 
          : 'border-gray-200 hover:border-brand-brown/50 hover:bg-gray-50'
        }
      `}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(tier);
        }
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-brown rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      {/* Tier name */}
      <div className={`text-sm font-medium mb-1 ${isSelected ? 'text-brand-brown' : 'text-gray-700'}`}>
        {config.displayName}
      </div>
      
      {/* Price */}
      <div className={`text-lg font-bold ${isSelected ? 'text-brand-brown' : 'text-gray-900'}`}>
        {config.formatted}
      </div>
      
      {/* Subtle example link - only for Premium tier */}
      {tier === 'premium' && (
        <div className="text-xs text-gray-500 mt-1 hover:text-brand-brown transition-colors">
          Beispiel ansehen
        </div>
      )}
    </div>
  );
};

export default function TierSelectionCheckout({ 
  initialTier = 'pro', 
  onProceedToPayment,
  isLoading = false
}: TierSelectionCheckoutProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTier);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(TIER_PRICES[initialTier]);

  // Initialize from session storage on client-side
  useEffect(() => {
    const sessionTier = getPricingTier();
    if (sessionTier && sessionTier !== selectedTier) {
      setSelectedTier(sessionTier);
      setCurrentPrice(TIER_PRICES[sessionTier]);
    }
  }, [selectedTier]);

  const handleTierChange = (tier: PricingTier) => {
    const previousTier = selectedTier;
    
    setSelectedTier(tier);
    setCurrentPrice(TIER_PRICES[tier]);
    
    // Persist selection
    savePricingTier(tier);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tier_changed_at_checkout', {
        from_tier: previousTier,
        to_tier: tier,
        price: TIER_PRICES[tier],
        page_location: '/pferde-preis-berechnen'
      });
    }
    
    info('Tier changed at checkout', {
      from: previousTier,
      to: tier,
      price: TIER_PRICES[tier]
    });
  };

  const handleProceedToPayment = () => {
    if (!consentAccepted) return;
    
    info('Proceeding to payment', {
      selectedTier,
      price: currentPrice,
      consentAccepted
    });
    
    onProceedToPayment(selectedTier, currentPrice);
  };

  const tiers: PricingTier[] = ['basic', 'pro', 'premium'];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown/10 rounded-full mb-4">
          <span className="text-2xl">🐎</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Analyse starten
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nur noch ein Klick zu deiner professionellen Pferdebewertung
        </p>
      </div>

      {/* Tier Selection Boxes - Full Width */}
      <div className="mb-8">
        <div 
          className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto"
          role="radiogroup"
          aria-label="Bewertungs-Tarif auswählen"
        >
          {tiers.map((tier) => (
            <TierBox
              key={tier}
              tier={tier}
              isSelected={selectedTier === tier}
              onSelect={handleTierChange}
            />
          ))}
        </div>
        
        {/* Tier Selection Hint */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Du kannst deinen Tarif jederzeit ändern, bevor du zur Bezahlung gehst
        </p>
      </div>

      {/* Consent Checkbox - Blue Box Design */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </div>
          <div className="text-sm text-gray-700 leading-relaxed">
            Ich akzeptiere die{' '}
            <a 
              href="/agb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Allgemeinen Geschäftsbedingungen
            </a>
            {' '}und{' '}
            <a 
              href="/datenschutz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Datenschutzerklärung
            </a>
            . Ich stimme der Verarbeitung meiner Daten zur Pferdebewertung zu.
          </div>
        </label>
      </div>

      {/* Dynamic Pricing & Payment Button */}
      <div className="text-center space-y-4">
        {/* Dynamic Price Display */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <span className="text-lg text-gray-600">Gesamtbetrag:</span>
            <span className="text-3xl font-bold text-brand-brown">
              {formatPrice(currentPrice)}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {PRICING_TIERS[selectedTier].displayName}-Bewertung • Einmalige Zahlung • 30 Tage Geld-zurück-Garantie
          </p>
        </div>

        {/* Payment Button */}
        <button
          onClick={handleProceedToPayment}
          disabled={!consentAccepted || isLoading}
          className={`
            w-full max-w-md mx-auto px-8 py-4 rounded-2xl font-semibold text-lg
            transition-all duration-200 ease-in-out
            flex items-center justify-center space-x-2
            ${consentAccepted && !isLoading
              ? 'bg-brand-brown text-white hover:bg-brand-brown-dark shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Wird geladen...</span>
            </>
          ) : (
            <>
              <span>Jetzt bezahlen: {formatPrice(currentPrice)}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>

        {/* Trust Signals */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mt-6">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>SSL-verschlüsselt</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>30 Tage Garantie</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>⭐</span>
            <span>4.7/5 Sterne</span>
          </div>
        </div>
      </div>
    </div>
  );
}