/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'nav': '3.75rem',
        'nav-p': '16.25rem'
      },
      colors: {
        'nav-bg': 'rgba(255, 255, 255, 0.3)'
      }
    },
  },
  plugins: [],
}
