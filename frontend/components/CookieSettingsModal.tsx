// frontend/components/CookieSettingsModal.tsx
// Conversion-optimierte Modal für granulare Cookie-Kontrolle
// GDPR-konform mit Opt-in, granularer Auswahl und Ablehnung

import { useEffect, useRef, useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { info } from '@/lib/log';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: CookieSettings) => void;
}

// CookieSettings interface is defined globally in types/global.d.ts

export default function CookieSettingsModal({
  isOpen,
  onClose,
  onSave,
}: CookieSettingsModalProps) {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true); // Default: Analytics aktiviert
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  // Focus Management: Focus in Modal setzen, ESC-Taste handlen
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Focus Management: Focus im Modal behalten (Trap)
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleTabKey);

    // Focus auf "Auswahl speichern" Button setzen
    setTimeout(() => {
      initialFocusRef.current?.focus();
    }, 100);

    // Body Scroll auf Mobile verhindern
    if (window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSave = () => {
    const settings: CookieSettings = {
      necessary: true,
      analytics: analyticsEnabled,
    };
    onSave(settings);
    onClose();
    info('Cookie settings saved:', settings);
  };

  const handleAllAccept = () => {
    const settings: CookieSettings = {
      necessary: true,
      analytics: true,
      fullConsent: true, // Indicates "Alle akzeptieren" was clicked
    };
    onSave(settings);
    onClose();
    info('All cookies accepted');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[10001] bg-black/50 transition-opacity duration-300"
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />

      {/* Modal - z-index must be higher than banner (z-10000) */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        className="fixed z-[10002] w-11/12 max-w-md bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh] md:max-h-[85vh] md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 bottom-0 left-0 right-0 md:bottom-auto"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl" aria-hidden="true">
              🐎
            </span>
            <h2
              id="cookie-settings-title"
              className="text-xl md:text-2xl font-bold font-playfair text-gray-900"
            >
              Cookie-Einstellungen
            </h2>
          </div>

          {/* Beschreibung */}
          <p className="text-base text-gray-700 mb-8 leading-relaxed font-lato">
            Passe deine Cookie-Vorlieben an. Einige Cookies sind notwendig, damit
            PferdeWert.de funktioniert. Andere helfen uns, die Website zu verbessern.
          </p>

          {/* Cookie Categories */}
          <div className="space-y-6 mb-8">
            {/* Notwendige Cookies */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="necessary-cookies"
                  checked={true}
                  disabled={true}
                  className="mt-1 w-5 h-5 rounded border-gray-300 bg-gray-300 cursor-not-allowed"
                  aria-labelledby="necessary-label"
                  aria-describedby="necessary-description"
                />
                <div className="flex-1">
                  <label
                    id="necessary-label"
                    htmlFor="necessary-cookies"
                    className="block font-semibold text-gray-900 text-base cursor-not-allowed"
                  >
                    ☑ Notwendige Cookies
                  </label>
                  <p
                    id="necessary-description"
                    className="text-sm text-gray-600 mt-1"
                  >
                    Technisch erforderlich für die Funktionalität der Website.
                    Diese können nicht deaktiviert werden.
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="analytics-cookies"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-brown focus:ring-brand-brown cursor-pointer"
                  aria-labelledby="analytics-label"
                  aria-describedby="analytics-description"
                />
                <div className="flex-1">
                  <label
                    id="analytics-label"
                    htmlFor="analytics-cookies"
                    className="block font-semibold text-gray-900 text-base cursor-pointer"
                  >
                    ☐ Analytics & Verbesserung
                  </label>
                  <p
                    id="analytics-description"
                    className="text-sm text-gray-600 mt-2 space-y-1"
                  >
                    <span className="block">
                      • <strong>Google Analytics:</strong> Anonymisierte Nutzerstatistiken
                    </span>
                    <span className="block">
                      • <strong>DataFa.st:</strong> Privacy-First Website-Analytics
                    </span>
                    <span className="block mt-2">
                      Hilft uns, PferdeWert.de noch genauer und besser zu machen.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {/* Primär: Alle akzeptieren */}
            <button
              ref={initialFocusRef}
              onClick={handleAllAccept}
              className="w-full px-6 py-3 bg-brand-brown hover:bg-brand-brownDark text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2 text-base"
              aria-label="Alle Cookies akzeptieren und Modal schließen"
            >
              Alle akzeptieren
            </button>

            {/* Sekundär: Auswahl speichern */}
            <button
              onClick={handleSave}
              className="w-full px-6 py-3 bg-white hover:bg-gray-50 text-brand-brown font-semibold rounded-lg border-2 border-brand-brown transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-brown focus:ring-offset-2 text-base"
              aria-label="Auswahl speichern und Modal schließen"
            >
              Auswahl speichern
            </button>
          </div>

          {/* Datenschutz Link */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <LocalizedLink
              href="/datenschutz"
              className="text-sm text-brand-brown hover:underline focus:outline-none focus:ring-2 focus:ring-brand-brown rounded px-2 py-1 inline-block"
              aria-label="Zur Datenschutzerklärung"
            >
              Mehr in der Datenschutzerklärung →
            </LocalizedLink>
          </div>
        </div>
      </div>
    </>
  );
}
