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
        header: 'PferdeWert.de bittet um Einwilligung, Ihre personenbezogenen Daten für Folgendes zu nutzen:',
        message: `
          <div class="consent-purposes">
            <div class="purpose-item">
              <div class="purpose-icon">👤</div>
              <div>
                <strong>Personalisierte Werbung und Inhalte</strong><br>
                Messung von Werbeleistung und Performance von Inhalten,
                Zielgruppenforschung sowie Entwicklung und Verbesserung von Angeboten
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">💾</div>
              <div>
                <strong>Speichern von oder Zugriff auf Informationen auf einem Endgerät</strong>
              </div>
            </div>
            <div class="purpose-item">
              <div class="purpose-icon">⚙️</div>
              <div>
                <strong>Weitere Informationen</strong>
              </div>
            </div>
          </div>
        `,
        allow: 'Einwilligen',
        deny: 'Optionen verwalten',
        link: 'Mehr erfahren',
        href: '/datenschutz',
      },
      elements: {
        header: '<div class="cc-header">{{header}}</div>',
        message: '<div class="cc-message">{{message}}</div>',
        messagelink: '<div class="cc-message">{{message}}</div>',
        allow: '<button class="cc-btn cc-allow">{{allow}}</button>',
        deny: '<button class="cc-btn cc-deny" onclick="showCookieSettings()">{{deny}}</button>',
        link: '<a class="cc-link" href="{{href}}" target="_blank" rel="noopener">{{link}}</a>',
      },
      window: `
        <div role="dialog" aria-live="polite" aria-label="cookieconsent" class="cc-window {{classes}}">
          <div class="cc-logo">
            <img src="/logo.png" alt="PferdeWert Logo" />
          </div>
          {{children}}
        </div>
      `,
      compliance: {
        'opt-in': '<div class="cc-compliance">{{deny}}{{allow}}</div>',
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
    const popupInstance = window.cookieconsent.initialise(config);
    popupInstanceRef.current = popupInstance;

    // showCookieSettings mit der echten Instanz verknüpfen
    window.showCookieSettings = () => {
      console.log('🍪 Cookie-Einstellungen öffnen');
      popupInstance.open();
    };

    console.log('🍪 CookieConsent initialisiert');
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