import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import { ROLE_LIST } from '@repo/api/types/user'

export type AuthorizationProps = {
  checkRole: (userRole: ROLE_LIST) => boolean
  forbiddenFallback?: React.ReactNode
  children: React.ReactNode
}

export const Authorization = ({
  checkRole,
  forbiddenFallback,
  children,
}: AuthorizationProps) => {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) return <span className="sr-only">loading</span>

  if (!user  || !checkRole || !checkRole(user.role)) return forbiddenFallback

  return children
}
