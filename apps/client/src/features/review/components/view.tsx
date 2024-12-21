import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/carousel'

import { useReviews } from '../api/get'
import { ReviewCard } from './review-card'

export const ReviewView = () => {
  const { data } = useReviews({})

  if (!data) return
  return (
      <Carousel className="w-full">
        <CarouselContent className="md:w-[2100px]">
          <CarouselItem className="md:!basis-1/4 max-md:hidden"></CarouselItem>
          {data
            .sort((a, b) => a.index - b.index)
            .map((v) => (
              <CarouselItem className="md:!basis-1/4 flex-center" key={v.id}>
                <ReviewCard data={v} />
              </CarouselItem>
            ))}
          <CarouselItem className="md:!basis-1/4 basis-0"></CarouselItem>
        </CarouselContent>
        <CarouselNext className="carouselBtn right-5 lg:right-10" />
        <CarouselPrevious className="carouselBtn left-5 lg:left-10" />
      </Carousel>
  )
}
