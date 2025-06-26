import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { giveError } from '@repo/utils/error'
import { StatusCodes } from 'http-status-codes'
import { http, HttpResponse } from 'msw'

import { verifyAccessToken } from '#mock/config/token'
import { getPath } from '#mock/utils/get-path'
import { catchError, networkDelay } from '#mock/utils/mock'

import { db, persistDb } from '../db'

const url = getPath('image')
const dbModel = db.image
export const imagesHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      return HttpResponse.json(dbModel.getAll())
    } catch (error) {
      return catchError(error)
    }
  }),

  http.post(url, async ({ request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.image.add(user.role, true)
      const data = await request.formData()
      const file = data.get('file')

      if (dbModel.count() >= maxItemCounts.image)
        throw giveError(StatusCodes.BAD_REQUEST, `Max item count reached`)

      if (!file) {
        throw giveError(StatusCodes.BAD_REQUEST, 'Missing file')
      }

      if (!(file instanceof File)) {
        throw giveError(
          StatusCodes.BAD_REQUEST,
          'Uploaded document is not a File',
        )
      }
      const { width, height } = await createImageBitmap(file)

      if (width < 20 || height < 20) {
        throw giveError(
          StatusCodes.BAD_REQUEST,
          'Uploaded document is not a valid image',
        )
      }

      const result = dbModel.create({
        url: `https://dummyimage.com/${width}x${height}`,
      })

      persistDb('image')
      return HttpResponse.json(result)
    } catch (error) {
      return catchError(error)
    }
  }),

  http.delete(`${url}/:id`, async ({ params, request }) => {
    await networkDelay()

    try {
      const user = verifyAccessToken(request)
      REQUIRED_ROLE.image.remove(user.role, true)

      const result = dbModel.delete({
        where: {
          id: {
            equals: params.id as string,
          },
        },
      })

      if (!result) {
        throw giveError(StatusCodes.NOT_FOUND, 'Image not found')
      }

      persistDb('image')
      return HttpResponse.json()
    } catch (error) {
      return catchError(error)
    }
  }),
]
