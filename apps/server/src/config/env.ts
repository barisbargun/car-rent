import 'dotenv/config'

import { zodCheckEnvSchema } from '@repo/utils/schema'
import { z } from 'zod'

const schema = z.object({
  MODE: z.enum(['development', 'production', 'test']),
  ADMIN_URL: z.string().url(),
  CLIENT_URL: z.string().url(),
  ACCESS_TOKEN_SECRET: z.string().min(10),
  REFRESH_TOKEN_SECRET: z.string().min(10),
  CLOUDINARY_URL: z.string().min(10),
  MONGO_URI: z.string().min(10),
})

export const env = zodCheckEnvSchema(process.env, schema)
