import { Image } from './image'

export type User = {
  id: string
  img?: string
  username: string
  password: string
  email: string
  role: ROLE_LIST
  refreshToken: string
}

export type UserGet = Omit<User, 'refreshToken' | 'password' | 'img'> & {
  img?: Image
}

export type UserPost = Omit<User, 'refreshToken'>

/**
 * ROLE
 */
export enum ROLE_LIST {
  USER,
  EDITOR,
  ADMIN,
}
export type RoleTypes = keyof typeof ROLE_LIST

export enum ROLE_POST_LIST {
  USER,
  EDITOR,
}
export enum ROLE_POST_LIST_UI {
  'User',
  'Editor',
}
