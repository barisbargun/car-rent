/* eslint-disable unicorn/prefer-export-from */
import { ROLE_LIST,RoleTypes } from '@repo/api/types/user'
import { generateUser } from '@repo/mock/utils/data-generators'
import { authenticate } from '@repo/mock/utils/mock'
import { storageToken } from '@repo/utils/storage'
import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'

import { AppProvider } from '@/app/provider'

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 },
  )

const authenticatedUser = (role: RoleTypes) => {
  const password = '123456'
  const createdUser = generateUser({ password, role: ROLE_LIST[role] }, true)
  const authenticated = authenticate({
    username: createdUser.username,
    password,
  })
  if (!authenticated.accessToken) throw new Error('No access token found')
  storageToken.set(authenticated.accessToken)
  return authenticated.user
}

export const renderApp = async (
  ui: any,
  {
    user,
    url = '/',
    path = '/',
    ...renderOptions
  }: { user?: RoleTypes } & Record<string, any> = {},
) => {
  const initializedUser = user && authenticatedUser(user)
  const router = createMemoryRouter(
    [
      {
        path: path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ['/', url] : ['/'],
      initialIndex: url ? 1 : 0,
    },
  )
  const returnValue = {
    ...rtlRender(ui, {
      wrapper: () => {
        return (
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        )
      },
      ...renderOptions,
    }),
    user: initializedUser,
  }

  await waitForLoadingToFinish()
  return returnValue
}

export * from '@testing-library/react'
export { userEvent }
