import { Skeleton } from '@repo/ui/components/skeleton'

export const MenubarTabCardSkeleton = () => {
  return (
    <Skeleton className="relative aspect-[3] lg:aspect-[5/3] w-full">
      <div className="absolute right-0 top-0 flex gap-2 p-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-6" />
      </div>
    </Skeleton>
  )
}
