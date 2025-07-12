import { MenubarVehicleGet } from '@repo/api/paths/menubar/vehicle/common'
import { Image } from '@repo/ui/components/image'
import { NavigationMenuLink } from '@repo/ui/components/navigation-menu'
import { cn } from '@repo/ui/lib/utils'

type Props = React.HTMLAttributes<HTMLLIElement> & {
  data: MenubarVehicleGet
  isGrid4AndFirst: boolean
}

export const MenubarVehicleCard = ({
  data,
  isGrid4AndFirst,
  className,
  ...props
}: Props) => {
  return (
    <li
      key={data.id}
      className={cn(isGrid4AndFirst && 'row-span-3', className)}
      {...props}
    >
      <NavigationMenuLink className="relative cursor-pointer">
        <Image
          src={data.img?.url}
          w={250}
          ratio={3}
          alt="vehicle"
          className={cn(isGrid4AndFirst && 'h-full')}
        />
        <div className="absolute bottom-3 left-3 w-full">
          <div className="line-clamp-1 text-sm font-medium">{data.title}</div>
          <p className="line-clamp-2 text-xs leading-tight opacity-80 max-sm:line-clamp-1">
            {data.desc}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
