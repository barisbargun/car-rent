import { primaryKey } from '@mswjs/data'
import { MODELS } from '@repo/api/config/api-paths'
import { nanoid } from 'nanoid'

export const models = {
  image: {
    id: primaryKey(nanoid),
    publicId: nanoid,
    url: String,
  },
  user: {
    id: primaryKey(nanoid),
    username: String,
    password: String,
    email: String,
    role: Number,
    img: String,
    refreshToken: String,
  },
  siteConfig: {
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
    engine: String,
    power: Number,
    price: Number,
  },
  menubarTab: {
    id: primaryKey(nanoid),
    index: Number,
    type: Number,
    title: String,
  },
  menubarVehicle: {
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
    drivetrain: Number,
    wheel: Number,
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
  footerTitle: {
    id: primaryKey(nanoid),
    index: Number,
    title: String,
  },
  footerLink: {
    id: primaryKey(nanoid),
    index: Number,
    footerTitle: String,
    title: String,
    link: String,
  },
} satisfies Record<MODELS, any>
