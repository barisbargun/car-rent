import { arrayMove } from '@dnd-kit/sortable'
import { useSwapVehicle } from '@repo/api/paths/vehicle/swap'
import {  VehicleGet } from '@repo/api/paths/vehicle/common'
import { useEffect, useState } from 'react'

import { ModelVerticalList } from '@/components/shared/model-vertical-list'
import { toast } from '@/lib/toast'

import { VehicleCard } from './card'

type Props = {
  tabTitle: string
  vehicleTitle: string
  vehicles: VehicleGet[]
}

export const VehicleGroup = ({ tabTitle, vehicleTitle, vehicles }: Props) => {
  const [items, setItems] = useState<VehicleGet[]>([])
  const { mutateAsync: mutateSwap, isPending: pendingSwap } = useSwapVehicle()
  const [isAnyChange, setIsAnyChange] = useState<boolean>(false)

  useEffect(() => {
    setItems(vehicles)
    setIsAnyChange(false)
  }, [vehicles])

  const handlePatch = async () => {
    try {
      const idList = items?.map((item) => item.id)
      if (idList) {
        await mutateSwap({
          data: {idList},
        })
        setIsAnyChange(false)
        toast.vehicle.swap.success()
      }
    } catch {
      toast.vehicle.swap.error()
    }
  }

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      setItems(arrayMove(items, oldIndex, newIndex))
      setIsAnyChange(true)
    }
  }

  return (
    <ModelVerticalList
      tabTitle={tabTitle}
      tabSecondTitle={vehicleTitle}
      items={items}
      isAnyChange={isAnyChange}
      pendingSwap={pendingSwap}
      handlePatch={handlePatch}
      handleDragEnd={handleDragEnd}
      cardComponent={VehicleCard}
    />
  )
}
