import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { StatusCodes } from 'http-status-codes'
import pino from 'pino-http'

import { corsOptionsDelegate } from './config/cors'
import { dbConnect } from './config/database-connect'
import { env } from './config/env'

export const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: env.MODE == 'production' ? 10 : Infinity,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
})

export const createServer = (): Express => {
  const app = express()
  app
    .disable('x-powered-by')
    .use(helmet())
    .use(limiter)
    .use(compression())
    // .use(pino())
    .use(cors(corsOptionsDelegate))
    .use(json({ limit: '2mb' }))
    .use(urlencoded({ extended: true }))
    .use(cookieParser())
    .use(dbConnect)
  return app
}
