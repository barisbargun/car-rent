/* eslint-disable unicorn/prefer-code-point */
import Cookies from 'js-cookie'
import { delay } from 'msw'

import { db } from './db'

export const encode = (obj: any) => {
  const btoa =
    typeof globalThis === 'undefined'
      ? (str: string) => Buffer.from(str, 'binary').toString('base64')
      : globalThis.btoa
  return btoa(JSON.stringify(obj))
}

export const decode = (str: string) => {
  const atob =
    typeof globalThis === 'undefined'
      ? (str: string) => Buffer.from(str, 'base64').toString('binary')
      : globalThis.atob
  return JSON.parse(atob(str))
}

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

export const networkDelay = () => {
  const delayTime =
    // import.meta.env.TEST
    //   ? 200
    //   :
    Math.floor(Math.random() * 700) + 300
  return delay(delayTime)
}

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key]
    }
  }

  return result
}

export const sanitizeUser = <O extends object>(user: O) =>
  omit<O>(user, ['password', 'iat'])

export function authenticate({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user)
    const encodedToken = encode(sanitizedUser)
    return { user: sanitizedUser, jwt: encodedToken }
  }

  const error = new Error('Invalid username or password')
  throw error
}

export const AUTH_COOKIE = `bulletproof_react_app_token`

export function requireAuth(cookies: Record<string, string>) {
  try {
    const encodedToken = cookies[AUTH_COOKIE] || Cookies.get(AUTH_COOKIE)
    if (!encodedToken) {
      return { error: 'Unauthorized', user: undefined }
    }
    const decodedToken = decode(encodedToken) as { id: string }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    })

    if (!user) {
      return { error: 'Unauthorized', user: undefined }
    }

    return { user: sanitizeUser(user) }
  } catch {
    return { error: 'Unauthorized', user: undefined }
  }
}

export function requireAdmin(user: any) {
  if (user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
}
