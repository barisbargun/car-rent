import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { MenubarVehicleCreate, MenubarVehicleGet } from './common'
import { getMenubarVehiclesQueryOptions } from './get-all'

export const createMenubarVehicle = ({
  data,
}: {
  data: MenubarVehicleCreate
}): Promise<MenubarVehicleGet> => {
  return api.post(`${API_PATHS.menubarVehicle}`, data)
}

type UseCreateMenubarVehicleOptions = {
  mutationConfig?: MutationConfig<typeof createMenubarVehicle>
}

export const useCreateMenubarVehicle = ({
  mutationConfig,
}: UseCreateMenubarVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getMenubarVehiclesQueryOptions().queryKey,
        (menubarVehicles) => [...(menubarVehicles || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createMenubarVehicle,
  })
}
