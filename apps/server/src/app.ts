import { Router } from 'express'
import mongoose from 'mongoose'

import { handlers } from './handlers'
import { createServer } from './server'

const app = createServer()
const port = process.env.PORT || 3000
const router = Router()

for (const [path, handler] of handlers) {
  router.use('/' + path, handler)
}

app.use(router)

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error)
  throw new Error('MongoDB connection failed')
})

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server on port ${port}!`)
  })
})
