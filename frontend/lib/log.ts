// lib/log.ts

const debug = process.env.NODE_ENV === "development";

/**
 * Loggt in der Entwicklung allgemeine Informationen.
 */
export const log = (...args: unknown[]) => {
  if (debug) console.log(...args);
};

/**
 * Loggt in der Entwicklung strukturierte Info-Nachrichten.
 */
export const info = (...args: unknown[]) => {
  if (debug) console.info(...args);
};

/**
 * Loggt in der Entwicklung Warnungen.
 */
export const warn = (...args: unknown[]) => {
  if (debug) console.warn(...args);
};

/**
 * Loggt in der Entwicklung Fehler.
 */
export const error = (...args: unknown[]) => {
  if (debug) console.error(...args);
};
