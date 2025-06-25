import { Image } from './image'

export type SiteConfig = {
  id: string
  logoImg?: string
  serviceImg?: string
  title: string
  desc?: string
}

export type SiteConfigGet = Omit<SiteConfig, 'logoImg' | 'serviceImg'> & {
  logoImg?: Image
  serviceImg?: Image
}
