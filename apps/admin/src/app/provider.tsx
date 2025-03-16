import { queryClient, QueryClientProvider } from '@repo/api/config/react-query'
import { FullPageLoader } from '@repo/ui/components/loader'
import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { MainErrorFallback } from '@/components/errors/main'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <FullPageLoader />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {/* {import.meta.env.DEV && (
            <ReactQueryDevtools
              client={queryClient}
              buttonPosition="top-left"
            />
          )} */}
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
