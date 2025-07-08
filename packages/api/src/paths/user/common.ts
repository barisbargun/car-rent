import { objectExclude } from '@repo/utils/obj'
import z from 'zod'

import { validationMsg } from '#api/lib/utils'

import { Image } from '../image/common'

/*

ENUMS

*/
export enum ROLE_LIST {
  USER,
  EDITOR,
  ADMIN,
}
export enum ROLE_POST_LIST {
  USER,
  EDITOR,
}
export enum ROLE_POST_LIST_UI {
  'User',
  'Editor',
}

/*

SCHEMAS

*/
export const userCreateSchema = z.object({
  img: z.string().optional(),
  username: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
  password: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
  email: z.string().email(),
  role: z.nativeEnum(ROLE_POST_LIST, {
    required_error: 'Role is required',
  }),
})

export const userUpdateSchema = userCreateSchema
  .omit({
    password: true,
  })
  .partial()

export const userUpdateSelfSchema = userCreateSchema
  .omit({
    password: true,
    role: true,
  })
  .extend({
    password: z
      .string()
      .refine((val) => val.length === 0 || val.length >= 3, {
        message: validationMsg('min', 3),
      })
      .optional(),
  })
  .partial()
/*

TYPES

*/
export type User = {
  id: string
  img: string
  username: string
  password: string
  email: string
  role: ROLE_LIST
  refreshToken?: string | undefined
}

export type UserGet = Omit<User, 'img' | 'password' | 'refreshToken'> & {
  img?: Image
}

export type UserCreate = z.infer<typeof userCreateSchema>

export type UserUpdate = z.infer<typeof userUpdateSchema>

export type UserUpdateSelf = z.infer<typeof userUpdateSelfSchema>

export const sanitizeUser = <
  O extends Pick<User, 'password' | 'refreshToken'> & Record<string, any>,
>(
  user: O,
): Omit<O, 'password' | 'refreshToken'> =>
  objectExclude(user, ['password', 'refreshToken'])
