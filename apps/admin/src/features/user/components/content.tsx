import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import assets from '@/assets'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const UserContent = ({ className, ...props }: Props) => {
  const { data: user } = useCurrentUser()

  if (!user) return
  return (
    <div
      className={cn(
        'flex-center gap-4 max-lg:flex-col max-lg:text-center lg:gap-2',
        className,
      )}
      {...props}
    >
      {/* User Image */}
      <Image
        src={user.img?.url}
        sizes={[50, 50, 40, 100, 100]}
        fallback={assets.profilePlaceHolder}
        alt="user"
        className="h-full rounded-full object-cover"
      />

      <div className="flex flex-col *:text-sm *:leading-4">
        <p className="text-muted-foreground max-lg:hidden">Current User</p>
        <h4 className="font-medium">@{user.username}</h4>
      </div>
    </div>
  )
}
