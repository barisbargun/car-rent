import jwt from 'jsonwebtoken'

export const encode = (obj: any, secret: string, expiresIn: number) =>
  jwt.sign(obj, secret, { expiresIn })

export const decode = (
  token: string,
  secret: string,
): { id: string } | { id: string; role: number } | undefined =>
  jwt.verify(token, secret) as any
