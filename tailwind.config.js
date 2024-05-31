// tailwind.config.js
import('tailwindcss').Config
module.exports = {
  purge: {
    content: ['index.html','js/app.js'],
    options: {
      whitelist: ['customBlue', 'customRed', 'customGreen'],
    },
  },
  theme: {
    extend: {
      colors: {
        bg_green: '#B9FFBE',
        customRed: '#e74c3c',
        customGreen: '#2ecc71',
      },
    },
  },
  variants: {},
  plugins: [],
}
