// components/TierSelectionModal.tsx
// Modal for tier selection after form completion in the alternative flow

import { useState, useEffect } from 'react';
import { X, Check, Star, Zap, Crown } from 'lucide-react';
import { PRICING_TIERS, formatPrice, type PricingTier } from '@/lib/pricing';
import { info } from '@/lib/log';

interface TierSelectionModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Function to call when modal should close */
  onClose: () => void;
  /** Function to call when a tier is selected */
  onTierSelect: (tier: PricingTier) => void;
  /** Form data for tier recommendation logic */
  formData?: Record<string, unknown>;
  /** Loading state during selection */
  loading?: boolean;
}

interface TierFeature {
  text: string;
  included: boolean;
}

interface TierInfo {
  tier: PricingTier;
  displayName: string;
  price: number;
  recommended?: boolean;
  popular?: boolean;
  icon: React.ElementType;
  tagline: string;
  features: TierFeature[];
  badge?: string;
}

export default function TierSelectionModal({
  open,
  onClose,
  onTierSelect,
  formData,
  loading = false
}: TierSelectionModalProps) {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  // Tier recommendation logic based on form data
  const getRecommendedTier = (): PricingTier => {
    if (!formData) return 'pro'; // Default to Pro

    // Basic business logic for tier recommendation
    const age = formData.alter ? parseInt(String(formData.alter)) : 0;
    const discipline = String(formData.haupteignung || '').toLowerCase();
    const training = String(formData.ausbildungsstand || '').toLowerCase();
    const price = formData.kaufpreis ? parseInt(String(formData.kaufpreis)) : 0;

    // Premium recommendations
    if (price > 20000 || 
        discipline.includes('dressur') || 
        discipline.includes('springen') ||
        training.includes('l-niveau') ||
        training.includes('m-niveau') ||
        training.includes('s-niveau')) {
      return 'premium';
    }

    // Basic recommendations  
    if (price < 5000 || age > 20 || training.includes('angeritten')) {
      return 'basic';
    }

    // Default to Pro for most cases
    return 'pro';
  };

  const recommendedTier = getRecommendedTier();

  // Tier configuration with features
  const tiers: TierInfo[] = [
    {
      tier: 'basic',
      displayName: PRICING_TIERS.basic.displayName,
      price: PRICING_TIERS.basic.price,
      icon: Zap,
      tagline: 'Schnelle Preisschätzung',
      features: [
        { text: 'KI-basierte Preisspanne', included: true },
        { text: 'Grundlegende Marktanalyse', included: true },
        { text: 'Sofortiges Ergebnis', included: true },
        { text: 'Detaillierte AI-Analyse', included: false },
        { text: 'PDF-Report zum Download', included: false },
        { text: 'Exterieur-Bewertung mit Fotos', included: false }
      ]
    },
    {
      tier: 'pro',
      displayName: PRICING_TIERS.pro.displayName,
      price: PRICING_TIERS.pro.price,
      recommended: recommendedTier === 'pro',
      popular: true,
      icon: Star,
      tagline: 'Vollständige Analyse',
      badge: 'Beliebt',
      features: [
        { text: 'KI-basierte Preisspanne', included: true },
        { text: 'Grundlegende Marktanalyse', included: true },
        { text: 'Sofortiges Ergebnis', included: true },
        { text: 'Detaillierte AI-Analyse', included: true },
        { text: 'PDF-Report zum Download', included: true },
        { text: 'Exterieur-Bewertung mit Fotos', included: false }
      ]
    },
    {
      tier: 'premium',
      displayName: PRICING_TIERS.premium.displayName,
      price: PRICING_TIERS.premium.price,
      recommended: recommendedTier === 'premium',
      icon: Crown,
      tagline: 'Komplette Profi-Bewertung',
      badge: recommendedTier === 'premium' ? 'Empfohlen' : undefined,
      features: [
        { text: 'KI-basierte Preisspanne', included: true },
        { text: 'Grundlegende Marktanalyse', included: true },
        { text: 'Sofortiges Ergebnis', included: true },
        { text: 'Detaillierte AI-Analyse', included: true },
        { text: 'PDF-Report zum Download', included: true },
        { text: 'Exterieur-Bewertung mit Fotos', included: true }
      ]
    }
  ];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, loading, onClose]);

  const handleTierSelect = (tier: PricingTier) => {
    if (loading) return;
    
    setSelectedTier(tier);
    info(`Tier selected in modal: ${tier}`);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tier_selected_modal', {
        event_category: 'Conversion Funnel',
        event_label: `Tier Selected: ${tier}`,
        tier_name: tier,
        tier_price: PRICING_TIERS[tier].price,
        recommended_tier: recommendedTier,
        is_recommended: tier === recommendedTier
      });
    }

    // Small delay for visual feedback then proceed
    setTimeout(() => {
      onTierSelect(tier);
    }, 150);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tier-selection-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="tier-selection-title" className="text-2xl font-bold text-gray-900">
                Wähle dein Bewertungspaket
              </h2>
              <p className="text-gray-600 mt-1">
                Deine Analyse ist bereit - wähle das passende Paket für deine Bedürfnisse
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              aria-label="Modal schließen"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tier Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tierInfo) => {
              const IconComponent = tierInfo.icon;
              const isSelected = selectedTier === tierInfo.tier;
              const isRecommended = tierInfo.recommended;
              
              return (
                <div
                  key={tierInfo.tier}
                  className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected
                      ? 'border-brand-brown shadow-lg scale-105'
                      : isRecommended
                      ? 'border-blue-300 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${loading ? 'pointer-events-none opacity-50' : ''}`}
                  onClick={() => handleTierSelect(tierInfo.tier)}
                >
                  {/* Badge */}
                  {tierInfo.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isRecommended
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tierInfo.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-full mb-3 ${
                      isSelected
                        ? 'bg-brand-brown text-white'
                        : isRecommended
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {tierInfo.displayName}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {tierInfo.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(tierInfo.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      einmalig
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tierInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.included
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                      isSelected
                        ? 'bg-brand-brown text-white shadow-md'
                        : isRecommended
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={loading}
                  >
                    {isSelected
                      ? 'Ausgewählt'
                      : isRecommended
                      ? 'Empfohlen - Auswählen'
                      : 'Auswählen'
                    }
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Info */}
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="text-center text-sm text-amber-800">
              <strong>💡 Tipp:</strong> Du kannst nach dem Kauf jederzeit auf ein höheres Paket upgraden.
              {recommendedTier && (
                <>
                  <br />
                  <span className="font-semibold">
                    Basierend auf deinen Eingaben empfehlen wir: {PRICING_TIERS[recommendedTier].displayName}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-3xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-brand-brown border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">
                  Wird vorbereitet...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
