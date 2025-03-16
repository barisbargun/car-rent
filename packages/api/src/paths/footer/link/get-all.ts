import { FooterLink } from '#api/types/footer'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

export const getFooterLinks = (): Promise<FooterLink[]> => {
  return api.get(API_PATHS.footerLink)
}

export const getFooterLinksQueryOptions = () => {
  return queryOptions({
    queryKey: ['footerLinks'],
    queryFn: () => getFooterLinks(),
  })
}

type UseFooterLinksOptions = {
  queryConfig?: QueryConfig<typeof getFooterLinksQueryOptions>
}

export const useFooterLinks = ({ queryConfig }: UseFooterLinksOptions = {}) => {
  return useQuery({
    ...getFooterLinksQueryOptions(),
    ...queryConfig,
  })
}
