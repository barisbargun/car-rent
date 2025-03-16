import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { CarouselGet } from '#api/types/carousel'

import { getCarouselsQueryOptions } from './get-all'

export const createCarouselInputSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  title: z.string().max(150, validationMsg('max', 150)),
  desc: z.string().max(300, validationMsg('max', 300)),
  vehicleName: z
    .string()
    .min(2, validationMsg('min', 2))
    .max(150, validationMsg('max', 150)),
  engine: z
    .string()
    .min(3, validationMsg('min', 3))
    .max(150, validationMsg('max', 150)),
  power: z.coerce
    .number()
    .min(10, 'Power must be at least 10')
    .max(10_000, 'Power must be at most 10,000'),
  price: z.coerce
    .number()
    .min(10, 'Price must be at least 10')
    .max(10_000, 'Price must be at most 10,000'),
})

export type CreateCarouselInput = z.infer<typeof createCarouselInputSchema>

export const createCarousel = ({
  data,
}: {
  data: CreateCarouselInput
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
