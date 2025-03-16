import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getUsersQueryOptions } from './get-all'

export const deleteUser = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.user}/${id}`)
}

type UseDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof deleteUser>
}

export const useDeleteUser = ({
  mutationConfig,
}: UseDeleteUserOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(getUsersQueryOptions().queryKey, (users) =>
        users?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteUser,
  })
}
