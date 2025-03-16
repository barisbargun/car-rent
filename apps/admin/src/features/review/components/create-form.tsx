import { zodResolver } from '@hookform/resolvers/zod'
import {
  createReviewInputSchema,
  useCreateReview,
} from '@repo/api/paths/review/create'
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

import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogPropsPartial

export const ReviewCreateForm = ({
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useCreateReview()


  const form = useForm<z.infer<typeof createReviewInputSchema>>({
    resolver: zodResolver(createReviewInputSchema),
    defaultValues: {
      img: '',
      fullname: '',
      desc: '',
      occupation: '',
    },
  })

  async function onSubmit(values: z.infer<typeof createReviewInputSchema>) {
    try {
      await mutateAsync({
        data: values,
      })
      toast.review.add.success()
      closeDialog?.()
    } catch {
      toast.review.add.error()
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn('flex w-full flex-col gap-5', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <ImageFormField
          form={form}
          formName="img"
          image={{
            alt: 'review',
          }}
          button={{
            buttonText: 'Add image',
            buttonIconType: 'ADD',
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

        <ButtonSubmit isPending={isPending} />
      </form>
    </Form>
  )
}
