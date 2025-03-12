import { parseEnv } from '@repo/utils/env'
import * as z from 'zod'

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
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
  return parseEnv<typeof EnvSchema>(EnvSchema)
}

export const env = createEnv()
