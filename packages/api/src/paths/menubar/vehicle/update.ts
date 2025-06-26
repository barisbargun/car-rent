import { sortByIndex } from '@repo/utils/obj'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { MenubarVehicleGet, MenubarVehicleUpdate } from './common'
import { getMenubarVehiclesQueryOptions } from './get-all'

export const updateMenubarVehicle = ({
  id,
  data,
}: {
  id: string
  data: MenubarVehicleUpdate
}): Promise<MenubarVehicleGet> => {
  return api.patch(`${API_PATHS.menubarVehicle}/${id}`, data)
}

type UseUpdateMenubarVehicleOptions = {
  mutationConfig?: MutationConfig<typeof updateMenubarVehicle>
}

export const useUpdateMenubarVehicle = ({
  mutationConfig,
}: UseUpdateMenubarVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getMenubarVehiclesQueryOptions().queryKey,
        (menubarVehicles) => {
          const result = menubarVehicles?.map((c) =>
            c.id === data.id ? data : c,
          )
          return sortByIndex(result || [])
        },
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateMenubarVehicle,
  })
}
