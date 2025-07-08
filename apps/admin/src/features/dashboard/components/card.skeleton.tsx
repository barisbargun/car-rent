import { Skeleton } from '@repo/ui/components/skeleton'

type Props = {
  count?: number
}

export const DashboardCardSkeleton = ({ count = 1 }: Props) => {
  return (
    <div className="bg-card rounded-xl border p-6">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-2 h-4 w-52" />
      <div className="flex-center gap-20 pb-6 pt-10">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex-center flex-col gap-2">
            <Skeleton className="h-16 w-12" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  )
}
