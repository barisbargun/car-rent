import { db } from '#mock/mocks/db'

export const populateWithImage = (id: string) => {
  return db.image.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  })
}
