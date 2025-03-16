import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { MenubarTab } from '#api/types/menubar'

import { createMenubarTabInputSchema } from './create'
import { getMenubarTabsQueryOptions } from './get-all'

export const updateMenubarTabInputSchema = createMenubarTabInputSchema

export type UpdateMenubarTabInput = z.infer<typeof updateMenubarTabInputSchema>

export const updateMenubarTab = ({
  id,
  data,
}: {
  id: string
  data: UpdateMenubarTabInput
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
