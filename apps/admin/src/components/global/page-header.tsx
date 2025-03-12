import { cn } from '@repo/ui/lib/utils'

import { H3 } from './typography'

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  center?: boolean
}

export function PageHeader({ className, children, ...props }: Props) {
  return (
    <H3
      className={cn(
        'mx-auto text-balance uppercase tracking-[0.8rem] page-bottom-space',
        className,
      )}
      {...props}
    >
      {children}
    </H3>
  )
}
