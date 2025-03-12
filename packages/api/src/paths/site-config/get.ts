import { apiPaths } from '@repo/mock/api-paths'
import { SiteConfig } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

export const getSiteConfig = (): ApiResponse<SiteConfig> => {
  return api.get(apiPaths.siteConfig)
}

export const getSiteConfigQueryOptions = () => {
  return queryOptions({
    queryKey: ['site-config'],
    queryFn: () => getSiteConfig().then((res) => res.data),
  })
}

type UseSiteConfigOptions = {
  queryConfig?: QueryConfig<typeof getSiteConfigQueryOptions>
}

export const useSiteConfig = ({ queryConfig }: UseSiteConfigOptions) => {
  return useQuery({
    ...getSiteConfigQueryOptions(),
    ...queryConfig,
  })
}
