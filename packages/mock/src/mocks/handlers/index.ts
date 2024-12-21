import { carouselsHandlers } from './carousels'
import { footerLinksHandlers } from './footer-links'
import { footerTabsHandlers } from './footer-tabs'
import { imagesHandlers } from './images'
import { menubarTabsHandlers } from './menubar-tabs'
import { menubarVehiclesHandlers } from './menubar-vehicles'
import { reviewsHandlers } from './reviews'
import { servicesHandlers } from './services'
import { siteConfigHandlers } from './site-config'
import { vehiclesHandlers } from './vehicles'

export const handlers = [
  ...siteConfigHandlers,
  ...imagesHandlers,
  ...carouselsHandlers,
  ...menubarTabsHandlers,
  ...menubarVehiclesHandlers,
  ...vehiclesHandlers,
  ...servicesHandlers,
  ...reviewsHandlers,
  ...footerTabsHandlers,
  ...footerLinksHandlers,
]
