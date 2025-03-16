import { useDeleteReview } from '@repo/api/paths/review/delete'
import { ReviewGet } from '@repo/api/types/review'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwap } from '@/components/shared/buttons/model-swap'
import { Image } from '@/features/image/components/image'

import { ReviewUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: ReviewGet
  handleSwap: (id: string) => void
  swapId: string | undefined
}

export const ReviewCard = ({
  data,
  handleSwap,
  swapId,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'relative flex gap-4 overflow-hidden rounded bg-background p-3 shadow',
        className,
      )}
      data-testid="review-card"
      {...props}
    >
      <Image src={data.img?.url} widthList={[80,80,60,80,50]} alt="review" />

      <div className="flex-1">
        <p className="line-clamp-2 w-full text-sm" title={data.desc}>
          {data.desc}
        </p>
        <strong
          className="mb-0.5 mt-2 block text-sm text-muted-foreground"
          title={data.fullname}
        >
          {data.fullname}
        </strong>
        <small
          className="block text-xs text-muted-foreground"
          title={data.occupation}
        >
          {data.occupation}
        </small>
      </div>

      {/** Buttons */}
      <div className="absolute bottom-2 right-2 flex origin-bottom-right scale-75 gap-2">
        <ButtonModelForm type="UPDATE" model="review" modelText='review'
>
          <ReviewUpdateForm review={data} />
        </ButtonModelForm>

        <ButtonModelDelete
          model="review"
          id={data.id}
          mutate={useDeleteReview}
        />

        <ButtonModelSwap
          model="review"
          id={data.id}
          swapId={swapId}
          handleSwap={handleSwap}
        />
      </div>
    </div>
  )
}
