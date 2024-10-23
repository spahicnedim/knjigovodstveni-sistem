/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "default-blue": "#023E8A",
      },
      fontFamily: {
        sans: ['YourCustomFont', 'Arial', 'sans-serif'], // Definirajte vaš font
      },
      purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    },
  },
  plugins: [],
};
