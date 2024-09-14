/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./auth/src/**/*.{js,ts,jsx,tsx}",
    "./auth/components/**/*.{js,ts,jsx,tsx}",
    "./data/src/**/*.{js,ts,jsx,tsx}",
    "./data/components/**/*.{js,ts,jsx,tsx}",
    "./data/utils/**/*.{js,ts,jsx,tsx}",
    "./data/ui/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
