import z from 'zod'

import { validationMsg } from '#api/lib/utils'

import { Image } from '../image/common'

/*

SCHEMAS

*/
export const serviceCreateSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  title: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(50, validationMsg('max', 50)),
  desc: z
    .string()
    .min(20, validationMsg('min', 20))
    .max(300, validationMsg('max', 300)),
})

export const serviceUpdateSchema = serviceCreateSchema

/*

TYPES

*/
export type Service = {
  id: string
  index: number
  img: string
  title: string
  desc: string
}

export type ServiceGet = Omit<Service, 'img'> & {
  img?: Image
}

export type ServiceCreate = z.infer<typeof serviceCreateSchema>

export type ServiceUpdate = z.infer<typeof serviceUpdateSchema>
