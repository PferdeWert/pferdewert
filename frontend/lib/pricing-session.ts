// frontend/lib/pricing-session.ts
// Simple helpers to persist and read the selected pricing tier in the browser.

import type { PricingTier } from './pricing';

const STORAGE_KEY = 'PW_selected_tier';
const TTL_MS = 30 * 60 * 1000; // 30 minutes

type StoredTier = {
  value: PricingTier;
  expires: number;
};

export function savePricingTier(tier: PricingTier): void {
  if (typeof window === 'undefined') return;
  const payload: StoredTier = { value: tier, expires: Date.now() + TTL_MS };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage issues
  }
}

export function getPricingTier(): PricingTier | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredTier> | null;
    if (!parsed || !parsed.value) return null;
    if (parsed.expires && parsed.expires < Date.now()) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.value as PricingTier;
  } catch {
    return null;
  }
}

// Accepts various URL params and normalizes to canonical tier ids
export function normalizeTierParam(param: string | null): PricingTier | null {
  if (!param) return null;
  const v = String(param).toLowerCase();
  if (v === 'pro') return 'standard';
  if (v === 'basic' || v === 'standard' || v === 'premium') return v as PricingTier;
  return null;
}

// Convert internal tier id to canonical URL param (pro for standard)
export function toTierUrlParam(tier: PricingTier): 'basic' | 'pro' | 'premium' {
  if (tier === 'standard') return 'pro';
  return tier;
}

