import { screen, userEvent, within } from '@/testing/test-utils'

/**
 * Finds an open alert dialog and confirms it by clicking the 'Continue' button.
 */
export const confirmDialog = async () => {
  const dialog = await screen.findByRole('alertdialog')
  const continueButton = within(dialog).getByRole('button', {
    name: /continue/i,
  })
  await userEvent.click(continueButton)
}

type SelectOptionProps = {
  /** The optional container element to scope the search. */
  drawer?: HTMLElement
  /** The accessible name of the combobox trigger. */
  triggerName: string
  /** The default text expected to be displayed in the trigger. */
  triggerDefaultText: string
  /** An array of all expected options to be visible when the combobox is open. */
  options: (string | number)[]
  /** The specific option to be selected from the list. */
  selectOption: string | number
}

/**
 * Automates selecting an option from a combobox and verifies the entire user interaction.
 */
export const selectOption = async ({
  drawer,
  triggerName,
  triggerDefaultText,
  options,
  selectOption,
}: SelectOptionProps) => {
  // Find the trigger, scoping the search within the drawer if provided, otherwise search the whole screen.
  const trigger = (drawer ? within(drawer) : screen).getByRole('combobox', {
    name: new RegExp(triggerName, 'i'),
  })
  expect(trigger).toBeInTheDocument()
  expect(
    within(trigger).getByText(new RegExp(triggerDefaultText, 'i')),
  ).toBeInTheDocument()

  await userEvent.click(trigger)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  // Verify that all expected options are rendered and visible.
  for (const option of options) {
    expect(
      screen.getByRole('option', { name: option.toString() }),
    ).toBeInTheDocument()
  }

  await userEvent.click(
    screen.getByRole('option', { name: selectOption.toString() }),
  )

  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(within(trigger).getByText(selectOption)).toBeInTheDocument()
}

/**
 * Selects the first image within a given button by simulating user interactions.
 * @param {HTMLElement} button - The HTML element representing the button to interact with.
 */
export const selectFirstImage = async (button: HTMLElement) => {
  await userEvent.click(button)

  const imageDrawer = await screen.findByRole('dialog', {
    name: /upload image/i,
  })

  const imageCards = await within(imageDrawer).findAllByTestId('image-card')
  await userEvent.click(imageCards[0])
}
