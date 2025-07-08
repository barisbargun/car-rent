import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import { FullPageLoader } from '@repo/ui/components/loader'
import { ModeToggle } from '@repo/ui/components/mode-toggle'
import * as React from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { paths } from '@/config/paths'

type LayoutProps = {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: LayoutProps) => {
  const { data: user, isPending, isSuccess } = useCurrentUser()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.id && isSuccess) {
      navigate(redirectTo ?? (paths.app.dashboard.path || '/'), {
        replace: true,
      })
    }
  }, [user, isSuccess, navigate, redirectTo])

  if (isPending) return <FullPageLoader />
  return (
    <>
      <ModeToggle className="absolute right-4 top-4 z-10" />

      <main className="flex-center absolute left-0 top-0 z-10 h-full w-full">
        <div className="flex w-full max-w-lg flex-col rounded-xl p-8 max-sm:max-w-[95%]">
          {children}
        </div>
      </main>
    </>
  )
}
