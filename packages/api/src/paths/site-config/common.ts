import z from 'zod'

import { validationMsg } from '#api/lib/utils'

import { Image } from '../image/common'

/*

SCHEMAS

*/
export const siteConfigUpdateSchema = z.object({
  logoImg: z.string().optional(),
  serviceImg: z.string().optional(),
  title: z.string().max(50, validationMsg('max', 50)),
  desc: z.string().max(300, validationMsg('max', 300)),
})

/*

TYPES

*/
export type SiteConfig = {
  id:string
  logoImg?: string
  serviceImg?: string
  title?: string
  desc?: string
}

export type SiteConfigGet = Omit<SiteConfig, 'logoImg' | 'serviceImg'> & {
  logoImg?: Image
  serviceImg?: Image
}

export type SiteConfigUpdate = z.infer<typeof siteConfigUpdateSchema>
