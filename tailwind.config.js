/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{tsx,jsx,js,ts}',
    './pages/**/*.{tsx,jsx,js,ts}',
    './components/**/*.{tsx,jsx,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
}
