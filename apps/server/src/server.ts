import cors from 'cors'
import express, { type Express, json, urlencoded } from 'express'
import morgan from 'morgan'

export const createServer = (): Express => {
  const app = express()
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
  return app
}
