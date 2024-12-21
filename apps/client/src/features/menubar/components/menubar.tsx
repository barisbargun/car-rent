import {
  MenubarFull,
  MenubarVehicle,
} from '@repo/typescript-config/types/api'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@repo/ui/components/navigation-menu'
import { Link, useLocation, useSearchParams } from 'react-router'

enum TAB_LIST {
  GRID_FOUR,
  GRID_SIX,
}

type Props = {
  data: MenubarFull[]
}

export const Menubar = ({ data }: Props) => {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const createPageUrl = (index: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    params.set('category', index.toString())
    return `${location.pathname}?${params.toString()}`
  }

  const getChildren = (vehicle: MenubarVehicle[]) => {
    return (
      vehicle &&
      vehicle
        .sort((a, b) => a.index - b.index)
        .map((v) => (
          <li key={v.id}>
            <NavigationMenuLink asChild>
              <Link
                className="relative cursor-pointer"
                to={createPageUrl(v.index)}
              >
                <img
                  width={251}
                  height={82}
                  src={v.img?.url}
                  alt="menu img"
                />
                <div className="absolute bottom-0 left-0 w-full p-2">
                  <div className="line-clamp-1 text-sm font-medium">
                    {v?.title}
                  </div>
                  <p className="line-clamp-2 text-xs leading-tight opacity-80 max-sm:line-clamp-1">
                    {v?.desc}
                  </p>
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap px-4 max-md:flex">
        {[...data]
          .sort((a, b) => a.index - b.index)
          .map((menubarTab) => (
            <NavigationMenuItem key={menubarTab.id}>
              <NavigationMenuTrigger>{menubarTab.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className={
                    'grid gap-3 p-4 text-white ' +
                    (menubarTab.type == TAB_LIST.GRID_FOUR
                      ? 'w-[350px] grid-cols-[.75fr_1fr] sm:w-[450px] md:w-[500px]'
                      : 'w-fit max-md:flex-center md:w-[500px] md:grid-cols-2 lg:w-[550px]')
                  }
                >
                  <li
                    className={
                      'row-span-3 ' +
                      (menubarTab.type == TAB_LIST.GRID_SIX ? 'hidden' : '')
                    }
                  >
                    <NavigationMenuLink asChild>
                      <Link
                        className="relative cursor-pointer"
                        to={createPageUrl(menubarTab.menubarVehicles[0].index)}
                      >
                        <img
                          width={188}
                          className="h-full"
                          src={menubarTab.menubarVehicles[0]?.img?.url}
                        />
                        <div className="absolute bottom-0 left-0 w-full p-4">
                          <div className="mb-2 mt-4 line-clamp-3 text-lg font-medium">
                            {menubarTab.menubarVehicles[0]?.title}
                          </div>
                          <p className="line-clamp-5 text-sm leading-tight opacity-80 max-sm:line-clamp-2">
                            {menubarTab.menubarVehicles[0]?.desc}
                          </p>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {getChildren(
                    menubarTab.menubarVehicles.slice(
                      menubarTab.type == TAB_LIST.GRID_FOUR ? 1 : 0,
                      menubarTab.type == TAB_LIST.GRID_FOUR ? 4 : 6,
                    ),
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to={createPageUrl(0)}>Show all</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
