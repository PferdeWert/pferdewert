// lib/env-validation.ts
import { error } from "@/lib/log";

/**
 * Validates that all required environment variables are present
 * Throws error with detailed message if any are missing
 * @param exitOnFailure - If true, calls process.exit(1) on validation failure (default: false)
 */
export function validateEnvironment(exitOnFailure = false): void {
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
    error('[ENV-VALIDATION] ❌ Environment validation failed:', errorMessage);
    
    if (exitOnFailure) {
      process.exit(1);
    }
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
 * @param exitOnFailure - If true, calls process.exit(1) on validation failure (default: false)
 */
export function validateStripeConfiguration(exitOnFailure = false): void {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const basicPriceId = process.env.STRIPE_PRICE_ID_BASIC;
  
  if (!stripeKey || !basicPriceId) {
    const errorMessage = 'Stripe key and price IDs must be validated first';
    if (exitOnFailure) {
      process.exit(1);
    }
    throw new Error(errorMessage);
  }
  
  const isTestKey = stripeKey.startsWith('sk_test_');
  const isTestPrice = basicPriceId.includes('_test_') || !basicPriceId.startsWith('price_1R');
  
  if (isTestKey && !isTestPrice) {
    const errorMessage = 'Stripe configuration mismatch: test key with live price IDs';
    error('[ENV-VALIDATION] ❌ Stripe configuration mismatch:', {
      keyMode: 'test',
      priceMode: 'live'
    });
    if (exitOnFailure) {
      process.exit(1);
    }
    throw new Error(errorMessage);
  }
  
  if (!isTestKey && isTestPrice) {
    const errorMessage = 'Stripe configuration mismatch: live key with test price IDs';
    error('[ENV-VALIDATION] ❌ Stripe configuration mismatch:', {
      keyMode: 'live', 
      priceMode: 'test'
    });
    if (exitOnFailure) {
      process.exit(1);
    }
    throw new Error(errorMessage);
  }
  
  console.info('[ENV-VALIDATION] ✅ Stripe configuration compatibility validated');
}

/**
 * Runtime validation for API routes - validates environment without exiting process
 * Returns validation result instead of throwing or exiting
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateRuntimeEnvironment(): { isValid: boolean; error?: string } {
  try {
    validateEnvironment(false);
    validateStripeConfiguration(false);
    return { isValid: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown validation error';
    return { isValid: false, error: errorMessage };
  }
}

/**
 * Validates only Stripe-related environment variables for Stripe API routes
 * @returns Object with isValid boolean and error message if invalid
 */
export function validateStripeEnvironment(): { isValid: boolean; error?: string } {
  const required = [
    'STRIPE_SECRET_KEY',
    'STRIPE_PRICE_ID_BASIC',
    'STRIPE_PRICE_ID_PRO', 
    'STRIPE_PRICE_ID_PREMIUM',
    'STRIPE_WEBHOOK_SECRET'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    return { 
      isValid: false, 
      error: `Missing Stripe environment variables: ${missing.join(', ')}` 
    };
  }
  
  try {
    validateStripeConfiguration(false);
    return { isValid: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Stripe validation error';
    return { isValid: false, error: errorMessage };
  }
}