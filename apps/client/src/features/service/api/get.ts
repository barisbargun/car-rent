import { apiPaths } from '@repo/mock/api-paths'
import { Service } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '@/config/react-query'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/response'

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
