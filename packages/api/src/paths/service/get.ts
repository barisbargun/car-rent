import { apiPaths } from '@repo/mock/api-paths'
import { Service } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

export const getService = (): ApiResponse<Service[]> => {
  return api.get(apiPaths.services)
}

export const getServiceQueryOptions = () => {
  return queryOptions({
    queryKey: ['service'],
    queryFn: () => getService().then((res) => res.data),
  })
}

type UseServiceOptions = {
  queryConfig?: QueryConfig<typeof getServiceQueryOptions>
}

export const useService = ({ queryConfig }: UseServiceOptions) => {
  return useQuery({
    ...getServiceQueryOptions(),
    ...queryConfig,
  })
}
