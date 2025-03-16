import { useSiteConfig } from '@repo/api/paths/site-config/get'
import { Skeleton } from '@repo/ui/components/skeleton'
import { Link, Outlet } from 'react-router'

import { paths } from '@/config/paths'
import { useBreakpoint } from '@/hooks/use-breakpoint'

import { Navbar } from '../global/navbar'
import { Topbar } from '../global/topbar'

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>
}

export const RootLayout = () => {
  const { data: siteConfig, isPending: isSiteConfigPending } = useSiteConfig()
  const breakpoint = useBreakpoint()

  const Logo = () => {
    if (isSiteConfigPending) return <Skeleton className="h-10 w-28" />
    return (
      <Link
        className="max-lg:center-x-absolute h-8 font-pacifico text-4xl tracking-[1px] text-gray-700 dark:text-gray-50"
        to={paths.app.dashboard.getHref()}
      >
        {siteConfig?.title || 'Site'}
      </Link>
    )
  }

  // Desktop
  if (breakpoint > 2)
    return (
      <>
        {/* Logo name and navbar */}
        <div className="page-t-p page-b-p page-l-p page-between-r-p page-t-gap flex max-h-screen items-center justify-center max-lg:flex-row-reverse lg:flex-col">
          <Logo />
          <Navbar />
        </div>

        {/* Topbar and view */}
        <div className="page-t-p page-b-p page-r-p page-t-gap z-10 flex flex-1 flex-col overflow-hidden">
          <div className="ml-auto h-8">
            <Topbar />
          </div>
          <main className="custom-scrollbar page-b-p flex flex-col gap-6 overflow-x-auto">
            <Outlet />
          </main>
        </div>
      </>
    )

  // Mobile
  return (
    <>
      {/* Logo name and navbar */}
      <div className="page-t-p page-b-p page-l-p page-r-p relative z-10 flex max-h-screen items-center justify-between">
        <Navbar className="w-fit" />
        <Logo />
        <Topbar />
      </div>

      {/* Topbar and view */}
      <main className="page-t-p page-l-p page-r-p page-b-p custom-scrollbar z-10 flex flex-col gap-6 overflow-x-auto">
        <Outlet />
      </main>
      <span className="mt-20 block" />
    </>
  )
}
