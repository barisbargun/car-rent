import { API_PATHS } from '@repo/api/config/api-paths'
import { Router } from 'express'

import { authRouter } from './auth'
import { cachedRouter } from './cached'
import { carouselsRouter } from './carousels'
import { footerLinksRouter } from './footer-links'
import { footerTitlesRouter } from './footer-titles'
import { imagesRouter } from './images'
import { menubarTabsRouter } from './menubar-tabs'
import { menubarVehiclesRouter } from './menubar-vehicles'
import { reviewsRouter } from './reviews'
import { servicesRouter } from './services'
import { siteConfigsRouter } from './site-config'
import { usersRouter } from './users'
import { vehiclesRouter } from './vehicles'

export const handlers: [string, Router][] = [
  ['auth', authRouter],
  [API_PATHS.cached, cachedRouter],
  [API_PATHS.carousel, carouselsRouter],
  [API_PATHS.footerTitle, footerTitlesRouter],
  [API_PATHS.footerLink, footerLinksRouter],
  [API_PATHS.image, imagesRouter],
  [API_PATHS.menubarTab, menubarTabsRouter],
  [API_PATHS.menubarVehicle, menubarVehiclesRouter],
  [API_PATHS.review, reviewsRouter],
  [API_PATHS.service, servicesRouter],
  [API_PATHS.siteConfig, siteConfigsRouter],
  [API_PATHS.user, usersRouter],
  [API_PATHS.vehicle, vehiclesRouter],
]
