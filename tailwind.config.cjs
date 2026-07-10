module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: '#0A4D8C', aqua: '#00B4D8', amber: '#F4A261', success: '#2A9D8F', danger: '#E63946'
      },
      fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Manrope', 'sans-serif'] },
    },
  },
  plugins: [],
}
