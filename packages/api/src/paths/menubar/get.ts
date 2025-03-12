import { apiPaths } from '@repo/mock/api-paths'
import { MenubarFull } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

export const getMenubar = (): ApiResponse<MenubarFull[]> => {
  return api.get(apiPaths.menubarFull)
}

export const getMenubarQueryOptions = () => {
  return queryOptions({
    queryKey: ['menubar'],
    queryFn: () => getMenubar().then((res) => res.data),
  })
}

type UseMenubarOptions = {
  queryConfig?: QueryConfig<typeof getMenubarQueryOptions>
}

export const useMenubar = ({ queryConfig }: UseMenubarOptions) => {
  return useQuery({
    ...getMenubarQueryOptions(),
    ...queryConfig,
  })
}
