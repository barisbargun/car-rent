import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import { Button } from '@repo/ui/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint'
import { cn } from '@repo/ui/lib/utils'
import { RowsIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { NavbarItem, navbarItems, navbarItemsMobile } from '@/config/navbar'
import { paths } from '@/config/paths'
import { UserContent } from '@/features/user/components/content'

const NavItem = ({
  item,
  handleClick,
}: {
  item: NavbarItem
  handleClick: (link: string) => void
}) => {
  const NavButton = () => {
    const Icon = item.icon
    return (
      <Button
        variant="ghost"
        size="lg"
        className={cn(
          'drop-shadow-black w-full px-2 max-lg:py-8 max-lg:last:col-span-2 xl:px-3',
          item.title === 'Users' && 'mt-auto',
        )}
        onClick={() => handleClick(item.link || '')}
      >
        <Icon width={15} height={15} className="mr-0.5" />
        {item.title}
      </Button>
    )
  }

  if (item.link) return NavButton()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{NavButton()}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 lg:absolute lg:left-0">
        <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          {item.children?.map((v) => (
            <DropdownMenuItem key={v.title} onClick={() => handleClick(v.link)}>
              {v.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type Props = React.HTMLAttributes<HTMLElement> & {}

export const Navbar = ({ className, ...props }: Props) => {
  const { data: currentUser } = useCurrentUser()
  const [openDrawer, setOpenDrawer] = useState(false)
  const breakpoint = useBreakpoint()
  const navigate = useNavigate()

  const handleLinkClick = (link: string) => {
    setOpenDrawer(false)
    navigate(link || '')
  }

  /** Navigation Desktop */
  if (breakpoint > 2) {
    return (
      <nav
        className={cn('flex h-full flex-col gap-1 xl:gap-4', className)}
        {...props}
      >
        {navbarItems.map(
          (item) =>
            (!item.protect || item.protect(currentUser?.role)) && (
              <NavItem
                item={item}
                key={item.title}
                handleClick={handleLinkClick}
              />
            ),
        )}
      </nav>
    )
  }

  /** Navigation Mobile */
  return (
    <nav
      className={cn('flex h-fit w-full justify-between', className)}
      {...props}
    >
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger>{<RowsIcon className="max-lg:size-5" />}</DrawerTrigger>
        <DrawerContent className="flex-center w-full flex-col gap-1 pb-4">
          <DrawerHeader>
            <DrawerTitle className="sr-only">Navigation</DrawerTitle>
            <UserContent
              className="my-2 cursor-pointer"
              onClick={() => handleLinkClick(paths.app.profile.getHref())}
            />
          </DrawerHeader>

          <div
            className="grid w-full grid-cols-2"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {navbarItemsMobile.map((item) => (
              <NavItem
                item={item}
                key={item.title}
                handleClick={handleLinkClick}
              />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}
