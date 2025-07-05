// frontend/types/global.d.ts
export {};

declare global {
  interface Window {
    cookieconsent: Record<string, unknown>;
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export {};
