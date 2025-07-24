// frontend/components/SimpleCookieConsent.tsx
// Production-Ready: Verwendet BESTEHENDE Types aus global.d.ts

import { useCallback } from 'react';
import { useRouter } from 'next/router'; // Pages Router
import Script from 'next/script';

// WICHTIG: eigener Cookie-Name, damit wir nicht mit library-internen kollidieren
const CONSENT_COOKIE = 'pferdewert_cookie_consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID; // Google Analytics ID

const SimpleCookieConsent = () => {
  const router = useRouter();

  /** useCallback verhindert Re-Creation bei jedem Render */
  const initCookieConsent = useCallback(() => {
    console.log('🍪 Cookie Script loaded');

    // Exit early if consent already exists (eigener Cookie-Name!)
    if (new RegExp(`${CONSENT_COOKIE}=(allow|deny)`).test(document.cookie)) {
      console.log('🍪 Consent already exists');
      return;
    }

    // Check if cookieconsent is available (verwendet bestehenden Type!)
    const cookieConsent = window.cookieconsent;
    if (!cookieConsent?.initialise) {
      console.error('❌ CookieConsent library not found');
      return;
    }

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

        // Google Consent Mode v2 (verwendet bestehenden Type aus global.d.ts!)
        window.gtag?.('consent', 'update', {
          ad_storage: granted ? 'granted' : 'denied',
          analytics_storage: granted ? 'granted' : 'denied',
          ad_user_data: granted ? 'granted' : 'denied',
          ad_personalization: granted ? 'granted' : 'denied',
        });

    if (granted) {
      console.log('✅ Analytics enabled - User accepted cookies');
      const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (GA_ID) {
        window.gtag?.('config', GA_ID, {
          page_path: window.location.pathname,
          anonymize_ip: true,
        });
        console.log('📊 Page view sent to GA4');
      } else {
        console.warn('GA_ID is not defined, skipping gtag config.');
      }
    } else {
      console.log('⚙️ User chose settings - Analytics disabled');
    }

        // Banner sauber entfernen
        const popup = document.querySelector('.cc-window');
        popup?.remove();

        // Kein Reload nötig - Banner ist weg, Cookie gesetzt, Analytics updated
      },
    });

    // Global function for re-opening banner
    window.showCookieSettings = () => {
      console.log('🍪 Reopening cookie banner');
      document.cookie = `${CONSENT_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      router.reload(); // Pages Router: reload() statt refresh()
    };

    console.log('🍪 SimpleCookieConsent initialized with mobile optimization');
  }, [router]);

  return (
    <>
       {/* ✅ NEU: GA Scripts ZUERST laden */}
    {GA_ID && (
      <>
        <Script 
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Consent Mode v2: Standard = abgelehnt (DSGVO-konform)
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            
            gtag('config', '${GA_ID}');
            console.log('📊 Google Analytics loaded:', '${GA_ID}');
          `}
        </Script>
      </>
    )}

      {/* ✅ BESTEHEND: Cookie Script */}
      <Script
        src="/js/cookieconsent.min.js"
        strategy="afterInteractive"
        onLoad={initCookieConsent}
      />
    </>
  );
};

export default SimpleCookieConsent;