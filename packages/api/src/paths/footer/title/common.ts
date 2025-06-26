import z from 'zod'

import { validationMsg } from '#api/lib/utils'

/*

SCHEMAS

*/
export const footerTitleCreateSchema = z.object({
  title: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
})

export const footerTitleUpdateSchema = footerTitleCreateSchema

/*

TYPES

*/
export type FooterTitle = {
  id:string
  index: number
  title: string
}

export type FooterTitleCreate = z.infer<typeof footerTitleCreateSchema>

export type FooterTitleUpdate = z.infer<typeof footerTitleUpdateSchema>
