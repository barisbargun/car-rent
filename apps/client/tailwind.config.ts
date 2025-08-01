import base from '@repo/ui/tailwind.config'
import { Config } from 'tailwindcss'

export default {
  content: base.content,
  theme: {
    container: {
      center: true,
      padding: '3rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'sans-serif'],
      },
      dropShadow: {
        black: '0 1.2px 1.2px rgba(0,0,0,1)',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        /* PAGE SPACE */
        '.page-top-space': { '@apply pt-6 lg:pt-8 xl:pt-10': {} },
        '.page-bottom-space': { '@apply pb-6 lg:pb-8 xl:pb-10': {} },
      })
    },
  ],
  presets: [base],
} as Config
