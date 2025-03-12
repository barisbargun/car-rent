import { useFooter } from '@repo/api/footer/get'
import { cn } from '@repo/ui/lib/utils'
import React, { useMemo } from 'react'

import { FooterTab } from '@/features/footer/components/footer-tab'
import { useDataContext } from '@/lib/context'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const FooterView = ({ className, ...props }: Props) => {
  const { data } = useFooter({})
  const { siteConfig } = useDataContext()

  const getLogo = useMemo(() => {
    const url = siteConfig?.serviceImg?.url
    if (url) {
      const urlSplit = url.split('/image/upload/')
      return `${urlSplit[0]}/image/upload/w_90,h_90,c_lfill/${urlSplit[1]}`
    }
  }, [siteConfig])

  if (!data) return
  return (
    <div
      className={cn(
        'flex justify-between gap-20 max-lg:flex-col max-sm:flex-col-reverse',
        className,
      )}
      {...props}
    >
      <div className="flex h-fit w-[400px] items-center justify-center gap-4 max-xl:w-fit">
        {getLogo && (
          <img
            src={getLogo || ''}
            alt="logo"
            width={90}
            height={90}
            className="rounded-md"
          />
        )}
        <p className="line-clamp-[8] text-xs opacity-60 max-xl:hidden max-lg:block">
          {siteConfig?.desc}
        </p>
      </div>
      <div className="flex w-[50%] justify-between max-xl:flex-1 max-lg:w-full max-md:text-center max-sm:flex-col max-sm:gap-10">
        {[...data]
          .sort((a, b) => a.index - b.index)
          .map((v) => (
            <FooterTab key={v.id} data={v} />
          ))}
      </div>
    </div>
  )
}
