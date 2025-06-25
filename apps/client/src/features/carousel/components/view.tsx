import { useCarousels } from '@repo/api/paths/carousel/get-all'
import { Loader } from '@repo/ui/components/loader'
import { useState } from 'react'
import Slider from 'react-slick'

import { carouselSettings } from '../config'
import { CarouselSlide } from './slide'
import { CarouselVehicle } from './vehicle'

export const CarouselView = () => {
  const { data: carousels, isPending } = useCarousels({})
  const [ref, setRef] = useState<Slider | null>()
  const [page, setPage] = useState(1)

  const slideLeft = () => {
    ref?.slickPrev()
  }

  const slideRight = () => {
    ref?.slickNext()
  }

  if (isPending) return <Loader />

  return (
    <div className="relative h-full w-full">
      <Slider
        {...carouselSettings}
        className=""
        ref={(slider) => setRef(slider)}
        afterChange={(e) => setPage(e + 1)}
      >
        {carousels?.map((carousel) => (
          <CarouselVehicle key={carousel.id} data={carousel} />
        ))}
      </Slider>

      <div className="absolute bottom-20 right-20 flex-center max-lg:hidden">
        <CarouselSlide
          slideLeft={slideLeft}
          slideRight={slideRight}
          page={page}
          carouselLength={carousels?.length || 0}
        />
      </div>
    </div>
  )
}
