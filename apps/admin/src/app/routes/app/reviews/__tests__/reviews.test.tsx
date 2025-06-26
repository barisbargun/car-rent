import { Review } from '@repo/api/paths/review/common'
import { generateReview } from '@repo/mock/utils/data-generators'

import { confirmDialog, selectFirstImage } from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import ReviewsRoute from '../reviews'

type ReviewType = Required<Review>

const create = async (review: ReviewType) => {
  await userEvent.click(screen.getByRole('button', { name: /add review/i }))

  const drawer = await screen.findByRole('dialog', {
    name: /add a new review/i,
  })
  await selectFirstImage(
    within(drawer).getByRole('button', { name: /add image/i }),
  )

  const nameField = within(drawer).getByLabelText(/full name/i)
  const descField = within(drawer).getByLabelText(/description/i)
  const occupationField = within(drawer).getByLabelText(/occupation/i)

  await userEvent.type(nameField, review.fullname)
  await userEvent.type(descField, review.desc)
  await userEvent.type(occupationField, review.occupation)

  const submitButton = within(drawer).getByRole('button', {
    name: /create/i,
  })
  await userEvent.click(submitButton)
  await waitFor(() => expect(drawer).not.toBeInTheDocument())
}

const editName = async (card: HTMLElement, name: string) => {
  await userEvent.click(
    within(card).getByRole('button', {
      name: /edit/i,
    }),
  )
  const drawer = await screen.findByRole('dialog', {
    name: /update/i,
  })

  const nameField = within(drawer).getByLabelText(/name/i)
  await userEvent.clear(nameField)
  await userEvent.type(nameField, name)

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

const checkContent = async (card: HTMLElement, data: ReviewType) => {
  expect(within(card).getByText(data.fullname)).toBeInTheDocument()
  expect(within(card).getByText(data.desc)).toBeInTheDocument()
  expect(within(card).getByText(data.occupation)).toBeInTheDocument()
}

test(
  'should create, render, edit and delete reviews',
  { timeout: 12_000 },
  async () => {
    await renderApp(<ReviewsRoute />, { user: 'ADMIN' })

    const newReview = generateReview()
    const updatedName = 'updated-name'

    // Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newReview)
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('review-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editName(card, updatedName)

    // Check values
    await checkContent(card, { ...newReview, fullname: updatedName })

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)

test('should swap reviews', { timeout: 4000 }, async () => {
  const [review1, review2] = [
    generateReview({}, true),
    generateReview({}, true),
  ]

  await renderApp(<ReviewsRoute />, { user: 'ADMIN' })

  expect(await screen.findByText(/There are 2 items./i)).toBeInTheDocument()
  const updateButton = screen.getByTestId('update-button')
  expect(updateButton).toBeDisabled()

  const [card1, card2] = screen.getAllByTestId('review-card')
  await checkContent(card1, review1)
  await checkContent(card2, review2)

  await swap(card1, card2)
  expect(updateButton).not.toBeDisabled()

  await userEvent.click(updateButton)
  await waitFor(() => expect(updateButton).toBeDisabled())

  const [cardSwapped1, cardSwapped2] = screen.getAllByTestId('review-card')

  await checkContent(cardSwapped1, review2)
  await checkContent(cardSwapped2, review1)
})
