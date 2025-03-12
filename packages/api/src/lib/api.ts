import baseAxios, { AxiosResponse } from 'axios'

import { env } from '#api/config/env'

export const api = baseAxios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export type ApiResponse<T> = Promise<AxiosResponse<T>>
