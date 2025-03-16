import { MODELS } from '@repo/api/config/api-paths'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { Button } from '@repo/ui/components/button'
import { Loader } from '@repo/ui/components/loader'

import { Authorization } from '@/lib/authorization'

type Props = {
  model: MODELS
  swapId?: string
  isAnyChange?: boolean
  pendingSwap?: boolean
  handlePatch: () => void
  handleSwapReset: () => void
}

export const ButtonModelSwapComplete = ({
  model,
  swapId,
  isAnyChange,
  pendingSwap,
  handleSwapReset,
  handlePatch,
}: Props) => {
  return (
    <Authorization checkRole={(REQUIRED_ROLE[model] as any)?.swap}>
      <div className="flex w-full justify-start gap-6">
        <Button
          disabled={(!swapId && !isAnyChange) || pendingSwap}
          variant="destructive"
          onClick={handleSwapReset}
        >
          Cancel Swap
        </Button>
        <Button
          disabled={!isAnyChange || pendingSwap}
          data-testid="update-button"
          onClick={handlePatch}
        >
          {pendingSwap && <Loader />} Update
        </Button>
      </div>
    </Authorization>
  )
}
