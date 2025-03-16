// Helper to get the current timestamp in seconds (JWT uses seconds since epoch)
const getCurrentTimestamp = () => Math.floor(Date.now() / 1000)

// Encode function with expiration
export const encode = (obj: any, expiresInSeconds: number = 3600) => {
  const btoa =
    typeof globalThis === 'undefined'
      ? (str: string) => Buffer.from(str, 'binary').toString('base64')
      : globalThis.btoa

  // Add JWT-like payload claims
  const payload = {
    ...obj, // Spread the input object (e.g., user data)
    iat: getCurrentTimestamp(), // Issued at
    exp: getCurrentTimestamp() + expiresInSeconds, // Expiration time
  }

  return btoa(JSON.stringify(payload))
}

// Decode function with expiration check
export const decode = (
  str: string,
): undefined | { id: string } | { id: string; role: number } => {
  const atob =
    typeof globalThis === 'undefined'
      ? (str: string) => Buffer.from(str, 'base64').toString('binary')
      : globalThis.atob

  const decodedStr = atob(str)
  const payload = JSON.parse(decodedStr)

  // Check if token is expired
  const currentTime = getCurrentTimestamp()
  if (!payload.exp || currentTime < payload.exp) return payload
}
