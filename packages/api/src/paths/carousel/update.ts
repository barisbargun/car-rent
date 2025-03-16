import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { CarouselGet } from '#api/types/carousel'

import { createCarouselInputSchema } from './create'
import { getCarouselsQueryOptions } from './get-all'

export const updateCarouselInputSchema = createCarouselInputSchema

export type UpdateCarouselInput = z.infer<typeof updateCarouselInputSchema>

export const updateCarousel = ({
  id,
  data,
}: {
  id: string
  data: UpdateCarouselInput
}): Promise<CarouselGet> => {
  return api.patch(`${API_PATHS.carousel}/${id}`, data)
}

type UseUpdateCarouselOptions = {
  mutationConfig?: MutationConfig<typeof updateCarousel>
}

export const useUpdateCarousel = ({
  mutationConfig,
}: UseUpdateCarouselOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getCarouselsQueryOptions().queryKey,
        (carousels) => carousels?.map((c) => (c.id === data.id ? data : c)),
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateCarousel,
  })
}
