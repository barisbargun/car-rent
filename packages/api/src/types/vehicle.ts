import { Image } from './image'

export type Vehicle = {
  id: string
  index: number
  img?: string
  menubarVehicle: string
  title: string
  fuel: string
  drivetrain: DRIVE_TRAIN_LIST
  wheel: WHEEL_DRIVE_LIST
}

export type VehicleGet = Omit<Vehicle, 'img'> & {
  img?: Image
}

/**
 * DRIVE TRAIN
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

/**
 * WHEEL DRIVE
 */
export enum WHEEL_DRIVE_LIST {
  AUTO,
  MANUAL,
}
export enum WHEEL_DRIVE_LIST_UI {
  'Automatic',
  'Manual',
}
