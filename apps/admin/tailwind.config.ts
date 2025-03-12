import type { Config } from 'tailwindcss'
import base from '@repo/ui/tailwind.config'

export default {
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      width: {
        sideNav: '164px',
      },
      screens: {
        desktop: '1200px',
      },
      padding: {
        adminLayout: '2rem',
      },
      colors: {
        orange: '#EA580C',
      },
      maxWidth: {
        navWidth: '1024px',
        pageWidth: '920px',
        screen: '100vh',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'sans-serif'],
      },
      boxShadow: {
        login: '0 35px 120px -15px #211e35',
        button: '0 0 60px 30px #111',
        icon: '0 0 20px 5px var(--background)',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.shadowCard': { '@apply shadow-md dark:shadow-card': {} },

        /* PAGE SPACE */
        '.page-top-space': { '@apply pt-6 lg:pt-8 xl:pt-10': {} },
        '.page-bottom-space': { '@apply pb-6 lg:pb-8 xl:pb-10': {} },
      })
    },
  ],
  presets: [base],
} satisfies Omit<Config, 'content'>
