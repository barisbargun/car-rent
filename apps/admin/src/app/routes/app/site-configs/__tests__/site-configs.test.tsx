import { generateSiteConfig } from '@repo/mock/utils/data-generators'

import { confirmDialog, selectFirstImage } from '@/testing/helpers'
import { renderApp, screen, userEvent } from '@/testing/test-utils'

import SiteConfigsRoute from '../site-configs'

test('should render and edit siteConfigs', { timeout: 10_000 }, async () => {
  await renderApp(<SiteConfigsRoute />, { user: 'ADMIN' })

  const siteConfig = generateSiteConfig()

  const titleField = await screen.findByLabelText(/title/i)
  const descField = screen.getByLabelText(/description/i)

  await userEvent.type(titleField, siteConfig.title)
  await userEvent.type(descField, siteConfig.desc)

  selectFirstImage(screen.getByRole('button', { name: /change logo image/i }))
  selectFirstImage(
    screen.getByRole('button', { name: /change service image/i }),
  )

  const submitButton = screen.getByRole('button', {
    name: /update/i,
  })
  await userEvent.click(submitButton)
  await confirmDialog()
})
