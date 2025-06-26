import { API_PATHS } from '@repo/api/config/api-paths'
import { authLoginSchema, TokenResponse } from '@repo/api/paths/auth/common'
import { giveError } from '@repo/utils/error'
import { zodCheckSchema } from '@repo/utils/schema'
import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import {
  createJwtCookie,
  getJwtCookie,
  removeJwtCookie,
} from '@/config/cookie-jwt'
import {
  createAccessToken,
  createRefreshToken,
  refreshAccessToken,
} from '@/config/token'
import { sendResponse } from '@/lib/utils'
import { verifyAccessToken } from '@/middleware/verify-access-token'
import { modelUser } from '@/models/user'

const router = Router()
const db = modelUser

const paths = {
  login: API_PATHS.login.replace('auth', ''),
  logout: API_PATHS.logout.replace('auth', ''),
  currentUser: API_PATHS.currentUser.replace('auth', ''),
  refreshAccessToken: API_PATHS.refreshAccessToken.replace('auth', ''),
}

router.get(paths.currentUser, verifyAccessToken, async (_req, res) => {
  try {
    const user = await db.findById(res.locals.userId).populate('img').exec()
    res.status(StatusCodes.OK).json(user)
  } catch {
    sendResponse(res, {
      status: StatusCodes.UNAUTHORIZED,
      message: 'User not found',
    })
  }
})

router.get(paths.refreshAccessToken, async (req, res) => {
  try {
    const token = await refreshAccessToken(req)
    res.status(StatusCodes.OK).json({
      accessToken: token,
    } as TokenResponse)
  } catch (error: any) {
    sendResponse(res, error)
  }
})

router.post(paths.login, async (req, res) => {
  try {
    const data = zodCheckSchema(req.body, authLoginSchema)
    const [user, userPassword] = await Promise.all([
      db.findOne({ username: data.username }).exec(),
      db.findOne({ username: data.username }).select('password').exec(),
    ])

    const password = userPassword?.password

    if (
      !user ||
      !password ||
      !(await bcrypt.compare(data.password, password))
    ) {
      throw giveError(StatusCodes.LOCKED, 'Invalid credentials')
    }

    const refreshToken = createRefreshToken(user.id)
    const accessToken = createAccessToken(user.id, user.role)
    createJwtCookie(res, refreshToken)

    user.refreshToken = refreshToken
    await user.save()
    res.status(StatusCodes.OK).json({ user, accessToken })
  } catch (error: any) {
    sendResponse(res, error)
  }
})

router.post(paths.logout, async (req, res) => {
  try {
    const refreshToken = getJwtCookie(req)

    const user = await db.findOne({ refreshToken }).exec()
    if (user) {
      user.refreshToken = undefined
      await user.save()
    }
    removeJwtCookie(res)
    res.sendStatus(StatusCodes.OK)
  } catch (error: any) {
    sendResponse(res, error)
  }
})

export const authRouter = router
