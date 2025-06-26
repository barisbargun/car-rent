import { queryClient } from '@repo/api/config/react-query'
import { useAuthLogout } from '@repo/api/paths/auth/logout'
import { Button } from '@repo/ui/components/button'
import { HandleAlert } from '@repo/ui/components/handle-alert'
import { Loader } from '@repo/ui/components/loader'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'

import { paths } from '@/config/paths'
import { toast } from '@/lib/toast'

export const ButtonAlertLogout = () => {
  const { mutateAsync, isSuccess, isPending } = useAuthLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await mutateAsync()
      queryClient.removeQueries()
      navigate(paths.auth.login.path)
      toast.user.logout.success()
    } catch {
      toast.user.logout.error()
    }
  }

  return (
    <HandleAlert trigger={handleLogout} isPending={isPending}>
      <Button disabled={isPending || isSuccess} variant="outline" size="icon">
        {isPending ? <Loader /> : <LogOut className="size-4" />}
        <span className="sr-only">logout</span>
      </Button>
    </HandleAlert>
  )
}
