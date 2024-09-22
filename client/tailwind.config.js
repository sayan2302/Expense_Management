/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'zero': '0px', // Extra small devices (mobile)
      'phone': '500px', // Small devices (>= 500px)
      // Other breakpoints...
    },
  },
  plugins: [],
}