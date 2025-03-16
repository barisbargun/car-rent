import { zodResolver } from '@hookform/resolvers/zod'
import {
  updateReviewInputSchema,
  useUpdateReview,
} from '@repo/api/paths/review/update'
import { ReviewGet } from '@repo/api/types/review'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { Textarea } from '@repo/ui/components/textarea'
import { cn } from '@repo/ui/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogPropsPartial & {
    review: ReviewGet
  }

export const ReviewUpdateForm = ({
  review,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateReview()

  const form = useForm<z.infer<typeof updateReviewInputSchema>>({
    resolver: zodResolver(updateReviewInputSchema),
    defaultValues: {
      img: review.img?.id || '',
      fullname: review.fullname || '',
      desc: review.desc || '',
      occupation: review.occupation || '',
    },
  })

  async function onSubmit(values: z.infer<typeof updateReviewInputSchema>) {
    try {
      await mutateAsync({
        id: review.id,
        data: values,
      })
      toast.review.update.success()

      closeDialog?.()
    } catch {
      toast.review.update.error()
    }
  }

  return (
    <Form {...form}>
      <form className={cn('flex w-full flex-col gap-5', className)} {...props}>
        <ImageFormField
          form={form}
          formName="img"
          initialImage={review.img?.url}
          image={{
            alt: 'review',
          }}
          button={{
            buttonText: 'Change image',
            buttonIconType: 'EDIT',
          }}
        />

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="name"
                  placeholder="Enter full name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  className="custom-scrollbar"
                  placeholder="Enter description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter occupation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonAlertUpdate
          handleUpdate={form.handleSubmit(onSubmit)}
          isPending={isPending}
        />
      </form>
    </Form>
  )
}
