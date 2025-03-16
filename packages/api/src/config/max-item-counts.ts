import { MODELS } from './api-paths'

export const maxItemCounts = {
  image: 80,
  user: 5,
  siteConfig: 1,
  carousel: 12,
  vehicle: 80,
  service: 5,
  review: 8,
  menubarTab: 10,
  menubarVehicle: 30,
  footerTitle: 10,
  footerLink: 20,
} as const satisfies Record<MODELS, number>
