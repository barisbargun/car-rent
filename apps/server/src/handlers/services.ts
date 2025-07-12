import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { revalidateCache } from '@/config/cache'
import { findByIdAndUpdate, getParamsId } from '@/lib/model-utils'
import { getNextIndex, sendResponse } from '@/lib/utils'
import { checkLimit } from '@/middleware/check-limit'
import { useCache } from '@/middleware/use-cache'
import { verifyAccessToken } from '@/middleware/verify-access-token'
import { verifyRole } from '@/middleware/verify-role'
import { modelService } from '@/models/service'

const router = Router()

const db = modelService
const model: MODELS = 'service'

const role = REQUIRED_ROLE[model]

router.get('/', useCache(model))

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

      revalidateCache(model)
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
      revalidateCache(model)

      res.status(StatusCodes.OK).json(result)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

export const servicesRouter = router
