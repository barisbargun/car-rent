import { StatusCodes } from 'http-status-codes'
import { z, ZodTypeAny } from 'zod'
import { ZodObject } from 'zod/v4'

import { giveError } from '#utils/error'

const checkSchema = (error: (res: z.SafeParseReturnType<any, any>) => any) => {
  return <T extends ZodTypeAny>(data: object, schema: T): z.infer<T> => {
    const result = schema.safeParse(data)
    if (!result.success) {
      error(result)
      throw new Error('Validation failed')
    }

    if (!(schema instanceof ZodObject)) {
      return result.data
    }

    const schemaKeys = Object.keys(schema.shape)
    const filteredData = {} as z.infer<T>

    for (const key of schemaKeys) {
      if (key in result.data) {
        ;(filteredData as Record<string, unknown>)[key] = result.data[key]
      }
    }

    return filteredData
  }
}

export const zodCheckSchema = checkSchema((result) => {
  if (!result?.error) return
  throw giveError(StatusCodes.BAD_REQUEST, 'Invalid data')
})

export const zodCheckEnvSchema = checkSchema((result) => {
  if (!result?.error) return
  let msg =
    'Invalid env provided.\nThe following variables are missing or invalid:\n'
  for (const [key, value] of Object.entries(
    result.error.flatten().fieldErrors,
  )) {
    msg += `- ${key}: ${value}\n`
  }
  throw new Error(msg)
})
