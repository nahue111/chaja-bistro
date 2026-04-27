/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF7F0',
          200: '#F5EFE0',
          300: '#EDE0C8',
        },
        espresso: {
          900: '#1A0E06',
          800: '#2C1A0E',
          700: '#3D2714',
          600: '#5C3D20',
          500: '#7A5230',
        },
        amber: {
          DEFAULT: '#C8860A',
          light: '#E4A831',
          dark: '#9A6408',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
