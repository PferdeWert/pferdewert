// frontend/types/global.d.ts
declare global {
  interface Window {
    cookieconsent: Record<string, unknown>;
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export {};