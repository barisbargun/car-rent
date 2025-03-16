import { zodResolver } from '@hookform/resolvers/zod'
import {
  createFooterTitleInputSchema,
  useCreateFooterTitle,
} from '@repo/api/paths/footer/title/create'
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

import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogPropsPartial & {}

export const FooterTitleCreateForm = ({
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useCreateFooterTitle()

  const form = useForm<z.infer<typeof createFooterTitleInputSchema>>({
    resolver: zodResolver(createFooterTitleInputSchema),
    defaultValues: {
      title: '',
    },
  })

  async function onSubmit(
    values: z.infer<typeof createFooterTitleInputSchema>,
  ) {
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
