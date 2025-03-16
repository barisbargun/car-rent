import { useSiteConfig } from '@repo/api/paths/site-config/get'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { FullPageLoader } from '@repo/ui/components/loader'
import { useEffect } from 'react'

import { SiteConfigUpdateForm } from '@/features/site-config/components/update-form'
import { toast } from '@/lib/toast'

const SiteConfigsRoute = () => {
  const { data: siteConfig, isPending, isError } = useSiteConfig()

  useEffect(() => {
    if (isError) {
      toast.api.fetch('siteConfig').error()
    }
  }, [isError])

  if (isPending) return <FullPageLoader />

  return (
    <Card className='w-full max-w-lg lg:max-w-3xl mx-auto'>
      <CardHeader>
        <CardTitle>Site Config</CardTitle>
        <CardDescription>
          Update your site configuration settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SiteConfigUpdateForm siteConfig={siteConfig} />
      </CardContent>
    </Card>
  )
}

export default SiteConfigsRoute
