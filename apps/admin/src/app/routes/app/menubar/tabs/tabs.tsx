import { MenubarTab } from '@repo/api/paths/menubar/tab/common'
import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import { useSwapMenubarTab } from '@repo/api/paths/menubar/tab/swap'
import { Skeleton } from '@repo/ui/components/skeleton'
import { cn } from '@repo/ui/lib/utils'
import { useEffect, useState } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwapComplete } from '@/components/shared/buttons/model-swap-complete'
import { ItemCounts } from '@/components/shared/item-counts'
import { MenubarTabCard } from '@/features/menubar/tab/components/card'
import { MenubarTabCardSkeleton } from '@/features/menubar/tab/components/card.skeleton'
import { MenubarTabCreateForm } from '@/features/menubar/tab/components/create-form'
import { toast } from '@/lib/toast'

const MenubarTabsSkeleton = () => (
  <>
    <div className="flex w-full justify-start items-gap">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <MenubarTabCardSkeleton key={i} />
      ))}
    </div>
  </>
)

const MenubarTabsRoute = () => {
  const { mutateAsync: mutateSwap, isPending: pendingSwap } =
    useSwapMenubarTab()
  const { data: menubarTabs, isPending, isError } = useMenubarTabs()
  const [swapId, setSwapId] = useState<string | undefined>()
  const [isAnyChange, setIsAnyChange] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<MenubarTab[]>([])

  useEffect(() => {
    if (isError) {
      toast.api.fetch('menubarTab').error()
    }
  }, [isError])

  useEffect(() => {
    setCurrentData(menubarTabs || [])
  }, [menubarTabs])

  const handleSwap = (id: string) => {
    if (swapId == undefined) setSwapId(id)
    else {
      setIsAnyChange(true)
      setCurrentData((menubarTabs) => {
        if (!menubarTabs) return []
        const newMenubarTabs = [...menubarTabs]
        const index = newMenubarTabs.findIndex(
          (menubarTab) => menubarTab.id === id,
        )
        const swapIndex = newMenubarTabs.findIndex(
          (menubarTab) => menubarTab.id === swapId,
        )
        if (index !== -1 && swapIndex !== -1) {
          const temp = newMenubarTabs[index]
          newMenubarTabs[index] = newMenubarTabs[swapIndex]
          newMenubarTabs[swapIndex] = temp
        }
        return newMenubarTabs
      })
      setSwapId(undefined)
    }
  }

  const handleSwapReset = () => {
    setSwapId(undefined)
    setIsAnyChange(false)
    setCurrentData(menubarTabs || [])
  }

  const handlePatch = async () => {
    try {
      const idList = currentData.map((menubarTab) => menubarTab.id)
      if (idList) {
        await mutateSwap({
          data: { idList },
        })
        setIsAnyChange(false)
        toast.menubarTab.swap.success()
      }
    } catch {
      toast.menubarTab.swap.error()
    }
  }

  if (isPending) return <MenubarTabsSkeleton />
  return (
    <>
      <ButtonModelSwapComplete
        model="menubarTab"
        swapId={swapId}
        handlePatch={handlePatch}
        handleSwapReset={handleSwapReset}
        pendingSwap={pendingSwap}
        isAnyChange={isAnyChange}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentData?.map((menubarTab) => (
          <MenubarTabCard
            className={cn(pendingSwap && 'pointer-events-none')}
            key={menubarTab.id}
            data={menubarTab}
            handleSwap={handleSwap}
            swapId={swapId}
          />
        ))}
      </div>
      <ButtonModelForm
        type="ADD"
        model="menubarTab"
        modelText="menubar tab"
        itemsCount={menubarTabs?.length}
      >
        <MenubarTabCreateForm />
      </ButtonModelForm>
      <ItemCounts count={menubarTabs?.length} model="menubarTab" />
    </>
  )
}

export default MenubarTabsRoute
