/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF2E8',
          100: '#FFDCC4',
          200: '#FFB891',
          300: '#FF955E',
          400: '#FF722B',
          500: '#FF5000', // Taobao Orange
          600: '#DB3D00',
          700: '#B72D00',
          800: '#932000',
          900: '#7A1800',
        },
        accent: {
          DEFAULT: '#FF0036', // Taobao Red/Pink
          hover: '#DE002F',
          light: '#FFE5EC'
        },
        taobao: {
          bg: '#F4F4F4',
          yellow: '#FF9100' // Secondary action
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      }
    },
  },
  plugins: [],
}
