import { useCarousels } from '@repo/api/paths/carousel/get-all'
import { Skeleton } from '@repo/ui/components/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Slider from 'react-slick'

import { carouselSettings } from '../config'
import { CarouselVehicle } from './vehicle'

const ViewSkeleton = () => {
  return (
    <div className="container min-h-screen pt-32">
      <div className="absolute top-28 w-full max-md:top-20">
        <Skeleton className="h-14 w-[40rem]" />
        <Skeleton className="mt-2 h-14 w-[24rem] max-xl:hidden" />
        <Skeleton className="mt-3 h-20 w-[40rem]" />
      </div>
      <div className="absolute bottom-20 flex flex-col max-sm:hidden">
        <Skeleton className="mt-2 h-10 w-96" />
        <div className="flex gap-6">
          <Skeleton className="mt-2 h-12 w-24" />
          <Skeleton className="mt-2 h-12 w-32" />
          <Skeleton className="mt-2 h-12 w-24" />
        </div>
      </div>
    </div>
  )
}

export const CarouselView = () => {
  const { data: carousels, isPending } = useCarousels()
  const [ref, setRef] = useState<Slider | null>()

  const slideLeft = () => {
    ref?.slickPrev()
  }

  const slideRight = () => {
    ref?.slickNext()
  }

  if (isPending) return <ViewSkeleton />
  return (
    <div className="relative h-full min-h-screen w-full">
      <Slider ref={(slider) => setRef(slider)} {...carouselSettings}>
        {carousels?.map((carousel) => (
          <CarouselVehicle key={carousel.id} data={carousel} />
        ))}
      </Slider>

      <div className="absolute bottom-10 right-10 gap-4 flex-center max-lg:hidden">
        <ChevronLeft
          className="size-12 cursor-pointer text-stone-400 drop-shadow-black"
          onClick={slideLeft}
        />

        <ChevronRight
          className="size-12 cursor-pointer text-stone-400 drop-shadow-black"
          onClick={slideRight}
        />
      </div>
    </div>
  )
}
