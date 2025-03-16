import { zodResolver } from '@hookform/resolvers/zod'
import {
  updateFooterLinkInputSchema,
  useUpdateFooterLink,
} from '@repo/api/paths/footer/link/update'
import { useFooterTitles } from '@repo/api/paths/footer/title/get-all'
import { FooterLink } from '@repo/api/types/footer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { FullPageLoader } from '@repo/ui/components/loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'
import { cn } from '@repo/ui/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogPropsPartial & {
    footerLink: FooterLink
  }

export const FooterLinkUpdateForm = ({
  footerLink,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { data: footerTitles, isPending: isFooterTitlesPending } =
    useFooterTitles()
  const { mutateAsync, isPending } = useUpdateFooterLink()

  const form = useForm<z.infer<typeof updateFooterLinkInputSchema>>({
    resolver: zodResolver(updateFooterLinkInputSchema),
    defaultValues: {
      title: footerLink.title || '',
      link: footerLink.link || '',
      footerTitle: footerLink.footerTitle || '',
    },
  })

  async function onSubmit(values: z.infer<typeof updateFooterLinkInputSchema>) {
    try {
      await mutateAsync({
        id: footerLink.id,
        data: values,
      })
      toast.footerLink.update.success()
      closeDialog?.()
    } catch {
      toast.footerLink.update.error()
    }
  }

  if (isFooterTitlesPending) {
    return <FullPageLoader />
  } else if (!footerTitles || footerTitles.length === 0) {
    return (
      <div className="h-full flex-center">
        <p className="text-muted-foreground">No groups available</p>
      </div>
    )
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

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  autoComplete="off"
                  placeholder="Enter link"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="footerTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group</FormLabel>
              <Select
                value={field.value.toString()}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {footerTitles.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
