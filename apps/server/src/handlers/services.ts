import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { findByIdAndUpdate, getParamsId } from '@/lib/model-utils'
import { getNextIndex, sendResponse } from '@/lib/utils'
import { checkLimit } from '@/middleware/check-limit'
import { cache, storeCache, useCache } from '@/middleware/use-cache'
import { verifyAccessToken } from '@/middleware/verify-access-token'
import { verifyRole } from '@/middleware/verify-role'
import { modelService } from '@/models/service'

const router = Router()

const db = modelService
const model: MODELS = 'service'

const role = REQUIRED_ROLE[model]
const clearCache = () => cache.del(model)

router.get('/', useCache(model), async (_req, res) => {
  try {
    const data = await db.find({}).sort({ index: 1 }).populate('img').exec()
    storeCache(model, data)
    res.status(StatusCodes.OK).json(data)
  } catch (error: any) {
    sendResponse(res, error)
  }
})

router.post(
  '/',
  verifyAccessToken,
  verifyRole(role.add),
  checkLimit(db, model),
  async (req, res) => {
    try {
      const result = await db.create({
        ...req.body,
        index: await getNextIndex(db),
      })

      clearCache()
      const response = await result.populate('img')
      res.status(StatusCodes.OK).json(response)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

router.patch(
  '/:id',
  verifyAccessToken,
  verifyRole(role.update),
  async (req, res) => {
    try {
      const id = getParamsId(req)
      const data = req.body
      const result = await findByIdAndUpdate(db, id, data, 'img')
      clearCache()

      res.status(StatusCodes.OK).json(result)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

export const servicesRouter = router
