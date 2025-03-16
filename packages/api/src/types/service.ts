import { Image } from './image'

export type Service = {
  id: string
  img?: string
  index: number
  title: string
  desc: string
}

export type ServiceGet = Omit<Service, 'img'> & {
  img?: Image
}
