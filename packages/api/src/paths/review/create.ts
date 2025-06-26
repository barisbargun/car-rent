import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { ReviewCreate, ReviewGet } from './common'
import { getReviewsQueryOptions } from './get-all'

export const createReview = ({
  data,
}: {
  data: ReviewCreate
}): Promise<ReviewGet> => {
  return api.post(`${API_PATHS.review}`, data)
}

type UseCreateReviewOptions = {
  mutationConfig?: MutationConfig<typeof createReview>
}

export const useCreateReview = ({
  mutationConfig,
}: UseCreateReviewOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getReviewsQueryOptions().queryKey, (reviews) => [
        ...(reviews || []),
        data,
      ])
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createReview,
  })
}
