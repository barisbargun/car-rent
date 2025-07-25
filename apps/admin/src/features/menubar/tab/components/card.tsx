import { MenubarTab } from '@repo/api/paths/menubar/tab/common'
import { useDeleteMenubarTab } from '@repo/api/paths/menubar/tab/delete'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwap } from '@/components/shared/buttons/model-swap'

import { MenubarTabUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: MenubarTab
  handleSwap: (id: string) => void
  swapId: string | undefined
}

export const MenubarTabCard = ({
  data,
  handleSwap,
  swapId,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'border-secondary flex-center relative aspect-[3] overflow-hidden rounded border-4 shadow lg:aspect-[5/3]',
        className,
      )}
      data-testid="menubar-tab-card"
      {...props}
    >
      {/** Buttons */}
      <div className="card-buttons absolute right-1 top-1 flex gap-2">
        <ButtonModelForm
          type="UPDATE"
          model="menubarTab"
          modelText="menubar tab"
        >
          <MenubarTabUpdateForm menubarTab={data} />
        </ButtonModelForm>

        <ButtonModelDelete
          model="menubarTab"
          id={data.id}
          mutate={useDeleteMenubarTab}
        />

        <ButtonModelSwap
          model="menubarTab"
          id={data.id}
          swapId={swapId}
          handleSwap={handleSwap}
        />
      </div>

      <strong title={data.title}>{data.title}</strong>
    </div>
  )
}
