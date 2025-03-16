import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { MENUBAR_TAB_GRID_LIST, MenubarTab } from '#api/types/menubar'

import { getMenubarTabsQueryOptions } from './get-all'

export const createMenubarTabInputSchema = z.object({
  title: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(50, validationMsg('max', 50)),
  type: z.nativeEnum(MENUBAR_TAB_GRID_LIST, {
    required_error: 'Grid is required',
  }),
})

export type CreateMenubarTabInput = z.infer<typeof createMenubarTabInputSchema>

export const createMenubarTab = ({
  data,
}: {
  data: CreateMenubarTabInput
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
