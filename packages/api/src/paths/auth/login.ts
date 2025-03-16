import { validationMsg } from '@repo/utils/message'
import { storageToken } from '@repo/utils/storage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { Login, TokenResponse } from '#api/types/auth'

import { getCurrentUserQueryOptions } from './current-user'

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, validationMsg('min', 2))
    .max(150, validationMsg('max', 150)),
  password: z.string().min(2).max(150, validationMsg('max', 150)),
})

export const checkLogin = (data: Login): Promise<TokenResponse> => {
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
