import { CarouselGet } from '@repo/api/paths/carousel/common'
import { useCarousels } from '@repo/api/paths/carousel/get-all'
import { useSwapCarousel } from '@repo/api/paths/carousel/swap'
import { Skeleton } from '@repo/ui/components/skeleton'
import { cn } from '@repo/ui/lib/utils'
import { useEffect, useState } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwapComplete } from '@/components/shared/buttons/model-swap-complete'
import { ItemCounts } from '@/components/shared/item-counts'
import { CarouselCard } from '@/features/carousel/components/card'
import { CarouselCardSkeleton } from '@/features/carousel/components/card.skeleton'
import { CarouselCreateForm } from '@/features/carousel/components/create-form'
import { toast } from '@/lib/toast'

const CarouselsSkeleton = () => (
  <>
    <div className="items-gap flex w-full justify-start">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="items-gap grid lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CarouselCardSkeleton key={i} />
      ))}
    </div>
  </>
)

const CarouselsRoute = () => {
  const { mutateAsync: mutateSwap, isPending: pendingSwap } = useSwapCarousel()
  const { data: carousels, isPending, isError } = useCarousels()
  const [swapId, setSwapId] = useState<string | undefined>()
  const [isAnyChange, setIsAnyChange] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<CarouselGet[]>([])

  useEffect(() => {
    if (isError) {
      toast.api.fetch('carousel').error()
    }
  }, [isError])

  useEffect(() => {
    setCurrentData(carousels || [])
  }, [carousels])

  const handleSwap = (id: string) => {
    if (swapId == undefined) setSwapId(id)
    else {
      setIsAnyChange(true)
      setCurrentData((carousels) => {
        if (!carousels) return []
        const newCarousels = [...carousels]
        const index = newCarousels.findIndex((carousel) => carousel.id === id)
        const swapIndex = newCarousels.findIndex(
          (carousel) => carousel.id === swapId,
        )
        if (index !== -1 && swapIndex !== -1) {
          const temp = newCarousels[index]
          newCarousels[index] = newCarousels[swapIndex]
          newCarousels[swapIndex] = temp
        }
        return newCarousels
      })
      setSwapId(undefined)
    }
  }

  const handleSwapReset = () => {
    setSwapId(undefined)
    setIsAnyChange(false)
    setCurrentData(carousels || [])
  }

  const handlePatch = async () => {
    try {
      const idList = currentData.map((carousel) => carousel.id)
      if (idList) {
        await mutateSwap({
          data: {
            idList,
          },
        })
        setIsAnyChange(false)
        toast.carousel.swap.success()
      }
    } catch {
      toast.carousel.swap.error()
    }
  }

  if (isPending) return <CarouselsSkeleton />
  return (
    <>
      <ButtonModelSwapComplete
        model="carousel"
        swapId={swapId}
        isAnyChange={isAnyChange}
        pendingSwap={pendingSwap}
        handlePatch={handlePatch}
        handleSwapReset={handleSwapReset}
      />

      <div className="items-gap grid lg:grid-cols-3 xl:grid-cols-4">
        {currentData?.map((carousel) => (
          <CarouselCard
            className={cn(pendingSwap && 'pointer-events-none')}
            key={carousel.id}
            data={carousel}
            handleSwap={handleSwap}
            swapId={swapId}
          />
        ))}
      </div>
      <ButtonModelForm
        model="carousel"
        modelText="carousel"
        type="ADD"
        itemsCount={carousels?.length}
      >
        <CarouselCreateForm />
      </ButtonModelForm>
      <ItemCounts count={carousels?.length} model="carousel" />
    </>
  )
}

export default CarouselsRoute
