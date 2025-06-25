import { sortByIndex } from '@repo/utils/obj'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { VehicleGet } from '#api/types/vehicle'

import { createVehicleInputSchema } from './create'
import { getVehiclesQueryOptions } from './get-all'

export const updateVehicleInputSchema = createVehicleInputSchema

export type UpdateVehicleInput = z.infer<typeof updateVehicleInputSchema>

export const updateVehicle = ({
  id,
  data,
}: {
  id: string
  data: UpdateVehicleInput
}): Promise<VehicleGet> => {
  return api.patch(`${API_PATHS.vehicle}/${id}`, data)
}

type UseUpdateVehicleOptions = {
  mutationConfig?: MutationConfig<typeof updateVehicle>
}

export const useUpdateVehicle = ({
  mutationConfig,
}: UseUpdateVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getVehiclesQueryOptions().queryKey,
        (vehicles) => {
          const result = vehicles?.map((c) => (c.id === data.id ? data : c))
          return sortByIndex(result || [])
        },
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateVehicle,
  })
}
