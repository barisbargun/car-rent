import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { MenubarTab } from './common'

export const getMenubarTabs = (): Promise<MenubarTab[]> => {
  return api.get(API_PATHS.menubarTab)
}

export const getMenubarTabsQueryOptions = () => {
  return queryOptions({
    queryKey: ['menubarTabs'],
    queryFn: () => getMenubarTabs(),
  })
}

type UseMenubarTabsOptions = {
  queryConfig?: QueryConfig<typeof getMenubarTabsQueryOptions>
}

export const useMenubarTabs = ({ queryConfig }: UseMenubarTabsOptions = {}) => {
  return useQuery({
    ...getMenubarTabsQueryOptions(),
    ...queryConfig,
  })
}
