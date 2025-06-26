import { giveError } from '@repo/utils/error'
import { objectExclude } from '@repo/utils/obj'
import { Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import { HydratedDocument, Model, UpdateQuery } from 'mongoose'

export const updateIndexesForIds = async (db: Model<any>, ids?: string[]) => {
  if (
    !Array.isArray(ids) ||
    ids.length < 2 ||
    ids.some((item) => typeof item !== 'string')
  )
    throw giveError(StatusCodes.BAD_REQUEST, 'Invalid data format')

  const operations = ids.map((id, index) => ({
    updateOne: {
      filter: { id: id },
      // Set the 'index' field to the element's position in the array
      update: { $set: { index: index } },
    },
  }))

  await db.bulkWrite(operations)
}

export const getParamsId = (req: Request) => {
  const { id } = req.params
  if (!id) throw giveError(StatusCodes.BAD_REQUEST, 'ID is required')
  return id
}

export const findByIdAndUpdate = async <T>(
  db: Model<T>,
  id: string,
  data: UpdateQuery<T>,
  populate?: string,
): Promise<HydratedDocument<T>> => {
  const dt = objectExclude(data, ['index']) as UpdateQuery<T>

  const query = db.findByIdAndUpdate(id, dt, {
    new: true,
    runValidators: true,
  })

  if (populate) {
    query.populate(populate)
  }

  return query.exec() as any
}
