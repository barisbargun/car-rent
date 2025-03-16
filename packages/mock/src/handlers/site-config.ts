import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { updateSiteConfigInputSchema } from '@repo/api/paths/site-config/update'
import { giveError, StatusCodes } from '@repo/utils/error'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, checkSchema, networkDelay } from '#mock/utils/mock'
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

      const data = checkSchema(
        (await request.json()) as any,
        updateSiteConfigInputSchema,
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
