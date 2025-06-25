// frontend/types/global.d.ts
export {};

declare global {
  interface Window {
    cookieconsent: any;
    gtag?: (...args: any[]) => void;
  }
}
