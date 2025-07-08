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
        className={cn('text-5xl sm:text-7xl lg:text-4xl xl:text-5xl 2xl:text-6xl', className)}
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
        className={cn('text-4xl xl:text-5xl', className)}
        {...props}
      />
    )
  },
)

const H3 = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ as: Tag = 'h3', className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn('text-3xl tracking-wider xl:text-4xl', className)}
        {...props}
      />
    )
  },
)

const H4 = React.forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ as: Tag = 'h4', className, ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        className={cn('text-2xl tracking-wider xl:text-3xl', className)}
        {...props}
      />
    )
  },
)

const Large = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('font-semibold xl:text-lg', className)}
      {...props}
    />
  )
})

const Small = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <small
      ref={ref}
      className={cn('font-medium max-xl:text-xs', className)}
      {...props}
    />
  )
})

H1.displayName = 'H1'
H2.displayName = 'H2'
H3.displayName = 'H3'
H4.displayName = 'H4'
Large.displayName = 'Large'
Small.displayName = 'Small'

export { H1, H2, H3, H4, Large, Small }
