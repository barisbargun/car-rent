import { validationMsg } from '@repo/utils/message'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { API_PATHS } from '#api/config/api-paths'
import { MutationConfig } from '#api/config/react-query'
import { api } from '#api/lib/api'
import { DRIVE_TRAIN_LIST, Vehicle, WHEEL_DRIVE_LIST } from '#api/types/vehicle'

import { getVehiclesQueryOptions } from './get-all'

export const createVehicleInputSchema = z.object({
  img: z.string().min(1, 'Image is required'),
  menubarVehicle: z.string().min(1, 'Menubar vehicle is required'),
  title: z
    .string()
    .min(5, validationMsg('min', 5))
    .max(50, validationMsg('max', 50)),
  fuel: z
    .string()
    .min(1, validationMsg('min', 1))
    .max(20, validationMsg('max', 20)),
  drivetrain: z.nativeEnum(DRIVE_TRAIN_LIST, {
    required_error: 'Drive train is required',
  }),
  wheel: z.nativeEnum(WHEEL_DRIVE_LIST, {
    required_error: 'Wheel is required',
  }),
})

export type CreateVehicleInput = z.infer<typeof createVehicleInputSchema>

export const createVehicle = ({
  data,
}: {
  data: CreateVehicleInput
}): Promise<Vehicle> => {
  return api.post(`${API_PATHS.vehicle}`, data)
}

type UseCreateVehicleOptions = {
  mutationConfig?: MutationConfig<typeof createVehicle>
}

export const useCreateVehicle = ({
  mutationConfig,
}: UseCreateVehicleOptions = {}) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(
        getVehiclesQueryOptions().queryKey,
        (vehicles) => [...(vehicles || []), data],
      )
      onSuccess?.(data, ...args)
    },
    ...restConfig,
    mutationFn: createVehicle,
  })
}
