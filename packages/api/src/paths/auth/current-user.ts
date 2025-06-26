import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { UserGet } from '../user/common'

export const getCurrentUser = (): Promise<UserGet> => {
  return api.get(API_PATHS.currentUser)
}

export const getCurrentUserQueryOptions = () => {
  return queryOptions({
    queryKey: [API_PATHS.currentUser],
    queryFn: () => getCurrentUser(),
  })
}

type UseCurrentUserOptions = {
  queryConfig?: QueryConfig<typeof getCurrentUserQueryOptions>
}

export const useCurrentUser = ({ queryConfig }: UseCurrentUserOptions = {}) => {
  return useQuery({
    ...getCurrentUserQueryOptions(),
    ...queryConfig,
  })
}
