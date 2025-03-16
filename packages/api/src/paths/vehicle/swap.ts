import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { SwapModelInput } from '#api/config/shared-schemas'
import { api } from '#api/lib/api'
import { sortByIdList } from '#api/lib/utils'

import { getVehiclesQueryOptions } from './get-all'

export const swapVehicle = ({
  data,
}: {
  data: SwapModelInput
}): Promise<SwapModelInput> => {
  return api.patch(API_PATHS.vehicle, data)
}

type UseSwapVehicleOptions = {
  mutationConfig?: MutationConfig<typeof swapVehicle>
}

export const useSwapVehicle = ({
  mutationConfig,
}: UseSwapVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      const idList = args[1].data.idList
      queryClient.setQueryData(getVehiclesQueryOptions().queryKey, (data) =>
        sortByIdList(data, idList),
      )
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: swapVehicle,
  })
}
