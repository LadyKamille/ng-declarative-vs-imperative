/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 10px 30px -10px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};
