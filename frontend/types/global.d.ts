// frontend/types/global.d.ts
declare global {
  interface Window {
    cookieconsent?: {
      initialise?: (config: Record<string, unknown>) => void;
    };
    showCookieSettings?: () => void;
    gtag?: (command: string, action: string, config?: Record<string, unknown>) => void;
  }
}

export {};