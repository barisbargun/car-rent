import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { UserGet } from '#api/types/user'

import { getCurrentUserQueryOptions } from '../auth/current-user'
import { getUsersQueryOptions } from './get-all'

export const updateUserSelfInputSchema = z.object({
  img: z.string(),
  username: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
  email: z.string().email(),
  password: z
    .string()
    .refine((val) => val.length === 0 || val.length >= 3, {
      message: validationMsg('min', 3),
    })
    .optional(),
})

export type UpdateUserSelfInput = z.infer<typeof updateUserSelfInputSchema>

export const updateUserSelf = ({
  data,
}: {
  data: UpdateUserSelfInput
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
