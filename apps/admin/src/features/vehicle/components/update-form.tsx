import { zodResolver } from '@hookform/resolvers/zod'
import { useMenubarVehicles } from '@repo/api/paths/menubar/vehicle/get-all'
import {
  updateVehicleInputSchema,
  useUpdateVehicle,
} from '@repo/api/paths/vehicle/update'
import {
  DRIVE_TRAIN_LIST,
  DRIVE_TRAIN_LIST_UI,
  VehicleGet,
  WHEEL_DRIVE_LIST,
  WHEEL_DRIVE_LIST_UI,
} from '@repo/api/types/vehicle'
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
import { getEnumEntries } from '@repo/utils/enum'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogPropsPartial & {
    vehicle: VehicleGet
  }

export const VehicleUpdateForm = ({
  vehicle,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { data: menubarVehicles, isPending: isMenubarVehiclesPending } =
    useMenubarVehicles()
  const { mutateAsync, isPending } = useUpdateVehicle()

  const form = useForm<z.infer<typeof updateVehicleInputSchema>>({
    resolver: zodResolver(updateVehicleInputSchema),
    defaultValues: {
      img: vehicle.img?.id || '',
      menubarVehicle: vehicle.menubarVehicle || '',
      title: vehicle.title || '',
      fuel: vehicle.fuel || '',
      drivetrain: vehicle.drivetrain,
      wheel: vehicle.wheel,
    },
  })

  async function onSubmit(values: z.infer<typeof updateVehicleInputSchema>) {
    try {
      await mutateAsync({
        id: vehicle.id,
        data: values,
      })
      toast.vehicle.update.success()
      closeDialog?.()
    } catch {
      toast.vehicle.update.error()
    }
  }

  if (isMenubarVehiclesPending) {
    return <FullPageLoader />
  } else if (!menubarVehicles || menubarVehicles.length === 0) {
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
          initialImage={vehicle.img?.url}
          image={{
            alt: 'vehicle card',
          }}
          button={{
            buttonText: 'Change image',
            buttonIconType: 'EDIT',
          }}
        />

        <FormField
          control={form.control}
          name="menubarVehicle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Select
                value={field.value.toString()}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {menubarVehicles.map(({ id, title }) => (
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
          name="fuel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="Enter fuel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="drivetrain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drive train</FormLabel>
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={(val) =>
                  field.onChange(Number.parseInt(val) || 0)
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a drive train" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getEnumEntries(DRIVE_TRAIN_LIST).map(([key, value]) => (
                    <SelectItem key={key} value={value.toString()}>
                      {DRIVE_TRAIN_LIST_UI[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="wheel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wheel</FormLabel>
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={(val) =>
                  field.onChange(Number.parseInt(val) || 0)
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a wheel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getEnumEntries(WHEEL_DRIVE_LIST).map(([key, value]) => (
                    <SelectItem key={key} value={value.toString()}>
                      {WHEEL_DRIVE_LIST_UI[value]}
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
