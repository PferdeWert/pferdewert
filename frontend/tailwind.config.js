/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  // Enable JIT mode for smaller CSS bundles
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: "#4e463b",      // Dunkelbraun – Texte, Grundfarbe
          light: "#f8f8f6",        // Helles Beige – Flächen
          green: "#406243",        // Waldgrün – Akzent
          gold: "#f6c36a",         // Amber/Gold – Highlights
          brown: "#92400e",        // Haupt-CTA wie im Header
          brownDark: "#78350f",    // Hover-Variante
        },
      },
      fontSize: {
        base: ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
        h1: ['clamp(2.25rem, 5.5vw, 3.75rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.75rem, 4.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.35rem, 3vw, 2rem)', { lineHeight: '1.3' }],
        button: ['clamp(0.95rem, 2vw, 1.125rem)', { letterSpacing: '0.02em' }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 24px 0 rgb(78 70 59 / 10%)",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
