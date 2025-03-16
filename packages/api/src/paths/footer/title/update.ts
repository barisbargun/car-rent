import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { FooterTitle } from '#api/types/footer'

import { createFooterTitleInputSchema } from './create'
import { getFooterTitlesQueryOptions } from './get-all'

export const updateFooterTitleInputSchema = createFooterTitleInputSchema

export type UpdateFooterTitleInput = z.infer<typeof updateFooterTitleInputSchema>

export const updateFooterTitle = ({
  id,
  data,
}: {
  id: string
  data: UpdateFooterTitleInput
}): Promise<FooterTitle> => {
  return api.patch(`${API_PATHS.footerTitle}/${id}`, data)
}

type UseUpdateFooterTitleOptions = {
  mutationConfig?: MutationConfig<typeof updateFooterTitle>
}

export const useUpdateFooterTitle = ({
  mutationConfig,
}: UseUpdateFooterTitleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getFooterTitlesQueryOptions().queryKey,
        (footerTitles) => footerTitles?.map((c) => (c.id === data.id ? data : c)),
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: updateFooterTitle,
  })
}
