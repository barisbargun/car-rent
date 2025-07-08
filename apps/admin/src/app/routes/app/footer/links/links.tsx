import { useFooterLinks } from '@repo/api/paths/footer/link/get-all'
import { useFooterTitles } from '@repo/api/paths/footer/title/get-all'
import { useEffect, useMemo } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ItemCounts } from '@/components/shared/item-counts'
import { ModelVerticalListSkeleton } from '@/components/shared/model-vertical-list'
import { FooterLinkCardSkeleton } from '@/features/footer/link/components/card.skeleton'
import { FooterLinkCreateForm } from '@/features/footer/link/components/create-form'
import { FooterLinkGroup } from '@/features/footer/link/components/group'
import { toast } from '@/lib/toast'

const FooterLinksSkeleton = () => (
  <div className="flex gap-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <ModelVerticalListSkeleton key={i} Card={FooterLinkCardSkeleton} />
      ))}
    </div>
)

const FooterLinksRoute = () => {
  const {
    data: footerTitles,
    isPending: isFooterTitlesPending,
    isError: isFooterTitlesError,
  } = useFooterTitles()
  const {
    data: footerLinks,
    isPending: isFooterLinksPending,
    isError: isFooterLinksError,
  } = useFooterLinks()

  useEffect(() => {
    if (isFooterTitlesError) {
      toast.api.fetch('footerTitle').error()
    } else if (isFooterLinksError) {
      toast.api.fetch('footerLink').error()
    }
  }, [isFooterTitlesError, isFooterLinksError])

  const linksByTitle = useMemo(() => {
    const map = new Map<string, typeof footerLinks>()
    if (footerLinks)
      for (const v of footerLinks) {
        if (!map.has(v.footerTitle)) map.set(v.footerTitle, [])
        map.get(v.footerTitle)?.push(v)
      }
    return map
  }, [footerLinks])
  if (isFooterTitlesPending || isFooterLinksPending)
    return <FooterLinksSkeleton />
  return (
    <>
      <div className="flex w-fit gap-8">
        {footerTitles?.map((title) => {
          const links = linksByTitle.get(title.id)
          if (!links?.length) return
          return (
            <FooterLinkGroup
              key={title.id}
              tabTitle={title.title}
              data={links}
            />
          )
        })}
      </div>
      <ButtonModelForm
        model="footerLink"
        modelText="footer link"
        type="ADD"
        itemsCount={footerLinks?.length}
      >
        <FooterLinkCreateForm />
      </ButtonModelForm>
      <ItemCounts count={footerLinks?.length} model="footerLink" />
    </>
  )
}

export default FooterLinksRoute
