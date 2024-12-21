import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const env = {
  CLIENT_URL: process.env.CLIENT_URL!,
  ADMIN_URL: process.env.ADMIN_URL!,
  REDIS_URL: process.env.REDIS_URL!,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  CLOUD_NAME: process.env.CLOUD_NAME!,
  API_KEY: process.env.API_KEY!,
  API_SECRET: process.env.API_SECRET!,
  MONGO_URI: process.env.MONGO_URI!
}
