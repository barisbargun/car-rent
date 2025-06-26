import { zodResolver } from '@hookform/resolvers/zod'
import {
  ROLE_POST_LIST,
  ROLE_POST_LIST_UI,
  UserGet,
  UserUpdate,
  userUpdateSchema,
} from '@repo/api/paths/user/common'
import { useUpdateUser } from '@repo/api/paths/user/update'
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

import assets from '@/assets'
import { DialogProps } from '@/components/global/open-dialog'
import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogProps & {
    user: Omit<UserGet, 'role'> & {
      role: ROLE_POST_LIST
    }
  }

export const UserUpdateForm = ({
  user,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateUser()

  const form = useForm<UserUpdate>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      img: user.img?.id,
      username: user.username || '',
      email: user.email || '',
      role: user.role,
    },
  })

  async function onSubmit(values: UserUpdate) {
    try {
      await mutateAsync({
        id: user.id,
        data: values,
      })
      toast.user.update.success()
      closeDialog?.()
    } catch {
      toast.user.update.error()
    }
  }

  return (
    <Form {...form}>
      <form className={cn('flex w-full flex-col gap-5', className)} {...props}>
        <ImageFormField
          form={form}
          formName="img"
          initialImage={user.img?.url}
          image={{
            fallback: assets.profilePlaceHolder,
            alt: 'user',
            className: 'h-full object-cover rounded-full',
          }}
          button={{
            buttonText: 'Change image',
            buttonIconType: 'EDIT',
          }}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="name"
                  placeholder="Enter username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={(val) =>
                  field.onChange(Number.parseInt(val) || 0)
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getEnumEntries(ROLE_POST_LIST).map(([key, value]) => (
                    <SelectItem key={key} value={value.toString()}>
                      {ROLE_POST_LIST_UI[value]}
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
