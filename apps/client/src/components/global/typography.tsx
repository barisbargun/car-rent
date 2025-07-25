import { cn } from '@repo/ui/lib/utils'
import React from 'react'

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'strong' | 'span'
}

const H1 = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ as: Tag = 'h1', className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'text-5xl sm:text-7xl lg:text-4xl xl:text-5xl 2xl:text-6xl',
          className,
        )}
        {...props}
      />
    )
  },
)
const H2 = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ as: Tag = 'h2', className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn(
          'text-2xl sm:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl',
          className,
        )}
        {...props}
      />
    )
  },
)

H1.displayName = 'H1'
H2.displayName = 'H2'

export { H1, H2 }
