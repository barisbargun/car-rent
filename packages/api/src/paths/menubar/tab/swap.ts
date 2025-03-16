import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { SwapModelInput } from '#api/config/shared-schemas'
import { api } from '#api/lib/api'
import { sortByIdList } from '#api/lib/utils'

import { getMenubarTabsQueryOptions } from './get-all'

export const swapMenubarTab = ({
  data,
}: {
  data: SwapModelInput
}): Promise<SwapModelInput> => {
  return api.patch(`${API_PATHS.menubarTab}`, data)
}

type UseSwapMenubarTabOptions = {
  mutationConfig?: MutationConfig<typeof swapMenubarTab>
}

export const useSwapMenubarTab = ({
  mutationConfig,
}: UseSwapMenubarTabOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      const idList = args[1].data.idList
      queryClient.setQueryData(getMenubarTabsQueryOptions().queryKey, (data) =>
        sortByIdList(data, idList),
      )
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: swapMenubarTab,
  })
}
