import z from 'zod'

import { validationMsg } from '#api/lib/utils'

/*

SCHEMAS

*/
export const authLoginSchema = z.object({
  username: z
    .string()
    .min(2, validationMsg('min', 2))
    .max(150, validationMsg('max', 150)),
  password: z.string().min(2).max(150, validationMsg('max', 150)),
})

/*

TYPES

*/
export type TokenResponse = {
  accessToken: string
}
export type AuthLogin = z.infer<typeof authLoginSchema>
