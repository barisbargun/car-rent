import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getFooterTitlesQueryOptions } from './get-all'

export const deleteFooterTitle = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.footerTitle}/${id}`)
}

type UseDeleteFooterTitleOptions = {
  mutationConfig?: MutationConfig<typeof deleteFooterTitle>
}

export const useDeleteFooterTitle = ({
  mutationConfig,
}: UseDeleteFooterTitleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(
        getFooterTitlesQueryOptions().queryKey,
        (footerTitles) => footerTitles?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteFooterTitle,
  })
}
