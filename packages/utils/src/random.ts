export const randElement = <T>(...elements: T[]): T => {
  if (elements.length === 0) {
    throw new Error('randElement requires at least one argument.')
  }
  return elements[Math.floor(Math.random() * elements.length)]
}
