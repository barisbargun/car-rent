import { storageToken } from '@repo/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { AuthLogin, TokenResponse } from './common'
import { getCurrentUserQueryOptions } from './current-user'

export const checkLogin = (data: AuthLogin): Promise<TokenResponse> => {
  return api.post(API_PATHS.login, data)
}

type UseAuthLoginOptions = {
  mutationConfig?: MutationConfig<typeof checkLogin>
}

export const useAuthLogin = ({ mutationConfig }: UseAuthLoginOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      const token = args[0].accessToken
      if (token) storageToken.set(token)

      queryClient.invalidateQueries({
        queryKey: getCurrentUserQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: checkLogin,
  })
}
