import { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import { env } from './env'

export const databaseConnect = async (
  _request?: Request,
  _response?: Response,
  next?: NextFunction
) => {
  mongoose.set('strictQuery', true)
  mongoose.set('toJSON', {
    virtuals: true,
    transform: (_document, converted) => {
      delete converted._id
    }
  })
  try {
    await mongoose.connect(env.MONGO_URI, {
      dbName: 'car_rent'
    })
    if (next) next()
  } catch (error) {
    console.log(error)
  }
}
