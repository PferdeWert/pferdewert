// frontend/components/CookieConsent/types.ts

export interface CookieConsentPopup {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export interface CookieConsentInstance {
  initialise: (config: CookieConsentConfig) => CookieConsentPopup;
  hasAnswered: () => boolean;
  hasConsented: () => boolean;
  getStatus: () => string;
}

export interface CookieConsentConfig {
  type: "info" | "opt-in" | "opt-out";
  palette?: {
    popup?: { background: string; text: string };
    button?: { background: string; text: string };
  };
  theme?: "block" | "classic" | "edgeless";
  content: {
    header?: string;
    message: string;
    allow: string;
    deny: string;
    link?: string;
    href?: string;
  };
  elements?: {
    header?: string;
    message?: string;
    messagelink?: string;
    allow?: string;
    deny?: string;
    link?: string;
  };
  window?: string;
  compliance?: {
    [key: string]: string;
  };
  cookie: {
    name: string;
    path: string;
    expiryDays: number;
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
  };
  onPopupOpen?: () => void;
  onPopupClose?: () => void;
  onStatusChange?: (status: "allow" | "deny", hasConsented: boolean) => void;
}

// Erweitere das globale Window-Interface direkt
declare global {
  interface Window {
    cookieconsent: CookieConsentInstance;
    showCookieSettings?: () => void;
    gtag?: (command: string, action: string, config?: Record<string, unknown>) => void;
  }
}