import { useImages } from '@repo/api/paths/image/get-all'
import { useEffect } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ItemCounts } from '@/components/shared/item-counts'
import { ImageCard } from '@/features/image/components/card'
import { ImageCardSkeleton } from '@/features/image/components/card.skeleton'
import { ImageCreateForm } from '@/features/image/components/create-form'
import { toast } from '@/lib/toast'

const itemsClassName =
  'grid items-gap grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

const ImagesSkeleton = () => (
  <>
    <div className={itemsClassName}>
      {Array.from({ length: 12 }).map((_, i) => (
        <ImageCardSkeleton key={i} />
      ))}
    </div>
  </>
)

const ImagesRoute = () => {
  const { data: images, isPending, isError } = useImages()

  useEffect(() => {
    if (isError) {
      toast.api.fetch('image').error()
    }
  }, [isError])

  if (isPending) return <ImagesSkeleton />
  return (
    <>
      <div className={itemsClassName}>
        {images?.length &&
          images.map(
            (image) =>
              image.url && (
                <ImageCard
                  data={image}
                  showDeleteButton={true}
                  key={image.id}
                />
              ),
          )}
      </div>
      <ButtonModelForm
        model="image"
        modelText="Image"
        type="ADD"
        itemsCount={images?.length}
      >
        <ImageCreateForm />
      </ButtonModelForm>
      <ItemCounts count={images?.length} model="image" />
    </>
  )
}

export default ImagesRoute
