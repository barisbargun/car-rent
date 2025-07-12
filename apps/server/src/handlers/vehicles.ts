import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { revalidateCache } from '@/config/cache'
import {
  findByIdAndUpdate,
  getParamsId,
  updateIndexesForIds,
} from '@/lib/model-utils'
import { getNextIndex, sendResponse } from '@/lib/utils'
import { checkLimit } from '@/middleware/check-limit'
import { useCache } from '@/middleware/use-cache'
import { verifyAccessToken } from '@/middleware/verify-access-token'
import { verifyRole } from '@/middleware/verify-role'
import { modelVehicle } from '@/models/vehicle'

const router = Router()

const db = modelVehicle
const model: MODELS = 'vehicle'

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

      const oldData = await db.findById(id).exec()

      const result = await findByIdAndUpdate(db, id, req.body, 'img')

      if (result && !oldData?.menubarVehicle.equals(result.menubarVehicle)) {
        result.index = await getNextIndex(db)
        await result.save()
      }

      revalidateCache(model)

      res.status(StatusCodes.OK).json(result)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

// Swapping
router.patch(
  '/',
  verifyAccessToken,
  verifyRole(role.swap),
  async (req, res) => {
    try {
      await updateIndexesForIds(db, req.body.idList)
      revalidateCache(model)
      res.sendStatus(StatusCodes.OK)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

router.delete(
  '/:id',
  verifyAccessToken,
  verifyRole(role.remove),
  async (req, res) => {
    try {
      const id = getParamsId(req)
      await db.findByIdAndDelete(id).exec()

      revalidateCache(model)
      res.sendStatus(StatusCodes.OK)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

export const vehiclesRouter = router
