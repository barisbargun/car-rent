import { ServicePost } from '@repo/typescript-config/types/api'
import { http, HttpResponse } from 'msw'

import { getPath } from '#mock/utils/get-path'
import { populateWithImage } from '#mock/utils/populate'

import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'

const url = getPath('services')
const api = db.service
export const servicesHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const services = api.getAll().map((service) => {
        const img = populateWithImage(service.img)

        if (!img?.id) throw new Error('Server Error')

        return {
          ...service,
          img: img as any,
        }
      })
      return HttpResponse.json(services)
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
      const data = (await request.json()) as ServicePost
      const result = api.create({
        ...data,
      })
      await persistDb('service')
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
          ...(user?.role === 'USER' && {
            authorId: {
              equals: user.id,
            },
          }),
        },
      })
      await persistDb('service')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),
]
