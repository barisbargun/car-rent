import z from 'zod'

import { validationMsg } from '#api/lib/utils'
import { Image } from '#api/paths/image/common'

/*

SCHEMAS

*/
export const menubarVehicleCreateSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  menubarTab: z.string().min(1, 'Menubar tab is required'),
  title: z
    .string()
    .min(2, validationMsg('min', 2))
    .max(50, validationMsg('max', 50)),
  desc: z.string().max(150, validationMsg('max', 150)),
})

export const menubarVehicleUpdateSchema = menubarVehicleCreateSchema

/*

TYPES

*/
export type MenubarVehicle = {
  id: string
  img?: string
  menubarTab: string
  index: number
  title: string
  desc: string
}

export type MenubarVehicleGet = Omit<MenubarVehicle, 'img'> & {
  img?: Image
}

export type MenubarVehicleCreate = z.infer<typeof menubarVehicleCreateSchema>

export type MenubarVehicleUpdate = z.infer<typeof menubarVehicleUpdateSchema>
