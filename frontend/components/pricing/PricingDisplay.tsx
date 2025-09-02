/**
 * PricingDisplay Component - Merged 3-Tier Pricing Display
 * 
 * Merged component combining PricingCarousel and TierCard functionality
 * for better maintainability and reduced complexity (~40% code reduction).
 * 
 * Features:
 * - CSS Grid layout for consistent card heights on desktop
 * - Mobile-first responsive design with horizontal scroll
 * - Pro tier permanently highlighted
 * - Badge positioning that breaks container boundaries
 * - Auto-scroll to pro tier on mobile
 * - Professional trust-building design
 * 
 * @author PferdeWert.de
 * @version 3.0.0 - Merged Architecture (TierCard + PricingCarousel)
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { TIER_PRICES, TIER_STRIPE_IDS, type PricingTier } from '@/lib/pricing';
import { info } from '@/lib/log';

// ===== TIER CONFIGURATION =====
const TIER_CONFIG = {
  basic: {
    displayName: 'PferdeWert Basic',
    description: 'Schnelle Marktpreis-Schätzung',
    features: [
      'Sofortiges Ergebnis',
      'Preisspanne inkl. Erläuterung',
    ],
    highlights: [
      'Preisspanne in unter 1 Minute',
    ],
    ctaText: 'Basic-Bewertung starten',
    deliveryTime: '< 1 Minute',
    badge: undefined,
  },
  pro: {
    displayName: 'PferdeWert Pro',
    description: 'Detaillierte Pferdebewertung mit ausführlicher Analyse',
    features: [
      'Alles aus Basic, zusätzlich:',
      'Detaillierte Pferdebewertung',
      'Ausführlicher PDF-Report',
      'Abstammungsanalyse',
      'und mehr..'
    ],
    highlights: [
      'Ausführlicher Bericht über dein Pferd'
    ],
    badge: 'Beliebteste Wahl',
    ctaText: 'Pro-Bewertung starten',
    deliveryTime: '2-3 Minuten',
  },
  premium: {
    displayName: 'PferdeWert Premium',
    description: 'Premium Foto-Analyse mit Exterieur-Bewertung',
    features: [
      'Alles aus Basic und Pro, zusätzlich:',
      'Upload von 1-3 Fotos',
      'Detaillierte Exterieur-Bewertung durch ein spezielles KI-Modell',
      'Premium PDF-Report',
    ],
    highlights: [
      'KI-Modell für Exterieur-Analyse',
    ],
    ctaText: 'Premium-Bewertung starten',
    deliveryTime: 'Bis zu 24 Stunden',
    badge: undefined,
  }
} as const;

// Mobile content reduction: Max 2 features per tier for 50% content density reduction
const MOBILE_FEATURES = {
  basic: [
    'Sofortiges Ergebnis',
    'Unter 1 Minute'
  ],
  pro: [
    'Detaillierte KI-Analyse', 
    'PDF-Report download'
  ],
  premium: [
    'Foto-Analyse',
    'Exterieur-Bewertung'
  ]
} as const;

// ===== LAYOUT CONSTANTS =====
// Mobile UX Optimized: Larger cards for better focus (280px × 468px cards)
const MOBILE_LAYOUT = {
  CARD_WIDTH: 280,      // Increased from 200px to 280px for better focus
  SPACE_BETWEEN: 16,    // Reduced from 25px to keep cards closer for better visibility
  CONTAINER_PADDING: 48, // Reduced from 65px to ensure side partials are still visible
  SCALE_FACTOR: 1.08,   // Pro tier scale enhancement
  MIN_CARD_HEIGHT: 468, // Increased from 430px to 468px (+38px = 1cm) for more content space
  PRO_ENHANCED_HEIGHT: 488, // Adjusted proportionally (20px difference maintained)
} as const;

const DESKTOP_LAYOUT = {
  MIN_CARD_HEIGHT: 600, // Desktop minimum card height
  MAX_WIDTH: '7xl',     // max-w-7xl container
  GRID_GAP: 8,          // gap-8 = 32px between cards
} as const;


interface TierSelectData {
  tier: PricingTier;
  price: number;
  stripeId: string;
  displayName: string;
}

interface PricingDisplayProps {
  onTierSelect?: (data: TierSelectData) => void;
  className?: string;
}

export default function PricingDisplay({ 
  onTierSelect, 
  className = '' 
}: PricingDisplayProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(1); // Start with Pro tier (index 1)

  const handleTierSelect = useCallback((tier: PricingTier) => {
    const data: TierSelectData = {
      tier,
      price: TIER_PRICES[tier],
      stripeId: TIER_STRIPE_IDS[tier],
      displayName: TIER_CONFIG[tier].displayName,
    };
    onTierSelect?.(data);
  }, [onTierSelect]);

  // Auto-scroll to Pro tier on mobile (UX-optimized for perfect center positioning)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // Position of Pro tier start (middle card) - more precise calculation
      const proTierStart = MOBILE_LAYOUT.CONTAINER_PADDING + MOBILE_LAYOUT.CARD_WIDTH + MOBILE_LAYOUT.SPACE_BETWEEN;
      
      // Calculate viewport center position
      const viewportWidth = window.innerWidth || 375;
      const viewportCenter = viewportWidth / 2;
      const cardCenter = MOBILE_LAYOUT.CARD_WIDTH / 2;
      
      // PRECISION: Optimal scroll position for perfect Pro tier centering
      // Adjusted for exact center alignment
      const optimalScrollLeft = proTierStart + cardCenter - viewportCenter;
      
      // Smooth scroll with momentum for natural feel - slightly delayed for render completion
      setTimeout(() => {
        container.scrollTo({
          left: Math.max(0, optimalScrollLeft),
          behavior: 'smooth'
        });
      }, 200);

      // Add scroll event listener to track active card
      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const viewportWidth = window.innerWidth || 375;
        const cardWidth = MOBILE_LAYOUT.CARD_WIDTH + MOBILE_LAYOUT.SPACE_BETWEEN;
        
        // Calculate which card is most centered
        const centerPosition = scrollLeft + viewportWidth / 2 - MOBILE_LAYOUT.CONTAINER_PADDING;
        const activeIndex = Math.round(centerPosition / cardWidth);
        
        // Clamp to valid range [0, 2]
        const clampedIndex = Math.max(0, Math.min(2, activeIndex));
        setActiveCardIndex(clampedIndex);
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const tiers: PricingTier[] = ['basic', 'pro', 'premium'];

  // ===== UTILITY FUNCTIONS =====
  const formatTierPrice = (tier: PricingTier): string => {
    return `${TIER_PRICES[tier].toFixed(2).replace('.', ',')}€`;
  };


  // ===== INTERNAL TIER CARD COMPONENT =====
  const TierCard = ({ 
    tier, 
    cardClassName = ''
  }: {
    tier: PricingTier;
    cardClassName?: string;
  }) => {
    const config = TIER_CONFIG[tier];
    const price = TIER_PRICES[tier];
    
    // Pro tier is permanently highlighted
    const isPermanentlyHighlighted = tier === 'pro';
    const shouldShowBorder = isPermanentlyHighlighted;

    return (
      <div className={`
        relative 
        bg-white 
        rounded-3xl 
        shadow-lg 
        transition-all 
        duration-300 
        hover:shadow-xl
        flex 
        flex-col
        h-full
        pointer-events-none
        ${shouldShowBorder 
          ? 'border-2 border-brand-brown shadow-lg' 
          : 'border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl hover:scale-[1.01]'
        }
        ${cardClassName}
      `}>
        
        {/* Popular Badge - positioned to break container boundaries */}
        {config.badge && (
          <div className="
            absolute 
            -top-6 
            left-1/2 
            transform 
            -translate-x-1/2 
            z-20
            bg-gradient-to-r 
            from-brand-brown 
            to-amber-800 
            text-white 
            px-3 
            py-1.5
            md:px-8 
            md:py-3 
            rounded-full 
            text-xs
            md:text-sm 
            font-bold 
            shadow-lg
            border-2
            border-white
            whitespace-nowrap
            pointer-events-auto
          ">
            ⭐ {config.badge}
          </div>
        )}

        {/* Card Content - Mobile optimized padding */}
        <div className="p-4 md:p-8 flex flex-col h-full">
          
          {/* Header Section */}
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-sm md:text-2xl font-bold text-gray-900 mb-2">
              {config.displayName}
            </h3>
            {/* Description hidden on mobile per UX specs */}
            <p className="hidden md:block text-gray-600 text-base leading-relaxed mb-4">
              {config.description}
            </p>
            
            {/* Price Display - Mobile optimized typography */}
            <div className="mb-3 md:mb-4">
              {/* Mobile: 24px (text-2xl), Desktop: 48px (text-5xl) */}
              <div className="text-2xl md:text-5xl font-bold text-gray-900">
                {formatTierPrice(tier)}
              </div>
              <div className="text-gray-500 text-xs md:text-sm mt-1">
                einmalig
              </div>
            </div>

            {/* Delivery Info - Mobile optimized */}
            <div className="bg-green-50 text-green-700 text-xs md:text-sm px-2 md:px-3 py-1.5 md:py-2 rounded-full inline-block">
              ⚡ Ergebnis in: {config.deliveryTime}
            </div>
          </div>

          {/* Features List - SSR-friendly responsive approach */}
          <div className="flex-1 mb-4 md:mb-6">
            {/* Mobile Features - Only visible on mobile */}
            <ul className="space-y-2 md:space-y-3 block md:hidden">
              {(MOBILE_FEATURES[tier] || config.features.slice(0, 2)).map((feature, index) => (
                <li key={`mobile-${index}`} className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg 
                      className="w-2.5 h-2.5 text-green-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-xs leading-tight">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Desktop Features - Only visible on desktop */}
            <ul className="space-y-2 md:space-y-3 hidden md:block">
              {config.features.map((feature, index) => (
                <li key={`desktop-${index}`} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg 
                      className="w-4 h-4 text-green-600" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights - Compact for mobile, expanded for desktop */}
          {config.highlights && config.highlights.length > 0 && (
            <div className="mb-4 md:mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg md:rounded-2xl p-2 md:p-4">
                <div className="text-amber-700 text-xs md:text-sm font-semibold mb-1 md:mb-2">
                  💡 Highlights
                </div>
                <ul className="space-y-0.5 md:space-y-1">
                  {config.highlights.map((highlight, index) => (
                    <li key={index} className="text-amber-700 text-[10px] md:text-sm leading-tight md:leading-normal">
                      • {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* CTA Button - pinned to bottom */}
          <div className="mt-auto">
            <button
              onClick={() => {
                info('Pricing: Tier selected', { tier, price });
                handleTierSelect(tier);
              }}
              className={`
                w-full
                py-3 md:py-4
                px-4 md:px-6
                rounded-xl md:rounded-2xl
                font-semibold
                text-xs md:text-lg
                transition-all
                duration-200
                focus:outline-none
                focus:ring-4
                focus:ring-opacity-50
                pointer-events-auto
                transform
                hover:scale-105
                active:scale-95
                min-h-[44px]
                ${shouldShowBorder
                  ? 'bg-gradient-to-r from-brand-brown to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white focus:ring-amber-300 shadow-lg hover:shadow-xl'
                  : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white focus:ring-gray-300 shadow-lg hover:shadow-xl'
                }
              `}
              aria-label={`${config.displayName} für ${formatTierPrice(tier)} auswählen`}
            >
              {config.ctaText}
            </button>
            
            {/* Micro Trust Signal - Mobile: 20px height, Desktop: normal */}
            <div className="text-center mt-2 md:mt-3 text-[10px] md:text-xs text-gray-500 h-5 md:h-auto flex items-center justify-center">
              🔒 Sichere Zahlung • 30 Tage Geld-zurück-Garantie
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Wähle deine <span className="text-brand-brown">PferdeWert</span>-Analyse
        </h2>
      </div>

      {/* DESKTOP: CSS Grid for Equal Heights */}
      <div className={`
        hidden
        md:grid 
        grid-cols-1 
        md:grid-cols-3 
        gap-8 
        max-w-${DESKTOP_LAYOUT.MAX_WIDTH} 
        mx-auto 
        px-4
        relative
        z-10
      `}>
        {tiers.map((tier) => (
          <div 
            key={tier}
            className="
              relative 
              flex 
              items-stretch
            "
            style={{
              minHeight: `${DESKTOP_LAYOUT.MIN_CARD_HEIGHT}px`,
              gridRowEnd: 'span 1' // Ensure all grid items have the same height
            }}
          >
            <TierCard
              tier={tier}
              cardClassName="
                w-full 
                h-full 
                flex 
                flex-col
                justify-between
              "
            />
          </div>
        ))}
      </div>

      {/* MOBILE: Horizontal Scroll with UX Optimizations */}
      <div 
        ref={scrollContainerRef}
        className="
          md:hidden 
          overflow-x-auto 
          scrollbar-hide 
          -mx-4 
          px-4 
          py-8
          snap-x 
          snap-mandatory
          relative
        " 
        style={{ scrollPaddingLeft: '2rem' }}
      >

        {/* UX OPTIMIZED: Cards with perfect partial visibility (64% center + 17% sides) */}
        <div className={`
          flex 
          space-x-2 
          min-w-max
        `}
        style={{ 
          paddingLeft: `${MOBILE_LAYOUT.CONTAINER_PADDING}px`,
          paddingRight: `${MOBILE_LAYOUT.CONTAINER_PADDING}px`
        }}
        >
          {/* Basic tier */}
          <div 
            className="flex-shrink-0 snap-center"
            style={{
              width: `${MOBILE_LAYOUT.CARD_WIDTH}px`,
              minHeight: `${MOBILE_LAYOUT.MIN_CARD_HEIGHT}px`
            }}
          >
            <TierCard
              tier="basic"
              cardClassName="h-full"
            />
          </div>
          
          {/* Pro tier - Enhanced center-stage */}
          <div 
            className="flex-shrink-0 snap-center snap-always"
            style={{
              width: `${MOBILE_LAYOUT.CARD_WIDTH}px`,
              minHeight: `${MOBILE_LAYOUT.PRO_ENHANCED_HEIGHT}px`
            }}
          >
            <TierCard
              tier="pro"
              cardClassName={`h-full transform scale-[${MOBILE_LAYOUT.SCALE_FACTOR}] shadow-lg`}
            />
          </div>
          
          {/* Premium tier */}
          <div 
            className="flex-shrink-0 snap-center"
            style={{
              width: `${MOBILE_LAYOUT.CARD_WIDTH}px`,
              minHeight: `${MOBILE_LAYOUT.MIN_CARD_HEIGHT}px`
            }}
          >
            <TierCard
              tier="premium"
              cardClassName="h-full"
            />
          </div>
        </div>
      </div>

      {/* Minimal Mobile Navigation Indicator */}
      <div className="md:hidden flex justify-center mt-6">
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCardIndex === index ? 'bg-brand-brown' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Indicators - Hidden on mobile */}
      <div className="hidden md:block text-center mt-12 space-y-4">
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>30 Tage Geld-zurück-Garantie</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Sichere Zahlung mit Stripe</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Von Pferde-Experten entwickelt</span>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 max-w-2xl mx-auto">
          Alle Preise verstehen sich inkl. 19% MwSt. Nach der Zahlung erhältst du sofort 
          Zugang zu deiner personalisierten Pferdebewertung.
        </p>
      </div>
    </div>
  );
}