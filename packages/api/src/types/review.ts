import { Image } from './image'

export type Review = {
  id: string
  img?: string
  index: number
  fullname: string
  desc: string
  occupation: string
}

export type ReviewGet = Omit<Review, 'img'> & {
  img?: Image
}
