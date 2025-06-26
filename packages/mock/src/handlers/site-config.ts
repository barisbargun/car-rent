import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { siteConfigUpdateSchema } from '@repo/api/paths/site-config/common'
import { giveError } from '@repo/utils/error'
import { zodCheckSchema } from '@repo/utils/schema'
import { StatusCodes } from 'http-status-codes'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, networkDelay } from '#mock/utils/mock'
import { getImageById } from '#mock/utils/populate'

import { db, persistDb } from '../db'

const dbName: MODELS = 'siteConfig'
const url = getPath(dbName)
const dbModel = db[dbName]

export const siteConfigsHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      const siteConfig = dbModel.getAll()[0]

      return HttpResponse.json({
        ...siteConfig,
        logoImg: getImageById(siteConfig?.logoImg, false),
        serviceImg: getImageById(siteConfig?.serviceImg, false),
      })
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),

  http.patch(url, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.siteConfig.update(user.role, true)

      const data = zodCheckSchema(
        (await request.json()) as any,
        siteConfigUpdateSchema,
      )

      const logoImg = getImageById(data.logoImg, false)
      const serviceImg = getImageById(data.serviceImg, false)

      const firstSiteConfig = dbModel.getAll()[0]
      const result = firstSiteConfig
        ? dbModel.update({
            where: {
              id: {
                equals: firstSiteConfig.id,
              },
            },
            data,
          })
        : dbModel.create({
            ...data,
            logoImg: logoImg?.id || '',
            serviceImg: serviceImg?.id || '',
          })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'SiteConfig not found')
      }

      persistDb(dbName)

      return HttpResponse.json({
        ...result,
        logoImg,
        serviceImg,
      })
    } catch (error) {
      return catchError(error)
    }
  }),
]
