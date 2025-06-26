import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { CarouselCreate, CarouselGet } from './common'
import { getCarouselsQueryOptions } from './get-all'

export const createCarousel = ({
  data,
}: {
  data: CarouselCreate
}): Promise<CarouselGet> => {
  return api.post(`${API_PATHS.carousel}`, data)
}

type UseCreateCarouselOptions = {
  mutationConfig?: MutationConfig<typeof createCarousel>
}

export const useCreateCarousel = ({
  mutationConfig,
}: UseCreateCarouselOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getCarouselsQueryOptions().queryKey,
        (carousels) => [...(carousels || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createCarousel,
  })
}
