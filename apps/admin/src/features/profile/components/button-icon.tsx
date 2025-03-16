import { Button, ButtonProps } from '@repo/ui/components/button'
import { cn } from '@repo/ui/lib/utils'
import { Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Props = ButtonProps & {}

export const ProfileSettingsButton = ({ className, ...props }: Props) => {
  const navigate = useNavigate()

  return (
    <Button
      className={cn('max-lg:hidden', className)}
      variant="outline"
      size="icon"
      onClick={() => navigate('profile')}
      {...props}
    >
      <span className="sr-only">Profile Settings</span>
      <Settings className="size-5" />
    </Button>
  )
}
