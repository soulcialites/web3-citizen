/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './stories/*'],
  purge: {
    enabled: false,
    content: ['./src/**/*.{js,jsx,ts,tsx}']
  },
  plugins: [],
}
