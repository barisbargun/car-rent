import z from 'zod'

import { validationMsg } from '#api/lib/utils'

import { Image } from '../image/common'

/*

ENUMS

*/
export enum DRIVE_TRAIN_LIST {
  FWD,
  RWD,
  AWD,
}
export enum DRIVE_TRAIN_LIST_UI {
  'FWD',
  'RWD',
  'AWD',
}

export enum WHEEL_DRIVE_LIST {
  AUTO,
  MANUAL,
}
export enum WHEEL_DRIVE_LIST_UI {
  'Automatic',
  'Manual',
}

/*

SCHEMAS

*/
export const vehicleCreateSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  menubarVehicle: z.string().min(1, 'Menubar vehicle is required'),
  title: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(50, validationMsg('max', 50)),
  fuel: z
    .string()
    .min(1, validationMsg('min', 1))
    .max(20, validationMsg('max', 20)),
  drivetrain: z.nativeEnum(DRIVE_TRAIN_LIST, {
    required_error: 'Drive train is required',
  }),
  wheel: z.nativeEnum(WHEEL_DRIVE_LIST, {
    required_error: 'Wheel is required',
  }),
})

export const vehicleUpdateSchema = vehicleCreateSchema

/*

TYPES

*/
export type Vehicle = {
  id: string
  index: number
  img: string
  menubarVehicle: string
  title: string
  fuel: string
  drivetrain: DRIVE_TRAIN_LIST
  wheel: WHEEL_DRIVE_LIST
}

export type VehicleGet = Omit<Vehicle, 'img'> & {
  img?: Image
}

export type VehicleCreate = z.infer<typeof vehicleCreateSchema>

export type VehicleUpdate = z.infer<typeof vehicleUpdateSchema>
