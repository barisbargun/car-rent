import { zodResolver } from '@hookform/resolvers/zod'
import {
  MENUBAR_TAB_GRID_LIST,
  MENUBAR_TAB_GRID_LIST_UI,
  MenubarTab,
  MenubarTabUpdate,
  menubarTabUpdateSchema,
} from '@repo/api/paths/menubar/tab/common'
import { useUpdateMenubarTab } from '@repo/api/paths/menubar/tab/update'
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

import { DialogProps } from '@/components/global/open-dialog'
import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { toast } from '@/lib/toast'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogProps & {
    menubarTab: MenubarTab
  }

export const MenubarTabUpdateForm = ({
  menubarTab,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateMenubarTab()

  const form = useForm<MenubarTabUpdate>({
    resolver: zodResolver(menubarTabUpdateSchema),
    defaultValues: {
      title: menubarTab.title || '',
      type: menubarTab.type,
    },
  })

  async function onSubmit(values: MenubarTabUpdate) {
    try {
      await mutateAsync({
        id: menubarTab.id,
        data: values,
      })
      toast.menubarTab.update.success()
      closeDialog?.()
    } catch {
      toast.menubarTab.update.error()
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
