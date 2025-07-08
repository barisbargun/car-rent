import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { SiteConfigGet, SiteConfigUpdate } from './common'
import { getSiteConfigQueryOptions } from './get'

export const updateSiteConfig = ({
  data,
}: {
  data: SiteConfigUpdate
}): Promise<SiteConfigGet> => {
  return api.patch(API_PATHS.siteConfig, data)
}

type UseUpdateSiteConfigOptions = {
  mutationConfig?: MutationConfig<typeof updateSiteConfig>
}

export const useUpdateSiteConfig = ({
  mutationConfig,
}: UseUpdateSiteConfigOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getSiteConfigQueryOptions().queryKey, data)
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateSiteConfig,
  })
}
