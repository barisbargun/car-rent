import { FooterLink, FooterTitle } from '@repo/api/types/footer'
import { db } from '@repo/mock/db'
import {
  generateFooterLink,
  generateFooterTitle,
} from '@repo/mock/utils/data-generators'

import { confirmDialog, selectOption } from '@/testing/helpers'
import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  within,
} from '@/testing/test-utils'

import FooterLinksRoute from '../links'

type FooterLinkType = Required<FooterLink>
type FooterTitleType = Required<FooterTitle>

const create = async (
  footerLink: FooterLinkType,
  footerTitle: FooterTitleType,
) => {
  await userEvent.click(screen.getByRole('button', { name: /add footer link/i }))

  const drawer = await screen.findByRole('dialog', {
    name: /add a new footer link/i,
  })

  const titleField = within(drawer).getByLabelText(/title/i)
  const linkField = within(drawer).getByLabelText(/link/i)

  await userEvent.type(titleField, footerLink.title)
  await userEvent.type(linkField, footerLink.link)

  await selectOption({
    drawer,
    triggerName: 'group',
    triggerDefaultText: 'select a group',
    options: db.footerTitle.getAll().map((v) => v.title),
    selectOption: footerTitle.title,
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
  'should create, render, edit and delete footerLinks',
  { timeout: 12_000 },
  async () => {
    const footerTitles = Array.from({ length: 3 }).map(() =>
      generateFooterTitle({}, true),
    )

    await renderApp(<FooterLinksRoute />, { user: 'ADMIN' })

    const newFooterLink = generateFooterLink() as FooterLinkType
    const updatedTitle = 'updated-title'

    //Initially, no items
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()

    // Create
    await create(newFooterLink, footerTitles[0])
    expect(await screen.findByText(/There are 1 items./i)).toBeInTheDocument()

    // Card
    const card = screen.getByTestId('footerLink-card')
    expect(card).toBeInTheDocument()

    // Edit
    await editTitle(card, updatedTitle)

    // Delete
    await remove(card)
    expect(await screen.findByText(/There are 0 items./i)).toBeInTheDocument()
  },
)
