import { sortByIndex } from '@repo/utils/obj'

export const sortByIdList = (model: any[] | undefined, idList: string[]) => {
  if (!model || !idList || idList.length === 0) return model || []
  const result = model?.map((c) => {
    const index = idList.indexOf(c.id)
    if (index !== -1) {
      return { ...c, index }
    }
    return c
  })
  return sortByIndex(result || [])
}
