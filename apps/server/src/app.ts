import express from 'express'
import logger from 'pino-http'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(logger())

app.get('/', (_req: any, res: any) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
