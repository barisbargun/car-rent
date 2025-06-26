import { authLoginSchema, TokenResponse } from '@repo/api/paths/auth/common'
import { zodCheckSchema } from '@repo/utils/schema'
import { StatusCodes } from 'http-status-codes'
import { http, HttpResponse } from 'msw'

import { getJwtCookie, removeJwtCookie } from '#mock/config/cookie-jwt'
import { refreshAccessToken, verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { authenticate, catchError, networkDelay } from '#mock/utils/mock'
import { getImageById } from '#mock/utils/populate'

import { db, persistDb } from '../db'

const currentUserUrl = getPath('currentUser')
const refreshUrl = getPath('refreshAccessToken')
const loginUrl = getPath('login')
const logoutUrl = getPath('logout')

export const authHandlers = [
  http.get(currentUserUrl, async ({ request }) => {
    await networkDelay()
    try {
      const user = verifyAccessToken(request)
      return HttpResponse.json({
        ...user,
        img: getImageById(user.img, false),
      })
    } catch (error: any) {
      return catchError(error)
    }
  }),

  http.get(refreshUrl, async ({ cookies }) => {
    await networkDelay()
    try {
      const token = refreshAccessToken(cookies)

      return HttpResponse.json(
        {
          accessToken: token,
        } as TokenResponse,
        {
          status: StatusCodes.OK,
        },
      )
    } catch (error) {
      return catchError(error)
    }
  }),

  http.post(loginUrl, async ({ request }) => {
    await networkDelay()
    try {
      const data = zodCheckSchema(
        (await request.json()) as any,
        authLoginSchema,
      )
      const result = authenticate(data)
      return HttpResponse.json(
        { accessToken: result.accessToken },
        { status: StatusCodes.OK },
      )
    } catch (error) {
      return catchError(error)
    }
  }),

  http.post(logoutUrl, async ({ cookies }) => {
    await networkDelay()
    try {
      const refreshToken = getJwtCookie(cookies)

      db.user.update({
        where: {
          refreshToken: {
            equals: refreshToken,
          },
        },
        data: {
          refreshToken: '',
        },
      })

      persistDb('user')
      removeJwtCookie()

      return HttpResponse.json()
    } catch (error) {
      return catchError(error)
    }
  }),
]
