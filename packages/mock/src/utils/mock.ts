/* eslint-disable unicorn/prefer-code-point */

import { AuthLogin } from '@repo/api/paths/auth/common'
import { User } from '@repo/api/paths/user/common'
import { giveError } from '@repo/utils/error'
import { objectExclude } from '@repo/utils/obj'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { delay, HttpResponse } from 'msw'

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

export const authenticate = ({ username, password }: AuthLogin) => {
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

export const catchError = (error: any) =>
  HttpResponse.json(
    { message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR },
    { status: error.status || StatusCodes.INTERNAL_SERVER_ERROR },
  )
