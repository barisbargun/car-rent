import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui/components/carousel'
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint'

import { useAppContext } from '@/lib/context'

import { ReviewCard } from './review-card'

const emptyBlock = <div className="w-[25%] shrink-0 grow-0" />

export const ReviewView = () => {
  const breakpoint = useBreakpoint()
  const isDesktop = breakpoint > 2
  const { reviews } = useAppContext()

  if (!reviews?.length) return
  return (
    <Carousel className="mx-auto w-full max-2xl:lg:w-[calc(100%-6rem)]">
      <CarouselContent>
        {isDesktop && emptyBlock}
        {reviews.map((review, index) => (
          <CarouselItem key={review.id} className="lg:basis-1/2">
            <ReviewCard data={review} index={index} className="h-72 lg:h-72" />
          </CarouselItem>
        ))}
        {isDesktop && emptyBlock}
      </CarouselContent>
      {isDesktop && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  )
}
