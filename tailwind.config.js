/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#006266",
      },
      fontFamily: {
        abril: ["Abril Fatface"],
      },
    },
  },
  plugins: [],
};
