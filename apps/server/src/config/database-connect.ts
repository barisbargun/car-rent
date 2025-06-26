import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import { env } from './env'

export const dbConnect = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  mongoose.set('strictQuery', true)
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (_document, converted) => {
      delete converted.id
    },
  })
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: 'car_rent',
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    })

    next()
  } catch (error) {
    req.log.error(`Database connection error: ${error}`)
  }
}
