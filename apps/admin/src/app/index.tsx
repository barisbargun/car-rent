import { Toaster } from '@repo/ui/components/sonner'
import { ThemeProvider } from '@repo/ui/components/theme-provider'

import assets from '@/assets'

import { AppProvider } from './provider'
import { AppRouter } from './router'

export const App = () => {
  return (
    <>
      <AppProvider>
        <ThemeProvider defaultTheme="dark" storageKey="theme">
          <AppRouter />
          <Toaster richColors position="bottom-left" />
        </ThemeProvider>
      </AppProvider>
      <img
        src={assets.pattern}
        alt="pattern"
        className="fixed -right-52 top-0 h-screen w-screen"
      />
    </>
  )
}
