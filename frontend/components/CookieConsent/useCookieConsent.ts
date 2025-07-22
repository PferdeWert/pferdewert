// frontend/components/CookieConsent/hooks/useCookieConsent.ts
import { useState, useEffect, useCallback } from 'react';

export type CookieStatus = 'pending' | 'allow' | 'deny' | null;

export interface UseCookieConsentReturn {
  status: CookieStatus;
  hasConsented: boolean;
  hasAnalytics: boolean;
  showCookieSettings: () => void;
  resetConsent: () => void;
  isLoading: boolean;
}

/**
 * Custom Hook für Cookie-Consent-Management
 * Bietet einfache API zum Abfragen und Steuern des Cookie-Consent-Status
 */
export const useCookieConsent = (): UseCookieConsentReturn => {
  const [status, setStatus] = useState<CookieStatus>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cookie-Status aus dem Browser lesen
  const getCookieStatus = useCallback((): CookieStatus => {
    if (typeof document === 'undefined') return null;
    
    const cookieMatch = document.cookie.match(/cookieconsent_status=([^;]+)/);
    if (!cookieMatch) return 'pending';
    
    const value = cookieMatch[1];
    return value === 'allow' || value === 'deny' ? value : 'pending';
  }, []);

  // Status initial laden und bei Cookie-Änderungen aktualisieren
  useEffect(() => {
    const updateStatus = () => {
      const currentStatus = getCookieStatus();
      setStatus(currentStatus);
      setIsLoading(false);
    };

    // Initial laden
    updateStatus();

    // Cookie-Änderungen überwachen (falls Cookie manuell geändert wird)
    const interval = setInterval(updateStatus, 1000);

    // Storage-Events überwachen (für Cross-Tab-Sync)
    const handleStorageChange = () => updateStatus();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [getCookieStatus]);

  // Cookie-Einstellungen anzeigen
  const showCookieSettings = useCallback(() => {
    if (window.showCookieSettings) {
      window.showCookieSettings();
    } else {
      console.warn('showCookieSettings not available - Cookie banner not loaded?');
    }
  }, []);

  // Consent zurücksetzen (Cookie löschen)
  const resetConsent = useCallback(() => {
    document.cookie = 'cookieconsent_status=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    setStatus('pending');
    
    // Seite neu laden um Cookie-Banner wieder anzuzeigen
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, []);

  // Abgeleitete Werte berechnen
  const hasConsented = status === 'allow' || status === 'deny';
  const hasAnalytics = status === 'allow';

  return {
    status,
    hasConsented,
    hasAnalytics,
    showCookieSettings,
    resetConsent,
    isLoading,
  };
};