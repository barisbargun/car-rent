import { RequiredRole } from '@repo/api/config/required-role'
import { NextFunction, Request, Response } from 'express'

import { sendResponse } from '@/lib/utils'

export const verifyRole = (checkRole: RequiredRole) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    try {
      const role = res.locals.userRole
      checkRole(role, true)

      next()
    } catch (error: any) {
      sendResponse(res, error)
    }
  }
}
