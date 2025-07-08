import { Button } from '@repo/ui/components/button'
import { Loader } from '@repo/ui/components/loader'
import { Skeleton } from '@repo/ui/components/skeleton'

import { VerticalSortableList } from './vertical-list'

export const ModelVerticalListSkeleton = ({
  Card,
}: {
  Card: React.ComponentType
}) => (
  <div className="min-h-[50vh] w-60 shrink-0 xl:w-72 2xl:w-80">
    <div className="mb-4 flex w-full items-center justify-between gap-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-8 w-20" />
    </div>
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, j) => (
        <Card key={j} />
      ))}
    </div>
  </div>
)

type Props = {
  tabTitle: string
  tabSecondTitle?: string
  items: any[]
  isAnyChange: boolean
  pendingSwap: boolean
  handlePatch: () => Promise<void>
  handleDragEnd: (event: { active: any; over: any }) => void
  cardComponent: React.ComponentType<any>
}

export const ModelVerticalList = ({
  tabTitle,
  tabSecondTitle,
  items,
  isAnyChange,
  pendingSwap,
  handlePatch,
  handleDragEnd,
  cardComponent,
}: Props) => {
  const title = tabSecondTitle ? (
    <div>
      <small className="text-muted-foreground block">{tabTitle}</small>
      <strong>{tabSecondTitle}</strong>
    </div>
  ) : (
    <strong>{tabTitle}</strong>
  )

  return (
    <div className="min-h-[50vh] w-60 shrink-0 xl:w-72 2xl:w-80">
      <div className="mb-4 flex w-full items-center justify-between gap-4">
        {title}
        <Button
          size="sm"
          disabled={!isAnyChange || pendingSwap}
          data-testid="update-button"
          onClick={handlePatch}
        >
          {pendingSwap && <Loader />} Update
        </Button>
      </div>
      <VerticalSortableList
        data={items}
        handleDragEnd={handleDragEnd}
        cardComponent={cardComponent}
        className="rounded border-2 border-b-0 border-dashed"
      />
    </div>
  )
}
