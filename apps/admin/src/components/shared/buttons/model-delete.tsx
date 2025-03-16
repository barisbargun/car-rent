import { MODELS } from '@repo/api/config/api-paths'
import { UseMutationResult } from '@repo/api/config/react-query'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { Button, ButtonProps } from '@repo/ui/components/button'
import { HandleAlert } from '@repo/ui/components/handle-alert'
import { Loader } from '@repo/ui/components/loader'
import { TrashIcon } from 'lucide-react'

import { Authorization } from '@/lib/authorization'
import { toast } from '@/lib/toast'

type MutateDelete = ({ mutationConfig }?: any) => UseMutationResult<
  any,
  Error,
  {
    id: string
  },
  unknown
>

type Props = ButtonProps & {
  model: MODELS
  id: string
  mutate: MutateDelete
}

export const ButtonModelDelete = ({
  id,
  model,
  mutate,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending, isSuccess } = mutate()

  const handleDelete = async () => {
    try {
      await mutateAsync({ id })
      ;(toast[model] as any)?.remove.success()
    } catch {
      ;(toast[model] as any)?.remove.error()
    }
  }

  return (
    <Authorization checkRole={(REQUIRED_ROLE[model] as any)?.remove}>
      <HandleAlert trigger={handleDelete}>
        <Button
          title="delete"
          className={className}
          variant="outline"
          disabled={isSuccess || isPending}
          size="icon"
          {...props}
        >
          {isPending ? <Loader /> : <TrashIcon />}
          <span className="sr-only">delete</span>
        </Button>
      </HandleAlert>
    </Authorization>
  )
}
