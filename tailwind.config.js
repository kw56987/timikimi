/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'nav': '3.75rem',
        'nav-p': '16.25rem',
        'tag-w': '7.875rem',
        'tag-h': '3.125rem',
        'toast-h': '4.5rem',
        'toast-t': '5.313rem',
        'wallet-select-w': '40rem',
        'custom-w-100': '6.25rem'
      },
      colors: {
        'nav-bg': 'rgba(255, 255, 255, 0.3)',
        'orange-100': '#FF6E25',
        'orange-200': '#FB972F',
        'orange-300': '#FE2727',
        'tag-bg': 'rgba(255, 110, 37, 0.1)',
        'green-100': '#E5FB2F',
        'green-200': '#2ED614',
        'f-black': '#2d2826',
        'custom-100': '#F0F9FD',
        'custom-200': '#82A0F8',
        'custom-300': '#FFF1EA',
        'custom-400': '#FF7127',
        'custom-500': '#FFF6DA',
        'custom-600': 'rgba(255, 110, 37, 0.3)',
        'custom-700': 'rgba(0, 0, 0, 0.7)'
      },
      borderRadius: {
        'btn-r': '0.625rem',
        'toast-r': '0.875rem'
      },
      boxShadow: {
        'dot-shadow': '0 2px 4px 0 rgba(109,255,84,0.50)',
        'dot-shadow-100': '0 2px 4px 0 rgba(109,255,84,0.50)'
      }
    },
  },
  plugins: [],
}
