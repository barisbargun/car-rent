import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { Image } from '#api/types/image'

import { getImagesQueryOptions } from './get-all'

export const createImageInputSchema = z.object({
  file: z.custom<File>().refine((file) => file instanceof File, {
    message: 'File is required',
  }),
})

export type CreateImageInput = z.infer<typeof createImageInputSchema>

export const createImage = ({
  data,
}: {
  data: CreateImageInput
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
