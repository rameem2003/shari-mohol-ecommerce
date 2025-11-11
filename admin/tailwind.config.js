/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B9DF8",
        secondary: "#2A8AF7",
        border: "#E5EAF2",
        text: "#777777",
      },
    },
  },
  plugins: [],
};
