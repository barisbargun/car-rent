import { REQUIRED_ROLE } from '@repo/api/config/required-role'

import UsersRoute from '@/app/routes/app/users/users'
import { renderApp } from '@/testing/test-utils'

import { ProtectedComponentRoute } from '../auth'

test('users should not see the users page', { timeout: 1000 }, async () => {
  const { container } = await renderApp(
    <ProtectedComponentRoute
      checkRole={REQUIRED_ROLE.user.get}
      route={() => UsersRoute}
    />,
    { user: 'USER' },
  )

  expect(container).toBeEmptyDOMElement()
})

test('editors should not see the users page', { timeout: 1000 }, async () => {
  const { container } = await renderApp(
    <ProtectedComponentRoute
      checkRole={REQUIRED_ROLE.user.get}
      route={() => UsersRoute}
    />,
    { user: 'EDITOR' },
  )

  expect(container).toBeEmptyDOMElement()
})
