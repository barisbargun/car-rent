import { FooterTitle } from '#api/types/footer'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

export const getFooterTitles = (): Promise<FooterTitle[]> => {
  return api.get(API_PATHS.footerTitle)
}

export const getFooterTitlesQueryOptions = () => {
  return queryOptions({
    queryKey: ['footerTitles'],
    queryFn: () => getFooterTitles(),
  })
}

type UseFooterTitlesOptions = {
  queryConfig?: QueryConfig<typeof getFooterTitlesQueryOptions>
}

export const useFooterTitles = ({ queryConfig }: UseFooterTitlesOptions = {}) => {
  return useQuery({
    ...getFooterTitlesQueryOptions(),
    ...queryConfig,
  })
}
