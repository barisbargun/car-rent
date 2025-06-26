import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { FullPageLoader } from '@repo/ui/components/loader'
import { useEffect } from 'react'

import { UserProfileUpdateForm } from '@/features/profile/components/update-form'
import { toast } from '@/lib/toast'

const SiteConfigsRoute = () => {
  const { data: user, isPending, isError } = useCurrentUser()

  useEffect(() => {
    if (isError) {
      toast.api.fetch('user').error()
    }
  }, [isError])

  if (isPending) return <FullPageLoader />

  return (
    <Card className="xl:absolute xl:left-1/2 xl:-translate-x-1/2 mx-auto w-full max-w-lg lg:w-fit">
      <CardHeader>
        <CardTitle>Edit your profile</CardTitle>
        <CardDescription>Edit your amazing profile!</CardDescription>
      </CardHeader>
      <CardContent className="!pt-0">
        <UserProfileUpdateForm user={user as any} />
      </CardContent>
    </Card>
  )
}

export default SiteConfigsRoute
