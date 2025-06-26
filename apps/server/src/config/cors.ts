/* eslint-disable unicorn/no-null */
import { type CorsOptions } from 'cors'
import { type Request } from 'express'

import { env } from './env'

const adminAllowedMethods = ['GET', 'POST', 'PATCH', 'DELETE']
const clientAllowedMethods = ['GET']

export const corsOptionsDelegate = (
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) => {
  const requestedMethod =
    req.header('Access-Control-Request-Method') || req.method

  const origin = req.header('Origin')

  let options: CorsOptions
  const baseOptions: Omit<CorsOptions, 'origin' | 'methods'> = {
    credentials: true,
    optionsSuccessStatus: 200,
  }

  // Admin check
  if (
    origin === env.ADMIN_URL &&
    adminAllowedMethods.includes(requestedMethod)
  ) {
    options = {
      ...baseOptions,
      origin: true,
      methods: adminAllowedMethods,
    }
    callback(null, options)
  }
  // Client check
  else if (
    origin === env.CLIENT_URL &&
    clientAllowedMethods.includes(requestedMethod)
  ) {
    options = {
      ...baseOptions,
      origin: true,
      methods: clientAllowedMethods,
    }
    callback(null, options)
  }
  // Fallback for other origins
  else callback(new Error('Not allowed by CORS'))
}
