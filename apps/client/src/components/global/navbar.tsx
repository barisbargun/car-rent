import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { RowsIcon } from 'lucide-react'

import { navLinkConfig } from '@/config/nav'

export const Navbar = () => {
  const navList = Object.values(navLinkConfig)

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex w-full justify-center bg-primary/30 text-primary-foreground backdrop-blur-sm">
        <div className="container flex items-center justify-between py-2 lg:py-3">
          <strong className="cursor-pointer font-pacifico text-3xl font-medium max-lg:text-2xl">
            Reint
          </strong>
          {/** For Desktop */}
          <nav className="max-lg:hidden">
            <ul className="flex items-center justify-between gap-10">
              {navList.map((v) => (
                <li key={v.name}>
                  <a
                    className="text-sm opacity-60 transition-opacity hover:opacity-100"
                    href={`#${v.link}`}
                  >
                    {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex-center lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <RowsIcon className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                {navList.map((v) => (
                  <DropdownMenuItem key={v.link}>
                    <a href={`#${v.link}`}>{v.name}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}
