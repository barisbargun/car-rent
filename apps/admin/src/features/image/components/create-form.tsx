import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateImage } from '@repo/api/paths/image/create'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { cn } from '@repo/ui/lib/utils'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { toast } from '@/lib/toast'
import { DialogProps } from '@/components/global/open-dialog'

import { ImageUploader as ImageUploaderType } from '../types'
import { getCroppedImg } from '../utils/crop'
import { ImageUploader } from './uploader'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogProps & {}

const imageSchema = z.object({
  image: z.custom<ImageUploaderType>(
    (data?: ImageUploaderType) =>
      data?.file instanceof File &&
      typeof data.x === 'number' &&
      typeof data.y === 'number' &&
      typeof data.width === 'number' &&
      typeof data.height === 'number' &&
      data.width > 20 &&
      data.height > 20,
    {
      message: 'Invalid image upload data',
    },
  ),
})

export const ImageCreateForm = ({
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useCreateImage()

  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: {},
    },
  })
  async function onSubmit(values: z.infer<typeof imageSchema>) {
    try {
      const croppedImage = await getCroppedImg(values.image)
      await mutateAsync({
        data: { file: croppedImage },
      })
      toast.image.add.success()
      closeDialog?.()
    } catch {
      toast.image.add.error()
    }
  }
  return (
    <Form {...form}>
      <form
        className={cn('flex w-full flex-col gap-5', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Upload Image</FormLabel>
              <FormControl>
                <ImageUploader fieldChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonSubmit isPending={isPending} title="Upload" />
      </form>
    </Form>
  )
}
