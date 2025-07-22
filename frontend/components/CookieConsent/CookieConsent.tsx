// frontend/components/CookieConsent/CookieConsent.tsx
import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import { CookieConsentConfig, CookieConsentPopup } from './types';

export interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
  autoLoad?: boolean;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline,
  autoLoad = true,
}) => {
  const popupInstanceRef = useRef<CookieConsentPopup | null>(null);

  // Stelle showCookieSettings global zur Verfügung
  useEffect(() => {
    window.showCookieSettings = () => {
      if (popupInstanceRef.current) {
        console.log('🍪 Cookie-Einstellungen öffnen via Popup-Instanz');
        popupInstanceRef.current.open();
      } else {
        console.warn('🍪 Cookie-Dialog noch nicht geladen – reloading...');
        location.reload();
      }
    };

    // Cleanup
    return () => {
      if (window.showCookieSettings) {
        delete window.showCookieSettings;
      }
    };
  }, []);

  const initializeCookieConsent = () => {
    console.log('📥 CookieConsent Script geladen:', typeof window.cookieconsent);

    // Früh exitieren, falls Consent-Cookie bereits existiert
    if (/cookieconsent_status=(allow|deny)/.test(document.cookie)) {
      console.log('🍪 Consent bereits vorhanden – Initialisierung übersprungen');
      return;
    }

    if (!window.cookieconsent?.initialise) {
      console.error('❌ CookieConsent nicht gefunden');
      return;
    }

    const config: CookieConsentConfig = {
      type: 'opt-in',
      palette: {
        popup: { background: '#ffffff', text: '#000000' },
        button: { background: '#4285f4', text: '#ffffff' },
      },
      theme: 'classic',
      content: {
        message: 'Wir verwenden Cookies für eine bessere Nutzererfahrung und Analyse.',
        allow: 'Einwilligen',
        deny: 'Alle ablehnen',
        link: 'Mehr erfahren',
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
        document
          .querySelector<HTMLElement>('.cc-window')
          ?.setAttribute('aria-live', 'assertive');
        document.body.style.overflow = 'hidden';
        console.log('🍪 Banner geöffnet');
      },
      onPopupClose: () => {
        document.body.style.overflow = '';
        console.log('🍪 Banner geschlossen');
      },
      onStatusChange: (status: 'allow' | 'deny') => {
        console.log('🍪 Status geändert:', status);
        document.body.style.overflow = '';

        // Banner manuell schließen/verstecken
        const popup = document.querySelector('.cc-window') as HTMLElement;
        if (popup) {
          popup.style.display = 'none';
          // Oder komplett entfernen:
          // popup.remove();
        }

        const granted = status === 'allow';
        
        // Google Consent Mode v2 Update
        window.gtag?.('consent', 'update', {
          ad_storage: granted ? 'granted' : 'denied',
          analytics_storage: granted ? 'granted' : 'denied',
          ad_user_data: granted ? 'granted' : 'denied',
          ad_personalization: granted ? 'granted' : 'denied',
        });

        // Callback-Funktionen aufrufen
        if (granted) {
          onAccept?.();
        } else {
          onDecline?.();
        }
      },
    };

    // Cookie-Consent initialisieren und Instanz speichern
    console.log('🍪 Initialisiere CookieConsent...');
    const popupInstance = window.cookieconsent.initialise(config);
    popupInstanceRef.current = popupInstance;

    // showCookieSettings mit der echten Instanz verknüpfen
    window.showCookieSettings = () => {
      console.log('🍪 Cookie-Einstellungen öffnen');
      if (popupInstanceRef.current) {
        popupInstanceRef.current.open();
      } else {
        console.warn('🍪 Popup-Instanz nicht verfügbar');
      }
    };

    console.log('🍪 CookieConsent initialisiert', popupInstance);
  };

  if (!autoLoad) {
    return null;
  }

  return (
    <Script
      src="/js/cookieconsent.min.js"
      strategy="afterInteractive"
      onLoad={initializeCookieConsent}
    />
  );
};

export default CookieConsent;