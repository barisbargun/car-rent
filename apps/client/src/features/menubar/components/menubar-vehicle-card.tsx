import { MenubarVehicleGet } from '@repo/api/types/menubar'
import { NavigationMenuLink } from '@repo/ui/components/navigation-menu'

type Props = React.HTMLAttributes<HTMLLIElement> & {
  data: MenubarVehicleGet
}

export const MenubarVehicleCard = ({ data, ...props }: Props) => {
  return (
    <li key={data.id} {...props}>
      <NavigationMenuLink className="relative cursor-pointer">
        <img width={251} height={82} src={data.img?.url} alt="menu img" />
        <div className="absolute bottom-0 left-0 w-full p-2">
          <div className="line-clamp-1 text-sm font-medium">{data.title}</div>
          <p className="line-clamp-2 text-xs leading-tight opacity-80 max-sm:line-clamp-1">
            {data.desc}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
