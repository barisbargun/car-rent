import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { CarouselGet } from './common'

export const getCarousels = (): Promise<CarouselGet[]> => {
  return api.get(API_PATHS.carousel)
}

export const getCarouselsQueryOptions = () => {
  return queryOptions({
    queryKey: ['carousels'],
    queryFn: () => getCarousels(),
  })
}

type UseCarouselsOptions = {
  queryConfig?: QueryConfig<typeof getCarouselsQueryOptions>
}

export const useCarousels = ({ queryConfig }: UseCarouselsOptions = {}) => {
  return useQuery({
    ...getCarouselsQueryOptions(),
    ...queryConfig,
  })
}
