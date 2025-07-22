// frontend/components/SimpleCookieConsent.tsx
// Einfach, funktional, ohne TypeScript-Probleme

import Script from 'next/script';

const SimpleCookieConsent = () => {
  const initCookieConsent = () => {
    console.log('🍪 Cookie Script loaded');

    // Exit early if consent already exists
    if (/cookieconsent_status=(allow|deny)/.test(document.cookie)) {
      console.log('🍪 Consent already exists');
      return;
    }

    // Check if cookieconsent is available
    const cookieConsent = window.cookieconsent;
    if (!cookieConsent?.initialise) {
      console.error('❌ CookieConsent library not found');
      return;
    }

    // Simple working configuration - no custom elements!
    cookieConsent.initialise({
      type: 'opt-in',
      
      palette: {
        popup: { background: '#ffffff', text: '#333333' },
        button: { background: '#007bff', text: '#ffffff' },
      },
      
      position: 'bottom',
      theme: 'classic',
      
      content: {
        message: 'Diese Website verwendet Cookies für eine bessere Nutzererfahrung und zur Analyse.',
        allow: '✅ Alle akzeptieren',
        deny: '⚙️ Einstellungen',
        link: 'Datenschutz',
        href: '/datenschutz',
      },

      cookie: {
        name: 'cookieconsent_status',
        path: '/',
        expiryDays: 365,
        sameSite: 'Lax',
        secure: true,
      },

      onPopupOpen: () => {
        // Mobile: Prevent body scroll
        if (window.innerWidth < 768) {
          document.body.style.overflow = 'hidden';
        }
        console.log('🍪 Banner opened');
      },

      onPopupClose: () => {
        document.body.style.overflow = '';
        console.log('🍪 Banner closed');
      },

      onStatusChange: (status: string) => {
        console.log('🍪 Status changed:', status);
        document.body.style.overflow = '';

        // Hide banner immediately
        const popup = document.querySelector('.cc-window') as HTMLElement;
        if (popup) {
          popup.style.display = 'none';
        }

        const granted = status === 'allow';

        // Google Consent Mode
        if (window.gtag) {
          window.gtag('consent', 'update', {
            ad_storage: granted ? 'granted' : 'denied',
            analytics_storage: granted ? 'granted' : 'denied',
            ad_user_data: granted ? 'granted' : 'denied',
            ad_personalization: granted ? 'granted' : 'denied',
          });
        }

        if (granted) {
          console.log('✅ Analytics enabled');
        } else {
          console.log('❌ User chose settings (will redirect)');
          // "Einstellungen" redirects to privacy page
          setTimeout(() => {
            window.open('/datenschutz', '_blank');
          }, 500);
        }
      },
    });

    // Global function for re-opening banner
    window.showCookieSettings = () => {
      console.log('🍪 Reopening cookie banner');
      document.cookie = 'cookieconsent_status=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      location.reload();
    };

    console.log('🍪 SimpleCookieConsent initialized');
  };

  return (
    <Script
      src="/js/cookieconsent.min.js"
      strategy="afterInteractive"
      onLoad={initCookieConsent}
    />
  );
};

export default SimpleCookieConsent;