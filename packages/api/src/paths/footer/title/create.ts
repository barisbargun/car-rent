import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { FooterTitle } from '#api/types/footer'

import { getFooterTitlesQueryOptions } from './get-all'

export const createFooterTitleInputSchema = z.object({
  title: z
    .string()
    .min(10, validationMsg('min', 10))
    .max(50, validationMsg('max', 50)),
})

export type CreateFooterTitleInput = z.infer<
  typeof createFooterTitleInputSchema
>

export const createFooterTitle = ({
  data,
}: {
  data: CreateFooterTitleInput
}): Promise<FooterTitle> => {
  return api.post(`${API_PATHS.footerTitle}`, data)
}

type UseCreateFooterTitleOptions = {
  mutationConfig?: MutationConfig<typeof createFooterTitle>
}

export const useCreateFooterTitle = ({
  mutationConfig,
}: UseCreateFooterTitleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getFooterTitlesQueryOptions().queryKey,
        (footerTitles) => [...(footerTitles || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createFooterTitle,
  })
}
