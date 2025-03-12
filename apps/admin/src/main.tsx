/* eslint-disable unicorn/prefer-top-level-await */
import '@repo/ui/globals.css'
import './globals.css'

import { enableMocking } from '@repo/mock/enable-mocking'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { App } from './app.tsx'
import { RootLayout } from './components/layouts/root.tsx'
import { env } from './config/env.ts'

const root = document.querySelector('#root')
if (!root) throw new Error('No root element found')

enableMocking(env).then(() => {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
          <RootLayout>
            <App />
          </RootLayout>
      </BrowserRouter>
    </StrictMode>,
  )
})
