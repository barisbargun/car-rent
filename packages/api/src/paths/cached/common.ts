import { CarouselGet } from '../carousel/common'
import { FooterLink } from '../footer/link/common'
import { FooterTitle } from '../footer/title/common'
import { MenubarTab } from '../menubar/tab/common'
import { MenubarVehicleGet } from '../menubar/vehicle/common'
import { ReviewGet } from '../review/common'
import { ServiceGet } from '../service/common'
import { SiteConfigGet } from '../site-config/common'
import { VehicleGet } from '../vehicle/common'

export type CachedGet = {
  carousels?: CarouselGet[] | undefined
  menubarTabs?: MenubarTab[] | undefined
  menubarVehicles?: MenubarVehicleGet[] | undefined
  vehicles?: VehicleGet[] | undefined
  services?: ServiceGet[] | undefined
  reviews?: ReviewGet[] | undefined
  footerTitles?: FooterTitle[] | undefined
  footerLinks?: FooterLink[] | undefined
  siteConfig?: SiteConfigGet | undefined
}
