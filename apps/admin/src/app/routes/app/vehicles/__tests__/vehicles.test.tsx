import { db } from '@repo/mock/db'

import {
  generateMenubarTab,
  generateMenubarVehicle,
  generateVehicle,
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

import VehiclesRoute from '../vehicles'
import { getEnumKeys } from '@repo/utils/enum'
import {
  DRIVE_TRAIN_LIST_UI,
  Vehicle,
  WHEEL_DRIVE_LIST_UI,
} from '@repo/api/types/vehicle'
import { MenubarVehicle } from '@repo/api/types/menubar'

type VehicleType = Required<Vehicle>
type MenubarVehicleType = Required<MenubarVehicle>

const create = async (
  vehicle: VehicleType,
  menubarVehicle: MenubarVehicleType,
) => {
  await userEvent.click(screen.getByRole('button', { name: /add vehicle/i }))

  const drawer = await screen.findByRole('dialog', {
    name: /add a new vehicle/i,
  })

  await selectFirstImage(within(drawer).getByRole('button', { name: /add image/i }))
  const titleField = within(drawer).getByLabelText(/title/i)
  const fuelField = within(drawer).getByLabelText(/fuel/i)

  await userEvent.type(titleField, vehicle.title)
  await userEvent.type(fuelField, vehicle.fuel)
  await selectOption({
    drawer,
    triggerName: 'drive train',
    triggerDefaultText: 'select a drive train',
    options: getEnumKeys(DRIVE_TRAIN_LIST_UI),
    selectOption: DRIVE_TRAIN_LIST_UI[vehicle.drivetrain],
  })

  await selectOption({
    drawer,
    triggerName: 'wheel',
    triggerDefaultText: 'select a wheel',
    options: getEnumKeys(WHEEL_DRIVE_LIST_UI),
    selectOption: WHEEL_DRIVE_LIST_UI[vehicle.wheel],
  })

  await selectOption({
    drawer,
    triggerName: 'brand',
    triggerDefaultText: 'select a brand',
    options: db.menubarVehicle.getAll().map((v) => v.title),
    selectOption: menubarVehicle.title,
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
  'should create, render, edit and delete vehicles',
  { timeout: 15_000 },
  async () => {
    generateMenubarTab({}, true)
    const menubarVehicles = Array.from({ length: 3 }).map(() =>
      generateMenubarVehicle({}, true),
    )
    await renderApp(<VehiclesRoute />, { user: 'ADMIN' })

    const newVehicle = generateVehicle()
    const updatedTitle = newVehicle.title.split('').reverse().join('')

    // Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newVehicle, menubarVehicles[0])
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('vehicle-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editTitle(card, updatedTitle)

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)
