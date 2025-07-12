import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'
import React, { useMemo } from 'react'

import { useAppContext } from '@/lib/context'

import { FooterGroup } from './footer-group'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const FooterView = ({ className, ...props }: Props) => {
  const { siteConfig, footerTitles, footerLinks } = useAppContext()

  const linksByTitles = useMemo(() => {
    const map = new Map<string, typeof footerLinks>()
    if (footerLinks)
      for (const v of footerLinks) {
        if (!map.has(v.footerTitle)) map.set(v.footerTitle, [])
        map.get(v.footerTitle)?.push(v)
      }
    return map
  }, [footerLinks])

  if (!footerTitles?.length || !footerLinks?.length) return
  return (
    <div
      className={cn(
        'flex justify-between gap-20 max-lg:flex-col-reverse',
        className,
      )}
      {...props}
    >
      <div className="flex h-fit items-center justify-center gap-4 max-lg:w-fit lg:w-[28rem]">
        <Image src={siteConfig?.logoImg?.url} w={80} alt="logo" />
        <strong className="line-clamp-[8] flex-1 text-sm font-normal opacity-60">
          {siteConfig?.desc}
        </strong>
      </div>
      <div className="flex justify-between max-xl:flex-1 max-lg:text-center max-sm:flex-col max-sm:gap-10 xl:w-[50%]">
        {footerTitles.map((tab) => {
          const links = linksByTitles.get(tab.id)
          if (!links?.length) return
          return <FooterGroup key={tab.id} title={tab.title} data={links} />
        })}
      </div>
    </div>
  )
}
