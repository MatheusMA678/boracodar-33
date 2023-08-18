/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: '"Roboto", sans-serif',
        title: '"Space Grotesk", sans-serif',
      },

      colors: {
        purple: {
          500: '#8860E6',
          600: '#5B409B',
        },

        gray: {
          900: '#202024',
          100: '#F3F4FE',
        },

        green: {
          500: '#04D361',
        },

        red: {
          500: '#FF8F8F',
        },
      },

      backgroundImage: {
        app: 'url(./src/assets/img-hero.png)',
        ticket: 'url(./src/assets/bg-card-ticket.png)',
      },
    },
  },
  plugins: [],
}
