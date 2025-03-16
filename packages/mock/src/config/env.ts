/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parseEnv } from '@repo/utils/env'
import * as z from 'zod'

const getEnv = (key: string) => {
  // @ts-ignore
  const value = import.meta.env[key]
  if (!value) throw new Error(`Missing environment variable: ${key}`)
  return value
}

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string().default('http://localhost:3000'),
    ACCESS_TOKEN_SECRET: z
      .string()
      .default(
        'b36e22e802f53ee93582a9862be2b38b7c0f4a6f5cecd96615b1abd4b7913f2a968a75d032548a52ddbc9b5a5fc27470ee30a76e241b2a32aa2e8012b6ccf594',
      ),
    REFRESH_TOKEN_SECRET: z
      .string()
      .default(
        '39f2a83e4fe537a8599dfdb809d3d2a0fc144386da9649a0421fa4af3dabdc46bd53db33bb4e6855e6d19cc0abf09a51c0651cd8baca4aea4c31cb69754d7bda',
      ),
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

export const env = {
  ...createEnv(),
  MODE: getEnv('MODE'),
}
