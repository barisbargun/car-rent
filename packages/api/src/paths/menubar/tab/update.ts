import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { MenubarTab, MenubarTabUpdate } from './common'
import { getMenubarTabsQueryOptions } from './get-all'

export const updateMenubarTab = ({
  id,
  data,
}: {
  id: string
  data: MenubarTabUpdate
}): Promise<MenubarTab> => {
  return api.patch(`${API_PATHS.menubarTab}/${id}`, data)
}

type UseUpdateMenubarTabOptions = {
  mutationConfig?: MutationConfig<typeof updateMenubarTab>
}

export const useUpdateMenubarTab = ({
  mutationConfig,
}: UseUpdateMenubarTabOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getMenubarTabsQueryOptions().queryKey,
        (menubarTabs) => menubarTabs?.map((c) => (c.id === data.id ? data : c)),
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateMenubarTab,
  })
}
