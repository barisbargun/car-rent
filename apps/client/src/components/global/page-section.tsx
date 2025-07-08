import { cn } from '@repo/ui/lib/utils'
import { forwardRef, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  nestedClassName?: string
  children?: React.ReactNode
}

const PageSection = forwardRef<HTMLDivElement, Props>(
  ({ nestedClassName, className, children, ...props }, ref) => {
    return (
      <section className={cn('relative', className)} ref={ref} {...props}>
        <div
          className={cn(
            'section-t-p section-b-p container mx-auto flex flex-col',
            nestedClassName,
          )}
        >
          {children}
        </div>
      </section>
    )
  },
)

PageSection.displayName = 'PageSection'

export { PageSection }
