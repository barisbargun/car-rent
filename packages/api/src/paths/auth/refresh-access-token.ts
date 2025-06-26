import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { TokenResponse } from './common'

export const getRefreshAccessToken = (): Promise<TokenResponse> => {
  return api.get(API_PATHS.refreshAccessToken)
}

export const getRefreshAccessTokenQueryOptions = () => {
  return queryOptions({
    queryKey: [API_PATHS.refreshAccessToken],
    queryFn: () => getRefreshAccessToken(),
  })
}

type UseRefreshAccessTokenOptions = {
  queryConfig?: QueryConfig<typeof getRefreshAccessTokenQueryOptions>
}

export const useRefreshAccessToken = ({
  queryConfig,
}: UseRefreshAccessTokenOptions = {}) => {
  return useQuery({
    ...getRefreshAccessTokenQueryOptions(),
    ...queryConfig,
  })
}
