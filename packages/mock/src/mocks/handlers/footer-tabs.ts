import { FooterTab } from '@repo/typescript-config/types/api'
import { http, HttpResponse } from 'msw'

import { getPath } from '#mock/utils/get-path'

import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'

const url = getPath('footerTabs')
const api = db.footer_tab
export const footerTabsHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const result = api.getAll()
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),

  http.get(getPath('footerFull'), async () => {
    await networkDelay()
    try {
      const links = db.footer_link.getAll()

      const footerTabs = api.getAll().map((ft) => {
        const footerLinks = links.filter((link) => link.footerTab === ft.id)
        return {
          ...ft,
          footerLinks,
        }
      })

      return HttpResponse.json(footerTabs)
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
      const data = (await request.json()) as FooterTab
      const result = api.create({
        ...data,
      })
      await persistDb('footer_tab')
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
      await persistDb('footer_tab')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),
]
