import { useMutation, useQueryClient } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { Image, ImageCreate } from './common'
import { getImagesQueryOptions } from './get-all'

export const createImage = ({
  data,
}: {
  data: ImageCreate
}): Promise<Image> => {
  const formData = new FormData()
  formData.append('file', data.file)
  return api.post(`${API_PATHS.image}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

type UseCreateImageOptions = {
  mutationConfig?: MutationConfig<typeof createImage>
}

export const useCreateImage = ({
  mutationConfig,
}: UseCreateImageOptions = {}) => {
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
    mutationFn: createImage,
  })
}
