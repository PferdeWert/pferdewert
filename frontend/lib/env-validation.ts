// lib/env-validation.ts
import { error } from "@/lib/log";

/**
 * Validates that all required environment variables are present at startup
 * Throws error with detailed message if any are missing
 */
export function validateEnvironment(): void {
  const required = [
    'STRIPE_SECRET_KEY',
    'STRIPE_PRICE_ID_BASIC', 
    'STRIPE_PRICE_ID_PRO',
    'STRIPE_PRICE_ID_PREMIUM',
    'STRIPE_WEBHOOK_SECRET',
    'MONGODB_URI'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(', ')}`;
    error('[ENV-VALIDATION] ❌ Startup validation failed:', errorMessage);
    throw new Error(errorMessage);
  }
  
  // Validate Stripe Price ID format
  const priceIds = [
    { key: 'STRIPE_PRICE_ID_BASIC', value: process.env.STRIPE_PRICE_ID_BASIC },
    { key: 'STRIPE_PRICE_ID_PRO', value: process.env.STRIPE_PRICE_ID_PRO },
    { key: 'STRIPE_PRICE_ID_PREMIUM', value: process.env.STRIPE_PRICE_ID_PREMIUM },
  ];
  
  for (const { key, value } of priceIds) {
    if (!value || (!value.startsWith('price_') && !value.includes('_test_'))) {
      const errorMessage = `Invalid Stripe Price ID format for ${key}: ${value}`;
      error('[ENV-VALIDATION] ❌ Price ID validation failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }
  
  console.info('[ENV-VALIDATION] ✅ All required environment variables validated successfully');
}

/**
 * Validates Stripe key/price compatibility to prevent test/live mode mismatches
 */
export function validateStripeConfiguration(): void {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const basicPriceId = process.env.STRIPE_PRICE_ID_BASIC;
  
  if (!stripeKey || !basicPriceId) {
    throw new Error('Stripe key and price IDs must be validated first');
  }
  
  const isTestKey = stripeKey.startsWith('sk_test_');
  const isTestPrice = basicPriceId.includes('_test_') || !basicPriceId.startsWith('price_1R');
  
  if (isTestKey && !isTestPrice) {
    const errorMessage = 'Stripe configuration mismatch: test key with live price IDs';
    error('[ENV-VALIDATION] ❌ Stripe configuration mismatch:', {
      keyMode: 'test',
      priceMode: 'live'
    });
    throw new Error(errorMessage);
  }
  
  if (!isTestKey && isTestPrice) {
    const errorMessage = 'Stripe configuration mismatch: live key with test price IDs';
    error('[ENV-VALIDATION] ❌ Stripe configuration mismatch:', {
      keyMode: 'live', 
      priceMode: 'test'
    });
    throw new Error(errorMessage);
  }
  
  console.info('[ENV-VALIDATION] ✅ Stripe configuration compatibility validated');
}