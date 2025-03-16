import { parseEnv } from '@repo/utils/env'
import * as z from 'zod'

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string().default('http://localhost:3000'),
  })
  return parseEnv<typeof EnvSchema>(EnvSchema)
}

export const env = createEnv()
