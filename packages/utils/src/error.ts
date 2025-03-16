import { getReasonPhrase, StatusCodes } from 'http-status-codes'

export const giveError = (status: StatusCodes, message?: string) => {
  const msg = message ?? getReasonPhrase(status)
  return { status, message: msg }
}

export * from 'http-status-codes'
