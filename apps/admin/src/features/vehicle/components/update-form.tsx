import { zodResolver } from '@hookform/resolvers/zod'
import {
  DRIVE_TRAIN_LIST,
  DRIVE_TRAIN_LIST_UI,
  VehicleGet,
  VehicleUpdate,
  vehicleUpdateSchema,
  WHEEL_DRIVE_LIST,
  WHEEL_DRIVE_LIST_UI,
} from '@repo/api/paths/vehicle/common'
import { useUpdateVehicle } from '@repo/api/paths/vehicle/update'
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
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'

import { FormBrandField } from './form-brand-field'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogProps & {
    vehicle: VehicleGet
  }

export const VehicleUpdateForm = ({
  vehicle,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateVehicle()

  const form = useForm<VehicleUpdate>({
    resolver: zodResolver(vehicleUpdateSchema),
    defaultValues: {
      img: vehicle.img?.id,
      menubarVehicle: vehicle.menubarVehicle || '',
      title: vehicle.title || '',
      fuel: vehicle.fuel || '',
      drivetrain: vehicle.drivetrain,
      wheel: vehicle.wheel,
    },
  })

  async function onSubmit(values: VehicleUpdate) {
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

  return (
    <Form {...form}>
      <form className={cn('flex w-full flex-col gap-5', className)} {...props}>
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

        <FormBrandField form={form} />

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
