import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { swapModelInputSchema } from '@repo/api/config/shared-schemas'
import { createMenubarTabInputSchema } from '@repo/api/paths/menubar/tab/create'
import { updateMenubarTabInputSchema } from '@repo/api/paths/menubar/tab/update'
import { giveError, StatusCodes } from '@repo/utils/error'
import { getNextIndex, sortByIndex } from '@repo/utils/obj'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, checkSchema, networkDelay } from '#mock/utils/mock'

import { db, persistDb } from '../db'

const dbName: MODELS = 'menubarTab'
const url = getPath(dbName)
const dbModel = db[dbName]

export const menubarTabsHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      return HttpResponse.json(sortByIndex(dbModel.getAll()))
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
      REQUIRED_ROLE.menubarTab.add(user.role, true)

      if (dbModel.count() >= maxItemCounts.menubarTab)
        throw giveError(StatusCodes.BAD_REQUEST, `Max item count reached`)

      const data = checkSchema(
        (await request.json()) as any,
        createMenubarTabInputSchema,
      )

      const result = dbModel.create({
        ...data,
        index: getNextIndex(dbModel.getAll()),
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'MenubarTab not found')
      }

      persistDb(dbName)

      return HttpResponse.json(result)
    } catch (error: any) {
      return catchError(error)
    }
  }),

  http.patch(`${url}/:id`, async ({ params, request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.menubarTab.update(user.role, true)

      const data = checkSchema(
        (await request.json()) as any,
        updateMenubarTabInputSchema,
      )

      const result = dbModel.update({
        where: {
          id: {
            equals: params.id as string,
          },
        },
        data,
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'MenubarTab not found')
      }

      persistDb(dbName)

      return HttpResponse.json(result)
    } catch (error) {
      return catchError(error)
    }
  }),

  // Swapping
  http.patch(`${url}`, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.menubarTab.swap(user.role, true)

      const data = checkSchema(
        (await request.json()) as any,
        swapModelInputSchema,
      )

      for (const [index, id] of data.idList.entries()) {
        const result = dbModel.update({
          where: {
            id: {
              equals: id,
            },
          },
          data: {
            index,
          },
        })

        if (!result) {
          throw giveError(StatusCodes.NOT_FOUND, 'MenubarTab not found')
        }
      }

      persistDb(dbName)

      return HttpResponse.json(data)
    } catch (error) {
      return catchError(error)
    }
  }),

  http.delete(`${url}/:id`, async ({ params, request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.menubarTab.remove(user.role, true)

      const result = dbModel.delete({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'MenubarTab not found')
      }

      persistDb(dbName)
      return HttpResponse.json()
    } catch (error) {
      return catchError(error)
    }
  }),
]
