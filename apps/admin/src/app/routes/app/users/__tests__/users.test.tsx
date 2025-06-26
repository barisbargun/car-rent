import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { ROLE_POST_LIST_UI, User } from '@repo/api/paths/user/common'
import { generateUser } from '@repo/mock/utils/data-generators'
import { getEnumKeys } from '@repo/utils/enum'

import { ProtectedComponentRoute } from '@/lib/auth'
import {
  confirmDialog,
  selectFirstImage,
  selectOption,
} from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import UsersRoute from '../users'

type UserType = Required<Omit<User, 'refreshToken'>>

const create = async (user: UserType) => {
  await userEvent.click(screen.getByRole('button', { name: /add user/i }))

  const drawer = await screen.findByRole('dialog', {
    name: /add a new user/i,
  })
  await selectFirstImage(
    within(drawer).getByRole('button', { name: /add image/i }),
  )

  const usernameField = within(drawer).getByLabelText(/username/i)
  const passwordField = within(drawer).getByLabelText(/password/i)
  const emailField = within(drawer).getByLabelText(/email/i)

  await userEvent.type(usernameField, user.username)
  await userEvent.type(passwordField, user.password)
  await userEvent.type(emailField, user.email)

  await selectOption({
    drawer,
    triggerName: 'role',
    triggerDefaultText: 'select a role',
    options: getEnumKeys(ROLE_POST_LIST_UI),
    selectOption: ROLE_POST_LIST_UI[user.role],
  })

  const submitButton = within(drawer).getByRole('button', {
    name: /create/i,
  })
  await userEvent.click(submitButton)
  await waitFor(() => expect(drawer).not.toBeInTheDocument())
}

const editUsername = async (card: HTMLElement, username: string) => {
  await userEvent.click(
    within(card).getByRole('button', {
      name: /edit/i,
    }),
  )
  const drawer = await screen.findByRole('dialog', {
    name: /update/i,
  })

  const usernameField = within(drawer).getByLabelText(/username/i)
  await userEvent.clear(usernameField)
  await userEvent.type(usernameField, username)

  const submitButton = within(drawer).getByRole('button', {
    name: /update/i,
  })
  await userEvent.click(submitButton)
  await confirmDialog()

  await waitFor(() => expect(drawer).not.toBeInTheDocument())
}

const remove = async (card: HTMLElement) => {
  await userEvent.click(
    within(card).getByRole('button', {
      name: /delete/i,
    }),
  )
  await confirmDialog()
  await waitFor(() => expect(card).not.toBeInTheDocument())
}

const checkContent = async (card: HTMLElement, data: UserType) => {
  expect(within(card).getByText(data.username)).toBeInTheDocument()
  expect(within(card).getByText(data.email)).toBeInTheDocument()
}

test(
  'admins should create, render, edit and delete users',
  { timeout: 12_000 },
  async () => {
    await renderApp(
      <ProtectedComponentRoute
        checkRole={REQUIRED_ROLE.user.get}
        route={() => UsersRoute}
      />,
      { user: 'ADMIN' },
    )

    const newUser = generateUser()
    const updatedUsername = 'new username'

    // Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newUser)
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('user-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editUsername(card, updatedUsername)

    // Hover and check values
    await checkContent(card, { ...newUser, username: updatedUsername })

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)
