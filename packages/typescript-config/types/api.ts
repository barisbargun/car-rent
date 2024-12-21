/*** User ***/
export type User = {
  id: string
  img: Image
  username: string
  password: string
  email: string
  role: number
  refreshToken: string
}

export type UserPost = Omit<User, 'img'> & {
  img: string
}

/*** Image ***/
export type Image = {
  id: string
  url: string
  publicId: string
}

/*** SiteConfig ***/
export type SiteConfig = {
  id: string
  logoImg: Image
  serviceImg: Image
  title: string
  desc: string
}

export type SiteConfigPost = Omit<SiteConfig, 'logoImg' | 'serviceImg'> & {
  logoImg: string
  serviceImg: string
}

/*** Carousel ***/
export type Carousel = {
  id: string
  img: Image
  index: number
  title: string
  desc: string
  vehicleName: string
  price: number
  engine: string
  power: string
}

export type CarouselPost = Omit<Carousel, 'img'> & {
  img: string
}

/*** Menubar ***/
export type MenubarFull = MenubarTab & {
  menubarVehicles: (MenubarVehicle & {
    vehicles: Vehicle[]
  })[]
}

export type MenubarTab = {
  id: string
  index: number
  title: string
  type: number
}

export type MenubarVehicle = {
  id: string
  img: Image
  menubarTab: MenubarTab
  index: number
  title: string
  desc: string
}

export type MenubarVehiclePost = Omit<MenubarVehicle, 'menubarTab' | 'img'> & {
  img: string
  menubarTab: string
}

/*** Vehicles ***/
export type Vehicle = {
  id: string
  img: Image
  menubarVehicle: MenubarVehicle
  index: number
  title: string
  fuel: string
  drivetrain: string
  wheel: string
}

export type VehiclePost = Omit<Vehicle, 'menubarVehicle' | 'img'> & {
  menubarVehicle: string
  img: string
}

/*** Service ***/
export type Service = {
  id: string
  img: Image
  index: number
  title: string
  desc: string
}

export type ServicePost = Omit<Service, 'img'> & {
  img: string
}

/*** Review ***/
export type Review = {
  id: string
  img: Image
  index: number
  fullname: string
  desc: string
  occupation: string
}

export type ReviewPost = Omit<Review, 'img'> & {
  img: string
}

/*** Footer ***/
export type FooterFull = FooterTab & {
  footerLinks: FooterLink[]
}

export type FooterTab = {
  id: string
  index: number
  title: string
}

export type FooterLink = {
  id: string
  footerTab: FooterTab
  index: number
  title: string
  link: string
}

export type FooterLinkPost = Omit<FooterLink, 'footerTab'> & {
  footerTab: string
}
