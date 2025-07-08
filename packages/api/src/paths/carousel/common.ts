import z from 'zod'

import { validationMsg } from '#api/lib/utils'

import { Image } from '../image/common'

/*

SCHEMAS

*/
export const carouselCreateSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  title: z.string().max(150, validationMsg('max', 150)),
  desc: z.string().max(300, validationMsg('max', 300)),
  vehicleName: z
    .string()
    .min(2, validationMsg('min', 2))
    .max(150, validationMsg('max', 150)),
  engine: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(150, validationMsg('max', 150)),
  power: z.coerce
    .number()
    .min(10, 'Power must be at least 10')
    .max(10_000, 'Power must be at most 10,000'),
  price: z.coerce
    .number()
    .min(10, 'Price must be at least 10')
    .max(10_000, 'Price must be at most 10,000'),
})

export const carouselUpdateSchema = carouselCreateSchema

/*

TYPES

*/
export type Carousel = {
  id: string
  img: string
  index: number
  title?: string
  desc?: string
  vehicleName: string
  engine: string
  price: number
  power: number
}

export type CarouselGet = Omit<Carousel, 'img'> & {
  img?: Image
}

export type CarouselCreate = z.infer<typeof carouselCreateSchema>

export type CarouselUpdate = z.infer<typeof carouselUpdateSchema>
