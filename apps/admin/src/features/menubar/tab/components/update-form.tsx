import { zodResolver } from '@hookform/resolvers/zod'
import {
  updateMenubarTabInputSchema,
  useUpdateMenubarTab,
} from '@repo/api/paths/menubar/tab/update'
import {
  MENUBAR_TAB_GRID_LIST,
  MENUBAR_TAB_GRID_LIST_UI,
  MenubarTab,
} from '@repo/api/types/menubar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'
import { cn } from '@repo/ui/lib/utils'
import { getEnumEntries } from '@repo/utils/enum'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogPropsPartial & {
    menubarTab: MenubarTab
  }

export const MenubarTabUpdateForm = ({
  menubarTab,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateMenubarTab()

  const form = useForm<z.infer<typeof updateMenubarTabInputSchema>>({
    resolver: zodResolver(updateMenubarTabInputSchema),
    defaultValues: {
      title: menubarTab.title || '',
      type: menubarTab.type,
    },
  })

  async function onSubmit(values: z.infer<typeof updateMenubarTabInputSchema>) {
    try {
      await mutateAsync({
        id: menubarTab.id,
        data: values,
      })
      toast.menubarTab.add.success()
      closeDialog?.()
    } catch {
      toast.menubarTab.add.error()
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

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={(val) =>
                  field.onChange(Number.parseInt(val) || 0)
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grid" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getEnumEntries(MENUBAR_TAB_GRID_LIST).map(([key, value]) => (
                    <SelectItem key={key} value={value.toString()}>
                      {MENUBAR_TAB_GRID_LIST_UI[value]}
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
