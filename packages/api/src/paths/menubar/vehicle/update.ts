import { sortByIndex } from '@repo/utils/obj'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { MenubarVehicleGet } from '#api/types/menubar'

import { createMenubarVehicleInputSchema } from './create'
import { getMenubarVehiclesQueryOptions } from './get-all'

export const updateMenubarVehicleInputSchema = createMenubarVehicleInputSchema

export type UpdateMenubarVehicleInput = z.infer<
  typeof updateMenubarVehicleInputSchema
>

export const updateMenubarVehicle = ({
  id,
  data,
}: {
  id: string
  data: UpdateMenubarVehicleInput
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
