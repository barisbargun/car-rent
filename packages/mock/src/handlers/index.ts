import { authHandlers } from './auth'
import { carouselsHandlers } from './carousels'
import { footerLinksHandlers } from './footer-links'
import { footerTitlesHandlers } from './footer-titles'
import { imagesHandlers } from './images'
import { menubarTabsHandlers } from './menubar-tabs'
import { menubarVehiclesHandlers } from './menubar-vehicles'
import { reviewsHandlers } from './reviews'
import { servicesHandlers } from './services'
import { siteConfigsHandlers } from './site-config'
import { usersHandlers } from './users'
import { vehiclesHandlers } from './vehicles'

export const handlers = [
  ...usersHandlers,
  ...siteConfigsHandlers,
  ...imagesHandlers,
  ...carouselsHandlers,
  ...menubarTabsHandlers,
  ...menubarVehiclesHandlers,
  ...vehiclesHandlers,
  ...servicesHandlers,
  ...reviewsHandlers,
  ...footerTitlesHandlers,
  ...footerLinksHandlers,
  ...authHandlers,
]
