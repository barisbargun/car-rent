import { zodResolver } from '@hookform/resolvers/zod'
import {
  FooterTitle,
  FooterTitleUpdate,
  footerTitleUpdateSchema,
} from '@repo/api/paths/footer/title/common'
import { useUpdateFooterTitle } from '@repo/api/paths/footer/title/update'
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
import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { toast } from '@/lib/toast'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogProps & {
    footerTitle: FooterTitle
  }

export const FooterTitleUpdateForm = ({
  footerTitle,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateFooterTitle()

  const form = useForm<FooterTitleUpdate>({
    resolver: zodResolver(footerTitleUpdateSchema),
    defaultValues: {
      title: footerTitle.title || '',
    },
  })

  async function onSubmit(values: FooterTitleUpdate) {
    try {
      await mutateAsync({
        id: footerTitle.id,
        data: values,
      })
      toast.footerTitle.update.success()
      closeDialog?.()
    } catch {
      toast.footerTitle.update.error()
    }
  }

  return (
    <Form {...form}>
      <form className={cn('flex w-full flex-col gap-5', className)} {...props}>
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

        <ButtonAlertUpdate
          handleUpdate={form.handleSubmit(onSubmit)}
          isPending={isPending}
        />
      </form>
    </Form>
  )
}
