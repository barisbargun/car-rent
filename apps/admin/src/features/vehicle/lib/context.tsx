import { MenubarTab } from '@repo/api/paths/menubar/tab/common'
import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import { MenubarVehicleGet } from '@repo/api/paths/menubar/vehicle/common'
import { useMenubarVehicles } from '@repo/api/paths/menubar/vehicle/get-all'
import { VehicleGet } from '@repo/api/paths/vehicle/common'
import { useVehicles } from '@repo/api/paths/vehicle/get-all'
import { createContext, ReactNode, useContext, useMemo } from 'react'

type Props = {
  menubarTabs: MenubarTab[]
  menubarVehicles: MenubarVehicleGet[]
  vehicles: VehicleGet[] | undefined
  menubarVehiclesByMenubarTab: Map<string, MenubarVehicleGet[] | undefined>
  vehiclesByMenubarVehicles: Map<string, VehicleGet[] | undefined>
}

const Context = createContext<Props>(undefined!)

export const VehicleProvider = ({
  children,
  Skeleton,
}: {
  children: ReactNode
  Skeleton: React.ComponentType
}) => {
  const { data: menubarTabs, isPending: isMenubarTabsPending } =
    useMenubarTabs()
  const { data: menubarVehicles, isPending: isMenubarVehiclesPending } =
    useMenubarVehicles()
  const { data: vehicles, isPending: isVehiclesPending } = useVehicles()

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
    return <Skeleton />
  if (!menubarVehicles?.length || !menubarTabs?.length) {
    return (
      <div className="flex-center h-full">
        <p className="text-muted-foreground">First create menubar vehicles.</p>
      </div>
    )
  }

  const value = {
    menubarTabs,
    menubarVehicles,
    vehicles,
    menubarVehiclesByMenubarTab,
    vehiclesByMenubarVehicles,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useVehicleContext = () => useContext(Context)
