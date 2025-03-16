import { zodResolver } from '@hookform/resolvers/zod'
import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import {
  updateMenubarVehicleInputSchema,
  useUpdateMenubarVehicle,
} from '@repo/api/paths/menubar/vehicle/update'
import { MenubarVehicleGet } from '@repo/api/types/menubar'
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
import { Textarea } from '@repo/ui/components/textarea'
import { cn } from '@repo/ui/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogPropsPartial & {
    menubarVehicle: MenubarVehicleGet
  }

export const MenubarVehicleUpdateForm = ({
  menubarVehicle,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { data: menubarTabs, isPending: isMenubarTabsPending } =
    useMenubarTabs()
  const { mutateAsync, isPending } = useUpdateMenubarVehicle()

  const form = useForm<z.infer<typeof updateMenubarVehicleInputSchema>>({
    resolver: zodResolver(updateMenubarVehicleInputSchema),
    defaultValues: {
      img: menubarVehicle.img?.id || '',
      title: menubarVehicle.title || '',
      desc: menubarVehicle.desc || '',
      menubarTab: menubarVehicle.menubarTab || '',
    },
  })

  async function onSubmit(
    values: z.infer<typeof updateMenubarVehicleInputSchema>,
  ) {
    try {
      await mutateAsync({
        id: menubarVehicle.id,
        data: values,
      })
      toast.menubarVehicle.update.success()
      closeDialog?.()
    } catch {
      toast.menubarVehicle.update.error()
    }
  }

  if (isMenubarTabsPending) {
    return <FullPageLoader />
  } else if (!menubarTabs || menubarTabs.length === 0) {
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
        <ImageFormField
          form={form}
          formName="img"
          initialImage={menubarVehicle.img?.url}
          image={{
            alt: 'menubar vehicle card',
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

        <FormField
          control={form.control}
          name="menubarTab"
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
                  {menubarTabs.map(({ id, title }) => (
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
