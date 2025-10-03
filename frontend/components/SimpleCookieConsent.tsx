// frontend/components/SimpleCookieConsent.tsx
// Production-Ready: Optimized for Lighthouse Best Practices

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Pages Router
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

// WICHTIG: eigener Cookie-Name, damit wir nicht mit library-internen kollidieren
const CONSENT_COOKIE = 'pferdewert_cookie_consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; // Google Analytics ID

const SimpleCookieConsent = () => {
  const router = useRouter();
  // Remove unused isScriptLoaded state for cleaner code
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  // Check existing consent on mount
  useEffect(() => {
    const existingConsent = new RegExp(`${CONSENT_COOKIE}=(allow|deny)`).test(document.cookie);
    if (existingConsent) {
      const isAllowed = document.cookie.includes(`${CONSENT_COOKIE}=allow`);
      setHasConsent(isAllowed);
    }
  }, []);

  const initCookieConsentConfig = useCallback((cookieConsent: typeof window.cookieconsent) => {
    if (!cookieConsent?.initialise) return;

    // Conversion-optimierte Konfiguration für PferdeWert.de
    cookieConsent.initialise({
      type: 'opt-in',
      
      palette: {
        popup: { background: '#ffffff', text: '#2d2d2d' },
        button: { background: 'var(--brand-brown)', text: '#ffffff' }, // PferdeWert Braun
      },
      
      position: 'bottom',
      theme: 'classic',
      
      content: {
        // 🎯 CONVERSION-OPTIMIERT: Emotional + Pferdespezifisch
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
        allow: 'Einwilligen',  
        deny: 'Ablehnen',      // In Zukunft evtl. "Optionen verwalten einfügen mit zweiter Page dahinter
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

        // 📱 MOBILE-OPTIMIERUNG: Banner-Styling anpassen
        const popup = document.querySelector('.cc-window') as HTMLElement;
        if (popup) {
          popup.setAttribute('role', 'dialog');
          popup.setAttribute('aria-live', 'assertive');
          popup.setAttribute('aria-label', 'Cookie-Einwilligung');
          
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

          // 🎯 GLEICHE BUTTON-GRÖSSEN für faire UX
          setTimeout(() => {
            const allowButton = popup.querySelector('.cc-allow') as HTMLElement;
            const denyButton = popup.querySelector('.cc-deny') as HTMLElement;
            
            // BEIDE BUTTONS: Gleiche Größe, untereinander auf Mobile
            const buttonStyles = `
            padding: ${isMobile ? '1rem 1.5rem' : '0.75rem 1.5rem'} !important;
            border-radius: 8px !important;
            border: none !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            width: ${isMobile ? '100%' : 'auto'} !important;
            margin: ${isMobile ? '0 0 0.75rem 0' : '0 0.25rem'} !important;
            display: inline-block !important;
            text-align: center !important;
            min-width: ${isMobile ? 'auto' : '160px'} !important;
            box-sizing: border-box !important;
            flex: 1 !important; /* Gleiche Breite auf Mobile */
          `;

if (allowButton) {
  allowButton.style.cssText = buttonStyles + `
    background-color: #8B4513 !important;
    color: #ffffff !important;
    box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3) !important;
  `;
}

if (denyButton) {
  denyButton.style.cssText = buttonStyles + `
    background-color: #6c757d !important;
    color: #ffffff !important;
    box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3) !important;
  `;
}

            // Button Container anpassen
            const compliance = popup.querySelector('.cc-compliance') as HTMLElement;
            if (compliance) {
              compliance.style.cssText = `
                display: flex !important;
                ${isMobile ? 'flex-direction: column' : 'flex-direction: row'} !important;
                gap: 0.5rem !important;
                align-items: center !important;
                justify-content: center !important;
                margin-top: 1rem !important;
              `;
            }
          }, 100);
        }

        console.log('🍪 Banner opened');
      },

      onPopupClose: () => {
        // Cleanup: Overflow zurücksetzen
        document.body.style.overflow = '';
        console.log('🍪 Banner closed');
      },

      onStatusChange: (status: string) => {
        console.log(`🍪 Status changed: ${status}`);

        // Cleanup: Overflow zurücksetzen
        document.body.style.overflow = '';

        const granted = status === 'allow';
        setHasConsent(granted);

        // 📊 Track Cookie Banner Interaction (Vercel Analytics)
        if (typeof window !== 'undefined' && window.va) {
          window.va('track', granted ? 'cookie_accepted' : 'cookie_rejected', {
            source: 'cookie_banner'
          });
          console.log(`📊 Vercel Analytics: cookie_${granted ? 'accepted' : 'rejected'}`);
        }

        // Google Consent Mode v2 - Enhanced for @next/third-parties
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            ad_storage: granted ? 'granted' : 'denied',
            analytics_storage: granted ? 'granted' : 'denied',
            ad_user_data: granted ? 'granted' : 'denied',
            ad_personalization: granted ? 'granted' : 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
          });

          if (granted && GA_ID) {
            window.gtag('config', GA_ID, {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_expires: 63072000, // 2 years in seconds
              cookie_flags: 'SameSite=Lax;Secure',
            });
            console.log('📊 Enhanced GA4 tracking enabled');
          }
        }

        // DataFa.st Analytics - Only load after consent
        if (granted && typeof window !== 'undefined') {
          // Load DataFa.st script dynamically after consent
          if (!document.querySelector('[data-website-id="68d59a9dcb0e8d111148811a"]')) {
            const datafastScript = document.createElement('script');
            datafastScript.defer = true;
            datafastScript.setAttribute('data-website-id', '68d59a9dcb0e8d111148811a');
            datafastScript.setAttribute('data-domain', 'Pferdewert.de');
            datafastScript.src = 'https://datafa.st/js/script.js';
            document.head.appendChild(datafastScript);

            // Initialize datafast function
            window.datafast = window.datafast || function(...args) {
              window.datafast!.q = window.datafast!.q || [];
              window.datafast!.q.push(args);
            };

            console.log('📊 DataFa.st tracking enabled after consent');
          }
        }

        if (granted) {
          console.log('✅ Analytics enabled - User accepted cookies');
        } else {
          console.log('⚙️ Analytics disabled - User declined cookies');
        }

        // Banner sauber entfernen
        const popup = document.querySelector('.cc-window');
        popup?.remove();

        // Update document.cookie with proper flags
        document.cookie = `${CONSENT_COOKIE}=${status}; path=/; max-age=31536000; SameSite=Lax; Secure`;
      },
    });

    // Global function for re-opening banner
    window.showCookieSettings = () => {
      console.log('🍪 Reopening cookie banner');
      document.cookie = `${CONSENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      router.reload(); // Pages Router: reload() statt refresh()
    };

    console.log('🍪 SimpleCookieConsent initialized with mobile optimization');
  }, [setHasConsent, router]);

  /** useCallback verhindert Re-Creation bei jedem Render */
  const initCookieConsent = useCallback(() => {
    console.log('🍪 Cookie Script loaded');

    // Exit early if consent already exists (eigener Cookie-Name!)
    if (new RegExp(`${CONSENT_COOKIE}=(allow|deny)`).test(document.cookie)) {
      console.log('🍪 Consent already exists');
      return;
    }

    // Enhanced error handling with retry mechanism
    const cookieConsent = window.cookieconsent;
    if (!cookieConsent?.initialise) {
      console.error('❌ CookieConsent library not found - retrying in 100ms');
      setTimeout(() => {
        const retryConsent = window.cookieconsent;
        if (!retryConsent?.initialise) {
          console.error('❌ CookieConsent library failed to load after retry');
          return;
        }
        initCookieConsentConfig(retryConsent);
      }, 100);
      return;
    }

    initCookieConsentConfig(cookieConsent);
  }, [initCookieConsentConfig]);

  return (
    <>
      {/* ✅ LIGHTHOUSE OPTIMIZED: Use @next/third-parties for better performance */}
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
            console.log('🔒 Consent Mode v2 initialized');
          `}
        </Script>
      )}

      {/* ✅ LIGHTHOUSE OPTIMIZED: Modern Cookie Consent with CDN + source maps */}
      <Script
        src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={initCookieConsent}
        onError={() => {
          console.error('Failed to load cookieconsent from CDN, falling back to local');
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