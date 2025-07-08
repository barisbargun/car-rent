import { zodResolver } from '@hookform/resolvers/zod'
import {
  UserGet,
  UserUpdateSelf,
  userUpdateSelfSchema,
} from '@repo/api/paths/user/common'
import { useUpdateUserSelf } from '@repo/api/paths/user/update-self'
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

import assets from '@/assets'
import { DialogProps } from '@/components/global/open-dialog'
import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogProps & {
    user?: UserGet
  }

export const UserProfileUpdateForm = ({
  user,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateUserSelf()

  const form = useForm<UserUpdateSelf>({
    resolver: zodResolver(userUpdateSelfSchema),
    defaultValues: {
      img: user?.img?.id,
      username: user?.username || '',
      email: user?.email || '',
      password: '',
    },
  })

  async function onSubmit(values: UserUpdateSelf) {
    try {
      await mutateAsync({
        data: values,
      })
      form.setValue('password', '')
      toast.user.updateSelf.success()
      closeDialog?.()
    } catch {
      toast.user.updateSelf.error()
    }
  }

  return (
    <Form {...form}>
      <form className={cn('flex w-full flex-col gap-5', className)} {...props}>
        <ImageFormField
          form={form}
          formName="img"
          initialImage={user?.img?.url}
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
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
