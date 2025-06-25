import { useReviews } from '@repo/api/paths/review/get-all'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/carousel'
import { Loader } from '@repo/ui/components/loader'

import { ReviewCard } from './review-card'

export const ReviewView = () => {
  const { data: reviews, isPending } = useReviews()

  if (isPending) return <Loader />
  if (!reviews) return
  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem className="basis-1/3"/>
        {reviews.map((review, index) => (
          <CarouselItem key={review.id} className="basis-1/2">
            <ReviewCard
              data={review}
              index={index}
              className="h-[240px] max-md:h-[300px]"
            />
          </CarouselItem>
        ))}
        {reviews.map((review, index) => (
          <CarouselItem key={review.id} className="basis-1/2">
            <ReviewCard
              data={review}
              index={index}
              className="h-[240px] max-md:h-[300px]"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
