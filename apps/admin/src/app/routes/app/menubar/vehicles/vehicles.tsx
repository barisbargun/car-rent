import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import { useMenubarVehicles } from '@repo/api/paths/menubar/vehicle/get-all'
import { MenubarTab } from '@repo/api/types/menubar'
import { useEffect, useMemo, useState } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ItemCounts } from '@/components/shared/item-counts'
import { ModelVerticalListSkeleton } from '@/components/shared/model-vertical-list'
import { MenubarVehicleCardSkeleton } from '@/features/menubar/vehicle/components/card.skeleton'
import { MenubarVehicleCreateForm } from '@/features/menubar/vehicle/components/create-form'
import { MenubarVehicleGroup } from '@/features/menubar/vehicle/components/group'
import { toast } from '@/lib/toast'

const MenubarVehiclesSkeleton = () => (
  <div className="flex gap-8">
    {Array.from({ length: 5 }).map((_, i) => (
      <ModelVerticalListSkeleton key={i} Card={MenubarVehicleCardSkeleton} />
    ))}
  </div>
)

const MenubarVehiclesRoute = () => {
  const {
    data: menubarTabs,
    isPending: isMenubarTabsPending,
    isError: isMenubarTabsError,
  } = useMenubarTabs()
  const {
    data: menubarVehicles,
    isPending: isMenubarVehiclesPending,
    isError: isMenubarVehiclesError,
  } = useMenubarVehicles()

  const [currentData, setCurrentData] = useState<MenubarTab[]>([])

  useEffect(() => {
    if (isMenubarTabsError) {
      toast.api.fetch('menubarTab').error()
    } else if (isMenubarVehiclesError) {
      toast.api.fetch('menubarVehicle').error()
    }
  }, [isMenubarTabsError, isMenubarVehiclesError])

  useEffect(() => {
    setCurrentData(menubarTabs || [])
  }, [menubarTabs])

  const vehiclesByTab = useMemo(() => {
    const map = new Map<string, typeof menubarVehicles>()
    if (menubarVehicles)
      for (const v of menubarVehicles) {
        if (!map.has(v.menubarTab)) map.set(v.menubarTab, [])
        map.get(v.menubarTab)?.push(v)
      }
    return map
  }, [menubarVehicles])

  if (isMenubarTabsPending || isMenubarVehiclesPending)
    return <MenubarVehiclesSkeleton />
  return (
    <>
      <div className="flex w-fit gap-8">
        {currentData?.map((tab) => {
          const vehicles = vehiclesByTab.get(tab.id)
          if (!vehicles?.length) return
          return (
            <MenubarVehicleGroup
              key={tab.id}
              tabTitle={tab.title}
              data={vehicles}
            />
          )
        })}
      </div>
      <ButtonModelForm
        model="menubarVehicle"
        modelText="menubar vehicle"
        type="ADD"
        itemsCount={menubarVehicles?.length}
      >
        <MenubarVehicleCreateForm />
      </ButtonModelForm>
      <ItemCounts count={menubarVehicles?.length} model="menubarVehicle" />
    </>
  )
}

export default MenubarVehiclesRoute
