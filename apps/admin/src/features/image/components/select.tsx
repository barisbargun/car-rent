import { useImages } from '@repo/api/paths/image/get-all'
import { Loader } from '@repo/ui/components/loader'
import { useEffect } from 'react'

import { DialogProps } from '@/components/global/open-dialog'
import { toast } from '@/lib/toast'

import { ButtonImageUpload } from './button-upload'
import { ImageCard } from './card'

type Props = DialogProps & {
  fieldChange?: any
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const ImagesSelect = ({ fieldChange, setImage, closeDialog }: Props) => {
  const { data: images, isPending, isSuccess, isError } = useImages()
  useEffect(() => {
    if (isError) {
      toast.api.fetch('image').error()
    }
  }, [isError])

  const selectImage = (id: string, url: string) => {
    fieldChange(id)
    setImage(url)
    closeDialog?.()
  }

  if (isPending) return <Loader />
  if (isError) return
  return (
    isSuccess && (
      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex-center min-h-20 rounded-xl border-2 border-dashed shadow-xl">
          <ButtonImageUpload />
        </div>

        {images
          ?.slice()
          ?.reverse()
          ?.map(
            (image) =>
              image.url && (
                <div
                  className="relative w-full cursor-pointer"
                  key={image.id}
                  onClick={() => selectImage(image.id, image.url)}
                >
                  <ImageCard data={image} />
                </div>
              ),
          )}
      </div>
    )
  )
}
