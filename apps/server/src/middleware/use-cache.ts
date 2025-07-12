import { MODELS } from '@repo/api/config/api-paths'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getCache } from '@/config/cache'
import { sendResponse } from '@/lib/utils'

export const useCache = (cacheKey: MODELS) => {
  return (_req: Request, res: Response) => {
    try {
      const cachedData = getCache(cacheKey)
      res.status(StatusCodes.OK).json(cachedData)
    } catch (error: any) {
      sendResponse(res, error)
    }
  }
}
