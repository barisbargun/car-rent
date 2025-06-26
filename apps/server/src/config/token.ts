import { giveError } from '@repo/utils/error'
import { Request } from 'express'
import { StatusCodes } from 'http-status-codes'

import { decode, encode } from '@/lib/encryption'
import { modelUser } from '@/models/user'

import { getJwtCookie } from './cookie-jwt'
import { env } from './env'

export const createRefreshToken = (id: string) =>
  encode({ id }, env.REFRESH_TOKEN_SECRET, 3600 * 12)

export const createAccessToken = (id: string, role: number) =>
  encode({ id, role }, env.ACCESS_TOKEN_SECRET, 3600)

export const refreshAccessToken = async (request: Request) => {
  try {
    const refreshToken = getJwtCookie(request)
    const payload = decode(refreshToken, env.REFRESH_TOKEN_SECRET)
    if (!payload) throw Error

    const [userById, userByToken] = await Promise.all([
      modelUser.findById(payload.id).exec(),
      modelUser.findOne({ refreshToken }).exec(),
    ])

    if (!userById || !userByToken || userById.id !== userByToken.id) {
      if (userById) {
        userById.refreshToken = ''
        await userById.save()
      }
      if (userByToken) {
        userByToken.refreshToken = ''
        await userByToken.save()
      }
      throw Error
    }
    return createAccessToken(userById.id, userById.role)
  } catch {
    throw giveError(StatusCodes.FORBIDDEN, 'Invalid Token')
  }
}
