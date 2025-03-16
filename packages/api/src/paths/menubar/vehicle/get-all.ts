import { MenubarVehicle } from '#api/types/menubar'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

export const getMenubarVehicles = (): Promise<MenubarVehicle[]> => {
  return api.get(API_PATHS.menubarVehicle)
}

export const getMenubarVehiclesQueryOptions = () => {
  return queryOptions({
    queryKey: ['menubarVehicles'],
    queryFn: () => getMenubarVehicles(),
  })
}

type UseMenubarVehiclesOptions = {
  queryConfig?: QueryConfig<typeof getMenubarVehiclesQueryOptions>
}

export const useMenubarVehicles = ({
  queryConfig,
}: UseMenubarVehiclesOptions = {}) => {
  return useQuery({
    ...getMenubarVehiclesQueryOptions(),
    ...queryConfig,
  })
}
