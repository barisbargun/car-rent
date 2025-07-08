import { giveError } from '@repo/utils/error'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

export const generateHash = async (value?: string): Promise<string> => {
  if (!value || value.length === 0)
    throw giveError(StatusCodes.FORBIDDEN, 'Password cannot be empty')
  return await bcrypt.hash(value, 12)
}
