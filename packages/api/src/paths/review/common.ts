import { validationMsg } from '#api/lib/utils'
import z from 'zod'

import { Image } from '../image/common'

/*

SCHEMAS

*/
export const reviewCreateSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  fullname: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(150, validationMsg('max', 150)),
  desc: z
    .string()
    .min(20, validationMsg('min', 20))
    .max(300, validationMsg('max', 300)),
  occupation: z.string().max(150, validationMsg('max', 150)),
})

export const reviewUpdateSchema = reviewCreateSchema

/*

TYPES

*/
export type Review = {
  id:string
  index: number
  img: string
  fullname: string
  desc: string
  occupation: string
}

export type ReviewGet = Omit<Review, 'img'> & {
  img?: Image
}

export type ReviewCreate = z.infer<typeof reviewCreateSchema>

export type ReviewUpdate = z.infer<typeof reviewUpdateSchema>
