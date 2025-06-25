/* eslint-disable unicorn/prefer-top-level-await */
import './globals.css'

import { enableMocking } from '@repo/mock/worker'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { App } from './app'
import { AppProvider } from './app/provider'

const root = document.querySelector('#root')
if (!root) throw new Error('No root element found')

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </StrictMode>,
  )
})
