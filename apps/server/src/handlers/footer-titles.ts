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
import { modelFooterLink } from '@/models/footer-link'
import { modelFooterTitle } from '@/models/footer-title'

const router = Router()

const db = modelFooterTitle
const model: MODELS = 'footerTitle'

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
      res.status(StatusCodes.OK).json(result)
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
      const result = await findByIdAndUpdate(db, id, data)
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
      await modelFooterLink.deleteMany({ footerTitle: id }).exec()
      await db.findByIdAndDelete(id).exec()

      revalidateCache(model)
      res.sendStatus(StatusCodes.OK)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

export const footerTitlesRouter = router
