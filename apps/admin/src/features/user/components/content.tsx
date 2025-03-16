import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import { cn } from '@repo/ui/lib/utils'

import assets from '@/assets'
import { Image } from '@/features/image/components/image'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

export const UserContent = ({ className, ...props }: Props) => {
  const { data: user } = useCurrentUser()

  if (!user) return
  return (
    <div
      className={cn(
        'gap-4 flex-center max-lg:flex-col max-lg:text-center lg:gap-2',
        className,
      )}
      {...props}
    >
      {/* User Image */}
      <Image
        src={user.img?.url}
        widthList={[50, 50, 40, 100, 100]}
        quality="high"
        fallback={assets.profilePlaceHolder}
        alt="user"
        className="h-full rounded-full object-cover"
      />

      <div className="flex flex-col *:text-sm *:leading-none">
        <p className="text-muted-foreground max-lg:hidden">Current User</p>
        <h4 className="font-medium">@{user.username}</h4>
      </div>
    </div>
  )
}
