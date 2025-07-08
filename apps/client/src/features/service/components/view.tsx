import { useServices } from '@repo/api/paths/service/get-all'
import { useSiteConfig } from '@repo/api/paths/site-config/get'
import { Image } from '@repo/ui/components/image'
import { Loader } from '@repo/ui/components/loader'
import { cn } from '@repo/ui/lib/utils'

import { ServiceCard } from './service-card'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const ServiceView = ({ className, ...props }: Props) => {
  const { data: services, isPending: isServicesPending } = useServices()
  const { data: siteConfig, isPending: isSiteConfigPending } = useSiteConfig()

  if (isServicesPending || isSiteConfigPending) return <Loader />
  if (!services || !siteConfig) return
  return (
    <div className={cn('flex-col flex-center', className)} {...props}>
      <Image
        src={siteConfig.serviceImg?.url}
        widthList={[200, 200, 150, 200, 200]}
        alt="logo"
        containerClassName="z-10 mt-6 max-lg:mb-10 max-md:hidden lg:absolute"
        className="rounded-full"
      />
      <div className="mt-10 w-full flex-col gap-10 flex-center">
        <div className="flex w-full items-center justify-around max-md:flex-col max-md:gap-10 lg:justify-evenly">
          {services.slice(0, 2).map((v) => (
            <ServiceCard data={v} key={v.id} />
          ))}
        </div>
        <div className="flex w-full items-center justify-between gap-40 max-md:flex-col max-md:gap-10 lg:justify-around">
          {services.slice(2, 4).map((v) => (
            <ServiceCard data={v} key={v.id} />
          ))}
        </div>
        <div className="w-full flex-center">
          {services.slice(4, 5).map((v) => (
            <ServiceCard data={v} key={v.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
