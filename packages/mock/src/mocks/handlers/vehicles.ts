import { VehiclePost } from '@repo/typescript-config/types/api'
import { http, HttpResponse } from 'msw'

import { ROLE_LIST } from '#mock/config/enums'
import { getPath } from '#mock/utils/get-path'
import { populateWithImage } from '#mock/utils/populate'

import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'

const url = getPath('vehicles')
const api = db.vehicle
export const vehiclesHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const result = api.getAll().map((value) => {
        return {
          ...value,
          img: populateWithImage(value.img),
        }
      })
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),

  http.post(url, async ({ request, cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }
      const data = (await request.json()) as VehiclePost
      const result = api.create({
        ...data,
      })
      await persistDb('vehicle')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),

  http.delete(`${url}/:id`, async ({ params, cookies }) => {
    await networkDelay()

    try {
      const { user, error } = requireAuth(cookies)
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }
      const id = params.id as string
      const result = api.delete({
        where: {
          id: {
            equals: id,
          },
          ...(user?.role === ROLE_LIST.USER && {
            authorId: {
              equals: user.id,
            },
          }),
        },
      })
      await persistDb('vehicle')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),
]
