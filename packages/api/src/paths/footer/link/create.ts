import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { FooterLink, FooterLinkCreate } from './common'
import { getFooterLinksQueryOptions } from './get-all'

export const createFooterLink = ({
  data,
}: {
  data: FooterLinkCreate
}): Promise<FooterLink> => {
  return api.post(`${API_PATHS.footerLink}`, data)
}

type UseCreateFooterLinkOptions = {
  mutationConfig?: MutationConfig<typeof createFooterLink>
}

export const useCreateFooterLink = ({
  mutationConfig,
}: UseCreateFooterLinkOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getFooterLinksQueryOptions().queryKey,
        (footerLinks) => [...(footerLinks || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createFooterLink,
  })
}
