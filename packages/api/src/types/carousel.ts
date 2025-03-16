import { Image } from './image'

export type Carousel = {
  id: string
  img?: string
  index: number
  title?: string
  desc?: string
  vehicleName: string
  engine?: string
  price?: number
  power?: number
}

export type CarouselGet = Omit<Carousel, 'img'> & {
  img?: Image
}
