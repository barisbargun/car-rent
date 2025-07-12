import { MODELS } from '@repo/api/config/api-paths'
import { Model } from 'mongoose'
import NodeCache from 'node-cache'

import { modelCarousel } from '@/models/carousel'
import { modelFooterLink } from '@/models/footer-link'
import { modelFooterTitle } from '@/models/footer-title'
import { modelImage } from '@/models/image'
import { modelMenubarTab } from '@/models/menubar-tab'
import { modelMenubarVehicle } from '@/models/menubar-vehicle'
import { modelReview } from '@/models/review'
import { modelService } from '@/models/service'
import { modelSiteConfig } from '@/models/site-config'
import { modelVehicle } from '@/models/vehicle'

type CacheModel = {
  model: MODELS
  db: Model<any>
  populate?: string
}

const cacheModels: CacheModel[] = [
  { model: 'carousel', db: modelCarousel, populate: 'img' },
  { model: 'menubarTab', db: modelMenubarTab },
  { model: 'menubarVehicle', db: modelMenubarVehicle, populate: 'img' },
  { model: 'vehicle', db: modelVehicle, populate: 'img' },
  { model: 'service', db: modelService, populate: 'img' },
  { model: 'review', db: modelReview, populate: 'img' },
  { model: 'footerTitle', db: modelFooterTitle },
  { model: 'footerLink', db: modelFooterLink },
  { model: 'siteConfig', db: modelSiteConfig, populate: 'logoImg serviceImg' },
  { model: 'image', db: modelImage },
]

export type CacheModelKeys = (typeof cacheModels)[number]['model']

const cache = new NodeCache()

const storeCache = (cacheKey: MODELS, data: any) => {
  // eslint-disable-next-line unicorn/prefer-structured-clone
  cache.set(cacheKey, JSON.parse(JSON.stringify(data)))
}

const buildQuery = ({ model, db, populate }: CacheModel) => {
  const query =
    model === 'siteConfig' ? db.findOne() : db.find({}).sort({ index: 1 })
  return populate ? query.populate(populate) : query
}

export const initializeCache = async () => {
  const cachePromises = cacheModels.map(async (cacheModel) => {
    const data = await buildQuery(cacheModel).exec()
    storeCache(cacheModel.model, data)
  })

  await Promise.all(cachePromises)
}

export const revalidateCache = async (model: CacheModelKeys) => {
  const cacheModel = cacheModels.find((m) => m.model === model)
  if (!cacheModel) return

  const { db, populate } = cacheModel
  const data = await buildQuery({ model, db, populate }).exec()
  storeCache(model, data)
}

export const getCache = (cacheKey: MODELS) => cache.get(cacheKey)
