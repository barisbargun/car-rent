import { Carousel } from '@repo/api/types/carousel'
import { generateCarousel } from '@repo/mock/utils/data-generators'

import { confirmDialog, selectFirstImage } from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import CarouselsRoute from '../carousels'

type CarouselType = Required<Carousel>

const create = async (carousel: CarouselType) => {
  await userEvent.click(screen.getByRole('button', { name: /add carousel/i }))

  const drawer = await screen.findByRole('dialog', {
    name: /add a new carousel/i,
  })
  await selectFirstImage(
    within(drawer).getByRole('button', { name: /add image/i }),
  )

  const titleField = within(drawer).getByLabelText(/title/i)
  const descField = within(drawer).getByLabelText(/description/i)
  const vehicleNameField = within(drawer).getByLabelText(/vehicle name/i)
  const engineField = within(drawer).getByLabelText(/engine/i)
  const powerField = within(drawer).getByLabelText(/power/i)
  const priceField = within(drawer).getByLabelText(/price/i)

  await userEvent.type(titleField, carousel.title)
  await userEvent.type(descField, carousel.desc)
  await userEvent.type(vehicleNameField, carousel.vehicleName)
  await userEvent.type(engineField, carousel.engine)
  await userEvent.type(powerField, carousel.power.toString())
  await userEvent.type(priceField, carousel.price.toString())

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

const checkContent = async (card: HTMLElement, carousel: CarouselType) => {
  const hoverCard = within(card).getByTestId('carousel-hover-card')
  expect(hoverCard).toBeInTheDocument()
  await userEvent.hover(hoverCard)

  expect(await within(card).findByText(carousel.title)).toBeInTheDocument()
  expect(within(card).getByText(carousel.desc)).toBeInTheDocument()
  expect(within(card).getByText(carousel.vehicleName)).toBeInTheDocument()
  expect(within(card).getByText(carousel.engine)).toBeInTheDocument()
  expect(within(card).getByText(carousel.power)).toBeInTheDocument()
  expect(within(card).getByText(carousel.price)).toBeInTheDocument()
}

test(
  'should create, render, edit, hover and delete carousels',
  { timeout: 12_000 },
  async () => {
    await renderApp(<CarouselsRoute />, { user: 'ADMIN' })

    const newCarousel = generateCarousel()
    const updatedTitle = 'new title'

    // Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newCarousel)
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('carousel-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editTitle(card, updatedTitle)

    // Hover and check values
    await checkContent(card, { ...newCarousel, title: updatedTitle })

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)

test('should swap carousels', { timeout: 4000 }, async () => {
  const [carousel1, carousel2] = [
    generateCarousel({}, true),
    generateCarousel({}, true),
  ]

  await renderApp(<CarouselsRoute />, { user: 'ADMIN' })

  expect(await screen.findByText(/There are 2 items./i)).toBeInTheDocument()
  const updateButton = screen.getByTestId('update-button')
  expect(updateButton).toBeDisabled()

  const [card1, card2] = screen.getAllByTestId('carousel-card')
  await checkContent(card1, carousel1)
  await checkContent(card2, carousel2)

  await swap(card1, card2)
  expect(updateButton).not.toBeDisabled()

  await userEvent.click(updateButton)
  await waitFor(() => expect(updateButton).toBeDisabled())

  const [cardSwapped1, cardSwapped2] = screen.getAllByTestId('carousel-card')

  await checkContent(cardSwapped1, carousel2)
  await checkContent(cardSwapped2, carousel1)
})
