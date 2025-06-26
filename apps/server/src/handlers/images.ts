import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { giveError } from '@repo/utils/error'
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'

import { getParamsId } from '@/lib/model-utils'
import { sendResponse } from '@/lib/utils'
import { checkLimit } from '@/middleware/check-limit'
import { upload } from '@/middleware/multer'
import { cache, storeCache, useCache } from '@/middleware/use-cache'
import { verifyAccessToken } from '@/middleware/verify-access-token'
import { verifyRole } from '@/middleware/verify-role'
import { modelImage } from '@/models/image'

const router = Router()

const db = modelImage
const model: MODELS = 'image'

const role = REQUIRED_ROLE[model]
const clearCache = () => cache.del(model)

const uploadOptions: UploadApiOptions = {
  folder: 'car-rent',
  transformation: {
    quality: '85',
    fetch_format: 'avif',
  },
}

router.get('/',useCache(model), async (_req, res) => {
  try {
    const data = await db.find({}).exec()
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
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) {
        throw giveError(StatusCodes.BAD_REQUEST, 'File is required')
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        async (error, result) => {
          if (error) {
            throw giveError(500, 'Failed to upload file.')
          }
          if (result) {
            const modelResult = await db.create({
              url: result.secure_url,
              publicId: result.public_id,
            })
            clearCache()
            res.status(StatusCodes.CREATED).json(modelResult)
          }
        },
      )
      uploadStream.end(req.file.buffer)
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

      const image = await db.findById(id).exec()
      await Promise.all([
        cloudinary.uploader.destroy(image!.publicId),
        image!.deleteOne(),
      ])
      clearCache()
      res.sendStatus(StatusCodes.OK)
    } catch (error: any) {
      sendResponse(res, error)
    }
  },
)

export const imagesRouter = router
