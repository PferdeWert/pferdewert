/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/pages/**/*.{js,ts,jsx,tsx}",
    "./frontend/components/**/*.{js,ts,jsx,tsx}",
    "./frontend/styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: "#4e463b",
          light: "#f8f8f6",
          accent: "#3068d6",
          green: "#406243",
          gold: "#f6c36a",
        },
      },
      fontSize: {
        base: ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
        h1: ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.2' }],
        h2: ['clamp(1.5rem, 4vw, 2.25rem)', { lineHeight: '1.3' }],
        h3: ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.4' }],
        button: ['clamp(0.95rem, 2vw, 1.125rem)', { letterSpacing: '0.02em' }],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: '0 2px 24px 0 rgb(78 70 59 / 10%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
