import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { ServiceGet } from './common'

export const getServices = (): Promise<ServiceGet[]> => {
  return api.get(API_PATHS.service)
}

export const getServicesQueryOptions = () => {
  return queryOptions({
    queryKey: ['services'],
    queryFn: () => getServices(),
  })
}

type UseServicesOptions = {
  queryConfig?: QueryConfig<typeof getServicesQueryOptions>
}

export const useServices = ({ queryConfig }: UseServicesOptions = {}) => {
  return useQuery({
    ...getServicesQueryOptions(),
    ...queryConfig,
  })
}
