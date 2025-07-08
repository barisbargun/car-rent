import { giveError } from '@repo/utils/error'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { env } from './env'

const AUTH_COOKIE = 'jwt'

export const getJwtCookie = (req: Request): string => {
  const cookie = req.cookies[AUTH_COOKIE] as string | undefined
  if (!cookie?.length) throw giveError(StatusCodes.FORBIDDEN, 'No token found')
  return cookie
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: env.MODE === 'production' ? ('none' as const) : ('lax' as const),
  secure: env.MODE === 'production',
}

export const createJwtCookie = (res: Response, refreshToken: string) =>
  res.cookie(AUTH_COOKIE, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 24 * 60 * 60 * 1000,
  })

export const removeJwtCookie = (res: Response) =>
  res.clearCookie(AUTH_COOKIE, COOKIE_OPTIONS)
