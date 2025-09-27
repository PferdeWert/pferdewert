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
      (...args: unknown[]): void;
    };
  }
}

// OpenRouter Integration Types
export interface OpenRouterConfig {
  apiKey: string;
  baseUrl: string;
  models: {
    primary: string;
    secondary: string;
    tertiary: string;
    emergency: string;
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
  // Existing environment variables
  MONGODB_URI: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  BACKEND_URL: string;

  // New OpenRouter environment variables
  OPENROUTER_API_KEY: string;
  OPENROUTER_BASE_URL: string;
  OPENROUTER_PRIMARY_MODEL: string;
  OPENROUTER_SECONDARY_MODEL: string;
  OPENROUTER_TERTIARY_MODEL: string;
  OPENROUTER_EMERGENCY_MODEL: string;
  OPENROUTER_TIMEOUT: string;
  OPENROUTER_RETRY_ATTEMPTS: string;
}

export {};