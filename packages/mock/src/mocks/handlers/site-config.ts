import { SiteConfigPost } from '@repo/typescript-config/types/api'
import { http, HttpResponse } from 'msw'

import { getPath } from '#mock/utils/get-path'
import { populateWithImage } from '#mock/utils/populate'

import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'

const url = getPath('siteConfig')
const api = db.site_config
export const siteConfigHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const siteConfig = api.getAll()[0]
      const logoImg = populateWithImage(siteConfig.logoImg)
      const serviceImg = populateWithImage(siteConfig.serviceImg)

      if (!logoImg?.id || !serviceImg?.id) throw new Error('Server Error')

      return HttpResponse.json({
        ...siteConfig,
        logoImg: logoImg as any,
        serviceImg: serviceImg as any,
      })
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
      const data = (await request.json()) as SiteConfigPost
      const result = api.create({
        ...data,
      })
      await persistDb('site_config')
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
      await persistDb('site_config')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),
]
