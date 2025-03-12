import { useService } from '@repo/api/service/get'
import { cn } from '@repo/ui/lib/utils'
import { useMemo } from 'react'

import { useDataContext } from '@/lib/context'

import { ServiceCard } from './service-card'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const ServiceView = ({ className, ...props }: Props) => {
  const { data } = useService({})
  const { siteConfig } = useDataContext()
  const getData = useMemo(
    () => data?.slice().sort((a, b) => a.index - b.index),
    [data],
  )

  const getLogo = useMemo(() => {
    const url = siteConfig?.serviceImg?.url
    if (url) {
      const urlSplit = url.split('/image/upload/')
      return `${urlSplit[0]}/image/upload/w_400,h_400,c_lfill/${urlSplit[1]}`
    }
  }, [siteConfig])

  if (!data) return
  return (
    <div className={cn('flex-col flex-center', className)} {...props}>
      <img
        src={getLogo || ''}
        className="z-10 mt-6 max-lg:mb-10 max-md:hidden lg:absolute"
      />
      <div className="mt-10 w-full flex-col gap-10 flex-center">
        <div className="flex w-full items-center justify-around max-md:flex-col max-md:gap-10 xl:justify-evenly">
          {getData?.slice(0, 2).map((v) => <ServiceCard data={v} key={v.id} />)}
        </div>
        <div className="flex w-full items-center justify-between gap-40 max-md:flex-col max-md:gap-10 xl:justify-around">
          {getData?.slice(2, 4).map((v) => <ServiceCard data={v} key={v.id} />)}
        </div>
        <div className="w-full flex-center">
          {getData?.slice(4, 5).map((v) => <ServiceCard data={v} key={v.id} />)}
        </div>
      </div>
    </div>
  )
}
