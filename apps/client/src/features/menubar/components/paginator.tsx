import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/ui/components/pagination'
import { useMemo } from 'react'

type Props = {
  length: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const Paginator = ({ length, page, setPage }: Props) => {
  const GetSlice = useMemo(() => {
    const min = Math.max(
      length - page <= 2 ? page - 4 + (length - page) : page - 2,
      1,
    )
    const max = Math.min(page <= 2 ? 6 : page + 3, length + 1)
    return [min, max]
  }, [page, length])

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((v) => Math.max(v - 1, 1))}
          />
        </PaginationItem>
        <PaginationItem>
          {Array.from({ length: length + 1 })
            .map((_, i) => i)
            .slice(GetSlice[0], GetSlice[1])
            .map((v) => (
              <PaginationLink key={v} onClick={() => setPage(v)}>
                {v}
              </PaginationLink>
            ))}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((v) => Math.min(v + 1, length))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
