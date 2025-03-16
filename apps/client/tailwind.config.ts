import base from '@repo/ui/tailwind.config'
import type { Config } from 'tailwindcss'

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
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'sans-serif'],
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
} satisfies Omit<Config, 'content'>
