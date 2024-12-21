import { apiPaths } from '@repo/mock/api-paths'
import { Carousel } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '@/config/react-query'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/response'

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
