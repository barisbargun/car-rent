import { Skeleton } from '@repo/ui/components/skeleton'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ItemCounts } from '@/components/shared/item-counts'
import { VehicleCardSkeleton } from '@/features/vehicle/components/card.skeleton'
import { VehicleCreateForm } from '@/features/vehicle/components/create-form'
import { VehicleGroup } from '@/features/vehicle/components/group'
import {
  useVehicleContext,
  VehicleProvider,
} from '@/features/vehicle/lib/context'

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

const Vehicles = () => {
  const {
    menubarTabs,
    vehicles,
    menubarVehiclesByMenubarTab,
    vehiclesByMenubarVehicles,
  } = useVehicleContext()

  console.log(vehicles?.map((v) => v.id))

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

const VehiclesRoute = () => (
  <VehicleProvider Skeleton={VehiclesSkeleton}>
    <Vehicles />
  </VehicleProvider>
)

export default VehiclesRoute
