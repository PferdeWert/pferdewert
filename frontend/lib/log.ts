// lib/log.ts
const debug = process.env.NODE_ENV === "development";

export const log = (...args: any[]) => {
  if (debug) console.log(...args);
};

export const info = (...args: any[]) => {
  if (debug) console.info(...args); // <–– fehlte
};

export const warn = (...args: any[]) => {
  if (debug) console.warn(...args);
};

export const error = (...args: any[]) => {
  if (debug) console.error(...args);
};
