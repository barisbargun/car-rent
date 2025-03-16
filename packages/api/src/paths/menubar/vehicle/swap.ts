import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { SwapModelInput } from '#api/config/shared-schemas'
import { api } from '#api/lib/api'
import { sortByIdList } from '#api/lib/utils'

import { getMenubarVehiclesQueryOptions } from './get-all'

export const swapMenubarVehicle = ({
  data,
}: {
  data: SwapModelInput
}): Promise<SwapModelInput> => {
  return api.patch(`${API_PATHS.menubarVehicle}`, data)
}

type UseSwapMenubarVehicleOptions = {
  mutationConfig?: MutationConfig<typeof swapMenubarVehicle>
}

export const useSwapMenubarVehicle = ({
  mutationConfig,
}: UseSwapMenubarVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      const idList = args[1].data.idList
      queryClient.setQueryData(
        getMenubarVehiclesQueryOptions().queryKey,
        (data) => sortByIdList(data, idList),
      )
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: swapMenubarVehicle,
  })
}
