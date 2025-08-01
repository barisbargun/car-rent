import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import {
  serviceCreateSchema,
  serviceUpdateSchema,
} from '@repo/api/paths/service/common'
import { giveError } from '@repo/utils/error'
import { getNextIndex, sortByIndex } from '@repo/utils/obj'
import { zodCheckSchema } from '@repo/utils/schema'
import { StatusCodes } from 'http-status-codes'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, networkDelay } from '#mock/utils/mock'
import { getImageById } from '#mock/utils/populate'

import { db, persistDb } from '../db'

const dbName: MODELS = 'service'
const url = getPath(dbName)
const dbModel = db[dbName]

export const servicesHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const services = dbModel.getAll().map((service) => {
        return {
          ...service,
          img: getImageById(service.img, false),
        }
      })
      return HttpResponse.json(sortByIndex(services))
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
      REQUIRED_ROLE.service.add(user.role, true)

      if (dbModel.count() >= maxItemCounts.service)
        throw giveError(StatusCodes.BAD_REQUEST, `Max item count reached`)

      const data = zodCheckSchema(
        (await request.json()) as any,
        serviceCreateSchema,
      )

      const img = getImageById(data.img)

      const result = dbModel.create({
        ...data,
        index: getNextIndex(dbModel.getAll()),
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'Service not found')
      }

      persistDb(dbName)

      return HttpResponse.json({
        ...result,
        img,
      })
    } catch (error: any) {
      return catchError(error)
    }
  }),

  http.patch(`${url}/:id`, async ({ params, request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.service.update(user.role, true)

      const data = zodCheckSchema(
        (await request.json()) as any,
        serviceUpdateSchema,
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
        throw giveError(StatusCodes.NOT_FOUND, 'Service not found')
      }

      persistDb(dbName)

      return HttpResponse.json({
        ...result,
        img,
      })
    } catch (error) {
      return catchError(error)
    }
  }),
]
