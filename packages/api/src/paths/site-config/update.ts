import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { SiteConfigGet } from '#api/types/site-config'

import { getSiteConfigQueryOptions } from './get'

export const updateSiteConfigInputSchema = z.object({
  logoImg: z.string(),
  serviceImg: z.string(),
  title: z
    .string()
    .max(50, validationMsg('max', 50)),
  desc: z
    .string()
    .max(300, validationMsg('max', 300)),
})

export type UpdateSiteConfigInput = z.infer<typeof updateSiteConfigInputSchema>

export const updateSiteConfig = ({
  data,
}: {
  data: UpdateSiteConfigInput
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
