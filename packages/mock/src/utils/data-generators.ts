import {
  randEmail,
  randFullName,
  randJobType,
  randNumber,
  randPassword,
  randTextRange,
  randUrl,
  randUserName,
  randVehicle,
} from '@ngneat/falso'
import { MODELS } from '@repo/api/config/api-paths'
import { Carousel } from '@repo/api/types/carousel'
import { FooterLink, FooterTitle } from '@repo/api/types/footer'
import {
  MENUBAR_TAB_GRID_LIST,
  MenubarTab,
  MenubarVehicle,
} from '@repo/api/types/menubar'
import { Review } from '@repo/api/types/review'
import { Service } from '@repo/api/types/service'
import { SiteConfig } from '@repo/api/types/site-config'
import { ROLE_POST_LIST, UserPost } from '@repo/api/types/user'
import {
  DRIVE_TRAIN_LIST,
  Vehicle,
  WHEEL_DRIVE_LIST,
} from '@repo/api/types/vehicle'
import { getEnumValues } from '@repo/utils/enum'
import { getNextIndex } from '@repo/utils/obj'
import { randElement } from '@repo/utils/random'

import { seedCollections } from '../config/seed-collections'
import { db } from '../db'
import { hash } from '../utils/mock'

const images = seedCollections.image

const createModel = <T>(data: () => T, model: MODELS) => {
  return (properties: Partial<T> = {}, writeDb = false): T => {
    const merge = { ...data(), ...properties } as any

    /** Check if image exists, if not create a new one */
    if ('img' in merge && merge.img) {
      const isExist = db.image.findFirst({
        where: {
          id: {
            equals: merge.img,
          },
        },
      })
      if (!isExist) {
        const img = images.find((img) => img.id === merge.img)
        if (!img) throw new Error(`Image with id ${merge.img} not found`)
        db.image.create(img)
      }
    }

    /** Hashing password */
    if ('password' in merge && merge.password)
      merge.password = hash(merge.password as string) as any
    if (writeDb) db[model].create(merge)

    return merge
  }
}

const randomImage = () => randElement(...images)

const user = () =>
  ({
    img: randomImage().id,
    username: randUserName(),
    password: randPassword({ size: 20 }) as any,
    email: randEmail(),
    role: randElement(...getEnumValues(ROLE_POST_LIST)),
  }) as Required<UserPost>

const siteConfig = () =>
  ({
    logoImg: randomImage().id,
    serviceImg: randomImage().id,
    title: randTextRange({ min: 0, max: 50 }),
    desc: randTextRange({ min: 0, max: 300 }),
  }) as Required<SiteConfig>

const carousel = () =>
  ({
    index: getNextIndex(db.carousel.getAll()),
    img: randomImage().id,
    title: randTextRange({ min: 0, max: 150 }),
    desc: randTextRange({ min: 0, max: 300 }),
    vehicleName: randVehicle(),
    engine: randTextRange({ min: 3, max: 150 }),
    power: randNumber({ min: 10, max: 10_000 }),
    price: randNumber({ min: 10, max: 10_000 }),
  }) as Required<Carousel>

const review = () =>
  ({
    index: getNextIndex(db.review.getAll()),
    img: randomImage().id,
    fullname: randFullName({}),
    desc: randTextRange({ min: 20, max: 300 }),
    occupation: randJobType(),
  }) as Required<Review>

const service = () =>
  ({
    index: getNextIndex(db.service.getAll()),
    img: randomImage().id,
    title: randTextRange({ min: 5, max: 50 }),
    desc: randTextRange({ min: 20, max: 300 }),
  }) as Required<Service>

const menubarTab = () =>
  ({
    index: getNextIndex(db.menubarTab.getAll()),
    title: randTextRange({ min: 3, max: 50 }),
    type: randElement(...getEnumValues(MENUBAR_TAB_GRID_LIST)),
  }) as Required<MenubarTab>

const menubarVehicle = () =>
  ({
    index: getNextIndex(db.menubarVehicle.getAll()),
    img: randomImage().id,
    menubarTab: randElement(...db.menubarTab.getAll().map((v) => v.id)),
    title: randTextRange({ min: 5, max: 50 }),
    desc: randTextRange({ min: 0, max: 150 }),
  }) as Required<MenubarVehicle>

const vehicle = () =>
  ({
    index: getNextIndex(db.vehicle.getAll()),
    img: randomImage().id,
    menubarVehicle: randElement(...db.menubarVehicle.getAll().map((v) => v.id)),
    title: randTextRange({ min: 5, max: 50 }),
    fuel: randElement(randNumber({ min: 4, max: 1000 }).toString(), 'electric'),
    drivetrain: randElement(...getEnumValues(DRIVE_TRAIN_LIST)),
    wheel: randElement(...getEnumValues(WHEEL_DRIVE_LIST)),
  }) as Required<Vehicle>

const footerTitle = () =>
  ({
    index: getNextIndex(db.footerTitle.getAll()),
    title: randTextRange({ min: 10, max: 50 }),
  }) as Required<FooterTitle>

const footerLink = () =>
  ({
    index: getNextIndex(db.footerLink.getAll()),
    footerTitle: randElement(...db.footerTitle.getAll().map((v) => v.id)),
    title: randTextRange({ min: 5, max: 50 }),
    link: randUrl(),
  }) as Required<FooterLink>

/*

Use in

*/
export const generateImage = createModel(randomImage, 'image')

export const generateUser = createModel(user, 'user')

export const generateSiteConfig = createModel(siteConfig, 'siteConfig')

export const generateCarousel = createModel(carousel, 'carousel')

export const generateReview = createModel(review, 'review')

export const generateService = createModel(service, 'service')

export const generateMenubarTab = createModel(menubarTab, 'menubarTab')

export const generateMenubarVehicle = createModel(
  menubarVehicle,
  'menubarVehicle',
)

export const generateVehicle = createModel(vehicle, 'vehicle')

export const generateFooterTitle = createModel(footerTitle, 'footerTitle')

export const generateFooterLink = createModel(footerLink, 'footerLink')
