import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { ROLE_POST_LIST, UserGet } from '#api/types/user'

import { getUsersQueryOptions } from './get-all'

export const updateUserInputSchema = z.object({
  img: z.string(),
  username: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),

  email: z.string().email(),
  role: z.nativeEnum(ROLE_POST_LIST, {
    required_error: 'Role is required',
  }),
})

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>

export const updateUser = ({
  id,
  data,
}: {
  id: string
  data: UpdateUserInput
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
