import { CarouselGet } from '@repo/api/paths/carousel/common'
import { useDeleteCarousel } from '@repo/api/paths/carousel/delete'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwap } from '@/components/shared/buttons/model-swap'
import { ModelHover } from '@/components/shared/model-hover'

import { CarouselUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: CarouselGet
  handleSwap: (id: string) => void
  swapId: string | undefined
}

export const CarouselCard = ({
  data,
  handleSwap,
  swapId,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'flex-center relative aspect-video overflow-hidden',
        className,
      )}
      data-testid="carousel-card"
      {...props}
    >
      <Image fill src={data.img?.url} w={300} alt="carousel" />

      {/** Buttons */}
      <div className="card-buttons absolute right-1 top-1 z-10 flex gap-2">
        <ButtonModelForm type="UPDATE" model="carousel" modelText="carousel">
          <CarouselUpdateForm carousel={data} />
        </ButtonModelForm>

        <ButtonModelDelete
          model="carousel"
          id={data.id}
          mutate={useDeleteCarousel}
        />
        <ButtonModelSwap
          model="carousel"
          id={data.id}
          swapId={swapId}
          handleSwap={handleSwap}
        />
      </div>

      <ModelHover
        model="carousel"
        data={[
          ['Title', data.title],
          ['Description', data.desc],
          ['Vehicle Name', data.vehicleName],
          ['Engine', data.engine],
          ['Power', data.power],
          ['Price', data.price],
        ]}
      />
    </div>
  )
}
