import {
  CarouselPost,
  FooterLinkPost,
  FooterTab,
  Image,
  MenubarTab,
  MenubarVehiclePost,
  ReviewPost,
  ServicePost,
  SiteConfigPost,
  UserPost,
  VehiclePost,
} from '@repo/typescript-config/types/api'

import { db, Model, persistDb, resetDb } from './db'

const autoIndex = <T>(model: T[]) =>
  model.map((item, index) => ({ ...item, index: index + 1 }))

type ExcludeId<T> = Omit<T, 'id'>

const users: ExcludeId<UserPost>[] = [
  {
    username: 'admin',
    password: '$2a$12$mcKA1rb4v5pNCl71C.lIwuyaU1N/OZ7Mp5SbnSO4UHNi1X4r6Dj7.',
    email: 'abc@gmail.com',
    role: 0,
    img: '65eb2c2541603216c5d18ed4',
    refreshToken: '',
  },
]

const images: Image[] = [
  {
    id: '65ecad59fd0112163140eba9',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710009684/car-rent/uj1jfbplniw9clc1mi8y.webp',
    publicId: 'uj1jfbplniw9clc1mi8y',
  },
  {
    id: '65ec3563e8dcbbaddd1ef494',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709978974/car-rent/kxuperibgmooo2hwwfou.webp',
    publicId: 'kxuperibgmooo2hwwfou',
  },
  {
    id: '65ecdc5fcbd34e2bdbf54c62',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710021722/car-rent/hnf7fy7jbakpsx4klqxo.webp',
    publicId: 'hnf7fy7jbakpsx4klqxo',
  },
  {
    id: '65ec3b56e8dcbbaddd1ef53b',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709980498/car-rent/qnkz0guas3rdttr4phpz.webp',
    publicId: 'qnkz0guas3rdttr4phpz',
  },
  {
    id: '65ec3b70e8dcbbaddd1ef549',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709980524/car-rent/woe2jpn0f5uqmcxzjhcs.webp',
    publicId: 'woe2jpn0f5uqmcxzjhcs',
  },
  {
    id: '65eb2c2541603216c5d18ed4',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1709911073/car-rent/aljt13n6dcfvxgcygtvr.webp',
    publicId: 'aljt13n6dcfvxgcygtvr',
  },
  {
    id: '65f0453526c7675d226d0ace',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710245165/car-rent/iupq1fd8bcmoumkxbobp.avif',
    publicId: 'iupq1fd8bcmoumkxbobp',
  },
  {
    id: '65f058dd26c7675d226d0ae7',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710250198/car-rent/l8gazuczxdrxoqiwqjnz.avif',
    publicId: 'l8gazuczxdrxoqiwqjnz',
  },
  {
    id: '65eee55f0756fdda3ac4734b',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710155097/car-rent/ywyztbi8dkf4lzgg6a9y.webp',
    publicId: 'ywyztbi8dkf4lzgg6a9y',
  },
  {
    id: '65ef6c440756fdda3ac47479',
    url: 'https://res.cloudinary.com/ddxnzumxe/image/upload/v1710189630/car-rent/onipiruqpggdvjchedoy.webp',
    publicId: 'onipiruqpggdvjchedoy',
  },
]
const siteConfig: ExcludeId<SiteConfigPost>[] = [
  {
    title: 'Reint',
    desc: 'Embark on seamless travels with Reint Car Rentals. From business trips to weekend getaways, our reliable vehicles and top-notch service ensure a smooth ride every time. Book now and experience the ultimate in convenience and comfort.',
    logoImg: '65eb2c2541603216c5d18ed4',
    serviceImg: '65eb2c2541603216c5d18ed4',
  },
]

