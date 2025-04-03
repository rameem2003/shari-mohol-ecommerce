/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        merry: ["Merriweather", "serif"],
        hambra: ["Hambra", "serif"],
      },
      boxShadow: {
        custom: "0px 110px 500px rgba(0, 0, 0, 0.9)",
      },
    },
  },
  plugins: [],
};
