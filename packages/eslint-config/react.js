import { config as baseConfig } from './base.js'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

export const config = [
  {
    files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: { react: { version: 'detect' } },
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      react
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: true
        }
      ],

      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/heading-has-content': 'off'
    }
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    }
  },
  ...baseConfig
]
