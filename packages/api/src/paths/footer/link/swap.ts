import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { SwapModelInput } from '#api/config/shared-schemas'
import { api } from '#api/lib/api'
import { sortByIdList } from '#api/lib/utils'

import { getFooterLinksQueryOptions } from './get-all'

export const swapFooterLink = ({
  data,
}: {
  data: SwapModelInput
}): Promise<SwapModelInput> => {
  return api.patch(`${API_PATHS.footerLink}`, data)
}

type UseSwapFooterLinkOptions = {
  mutationConfig?: MutationConfig<typeof swapFooterLink>
}

export const useSwapFooterLink = ({
  mutationConfig,
}: UseSwapFooterLinkOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      const idList = args[1].data.idList
      queryClient.setQueryData(getFooterLinksQueryOptions().queryKey, (data) =>
        sortByIdList(data, idList),
      )
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: swapFooterLink,
  })
}
