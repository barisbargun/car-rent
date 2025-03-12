/* eslint-disable unicorn/no-array-reduce */
import * as z from 'zod'

export const parseEnv = <T extends z.ZodType>(schema: T): z.infer<T> => {
  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr
    if (key.startsWith('VITE_')) {
      acc[key.replace('VITE_', '')] = value
    }
    return acc
  }, {})

  const parsedEnv = schema.safeParse(envVars)

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}
`,
    )
  }

  return parsedEnv.data as z.infer<T>
}
