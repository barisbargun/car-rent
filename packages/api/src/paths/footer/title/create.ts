import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { FooterTitle, FooterTitleCreate } from './common'
import { getFooterTitlesQueryOptions } from './get-all'

export const createFooterTitle = ({
  data,
}: {
  data: FooterTitleCreate
}): Promise<FooterTitle> => {
  return api.post(`${API_PATHS.footerTitle}`, data)
}

type UseCreateFooterTitleOptions = {
  mutationConfig?: MutationConfig<typeof createFooterTitle>
}

export const useCreateFooterTitle = ({
  mutationConfig,
}: UseCreateFooterTitleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getFooterTitlesQueryOptions().queryKey,
        (footerTitles) => [...(footerTitles || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createFooterTitle,
  })
}
