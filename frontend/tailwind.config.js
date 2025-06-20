/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",       // Next.js Pages Directory
    "./components/**/*.{js,ts,jsx,tsx}",  // Eigene Komponenten
    "./app/**/*.{js,ts,jsx,tsx}",         // Falls du den neuen /app-Dir verwendest
    "./styles/**/*.{js,ts,jsx,tsx,css}"   // Optional: falls du z.B. globale Styles hast
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      fontSize: {
        base: [
          'clamp(1rem, 1.5vw, 1.125rem)',
          { lineHeight: '1.6' }
        ],
        h1: [
          'clamp(2rem, 5vw, 3rem)',
          { lineHeight: '1.2' }
        ],
        h2: [
          'clamp(1.5rem, 4vw, 2.25rem)',
          { lineHeight: '1.3' }
        ],
        h3: [
          'clamp(1.25rem, 3vw, 1.75rem)',
          { lineHeight: '1.4' }
        ],
        button: [
          'clamp(0.875rem, 1.5vw, 1.125rem)',
          { letterSpacing: '0.02em' }
        ],
      },
    },
  },
  plugins: [],
}
