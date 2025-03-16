import { zodResolver } from '@hookform/resolvers/zod'
import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import {
  createMenubarVehicleInputSchema,
  useCreateMenubarVehicle,
} from '@repo/api/paths/menubar/vehicle/create'
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

import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogPropsPartial & {}

export const MenubarVehicleCreateForm = ({
  closeDialog,
  className,
  ...props
}: Props) => {
  const { data: menubarTabs, isPending: isMenubarTabsPending } =
    useMenubarTabs()
  const { mutateAsync, isPending } = useCreateMenubarVehicle()

  const form = useForm<z.infer<typeof createMenubarVehicleInputSchema>>({
    resolver: zodResolver(createMenubarVehicleInputSchema),
    defaultValues: {
      img: '',
      title: '',
      desc: '',
      menubarTab: '',
    },
  })

  async function onSubmit(
    values: z.infer<typeof createMenubarVehicleInputSchema>,
  ) {
    try {
      await mutateAsync({
        data: values,
      })
      toast.menubarVehicle.add.success()
      closeDialog?.()
    } catch {
      toast.menubarVehicle.add.error()
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
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <ImageFormField
          form={form}
          formName="img"
          image={{
            alt: 'menubar vehicle',
          }}
          button={{
            buttonText: 'Add image',
            buttonIconType: 'ADD',
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

        <ButtonSubmit isPending={isPending} />
      </form>
    </Form>
  )
}
