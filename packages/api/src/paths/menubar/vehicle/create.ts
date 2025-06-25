import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { MenubarVehicleGet } from '#api/types/menubar'

import { getMenubarVehiclesQueryOptions } from './get-all'

export const createMenubarVehicleInputSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  menubarTab: z.string().min(1, 'Menubar tab is required'),
  title: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(50, validationMsg('max', 50)),
  desc: z.string().max(150, validationMsg('max', 150)),
})

export type CreateMenubarVehicleInput = z.infer<
  typeof createMenubarVehicleInputSchema
>

export const createMenubarVehicle = ({
  data,
}: {
  data: CreateMenubarVehicleInput
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
