import { useDeleteImage } from '@repo/api/paths/image/delete'
import { Image } from '@repo/api/types/image'
import { AspectRatioProps } from '@repo/ui/components/aspect-ratio'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { Image as ImageComponent } from '@/features/image/components/image'

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
        'relative rounded-lg bg-slate-300 bg-opacity-50 p-4 shadow-xl flex-center dark:bg-slate-950',
        className,
      )}
      data-testid="image-card"
      {...props}
    >
      <ImageComponent src={data.url} widthList={[200,180,150,220,100]} heightRatio={0.8} alt="image" />

      {showDeleteButton && (
        <ButtonModelDelete
          className="absolute right-1 top-1 card-buttons"
          model="image"
          id={data.id}
          mutate={useDeleteImage}
        />
      )}
    </div>
  )
}
