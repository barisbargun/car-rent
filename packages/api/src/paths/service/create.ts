import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { ServiceCreate, ServiceGet } from './common'
import { getServicesQueryOptions } from './get-all'

export const createService = ({
  data,
}: {
  data: ServiceCreate
}): Promise<ServiceGet> => {
  return api.post(`${API_PATHS.service}`, data)
}

type UseCreateServiceOptions = {
  mutationConfig?: MutationConfig<typeof createService>
}

export const useCreateService = ({
  mutationConfig,
}: UseCreateServiceOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getServicesQueryOptions().queryKey,
        (services) => [...(services || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createService,
  })
}
