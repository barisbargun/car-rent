import { storageToken } from '@repo/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { api } from '#api/lib/api'

import { getCurrentUserQueryOptions } from './current-user'

export const authLogout = () => {
  return api.post(API_PATHS.logout)
}

export const useAuthLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onSuccess: () => {
      storageToken.remove()
      queryClient.invalidateQueries({
        queryKey: getCurrentUserQueryOptions().queryKey,
      })
    },
    mutationFn: authLogout,
  })
}
