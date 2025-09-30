// frontend/types/global.d.ts
declare global {
  interface Window {
    cookieconsent?: {
      initialise?: (config: Record<string, unknown>) => void;
    };
    showCookieSettings?: () => void;
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    datafast?: {
      q?: unknown[];
      (event: 'payment', data: { amount: number; currency: string; transaction_id: string }): void;
      (event: string, data?: Record<string, unknown>): void;
    };
  }
}

// OpenRouter Integration Types - 2-Stage System
export interface OpenRouterConfig {
  apiKey: string;
  baseUrl: string;
  models: {
    primary: string;
    fallback: string;
  };
  fallbackStrategy: 'sequential' | 'failover';
  timeout: number;
  retryAttempts: number;
}

export interface OpenRouterResponse {
  ai_response: string;
  ai_model: string;
  processing_time_ms: number;
  tokens_used?: number;
  fallback_used?: boolean;
  error?: string;
}

export interface PferdeWertEnvVars {
  // Core environment variables
  MONGODB_URI: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  BACKEND_URL: string;

  // OpenRouter environment variables - 2-Stage System
  OPENROUTER_API_KEY: string;
  PRIMARY_MODEL: string;
  FALLBACK_MODEL: string;
  SYSTEM_PROMPT: string;
}

export {};