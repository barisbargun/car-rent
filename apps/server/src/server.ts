import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import helmet from 'helmet'
import pino from 'pino-http'

import { corsOptionsDelegate } from './config/cors'
import { dbConnect } from './config/database-connect'
import { rateLimiter } from './config/rate-limiter'

export const createServer = (): Express => {
  const app = express()
  app
    .disable('x-powered-by')
    .use(helmet())
    .use(rateLimiter)
    .use(compression())
    .use(pino())
    .use(cors(corsOptionsDelegate))
    .use(json({ limit: '2mb' }))
    .use(urlencoded({ extended: true }))
    .use(cookieParser())
    .use(dbConnect)
  return app
}
