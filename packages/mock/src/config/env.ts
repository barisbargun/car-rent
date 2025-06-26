import { zodCheckEnvSchema } from '@repo/utils/schema'
import { z } from 'zod'

const schema = z.object({
  MODE: z.enum(['development', 'production', 'test']),
  API_URL: z.string().url(),
  ENABLE_API_MOCKING: z
    .string()
    .refine((s) => s === 'true' || s === 'false')
    .transform((s) => s === 'true')
    .optional(),
  MOCKING_SEED: z
    .string()
    .refine((s) => s === 'true' || s === 'false')
    .transform((s) => s === 'true')
    .optional(),
})

const envVars: any = {}

for (const [key, value] of Object.entries((import.meta as any).env)) {
  if (key.startsWith('VITE_') || key === 'MODE') {
    envVars[key.replace('VITE_', '')] = value
  }
}

export const env = zodCheckEnvSchema(envVars, schema)
