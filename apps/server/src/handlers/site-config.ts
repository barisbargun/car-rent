import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { revalidateCache } from '@/config/cache'
import { findByIdAndUpdate } from '@/lib/model-utils'
import { sendResponse } from '@/lib/utils'
import { useCache } from '@/middleware/use-cache'
import { verifyAccessToken } from '@/middleware/verify-access-token'
import { verifyRole } from '@/middleware/verify-role'
import { modelSiteConfig } from '@/models/site-config'

const router = Router()

const db = modelSiteConfig
const model: MODELS = 'siteConfig'

const role = REQUIRED_ROLE[model]

const populate = 'logoImg serviceImg'

router.get('/', useCache(model))

router.patch(
  '/',
  verifyAccessToken,
  verifyRole(role.update),
  async (req, res) => {
    try {
      const data = req.body
      const siteConfig = await db.find({}).exec()

      let result

      if (siteConfig.length > 0) {
        result = await findByIdAndUpdate(db, siteConfig[0].id, data, populate)
      } else {
        result = await db.create({
          ...data,
          logoImg: data.logoImg || undefined,
          serviceImg: data.serviceImg || undefined,
        })
        result = await result.populate(populate)
      }

      revalidateCache(model)

      res.status(StatusCodes.OK).json(result)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

export const siteConfigsRouter = router
