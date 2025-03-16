import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import { useMenubarVehicles } from '@repo/api/paths/menubar/vehicle/get-all'
import { useVehicles } from '@repo/api/paths/vehicle/get-all'
import { Skeleton } from '@repo/ui/components/skeleton'
import { useEffect, useMemo } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ItemCounts } from '@/components/shared/item-counts'
import { VehicleCardSkeleton } from '@/features/vehicle/components/card.skeleton'
import { VehicleCreateForm } from '@/features/vehicle/components/create-form'
import { VehicleGroup } from '@/features/vehicle/components/group'
import { toast } from '@/lib/toast'

const VehiclesSkeleton = () => (
  <div className="flex gap-8">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="w-[20rem] shrink-0">
        <div className="mb-4 flex w-full items-center justify-between gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, j) => (
            <VehicleCardSkeleton key={j} />
          ))}
        </div>
      </div>
    ))}
  </div>
)

const VehiclesRoute = () => {
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
  const {
    data: vehicles,
    isPending: isVehiclesPending,
    isError: isVehiclesError,
  } = useVehicles()

  useEffect(() => {
    if (isMenubarTabsError) {
      toast.api.fetch('menubarTab').error()
    } else if (isMenubarVehiclesError) {
      toast.api.fetch('menubarVehicle').error()
    } else if (isVehiclesError) {
      toast.api.fetch('vehicle').error()
    }
  }, [isMenubarTabsError, isMenubarVehiclesError, isVehiclesError])

  const menubarVehiclesByMenubarTab = useMemo(() => {
    const map = new Map<string, typeof menubarVehicles>()
    if (menubarVehicles)
      for (const v of menubarVehicles) {
        if (!map.has(v.menubarTab)) map.set(v.menubarTab, [])
        map.get(v.menubarTab)?.push(v)
      }
    return map
  }, [menubarVehicles])

  const vehiclesByMenubarVehicles = useMemo(() => {
    const map = new Map<string, typeof vehicles>()
    if (vehicles)
      for (const v of vehicles) {
        if (!map.has(v.menubarVehicle)) map.set(v.menubarVehicle, [])
        map.get(v.menubarVehicle)?.push(v)
      }
    return map
  }, [vehicles])

  if (isMenubarTabsPending || isMenubarVehiclesPending || isVehiclesPending)
    return <VehiclesSkeleton />

  return (
    <>
      <div className="flex w-fit gap-8">
        {menubarTabs?.map((tab) => {
          const menubarVehicles = menubarVehiclesByMenubarTab.get(tab.id)
          if (!menubarVehicles?.length) return
          return menubarVehicles.map((mv) => {
            const vehicles = vehiclesByMenubarVehicles.get(mv.id)
            if (!vehicles?.length) return
            return (
              <VehicleGroup
                key={mv.id}
                tabTitle={tab.title}
                vehicleTitle={mv.title}
                vehicles={vehicles}
              />
            )
          })
        })}
      </div>
      <ButtonModelForm
        model="vehicle"
        modelText="Vehicle"
        type="ADD"
        itemsCount={vehicles?.length}
      >
        <VehicleCreateForm />
      </ButtonModelForm>
      <ItemCounts count={vehicles?.length} model="vehicle" />
    </>
  )
}

export default VehiclesRoute
