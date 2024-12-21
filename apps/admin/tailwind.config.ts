import type { Config } from 'tailwindcss'
import base from '@repo/ui/tailwind.config'

export default {
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1450px'
      }
    },
    extend: {
      width: {
        sideNav: '164px'
      },
      screens: {
        desktop: '1200px'
      },
      padding: {
        adminLayout: '2rem'
      },
      colors: {
        orange: '#EA580C',
        textColor: '#181818'
      },
      maxWidth: {
        navWidth: '1024px',
        pageWidth: '920px',
        screen: '100vh'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'sans-serif']
      },
      boxShadow: {
        login: '0 35px 120px -15px #211e35',
        button: '0 0 60px 30px #111',
        icon: '0 0 20px 5px var(--background)'
      }
    }
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.shadowCard': { '@apply shadow-md dark:shadow-card': {} },

        /* PAGE SPACE */
        '.content-space': { '@apply mt-8 lg:mt-12 xl:mt-16': {} },
        '.content-space-lg': { '@apply mt-12 lg:mt-16 xl:mt-20': {} }
      })
    }
  ],
  presets: [base]
} satisfies Omit<Config, "content">
