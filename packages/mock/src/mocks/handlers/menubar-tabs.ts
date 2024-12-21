import { MenubarTab } from '@repo/typescript-config/types/api'
import { http, HttpResponse } from 'msw'

import { getPath } from '#mock/utils/get-path'
import { populateWithImage } from '#mock/utils/populate'

import { db, persistDb } from '../db'
import { networkDelay, requireAuth } from '../utils'

const url = getPath('menubarTabs')
const api = db.menubar_tab
export const menubarTabsHandlers = [
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

  http.get(getPath('menubarFull'), async () => {
    await networkDelay()
    try {
      const vehiclesData = db.vehicle.getAll()
      const menubarVehicles = db.menubar_vehicle.getAll().map((mv) => {
        const children = vehiclesData.flatMap((t) =>
          t.menubarVehicle === mv.id
            ? {
                ...t,
                img: populateWithImage(t.img),
              }
            : [],
        )
        return {
          ...mv,
          vehicles: children,
        }
      })

      const menubarTabs = api.getAll().map((mt) => {
        const children = menubarVehicles.flatMap((mv) =>
          mv.menubarTab === mt.id
            ? {
                ...mv,
                img: populateWithImage(mv.img),
              }
            : [],
        )
        return {
          ...mt,
          menubarVehicles: children,
        }
      })

      return HttpResponse.json(menubarTabs)
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
      const data = (await request.json()) as MenubarTab
      const result = api.create({
        ...data,
      })
      await persistDb('menubar_tab')
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
      await persistDb('menubar_tab')
      return HttpResponse.json(result)
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),
]
