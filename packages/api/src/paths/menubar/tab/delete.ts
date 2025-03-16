import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getMenubarTabsQueryOptions } from './get-all'

export const deleteMenubarTab = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.menubarTab}/${id}`)
}

type UseDeleteMenubarTabOptions = {
  mutationConfig?: MutationConfig<typeof deleteMenubarTab>
}

export const useDeleteMenubarTab = ({
  mutationConfig,
}: UseDeleteMenubarTabOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(
        getMenubarTabsQueryOptions().queryKey,
        (menubarTabs) => menubarTabs?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteMenubarTab,
  })
}
