import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { env } from '@/config/env'
import { decode } from '@/lib/encryption'
import { sendResponse } from '@/lib/utils'
import { modelUser } from '@/models/user'

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken = req.headers.authorization
    if (!authToken?.startsWith('Bearer ') || authToken.length < 20) {
      throw Error
    }
    const token = authToken.split(' ')[1]

    const payload = decode(token, env.ACCESS_TOKEN_SECRET)

    if (!payload) throw Error

    const userById = await modelUser.findById(payload.id).exec()
    if (!userById) throw Error

    res.locals.userId = userById.id
    res.locals.userRole = userById.role
    next()
  } catch {
    sendResponse(res, {
      status: StatusCodes.UNAUTHORIZED,
      message: 'Invalid token',
    })
  }
}
