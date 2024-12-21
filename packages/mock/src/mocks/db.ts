import { factory, primaryKey } from '@mswjs/data'
import { nanoid } from 'nanoid'

export const models = {
  user: {
    id: primaryKey(nanoid),
    username: String,
    password: String,
    email: String,
    role: String,
    img: String,
    refreshToken: String,
  },
  image: {
    id: primaryKey(nanoid),
    url: String,
    publicId: String,
  },
  site_config: {
    id: primaryKey(nanoid),
    title: String,
    desc: String,
    logoImg: String,
    serviceImg: String,
  },
  carousel: {
    id: primaryKey(nanoid),
    index: Number,
    img: String,
    title: String,
    desc: String,
    vehicleName: String,
    price: Number,
    engine: String,
    power: String,
  },
  menubar_tab: {
    id: primaryKey(nanoid),
    index: Number,
    type: Number,
    title: String,
  },
  menubar_vehicle: {
    id: primaryKey(nanoid),
    menubarTab: String,
    index: Number,
    img: String,
    title: String,
    desc: String,
  },
  vehicle: {
    id: primaryKey(nanoid),
    menubarVehicle: String,
    index: Number,
    img: String,
    title: String,
    fuel: String,
    drivetrain: String,
    wheel: String,
  },
  service: {
    id: primaryKey(nanoid),
    index: Number,
    img: String,
    title: String,
    desc: String,
  },
  review: {
    id: primaryKey(nanoid),
    index: Number,
    img: String,
    fullname: String,
    occupation: String,
    desc: String,
  },
  footer_tab: {
    id: primaryKey(nanoid),
    index: Number,
    title: String,
  },
  footer_link: {
    id: primaryKey(nanoid),
    index: Number,
    footerTab: String,
    title: String,
    link: String,
  },
}

export const db = factory(models)

export type Model = keyof typeof models

const dbFilePath = 'mocked-db.json'

export const loadDb = async () => {
  // If we are running in a Node.js environment
  if (typeof globalThis === 'undefined') {
    const { readFile, writeFile } = await import('node:fs/promises')
    try {
      const data = await readFile(dbFilePath, 'utf8')
      return JSON.parse(data)
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        const emptyDB = {}
        await writeFile(dbFilePath, JSON.stringify(emptyDB, undefined, 2))
        return emptyDB
      } else {
        console.error('Error loading mocked DB:', error)
        return
      }
    }
  }
  // If we are running in a browser environment
  return Object.assign(
    JSON.parse(globalThis.localStorage.getItem('msw-db') || '{}'),
  )
}

export const storeDb = async (data: string) => {
  // If we are running in a Node.js environment
  if (typeof globalThis === 'undefined') {
    const { writeFile } = await import('node:fs/promises')
    await writeFile(dbFilePath, data)
  } else {
    // If we are running in a browser environment
    globalThis.localStorage.setItem('msw-db', data)
  }
}

export const persistDb = async (model: Model) => {
  if (process.env.NODE_ENV === 'test') return
  const data = await loadDb()
  data[model] = db[model].getAll()
  await storeDb(JSON.stringify(data))
}

export const initializeDb = async () => {
  const database = await loadDb()
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

export const resetDb = () => {
  globalThis.localStorage.clear()
}
