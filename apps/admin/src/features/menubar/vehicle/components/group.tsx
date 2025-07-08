import { arrayMove } from '@dnd-kit/sortable'
import { MenubarVehicleGet } from '@repo/api/paths/menubar/vehicle/common'
import { useSwapMenubarVehicle } from '@repo/api/paths/menubar/vehicle/swap'
import { useEffect, useState } from 'react'

import { ModelVerticalList } from '@/components/shared/model-vertical-list'
import { toast } from '@/lib/toast'

import { MenubarVehicleCard } from './card'

type Props = {
  tabTitle: string
  data: MenubarVehicleGet[]
}

export const MenubarVehicleGroup = ({ tabTitle, data }: Props) => {
  const [items, setItems] = useState<MenubarVehicleGet[]>([])

  const { mutateAsync: mutateSwap, isPending: pendingSwap } =
    useSwapMenubarVehicle()

  const [isAnyChange, setIsAnyChange] = useState<boolean>(false)

  useEffect(() => {
    setItems(data)
    setIsAnyChange(false)
  }, [data])

  const handlePatch = async () => {
    try {
      const idList = items?.map((item) => item.id)
      if (idList) {
        await mutateSwap({
          data: { idList },
        })
        setIsAnyChange(false)
        toast.menubarVehicle.swap.success()
      }
    } catch {
      toast.menubarVehicle.swap.error()
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
      items={items}
      isAnyChange={isAnyChange}
      pendingSwap={pendingSwap}
      handlePatch={handlePatch}
      handleDragEnd={handleDragEnd}
      cardComponent={MenubarVehicleCard}
    />
  )
}
