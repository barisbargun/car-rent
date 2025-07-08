import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'
import { ComponentProps, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { ButtonClearImage } from './button-clear-image'
import { ImageButtonDialogSelect } from './button-dialog-select'

type Props = ComponentProps<typeof FormItem> & {
  form: UseFormReturn<any>
  formName: string
  initialImage?: string
  showPreview?: boolean
  showClearButton?: boolean
  image: Omit<ComponentProps<typeof Image>, 'src' | 'w'>
  button: Pick<
    ComponentProps<typeof ImageButtonDialogSelect>,
    'buttonIconType' | 'buttonText' | 'hideButtonText'
  >
}
export const ImageFormField = ({
  form,
  formName,
  initialImage,
  showPreview = true,
  showClearButton = true,
  image: imageProps,
  button: buttonProps,
  className,
  ...props
}: Props) => {
  const [image, setImage] = useState<string>()

  useEffect(() => {
    if (initialImage) setImage(initialImage)
  }, [initialImage])

  return (
    <FormField
      control={form.control}
      name={formName}
      render={({ field }) => (
        <FormItem {...props}>
          <div className={cn('flex items-center', className)}>
            <FormLabel className="sr-only">{buttonProps.buttonText}</FormLabel>
            <div className="ml-2 mr-10 flex gap-2">
              {/** Image upload button */}
              <FormControl>
                <ImageButtonDialogSelect
                  fieldChange={field.onChange}
                  setImage={setImage}
                  {...buttonProps}
                />
              </FormControl>

              {/** Clear image button */}
              {showClearButton && (
                <ButtonClearImage
                  name={imageProps.alt}
                  disabled={!image}
                  onClick={() => {
                    setImage('')
                    form.setValue('img', '')
                  }}
                />
              )}
            </div>

            {/** Preview image */}
            {showPreview && (
              <Image
                src={image}
                widthList={[100, 80, 90, 90, 70]}
                {...imageProps}
              />
            )}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
