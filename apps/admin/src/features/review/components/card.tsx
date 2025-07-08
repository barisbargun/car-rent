import { ReviewGet } from '@repo/api/paths/review/common'
import { useDeleteReview } from '@repo/api/paths/review/delete'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwap } from '@/components/shared/buttons/model-swap'

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
        'bg-background relative flex gap-4 overflow-hidden rounded p-3 shadow',
        className,
      )}
      data-testid="review-card"
      {...props}
    >
      <Image
        src={data.img?.url}
        widthList={[80, 80, 60, 80, 50]}
        alt="review"
      />

      <div className="flex-1">
        <p className="line-clamp-2 w-full text-sm" title={data.desc}>
          {data.desc}
        </p>
        <strong
          className="text-muted-foreground mb-0.5 mt-2 block text-sm"
          title={data.fullname}
        >
          {data.fullname}
        </strong>
        <small
          className="text-muted-foreground block text-xs"
          title={data.occupation}
        >
          {data.occupation}
        </small>
      </div>

      {/** Buttons */}
      <div className="absolute bottom-2 right-2 flex origin-bottom-right scale-75 gap-2">
        <ButtonModelForm type="UPDATE" model="review" modelText="review">
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
