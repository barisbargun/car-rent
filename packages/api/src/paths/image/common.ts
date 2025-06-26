import z from 'zod'

/*

SCHEMAS

*/
export const imageCreateSchema = z.object({
  file: z.custom<File>().refine((file) => file instanceof File, {
    message: 'File is required',
  }),
})

/*

TYPES

*/
export type Image = {
  id:string
  url: string
  publicId: string
}

export type ImageCreate = z.infer<typeof imageCreateSchema>
