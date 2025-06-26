import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { VehicleCreate, VehicleGet } from './common'
import { getVehiclesQueryOptions } from './get-all'

export const createVehicle = ({
  data,
}: {
  data: VehicleCreate
}): Promise<VehicleGet> => {
  return api.post(`${API_PATHS.vehicle}`, data)
}

type UseCreateVehicleOptions = {
  mutationConfig?: MutationConfig<typeof createVehicle>
}

export const useCreateVehicle = ({
  mutationConfig,
}: UseCreateVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getVehiclesQueryOptions().queryKey,
        (vehicles) => [...(vehicles || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createVehicle,
  })
}
