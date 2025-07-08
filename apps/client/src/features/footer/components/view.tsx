import { useFooterLinks } from '@repo/api/paths/footer/link/get-all'
import { useFooterTitles } from '@repo/api/paths/footer/title/get-all'
import { useSiteConfig } from '@repo/api/paths/site-config/get'
import { Image } from '@repo/ui/components/image'
import { Loader } from '@repo/ui/components/loader'
import { cn } from '@repo/ui/lib/utils'
import React, { useMemo } from 'react'

import { FooterGroup } from './footer-group'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const FooterView = ({ className, ...props }: Props) => {
  const { data: footerTitles, isPending: isFooterTitlesPending } =
    useFooterTitles()
  const { data: footerLinks, isPending: isFooterLinksPending } =
    useFooterLinks()
  const { data: siteConfig, isPending: isSiteConfigPending } = useSiteConfig()

  const linksByTitles = useMemo(() => {
    const map = new Map<string, typeof footerLinks>()
    if (footerLinks)
      for (const v of footerLinks) {
        if (!map.has(v.footerTitle)) map.set(v.footerTitle, [])
        map.get(v.footerTitle)?.push(v)
      }
    return map
  }, [footerLinks])

  if (isFooterTitlesPending || isFooterLinksPending || isSiteConfigPending)
    return <Loader />
  if (!footerTitles || !footerLinks) return
  return (
    <div
      className={cn(
        'flex justify-between gap-20 max-lg:flex-col max-sm:flex-col-reverse',
        className,
      )}
      {...props}
    >
      <div className="flex h-fit items-center justify-center gap-4 max-lg:w-fit lg:w-[28rem]">
        <Image src={siteConfig?.logoImg?.url} w={80} alt="logo" />
        <p className="line-clamp-[8] flex-1 text-xs opacity-60 max-lg:hidden max-sm:block">
          {siteConfig?.desc}
        </p>
      </div>
      <div className="flex justify-between max-xl:flex-1 max-md:text-center max-sm:flex-col max-sm:gap-10 xl:w-[50%]">
        {footerTitles?.map((tab) => {
          const links = linksByTitles.get(tab.id)
          if (!links?.length) return
          return <FooterGroup key={tab.id} title={tab.title} data={links} />
        })}
      </div>
    </div>
  )
}