const carousels: ExcludeId<CarouselPost>[] = autoIndex([
  {
    img: '65ecad59fd0112163140eba9',
    title: 'Explore the Freedom of Car Rental',
    desc: "Discover convenience and flexibility with our car rental services. Whether you're planning a weekend getaway or a cross-country adventure, we offer a wide range of vehicles to suit your needs. Enjoy seamless booking, competitive rates, and exceptional customer service. Start your journey today!",
    vehicleName: 'Mercedes-AMG C63 S',
    price: 87.3,
    engine: 'AMG 4.0-liter V8',
    power: '503 HP',
  },
  {
    img: '65ec3563e8dcbbaddd1ef494',
    title: '',
    desc: '',
    vehicleName: 'Aston Martin DBS Superleggera',
    price: 329.5,
    engine: 'Twin-turbocharged 5.2-liter V12',
    power: '715 HP',
  },
  {
    img: '65ecdc5fcbd34e2bdbf54c62',
    title: '',
    desc: '',
    vehicleName: 'Dodge Challenger SRT Demon',
    price: 84.99,
    engine: 'Supercharged 6.2-liter V8',
    power: '840 HP',
  },
])

const menubarTabs: MenubarTab[] = autoIndex([
  {
    id: 'mt-1',
    title: 'Automobiles',
    type: 0,
  },
  {
    id: 'mt-2',
    title: 'SUV & Pickup',
    type: 1,
  },
  {
    id: 'mt-3',
    title: 'Motorcycle',
    type: 0,
  },
  {
    id: 'mt-4',
    title: 'Coupes',
    type: 1,
  },
])

