import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { ROLE_POST_LIST, UserGet } from '#api/types/user'

import { getUsersQueryOptions } from './get-all'

export const createUserInputSchema = z.object({
  img: z.string(),
  username: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
  password: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
  email: z.string().email(),
  role: z.nativeEnum(ROLE_POST_LIST, {
    required_error: 'Role is required',
  }),
})

export type CreateUserInput = z.infer<typeof createUserInputSchema>

export const createUser = ({
  data,
}: {
  data: CreateUserInput
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
