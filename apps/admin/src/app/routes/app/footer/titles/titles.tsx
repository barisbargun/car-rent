import { useFooterTitles } from '@repo/api/paths/footer/title/get-all'
import { useSwapFooterTitle } from '@repo/api/paths/footer/title/swap'
import { FooterTitle } from '@repo/api/types/footer'
import { cn } from '@repo/ui/lib/utils'
import { useEffect, useState } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwapComplete } from '@/components/shared/buttons/model-swap-complete'
import { ItemCounts } from '@/components/shared/item-counts'
import { ModelVerticalListSkeleton } from '@/components/shared/model-vertical-list'
import { FooterTitleCard } from '@/features/footer/title/components/card'
import { FooterTitleCardSkeleton } from '@/features/footer/title/components/card.skeleton'
import { FooterTitleCreateForm } from '@/features/footer/title/components/create-form'
import { toast } from '@/lib/toast'

const FooterTitlesSkeleton = () => (
  <div className="flex gap-8">
    {Array.from({ length: 5 }).map((_, i) => (
      <ModelVerticalListSkeleton key={i} Card={FooterTitleCardSkeleton} />
    ))}
  </div>
)

const FooterTitlesRoute = () => {
  const { mutateAsync: mutateSwap, isPending: pendingSwap } =
    useSwapFooterTitle()
  const { data: footerTitles, isPending, isError } = useFooterTitles()
  const [swapId, setSwapId] = useState<string | undefined>()
  const [isAnyChange, setIsAnyChange] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<FooterTitle[]>([])

  useEffect(() => {
    if (isError) {
      toast.api.fetch('footerTitle').error()
    }
  }, [isError])

  useEffect(() => {
    setCurrentData(footerTitles || [])
  }, [footerTitles])

  const handleSwap = (id: string) => {
    if (swapId == undefined) setSwapId(id)
    else {
      setIsAnyChange(true)
      setCurrentData((footerTitles) => {
        if (!footerTitles) return []
        const newFooterTitles = [...footerTitles]
        const index = newFooterTitles.findIndex(
          (footerTitle) => footerTitle.id === id,
        )
        const swapIndex = newFooterTitles.findIndex(
          (footerTitle) => footerTitle.id === swapId,
        )
        if (index !== -1 && swapIndex !== -1) {
          const temp = newFooterTitles[index]
          newFooterTitles[index] = newFooterTitles[swapIndex]
          newFooterTitles[swapIndex] = temp
        }
        return newFooterTitles
      })
      setSwapId(undefined)
    }
  }

  const handleSwapReset = () => {
    setSwapId(undefined)
    setIsAnyChange(false)
    setCurrentData(footerTitles || [])
  }

  const handlePatch = async () => {
    try {
      const idList = currentData.map((footerTitle) => footerTitle.id)
      if (idList) {
        await mutateSwap({
          data: { idList },
        })
        setIsAnyChange(false)
        toast.footerTitle.swap.success()
      }
    } catch {
      toast.footerTitle.swap.error()
    }
  }

  if (isPending) return <FooterTitlesSkeleton />
  return (
    <>
      <ButtonModelSwapComplete
        model="footerTitle"
        swapId={swapId}
        isAnyChange={isAnyChange}
        pendingSwap={pendingSwap}
        handlePatch={handlePatch}
        handleSwapReset={handleSwapReset}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentData?.map((footerTitle) => (
          <FooterTitleCard
            className={cn(pendingSwap && 'pointer-events-none')}
            key={footerTitle.id}
            data={footerTitle}
            handleSwap={handleSwap}
            swapId={swapId}
          />
        ))}
      </div>
      <ButtonModelForm
        model="footerTitle"
        modelText="Footer Title"
        type="ADD"
        itemsCount={footerTitles?.length}
      >
        <FooterTitleCreateForm />
      </ButtonModelForm>
      <ItemCounts count={footerTitles?.length} model="footerTitle" />
    </>
  )
}

export default FooterTitlesRoute
