import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { UserCreate, UserGet } from './common'
import { getUsersQueryOptions } from './get-all'

export const createUser = ({
  data,
}: {
  data: UserCreate
}): Promise<UserGet> => {
  return api.post(`${API_PATHS.user}`, data)
}

type UseCreateUserOptions = {
  mutationConfig?: MutationConfig<typeof createUser>
}

export const useCreateUser = ({
  mutationConfig,
}: UseCreateUserOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getUsersQueryOptions().queryKey, (users) => [
        ...(users || []),
        data,
      ])
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createUser,
  })
}
