import { env } from '#mock/config/env'

export const enableMocking = async () => {
  if (!env.ENABLE_API_MOCKING) return

  const { worker } = await import('./browser')
  const { initializeDb } = await import('./db')
  initializeDb()
  return worker.start()
}
