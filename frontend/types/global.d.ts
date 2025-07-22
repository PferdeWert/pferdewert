// frontend/types/global.d.ts
declare global {
  interface Window {
    showCookieSettings?: () => void;
    gtag?: (command: string, action: string, config?: Record<string, unknown>) => void;
  }
}

export {};