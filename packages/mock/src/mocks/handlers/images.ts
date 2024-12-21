import { http, HttpResponse } from 'msw'

import { db } from '../db'
import { networkDelay } from '../utils'
import { getPath } from '#mock/utils/get-path'

const url = getPath('images')
export const imagesHandlers = [
  http.get(url, async () => {
    await networkDelay()
    try {
      return HttpResponse.json(db.image.getAll())
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Server Error' },
        { status: 500 },
      )
    }
  }),
]
