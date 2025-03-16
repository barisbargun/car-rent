import { cn } from '@repo/ui/lib/utils'

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  message?: string
  className?: string
}

export const AuthorizationFallback = ({
  message = 'You do not have permission to update site config.',
  className,
}: Props) => {
  return (
    <p className={cn('text-red-500', className)} role="alert" aria-live="assertive">
      {message}
    </p>
  )
}
