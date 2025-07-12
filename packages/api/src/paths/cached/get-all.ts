import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { CachedGet } from './common'

export const getCached = (): Promise<CachedGet> => {
  return api.get(API_PATHS.cached)
}

export const getCachedQueryOptions = () => {
  return queryOptions({
    queryKey: ['cached'],
    queryFn: () => getCached(),
  })
}

type UseCachedOptions = {
  queryConfig?: QueryConfig<typeof getCachedQueryOptions>
}

export const useCached = ({ queryConfig }: UseCachedOptions = {}) => {
  return useQuery({
    ...getCachedQueryOptions(),
    ...queryConfig,
  })
}
