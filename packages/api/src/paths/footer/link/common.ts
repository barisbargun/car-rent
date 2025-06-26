import { validationMsg } from '#api/lib/utils'
import z from 'zod'

/*

SCHEMAS

*/
export const footerLinkCreateSchema = z.object({
  footerTitle: z.string().min(1, 'FooterLink title is required'),
  title: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(50, validationMsg('max', 50)),
  link: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(200, validationMsg('max', 200)),
})

export const footerLinkUpdateSchema = footerLinkCreateSchema

/*

TYPES

*/
export type FooterLink = {
  id:string
  index: number
  footerTitle: string
  title: string
  link: string
}

export type FooterLinkCreate = z.infer<typeof footerLinkCreateSchema>

export type FooterLinkUpdate = z.infer<typeof footerLinkUpdateSchema>
