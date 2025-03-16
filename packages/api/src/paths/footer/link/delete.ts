import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getFooterLinksQueryOptions } from './get-all'

export const deleteFooterLink = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.footerLink}/${id}`)
}

type UseDeleteFooterLinkOptions = {
  mutationConfig?: MutationConfig<typeof deleteFooterLink>
}

export const useDeleteFooterLink = ({
  mutationConfig,
}: UseDeleteFooterLinkOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(
        getFooterLinksQueryOptions().queryKey,
        (footerLinks) => footerLinks?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteFooterLink,
  })
}
