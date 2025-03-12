import { config as baseConfig } from '@repo/eslint-config/react'

const config = [
  ...baseConfig,
  {
    files: ['src/assets/index.ts'],
    rules: {
      'simple-import-sort/imports': 'off',
    },
  },
]

export default config
