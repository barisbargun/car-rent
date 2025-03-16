import { useCarousels } from '@repo/api/paths/carousel/get-all'
import { useState } from 'react'
import Slider from 'react-slick'

import { CarouselSlide } from './slide'
import { CarouselVehicle } from './vehicle'

export const CarouselView = () => {
  const { data } = useCarousels({})
  const [ref, setRef] = useState<Slider | null>()
  const [page, setPage] = useState(1)

  const slideLeft = () => {
    ref?.slickPrev()
  }

  const slideRight = () => {
    ref?.slickNext()
  }

  return (
    data && (
      <div className="relative h-full w-full">
        <CarouselVehicle data={data} setPage={setPage} setRef={setRef} />

        <div className="absolute bottom-20 right-20 flex-center max-lg:hidden">
          <CarouselSlide
            slideLeft={slideLeft}
            slideRight={slideRight}
            page={page}
            carouselLength={data.length || 0}
          />
        </div>
      </div>
    )
  )
}
