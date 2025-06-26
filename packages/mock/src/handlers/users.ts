import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import {
  ROLE_LIST,
  userCreateSchema,
  userUpdateSchema,
  userUpdateSelfSchema,
} from '@repo/api/paths/user/common'
import { giveError } from '@repo/utils/error'
import { zodCheckSchema } from '@repo/utils/schema'
import { StatusCodes } from 'http-status-codes'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, hash, networkDelay, sanitizeUser } from '#mock/utils/mock'
import { getImageById } from '#mock/utils/populate'

import { db, persistDb } from '../db'

const dbName: MODELS = 'user'
const url = getPath(dbName)
const dbModel = db[dbName]
export const usersHandlers = [
  http.get(url, async ({ request }) => {
    await networkDelay()
    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.user.get(user.role, true)
      const users = dbModel
        .getAll()
        .filter((user) => user.role !== ROLE_LIST.ADMIN)
        .map((user) => {
          return {
            ...sanitizeUser(user),
            img: getImageById(user.img, false),
          }
        })
      return HttpResponse.json(users)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),

  http.post(url, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.user.add(user.role, true)

      if (dbModel.count() >= maxItemCounts.user)
        throw giveError(StatusCodes.BAD_REQUEST, `Max item count reached`)

      const data = zodCheckSchema(
        (await request.json()) as any,
        userCreateSchema,
      )

      const img = getImageById(data.img, false)
      const hashedPassword = hash(data.password)
      const result = dbModel.create({ ...data, password: hashedPassword })
      if (!result) {
        // TODO: Edit other models like this.
        throw giveError(StatusCodes.BAD_REQUEST, 'User creation failed')
      }

      persistDb(dbName)

      return HttpResponse.json({
        ...sanitizeUser(result),
        img,
      })
    } catch (error: any) {
      return catchError(error)
    }
  }),

  /** Update self */
  http.patch(`${url}/self`, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)

      const data = zodCheckSchema(
        (await request.json()) as any,
        userUpdateSelfSchema,
      )

      const changePassword = data.password && data.password.length > 0
      if (changePassword) {
        data.password = hash(data.password!)
      } else {
        delete data.password
      }

      const img = getImageById(data.img, false)

      const result = dbModel.update({
        where: {
          id: {
            equals: user.id,
          },
        },
        data,
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'User not found')
      }

      persistDb(dbName)

      return HttpResponse.json({
        ...sanitizeUser(result),
        img,
      })
    } catch (error) {
      return catchError(error)
    }
  }),

  http.patch(`${url}/:id`, async ({ params, request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.user.update(user.role, true)

      const data = zodCheckSchema(
        (await request.json()) as any,
        userUpdateSchema,
      )

      const img = getImageById(data.img)

      const result = dbModel.update({
        where: {
          id: {
            equals: params.id as string,
          },
        },
        data,
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'User not found')
      }

      persistDb(dbName)

      return HttpResponse.json({
        ...sanitizeUser(result),
        img,
      })
    } catch (error) {
      return catchError(error)
    }
  }),

  http.delete(`${url}/:id`, async ({ params, request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.user.remove(user.role, true)

      const result = dbModel.delete({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'User not found')
      }

      persistDb(dbName)
      return HttpResponse.json()
    } catch (error) {
      return catchError(error)
    }
  }),
]
