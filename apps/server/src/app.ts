import { Router } from 'express'

import { initializeCache } from './config/cache'
import { connectToDatabase } from './config/database'
import { handlers } from './handlers'
import { createServer } from './server'

const startServer = async () => {
  await connectToDatabase()
  await initializeCache()

  const app = createServer()
  const port = process.env.PORT || 3000
  const router = Router()

  for (const [path, handler] of handlers) {
    router.use('/' + path, handler)
  }

  app.use(router)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  })
}

startServer()
