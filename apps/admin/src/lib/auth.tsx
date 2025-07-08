import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import { ROLE_LIST } from '@repo/api/paths/user/common'
import { FullPageLoader } from '@repo/ui/components/loader'
import { Navigate, useLocation } from 'react-router'

import { paths } from '@/config/paths'

export const ProtectedAuthRoute = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: user, isPending, isError } = useCurrentUser()
  const location = useLocation()
  if (isPending) return <FullPageLoader />

  if (!user?.id || isError) {
    return <Navigate replace to={paths.auth.login.getHref(location.pathname)} />
  }

  return children
}

type ProtectedComponentRouteProps = {
  checkRole: (userRole: ROLE_LIST) => boolean
  route: () =>
    | React.LazyExoticComponent<React.ComponentType>
    | React.ComponentType
}

export const ProtectedComponentRoute = ({
  checkRole,
  route,
}: ProtectedComponentRouteProps) => {
  const { data: user, isPending } = useCurrentUser()
  if (isPending) return <FullPageLoader />

  if (!user || !checkRole(user.role))
    return <Navigate replace to={paths.app.root.getHref()} />

  const LazyComponent = route()

  return <LazyComponent />
}
