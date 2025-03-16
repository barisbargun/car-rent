import { API_PATHS } from '@repo/api/config/api-paths'

import { env } from '#mock/config/env'

type titles = keyof typeof API_PATHS
const base = env.API_URL

export const getPath = (path: titles) => {
  return `${base}/${API_PATHS[path]}`
}
