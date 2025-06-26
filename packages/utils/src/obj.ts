/**
 * Excludes specified keys from an object.
 * @param data The source object.
 * @param excludedKeys An array of keys to exclude.
 * @returns A new object without the excluded keys.
 */
export const objectExclude = <T extends object, K extends keyof T>(
  data: T,
  excludedKeys: K[],
): Omit<T, K> => {
  const result = { ...data }
  for (const key of excludedKeys) {
    delete result[key]
  }
  return result
}

export const getNextIndex = (data: { index: number }[]): number => {
  const indexes = data.map((item) => item.index)
  const maxIndex = indexes.length > 0 ? Math.max(...indexes) : -1
  return maxIndex + 1
}

export const sortByIndex = <T extends { index: number }>(data: T[]): T[] => {
  return data.sort((a, b) => a.index - b.index)
}
