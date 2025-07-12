import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { CacheModelKeys, getCache } from '@/config/cache'
import { sendResponse } from '@/lib/utils'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const models: CacheModelKeys[] = [
      'carousel',
      'menubarTab',
      'menubarVehicle',
      'vehicle',
      'service',
      'review',
      'footerTitle',
      'footerLink',
      'siteConfig',
    ]

    const cachedData: any = {}

    for (const model of models) {
      const data = getCache(model)
      if (data) {
        const modelName = model === 'siteConfig' ? 'siteConfig' : model + 's'
        cachedData[modelName] = data
      }
    }

    res.status(StatusCodes.OK).json(cachedData)
  } catch (error: any) {
    sendResponse(res, error)
  }
})

export const cachedRouter = router
