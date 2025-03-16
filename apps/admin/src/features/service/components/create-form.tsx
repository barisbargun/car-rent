import { zodResolver } from '@hookform/resolvers/zod'
import {
  createServiceInputSchema,
  useCreateService,
} from '@repo/api/paths/service/create'
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
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogPropsPartial

export const ServiceCreateForm = ({ closeDialog }: Props) => {
  const { mutateAsync, isPending } = useCreateService()

  const form = useForm<z.infer<typeof createServiceInputSchema>>({
    resolver: zodResolver(createServiceInputSchema),
    defaultValues: {
      img: '',
      title: '',
      desc: '',
    },
  })

  async function onSubmit(values: z.infer<typeof createServiceInputSchema>) {
    try {
      await mutateAsync({
        data: values,
      })
      toast.service.add.success()

      closeDialog?.()
    } catch {
      toast.service.add.error()
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ImageFormField
          form={form}
          formName="img"
          image={{
            alt: 'service',
          }}
          button={{
            buttonText: 'Add image',
            buttonIconType: 'ADD',
          }}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="name"
                  placeholder="Enter title"
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

        <ButtonSubmit isPending={isPending} />
      </form>
    </Form>
  )
}
