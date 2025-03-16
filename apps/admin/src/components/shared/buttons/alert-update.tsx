import { Button, ButtonProps } from '@repo/ui/components/button'
import { HandleAlert } from '@repo/ui/components/handle-alert'
import { Loader } from '@repo/ui/components/loader'
import { cn } from '@repo/ui/lib/utils'

type Props = ButtonProps & {
  handleUpdate: () => Promise<void>
  isPending: boolean
}

export const ButtonAlertUpdate = ({
  handleUpdate,
  isPending,
  className,
  ...props
}: Props) => {
  return (
    <HandleAlert trigger={handleUpdate}>
      <Button
        className={cn('w-full', className)}
        variant="default"
        disabled={isPending}
        {...props}
      >
        {isPending && <Loader />}
        Update
      </Button>
    </HandleAlert>
  )
}
