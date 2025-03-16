import { confirmDialog } from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import ImagesRoute from '../images'

/*
Not working because image dimensions are not correct
*/
// const create = async (file: File) => {
//   await userEvent.click(screen.getByRole('button', { name: /add new image/i }))

//   const drawer = await screen.findByRole('dialog', {
//     name: /upload image/i,
//   })

//   const presentationField = within(drawer).getByRole('presentation')
//   const fileInput = presentationField.querySelector(
//     'input[type="file"]',
//   ) as HTMLInputElement

//   await userEvent.upload(fileInput, file)

//   const uploadButton = within(drawer).getByRole('button', {
//     name: /upload/i,
//   })
//   await userEvent.click(uploadButton)
//   // await waitFor(() => expect(drawer).not.toBeInTheDocument())
// }

const remove = async (card: HTMLElement) => {
  await userEvent.click(
    within(card).getByRole('button', {
      name: /delete/i,
    }),
  )
  await confirmDialog()
  await waitFor(() => expect(card).not.toBeInTheDocument())
}

// test('should add image', { timeout: 4000 }, async () => {
//   globalThis.URL.createObjectURL = vi.fn(
//     () => 'blob:https://fakeimg.pl/400x400',
//   )

//   await renderApp(<ImagesRoute />, { user: 'ADMIN' })

//   const file = new File(['img'], 'img.png', { type: 'image/png' })
//   // Initially, no items
//   expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

//   // Create
//   await create(file)
//   // expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()
// })

test('should remove image', { timeout: 4000 }, async () => {
  await renderApp(<ImagesRoute />, { user: 'ADMIN' })
  // Initially, there is one image of user
  expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

  const card = await screen.findByTestId('image-card')
  await remove(card)

  expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
})
