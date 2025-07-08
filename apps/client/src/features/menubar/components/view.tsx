import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import { useMenubarVehicles } from '@repo/api/paths/menubar/vehicle/get-all'
import { useVehicles } from '@repo/api/paths/vehicle/get-all'
import { Loader } from '@repo/ui/components/loader'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@repo/ui/components/navigation-menu'
import { cn } from '@repo/ui/lib/utils'
import React, { useMemo, useState } from 'react'

import { Menubar } from './menubar'
import { Paginator } from './paginator'
import { VehicleCard } from './vehicle-card'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

const count = 6
export const MenubarView = ({ className, ...props }: Props) => {
  const { data: menubarTabs, isPending: isMenubarTabsPending } =
    useMenubarTabs()
  const { data: menubarVehicles, isPending: isMenubarVehiclesPending } =
    useMenubarVehicles()
  const { data: vehicles, isPending: isVehiclesPending } = useVehicles()

  const [page, setPage] = useState(1)
  const [selectedMenubarVehicle, setSelectedMenubarVehicle] = useState<
    string | undefined
  >()

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
    if (!selectedMenubarVehicle) return vehicles
    return vehicles?.filter(
      (vehicle) => vehicle.menubarVehicle == selectedMenubarVehicle,
    )
  }, [vehicles, selectedMenubarVehicle])

  if (isMenubarTabsPending || isMenubarVehiclesPending || isVehiclesPending)
    return <Loader />
  return (
    <div className={cn('flex-center z-20 flex-col', className)} {...props}>
      <NavigationMenu className="">
        <NavigationMenuList className="flex-wrap px-4 max-lg:flex max-lg:gap-4">
          {menubarTabs?.map((tab) => {
            const vehicles = menubarVehiclesByMenubarTab.get(tab.id)
            if (!vehicles?.length) return
            return (
              <Menubar
                key={tab.id}
                menubarTab={tab}
                menubarVehicles={vehicles}
                setSelectedMenubarVehicle={setSelectedMenubarVehicle}
              />
            )
          })}

          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), 'cursor-pointer')}
              onClick={() => setSelectedMenubarVehicle(undefined)}
            >
              Show all
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="my-10 grid w-full grid-cols-3 gap-8 max-xl:grid-cols-2 max-md:grid-cols-1">
        {vehiclesByMenubarVehicles
          ?.slice((page - 1) * count, page * count)
          .map((v) => (
            <VehicleCard data={v} key={v.id} />
          ))}
      </div>
      <Paginator
        length={Math.ceil((vehiclesByMenubarVehicles?.length || count) / count)}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}
