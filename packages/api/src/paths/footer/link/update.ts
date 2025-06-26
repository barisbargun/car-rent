import { sortByIndex } from '@repo/utils/obj'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { FooterLink, FooterLinkUpdate } from './common'
import { getFooterLinksQueryOptions } from './get-all'

export const updateFooterLink = ({
  id,
  data,
}: {
  id: string
  data: FooterLinkUpdate
}): Promise<FooterLink> => {
  return api.patch(`${API_PATHS.footerLink}/${id}`, data)
}

type UseUpdateFooterLinkOptions = {
  mutationConfig?: MutationConfig<typeof updateFooterLink>
}

export const useUpdateFooterLink = ({
  mutationConfig,
}: UseUpdateFooterLinkOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getFooterLinksQueryOptions().queryKey,
        (footerLinks) => {
          const result = footerLinks?.map((c) => (c.id === data.id ? data : c))
          return sortByIndex(result || [])
        },
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateFooterLink,
  })
}
