import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import assets from '@/assets'
import { queryClient } from '@/config/react-query'
import { DataContextProvider } from '@/lib/context'

import { Navbar } from '../global/navbar'

type Props = {
  children: React.ReactNode
}

export const RootLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full flex-col">
        <img src={assets.pattern} alt='pattern' className='w-screen h-screen fixed opacity-40'/>
        <QueryClientProvider client={queryClient}>
          <DataContextProvider>
            {import.meta.env.DEV && <ReactQueryDevtools />}
            {children}
          </DataContextProvider>
        </QueryClientProvider>
      </main>
    </>
  )
}
