/* ------------------------------------------------------------------
 * Global Window-Typen – PferdeWert.de
 * ------------------------------------------------------------------
 * 1) CookieConsentInstance  – Methoden des Cookie-Banners
 * 2) gtag                   – Google Analytics 4 Wrapper
 * 3) showCookieSettings     – öffnet das Einstellungs-Modal jederzeit
 * ------------------------------------------------------------------ */

interface CookieConsentInstance {
  /** Banner initialisieren (wird vom Script aufgerufen) */
  initialise?: (config: Record<string, unknown>) => void;
  /** Consent-Status manuell setzen ("allow" | "deny") */
  setStatus: (status: string) => void;
  /** Banner schließen */
  close: () => void;
}

declare global {
  interface Window {
    /** Cookie Consent v3.1.1 API */
    cookieconsent: CookieConsentInstance;

    /** Google Analytics 4 – gtag Wrapper */
    gtag?: (
      command: string,
      actionOrId: string,
      parameters?: Record<string, unknown>
    ) => void;

    /** Öffnet das Cookie-Einstellungs-Dialogfenster */
    showCookieSettings: () => void;
  }
}

export {};
