import { zodResolver } from '@hookform/resolvers/zod'
import {
  FooterTitleCreate,
  footerTitleCreateSchema,
} from '@repo/api/paths/footer/title/common'
import { useCreateFooterTitle } from '@repo/api/paths/footer/title/create'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { cn } from '@repo/ui/lib/utils'
import { useForm } from 'react-hook-form'

import { DialogProps } from '@/components/global/open-dialog'
import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { toast } from '@/lib/toast'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogProps & {}

export const FooterTitleCreateForm = ({
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useCreateFooterTitle()

  const form = useForm<FooterTitleCreate>({
    resolver: zodResolver(footerTitleCreateSchema),
    defaultValues: {
      title: '',
    },
  })

  async function onSubmit(values: FooterTitleCreate) {
    try {
      await mutateAsync({
        data: values,
      })
      toast.footerTitle.add.success()
      closeDialog?.()
    } catch {
      toast.footerTitle.add.error()
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

        <ButtonSubmit isPending={isPending} />
      </form>
    </Form>
  )
}
