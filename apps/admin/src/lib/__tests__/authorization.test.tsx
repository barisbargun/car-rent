import { REQUIRED_ROLE } from '@repo/api/config/required-role'

import { renderApp, screen } from '@/testing/test-utils'

import { Authorization } from '../authorization'

test('should view protected resource if user role is matching', async () => {
  const protectedResource = 'This is very confidential data'
  await renderApp(
    <Authorization checkRole={REQUIRED_ROLE.others.admin}>
      {protectedResource}
    </Authorization>,
    { user: 'ADMIN' },
  )
  expect(screen.getByText(protectedResource)).toBeInTheDocument()
})

test('should not view protected resource if user role does not match and show fallback message instead', async () => {
  const protectedResource = 'This is very confidential data'

  const forbiddenMessage = 'You are unauthorized to view this resource'
  await renderApp(
    <Authorization
      forbiddenFallback={<div>{forbiddenMessage}</div>}
      checkRole={REQUIRED_ROLE.others.admin}
    >
      {protectedResource}
    </Authorization>,
    { user: 'USER' },
  )

  expect(screen.queryByText(protectedResource)).not.toBeInTheDocument()

  expect(screen.getByText(forbiddenMessage)).toBeInTheDocument()
})
