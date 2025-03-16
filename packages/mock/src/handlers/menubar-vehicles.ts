import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { swapModelInputSchema } from '@repo/api/config/shared-schemas'
import { createMenubarVehicleInputSchema } from '@repo/api/paths/menubar/vehicle/create'
import { updateMenubarVehicleInputSchema } from '@repo/api/paths/menubar/vehicle/update'
import { giveError, StatusCodes } from '@repo/utils/error'
import { getNextIndex, sortByIndex } from '@repo/utils/obj'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, checkSchema, networkDelay } from '#mock/utils/mock'
import { getImageById, getParentById } from '#mock/utils/populate'

import { db, persistDb } from '../db'

const dbName: MODELS = 'menubarVehicle'
const url = getPath(dbName)
const dbModel = db[dbName]
export const menubarVehiclesHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const data = dbModel.getAll().map((vehicle) => {
        return {
          ...vehicle,
          img: getImageById(vehicle.img, false),
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
      REQUIRED_ROLE.menubarVehicle.add(user.role, true)

      if (dbModel.count() >= maxItemCounts.menubarVehicle)
        throw giveError(StatusCodes.BAD_REQUEST, `Max item count reached`)

      const data = checkSchema(
        (await request.json()) as any,
        createMenubarVehicleInputSchema,
      )

      getParentById(data.menubarTab, 'menubarTab')

      const img = data.img && getImageById(data.img)

      const index = getNextIndex(
        dbModel.findMany({
          where: {
            menubarTab: {
              equals: data.menubarTab,
            },
          },
        }),
      )

      const result = dbModel.create({
        ...data,
        index,
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'MenubarVehicle not found')
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
      REQUIRED_ROLE.menubarVehicle.update(user.role, true)

      const data = checkSchema(
        (await request.json()) as any,
        updateMenubarVehicleInputSchema,
      )

      const oldData = dbModel.findFirst({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!oldData) {
        throw giveError(StatusCodes.NOT_FOUND, 'MenubarVehicle not found')
      }

      const isEqualParents = data.menubarTab === oldData.menubarTab

      if (!isEqualParents) getParentById(data.menubarTab, 'menubarTab')

      const img = data.img && getImageById(data.img)

      const index = isEqualParents
        ? oldData.index
        : getNextIndex(
            dbModel.findMany({
              where: {
                menubarTab: {
                  equals: data.menubarTab,
                },
              },
            }),
          )

      const result = dbModel.update({
        where: {
          id: {
            equals: params.id as string,
          },
        },
        data: { ...data, index },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'MenubarVehicle not found')
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
  http.patch(`${url}`, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.menubarVehicle.swap(user.role, true)

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
          throw giveError(StatusCodes.NOT_FOUND, 'MenubarVehicle not found')
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
      REQUIRED_ROLE.menubarVehicle.remove(user.role, true)

      const result = dbModel.delete({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'MenubarVehicle not found')
      }

      persistDb(dbName)
      return HttpResponse.json()
    } catch (error) {
      return catchError(error)
    }
  }),
]
