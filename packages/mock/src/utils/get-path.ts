import { apiPaths } from '#mock/config/api-paths'
import { envConfig } from '#mock/config/env'

type titles = keyof typeof apiPaths
const base = envConfig.API_URL

export const getPath = (path: titles) => {
  return `${base}/${apiPaths[path]}`
}
