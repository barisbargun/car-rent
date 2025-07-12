import {
  MENUBAR_TAB_GRID_LIST,
  MenubarTab,
} from '@repo/api/paths/menubar/tab/common'
import { MenubarVehicleGet } from '@repo/api/paths/menubar/vehicle/common'
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
  setSelectedMenubarVehicle: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}

export const Menubar = ({
  menubarTab,
  menubarVehicles,
  setSelectedMenubarVehicle,
}: Props) => {
  const isGrid4 = menubarTab.type == MENUBAR_TAB_GRID_LIST.GRID4
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="cursor-default max-lg:text-base">
        {menubarTab.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={cn(
            'text-primary-foreground grid w-[350px] gap-3 p-4 sm:w-[450px] lg:w-[500px]',
            isGrid4 ? 'grid-cols-[.75fr_1fr]' : 'grid-cols-2',
          )}
        >
          {menubarVehicles.map((menubarVehicle, index) => (
            <MenubarVehicleCard
              key={menubarVehicle.id}
              data={menubarVehicle}
              isGrid4AndFirst={isGrid4 && index == 0}
              onClick={() => setSelectedMenubarVehicle(menubarVehicle.id)}
            />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}
