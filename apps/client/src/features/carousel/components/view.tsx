import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/carousel'
import Autoplay from 'embla-carousel-autoplay'

import { useAppContext } from '@/lib/context'

import { CarouselArrows } from './carousel-arrows'
import { CarouselVehicle } from './vehicle'

export const CarouselView = () => {
  const { carousels } = useAppContext()

  if (!carousels?.length) return
  return (
    <div className="relative h-full min-h-screen w-full [&_.slick-arrow]:!hidden">
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 10_000 })]}
      >
        <CarouselContent>
          {carousels.map((carousel) => (
            <CarouselItem key={carousel.id} className="h-screen pl-0">
              <CarouselVehicle key={carousel.id} data={carousel} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselArrows />
      </Carousel>
    </div>
  )
}
