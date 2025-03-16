import Cookies from 'js-cookie'

import { env } from './env'

export const AUTH_COOKIE = 'jwt'

export const createJwtCookie = (refreshToken: string) => {
  Cookies.set(
    AUTH_COOKIE,
    refreshToken,
    env.MODE === 'test' ? {} : { path: '/', expires: 1 },
  )
}

export const getJwtCookie = (cookies: Record<string, string>) => {
  return cookies[AUTH_COOKIE] || Cookies.get(AUTH_COOKIE)
}

export const removeJwtCookie = () => {
  Cookies.remove(AUTH_COOKIE)
}
