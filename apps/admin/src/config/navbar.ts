import { REQUIRED_ROLE, RequiredRole } from '@repo/api/config/required-role'
import {
  Cable,
  Car,
  Eye,
  GalleryHorizontal,
  Image,
  Images,
  ListTree,
  LucideProps,
  MonitorCog,
  UserRound,
  UsersRound,
} from 'lucide-react'

import { paths as pathList } from './paths'

export interface NavbarItem {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  title: string
  link?: string
  protect?: RequiredRole
  children?: { title: string; link: string; protect?: RequiredRole }[]
}

const paths = pathList.app

export const navbarItems: NavbarItem[] = [
  {
    icon: GalleryHorizontal,
    title: 'Carousel',
    link: paths.carousels.getHref(),
  },
  {
    icon: ListTree,
    title: 'Menubar',
    children: [
      { title: 'Menubar Tab', link: paths.menubarTabs.getHref() },
      { title: 'Menubar Vehicles', link: paths.menubarVehicles.getHref() },
    ],
  },
  {
    icon: Car,
    title: 'Vehicles',
    link: paths.vehicles.getHref(),
  },
  {
    icon: Cable,
    title: 'Services',
    link: paths.services.getHref(),
  },
  {
    icon: Eye,
    title: 'Reviews',
    link: paths.reviews.getHref(),
  },
  {
    icon: ListTree,
    title: 'Footer',
    children: [
      { title: 'Titles', link: paths.footerTitles.getHref() },
      { title: 'Links', link: paths.footerLinks.getHref() },
    ],
  },
  {
    icon: ListTree,
    title: 'Site Config',
    link: paths.siteConfigs.getHref(),
    protect: REQUIRED_ROLE.siteConfig.update,
  },
  {
    icon: Image,
    title: 'Images',
    link: paths.images.getHref(),
  },
  {
    icon: UserRound,
    title: 'Users',
    link: paths.users.getHref(),
    protect: REQUIRED_ROLE.user.get,
  },
]

export const navbarItemsMobile: NavbarItem[] = [
  {
    icon: GalleryHorizontal,
    title: 'Carousel',
    link: paths.carousels.getHref(),
  },
  {
    icon: ListTree,
    title: 'Menubar',
    children: [
      { title: 'Menubar Tab', link: paths.menubarTabs.getHref() },
      { title: 'Menubar Vehicles', link: paths.menubarVehicles.getHref() },
    ],
  },
  {
    icon: Car,
    title: 'Vehicles',
    link: paths.vehicles.getHref(),
  },
  {
    icon: Cable,
    title: 'Services',
    link: paths.services.getHref(),
  },
  {
    icon: Eye,
    title: 'Reviews',
    link: paths.reviews.getHref(),
  },
  {
    icon: ListTree,
    title: 'Footer',
    children: [
      { title: 'Titles', link: paths.footerTitles.getHref() },
      { title: 'Links', link: paths.footerLinks.getHref() },
    ],
  },
  {
    icon: MonitorCog,
    title: 'Site Config',
    link: paths.siteConfigs.getHref(),
  },
  {
    icon: UsersRound,
    title: 'Users',
    link: paths.users.getHref(),
  },
  {
    icon: Images,
    title: 'Images',
    link: paths.images.getHref(),
  },
]
