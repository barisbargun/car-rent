import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { Button, ButtonProps } from '@repo/ui/components/button'
import { CheckIcon, RefreshCw } from 'lucide-react'

import { Authorization } from '@/lib/authorization'

type Props = ButtonProps & {
  model: MODELS
  id: string
  swapId: string | undefined
  handleSwap: (id: string) => void
}

export const ButtonModelSwap = ({
  model,
  id,
  swapId,
  handleSwap,
  ...props
}: Props) => {
  return (
    <Authorization checkRole={(REQUIRED_ROLE[model] as any)?.swap}>
      <Button
        variant="outline"
        disabled={swapId == id}
        size="icon"
        onClick={() => handleSwap(id)}
        {...props}
      >
        {swapId == id ? (
          <CheckIcon className="size-5" />
        ) : (
          <RefreshCw className="size-5" />
        )}
        <span className="sr-only">swap</span>
      </Button>
    </Authorization>
  )
}
