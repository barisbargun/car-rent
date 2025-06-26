import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { giveError } from '@repo/utils/error'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Model } from 'mongoose'

import { sendResponse } from '@/lib/utils'

export const checkLimit = (database: Model<any>, model: MODELS) => {
  return async (_req: Request, res: Response, next: NextFunction) => {
    try {
      if ((await database.countDocuments()) >= maxItemCounts[model])
        throw giveError(StatusCodes.FORBIDDEN, `Max item count reached`)

      next()
    } catch (error: any) {
      sendResponse(res, error)
    }
  }
}
