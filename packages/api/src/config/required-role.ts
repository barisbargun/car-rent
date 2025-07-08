import { isInEnum } from '@repo/utils/enum'
import { giveError } from '@repo/utils/error'

import { ROLE_LIST } from '#api/paths/user/common'

import { MODELS } from './api-paths'

const requiredRole = (role: ROLE_LIST) => {
  return (
    userRole: ROLE_LIST = ROLE_LIST.USER,
    giveThrow = false,
    message = 'You are not allowed to this action',
  ) => {
    if (!isInEnum(ROLE_LIST, userRole) || role > userRole) {
      if (giveThrow) throw giveError(403, message)
      return false
    }
    return true
  }
}

export type RequiredRole = (
  userRole?: ROLE_LIST,
  giveThrow?: boolean,
  message?: string,
) => boolean

const reqAdmin = requiredRole(ROLE_LIST.ADMIN)
const reqEditor = requiredRole(ROLE_LIST.EDITOR)

type Keys = MODELS | 'others'
type OPERATIONS =
  | 'get'
  | 'add'
  | 'update'
  | 'remove'
  | 'swap'
  | 'admin'
  | 'editor'

export const REQUIRED_ROLE = {
  user: {
    get: reqAdmin,
    add: reqAdmin,
    update: reqAdmin,
    remove: reqAdmin,
  },
  siteConfig: {
    update: reqAdmin,
  },
  carousel: {
    add: reqEditor,
    update: reqEditor,
    remove: reqEditor,
    swap: reqEditor,
  },
  image: {
    add: reqEditor,
    remove: reqEditor,
  },
  vehicle: {
    add: reqEditor,
    update: reqEditor,
    remove: reqEditor,
    swap: reqEditor,
  },
  service: {
    add: reqEditor,
    update: reqEditor,
  },
  review: {
    add: reqEditor,
    update: reqEditor,
    remove: reqEditor,
    swap: reqEditor,
  },
  menubarTab: {
    add: reqEditor,
    update: reqEditor,
    remove: reqEditor,
    swap: reqEditor,
  },
  menubarVehicle: {
    add: reqEditor,
    update: reqEditor,
    remove: reqEditor,
    swap: reqEditor,
  },
  footerTitle: {
    add: reqEditor,
    update: reqEditor,
    remove: reqEditor,
    swap: reqEditor,
  },
  footerLink: {
    add: reqEditor,
    update: reqEditor,
    remove: reqEditor,
    swap: reqEditor,
  },
  others: {
    admin: reqAdmin,
    editor: reqEditor,
  },
} as const satisfies Record<Keys, Partial<Record<OPERATIONS, RequiredRole>>>
