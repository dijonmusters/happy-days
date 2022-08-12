/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          lg: "1250px",
          xl: "1124px",
          "2xl": "1124px",
        },
      },
    },
  },
  plugins: [],
};
