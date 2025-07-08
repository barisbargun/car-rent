import rateLimit, { Options } from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes'

import { env } from './env'

const limiter = (limit: number) =>
  env.MODE === 'production' ? limit : Infinity

const options: Partial<Options> = {
  windowMs: 60 * 1000, // 1 minute
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  statusCode: StatusCodes.TOO_MANY_REQUESTS,
}

export const rateLimiter = rateLimit({
  ...options,
  limit: limiter(1000),
})

export const authLimiter = rateLimit({
  ...options,
  limit: limiter(10),
})
