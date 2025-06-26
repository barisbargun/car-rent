import { MODELS } from '@repo/api/config/api-paths'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import NodeCache from 'node-cache'

import { sendResponse } from '@/lib/utils'

export const cache = new NodeCache();

export const useCache = (cacheKey: MODELS) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    try {
      if (cache.has(cacheKey)) {
        const cachedData = cache.get(cacheKey)
        res.status(StatusCodes.OK).json(cachedData)
        return
      }
      next()
    } catch (error: any) {
      sendResponse(res, error)
    }
  }
}

export const storeCache = (cacheKey: MODELS, data: any) => {
  cache.set(cacheKey, JSON.parse(JSON.stringify(data)))
}
