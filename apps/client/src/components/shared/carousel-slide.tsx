import { cn } from '@repo/ui/lib/utils'

type Props = {
  slideLeft: () => void
  slideRight: () => void
  page: number
  carouselLength: number
  getNumber: (n: number) => string | number
}

export const CarouselSlide = ({
  slideLeft,
  slideRight,
  page,
  carouselLength,
  getNumber,
}: Props) => {
  return (
    <>
      <i
        className={
          'arrow rotate-[-135deg] ' + (page == 1 ? 'border-stone-400' : '')
        }
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

      <i
        className={
          'arrow rotate-45 ' +
          (page == carouselLength ? 'border-stone-400' : '')
        }
        onClick={slideRight}
      />
    </>
  )
}
