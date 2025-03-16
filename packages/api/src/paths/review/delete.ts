import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getReviewsQueryOptions } from './get-all'

export const deleteReview = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.review}/${id}`)
}

type UseDeleteReviewOptions = {
  mutationConfig?: MutationConfig<typeof deleteReview>
}

export const useDeleteReview = ({
  mutationConfig,
}: UseDeleteReviewOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(getReviewsQueryOptions().queryKey, (reviews) =>
        reviews?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteReview,
  })
}
