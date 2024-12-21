import baseAxios from 'axios'

import { env } from '@/config/env'

export const api = baseAxios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
