import base from '@repo/ui/tailwind.config'
import type { Config } from 'tailwindcss'

export default {
  theme: {
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
        '.card-buttons': { '@apply origin-top-right scale-75': {} },
        '.items-gap': { '@apply gap-6 lg:gap-4': {} },
        '.center-x-absolute': {
          '@apply absolute left-1/2 -translate-x-1/2': {},
        },
      })
    },
  ],
  presets: [base],
} satisfies Omit<Config, 'content'>
