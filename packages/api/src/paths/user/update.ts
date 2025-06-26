import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { UserGet, UserUpdate } from './common'
import { getUsersQueryOptions } from './get-all'

export const updateUser = ({
  id,
  data,
}: {
  id: string
  data: UserUpdate
}): Promise<UserGet> => {
  return api.patch(`${API_PATHS.user}/${id}`, data)
}

type UseUpdateUserOptions = {
  mutationConfig?: MutationConfig<typeof updateUser>
}

export const useUpdateUser = ({
  mutationConfig,
}: UseUpdateUserOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getUsersQueryOptions().queryKey, (users) =>
        users?.map((c) => (c.id === data.id ? data : c)),
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateUser,
  })
}
