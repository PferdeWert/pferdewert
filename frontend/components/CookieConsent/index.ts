// frontend/components/CookieConsent/index.ts

// Main Component
export { default as CookieConsent } from './CookieConsent';
export type { CookieConsentProps } from './CookieConsent';

// Custom Hook
export { useCookieConsent } from './useCookieConsent';
export type { CookieStatus, UseCookieConsentReturn } from './useCookieConsent';

// Types
export type {
  CookieConsentConfig,
  CookieConsentInstance,
  CookieConsentPopup,
} from './types';

// Default export is the main component
export { default } from './CookieConsent';