import { validationMsg } from '#api/lib/utils'
import z from 'zod'

/*

ENUMS

*/
export enum MENUBAR_TAB_GRID_LIST {
  GRID4,
  GRID6,
}
export enum MENUBAR_TAB_GRID_LIST_UI {
  'Grid 4',
  'Grid 6',
}

/*

SCHEMAS

*/
export const menubarTabCreateSchema = z.object({
  title: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
  type: z.nativeEnum(MENUBAR_TAB_GRID_LIST, {
    required_error: 'Grid is required',
  }),
})

export const menubarTabUpdateSchema = menubarTabCreateSchema

/*

TYPES

*/
export type MenubarTab = {
  id:string
  index: number
  title: string
  type: MENUBAR_TAB_GRID_LIST
}

export type MenubarTabCreate = z.infer<typeof menubarTabCreateSchema>

export type MenubarTabUpdate = z.infer<typeof menubarTabUpdateSchema>
