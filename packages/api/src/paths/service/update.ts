import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { ServiceGet, ServiceUpdate } from './common'
import { getServicesQueryOptions } from './get-all'

export const updateService = ({
  id,
  data,
}: {
  id: string
  data: ServiceUpdate
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
