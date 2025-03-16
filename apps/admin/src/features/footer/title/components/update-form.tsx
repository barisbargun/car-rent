import { zodResolver } from '@hookform/resolvers/zod'
import {
  updateFooterTitleInputSchema,
  useUpdateFooterTitle,
} from '@repo/api/paths/footer/title/update'
import { FooterTitle } from '@repo/api/types/footer'
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
import { z } from 'zod'

import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogPropsPartial & {
    footerTitle: FooterTitle
  }

export const FooterTitleUpdateForm = ({
  footerTitle,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateFooterTitle()

  const form = useForm<z.infer<typeof updateFooterTitleInputSchema>>({
    resolver: zodResolver(updateFooterTitleInputSchema),
    defaultValues: {
      title: footerTitle.title || '',
    },
  })

  async function onSubmit(
    values: z.infer<typeof updateFooterTitleInputSchema>,
  ) {
    try {
      await mutateAsync({
        id: footerTitle.id,
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

        <ButtonAlertUpdate
          handleUpdate={form.handleSubmit(onSubmit)}
          isPending={isPending}
        />
      </form>
    </Form>
  )
}
