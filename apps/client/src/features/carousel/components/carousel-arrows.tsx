import { useCarousel } from '@repo/ui/components/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const CarouselArrows = () => {
  const { scrollPrev, scrollNext } = useCarousel()

  return (
    <div className="flex-center absolute bottom-10 right-10 gap-4 max-lg:hidden">
      <ChevronLeft
        className="drop-shadow-black size-12 cursor-pointer text-stone-400"
        onClick={scrollPrev}
      />

      <ChevronRight
        className="drop-shadow-black size-12 cursor-pointer text-stone-400"
        onClick={scrollNext}
      />
    </div>
  )
}
