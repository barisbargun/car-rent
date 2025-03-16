import { useDeleteUser } from '@repo/api/paths/user/delete'
import { UserGet } from '@repo/api/types/user'
import { cn } from '@repo/ui/lib/utils'

import assets from '@/assets'
import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { Image } from '@/features/image/components/image'

import { UserUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: UserGet
}

export const UserCard = ({ data, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center overflow-hidden rounded bg-background p-10 text-center shadow',
        className,
      )}
      data-testid="user-card"
      {...props}
    >
      <Image
        src={data.img?.url}
        widthList={[100, 90, 80, 150, 100]}
        fallback={assets.profilePlaceHolder}
        alt="user"
        className="h-full rounded-full object-cover"
      />
      <strong className="mt-4" title={data.username}>
        {data.username}
      </strong>
      <small className="block text-sm text-muted-foreground" title={data.email}>
        {data.email}
      </small>

      {/** Buttons */}
      <div className="absolute right-2 top-2 z-10 flex gap-2 card-buttons">
        <ButtonModelForm type="UPDATE" model="user" modelText="user">
          <UserUpdateForm user={data as any} />
        </ButtonModelForm>
        <ButtonModelDelete model="user" id={data.id} mutate={useDeleteUser} />
      </div>
    </div>
  )
}
