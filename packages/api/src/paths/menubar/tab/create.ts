import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { MenubarTab,MenubarTabCreate } from './common'
import { getMenubarTabsQueryOptions } from './get-all'

export const createMenubarTab = ({
  data,
}: {
  data: MenubarTabCreate
}): Promise<MenubarTab> => {
  return api.post(`${API_PATHS.menubarTab}`, data)
}

type UseCreateMenubarTabOptions = {
  mutationConfig?: MutationConfig<typeof createMenubarTab>
}

export const useCreateMenubarTab = ({
  mutationConfig,
}: UseCreateMenubarTabOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getMenubarTabsQueryOptions().queryKey,
        (menubarTabs) => [...(menubarTabs || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createMenubarTab,
  })
}
