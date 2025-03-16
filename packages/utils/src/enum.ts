export const isInEnum = <T extends object>(
  enumObj: T,
  value: number,
): boolean => Object.values(enumObj).includes(value as T[keyof T])

export const getEnumKeys = <T extends Record<string, string | number>>(
  enumObj: T,
): (keyof T)[] =>
  Object.keys(enumObj).filter((key) => Number.isNaN(Number(key))) as (keyof T)[]

export const getEnumValues = <T extends Record<string, string | number>>(
  enumObj: T,
): number[] =>
  Object.values(enumObj).filter(
    (value) => !Number.isNaN(Number(value)),
  ) as number[]

export const getEnumEntries = <T extends Record<string, string | number>>(
  enumObj: T,
): [keyof T, number][] =>
  Object.entries(enumObj)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([key, value]) => [key, value as number])
