import { ModeToggle } from '@repo/ui/components/mode-toggle'
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint'
import { cn } from '@repo/ui/lib/utils'
import React from 'react'

import { ProfileSettingsButton } from '@/features/profile/components/button-icon'
import { UserContent } from '@/features/user/components/content'

import { ButtonAlertLogout } from '../shared/buttons/alert-logout'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const Topbar = ({ className, ...props }: Props) => {
  const breakpoint = useBreakpoint()
  return (
    <header className={cn('flex-center gap-2', className)} {...props}>
      {breakpoint > 2 && (
        <>
          <UserContent />
          <ProfileSettingsButton />
        </>
      )}
      <ModeToggle />
      <ButtonAlertLogout />
    </header>
  )
}
