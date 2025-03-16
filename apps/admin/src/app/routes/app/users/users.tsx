import { useUsers } from '@repo/api/paths/user/get-all'
import { useEffect } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ItemCounts } from '@/components/shared/item-counts'
import { UserCard } from '@/features/user/components/card'
import { UserCardSkeleton } from '@/features/user/components/card.skeleton'
import { UserCreateForm } from '@/features/user/components/create-form'
import { toast } from '@/lib/toast'

const itemsClassName = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

const UsersSkeleton = () => (
  <div className={itemsClassName}>
    {Array.from({ length: 4 }).map((_, i) => (
      <UserCardSkeleton key={i} />
    ))}
  </div>
)

const UsersRoute = () => {
  const { data: users, isPending, isError } = useUsers()

  useEffect(() => {
    if (isError) {
      toast.api.fetch('user').error()
    }
  }, [isError])

  if (isPending) return <UsersSkeleton />
  return (
    <>
      <div className={itemsClassName}>
        {users?.map((user) => <UserCard key={user.id} data={user} />)}
      </div>
      <ButtonModelForm
        model="user"
        modelText="User"
        type="ADD"
        itemsCount={users?.length}
      >
        <UserCreateForm />
      </ButtonModelForm>
      <ItemCounts count={users?.length} model="user" />
    </>
  )
}

export default UsersRoute
