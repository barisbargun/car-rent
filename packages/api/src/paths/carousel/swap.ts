import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { SwapModelInput } from '#api/config/shared-schemas'
import { api } from '#api/lib/api'
import { sortByIdList } from '#api/lib/utils'

import { getCarouselsQueryOptions } from './get-all'

export const swapCarousel = ({
  data,
}: {
  data: SwapModelInput
}): Promise<SwapModelInput> => {
  return api.patch(`${API_PATHS.carousel}`, data)
}

type UseSwapCarouselOptions = {
  mutationConfig?: MutationConfig<typeof swapCarousel>
}

export const useSwapCarousel = ({
  mutationConfig,
}: UseSwapCarouselOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      const idList = args[1].data.idList
      queryClient.setQueryData(getCarouselsQueryOptions().queryKey, (data) =>
        sortByIdList(data, idList),
      )
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: swapCarousel,
  })
}
