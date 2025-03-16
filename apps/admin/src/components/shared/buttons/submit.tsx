import { Button, ButtonProps } from '@repo/ui/components/button'
import { Loader } from '@repo/ui/components/loader'
import { cn } from '@repo/ui/lib/utils'

type Props = ButtonProps & {
  title?: string
  isPending?: boolean
}

export const ButtonSubmit = ({
  title = 'Create',
  isPending,
  className,
  ...props
}: Props) => {
  return (
    <Button
      type="submit"
      variant="default"
      disabled={isPending}
      className={cn('w-full', className)}
      {...props}
    >
      {isPending && <Loader />}
      {title}
    </Button>
  )
}
