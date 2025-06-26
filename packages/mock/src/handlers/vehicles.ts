import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { swapModelInputSchema } from '@repo/api/config/shared-schemas'
import {
  vehicleCreateSchema,
  vehicleUpdateSchema,
} from '@repo/api/paths/vehicle/common'
import { giveError } from '@repo/utils/error'
import { getNextIndex, sortByIndex } from '@repo/utils/obj'
import { zodCheckSchema } from '@repo/utils/schema'
import { StatusCodes } from 'http-status-codes'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, networkDelay } from '#mock/utils/mock'
import { getImageById, getParentById } from '#mock/utils/populate'

import { db, persistDb } from '../db'

const dbName: MODELS = 'vehicle'
const url = getPath(dbName)
const dbModel = db[dbName]

export const vehiclesHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const data = dbModel.getAll().map((model) => {
        return {
          ...model,
          img: getImageById(model.img, false),
        }
      })
      return HttpResponse.json(sortByIndex(data))
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
      REQUIRED_ROLE.vehicle.add(user.role, true)

      if (dbModel.count() >= maxItemCounts.vehicle)
        throw giveError(StatusCodes.BAD_REQUEST, `Max item count reached`)

      const data = zodCheckSchema(
        (await request.json()) as any,
        vehicleCreateSchema,
      )

      getParentById(data.menubarVehicle, 'menubarVehicle')

      const img = getImageById(data.img)

      const index = getNextIndex(
        dbModel.findMany({
          where: {
            menubarVehicle: {
              equals: data.menubarVehicle,
            },
          },
        }),
      )

      const result = dbModel.create({
        ...data,
        index,
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'Vehicle not found')
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
      REQUIRED_ROLE.vehicle.update(user.role, true)

      const data = zodCheckSchema(
        (await request.json()) as any,
        vehicleUpdateSchema,
      )

      const oldData = dbModel.findFirst({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!oldData) {
        throw giveError(StatusCodes.NOT_FOUND, 'Vehicle not found')
      }

      const isEqualParents = data.menubarVehicle === oldData.menubarVehicle

      if (!isEqualParents) getParentById(data.menubarVehicle, 'menubarVehicle')

      const index = isEqualParents
        ? oldData.index
        : getNextIndex(
            dbModel.findMany({
              where: {
                menubarVehicle: {
                  equals: data.menubarVehicle,
                },
              },
            }),
          )

      const img = getImageById(data.img)

      const result = dbModel.update({
        where: {
          id: {
            equals: params.id as string,
          },
        },
        data: { ...data, index },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'Vehicle not found')
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

  // Swapping
  http.patch(url, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.vehicle.swap(user.role, true)

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
          throw giveError(StatusCodes.NOT_FOUND, 'Vehicle not found')
        }
      }

      persistDb(dbName)
      return HttpResponse.json(data, { status: StatusCodes.OK })
    } catch (error) {
      return catchError(error)
    }
  }),

  http.delete(`${url}/:id`, async ({ params, request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.vehicle.remove(user.role, true)

      const result = dbModel.delete({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'Vehicle not found')
      }

      persistDb(dbName)
      return HttpResponse.json()
    } catch (error) {
      return catchError(error)
    }
  }),
]
