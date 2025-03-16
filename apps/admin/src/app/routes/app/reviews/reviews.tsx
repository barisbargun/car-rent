import { useReviews } from '@repo/api/paths/review/get-all'
import { useSwapReview } from '@repo/api/paths/review/swap'
import { ReviewGet } from '@repo/api/types/review'
import { Skeleton } from '@repo/ui/components/skeleton'
import { cn } from '@repo/ui/lib/utils'
import { useEffect, useState } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwapComplete } from '@/components/shared/buttons/model-swap-complete'
import { ItemCounts } from '@/components/shared/item-counts'
import { ReviewCard } from '@/features/review/components/card'
import { ReviewCardSkeleton } from '@/features/review/components/card.skeleton'
import { ReviewCreateForm } from '@/features/review/components/create-form'
import { toast } from '@/lib/toast'

const ReviewsSkeleton = () => (
  <>
    <div className="flex w-full justify-start items-gap">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="grid w-full grid-cols-2 gap-4 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ReviewCardSkeleton key={i} />
      ))}
    </div>
  </>
)

const ReviewsRoute = () => {
  const { mutateAsync: mutateSwap, isPending: pendingSwap } = useSwapReview()
  const { data: reviews, isPending, isError } = useReviews()
  const [swapId, setSwapId] = useState<string | undefined>()
  const [isAnyChange, setIsAnyChange] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<ReviewGet[]>([])

  useEffect(() => {
    if (isError) {
      toast.api.fetch('review').error()
    }
  }, [isError])

  useEffect(() => {
    setCurrentData(reviews || [])
  }, [reviews])

  const handleSwap = (id: string) => {
    if (swapId == undefined) setSwapId(id)
    else {
      setIsAnyChange(true)
      setCurrentData((reviews) => {
        if (!reviews) return []
        const newReviews = [...reviews]
        const index = newReviews.findIndex((review) => review.id === id)
        const swapIndex = newReviews.findIndex((review) => review.id === swapId)
        if (index !== -1 && swapIndex !== -1) {
          const temp = newReviews[index]
          newReviews[index] = newReviews[swapIndex]
          newReviews[swapIndex] = temp
        }
        return newReviews
      })
      setSwapId(undefined)
    }
  }

  const handleSwapReset = () => {
    setSwapId(undefined)
    setIsAnyChange(false)
    setCurrentData(reviews || [])
  }

  const handlePatch = async () => {
    try {
      const idList = currentData.map((review) => review.id)
      if (idList) {
        await mutateSwap({
          data: { idList },
        })
        setIsAnyChange(false)
        toast.review.swap.success()
      }
    } catch {
      toast.review.swap.error()
    }
  }

  if (isPending) return <ReviewsSkeleton />
  return (
    <>
      <ButtonModelSwapComplete
        model="review"
        swapId={swapId}
        isAnyChange={isAnyChange}
        pendingSwap={pendingSwap}
        handlePatch={handlePatch}
        handleSwapReset={handleSwapReset}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {currentData?.map((review) => (
          <ReviewCard
            className={cn(pendingSwap && 'pointer-events-none')}
            key={review.id}
            data={review}
            handleSwap={handleSwap}
            swapId={swapId}
          />
        ))}
      </div>

      <ButtonModelForm model="review" modelText="Review" type="ADD" itemsCount={reviews?.length}>
        <ReviewCreateForm />
      </ButtonModelForm>
      <ItemCounts count={reviews?.length} model="review" />
    </>
  )
}

export default ReviewsRoute
