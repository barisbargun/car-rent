import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import { useAppContext } from '@/lib/context'

import { ServiceCard } from './service-card'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const ServiceView = ({ className, ...props }: Props) => {
  const { siteConfig, services } = useAppContext()

  if (!services?.length) return
  return (
    <div className={cn('flex-center flex-col', className)} {...props}>
      <Image
        src={siteConfig?.serviceImg?.url}
        sizes={[200, 200, 150, 200, 200]}
        alt="logo"
        containerClassName="z-10 mt-6 max-lg:mb-10 max-md:hidden lg:absolute"
        className="rounded-full"
      />
      <div className="flex-center mt-10 w-full flex-col gap-10">
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
        <div className="flex-center w-full">
          {services.slice(4, 5).map((v) => (
            <ServiceCard data={v} key={v.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
