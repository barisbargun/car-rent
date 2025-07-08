import z from 'zod'

export const swapModelInputSchema = z.object({
  idList: z.array(z.string()).min(2, 'At least two IDs are required'),
})
export type SwapModelInput = z.infer<typeof swapModelInputSchema>
