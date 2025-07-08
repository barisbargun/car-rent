import { Image } from '@repo/api/paths/image/common'
import { useDeleteImage } from '@repo/api/paths/image/delete'
import { AspectRatioProps } from '@repo/ui/components/aspect-ratio'
import { Image as ImageComponent } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'

type Props = AspectRatioProps & {
  data: Image
  showDeleteButton?: boolean
}

export const ImageCard = ({
  data,
  className,
  showDeleteButton = false,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'flex-center relative rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-xl dark:bg-slate-950',
        className,
      )}
      data-testid="image-card"
      {...props}
    >
      <ImageComponent
        src={data.url}
        widthList={[200, 180, 150, 220, 100]}
        heightRatio={0.8}
        alt="image"
      />

      {showDeleteButton && (
        <ButtonModelDelete
          className="card-buttons absolute right-1 top-1"
          model="image"
          id={data.id}
          mutate={useDeleteImage}
        />
      )}
    </div>
  )
}
