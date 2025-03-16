import { Vehicle } from '#api/types/vehicle'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

export const getVehicles = (): Promise<Vehicle[]> => {
  return api.get(API_PATHS.vehicle)
}

export const getVehiclesQueryOptions = () => {
  return queryOptions({
    queryKey: ['vehicles'],
    queryFn: () => getVehicles(),
  })
}

type UseVehiclesOptions = {
  queryConfig?: QueryConfig<typeof getVehiclesQueryOptions>
}

export const useVehicles = ({ queryConfig }: UseVehiclesOptions = {}) => {
  return useQuery({
    ...getVehiclesQueryOptions(),
    ...queryConfig,
  })
}
