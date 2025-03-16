import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { ReviewGet } from '#api/types/review'

import { getReviewsQueryOptions } from './get-all'

export const createReviewInputSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  fullname: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(150, validationMsg('max', 150)),
  desc: z
    .string()
    .min(20, validationMsg('min', 20))
    .max(300, validationMsg('max', 300)),
  occupation: z.string().max(150, validationMsg('max', 150)),
})

export type CreateReviewInput = z.infer<typeof createReviewInputSchema>

export const createReview = ({
  data,
}: {
  data: CreateReviewInput
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
