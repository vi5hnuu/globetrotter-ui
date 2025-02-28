/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s linear",
      },
      keyframes: {
        fadeIn: {
          "0%": {opacity: "0"},
          "100%": {opacity: "1"}
        }
      },
    },
  },
  plugins: [],
}

