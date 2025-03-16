import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, useAuthLogin } from '@repo/api/paths/auth/login'
import { Button } from '@repo/ui/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { Loader } from '@repo/ui/components/loader'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/lib/toast'

type Props = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: Props) => {
  const { mutateAsync, isPending, isSuccess } = useAuthLogin()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await mutateAsync({ ...values })
      form.reset()
      toast.user.login.success()
      onSuccess()
    } catch {
      toast.user.login.error()
    }
  }
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending || isSuccess}
          type="submit"
          className="w-full"
        >
          {isPending && <Loader />}Sign in
        </Button>
      </form>
    </Form>
  )
}
