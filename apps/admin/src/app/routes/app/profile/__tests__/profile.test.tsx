import { generateUser } from '@repo/mock/utils/data-generators'

import { confirmDialog, selectFirstImage } from '@/testing/helpers'
import { renderApp, screen, userEvent } from '@/testing/test-utils'

import ProfilesRoute from '../profile'

test('should render and edit profile', { timeout: 10_000 }, async () => {
  await renderApp(<ProfilesRoute />, { user: 'ADMIN' })

  const profile = generateUser()

  const usernameField = await screen.findByLabelText(/username/i)
  const emailField = screen.getByLabelText(/email/i)
  const passwordField = screen.getByLabelText(/password/i)

  await userEvent.type(usernameField, profile.username)
  await userEvent.type(emailField, profile.email)
  await userEvent.type(passwordField, profile.password)

  selectFirstImage(screen.getByRole('button', { name: /change image/i }))

  const submitButton = screen.getByRole('button', {
    name: /update/i,
  })
  await userEvent.click(submitButton)
  await confirmDialog()
})
