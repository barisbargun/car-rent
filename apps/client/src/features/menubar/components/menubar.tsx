import {
  MENUBAR_TAB_GRID_LIST,
  MenubarTab,
  MenubarVehicleGet,
} from '@repo/api/types/menubar'
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@repo/ui/components/navigation-menu'
import { cn } from '@repo/ui/lib/utils'

import { MenubarVehicleCard } from './menubar-vehicle-card'

type Props = {
  menubarTab: MenubarTab
  menubarVehicles: MenubarVehicleGet[]
  setSelectedMenubarVehicle: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const Menubar = ({
  menubarTab,
  menubarVehicles,
  setSelectedMenubarVehicle,
}: Props) => {
  const isGrid4 = menubarTab.type == MENUBAR_TAB_GRID_LIST.GRID4

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='cursor-default'>{menubarTab.title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={
            'grid gap-3 p-4 text-white ' +
            (isGrid4
              ? 'w-[350px] grid-cols-[.75fr_1fr] sm:w-[450px] md:w-[500px]'
              : 'w-fit max-md:flex-center md:w-[500px] md:grid-cols-2 lg:w-[550px]')
          }
        >
          {menubarVehicles
            .slice(isGrid4 ? 0 : 0, isGrid4 ? 4 : 6)
            .map((menubarVehicle, index) => (
              <MenubarVehicleCard
                key={menubarVehicle.id}
                data={menubarVehicle}
                className={cn(isGrid4 && index == 0 && 'row-span-3')}
                onClick={() => setSelectedMenubarVehicle(menubarVehicle.id)}
              />
            ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
