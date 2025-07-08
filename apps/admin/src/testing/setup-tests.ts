import '@/lib/axios-refresh.ts'
import '@testing-library/jest-dom/vitest'

import { queryClient } from '@repo/api/config/react-query'
import { clearDb } from '@repo/mock/db'
import { server } from '@repo/mock/server'

// vi.mock('zustand')

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
beforeEach(() => {
  queryClient.clear()
  const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))

  vi.stubGlobal('ResizeObserver', ResizeObserverMock)

  globalThis.btoa = (str: string) =>
    Buffer.from(str, 'binary').toString('base64')
  globalThis.atob = (str: string) =>
    Buffer.from(str, 'base64').toString('binary')
  clearDb()
})
afterEach(() => {
  server.resetHandlers()
})

globalThis.HTMLElement.prototype.scrollIntoView = vi.fn()
globalThis.HTMLElement.prototype.releasePointerCapture = vi.fn()
globalThis.HTMLElement.prototype.hasPointerCapture = vi.fn()
