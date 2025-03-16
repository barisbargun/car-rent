import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { ServiceGet } from '#api/types/service'

import { createServiceInputSchema } from './create'
import { getServicesQueryOptions } from './get-all'

export const updateServiceInputSchema = createServiceInputSchema

export type UpdateServiceInput = z.infer<typeof updateServiceInputSchema>

export const updateService = ({
  id,
  data,
}: {
  id: string
  data: UpdateServiceInput
}): Promise<ServiceGet> => {
  return api.patch(`${API_PATHS.service}/${id}`, data)
}

type UseUpdateServiceOptions = {
  mutationConfig?: MutationConfig<typeof updateService>
}

export const useUpdateService = ({
  mutationConfig,
}: UseUpdateServiceOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getServicesQueryOptions().queryKey, (services) =>
        services?.map((c) => (c.id === data.id ? data : c)),
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateService,
  })
}
