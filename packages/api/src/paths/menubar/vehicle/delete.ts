import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getMenubarVehiclesQueryOptions } from './get-all'

export const deleteMenubarVehicle = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.menubarVehicle}/${id}`)
}

type UseDeleteMenubarVehicleOptions = {
  mutationConfig?: MutationConfig<typeof deleteMenubarVehicle>
}

export const useDeleteMenubarVehicle = ({
  mutationConfig,
}: UseDeleteMenubarVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(
        getMenubarVehiclesQueryOptions().queryKey,
        (menubarVehicles) => menubarVehicles?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteMenubarVehicle,
  })
}
