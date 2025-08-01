import { zodResolver } from '@hookform/resolvers/zod'
import {
  MENUBAR_TAB_GRID_LIST,
  MENUBAR_TAB_GRID_LIST_UI,
  MenubarTabCreate,
  menubarTabCreateSchema,
} from '@repo/api/paths/menubar/tab/common'
import { useCreateMenubarTab } from '@repo/api/paths/menubar/tab/create'
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
import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { toast } from '@/lib/toast'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogProps & {}

export const MenubarTabCreateForm = ({
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useCreateMenubarTab()

  const form = useForm<MenubarTabCreate>({
    resolver: zodResolver(menubarTabCreateSchema),
    defaultValues: {
      title: '',
      type: undefined,
    },
  })

  async function onSubmit(values: MenubarTabCreate) {
    try {
      await mutateAsync({
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

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={(val) => field.onChange(Number.parseInt(val))}
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

        <ButtonSubmit isPending={isPending} />
      </form>
    </Form>
  )
}
