import { FooterLinkPost } from '@repo/typescript-config/types/api'
import { http, HttpResponse } from 'msw'

import { ROLE_LIST } from '#mock/config/enums'
import { getPath } from '#mock/utils/get-path'

import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'

const url = getPath('footerLinks')
const api = db.footer_link
export const footerLinksHandlers = [
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

  http.post(url, async ({ request, cookies }) => {
    await networkDelay()

    try {
      const { error } = requireAuth(cookies)
      if (error) {
        return HttpResponse.json({ message: error }, { status: 401 })
      }
      const data = (await request.json()) as FooterLinkPost
      const result = api.create({
        ...data,
      })
      await persistDb('footer_link')
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
      await persistDb('menubar_vehicle')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),
]
