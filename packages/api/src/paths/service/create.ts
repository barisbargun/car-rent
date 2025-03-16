import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { ServiceGet } from '#api/types/service'

import { getServicesQueryOptions } from './get-all'

export const createServiceInputSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  title: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(50, validationMsg('max', 50)),
  desc: z
    .string()
    .min(20, validationMsg('min', 20))
    .max(300, validationMsg('max', 300)),
})

export type CreateServiceInput = z.infer<typeof createServiceInputSchema>

export const createService = ({
  data,
}: {
  data: CreateServiceInput
}): Promise<ServiceGet> => {
  return api.post(`${API_PATHS.service}`, data)
}

type UseCreateServiceOptions = {
  mutationConfig?: MutationConfig<typeof createService>
}

export const useCreateService = ({
  mutationConfig,
}: UseCreateServiceOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getServicesQueryOptions().queryKey,
        (services) => [...(services || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createService,
  })
}
