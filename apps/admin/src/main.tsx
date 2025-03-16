/* eslint-disable unicorn/prefer-top-level-await */
import './globals.css'
import '@/lib/axios-refresh.ts'

import { enableMocking } from '@repo/mock/worker'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app/index'

const root = document.querySelector('#root')
if (!root) throw new Error('No root element found')

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
