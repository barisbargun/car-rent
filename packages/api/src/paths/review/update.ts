import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { ReviewGet, ReviewUpdate } from './common'
import { getReviewsQueryOptions } from './get-all'

export const updateReview = ({
  id,
  data,
}: {
  id: string
  data: ReviewUpdate
}): Promise<ReviewGet> => {
  return api.patch(`${API_PATHS.review}/${id}`, data)
}

type UseUpdateReviewOptions = {
  mutationConfig?: MutationConfig<typeof updateReview>
}

export const useUpdateReview = ({
  mutationConfig,
}: UseUpdateReviewOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(getReviewsQueryOptions().queryKey, (reviews) =>
        reviews?.map((c) => (c.id === data.id ? data : c)),
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateReview,
  })
}
