import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api, ApiResponse } from '#api/lib/api'

import { getCarouselsQueryOptions } from './get-all'

export const deleteCarousel = ({
  id,
}: {
  id: string
}): ApiResponse<undefined> => {
  return api.delete(`${API_PATHS.carousel}/${id}`)
}

type UseDeleteCarouselOptions = {
  mutationConfig?: MutationConfig<typeof deleteCarousel>
}

export const useDeleteCarousel = ({
  mutationConfig,
}: UseDeleteCarouselOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, { id }, ...args) => {
      queryClient.setQueryData(
        getCarouselsQueryOptions().queryKey,
        (carousels) => carousels?.filter((c) => c.id != id),
      )
      onSuccess?.(data, { id }, ...args)
    },
    ...restConfig,
    mutationFn: deleteCarousel,
  })
}
