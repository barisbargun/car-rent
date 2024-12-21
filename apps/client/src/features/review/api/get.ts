import { apiPaths } from '@repo/mock/api-paths'
import { Review } from '@repo/typescript-config/types/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

import { QueryConfig } from '@/config/react-query'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/response'

export const getReviews = (): ApiResponse<Review[]> => {
  return api.get(apiPaths.reviews)
}

export const getReviewsQueryOptions = () => {
  return queryOptions({
    queryKey: ['reviews'],
    queryFn: () => getReviews().then((res) => res.data),
  })
}

type UseReviewsOptions = {
  queryConfig?: QueryConfig<typeof getReviewsQueryOptions>
}

export const useReviews = ({ queryConfig }: UseReviewsOptions) => {
  return useQuery({
    ...getReviewsQueryOptions(),
    ...queryConfig,
  })
}
