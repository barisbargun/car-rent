import { apiPaths } from '@repo/mock/api-paths'
import { Carousel } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

export const getCarousels = (): ApiResponse<Carousel[]> => {
  return api.get(apiPaths.carousels)
}

export const getCarouselsQueryOptions = () => {
  return queryOptions({
    queryKey: ['carousels'],
    queryFn: () => getCarousels().then((res) => res.data),
  })
}

type UseCarouselsOptions = {
  queryConfig?: QueryConfig<typeof getCarouselsQueryOptions>
}

export const useCarousels = ({ queryConfig }: UseCarouselsOptions) => {
  return useQuery({
    ...getCarouselsQueryOptions(),
    ...queryConfig,
  })
}
