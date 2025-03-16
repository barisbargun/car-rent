/* eslint-disable unicorn/prefer-code-point */

import { Login } from '@repo/api/types/auth'
import { User } from '@repo/api/types/user'
import { giveError } from '@repo/utils/error'
import { objectExclude } from '@repo/utils/obj'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { delay, HttpResponse } from 'msw'
import z, { ZodObject, ZodTypeAny } from 'zod'

import { createJwtCookie } from '#mock/config/cookie-jwt'
import { env } from '#mock/config/env'
import { createAccessToken, createRefreshToken } from '#mock/config/token'

import { db, persistDb } from '../db'

export const networkDelay = () => {
  const delayTime =
    env.MODE === 'test' ? 200 : Math.floor(Math.random() * 700) + 300
  return delay(delayTime)
}

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

export const sanitizeUser = <
  O extends Pick<User, 'password' | 'refreshToken'> & Record<string, any>,
>(
  user: O,
): Omit<O, 'password' | 'refreshToken'> =>
  objectExclude(user, ['password', 'refreshToken'])

export const authenticate = ({ username, password }: Login) => {
  if (!username || !password) {
    throw giveError(StatusCodes.LOCKED, 'Username and password are required')
  }
  const user = db.user.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  })
  if (!user || user?.password !== hash(password)) {
    throw giveError(StatusCodes.UNAUTHORIZED, 'Invalid credentials')
  }

  const jwt = createRefreshToken(user.id)
  const accessToken = createAccessToken(user.id, user.role)
  createJwtCookie(jwt)

  db.user.update({
    where: {
      id: {
        equals: user.id,
      },
    },
    data: {
      refreshToken: jwt,
    },
  })
  persistDb('user')
  return { user, accessToken }
}

export const catchError = (error: any) => {
  return HttpResponse.json(
    { message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR },
    { status: error.status || StatusCodes.INTERNAL_SERVER_ERROR },
  )
}

export const checkSchema2 = (schema: ZodTypeAny, data: object) => {
  const testSchema = schema.safeParse(data)
  if (!testSchema.success)
    throw giveError(StatusCodes.BAD_REQUEST, 'Invalid data')
}

/**
 * Validates data against a Zod schema and filters out keys not defined in the schema.
 */
export const checkSchema = <T extends ZodTypeAny>(
  data: object,
  schema: T,
): z.infer<T> => {
  const validationResult = schema.safeParse(data)

  if (!validationResult.success) {
    throw giveError(StatusCodes.BAD_REQUEST, 'Invalid data')
  }

  // Only filter keys for object schemas; for other types (e.g., array, string),
  // return the validated data directly.
  if (schema instanceof ZodObject) {
    const schemaKeys = new Set(Object.keys(schema.shape))
    const filteredData = {} as z.infer<T>

    for (const [key, value] of Object.entries(validationResult.data)) {
      if (schemaKeys.has(key)) {
        ;(filteredData as Record<string, unknown>)[key] = value
      }
    }
    return filteredData
  }

  return validationResult.data
}
