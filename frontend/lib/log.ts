// lib/log.ts

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

/**
 * Loggt allgemeine Informationen (nur Development).
 */
export const log = (...args: unknown[]) => {
  if (isDevelopment) console.log(...args);
};

/**
 * Loggt strukturierte Info-Nachrichten.
 * In Production: Nur für wichtige Events (Webhook, Payment, etc.)
 */
export const info = (...args: unknown[]) => {
  // In Production: Log wenn Message mit [WEBHOOK], [PAYMENT], [CRITICAL] startet
  if (isDevelopment) {
    console.info(...args);
  } else if (isProduction) {
    const firstArg = String(args[0] || '');
    if (firstArg.includes('[WEBHOOK]') ||
        firstArg.includes('[PAYMENT]') ||
        firstArg.includes('[CRITICAL]') ||
        firstArg.includes('[EMAIL]')) {
      console.info(...args);
    }
  }
};

/**
 * Loggt Warnungen (immer, auch in Production).
 */
export const warn = (...args: unknown[]) => {
  console.warn(...args);
};

/**
 * Loggt Fehler (immer, auch in Production).
 */
export const error = (...args: unknown[]) => {
  console.error(...args);
};
