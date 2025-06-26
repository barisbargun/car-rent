import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { ReviewGet } from './common'

export const getReviews = (): Promise<ReviewGet[]> => {
  return api.get(API_PATHS.review)
}

export const getReviewsQueryOptions = () => {
  return queryOptions({
    queryKey: ['reviews'],
    queryFn: () => getReviews(),
  })
}

type UseReviewsOptions = {
  queryConfig?: QueryConfig<typeof getReviewsQueryOptions>
}

export const useReviews = ({ queryConfig }: UseReviewsOptions = {}) => {
  return useQuery({
    ...getReviewsQueryOptions(),
    ...queryConfig,
  })
}
