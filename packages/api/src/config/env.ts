import { zodCheckEnvSchema } from '@repo/utils/schema'
import { z } from 'zod'

const schema = z.object({
  API_URL: z.string().default('http://localhost:3000'),
})

const envVars: any = {}

for (const [key, value] of Object.entries((import.meta as any).env)) {
  if (key.startsWith('VITE_')) {
    envVars[key.replace('VITE_', '')] = value
  }
}

export const env = zodCheckEnvSchema(envVars, schema)
