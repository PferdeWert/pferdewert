/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",       // Next.js Pages Directory
    "./components/**/*.{js,ts,jsx,tsx}",  // Eigene Komponenten
    "./app/**/*.{js,ts,jsx,tsx}",         // Falls du den neuen /app-Dir verwendest
    "./styles/**/*.{js,ts,jsx,tsx,css}",  // Optionale Styles
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: "#4e463b",      // Dunkelbraun – Primärfarbe
          light: "#f8f8f6",        // Helles Beige – Flächen
          accent: "#3068d6",       // Modernes Blau – Buttons/Links
          green: "#406243",        // Waldgrün – optionaler Akzent
          gold: "#f6c36a",         // Amber/Gold – Highlights
        },
      },
      fontSize: {
        base: [
          'clamp(1rem, 1.5vw, 1.125rem)',  // 16–18px
          { lineHeight: '1.6' }
        ],
        h1: [
          'clamp(2rem, 5vw, 3rem)',        // 32–48px
          { lineHeight: '1.2' }
        ],
        h2: [
          'clamp(1.5rem, 4vw, 2.25rem)',   // 24–36px
          { lineHeight: '1.3' }
        ],
        h3: [
          'clamp(1.25rem, 3vw, 1.75rem)',  // 20–28px
          { lineHeight: '1.4' }
        ],
        button: [
          'clamp(0.95rem, 2vw, 1.125rem)', // 15–18px
          { letterSpacing: '0.02em' }
        ],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        'soft': '0 2px 24px 0 rgb(78 70 59 / 10%)', // Soft-shadow in Brand-Farbe
      },
    },
  },
  plugins: [],
};
