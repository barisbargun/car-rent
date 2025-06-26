import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { getCurrentUserQueryOptions } from '../auth/current-user'
import { UserGet, UserUpdateSelf } from './common'
import { getUsersQueryOptions } from './get-all'

export const updateUserSelf = ({
  data,
}: {
  data: UserUpdateSelf
}): Promise<UserGet> => {
  return api.patch(`${API_PATHS.user}/self`, data)
}

type UseUpdateUserSelfOptions = {
  mutationConfig?: MutationConfig<typeof updateUserSelf>
}

export const useUpdateUserSelf = ({
  mutationConfig,
}: UseUpdateUserSelfOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getUsersQueryOptions().queryKey, (users) =>
        users?.map((c) => (c.id === data.id ? data : c)),
      )
      queryClient.setQueryData(getCurrentUserQueryOptions().queryKey, data)
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateUserSelf,
  })
}
