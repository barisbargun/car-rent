import { generateService } from '@repo/mock/utils/data-generators'
import { confirmDialog, selectFirstImage } from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import ServicesRoute from '../services'
import { Service } from '@repo/api/paths/service/common'

type ServiceType = Required<Service>

const editService = async (card: HTMLElement, newService: ServiceType) => {
  await userEvent.click(
    within(card).getByRole('button', {
      name: /edit/i,
    }),
  )
  const drawer = await screen.findByRole('dialog', {
    name: /update/i,
  })

  await selectFirstImage(
    within(drawer).getByRole('button', { name: /change image/i }),
  )
  const titleField = within(drawer).getByLabelText(/title/i)
  const descField = within(drawer).getByLabelText(/description/i)

  await userEvent.clear(titleField)
  await userEvent.clear(descField)

  await userEvent.type(titleField, newService.title)
  await userEvent.type(descField, newService.desc)

  const submitButton = within(drawer).getByRole('button', {
    name: /update/i,
  })
  await userEvent.click(submitButton)
  await confirmDialog()

  await waitFor(() => expect(drawer).not.toBeInTheDocument())
}

const checkContent = async (card: HTMLElement, service: ServiceType) => {
  expect(within(card).getByText(service.title)).toBeInTheDocument()
  expect(within(card).getByText(service.desc)).toBeInTheDocument()
}

test('should render and edit services', { timeout: 12_000 }, async () => {
  const services = Array.from({ length: 5 }, () => generateService({}, true))
  await renderApp(<ServicesRoute />, { user: 'ADMIN' })

  const newService = generateService()

  // Card
  const cards = screen.getAllByTestId('service-card')

  // Initially, 5 items should be present
  expect(cards).toHaveLength(5)

  for (const [i, card] of cards.entries()) {
    await checkContent(card, services[i])
  }

  // Edit and check first service
  await editService(cards[0], newService)
  await checkContent(cards[0], newService)
})
