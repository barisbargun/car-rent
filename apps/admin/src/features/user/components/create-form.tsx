import { zodResolver } from '@hookform/resolvers/zod'
import {
  createUserInputSchema,
  useCreateUser,
} from '@repo/api/paths/user/create'
import { ROLE_POST_LIST, ROLE_POST_LIST_UI } from '@repo/api/types/user'
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

import { ButtonSubmit } from '@/components/shared/buttons/submit'
import { ImageFormField } from '@/features/image/components/form-field'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> & DialogPropsPartial & {}

export const UserCreateForm = ({ closeDialog, className, ...props }: Props) => {
  const { mutateAsync, isPending } = useCreateUser()

  const form = useForm<z.infer<typeof createUserInputSchema>>({
    resolver: zodResolver(createUserInputSchema),
    defaultValues: {
      img: '',
      username: '',
      password: '',
      email: '',
      role: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof createUserInputSchema>) {
    try {
      await mutateAsync({
        data: values,
      })
      toast.user.add.success()
      closeDialog?.()
    } catch {
      toast.user.add.error()
    }
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
            alt: 'user',
          }}
          button={{
            buttonText: 'Add image',
            buttonIconType: 'ADD',
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter password"
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

        <ButtonSubmit isPending={isPending} />
      </form>
    </Form>
  )
}
