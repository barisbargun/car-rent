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

mongoose.connection.once('open', () => {
  console.log('connected to mongoDB')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
