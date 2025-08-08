import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import helmet from 'helmet'
import pino from 'pino-http'

import { corsOptionsDelegate } from './config/cors'
import { rateLimiter } from './config/rate-limiter'

export const createServer = (): Express => {
  const app = express()
  app
    .set('trust proxy', true)
    .disable('x-powered-by')
    .use(helmet())
    .use(rateLimiter)
    .get('/health', (_req, res) => {
      res.sendStatus(200)
    })
    .use(compression())
    .use(pino())
    .use(cors(corsOptionsDelegate))
    .use(json({ limit: '2mb' }))
    .use(urlencoded({ extended: true }))
    .use(cookieParser())
  return app
}
