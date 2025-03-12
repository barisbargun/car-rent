import { apiPaths } from '@repo/mock/api-paths'
import { FooterFull } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

export const getFooter = (): ApiResponse<FooterFull[]> => {
  return api.get(apiPaths.footerFull)
}

export const getFooterQueryOptions = () => {
  return queryOptions({
    queryKey: ['footer'],
    queryFn: () => getFooter().then((res) => res.data),
  })
}

type UseFooterOptions = {
  queryConfig?: QueryConfig<typeof getFooterQueryOptions>
}

export const useFooter = ({ queryConfig }: UseFooterOptions) => {
  return useQuery({
    ...getFooterQueryOptions(),
    ...queryConfig,
  })
}
