import { sanitizeUser } from '@repo/api/paths/user/common'
import { giveError } from '@repo/utils/error'
import { StatusCodes } from 'http-status-codes'

import { decode, encode } from '#mock/utils/encryption'

import { db } from '../db'
import { getJwtCookie } from './cookie-jwt'

export const createRefreshToken = (id: string) => encode({ id }, 3600 * 12)

export const createAccessToken = (id: string, role: number) =>
  encode({ id, role }, 1800)

export const refreshAccessToken = (cookies: Record<string, string>) => {
  const encodedToken = getJwtCookie(cookies)
  if (!encodedToken) {
    throw giveError(StatusCodes.FORBIDDEN, 'No token found')
  }

  const payload = decode(encodedToken)

  if (!payload) {
    throw giveError(StatusCodes.LOCKED, 'Invalid token')
  }

  const userById = db.user.findFirst({
    where: {
      id: {
        equals: payload.id as string,
      },
    },
  })
  const userByToken = db.user.findFirst({
    where: {
      refreshToken: {
        equals: encodedToken,
      },
    },
  })

  if (!userById || !userByToken || userById.id !== userByToken.id) {
    if (userById) {
      userById.refreshToken = ''
      db.user.update({
        where: {
          id: {
            equals: userById.id,
          },
        },
        data: userById,
      })
    }
    throw giveError(StatusCodes.FORBIDDEN)
  }

  return createAccessToken(userById.id, userById.role)
}

export const verifyAccessToken = (request: Request) => {
  try {
    const authToken = request.headers.get('authorization') || ''
    if (!authToken?.startsWith('Bearer ') || authToken.length < 20) throw Error
    const token = authToken.split(' ')[1]
    const payload = decode(token)
    if (!payload) throw Error

    const user = db.user.findFirst({
      where: {
        id: {
          equals: payload.id as string,
        },
      },
    })
    if (!user) throw Error

    return sanitizeUser(user)
  } catch {
    throw giveError(StatusCodes.UNAUTHORIZED)
  }
}
