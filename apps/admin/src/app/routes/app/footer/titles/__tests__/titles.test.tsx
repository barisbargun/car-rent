import { generateFooterTitle } from '@repo/mock/utils/data-generators'

import { confirmDialog } from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import FooterTitlesRoute from '../titles'

type FooterTitleType = Required<ReturnType<typeof generateFooterTitle>>

const create = async (footerTitle: FooterTitleType) => {
  await userEvent.click(
    screen.getByRole('button', { name: /add footer title/i }),
  )

  const drawer = await screen.findByRole('dialog', {
    name: /add a new footer title/i,
  })

  const titleField = within(drawer).getByLabelText(/title/i)
  await userEvent.type(titleField, footerTitle.title)

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

const checkContent = async (card: HTMLElement, data: FooterTitleType) => {
  expect(within(card).getByText(data.title)).toBeInTheDocument()
}

test(
  'should create, render, edit and delete footerTitles',
  { timeout: 12_000 },
  async () => {
    await renderApp(<FooterTitlesRoute />, { user: 'ADMIN' })

    const newFooterTitle = generateFooterTitle() as FooterTitleType
    const updatedTitle = 'updated-title'

    // Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newFooterTitle)
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('footerTitle-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editTitle(card, updatedTitle)

    // Hover and check values
    await checkContent(card, { ...newFooterTitle, title: updatedTitle })

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)

test('should swap footerTitles', { timeout: 4000 }, async () => {
  const [footerTitle1, footerTitle2] = [
    generateFooterTitle({}, true),
    generateFooterTitle({}, true),
  ] as FooterTitleType[]

  await renderApp(<FooterTitlesRoute />, { user: 'ADMIN' })

  expect(await screen.findByText(/There are 2 items./i)).toBeInTheDocument()
  const updateButton = screen.getByTestId('update-button')
  expect(updateButton).toBeDisabled()

  const [card1, card2] = screen.getAllByTestId('footerTitle-card')
  await checkContent(card1, footerTitle1)
  await checkContent(card2, footerTitle2)

  await swap(card1, card2)
  expect(updateButton).not.toBeDisabled()

  await userEvent.click(updateButton)
  await waitFor(() => expect(updateButton).toBeDisabled())

  const [cardSwapped1, cardSwapped2] = screen.getAllByTestId('footerTitle-card')

  await checkContent(cardSwapped1, footerTitle2)
  await checkContent(cardSwapped2, footerTitle1)
})
