import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { getImagesQueryOptions } from './get-all'

export const deleteImage = ({ id }: { id: string }) => {
  return api.delete(`${API_PATHS.image}/${id}`)
}

type UseDeleteImageOptions = {
  mutationConfig?: MutationConfig<typeof deleteImage>
}

export const useDeleteImage = ({
  mutationConfig,
}: UseDeleteImageOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getImagesQueryOptions().queryKey,
      })
      onSuccess?.(...args)
    },
    ...restConfig,
    mutationFn: deleteImage,
  })
}
