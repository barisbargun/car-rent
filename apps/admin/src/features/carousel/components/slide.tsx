import { cn } from '@repo/ui/lib/utils'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {
  slideLeft: () => void
  slideRight: () => void
  page: number
  carouselLength: number
}

const getNumber = (n: number) => {
  if (n) {
    if (n < 10) return `0${n}`
    return n
  }
  return 0
}

export const CarouselSlide = ({
  slideLeft,
  slideRight,
  page,
  carouselLength,
}: Props) => {
  return (
    <>
      <ArrowLeft
        className={cn('size-10 cursor-pointer', page == 1 && 'text-stone-400')}
        onClick={slideLeft}
      />

      <div className="relative">
        <p
          className={
            'absolute bottom-0 left-0 text-xl font-bold ' +
            (page == carouselLength ? 'text-stone-400' : '')
          }
        >
          {page == carouselLength
            ? getNumber(carouselLength - 1)
            : getNumber(page)}
        </p>
        <p
          className={cn(
            'absolute bottom-0 right-0 text-xl font-bold',
            page != carouselLength && 'text-stone-400',
          )}
        >
          {carouselLength && getNumber(carouselLength)}
        </p>
        <div className="relative">
          <div className="h-1 w-40 bg-stone-400" />
          <div
            className="absolute top-0 h-1 bg-black"
            style={{
              width: `${100 / carouselLength}%`,
              left: `${(100 / carouselLength) * (page - 1)}%`,
            }}
          />
        </div>
      </div>

      <ArrowRight
        className={cn(
          'size-10 cursor-pointer',
          page == carouselLength && 'text-stone-400',
        )}
        onClick={slideRight}
      />
    </>
  )
}
