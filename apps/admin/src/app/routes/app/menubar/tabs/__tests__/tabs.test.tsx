import {
  MENUBAR_TAB_GRID_LIST_UI,
  MenubarTab,
} from '@repo/api/paths/menubar/tab/common'
import { generateMenubarTab } from '@repo/mock/utils/data-generators'
import { getEnumKeys } from '@repo/utils/enum'

import { confirmDialog, selectOption } from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import MenubarTabsRoute from '../tabs'

type MenubarTabType = Required<MenubarTab>

const create = async (menubarTab: MenubarTabType) => {
  await userEvent.click(
    screen.getByRole('button', { name: /add menubar tab/i }),
  )

  const drawer = await screen.findByRole('dialog', {
    name: /add a new menubar tab/i,
  })

  const titleField = within(drawer).getByLabelText(/title/i)
  await userEvent.type(titleField, menubarTab.title)
  await selectOption({
    drawer,
    triggerName: 'Type',
    triggerDefaultText: 'select a grid',
    options: getEnumKeys(MENUBAR_TAB_GRID_LIST_UI),
    selectOption: MENUBAR_TAB_GRID_LIST_UI[menubarTab.type],
  })

  const submitButton = await within(drawer).findByRole('button', {
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

const swap = async (card1: HTMLElement, card2: HTMLElement) => {
  await userEvent.click(
    within(card1).getByRole('button', {
      name: /swap/i,
    }),
  )

  await userEvent.click(
    within(card2).getByRole('button', {
      name: /swap/i,
    }),
  )
}

const checkContent = async (card: HTMLElement, data: MenubarTabType) => {
  expect(within(card).getByText(data.title)).toBeInTheDocument()
}

test(
  'should create, render, edit and delete menubarTabs',
  { timeout: 12_000 },
  async () => {
    await renderApp(<MenubarTabsRoute />, { user: 'ADMIN' })

    const newMenubarTab = generateMenubarTab()
    const updatedTitle = 'updated-title'

    // Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newMenubarTab)
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('menubar-tab-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editTitle(card, updatedTitle)

    // Hover and check values
    await checkContent(card, { ...newMenubarTab, title: updatedTitle })

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)

test('should swap menubarTabs', { timeout: 4000 }, async () => {
  const [menubarTab1, menubarTab2] = [
    generateMenubarTab({}, true),
    generateMenubarTab({}, true),
  ]

  await renderApp(<MenubarTabsRoute />, { user: 'ADMIN' })

  expect(await screen.findByText(/There are 2 items./i)).toBeInTheDocument()
  const updateButton = screen.getByTestId('update-button')
  expect(updateButton).toBeDisabled()

  const [card1, card2] = screen.getAllByTestId('menubar-tab-card')
  await checkContent(card1, menubarTab1)
  await checkContent(card2, menubarTab2)

  await swap(card1, card2)
  expect(updateButton).not.toBeDisabled()

  await userEvent.click(updateButton)
  await waitFor(() => expect(updateButton).toBeDisabled())

  const [cardSwapped1, cardSwapped2] = screen.getAllByTestId('menubar-tab-card')

  await checkContent(cardSwapped1, menubarTab2)
  await checkContent(cardSwapped2, menubarTab1)
})
