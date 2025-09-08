# TierSelectionCheckout Integration Guide

## Overview
This guide shows how to integrate the new `TierSelectionCheckout` component into the existing `pferde-preis-berechnen.tsx` page to replace the current fixed-tier checkout section.

## Current Implementation (Lines 854-948)
The current checkout section shows:
- Fixed tier pricing
- Basic consent checkbox
- Single payment button

## New Implementation
Replace the current checkout step (lines 854-948) with the new component.

## Integration Steps

### 1. Import the New Component
Add to imports at the top of `pferde-preis-berechnen.tsx`:

```typescript
import TierSelectionCheckout from '@/components/checkout/TierSelectionCheckout';
```

### 2. Replace Checkout Step
Replace the entire checkout step section (lines 854-948) with:

```typescript
{/* Bezahlung-Step with Tier Selection */}
{currentStep === stepData.length + 1 && (
  <>
    {/* Mobile Sticky Button */}
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-xl px-4 py-4 z-40 md:hidden border-t">
      <div className="text-center text-sm text-brand-brown font-medium mb-2">
        {selectedTier ? `${PRICING_TIERS[selectedTier].displayName}-Analyse` : 'Tier wählen'}
      </div>
    </div>

    {/* Error Display */}
    {errors.form && (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-6 max-w-4xl mx-auto">
        <p className="text-red-700 font-medium text-center">
          {errors.form}
        </p>
      </div>
    )}

    {/* New Tier Selection Checkout Component */}
    <TierSelectionCheckout
      initialTier={selectedTier || 'pro'}
      isLoading={loading}
      onProceedToPayment={(tier, price) => {
        // Update selected tier state
        setSelectedTier(tier);
        
        // Update form data with selected tier
        setFormData(prev => ({
          ...prev,
          selectedTier: tier,
          finalPrice: price
        }));
        
        // Submit the form
        handleSubmit();
      }}
    />

    {/* Additional mobile spacing */}
    <div className="h-24 md:h-0"></div>
  </>
)}
```

### 3. Update handleSubmit Function
Modify the `handleSubmit` function to work with dynamic tier selection:

```typescript
const handleSubmit = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();
  
  // Ensure we have a selected tier
  if (!selectedTier) {
    setErrors({ form: 'Bitte wähle einen Bewertungs-Tarif aus.' });
    return;
  }
  
  setLoading(true);
  setErrors({});

  try {
    const submissionData = {
      ...formData,
      selectedTier,
      finalPrice: TIER_PRICES[selectedTier]
    };

    info('Form submission started', {
      tier: selectedTier,
      price: TIER_PRICES[selectedTier],
      hasAllSteps: Object.keys(formData).length > 0
    });

    // Rest of existing submission logic...
    const response = await fetch('/api/submit-valuation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });

    // Continue with existing logic...
    
  } catch (error) {
    console.error('Submission error:', error);
    setErrors({
      form: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.'
    });
  } finally {
    setLoading(false);
  }
};
```

### 4. Update State Management
Ensure the component can handle dynamic tier changes by updating state:

```typescript
// Add state for handling tier changes at checkout
const [checkoutTier, setCheckoutTier] = useState<PricingTier | null>(selectedTier);

// Update selectedTier when it changes
useEffect(() => {
  if (selectedTier !== checkoutTier) {
    setCheckoutTier(selectedTier);
  }
}, [selectedTier]);
```

### 5. Analytics Integration
The new component already includes analytics tracking, but ensure your existing analytics setup works:

```typescript
// In handleSubmit, add tier-specific tracking
window.gtag?.('event', 'checkout_initiated', {
  tier_name: selectedTier,
  tier_price: TIER_PRICES[selectedTier],
  currency: 'EUR'
});
```

## Design Features Included

### ✅ Full-Width Layout
- Component takes full container width
- Responsive grid for tier boxes
- Proper mobile spacing

### ✅ Mobile-First Tier Boxes
- Compact 3-column grid layout
- Touch-friendly interaction
- Visual selection indicators
- Hover and active states

### ✅ Pre-Selected Tier
- Reads from session storage
- Visual selection state
- Proper aria attributes for accessibility

### ✅ Dynamic Pricing
- Updates in real-time based on selection
- Formatted price display
- German currency formatting

### ✅ Blue Consent Checkbox
- Matches existing design system
- Proper form validation
- Linked terms and privacy policy

### ✅ Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Browser Support
- Works on all modern browsers
- Touch-friendly for mobile devices
- Responsive design breakpoints
- Performance optimized

## Testing Checklist
- [ ] Tier selection updates pricing correctly
- [ ] Pre-selected tier displays properly
- [ ] Mobile layout works on small screens
- [ ] Consent checkbox validates properly
- [ ] Analytics tracking fires correctly
- [ ] Form submission works with selected tier
- [ ] Error states display correctly
- [ ] Loading states work properly

## File Dependencies
- `/lib/pricing.ts` - Pricing configuration
- `/lib/pricing-session.ts` - Session storage utilities
- `/lib/log.ts` - Logging utilities
- `@/types/global.d.ts` - TypeScript definitions

This integration maintains all existing functionality while adding the new tier selection capability with a modern, mobile-friendly interface.