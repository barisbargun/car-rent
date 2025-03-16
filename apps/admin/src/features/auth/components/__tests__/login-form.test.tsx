import { AuthLayout } from '@/components/layouts/auth'
import { generateUser } from '@repo/mock/utils/data-generators'
import { renderApp, screen, userEvent, waitFor } from '@/testing/test-utils'

import { LoginForm } from '../login-form'

test('should login new user and call onSuccess cb which should navigate the user to the app', async () => {
  const password = '123456'
  const user = generateUser({ password }, true)
  const onSuccess = vi.fn()
  await renderApp(
    <AuthLayout>
      <LoginForm onSuccess={onSuccess} />
    </AuthLayout>,
  )
  await userEvent.type(screen.getByLabelText(/username/i), user.username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1))
})
