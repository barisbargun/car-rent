import { zodResolver } from '@hookform/resolvers/zod'
import {
  updateServiceInputSchema,
  useUpdateService,
} from '@repo/api/paths/service/update'
import { ServiceGet } from '@repo/api/types/service'
import { Button } from '@repo/ui/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { HandleAlert } from '@repo/ui/components/handle-alert'
import { Input } from '@repo/ui/components/input'
import { Textarea } from '@repo/ui/components/textarea'
import { Loader } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = DialogPropsPartial & {
  service: ServiceGet
}

export const ServiceUpdateForm = ({ service, closeDialog }: Props) => {
  const { mutateAsync, isPending } = useUpdateService()

  const form = useForm<z.infer<typeof updateServiceInputSchema>>({
    resolver: zodResolver(updateServiceInputSchema),
    defaultValues: {
      img: service.img?.id || '',
      title: service.title || '',
      desc: service.desc || '',
    },
  })

  async function onSubmit(values: z.infer<typeof updateServiceInputSchema>) {
    try {
      await mutateAsync({
        id: service.id,
        data: values,
      })
      toast.service.update.success()

      closeDialog?.()
    } catch {
      toast.service.update.error()
    }
  }

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-5">
        <ImageFormField
          form={form}
          formName="img"
          initialImage={service.img?.url}
          image={{
            alt: 'service card',
          }}
          button={{
            buttonText: 'Change image',
            buttonIconType: 'EDIT',
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

        <HandleAlert trigger={form.handleSubmit(onSubmit)}>
          <Button
            disabled={isPending}
            type="button"
            variant="default"
            className="w-full"
          >
            {isPending && <Loader />}
            Update
          </Button>
        </HandleAlert>
      </form>
    </Form>
  )
}
