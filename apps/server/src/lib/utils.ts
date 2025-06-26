import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { Types } from 'mongoose'

export type ConvertFieldsToObjectId<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Types.ObjectId
}

export const sendResponse = (
  res: Response,
  error?: { status?: StatusCodes; message?: string },
) => {
  return res
    .status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
}

export const getNextIndex = async (db: any) => {
  const getIndex = await db.findOne().sort({ index: -1 }).select('index').exec()
  return (getIndex?.index ?? -1) + 1
}
