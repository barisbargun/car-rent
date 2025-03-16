import { MenubarTab, MenubarVehicle } from '@repo/api/types/menubar'
import { db } from '@repo/mock/db'
import {
  generateMenubarTab,
  generateMenubarVehicle,
} from '@repo/mock/utils/data-generators'

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

import MenubarVehiclesRoute from '../vehicles'

type MenubarVehicleType = Required<MenubarVehicle>
type MenubarTabType = Required<MenubarTab>

const create = async (
  menubarVehicle: MenubarVehicleType,
  menubarTab: MenubarTabType,
) => {
  await userEvent.click(
    screen.getByRole('button', { name: /add menubar vehicle/i }),
  )

  const drawer = await screen.findByRole('dialog', {
    name: /add a new menubar vehicle/i,
  })
  await selectFirstImage(within(drawer).getByRole('button', { name: /add image/i }))

  const titleField = within(drawer).getByLabelText(/title/i)
  const descField = within(drawer).getByLabelText(/description/i)

  await userEvent.type(titleField, menubarVehicle.title)
  await userEvent.type(descField, menubarVehicle.desc)

  await selectOption({
    drawer,
    triggerName: 'group',
    triggerDefaultText: 'select a group',
    options: db.menubarTab.getAll().map((v) => v.title),
    selectOption: menubarTab.title,
  })

  const submitButton = within(drawer).getByRole('button', {
    name: /create/i,
  })
  await userEvent.click(submitButton)
  await waitFor(() => expect(drawer).not.toBeInTheDocument())
}

const editTitle = async (card: HTMLElement, title: string) => {
  await userEvent.click(
    within(card).getByRole('button', {
      name: /edit/i,
    }),
  )
  const drawer = await screen.findByRole('dialog', {
    name: /update/i,
  })

  const titleField = within(drawer).getByLabelText(/title/i)
  await userEvent.clear(titleField)
  await userEvent.type(titleField, title)

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

test(
  'should create, render, edit and delete menubarVehicles',
  { timeout: 12_000 },
  async () => {
    const menubarTabs = Array.from({ length: 3 }).map(() =>
      generateMenubarTab({}, true),
    )

    await renderApp(<MenubarVehiclesRoute />, { user: 'ADMIN' })

    const newMenubarVehicle = generateMenubarVehicle()
    const updatedTitle = 'updated-title'

    //Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newMenubarVehicle, menubarTabs[0])
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('menubar-vehicle-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editTitle(card, updatedTitle)

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)
