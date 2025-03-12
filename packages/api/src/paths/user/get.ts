import { apiPaths } from '@repo/mock/api-paths'
import { UserGet } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

export const getUsers = (): ApiResponse<UserGet[]> => {
  return api.get(apiPaths.users)
}

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: () => getUsers().then((res) => res.data),
  })
}

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>
}

export const useUsers = ({ queryConfig }: UseUsersOptions) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  })
}
