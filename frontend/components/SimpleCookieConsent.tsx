// frontend/components/SimpleCookieConsent.tsx
// Production-Ready: Conversion-Optimized with Granular Cookie Control
// GDPR-Konform: Opt-in, Granular Choice, Proper Rejection Path

import { useCallback, useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import { info, error as logError } from '@/lib/log';
import CookieSettingsModal from './CookieSettingsModal';

// WICHTIG: eigener Cookie-Name, damit wir nicht mit library-internen kollidieren
const CONSENT_COOKIE = 'pferdewert_cookie_consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; // Google Analytics ID

// Cookie Consent Values
type ConsentValue = 'allow' | 'analytics_only' | 'necessary_only';

// Type for popup element with accessibility handler
interface PopupElementWithHandler extends HTMLElement {
  _keydownHandler?: (e: KeyboardEvent) => void;
}

// CookieSettings interface is defined globally in types/global.d.ts

const SimpleCookieConsent = () => {
  // State Management
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [showCookieModal, setShowCookieModal] = useState(false);

  // FAST REFRESH FIX: Stable refs for state setters to prevent infinite loops
  // These refs ensure callbacks inside cookie banner config don't trigger re-renders
  const setHasConsentRef = useRef(setHasConsent);
  const setShowCookieModalRef = useRef(setShowCookieModal);

  // FAST REFRESH FIX: Ref for handleConsentDecision to break dependency chain
  // This prevents: handleConsentDecision → initCookieConsentConfig → initCookieConsent loop
  const handleConsentDecisionRef = useRef<((value: ConsentValue) => void) | null>(null);

  // Keep refs up-to-date with current setters
  useEffect(() => {
    setHasConsentRef.current = setHasConsent;
    setShowCookieModalRef.current = setShowCookieModal;
  }, [setHasConsent, setShowCookieModal]);

  // Check existing consent on mount
  useEffect(() => {
    // DataFa.st queue is already initialized in _document.tsx
    // No need to re-initialize here to avoid conflicts

    const cookiePattern = new RegExp(`${CONSENT_COOKIE}=([a-z_]+)`);
    const match = document.cookie.match(cookiePattern);

    if (match) {
      const value = match[1] as ConsentValue;
      const isAllowed = value === 'allow' || value === 'analytics_only';
      setHasConsent(isAllowed);
    }
  }, []);

  // Handle consent decision from banner or modal
  // FAST REFRESH FIX: useCallback with empty deps - all state accessed via refs
  const handleConsentDecision = useCallback((consentValueParam: ConsentValue) => {
    // Cleanup: Overflow zurücksetzen
    document.body.style.overflow = '';

    const granted = consentValueParam === 'allow' || consentValueParam === 'analytics_only';
    const analyticsEnabled = consentValueParam === 'allow' || consentValueParam === 'analytics_only';

    // FAST REFRESH FIX: Use ref instead of direct setter to prevent dependency chain
    setHasConsentRef.current(granted);

    // Track Cookie Banner Interaction
    if (typeof window !== 'undefined') {
      // MongoDB Tracking
      fetch('/api/track-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: granted ? 'accept' : 'reject',
          consentValue: consentValueParam,
        }),
      }).catch(() => {}); // Silent fail

      // DataFa.st Event Tracking
      if (window.datafast) {
        window.datafast(granted ? 'cookie_accepted' : 'cookie_rejected');
      }

      info('Consent tracked:', { action: granted ? 'accepted' : 'rejected', consentValue: consentValueParam });
    }

    // Google Consent Mode v2 - Enhanced for @next/third-parties
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: analyticsEnabled ? 'granted' : 'denied',
        analytics_storage: analyticsEnabled ? 'granted' : 'denied',
        ad_user_data: analyticsEnabled ? 'granted' : 'denied',
        ad_personalization: analyticsEnabled ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
      });

      if (analyticsEnabled && GA_ID) {
        window.gtag('config', GA_ID, {
          page_path: window.location.pathname,
          anonymize_ip: true,
          cookie_expires: 63072000, // 2 years in seconds
          cookie_flags: 'SameSite=Lax;Secure',
        });
        info('Enhanced GA4 tracking enabled');
      }
    }

    // DataFa.st Analytics - Only load after consent
    if (analyticsEnabled && typeof window !== 'undefined') {
      // Load DataFa.st script dynamically after consent
      if (!document.querySelector('[data-website-id="68d59a9dcb0e8d111148811a"]')) {
        const datafastScript = document.createElement('script');
        datafastScript.defer = true;
        datafastScript.setAttribute('data-website-id', '68d59a9dcb0e8d111148811a');
        datafastScript.setAttribute('data-domain', 'Pferdewert.de');
        datafastScript.src = 'https://datafa.st/js/script.js';
        document.head.appendChild(datafastScript);

        info('DataFa.st tracking enabled after consent');
      }
    }

    if (analyticsEnabled) {
      info('Analytics enabled - User accepted cookies');
    } else {
      info('Analytics disabled - User declined cookies');
    }

    // Banner sauber entfernen
    const popup = document.querySelector('.cc-window');
    popup?.remove();

    // Update document.cookie with proper flags
    document.cookie = `${CONSENT_COOKIE}=${consentValueParam}; path=/; max-age=31536000; SameSite=Lax; Secure`;
  }, []); // FAST REFRESH FIX: Empty deps - all state accessed via refs

  // FAST REFRESH FIX: Store function in ref to use in event handlers
  useEffect(() => {
    handleConsentDecisionRef.current = handleConsentDecision;
  }, [handleConsentDecision]);

  // Handle settings from modal
  const handleModalSave = useCallback(
    (settings: CookieSettings) => {
      // Determine consent value based on user choice
      // fullConsent: true = "Alle akzeptieren" clicked → 'allow'
      // fullConsent: false/undefined + analytics: true → 'analytics_only'
      // analytics: false → 'necessary_only'
      let consentValue: CookieConsentValue;
      if (settings.fullConsent) {
        consentValue = 'allow';
      } else if (settings.analytics) {
        consentValue = 'analytics_only';
      } else {
        consentValue = 'necessary_only';
      }

      // FAST REFRESH FIX: Use ref to avoid dependency chain
      handleConsentDecisionRef.current?.(consentValue);
      // FAST REFRESH FIX: Use ref instead of direct setter
      setShowCookieModalRef.current(false);
    },
    [] // FAST REFRESH FIX: Empty deps - all state accessed via refs
  );

  const initCookieConsentConfig = useCallback((cookieConsent: typeof window.cookieconsent) => {
    if (!cookieConsent?.initialise) return;

    // Conversion-optimierte Konfiguration für PferdeWert.de
    cookieConsent.initialise({
      type: 'opt-in',

      palette: {
        popup: { background: '#ffffff', text: '#2d2d2d' },
        button: { background: '#92400e', text: '#ffffff' }, // PferdeWert Brand Brown (#92400e)
      },

      position: 'bottom',
      theme: 'classic',

      content: {
        // Conversion-optimiert: Emotional + Pferdespezifisch
        message: `
          <div style="text-align: center; margin-bottom: 1rem;">
            <div style="font-size: 2rem; margin-bottom: 0.75rem;">🐎</div>
            <h3 style="font-size: 1.3rem; font-weight: 700; color: #2d2d2d; margin: 0 0 0.75rem 0; line-height: 1.3;">
              Hilf uns, die beste Pferdebewertung zu entwickeln!
            </h3>
            <p style="font-size: 1rem; color: #5a5a5a; line-height: 1.4; margin: 0;">
              Deine anonymen Daten helfen uns, PferdeWert.de noch genauer und besser zu machen.
            </p>
          </div>
        `,
        allow: 'Alle akzeptieren',
        deny: 'Optionen',
        link: 'Datenschutz',
        href: '/datenschutz',
      },

      cookie: {
        name: CONSENT_COOKIE, // Eigener Name verhindert Konflikte!
        path: '/',
        expiryDays: 365,
        sameSite: 'Lax',
        secure: true,
      },

      onPopupOpen: () => {
        // Mobile: Prevent body scroll + bessere Cleanup-Logic
        if (window.innerWidth < 768) {
          document.body.style.overflow = 'hidden';
        }

        // Mobile-Optimierung: Banner-Styling anpassen
        const popup = document.querySelector('.cc-window') as HTMLElement;
        if (popup) {
          popup.setAttribute('role', 'dialog');
          popup.setAttribute('aria-live', 'assertive');
          popup.setAttribute('aria-label', 'Cookie-Einwilligung');
          popup.setAttribute('aria-modal', 'true');

          const isMobile = window.innerWidth < 768;

          if (isMobile) {
            // Mobile: 50% Bildschirmhöhe, sehr prominent
            popup.style.cssText = `
              position: fixed !important;
              bottom: 0 !important;
              left: 0 !important;
              right: 0 !important;

              top: auto !important;        // hebt das 100%-Fullscreen auf */
              height: auto !important;        /* Library setzt evtl. height */
              max-height: 70vh !important;    /* jetzt wirkt die Begrenzung */
              overflow-y: auto !important;    /* falls Text länger als 75vh */

              background: #ffffff !important;
              box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15) !important;
              border-radius: 16px 16px 0 0 !important;
              padding: 2rem 1.5rem !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              z-index: 10000 !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              transform: none !important;
            `;
          } else {
            // Desktop: Apply direct centering styles since CSS isn't loading properly
            popup.style.cssText = `
              position: fixed !important;
              top: 50% !important;
              left: 50% !important;
              transform: translate(-50%, -50%) !important;
              width: 90% !important;
              max-width: 480px !important;
              padding: 2rem 1.5rem !important;
              background: #ffffff !important;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15) !important;
              border-radius: 12px !important;
              display: flex !important;
              flex-direction: column !important;
              z-index: 10000 !important;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
              text-align: center !important;
              bottom: auto !important;
              right: auto !important;
              height: auto !important;
              margin: 0 !important;
            `;
          }

          // Optimize button styling for better UX - PferdeWert Brand Style Guide compliant
          const styleButtonsWhenReady = () => {
            const allowButton = popup.querySelector<HTMLElement>('.cc-allow');
            const denyButton = popup.querySelector<HTMLElement>('.cc-deny');
            const compliance = popup.querySelector<HTMLElement>('.cc-compliance');

            if (!allowButton || !denyButton || !compliance) {
              requestAnimationFrame(styleButtonsWhenReady);
              return;
            }

            // FIX: Force vertical button layout (library defaults to horizontal)
            compliance.style.cssText = `
              display: flex !important;
              flex-direction: column !important;
              gap: 0.75rem !important;
              margin-top: 1.5rem !important;
              width: 100% !important;
            `;

            // PRIMARY CTA: "Alle akzeptieren" - PferdeWert Brand Brown
            // Styles gemäß Brand Style Guide: bg-brand-brown (#92400e), text-white, px-8 py-4, rounded-lg, font-semibold
            allowButton.style.cssText = `
              width: 100% !important;
              padding: 1rem 2rem !important;
              background-color: #92400e !important;
              color: white !important;
              border: none !important;
              border-radius: 8px !important;
              font-weight: 600 !important;
              font-size: 1rem !important;
              cursor: pointer !important;
              transition: all 0.2s ease !important;
              margin: 0 !important;
              text-decoration: none !important;
              box-sizing: border-box !important;
              display: block !important;
            `;

            allowButton.addEventListener('mouseenter', () => {
              allowButton.style.backgroundColor = '#78350f !important'; // brand-brownDark hover
            });
            allowButton.addEventListener('mouseleave', () => {
              allowButton.style.backgroundColor = '#92400e !important';
            });

            // SECONDARY CTA: "Optionen" - White with Brand Brown Border
            // Styles gemäß Brand Style Guide: bg-white, border-2 border-brand-brown, text-brand-brown, px-8 py-4, rounded-lg, font-semibold
            denyButton.style.cssText = `
              width: 100% !important;
              padding: 1rem 2rem !important;
              background-color: white !important;
              color: #92400e !important;
              border: 2px solid #92400e !important;
              border-radius: 8px !important;
              font-weight: 600 !important;
              font-size: 1rem !important;
              cursor: pointer !important;
              transition: all 0.2s ease !important;
              margin: 0 !important;
              text-decoration: none !important;
              box-sizing: border-box !important;
              display: block !important;
            `;

            denyButton.addEventListener('mouseenter', () => {
              denyButton.style.backgroundColor = 'rgba(146, 64, 14, 0.05) !important'; // brand-brown/5 for subtle hover
              denyButton.style.borderColor = '#78350f !important'; // Darker border on hover
              denyButton.style.color = '#78350f !important';
            });
            denyButton.addEventListener('mouseleave', () => {
              denyButton.style.backgroundColor = 'white !important';
              denyButton.style.borderColor = '#92400e !important';
              denyButton.style.color = '#92400e !important';
            });
          };

          styleButtonsWhenReady();

          // Keyboard handling for accessibility - ESC opens modal instead of deny
          const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
              // FAST REFRESH FIX: Use ref to avoid closure dependency issues
              setShowCookieModalRef.current(true);
            }
          };

          popup.addEventListener('keydown', handleKeyDown);

          // Set initial focus to allow button for accessibility
          setTimeout(() => {
            const allowButton = popup.querySelector<HTMLElement>('.cc-allow');
            if (allowButton) {
              allowButton.focus();
              info('Cookie banner focused on allow button');
            }
          }, 150);

          // Store reference to handler for cleanup
          (popup as PopupElementWithHandler)._keydownHandler = handleKeyDown;

          info('Cookie banner opened with accessibility features');
        }
      },

      onPopupClose: () => {
        // Cleanup: Overflow zurücksetzen
        document.body.style.overflow = '';

        // Task 1: Cleanup keyboard event listener
        const popup = document.querySelector('.cc-window') as PopupElementWithHandler;
        if (popup && popup._keydownHandler) {
          popup.removeEventListener('keydown', popup._keydownHandler);
          delete popup._keydownHandler;
        }

        info('Cookie banner closed');
      },

      onStatusChange: (status: string) => {
        // Handle deny button click - open modal instead of immediately denying
        if (status === 'deny') {
          // CRITICAL FIX: Hide banner popup when modal opens to prevent double overlay
          const popup = document.querySelector('.cc-window') as HTMLElement;
          if (popup) {
            popup.style.display = 'none';
            info('Banner hidden for modal display');
          }

          // FAST REFRESH FIX: Use ref to avoid closure dependency issues
          setShowCookieModalRef.current(true);
          info('Opening cookie settings modal');
          return;
        }

        // Handle allow button click - accept all
        if (status === 'allow') {
          // FAST REFRESH FIX: Use ref to break dependency chain
          handleConsentDecisionRef.current?.('allow');
        }
      },
    });

    // Global function for re-opening banner
    window.showCookieSettings = () => {
      info('Reopening cookie banner');
      document.cookie = `${CONSENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      window.location.reload(); // FAST REFRESH FIX: Use window.location instead of router to prevent dependency chain
    };

    info('SimpleCookieConsent initialized with mobile optimization');
  }, []); // FAST REFRESH FIX: Empty deps - handleConsentDecision accessed via ref

  /** useCallback verhindert Re-Creation bei jedem Render */
  const initCookieConsent = useCallback(() => {
    info('Cookie script loaded');

    // ROBUST FIX: Exit early if ANY consent cookie exists (not just allow/deny)
    // This prevents infinite reload loops when cookie has values like 'analytics_only' or 'necessary_only'
    if (document.cookie.includes(`${CONSENT_COOKIE}=`)) {
      info('Consent cookie already exists - skipping banner initialization');
      return;
    }

    // Enhanced error handling with retry mechanism + guard against multiple retries
    const cookieConsent = window.cookieconsent;
    if (!cookieConsent?.initialise) {
      logError('CookieConsent library not found - retrying once in 100ms');

      // ROBUST FIX: Use flag to prevent multiple retry attempts that could cause loops
      if (!(window as typeof window & { _cookieConsentRetried?: boolean })._cookieConsentRetried) {
        (window as typeof window & { _cookieConsentRetried?: boolean })._cookieConsentRetried = true;

        setTimeout(() => {
          const retryConsent = window.cookieconsent;
          if (!retryConsent?.initialise) {
            logError('CookieConsent library failed to load after retry');
            return;
          }
          initCookieConsentConfig(retryConsent);
        }, 100);
      }
      return;
    }

    initCookieConsentConfig(cookieConsent);
  }, [initCookieConsentConfig]);

  // FAST REFRESH FIX: Stable callback for modal close to prevent infinite re-renders
  const handleModalClose = useCallback(() => {
    setShowCookieModalRef.current(false);
  }, []); // Empty deps - uses ref

  return (
    <>
      {/* Cookie Settings Modal */}
      <CookieSettingsModal
        isOpen={showCookieModal}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />

      {/* LIGHTHOUSE OPTIMIZED: Use @next/third-parties for better performance */}
      {GA_ID && hasConsent && (
        <GoogleAnalytics gaId={GA_ID} />
      )}

      {/* Initialize gtag with consent mode */}
      {GA_ID && (
        <Script id="gtag-consent-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Consent Mode v2: Default denied (GDPR compliant)
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });

            gtag('js', new Date());
          `}
        </Script>
      )}

      {/* LIGHTHOUSE OPTIMIZED: Modern Cookie Consent with CDN + source maps */}
      <Script
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={initCookieConsent}
        onError={() => {
          logError('Failed to load cookieconsent from CDN, falling back to local');
          // Fallback to local file
          const script = document.createElement('script');
          script.src = '/js/cookieconsent.min.js';
          script.onload = initCookieConsent;
          document.head.appendChild(script);
        }}
      />

    </>
  );
};

export default SimpleCookieConsent;
