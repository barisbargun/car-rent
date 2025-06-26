import { queryOptions, useQuery } from '@tanstack/react-query'

import { API_PATHS } from '#api/config/api-paths'
import { QueryConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'

import { Image } from './common'

export const getImages = (): Promise<Image[]> => {
  return api.get(API_PATHS.image)
}

export const getImagesQueryOptions = () => {
  return queryOptions({
    queryKey: ['images'],
    queryFn: () => getImages(),
  })
}

type UseImagesOptions = {
  queryConfig?: QueryConfig<typeof getImagesQueryOptions>
}

export const useImages = ({ queryConfig }: UseImagesOptions = {}) => {
  return useQuery({
    ...getImagesQueryOptions(),
    ...queryConfig,
  })
}
