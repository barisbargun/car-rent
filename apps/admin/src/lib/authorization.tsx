import { RequiredRole } from '@repo/api/config/required-role'
import { useCurrentUser } from '@repo/api/paths/auth/current-user'

type AuthorizationProps = {
  checkRole: RequiredRole
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