const menubarVehicles: MenubarVehiclePost[] = autoIndex([
  /* Automobiles */
  {
    id: 'mv-1',
    menubarTab: 'mt-1',
    img: '65ec3b56e8dcbbaddd1ef53b',
    title: 'Audi',
    desc: 'Innovative electric vehicles, blending luxury and sustainability',
  },
  {
    id: 'mv-2',
    menubarTab: 'mt-1',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-3',
    menubarTab: 'mt-1',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-4',
    menubarTab: 'mt-1',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  /* Suv & Pickup */
  {
    id: 'mv-5',
    menubarTab: 'mt-2',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-6',
    menubarTab: 'mt-2',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-7',
    menubarTab: 'mt-2',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-8',
    menubarTab: 'mt-2',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-9',
    menubarTab: 'mt-2',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-10',
    menubarTab: 'mt-2',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  /* Motorcycle */
  {
    id: 'mv-11',
    menubarTab: 'mt-3',
    img: '65ec3b56e8dcbbaddd1ef53b',
    title: 'Audi',
    desc: 'Innovative electric vehicles, blending luxury and sustainability',
  },
  {
    id: 'mv-12',
    menubarTab: 'mt-3',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-13',
    menubarTab: 'mt-3',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-14',
    menubarTab: 'mt-3',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  /* Coupes */
  {
    id: 'mv-15',
    menubarTab: 'mt-4',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-16',
    menubarTab: 'mt-4',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-17',
    menubarTab: 'mt-4',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-18',
    menubarTab: 'mt-4',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-19',
    menubarTab: 'mt-4',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
  {
    id: 'mv-20',
    menubarTab: 'mt-4',
    img: '65ec3b70e8dcbbaddd1ef549',
    title: 'Tesla',
    desc: 'Iconic performance and luxury driving experience',
  },
])

const vehicles: ExcludeId<VehiclePost>[] = autoIndex([
  /* Audi */
  {
    menubarVehicle: 'mv-1',
    title: 'Audi RS6 Avant',
    img: '65f0453526c7675d226d0ace',
    fuel: '22',
    drivetrain: 'AWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-1',
    title: 'Audi RS6 Avant',
    img: '65f0453526c7675d226d0ace',
    fuel: '26',
    drivetrain: 'AWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-1',
    title: 'Audi RS6 Avant',
    img: '65f0453526c7675d226d0ace',
    fuel: '30',
    drivetrain: 'AWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-1',
    title: 'Audi RS6 Avant',
    img: '65f0453526c7675d226d0ace',
    fuel: '22',
    drivetrain: 'AWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-1',
    title: 'Audi RS6 Avant',
    img: '65f0453526c7675d226d0ace',
    fuel: '22',
    drivetrain: 'AWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-1',
    title: 'Audi RS6 Avant',
    img: '65f0453526c7675d226d0ace',
    fuel: '22',
    drivetrain: 'RWD',
    wheel: 'automatic',
  },
  /* Tesla */
  {
    menubarVehicle: 'mv-2',
    title: 'Tesla Model 3',
    img: '65f058dd26c7675d226d0ae7',
    fuel: '22',
    drivetrain: 'RWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-2',
    title: 'Tesla Model 3',
    img: '65f058dd26c7675d226d0ae7',
    fuel: '22',
    drivetrain: 'RWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-2',
    title: 'Tesla Model 3',
    img: '65f058dd26c7675d226d0ae7',
    fuel: '22',
    drivetrain: 'RWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-2',
    title: 'Tesla Model 3',
    img: '65f058dd26c7675d226d0ae7',
    fuel: '22',
    drivetrain: 'FWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-2',
    title: 'Tesla Model 3',
    img: '65f058dd26c7675d226d0ae7',
    fuel: '22',
    drivetrain: 'FWD',
    wheel: 'automatic',
  },
  {
    menubarVehicle: 'mv-2',
    title: 'Tesla Model 3',
    img: '65f058dd26c7675d226d0ae7',
    fuel: '22',
    drivetrain: 'FWD',
    wheel: 'automatic',
  },
])

const services: ExcludeId<ServicePost>[] = autoIndex([
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Car Rental',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Chauffeur Services',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Airport Transfer',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Corporate Services',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65eee55f0756fdda3ac4734b',
    title: 'Wedding Services',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },

])

const reviews: ExcludeId<ReviewPost>[] = autoIndex([
  {
    img: '65ef6c440756fdda3ac47479',
    fullname: 'John Doe',
    occupation: 'Software Engineer',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65ef6c440756fdda3ac47479',
    fullname: 'Jane Doe',
    occupation: 'Product Manager',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '65ef6c440756fdda3ac47479',
    fullname: 'Alice Doe',
    occupation: 'Data Scientist',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
])

const footerTabs: FooterTab[] = autoIndex([
  {
    id: 'footer-tab-1',
    title: 'Services',
  },
  {
    id: 'footer-tab-2',
    title: 'Company',
  },
  {
    id: 'footer-tab-3',
    title: 'Legal',
  },
])

const footerLinks: ExcludeId<FooterLinkPost>[] = autoIndex([
  {
    footerTab: 'footer-tab-1',
    title: 'Support',
    link: '/',
  },
  {
    footerTab: 'footer-tab-1',
    title: 'Insurance',
    link: '/',
  },
  {
    footerTab: 'footer-tab-1',
    title: 'Booking',
    link: '/',
  },
  {
    footerTab: 'footer-tab-1',
    title: 'Vehicles',
    link: '/',
  },
  {
    footerTab: 'footer-tab-5',
    title: 'Extras',
    link: '/',
  },
  {
    footerTab: 'footer-tab-2',
    title: 'About Us(Portfolio)',
    link: 'https://baris-portfolio.vercel.app',
  },
  {
    footerTab: 'footer-tab-2',
    title: 'Contact(Linkedin)',
    link: 'https://www.linkedin.com/in/barış-olgun-7964542a6/',
  },
  {
    footerTab: 'footer-tab-2',
    title: 'Jobs',
    link: '/',
  },
  {
    footerTab: 'footer-tab-3',
    title: 'Terms of use',
    link: '/',
  },
  {
    footerTab: 'footer-tab-3',
    title: 'Privacy policy',
    link: '/',
  },
  {
    footerTab: 'footer-tab-3',
    title: 'Cookie policy',
    link: '/',
  },
])

export const seedDb = async () => {
  resetDb()

  const collections: Record<Model, any> = {
    user: users,
    image: images,
    site_config: siteConfig,
    carousel: carousels,
    menubar_tab: menubarTabs,
    menubar_vehicle: menubarVehicles,
    vehicle: vehicles,
    service: services,
    review: reviews,
    footer_tab: footerTabs,
    footer_link: footerLinks,
  } as const

  for (const [key, value] of Object.entries(collections)) {
    for (const item of value) {
      db[key as Model].create(item)
      await persistDb(key as Model)
    }
  }
}
