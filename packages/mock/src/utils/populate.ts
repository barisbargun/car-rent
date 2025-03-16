import { MODELS } from '@repo/api/config/api-paths'
import { giveError, StatusCodes } from '@repo/utils/error'

import { db } from '../db'

export const getImageById = (id: string | undefined, throwError = true) => {
  if (!id) {
    if (throwError)
      throw giveError(StatusCodes.BAD_REQUEST, 'Image id is required')
    return
  }
  const image = db.image.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  })

  if (!image && throwError)
    throw giveError(StatusCodes.NOT_FOUND, 'Image not found')

  return image
}

export const getParentById = (
  parentId: string | undefined,
  parentModel: MODELS,
  throwError = true,
) => {
  if (!parentId) {
    if (throwError)
      throw giveError(StatusCodes.BAD_REQUEST, 'Parent id is required')
    return
  }

  const parent = db[parentModel].findFirst({
    where: {
      id: {
        equals: parentId,
      },
    },
  })

  if (!parent && throwError)
    throw giveError(StatusCodes.NOT_FOUND, 'Parent not found')

  return parent
}
