import { drop, factory } from '@mswjs/data'
import { MODELS } from '@repo/api/config/api-paths'

import { env } from '#mock/config/env'
import { models } from '#mock/config/models'
import { seedCollections } from '#mock/config/seed-collections'

export const db = factory(models)
const isTesting = env.MODE === 'test'
const DB_KEY = 'msw-db'

export const loadDb = () =>
  JSON.parse(globalThis.localStorage?.getItem(DB_KEY) || '{}')

export const storeDb = (data: Record<string, any>) =>
  globalThis.localStorage?.setItem(DB_KEY, JSON.stringify(data))

export const clearDb = () => {
  if (isTesting) drop(db)
  else globalThis.localStorage?.removeItem(DB_KEY)
}

export const persistDb = (model: MODELS) => {
  const data = loadDb()
  data[model] = db[model].getAll()
  storeDb(data)
}

export const seedDb = () => {
  clearDb()
  for (const [key, value] of Object.entries(seedCollections)) {
    for (const item of value) {
      db[key as MODELS].create(item)
      if (!isTesting) persistDb(key as MODELS)
    }
  }
}

export const initializeDb = () => {
  if (env.MOCKING_SEED) seedDb()

  const database = loadDb()
  for (const [key, model] of Object.entries(db)) {
    const dataEntries = database[key]
    if (dataEntries) {
      for (const entry of dataEntries) {
        try {
          model.create(entry)
        } catch {
          /* empty */
        }
      }
    }
  }
}
