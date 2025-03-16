import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getVehiclesQueryOptions } from './get-all'

export const deleteVehicle = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.vehicle}/${id}`)
}

type UseDeleteVehicleOptions = {
  mutationConfig?: MutationConfig<typeof deleteVehicle>
}

export const useDeleteVehicle = ({
  mutationConfig,
}: UseDeleteVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(getVehiclesQueryOptions().queryKey, (vehicles) =>
        vehicles?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteVehicle,
  })
}
