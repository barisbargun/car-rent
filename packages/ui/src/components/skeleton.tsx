import { cn } from '#ui/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded bg-neutral-400/20', className)}
      {...props}
    >
      <span className="sr-only">loading</span>
    </div>
  )
}

export { Skeleton }
