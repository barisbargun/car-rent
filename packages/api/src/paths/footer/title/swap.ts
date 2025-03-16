import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { SwapModelInput } from '#api/config/shared-schemas'
import { api } from '#api/lib/api'

import { getFooterTitlesQueryOptions } from './get-all'

export const swapFooterTitle = ({
  data,
}: {
  data: SwapModelInput
}): Promise<SwapModelInput> => {
  return api.patch(`${API_PATHS.footerTitle}`, data)
}

type UseSwapFooterTitleOptions = {
  mutationConfig?: MutationConfig<typeof swapFooterTitle>
}

export const useSwapFooterTitle = ({
  mutationConfig,
}: UseSwapFooterTitleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      const idList = args[1].data.idList
      queryClient.setQueryData(
        getFooterTitlesQueryOptions().queryKey,
        (footerTitles) =>
          footerTitles?.map((c) => {
            const index = idList.indexOf(c.id)
            if (index !== -1) {
              return { ...c, index }
            }
            return c
          }),
      )
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: swapFooterTitle,
  })
}
