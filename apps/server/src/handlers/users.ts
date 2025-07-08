import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import {
  userCreateSchema,
  userUpdateSchema,
  userUpdateSelfSchema,
} from '@repo/api/paths/user/common'
import { zodCheckSchema } from '@repo/utils/schema'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { generateHash } from '@/config/hash'
import { findByIdAndUpdate, getParamsId } from '@/lib/model-utils'
import { sendResponse } from '@/lib/utils'
import { checkLimit } from '@/middleware/check-limit'
import { clearCache, storeCache, useCache } from '@/middleware/use-cache'
import { verifyAccessToken } from '@/middleware/verify-access-token'
import { verifyRole } from '@/middleware/verify-role'
import { modelUser } from '@/models/user'

const router = Router()

const db = modelUser
const model: MODELS = 'user'

const role = REQUIRED_ROLE[model]


router.get(
  '/',
  verifyAccessToken,
  verifyRole(role.get),
  useCache(model),
  async (_req, res) => {
    try {
      const id = res.locals.userId
      const data = await db
        .find({ _id: { $ne:id } })
        .populate('img')
        .exec()
      storeCache(model, data)
      res.status(StatusCodes.OK).json(data)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

router.post(
  '/',
  verifyAccessToken,
  verifyRole(role.add),
  checkLimit(db, model),
  async (req, res) => {
    try {
      const data = zodCheckSchema(req.body, userCreateSchema)

      const result = await db.create({
        ...req.body,
        password: await generateHash(data.password),
      })

      clearCache(model)
      const response = await result.populate('img')
      res.status(StatusCodes.OK).json(response)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

router.patch('/self', verifyAccessToken, async (req, res) => {
  try {
    const id = res.locals.userId
    const data = zodCheckSchema(req.body, userUpdateSelfSchema)

    const changePassword = data.password && data.password.length > 0

    if (changePassword) {
      data.password = await generateHash(data.password)
    } else {
      delete data.password
    }

    const result = await findByIdAndUpdate(db, id, data, 'img')
    clearCache(model)

    res.status(StatusCodes.OK).json(result)
  } catch (error: any) {
    sendResponse(res, error)
  }
})

router.patch(
  '/:id',
  verifyAccessToken,
  verifyRole(role.update),
  async (req, res) => {
    try {
      const id = getParamsId(req)
      const data = zodCheckSchema(req.body, userUpdateSchema)
      const result = await findByIdAndUpdate(db, id, data, 'img')
      clearCache(model)

      res.status(StatusCodes.OK).json(result)
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

      clearCache(model)
      res.sendStatus(StatusCodes.OK)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

export const usersRouter = router
