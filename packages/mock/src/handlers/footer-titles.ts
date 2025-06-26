import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { swapModelInputSchema } from '@repo/api/config/shared-schemas'
import {
  footerTitleCreateSchema,
  footerTitleUpdateSchema,
} from '@repo/api/paths/footer/title/common'
import { giveError } from '@repo/utils/error'
import { getNextIndex, sortByIndex } from '@repo/utils/obj'
import { zodCheckSchema } from '@repo/utils/schema'
import { StatusCodes } from 'http-status-codes'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, networkDelay } from '#mock/utils/mock'

import { db, persistDb } from '../db'

const dbName: MODELS = 'footerTitle'
const url = getPath(dbName)
const dbModel = db[dbName]

export const footerTitlesHandlers = [
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
      REQUIRED_ROLE.footerTitle.add(user.role, true)

      if (dbModel.count() >= maxItemCounts.footerTitle)
        throw giveError(StatusCodes.BAD_REQUEST, `Max item count reached`)

      const data = zodCheckSchema(
        (await request.json()) as any,
        footerTitleCreateSchema,
      )

      const result = dbModel.create({
        ...data,
        index: getNextIndex(dbModel.getAll()),
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'FooterTitle not found')
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
      REQUIRED_ROLE.footerTitle.update(user.role, true)

      const data = zodCheckSchema(
        (await request.json()) as any,
        footerTitleUpdateSchema,
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
        throw giveError(StatusCodes.NOT_FOUND, 'FooterTitle not found')
      }

      persistDb(dbName)

      return HttpResponse.json(result)
    } catch (error) {
      return catchError(error)
    }
  }),

  // Swapping
  http.patch(url, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.footerTitle.swap(user.role, true)

      const data = zodCheckSchema(
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
          throw giveError(StatusCodes.NOT_FOUND, 'FooterTitle not found')
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
      REQUIRED_ROLE.footerTitle.remove(user.role, true)

      const result = dbModel.delete({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'FooterTitle not found')
      }

      persistDb(dbName)
      return HttpResponse.json()
    } catch (error) {
      return catchError(error)
    }
  }),
]
