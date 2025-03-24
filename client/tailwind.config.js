/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merry: ["Merriweather", "serif"],
        hambra: ["Hambra", "serif"],
      },
    },
  },
  plugins: [],
};
