import { Image } from './image'

export type MenubarTab = {
  id: string
  index: number
  title: string
  type: MENUBAR_TAB_GRID_LIST
}

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

/**
 * MENUBAR TAB GRID
 */
export enum MENUBAR_TAB_GRID_LIST {
  GRID4,
  GRID6,
}
export enum MENUBAR_TAB_GRID_LIST_UI {
  'Grid 4',
  'Grid 6',
}
