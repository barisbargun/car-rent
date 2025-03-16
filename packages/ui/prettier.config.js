import config from '../../prettier.config.mjs'

/** @type {import('prettier').Config} */
export default {
  ...config,
  plugins: ['prettier-plugin-tailwindcss'],
}
