import { zodResolver } from '@hookform/resolvers/zod'
import {
  ServiceCreate,
  serviceCreateSchema,
} from '@repo/api/paths/service/common'
import { useCreateService } from '@repo/api/paths/service/create'
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

import { DialogProps } from '@/components/global/open-dialog'
import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogProps

export const ServiceCreateForm = ({ closeDialog }: Props) => {
  const { mutateAsync, isPending } = useCreateService()

  const form = useForm<ServiceCreate>({
    resolver: zodResolver(serviceCreateSchema),
    defaultValues: {
      img: '',
      title: '',
      desc: '',
    },
  })

  async function onSubmit(values: ServiceCreate) {
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
