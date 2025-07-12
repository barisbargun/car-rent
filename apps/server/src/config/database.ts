import mongoose from 'mongoose'

import { env } from './env'

export const connectToDatabase = async () => {
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
    console.log('Successfully connected to MongoDB.')
  } catch (error) {
    console.error('Database connection failed:', error)
    throw new Error('MongoDB connection failed')
  }
}
