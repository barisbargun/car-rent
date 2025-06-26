import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { SiteConfigGet } from './common'

export const getSiteConfig = (): Promise<SiteConfigGet> => {
  return api.get(API_PATHS.siteConfig)
}

export const getSiteConfigQueryOptions = () => {
  return queryOptions({
    queryKey: ['siteConfig'],
    queryFn: () => getSiteConfig(),
  })
}

type UseSiteConfigOptions = {
  queryConfig?: QueryConfig<typeof getSiteConfigQueryOptions>
}

export const useSiteConfig = ({ queryConfig }: UseSiteConfigOptions = {}) => {
  return useQuery({
    ...getSiteConfigQueryOptions(),
    ...queryConfig,
  })
}
