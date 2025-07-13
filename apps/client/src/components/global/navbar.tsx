import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu'
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint'
import { Menu } from 'lucide-react'
import { useMemo } from 'react'

import { navLinkConfig } from '@/config/nav'
import { useAppContext } from '@/lib/context'

export const Navbar = () => {
  const { siteConfig } = useAppContext()
  const breakpoint = useBreakpoint()
  const isDesktop = breakpoint > 2
  const navList = useMemo(() => Object.values(navLinkConfig), [])
  return (
    <>
      <header className="bg-primary/30 text-primary-foreground fixed left-0 top-0 z-50 flex w-full justify-center backdrop-blur-sm">
        <div className="container flex items-center justify-between py-2 lg:py-3">
          <strong className="font-pacifico drop-shadow-black cursor-pointer text-3xl font-medium max-lg:text-2xl">
            {siteConfig?.title || ''}
          </strong>
          {isDesktop ? (
            <nav>
              <ul className="flex items-center justify-between gap-10">
                {navList.map((v) => (
                  <li key={v.name}>
                    <a
                      className="drop-shadow-black opacity-60 transition-opacity hover:opacity-100"
                      href={`#${v.link}`}
                    >
                      {v.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <nav className="flex-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Menu className="size-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <ul>
                    {navList.map((v) => (
                      <DropdownMenuItem asChild key={v.link}>
                        <li>
                          <a href={`#${v.link}`}>{v.name}</a>
                        </li>
                      </DropdownMenuItem>
                    ))}
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
