import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { FooterLink } from '#api/types/footer'

import { getFooterLinksQueryOptions } from './get-all'

export const createFooterLinkInputSchema = z.object({
  footerTitle: z.string().min(1, 'Footer title is required'),
  title: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(50, validationMsg('max', 50)),
  link: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(200, validationMsg('max', 200)),
})

export type CreateFooterLinkInput = z.infer<typeof createFooterLinkInputSchema>

export const createFooterLink = ({
  data,
}: {
  data: CreateFooterLinkInput
}): Promise<FooterLink> => {
  return api.post(`${API_PATHS.footerLink}`, data)
}

type UseCreateFooterLinkOptions = {
  mutationConfig?: MutationConfig<typeof createFooterLink>
}

export const useCreateFooterLink = ({
  mutationConfig,
}: UseCreateFooterLinkOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getFooterLinksQueryOptions().queryKey,
        (footerLinks) => [...(footerLinks || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createFooterLink,
  })
}
